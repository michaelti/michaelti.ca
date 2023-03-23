FROM ruby:2.6.5-alpine AS build
WORKDIR /app
RUN gem install bundler
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN bundle exec jekyll build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
