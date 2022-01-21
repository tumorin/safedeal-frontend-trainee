import './Header.css';

const Header =  ({text ='Application'}) => {

    return (
        <h1 className="app-header">{text}</h1>
    )
}

export default Header;