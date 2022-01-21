import './Footer.css';

export default function Footer({text = 'Copyright'}) {
    return (
        <div className="app-footer">
            <hr />
            {text}
        </div>
    )
}