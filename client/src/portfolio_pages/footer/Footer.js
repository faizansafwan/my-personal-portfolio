export default function Footer() {
    return (
        <div className="footer-parent" style={{
            backgroundColor: "#f1f3f6",
            padding: "15px 0",
            textAlign: "center",
            borderTop: "1px solid #ccc",
            marginTop: "auto"
        }}>
            <footer className="text-muted">
                &copy; {new Date().getFullYear()} Faizan Safwan. Code, Design, and Pixels by Me.

            </footer>
        </div>
    );
}
