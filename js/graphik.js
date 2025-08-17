        const svg = document.getElementById('dynamic-svg');
        const xAxis = document.getElementById('x-axis');
        // Define the graphs with their number of points and colors
        const graphs = [
            { points: 15, color: 'light green' },
            { points: 25, color: 'cyan' },
            { points: 45, color: 'red' }
        ];

        function generateData(count, min, max) {
            const data = [];
            for (let i = 0; i < count; i++) {
                data.push(Math.random() * (max - min) + min);
            }
            return data;
        }

        function createGraph(color) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('class', 'line');
            path.style.stroke = color;
            svg.appendChild(path);
            return path;
        }

        function updateGraphs() {
            // Remove existing graphs
            const existingPaths = svg.querySelectorAll('.line');
            existingPaths.forEach(path => path.remove());

            const svgWidth = svg.clientWidth;
            const viewBoxWidth = svgWidth;
            const viewBoxHeight = 400;

            svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
            xAxis.setAttribute('x2', viewBoxWidth);

            graphs.forEach(graph => {
                const line = createGraph(graph.color);
                const data = generateData(graph.points, 50, 350);
                let pathData = `M0,${data[0]}`;
                const step = viewBoxWidth / (graph.points - 1);
                for (let i = 1; i < graph.points; i++) {
                    pathData += ` L${i * step},${data[i]}`;
                }
                line.setAttribute('d', pathData);

                const lineLength = line.getTotalLength();
                line.style.transition = 'none';
                line.style.strokeDasharray = lineLength;
                line.style.strokeDashoffset = lineLength;

                setTimeout(() => {
                    line.style.transition = 'stroke-dashoffset 6s linear';
                    line.style.strokeDashoffset = 0;
                }, 10);
            });
        }

        window.addEventListener('load', updateGraphs);
        window.addEventListener('resize', updateGraphs);