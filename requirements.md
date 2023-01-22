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

## Customers

> **Functional Requirements**
>
> - Users should be able to CRUD customers
> - Users should be able to query customers by name

## Pets

> **Functional Requirements**
>
> - Users should be able to CRUD pets

> **Business rules**
>
> - A pet is owned by a customer (many-to-one relation)

## Services

> **Functional Requirements**
>
> - Users should be able to CRUD services

## Appointments

> **Functional Requirements**
>
> - Users should be able to CRUD appointments
> - Users should be able to query appointments by customers
> - Users should be able to query appointments by services
> - Users should be able to query appointments by dates

> **Business rules**
>
> - A appointment has only ONE service and ONE pet
