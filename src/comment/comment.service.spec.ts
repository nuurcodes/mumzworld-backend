import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentService } from '@comment/comment.service';
import { Comment } from '@comment/entities/comment.entity';
import { User } from '@user/entities/user.entity';

describe('CommentService', () => {
  let service: CommentService;

  const mockUsersRepository = {
    save: jest
      .fn()
      .mockImplementation((comment) =>
        Promise.resolve({ id: Date.now(), ...comment }),
      ),
    find: jest
      .fn()
      .mockImplementation((condition) => Promise.resolve({ id: 30 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record', async () => {
    expect(
      await service.create(
        { text: 'New comment', user_id: '1', post_id: '1' },
        new User(),
      ),
    ).toEqual({
      id: expect.any(Number),
      text: 'New comment',
      user_id: '1',
      post_id: '1',
      user: new User(),
    });
  });

  it('should find comments for post', async () => {
    expect(await service.findCommentsForPost('1')).toEqual({
      id: 30,
    });
  });
});
