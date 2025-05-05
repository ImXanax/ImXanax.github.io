const form = document.getElementById("cardForm");
const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("downloadBtn");

const background = new Image();
background.src = "images/template.png";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title").toUpperCase();
    const artist = formData.get("artist").toUpperCase();
    const bp = formData.get("bp") || "x";
    const cp = formData.get("cp") || "x";
    let tuning = formData.get("nris") || "";
    tuning = tuning.split(",").map(s => s.trim()).filter(Boolean).slice(0, 6);
    while (tuning.length < 6) tuning.push("x");
    await document.fonts.load("56px fff");
    await document.fonts.ready;

    if (background.complete) {
        drawCard({ title, artist, bp, cp, tuning });
    } else {
        background.onload = () => {
            drawCard({ title, artist, bp, cp, tuning });
        };
    }
});


downloadBtn.addEventListener("click", () => {
    const link = document.createElement('a');
    link.download = 'guitar-card.png';
    link.href = canvas.toDataURL();
    link.click();
});

function drawCard({title, artist, bp, cp, tuning}) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";

    ctx.font = "36px fff";
    ctx.fillText(`${bp}`, 556, 334);
    ctx.fillText(`${cp}`, 900, 334);

    ctx.font = "56px fff";
    ctx.fillText(title, 98, 543);
    ctx.fillText(artist, 98, 721);

    const xPositions = [265, 389, 522, 655, 789, 922];
    ctx.font = "28px fff";
    tuning.forEach((note, i) => {
        ctx.fillText(note, xPositions[i], 878);
    });
}

