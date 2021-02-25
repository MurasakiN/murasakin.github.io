class BindModelView {

    static bind(model, view, viewAction, ...modelWatchProps) {

        let proxy = new Proxy(model, {

            get(target, prop, receiver) {

                if (modelWatchProps.includes(prop) && BindModelView._isFunction(target[prop])) {

                    return function() {

                        Reflect.apply(target[prop], target, arguments);
                        view[viewAction](target);

                    }

                }

                return Reflect.get(target, prop, receiver);

            },

            set(target, prop, value, receiver) {

                Reflect.set(target, prop, value, receiver);
                if(modelWatchProps.includes(prop)) view[viewAction](target);

            }

        });

        view[viewAction](model);

        return proxy;

    }

    static _isFunction(f) {
        return typeof f == typeof Function ? true : false;
    }

}