/* eslint-disable */
export default async () => {
    const t = {
        ["./modules/persona/dto/persona.dto"]: await import("./modules/persona/dto/persona.dto"),
        [".pnpm/@nestjs+common@11.0.9_class-transformer@0.5.1_class-validator@0.14.1_reflect-metadata@0.2.2_rxjs@7.8.1/node_modules/@nestjs/common/enums/http-status.enum"]: await import(".pnpm/@nestjs+common@11.0.9_class-transformer@0.5.1_class-validator@0.14.1_reflect-metadata@0.2.2_rxjs@7.8.1/node_modules/@nestjs/common/enums/http-status.enum"),
        ["./modules/auth/dto/jwt-payload.dto"]: await import("./modules/auth/dto/jwt-payload.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./modules/auth/dto/jwt-payload.dto"), { "JwtPayloadDto": { uuid: { required: true, type: () => String }, email: { required: true, type: () => String }, name: { required: true, type: () => String } } }], [import("./modules/auth/dto/login.dto"), { "LoginDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./modules/auth/dto/register.dto"), { "RegisterDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String }, name: { required: true, type: () => String } } }], [import("./modules/auth/dto/jwt-response.dto"), { "JwtResponseDto": { accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String } } }], [import("./modules/auth/dto/refresh.dto"), { "RefreshDto": { refreshToken: { required: true, type: () => String } } }], [import("./modules/persona/dto/create-persona.dto"), { "CreatePersonaDto": { name: { required: true, type: () => String }, description: { required: true, type: () => String }, characteristics: { required: true, type: () => String }, profileImage: { required: true, type: () => Object } } }], [import("./modules/persona/dto/persona.dto"), { "PersonaDto": { uuid: { required: true, type: () => String }, creatorUUID: { required: true, type: () => String, nullable: true }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, characteristics: { required: true, type: () => String }, profileImage: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } }, "PersonaOverviewDto": { uuid: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, profileImage: { required: true, type: () => String }, createdAt: { required: true, type: () => String } } }], [import("./modules/task/dto/alarm.dto"), { "AlarmDto": { uuid: { required: true, type: () => String }, isActivated: { required: true, type: () => Boolean }, hour: { required: true, type: () => Number }, minute: { required: true, type: () => Number }, repeatDays: { required: true, type: () => [Number] }, persona: { required: true, type: () => t["./modules/persona/dto/persona.dto"].PersonaOverviewDto } } }], [import("./modules/task/dto/create-alarm.dto"), { "CreateAlarmDto": { personaUUID: { required: true, type: () => String }, hour: { required: true, type: () => Number }, minute: { required: true, type: () => Number }, repeatDays: { required: true, type: () => [Number] } } }], [import("./modules/task/dto/update-alarm.dto"), { "UpdateAlarmDto": { isActivated: { required: true, type: () => Boolean } } }], [import("./modules/task/dto/create-todo.dto"), { "CreateTodoDto": { personaUUID: { required: true, type: () => String }, name: { required: true, type: () => String }, targetDate: { required: true, type: () => String } } }], [import("./modules/task/dto/todo.dto"), { "TodoDto": { uuid: { required: true, type: () => String }, name: { required: true, type: () => String }, targetDate: { required: true, type: () => String }, isDone: { required: true, type: () => Boolean }, persona: { required: true, type: () => t["./modules/persona/dto/persona.dto"].PersonaOverviewDto } } }], [import("./modules/task/dto/update-todo.dto"), { "UpdateTodoDto": { isDone: { required: true, type: () => Boolean } } }], [import("./modules/chat/dto/chat.dto"), { "ChatDto": { uuid: { required: true, type: () => String }, targetPersonaUUID: { required: true, type: () => String }, userUUID: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }], [import("./modules/chat/dto/chat-overview.dto"), { "ChatOverviewDto": { uuid: { required: true, type: () => String }, personaName: { required: true, type: () => String }, lastMessage: { required: true, type: () => String }, profileImage: { required: true, type: () => String } } }], [import("./modules/chat/dto/create-chat.dto"), { "CreateChatDto": { targetPersonaUUID: { required: true, type: () => String } } }], [import("./modules/chat/dto/create-message.dto"), { "CreateMessageDto": { content: { required: true, type: () => String } } }], [import("./modules/chat/dto/message.dto"), { "MessageDto": { content: { required: true, type: () => String }, uuid: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, id: { required: true, type: () => Number }, chatUUID: { required: true, type: () => String }, personaUUID: { required: true, type: () => String, nullable: true }, userUUID: { required: true, type: () => String, nullable: true } } }], [import("./common/dto/response.dto"), { "APIResponseDto": { status: { required: true, enum: t[".pnpm/@nestjs+common@11.0.9_class-transformer@0.5.1_class-validator@0.14.1_reflect-metadata@0.2.2_rxjs@7.8.1/node_modules/@nestjs/common/enums/http-status.enum"].HttpStatus }, message: { required: true, type: () => String, default: "OK" }, data: { required: true, type: () => Object, default: null }, responseAt: { required: true, type: () => Date, default: new Date } } }], [import("./modules/user/dto/user.dto"), { "UserDto": { name: { required: true, type: () => String }, email: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }]], "controllers": [[import("./modules/auth/auth.controller"), { "AuthController": { "me": { type: t["./modules/auth/dto/jwt-payload.dto"].JwtPayloadDto }, "login": {}, "refresh": {}, "register": {} } }], [import("./modules/persona/persona.controller"), { "PersonaController": { "getPersonaList": {}, "getPersonaDetail": {}, "createPersona": {} } }], [import("./modules/task/controller/alarm.controller"), { "AlarmController": { "getAlarmList": {}, "createAlarm": {}, "updateAlarm": {}, "deleteAlarm": {} } }], [import("./modules/task/controller/todo.controller"), { "TodoController": { "getTodoList": {}, "createTodo": {}, "updateTodo": {}, "deleteTodo": {} } }], [import("./modules/chat/controller/chat.controller"), { "ChatController": { "getChatList": {}, "createChat": {} } }], [import("./modules/chat/controller/message.controller"), { "MessageController": { "getMessages": {}, "createMessage": {} } }]] } };
};