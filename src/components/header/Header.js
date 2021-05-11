import './Header.scss';
import logo from '../../assets/images/logo.png';

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
