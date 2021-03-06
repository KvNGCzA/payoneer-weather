import './Loader.scss';

const Loader = () => (
  <div className='loader-body' data-testid='loader'>
    <div className='loader-container'>
      <div className='loader-filters'>
        <div className='gradient loader-location'></div>
        <div className='gradient loader-temp'></div>
      </div>

      <div className='loader-cards'>
        <div className='gradient loader-card'></div>
        <div className='gradient loader-card'></div>
        <div className='gradient loader-card'></div>
      </div>

      <div className='loader-pagination'>
        <div className='gradient arrow-left'></div>
        <div className='gradient arrow-right'></div>
      </div>

      <div className='loader-chart'>
        <div className='gradient loader-bar'></div>
        <div className='gradient loader-bar'></div>
        <div className='gradient loader-bar'></div>
        <div className='gradient loader-bar'></div>
        <div className='gradient loader-bar'></div>
        <div className='gradient loader-bar'></div>
        <div className='gradient loader-bar'></div>
        <div className='gradient loader-bar'></div>
        <div className='gradient x-axis'></div>
        <div className='gradient y-axis'></div>
      </div>
    </div>
  </div>
);

export default Loader;
