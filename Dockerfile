FROM ruby:2-alpine AS build
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN bundle exec jekyll build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
