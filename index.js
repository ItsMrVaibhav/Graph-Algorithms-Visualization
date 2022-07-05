const rightPanel = document.getElementById("right-panel");
const consoleElement = document.getElementById("console");
const animationSpeed = document.getElementById("animationSpeed");
const animationSpeedText = document.getElementById("animationSpeedText");
const customGraphButton = document.getElementById("customGraphButton");
const customGraphInputInput = document.getElementById("customGraphInputInput");

let directedGraph = {
    0: [[1, 3, 0], [2, 6, 1], [3, 16, 2]],
    1: [[5, 18, 3], [6, 25, 4]],
    2: [[4, 40, 5]],
    3: [[2, 10, 6], [4, 12, 7]],
    4: [[1, 42, 8]],
    5: [],
    6: [[4, 23, 9]],
};

let undirectedGraph = {
    0: [[1, 3, 0], [2, 6, 1], [3, 16, 2]],
    1: [[0, 3, 0], [5, 18, 3], [6, 25, 4], [4, 42, 8]],
    2: [[4, 40, 5], [0, 6, 1], [3, 10, 6]],
    3: [[2, 10, 6], [4, 12, 7], [0, 16, 2]],
    4: [[1, 42, 8], [2, 40, 5], [3, 12, 7], [6, 23, 9]],
    5: [[1, 18, 3]],
    6: [[4, 23, 9], [1, 25, 4]]
};

// from to weight edge-index
let edgeList = [
    [0, 1, 3, 0],
    [0, 2, 6, 1],
    [0, 3, 16, 2],
    [1, 5, 18, 3],
    [1, 6, 25, 4],
    [2, 4, 40, 5],
    [3, 2, 10, 6],
    [3, 4, 12, 7],
    [4, 1, 42, 8],
    [6, 4, 23, 9],
]

let directedGraphMatrix = [
    [[-1, -1], [3, 0], [6, 1], [16, 2], [-1, -1], [-1, -1], [-1, -1],],
    [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [18, 3], [25, 4],],
    [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [40, 5], [-1, -1], [-1, -1],],
    [[-1, -1], [-1, -1], [10, 6], [-1, -1], [12, 7], [-1, -1], [-1, -1],],
    [[-1, -1], [42, 8], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1],],
    [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1],],
    [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [23, 9], [-1, -1], [-1, -1],]
];

let undirectedGraphMatrix = [
    [[-1, -1], [3, 0], [6, 1], [16, 2], [-1, -1], [-1, -1], [-1, -1],],
    [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [18, 3], [25, 4],],
    [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [40, 5], [-1, -1], [-1, -1],],
    [[-1, -1], [-1, -1], [10, 6], [-1, -1], [12, 7], [-1, -1], [-1, -1],],
    [[-1, -1], [42, 8], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1],],
    [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1],],
    [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [23, 9], [-1, -1], [-1, -1],]
];

let data = {
    nodes: [
        { id: "node0", label: "A" },
        { id: "node1", label: "B" },
        { id: "node2", label: "C" },
        { id: "node3", label: "D" },
        { id: "node4", label: "E" },
        { id: "node5", label: "F" },
        { id: "node6", label: "G" }
    ],
    edges: [
        { source: "node0", target: "node1", "label": "3" },
        { source: "node0", target: "node2", "label": "6" },
        { source: "node0", target: "node3", "label": "16" },
        { source: "node1", target: "node5", "label": "18" },
        { source: "node1", target: "node6", "label": "25" },
        { source: "node2", target: "node4", "label": "40" },
        { source: "node3", target: "node2", "label": "10" },
        { source: "node3", target: "node4", "label": "12" },
        { source: "node4", target: "node1", "label": "42" },
        { source: "node6", target: "node4", "label": "23" },
    ]
};

