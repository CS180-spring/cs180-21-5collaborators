cmake_minimum_required(VERSION 3.20)
project(LionJet)
set(CMAKE_CXX_STANDARD 14)

find_package(Threads REQUIRED)

set(INCLUDE_DIRECTORIES boost_1_82_0 crow/include rapidjson/)

add_executable(LionJet main.cpp)

target_include_directories(LionJet PUBLIC ${INCLUDE_DIRECTORIES})
target_link_libraries(LionJet Threads::Threads)
