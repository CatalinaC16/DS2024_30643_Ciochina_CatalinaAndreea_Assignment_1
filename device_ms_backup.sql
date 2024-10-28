--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


create table if not exists public.users
(
    id uuid not null
        primary key
);

alter table public.users
    owner to postgres;

create table if not exists public.devices
(
    max_hourly_energy_consumption integer      not null,
    id                            uuid         not null
        primary key,
    user_id                       uuid
        constraint fkrfbri1ymrwywdydc4dgywe1bt
            references public.users,
    address                       varchar(255) not null,
    description                   varchar(255) not null
);

alter table public.devices
    owner to postgres;


--
-- PostgreSQL database dump complete
--

