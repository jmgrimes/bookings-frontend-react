# Build stage to test React application and compile into a servable production bundle.
FROM node:lts-alpine AS build

WORKDIR /app
ADD . /app/
RUN corepack pnpm install
RUN corepack pnpm run build

# Distribution stage to assemble production bundle on NGINX with required API endpoint proxying and other runtime features.
FROM nginx:stable-alpine

LABEL maintainer="jonah@nerdynarwhal.com"
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.name="jmgrimes/hello-react"
LABEL org.label-schema.description="An example project using React, with support for Backstage cataloging, Techdocs, GitHub Actions, and GitHub Packages."
LABEL org.label-schema.vendor="nerdynarwhal.com"

COPY etc/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/build/ /usr/share/nginx/html/