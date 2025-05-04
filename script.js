document.getElementById('resume-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const experience = document.getElementById('experience').value;
    const output = document.getElementById('output');
    output.innerHTML = 'Generating resume...';

    const prompt = `Create a professional resume summary for: Name: ${name}, Title: ${title}, Experience: ${experience}`;

    const response = await fetch('https://resume-proxy.humaidk90.workers.dev/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "mistralai/mixtral-8x7b-instruct",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    const doc = new jspdf.jsPDF();
    doc.setFontSize(12);
    doc.text(content, 10, 10);
    doc.save("resume.pdf");

    output.innerHTML = '<p class="text-green-600">Resume generated! Download should begin shortly.</p>';
});
