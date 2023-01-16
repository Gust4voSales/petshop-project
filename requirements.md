## User

> **Functional Requirements**
>
> - Users should be able to create other users
> - The user can login into the APP

> **Business rules**
>
> - On user creation, a default password is created
> - The user sets its new password in the first session
> - The user must be signed in to access the others functionalities (apart from session)

## Clients

> **Functional Requirements**
>
> - Users should be able to CRUD clients
> - Users should be able to query clients by name

## Pets

> **Functional Requirements**
>
> - Users should be able to CRUD pets

> **Business rules**
>
> - A pet is owned by a client (many-to-one relation)

## Services

> **Functional Requirements**
>
> - Users should be able to CRUD services

## Schedules

> **Functional Requirements**
>
> - Users should be able to CRUD schedules
> - Users should be able to query schedules by client
> - Users should be able to query schedules by services

> **Business rules**
>
> - A schedule has only ONE service and ONE pet
