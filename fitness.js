function elementFromHTML(html) {
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
};

const form = document.querySelector('#workout');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const obj = Object.fromEntries(fd);
    console.log(obj);

    const json = JSON.stringify(obj);
    console.log(json);
});