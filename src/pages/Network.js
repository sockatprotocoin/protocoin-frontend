import React, { useState, useEffect, useCallback } from 'react'
import Api from '../api/Api'
import ForceGraph2D from 'react-force-graph-2d';
import { withSize } from 'react-sizeme'

function Network({ size }) {
    const api = new Api();
    const [nodes, setNodes] = useState({})
    const [isFetching, setFetching] = useState(true)
    const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

    window.addEventListener('resize', () => {
        setDisplayHeight(window.innerHeight);
    });

    useEffect(() => {
        fetchNetwork()
    }, [])

    function fetchNetwork() {
        api.getNetwork()
            .then(response => {
                const data = nodeMapper(response.data)
                setNodes(data)
                setFetching(false)
            })
            .catch(err => {
                console.log(err);
                setFetching(false)
            })
    }

    function nodeMapper(addresses) {
        const nodes = addresses.map((address, i) => ({id: i, label: address}))
        nodes[nodes.length] = {id: nodes.length, label: "Protocoin Web App"}
        const links = nodes.map(node1 => nodes.filter(node2 => node2.id != node1.id).map(node2 => ({
            'source': node1.id,
            'target': node2.id
        }))).flatMap(link => link)
        return {
            nodes: nodes,
            links: links
        }
    }

    const graphRef = useCallback((node) => {
        if (node) {
            node.zoom(8);
        }
    }, []);

    return (
        !isFetching ? 
        <div className="container" id="network">
            <h1>Network Graph</h1>
            <ForceGraph2D
                ref={graphRef}
                width={size.width - 75}
                height={displayHeight - 305.2}
                graphData={nodes}
                forceEngine={"d3"}
                linkWidth={2}
                linkDirectionalParticles={1}
                linkDirectionalParticleSpeed={0.005}
                nodeCanvasObjectMode={() => 'after'}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.label;
                    const fontSize = 18 / globalScale;
                    ctx.font = `${fontSize}px Noto Sans Mono`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = 'black';
                    ctx.fillText(label, node.x, node.y + 10);
                }}
            />
        </div>
        : <></>
    )
}

export default withSize()(Network)