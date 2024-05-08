import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { User } from '../../api/users/entities/user.entity';
import { Action } from './action.enum';
import { Injectable } from '@nestjs/common';
import { Article } from '../../api/blogs/entities/article.entity';

type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class Permit {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.claims.isAdministrator) {
      can(Action.MANAGE, 'all'); // read-write access to everything
    } else {
      can(Action.READ, 'all'); // read-only access to everything
    }

    can(Action.UPDATE, Article, { authorId: user.id });
    cannot(Action.DELETE, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
