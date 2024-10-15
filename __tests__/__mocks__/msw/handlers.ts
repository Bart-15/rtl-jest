import { rest } from 'msw';

export const handlers = [
  rest.get('/api/todos', (req, rest, ctx) => {
    return rest(
      ctx.status(200),
      ctx.json([
        { id: 1, text: 'Buy groceries', completed: false },
        { id: 2, text: 'Complete the project report', completed: true },
        { id: 3, text: 'Call the dentist', completed: false },
        { id: 4, text: 'Schedule a meeting with the team', completed: true },
        { id: 5, text: 'Pay electricity bill', completed: false },
      ]),
    );
  }),
];
