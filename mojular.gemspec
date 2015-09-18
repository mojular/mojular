$:.push File.expand_path("../lib", __FILE__)
require 'mojular/version'

Gem::Specification.new do |s|
  s.name     = "mojular"
  s.version  = Mojular::VERSION
  s.authors  = ["Tyom Semonov"]
  s.email    = 'inspiro@gmail.com'
  s.summary  = ""
  s.homepage = "https://github.com/mojular/mojular"
  s.license  = 'MIT'

  s.files      = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- test/*`.split("\n")
end
