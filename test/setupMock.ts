jest.mock('../src/utils/socket.ts', () => ({
  default: class {
    public static getInstance() {
      return {
        init: jest.fn(),
        send: jest.fn(),
        getMessages: () => [],
        isConnected: () => true,
        getUsername: () => 'foobar',
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    }
  }
}));
