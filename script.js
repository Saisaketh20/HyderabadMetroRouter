function addEdge(graph, src, dest, distance) {
    graph[src].push({ station: dest, distance: distance });
    graph[dest].push({ station: src, distance: distance });
}

function bfs(graph, parent, n, start) {
    let dist = Array(n).fill(Number.MAX_VALUE);

    let queue = [];
    queue.push(start);
    parent[start] = [-1];
    dist[start] = 0;

    while (queue.length > 0) {
        let u = queue.shift();

        for (let v of graph[u]) {
            let ni = v.station;
            let nd = v.distance;

            if (dist[ni] > dist[u] + nd) {
                dist[ni] = dist[u] + nd;
                queue.push(ni);
                parent[ni] = [];
                parent[ni].push(u);
            } else if (dist[ni] === dist[u] + nd) {
                parent[ni].push(u);
            }
        }
    }
}

function findPaths(graph, n, start, end) {
    let paths = [];
    let path = [];
    let parent = Array(n);

    bfs(graph, parent, n, start);
    findPathsUtil(paths, path, parent, n, end);
    return paths;
}

function findPathsUtil(paths, path, parent, n, u) {
    if (u === -1) {
        paths.push([...path]);
        return;
    }

    for (let par of parent[u]) {
        path.push(u);
        findPathsUtil(paths, path, parent, n, par);
        path.pop();
    }
}

function showPaths() {
    let source = parseInt(document.getElementById('source').value);
    let destination = parseInt(document.getElementById('destination').value);

    let graph = [
        [],
        [],
        [],
        [],
        [],
        [],
    ];

    addEdge(graph, 0, 1, 5);
    addEdge(graph, 0, 2, 10);
    addEdge(graph, 1, 3, 6);
    addEdge(graph, 2, 3, 2);
    addEdge(graph, 2, 4, 4);
    addEdge(graph, 3, 4, 1);
    addEdge(graph, 3, 5, 5);
    addEdge(graph, 4, 5, 8);

    let paths = findPaths(graph, 6, source, destination);

    let pathsContainer = document.getElementById('paths-container');
    pathsContainer.innerHTML = '';

    paths.forEach(function(path) {
        path.reverse(); 
        let pathElement = document.createElement('div');
        pathElement.classList.add('path');

        let pathText = path.join(' -> ');
        pathElement.textContent = pathText;

        pathsContainer.appendChild(pathElement);
    });
}
