const AbrovaTraceError = require('../lib/models/AbrovaTraceError');

describe('event id', () => {
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  test('every error has its own id, sent as event_id', () => {
    const first = new AbrovaTraceError({ message: 'boom' });
    const second = new AbrovaTraceError({ message: 'boom' });

    expect(first.toJSON().event_id).toMatch(UUID);
    expect(first.toJSON().event_id).not.toBe(second.toJSON().event_id);
  });

  test('the same error keeps its id every time it is serialised', () => {
    const error = new AbrovaTraceError({ message: 'boom' });
    expect(error.toJSON().event_id).toBe(error.toJSON().event_id);
  });
});