// let graphWidth = Math.min(rightPanel.offsetWidth, rightPanel.offsetHeight);
// let graphHeight = Math.min(rightPanel.offsetWidth, rightPanel.offsetHeight);
let graphWidth = rightPanel.offsetWidth;
let graphHeight = rightPanel.offsetHeight;
let config = {
    container: "mountNode",
    width: graphWidth,
    height: graphHeight,
    layout: {
        type: "force",
        linkDistance: 250,
        // nodeStrength: -2000, // to be decided
        preventOverlap: true,
    },
    defaultNode: {
        shape: "circle",
        size: [50],
        color: "black",
        style: {
            fill: "#58D68D",
            lineWidth: 2
        },
        labelCfg: {
            style: {
                fill: "#FFFFFF",
                fontSize: 16,
                fontFamily: "Consolas"
            }
        }
    },
    defaultEdge: {
        type: 'quadratic',
        style: {
            endArrow: true,
            stroke: "black",
            lineWidth: 2,
            fontFamily: "Consolas"
        },
        labelCfg: {
            autoRotate: true,
            refY: 10
        },
    },
    modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
    },
    nodeStateStyles: {
        visiting: {
            fill: "orange"
        },
        visited: {
            fill: "#909497"
        },
        select: {
            fill: "red"
        }
    },
    edgeStateStyles: {
        visiting: {
            stroke: "orange"
        },
        visited: {
            stroke: "#909497"
        },
        select: {
            stroke: "red"
        }
    }
};

function wrapWith(word, type = "primary") {
    return `<span class="text-${type}">${word}</span>`
}

function loadWelcomeConsoleText() {
    addTextToConsole("Welcome to Graph Algorithms Visualization");
    addTextToConsole("A web application to visualise various graph and tree algorithms");
    addTextToConsole("Built with ❤️ by Vaibhav (@itsmrvaibhav)");
    addTextToConsole(`Use the ${wrapWith("New Graph")} button to generate a random graph`);
    addTextToConsole(`Use the ${wrapWith("Custom Input")} button to enter a custom graph; do follow the input guidelines :)`);
    addTextToConsole(`Use the ${wrapWith("Speed")} slider to change the animation speed`);
    addTextToConsole(`${wrapWith("Click & Drag")} the graph to move it around`);
    addTextToConsole(`${wrapWith("Click & Drag")} any node to move to around at your will`);
    addTextToConsole(`Click on any algorithm's name under the ${wrapWith("Name")} column to run that algorithm over the loaded graph`);
}

let v = 7, e = 10;
let visited = new Array(v).fill(false);
let graph = new G6.Graph(config);
graph.data(data);
graph.render();
let nodes = graph.getNodes();
let edges = graph.getEdges();
let delayValue = 100;
loadWelcomeConsoleText();

function buildGraphs(inputEdges) {
    let nNodes = inputEdges[0][0], nEdges = inputEdges[0][1];
    inputEdges.shift();
    v = nNodes;
    e = nEdges;
    visited = new Array(v).fill(false); // visited array created
    edgeList = inputEdges; // edge list created
    let dg = {}, udg = {}, inputData = {nodes: [], edges: []};
    let dm = new Array(v).fill(new Array(v).fill([-1, -1]));
    let udm = new Array(v).fill(new Array(v).fill([-1, -1]));

    for (let i = 0; i < e; i++) {
        let [src, dest, weight, edgeIndex] = inputEdges[i];
        
        if (!(src in dg))
            dg[src] = [];

        if (!(dest in dg))
            dg[dest] = [];

        if (!(src in udg)) {
            udg[src] = [];
            inputData.nodes.push({
                id: `node${src}`,
                label: `${src}`
            })
        }

        if (!(dest in udg)) {
            udg[dest] = [];
            inputData.nodes.push({
                id: `node${dest}`,
                label: `${dest}`
            })
        }

        dg[src].push([dest, weight, edgeIndex]);
        udg[src].push([dest, weight, edgeIndex]);
        udg[dest].push([src, weight, edgeIndex]);
        dm[src][dest] = [weight, edgeIndex];
        udm[src][dest] = [weight, edgeIndex];
        udm[dest][src] = [weight, edgeIndex];
        inputData.edges.push({
            source: `node${src}`,
            target: `node${dest}`,
            label: String(weight)
        });
    }

    directedGraph = dg; // directed graph created
    undirectedGraph = udg; // undirected graph created
    directedGraphMatrix = dm; // directed graph matrix created
    undirectedGraphMatrix = udm; // undirected graph matrix created
    data = inputData;
    // printAllGraphs();
    resetGraphData();
    addTextToConsole("new graph created using custom input successfully!")
}

