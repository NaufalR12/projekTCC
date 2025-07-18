PGDMP      9                 }            moneytracker_users    17.5    17.5     !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            $           1262    24775    moneytracker_users    DATABASE     �   CREATE DATABASE moneytracker_users WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
 "   DROP DATABASE moneytracker_users;
                     postgres    false            O           1247    24777    gender_enum    TYPE     E   CREATE TYPE public.gender_enum AS ENUM (
    'male',
    'female'
);
    DROP TYPE public.gender_enum;
       public               postgres    false            �            1259    24782    users    TABLE     F  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    gender public.gender_enum NOT NULL,
    password character varying(255) NOT NULL,
    foto_profil bytea,
    created_at timestamp without time zone NOT NULL,
    refresh_token text
);
    DROP TABLE public.users;
       public         heap r       postgres    false    847            �            1259    24781    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218            %           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            �           2604    24785    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218                      0    24782    users 
   TABLE DATA           j   COPY public.users (id, name, email, gender, password, foto_profil, created_at, refresh_token) FROM stdin;
    public               postgres    false    218   �       &           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public               postgres    false    217            �           2606    24789    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218                  x������ � �     