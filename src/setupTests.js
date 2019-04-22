import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Don't mock up chartjs components
jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));
