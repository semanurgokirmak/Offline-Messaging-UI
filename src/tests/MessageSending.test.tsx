import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MainLayout from '../layouts/MainLayout';

describe('MessageSending Özelliği', () => {
  test('mesaj input alanı render edilebilir', () => {
    render(<MainLayout />);
    
    const firstChatItem = screen.getByText('Ayşe Demir');
    fireEvent.click(firstChatItem);
    
    const messageInput = screen.getByPlaceholderText('Mesaj yazın...');
    expect(messageInput).toBeDefined();
  });
  
  test('gönder butonu render edilebilir', () => {
    render(<MainLayout />);
    
    const firstChatItem = screen.getByText('Ayşe Demir');
    fireEvent.click(firstChatItem);
    
    const sendButton = screen.getByText('Gönder');
    expect(sendButton).toBeDefined();
  });
});