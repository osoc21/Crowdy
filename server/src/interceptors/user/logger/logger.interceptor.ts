// import {
//   CallHandler,
//   ExecutionContext,
//   Inject,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { Observable } from 'rxjs';
// import { Logger } from 'winston';

// @Injectable()
// export class LoggerInterceptor implements NestInterceptor {
//   constructor(@Inject('winston') private logger: Logger) {}
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const ctx = GqlExecutionContext.create(context);
//     const { req } = ctx.getContext();
//     this.log(req);
//     // console.log(req);
//     return next.handle();
//   }

//   private log(req: any) {
//     const body = { ...req.user };
//     delete body.firstname;
//     delete body.lastname;
//     delete body._password;
//     delete body.salt;
//     delete body.confirmationToken;
//     delete body.recoverToken;
//     delete body.createdAt;
//     delete body.updatedAt;
//     const user = (req as any).user;
//     const userEmail = user ? user.email : null;
//     this.logger.info({
//       timestamp: new Date().toISOString(),
//       method: req.method,
//       data: {
//         body: body,
//         pathname: req.pathname,
//         oparationName: req.body.operationName,
//         variables: req.body.variables.input,
//       },
//       from: req.ip,
//       Made_By: userEmail,
//     });
//   }
// }
