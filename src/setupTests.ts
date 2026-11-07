import {vi} from 'vitest';

// Don't mock up chartjs components
vi.mock('react-chartjs-2', () => ({
    Line: () => null,
}));
