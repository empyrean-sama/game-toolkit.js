#include <iostream>
#include <emscripten/bind.h>
#include "../Vendor/imgui/imgui.h"

float lerp(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

EMSCRIPTEN_BINDINGS(test) {
    emscripten::function("lerp", &lerp);
    emscripten::function("CheckVersion", emscripten::optional_override([] () {
        std::cout << "Hi from C++ Land, CheckVersion() not implemented yet!" << std::endl;
    }));
}