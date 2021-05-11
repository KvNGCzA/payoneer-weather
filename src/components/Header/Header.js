import logo from '../../assets/images/logo.png';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt='payoneer logo' className='header-logo' />
      </div>
    </header>
  );
};

export default Header;
