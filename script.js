function convertText(type) {
    let textArea = document.getElementById("text-input");
    let text = textArea.value;

    switch (type) {
        case 'uppercase': textArea.value = text.toUpperCase(); break;
        case 'lowercase': textArea.value = text.toLowerCase(); break;
        case 'titlecase': 
            textArea.value = text.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
            );
            break;
        case 'sentencecase': 
            textArea.value = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
            break;
    }
    updateWordCount();
}

function trimSpaces() {
    let textArea = document.getElementById("text-input");
    textArea.value = textArea.value.trim().replace(/\s+/g, ' ');
    updateWordCount();
}

function reverseText() {
    let textArea = document.getElementById("text-input");
    textArea.value = textArea.value.split("").reverse().join("");
}

function sortLines() {
    let textArea = document.getElementById("text-input");
    let lines = textArea.value.split("\n").sort();
    textArea.value = lines.join("\n");
}

function copyText() {
    let textArea = document.getElementById("text-input");
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    alert("Text copied!");
}

function downloadText() {
    let text = document.getElementById("text-input").value;
    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "formatted-text.txt";
    link.click();
}

function findAndReplace() {
    let textArea = document.getElementById("text-input");
    let findText = document.getElementById("find-text").value;
    let replaceText = document.getElementById("replace-text").value;

    if (findText.trim() !== "") {
        let regex = new RegExp(findText, "gi");
        textArea.value = textArea.value.replace(regex, replaceText);
    }
}

function updateWordCount() {
    let text = document.getElementById("text-input").value.trim();
    let wordCount = text.length > 0 ? text.split(/\s+/).length : 0;
    let charCount = text.length;
    document.getElementById("word-count").innerText = `Words: ${wordCount} | Characters: ${charCount}`;
}

document.getElementById("text-input").addEventListener("input", updateWordCount);