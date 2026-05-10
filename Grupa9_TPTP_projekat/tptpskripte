const scrollButton = document.createElement("button");
scrollButton.innerHTML = "↑";
document.body.appendChild(scrollButton);
Object.assign(scrollButton.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#1c3320",
    color: "#f7fbf8",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    transition: "all 0.3s ease",
    zIndex: "1000",
    opacity: "0",
    visibility: "hidden"
});
scrollButton.addEventListener("mouseover", () => {
    scrollButton.style.transform = "translateY(-4px)";
});
scrollButton.addEventListener("mouseout", () => {
    scrollButton.style.transform = "translateY(0)";
});
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollButton.style.opacity = "1";
        scrollButton.style.visibility = "visible";
    } else {
        scrollButton.style.opacity = "0";
        scrollButton.style.visibility = "hidden";
    }
});
scrollButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