function resetGraphData() {
    graph.changeData(data);
    nodes = graph.getNodes();
    edges = graph.getEdges();
}

function printAllGraphs() {
    console.log(edgeList);
    console.log(directedGraph);
    console.log(undirectedGraph);
    console.log(directedGraphMatrix);
    console.log(undirectedGraphMatrix);
    console.log(data);
}

customGraphButton.onclick = () => {
    let string = customGraphInputInput.value.trim();
    
    if (string.length == 0) {
        addTextToConsole("error: empty input")
        return;
    }

    let parts = string.split(/\n/);
    console.log(parts);
    
    for (let i = 0; i < parts.length; i++) {
        parts[i] = parts[i].split(' ').map((x) => isNaN(x) ? NaN : Number(x));
        parts[i].push(i - 1);
    }

    for (let i = 0; i < parts.length; i++) {
        for (let j = 0; j < parts[i].length; j++) {
        console.log(parts[i][j]);
            if (isNaN(parts[i][j])) {
                addTextToConsole("error: non-digit input found");
                return;
            }
        }
    }

    buildGraphs(parts);
};

animationSpeed.oninput = () => {
    delayValue = animationSpeed.value;
    animationSpeedText.innerHTML = delayValue + " ms";
}

function addTextToConsole(text) {
    consoleElement.insertAdjacentHTML("beforeEnd", `<p class="text-warning m-0"><span class="text-light">-></span> ${text}</p>`);
    consoleElement.scrollTo(0, consoleElement.offsetHeight);
}

function clearConsole() {
    consoleElement.innerHTML = "";
}

function randomHEXColour() {
    return '#' + Math.random().toString(16).slice(-6);
}

function getNodeLabel(index) {
    return data.nodes[index].label;
}

function arrayToString(order) {
    return "[" + order.join(", ") + "]";
}

const dfsButton = document.getElementById("dfsButton");
const bfsButton = document.getElementById("bfsButton");
const mstpButton = document.getElementById("mstpButton");
const mstkButton = document.getElementById("mstkButton");
const bfButton = document.getElementById("bfButton");
const fwButton = document.getElementById("fwButton");
const dfsapButton = document.getElementById("dfsapButton");
const dfsbButton = document.getElementById("dfsbButton");
const dfssccButton = document.getElementById("dfssccButton");

dfsButton.onclick = async () => {
    clearConsole();
    resetGraph();
    let order = [];

    for (let i = 0; i < v; i++) {
        if (!visited[i]) {
            addTextToConsole(`starting depth first traversal from ${getNodeLabel(i)} node`);
            await dfs(i, order);
        }
    };

    order = order.map(getNodeLabel);
    addTextToConsole("Traversal Order: " + arrayToString(order));
}

bfsButton.onclick = async () => {
    clearConsole();
    resetGraph();
    let order = [];

    for (let i = 0; i < v; i++) {
        if (!visited[i]) {
            addTextToConsole(`starting breadth first traversal from ${getNodeLabel(i)} node`);
            await bfs(i, order);
        }
    };

    order = order.map(getNodeLabel);
    addTextToConsole("Traversal Order: " + arrayToString(order));
}

mstkButton.onclick = () => {
    clearConsole();
    resetGraph();
    addTextToConsole(`starting kruskal's algorithm to find a minimum spanning tree`);
    kruskalsMST();
}

mstpButton.onclick = () => {
    clearConsole();
    resetGraph();
    addTextToConsole(`starting prim's algorithm to find a minimum spanning tree`);
    primsMST();
}

bfButton.onclick = () => {
    clearConsole();
    resetGraph();
    addTextToConsole(`starting bellmon ford's algorithm for ${getNodeLabel(0)} node to find single source shortest path`);
    bellmonFord();
}

