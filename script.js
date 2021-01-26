const projects = [];
const main = document.getElementById('main');

for(let i =0; i<20; i++){
    const project = document.createElement('div');
    project.classList.add('project');
    project.innerHTML = `
        <a href="${i+1}/index.html"><h3>Project ${i + 1}</h3></a>
        <div class="img-project">
            <a href="${i+1}/index.html"><img src="${i + 1}/img.jpg" /></a>
        </div>
    `;

    projects.push(project);
    main.append(project);
}

