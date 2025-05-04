
document.getElementById('resume-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const experience = document.getElementById('experience').value;
    const output = document.getElementById('output');
    output.innerHTML = 'Generating resume...';

    const prompt = `Create a professional resume summary for: Name: ${name}, Title: ${title}, Experience: ${experience}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "mistralai/mixtral-8x7b-instruct",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(content, 10, 10);
    doc.save("resume.pdf");

    output.innerHTML = '<p class="text-green-600">Resume generated! Download should begin shortly.</p>';
});