fwButton.onclick = () => {
    clearConsole();
    resetGraph();
    addTextToConsole(`starting floyd warshall's algorithm to find all pairs shortest path`);
    floydWarshall();
}

dfssccButton.onclick = async () => {
    clearConsole();
    resetGraph();
    let points = [];
    let ids = new Array(v).fill(-1), lowLinks = new Array(v).fill(-1), onStack = new Array(v).fill(false);
    let recursionStack = [];
    let counter = {
        id: 0
    };

    for (let i = 0; i < v; i++) {
        if (!visited[i]) {
            addTextToConsole(`starting depth first traversal from ${getNodeLabel(i)} node to find articulation points`);
            await sccDFS(i, points, ids, lowLinks, counter, recursionStack, onStack);
        }
    };

    addTextToConsole(`following are the strongly connected components found`);

    if (points.length == 0) {
        addTextToConsole(`no strongly connected components found`);
    } else {
        points.forEach((scc, index) => {
            addTextToConsole(arrayToString(scc));
        });
    }
}

dfsapButton.onclick = async () => {
    clearConsole();
    resetGraph();
    let points = [];
    let ids = new Array(v).fill(-1), lowLinks = new Array(v).fill(-1);
    let counter = {
        id: 0
    };

    for (let i = 0; i < v; i++) {
        if (!visited[i]) {
            addTextToConsole(`starting depth first traversal from ${getNodeLabel(i)} node to find articulation points`);
            await articulationPointsDFS(i, -1, points, ids, lowLinks, counter);
        }
    };

    addTextToConsole(`following are the articulation points found`);

    if (points.length == 0) {
        addTextToConsole(`no articulation points found`);
    } else {
        points.forEach((at, index) => {
            addTextToConsole(`${getNodeLabel(at)}`);
        });
    }
}

