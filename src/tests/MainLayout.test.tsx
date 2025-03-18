import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import MainLayout from '../layouts/MainLayout';

describe('MainLayout Bileşeni', () => {
  test('render edilebilir', () => {
    const { container } = render(<MainLayout />);
    expect(container).toBeDefined();
  });
});