FROM ruby:latest AS build
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN bundle exec jekyll build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