dfsbButton.onclick = async () => {
    clearConsole();
    resetGraph();
    let bridges = [];
    let ids = new Array(v).fill(-1), lowLinks = new Array(v).fill(-1);
    let counter = {
        id: 0
    };

    for (let i = 0; i < v; i++) {
        if (!visited[i]) {
            addTextToConsole(`starting depth first traversal from ${getNodeLabel(i)} node to find bridges`);
            await bridgesDFS(i, -1, bridges, ids, lowLinks, counter);
        }
    };

    addTextToConsole(`following are the bridges found`);

    if (bridges.length == 0) {
        addTextToConsole(`no bridges found`);
    } else {
        bridges.forEach(([at, to, edgeIndex], index) => {
            addTextToConsole(`[${getNodeLabel(at)}, ${getNodeLabel(to)}]`);
        });
    }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function resetGraph() {
    for (let i = 0; i < nodes.length; i++) {
        graph.clearItemStates(nodes[i]);
        graph.updateItem(nodes[i], {
            style: {
                fill: "#58D68D"
            }
        });
    }

    for (let i = 0; i < edges.length; i++) {
        graph.clearItemStates(edges[i]);
        graph.updateItem(edges[i], {
            style: {
                stroke: "black"
            }
        });
    }

    for (let i = 0; i < visited.length; i++)
        visited[i] = false;
}

async function sccDFS(at, points, ids, lowLinks, counter, recursionStack, onStack) {
    ids[at] = counter.id;
    lowLinks[at] = counter.id;
    visited[at] = true;
    onStack[at] = true;
    recursionStack.push(at);
    counter.id++;
    markNodeVisiting(at);
    await delay(delayValue);

    for (let i = 0; i < directedGraph[at].length; i++) {
        let [to, w, edgeIndex] = directedGraph[at][i];
        markEdgeVisiting(edgeIndex);
        await delay(delayValue);

        if (!visited[to]) {
            await sccDFS(to, points, ids, lowLinks, counter, recursionStack, onStack);
            // lowLinks[at] = Math.min(lowLinks[at], lowLinks[to]);
        }
        
        if (onStack[to]) {
            lowLinks[at] = Math.min(lowLinks[at], lowLinks[to]);
        }

        markEdgeVisited(edgeIndex);
            await delay(delayValue);
    }

    if (ids[at] == lowLinks[at]) {
        let scc = [];
        let colour = randomHEXColour();

        while (recursionStack.length != 0) {
            let item = recursionStack.pop();
            onStack[item] = false;
            lowLinks[item] = at;
            scc.push(item);
            markNodeSelectedWithColour(item, colour);
            await delay(delayValue);

            if (item == at)
                break;
        }

        points.push(scc);
    } else {
        markNodeVisited(at);
        await delay(delayValue);
    }
}

async function bridgesDFS(at, parent, bridges, ids, lowLinks, counter) {
    ids[at] = counter.id;
    lowLinks[at] = counter.id;
    visited[at] = true;
    counter.id++;
    markNodeVisiting(at);
    await delay(delayValue);

    for (let i = 0; i < undirectedGraph[at].length; i++) {
        let [to, w, edgeIndex] = undirectedGraph[at][i];

        if (to == parent) {
            continue;
        }

        markEdgeVisiting(edgeIndex);
        await delay(delayValue);

        if (!visited[to]) {
            await bridgesDFS(to, at, bridges, ids, lowLinks, counter);

            lowLinks[at] = Math.min(lowLinks[at], lowLinks[to]);
            markEdgeVisited(edgeIndex);
            await delay(delayValue);

            if (ids[at] < lowLinks[to]) {
                bridges.push([at, to, edgeIndex]);
                markEdgeSelected(edgeIndex);
                await delay(delayValue);
            }
        } else {
            lowLinks[at] = Math.min(lowLinks[at], ids[to]);
            markEdgeVisited(edgeIndex);
            await delay(delayValue);
        }
    }

    markNodeVisited(at);
    await delay(delayValue);
}

async function articulationPointsDFS(at, parent, points, ids, lowLinks, counter) {
    ids[at] = counter.id;
    lowLinks[at] = counter.id;
    visited[at] = true;
    counter.id++;
    markNodeVisiting(at);
    await delay(delayValue);
    let children = 0, ap = false;

    for (let i = 0; i < undirectedGraph[at].length; i++) {
        let [to, w, edgeIndex] = undirectedGraph[at][i];

        if (to == parent) {
            continue;
        }

        markEdgeVisiting(edgeIndex);
        await delay(delayValue);

        if (!visited[to]) {
            await articulationPointsDFS(to, at, points, ids, lowLinks, counter);

            lowLinks[at] = Math.min(lowLinks[at], lowLinks[to]);
            markEdgeVisited(edgeIndex);
            await delay(delayValue);

            if (ids[at] <= lowLinks[to] && parent != -1) {
                points.push(at);
                ap = true;
                markNodeSelected(at);
                await delay(delayValue);
            }

            children++;
        } else {
            lowLinks[at] = Math.min(lowLinks[at], ids[to]);
            markEdgeVisited(edgeIndex);
            await delay(delayValue);
        }
    }
    
    if (!ap) {
        markNodeVisited(at);
        await delay(delayValue);
    }

    if (parent == -1 && children > 1) {
        points.push(at);
        markNodeSelected(at);
        await delay(delayValue);
    }
}

async function dfs(at, order) {
    visited[at] = true;
    order.push(at);
    markNodeVisiting(at);
    await delay(delayValue);

    for (let i = 0; i < directedGraph[at].length; i++) {
        let to = directedGraph[at][i][0];
        let w = directedGraph[at][i][1];
        let edgeIndex = directedGraph[at][i][2];
        markEdgeVisiting(edgeIndex);
        await delay(delayValue);

        if (!visited[to]) {
            await dfs(to, order);
        }

        markEdgeVisited(edgeIndex);
        await delay(delayValue);
    }

    markNodeVisited(at);
    await delay(delayValue);
}

async function bfs(start = 0, order) {
    var queue = [[0]];
    visited[start] = true;
    
    while (queue.length != 0) {
        let [at] = queue.shift();
        order.push(at);
        markNodeVisiting(at);
        await delay(delayValue);

        for (let i = 0; i < directedGraph[at].length; i++) {
            let to = directedGraph[at][i][0];
            let w = directedGraph[at][i][1];
            let edgeIndex = directedGraph[at][i][2];
            markEdgeVisiting(edgeIndex);
            await delay(delayValue);
    
            if (!visited[to]) {
                visited[to] = true;
                queue.push([to]);
            }
        }
    }
}

async function primsMST() {
    function minKey(distance, mstSet) { 
        let min = Number.MAX_VALUE, minIndex; 
    
        for (let i = 0; i < v; i++) {
            if (mstSet[i] == false && distance[i][0] < min) {
                min = distance[i][0];
                minIndex = i; 
            }
        }
    
        return minIndex; 
    }

    let parent = []; 
    let distance = []; 
    let mstSet = []; 
    let totalCost = 0;
    markAllEdgesVisited();

    for (let i = 0; i < v; i++) {
        parent[i] = i;
        distance[i] = [Number.MAX_VALUE, -1];
        mstSet[i] = false; 
    }

    distance[0] = [0, -1]; 
    parent[0] = -1;

    function allVisited() {
        for (let i = 0; i < mstSet.length; i++) {
            if (mstSet[i] == false)
                return false;
        }

        return true;
    }

    while (!allVisited()) {
        let at = minKey(distance, mstSet);

        if (mstSet[at])
            continue;

        mstSet[at] = true;
        totalCost += distance[at][0];
        
        if (!nodes[at].hasState("select")) {
            markNodeSelected(at);
            await delay(delayValue);
        }

        for (let i = 0; i < undirectedGraph[at].length; i++) {
            let to = undirectedGraph[at][i][0];
            let w = undirectedGraph[at][i][1];
            let edgeIndex = undirectedGraph[at][i][2];
            markEdgeVisiting(edgeIndex);
            await delay(delayValue);

            if (mstSet[to] == false && w < distance[to][0]) {
                let lastEdgeIndex = distance[to][1];
                parent[to] = at;
                distance[to] = [w, edgeIndex];
                
                if (lastEdgeIndex != -1) {
                    markEdgeVisited(lastEdgeIndex);
                    await delay(delayValue);
                }

                markEdgeSelected(edgeIndex);
                await delay(delayValue);
                
                if (!nodes[to].hasState("select")) {
                    markNodeSelected(to);
                    await delay(delayValue);
                }
            } else {
                markEdgeVisited(edgeIndex);
                await delay(delayValue);
            }
        }
    }

    addTextToConsole("MST Cost: " + totalCost);
}

async function kruskalsMST() {
    let parent = new Array(v);
    let sizes = new Array(v).fill(1);
    let edgeListCopy = [...edgeList];
    let totalCost = 0;
    edgeListCopy.sort((a, b) => a[2] - b[2]);

    for (let i = 0; i < parent.length; i++)
        parent[i] = i;

    function findParent(x) {
        if (x == parent[x])
            return x;

        return parent[x] = findParent(parent[x])
    }

    function doUnion(a, b) {
        a = findParent(a);
        b = findParent(b);

        if (a == b) {
            return false;
        } else {
            if (sizes[a] >= sizes[b]) {
                parent[b] = a;
                sizes[a] += sizes[b];
            } else {
                parent[a] = b;
                sizes[b] += sizes[a];
            }
        }

        return true;
    }

    for (let i = 0; i < edgeListCopy.length; i++) {
        let [u, v, w, edgeIndex] = edgeListCopy[i];
        markEdgeVisiting(edgeIndex);
        await delay(delayValue);
        let verdict = doUnion(u, v);

        if (verdict) {
            markEdgeSelected(edgeIndex);
            await delay(delayValue);
            totalCost += w;

            if (!nodes[u].hasState("select")) {
                markNodeSelected(u);
                await delay(delayValue);
            }

            if (!nodes[v].hasState("select")) {
                markNodeSelected(v);
                await delay(delayValue);
            }
        } else {
            markEdgeVisited(edgeIndex);
            await delay(delayValue);
        }
    }

    addTextToConsole("MST Cost: " + totalCost);
}

async function bellmonFord(at = 0) {
    let parent = [];
    let distance = []; 

    for (let i = 0; i < v; i++) {
        parent[i] = [i, -1];
        distance[i] = Number.MAX_VALUE;
    }

    distance[at] = 0; 
    parent[at] = [-1, -1]; // parent, edge-index
    
    for (let j = 0; j < v; j++) {
        for (let i = 0; i < edgeList.length; i++) {
            let [u, to, w, edgeIndex] = edgeList[i];

            if (distance[u] !== Number.MAX_VALUE && distance[u] + w < distance[to]) {
                distance[to] = distance[u] + w;
                parent[to] = [u, edgeIndex];
            }
        }
    }

    addTextToConsole(`distances to reach nodes from ${getNodeLabel(at)} node`);

    for (let i = 0; i < v; i++) {
        addTextToConsole(`${getNodeLabel(i)}: ${distance[i] == Math.MAX_VALUE ? "∞" : distance[i]} units`);
    }
}

async function floydWarshall() {
    let matrix = [...directedGraphMatrix];

    for (let k = 0; k < v; k++) {
        for (let i = 0; i < v; i++) {
            for (let j = 0; j < v; j++) {
                if (matrix[i][k][0] != -1 && matrix[k][j][0] != -1) {
                    let distance = matrix[i][k][0] + matrix[k][j][0];
                    
                    if (matrix[i][j][0] == -1) {
                        matrix[i][j][0] = distance;
                    } else {
                        matrix[i][j][0] = Math.min(distance, matrix[i][j][0]);
                    }
                }
            }
        }
    }

    for (let i = 0; i < v; i++) {
        addTextToConsole(`distances to reach nodes from ${getNodeLabel(i)} node`);

        for (let j = 0; j < v; j++) {
            addTextToConsole(`${getNodeLabel(j)}: ${matrix[i][j][0] == -1 ? "∞" : matrix[i][j][0]} units`);
        }
    }
}

function markAllNodesSelected() {
    for (let i = 0; i < nodes.length; i++) {
        graph.clearItemStates(nodes[i]);
        graph.setItemState(nodes[i], "select", true);
    }
}

function markAllEdgesSelected() {
    for (let i = 0; i < edges.length; i++) {
        graph.clearItemStates(edges[i]);
        graph.setItemState(edges[i], "select", true);
    }
}

function markAllNodesVisited() {
    for (let i = 0; i < nodes.length; i++) {
        graph.clearItemStates(nodes[i]);
        graph.setItemState(nodes[i], "visited", true);
    }
}

function markAllEdgesVisited() {
    for (let i = 0; i < edges.length; i++) {
        graph.clearItemStates(edges[i]);
        graph.setItemState(edges[i], "visited", true);
    }
}

function markNodeVisiting(at) {
    graph.clearItemStates(nodes[at]);
    graph.setItemState(nodes[at], "visiting", true);
    return;
}

function markNodeVisited(at) {
    graph.clearItemStates(nodes[at]);
    graph.setItemState(nodes[at], "visited", true);
    return;
}

function markNodeSelected(at) {
    graph.clearItemStates(nodes[at]);
    graph.setItemState(nodes[at], "select", true);
    return;
}

function markNodeSelectedWithColour(at, colour) {
    graph.clearItemStates(nodes[at]);
    graph.updateItem(nodes[at], {
        style: {
            fill: colour
        }
    });
    return;
}

function markNodeSelectedWithRandomColour(at) {
    graph.clearItemStates(nodes[at]);
    graph.updateItem(nodes[at], {
        style: {
            fill: randomHEXColour()
        }
    });
    return;
}

function markEdgeVisiting(at) {
    graph.clearItemStates(edges[at]);
    graph.setItemState(edges[at], "visiting", true);
    return;
}

function markEdgeSelected(at) {
    graph.clearItemStates(edges[at]);
    graph.setItemState(edges[at], "select", true);
    return;
}

function markEdgeVisited(at) {
    graph.clearItemStates(edges[at]);
    graph.setItemState(edges[at], "visited", true);
    return;
}