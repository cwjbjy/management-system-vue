let directive = function (Vue) {
    Vue.directive('title', {
        inserted: function (el, binding) {
            document.title = binding.value
        }
    })
}

export default directive