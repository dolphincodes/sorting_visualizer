(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let s = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function u(t) {
        return null !== t && "object" == typeof t;
      }
      const c = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: s,
              _unsubscribe: i,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (r(i)) {
              s && (this._unsubscribe = void 0);
              try {
                i.call(this);
              } catch (a) {
                e = a instanceof c ? d(a.errors) : [a];
              }
            }
            if (l(o)) {
              let t = -1,
                n = o.length;
              for (; ++t < n; ) {
                const n = o[t];
                if (u(n))
                  try {
                    n.unsubscribe();
                  } catch (a) {
                    (e = e || []),
                      a instanceof c ? (e = e.concat(d(a.errors))) : e.push(a);
                  }
              }
            }
            if (e) throw new c(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof c ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new m(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new m(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const r = new f(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class m extends f {
        constructor(t, e, n, s) {
          let i;
          super(), (this._parentSubscriber = t);
          let o = this;
          r(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (o(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const g = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function y(t) {
        return t;
      }
      let _ = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = v(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [g]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? y
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = v(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function v(t) {
        if ((t || (t = i.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const b = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class w extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class x extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let S = (() => {
        class t extends _ {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new x(this);
          }
          lift(t) {
            const e = new E(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new b();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new b();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new b();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new b();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new b();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new w(this, t));
          }
          asObservable() {
            const t = new _();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new E(t, e)), t;
      })();
      class E extends S {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function C(t) {
        return t && "function" == typeof t.schedule;
      }
      function k(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new T(t, e));
        };
      }
      class T {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new A(t, this.project, this.thisArg));
        }
      }
      class A extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const I = (t) => (e) => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function O() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const R = O(),
        P = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function L(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const D = (t) => {
        if (t && "function" == typeof t[g])
          return (
            (r = t),
            (t) => {
              const e = r[g]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (P(t)) return I(t);
        if (L(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, o),
              t
            )
          );
        if (t && "function" == typeof t[R])
          return (
            (e = t),
            (t) => {
              const n = e[R]();
              for (;;) {
                let e;
                try {
                  e = n.next();
                } catch (r) {
                  return t.error(r), t;
                }
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = u(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n, r;
      };
      function N(t, e) {
        return new _((n) => {
          const r = new h();
          let s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function F(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[g];
                  })(t)
                )
                  return (function (t, e) {
                    return new _((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[g]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (L(t))
                  return (function (t, e) {
                    return new _((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (P(t)) return N(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[R];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new _((n) => {
                      const r = new h();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[R]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof _
          ? t
          : new _(D(t));
      }
      class j extends f {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class M extends f {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function U(t, e) {
        if (!e.closed) return t instanceof _ ? t.subscribe(e) : D(t)(e);
      }
      function V(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                V((n, r) => F(t(n, r)).pipe(k((t, s) => e(n, t, r, s))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new B(t, n)));
      }
      class B {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new $(t, this.project, this.concurrent));
        }
      }
      class $ extends M {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new j(this),
            n = this.destination;
          n.add(e);
          const r = U(t, e);
          r !== e && n.add(r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function H(t = Number.POSITIVE_INFINITY) {
        return V(y, t);
      }
      function z(t, e) {
        return e ? N(t, e) : new _(I(t));
      }
      function q(...t) {
        let e = Number.POSITIVE_INFINITY,
          n = null,
          r = t[t.length - 1];
        return (
          C(r)
            ? ((n = t.pop()),
              t.length > 1 &&
                "number" == typeof t[t.length - 1] &&
                (e = t.pop()))
            : "number" == typeof r && (e = t.pop()),
          null === n && 1 === t.length && t[0] instanceof _
            ? t[0]
            : H(e)(z(t, n))
        );
      }
      function Q() {
        return function (t) {
          return t.lift(new W(t));
        };
      }
      class W {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new G(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class G extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class K extends _ {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new Y(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return Q()(this);
        }
      }
      const Z = (() => {
        const t = K.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class Y extends x {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function J(t, e) {
        return function (n) {
          let r;
          if (
            ((r =
              "function" == typeof t
                ? t
                : function () {
                    return t;
                  }),
            "function" == typeof e)
          )
            return n.lift(new X(r, e));
          const s = Object.create(n, Z);
          return (s.source = n), (s.subjectFactory = r), s;
        };
      }
      class X {
        constructor(t, e) {
          (this.subjectFactory = t), (this.selector = e);
        }
        call(t, e) {
          const { selector: n } = this,
            r = this.subjectFactory(),
            s = n(r).subscribe(t);
          return s.add(e.subscribe(r)), s;
        }
      }
      function tt() {
        return new S();
      }
      function et(t) {
        return { toString: t }.toString();
      }
      const nt = "__parameters__";
      function rt(t, e, n) {
        return et(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty(nt)
                ? t[nt]
                : Object.defineProperty(t, nt, { value: [] })[nt];
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      const st = rt("Inject", (t) => ({ token: t })),
        it = rt("Optional"),
        ot = rt("Self"),
        at = rt("SkipSelf");
      var lt = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function ut(t) {
        for (let e in t) if (t[e] === ut) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function ct(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function ht(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function dt(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function pt(t) {
        return ft(t, t[gt]) || ft(t, t[vt]);
      }
      function ft(t, e) {
        return e && e.token === t ? e : null;
      }
      function mt(t) {
        return t && (t.hasOwnProperty(yt) || t.hasOwnProperty(bt))
          ? t[yt]
          : null;
      }
      const gt = ut({ ɵprov: ut }),
        yt = ut({ ɵinj: ut }),
        _t = ut({ ɵprovFallback: ut }),
        vt = ut({ ngInjectableDef: ut }),
        bt = ut({ ngInjectorDef: ut });
      function wt(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(wt).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return "" + t.overriddenName;
        if (t.name) return "" + t.name;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function xt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const St = ut({ __forward_ref__: ut });
      function Et(t) {
        return (
          (t.__forward_ref__ = Et),
          (t.toString = function () {
            return wt(this());
          }),
          t
        );
      }
      function Ct(t) {
        return kt(t) ? t() : t;
      }
      function kt(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(St) &&
          t.__forward_ref__ === Et
        );
      }
      const Tt = "undefined" != typeof globalThis && globalThis,
        At = "undefined" != typeof window && window,
        It =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Ot = "undefined" != typeof global && global,
        Rt = Tt || Ot || At || It,
        Pt = ut({ ɵcmp: ut }),
        Lt = ut({ ɵdir: ut }),
        Dt = ut({ ɵpipe: ut }),
        Nt = ut({ ɵmod: ut }),
        Ft = ut({ ɵloc: ut }),
        jt = ut({ ɵfac: ut }),
        Mt = ut({ __NG_ELEMENT_ID__: ut });
      class Ut {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = ht({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return "InjectionToken " + this._desc;
        }
      }
      const Vt = new Ut("INJECTOR", -1),
        Bt = {},
        $t = /\n/gm,
        Ht = "__source",
        zt = ut({ provide: String, useValue: ut });
      let qt,
        Qt = void 0;
      function Wt(t) {
        const e = Qt;
        return (Qt = t), e;
      }
      function Gt(t) {
        const e = qt;
        return (qt = t), e;
      }
      function Kt(t, e = lt.Default) {
        if (void 0 === Qt)
          throw new Error("inject() must be called from an injection context");
        return null === Qt
          ? Jt(t, void 0, e)
          : Qt.get(t, e & lt.Optional ? null : void 0, e);
      }
      function Zt(t, e = lt.Default) {
        return (qt || Kt)(Ct(t), e);
      }
      const Yt = Zt;
      function Jt(t, e, n) {
        const r = pt(t);
        if (r && "root" == r.providedIn)
          return void 0 === r.value ? (r.value = r.factory()) : r.value;
        if (n & lt.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${wt(t)}]`);
      }
      function Xt(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = Ct(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = lt.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e];
              s instanceof it || "Optional" === s.ngMetadataName || s === it
                ? (n |= lt.Optional)
                : s instanceof at || "SkipSelf" === s.ngMetadataName || s === at
                ? (n |= lt.SkipSelf)
                : s instanceof ot || "Self" === s.ngMetadataName || s === ot
                ? (n |= lt.Self)
                : (t = s instanceof st || s === st ? s.token : s);
            }
            e.push(Zt(t, n));
          } else e.push(Zt(r));
        }
        return e;
      }
      class te {
        get(t, e = Bt) {
          if (e === Bt) {
            const e = new Error(`NullInjectorError: No provider for ${wt(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      class ee {}
      class ne {}
      function re(t, e) {
        t.forEach((t) => (Array.isArray(t) ? re(t, e) : e(t)));
      }
      function se(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function ie(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function oe(t, e) {
        const n = [];
        for (let r = 0; r < t; r++) n.push(e);
        return n;
      }
      function ae(t, e, n) {
        let r = ue(t, e);
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function (t, e, n, r) {
                let s = t.length;
                if (s == e) t.push(n, r);
                else if (1 === s) t.push(r, t[0]), (t[0] = n);
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; )
                    (t[s] = t[s - 2]), s--;
                  (t[e] = n), (t[e + 1] = r);
                }
              })(t, r, e, n)),
          r
        );
      }
      function le(t, e) {
        const n = ue(t, e);
        if (n >= 0) return t[1 | n];
      }
      function ue(t, e) {
        return (function (t, e, n) {
          let r = 0,
            s = t.length >> 1;
          for (; s !== r; ) {
            const n = r + ((s - r) >> 1),
              i = t[n << 1];
            if (e === i) return n << 1;
            i > e ? (s = n) : (r = n + 1);
          }
          return ~(s << 1);
        })(t, e);
      }
      var ce = (function (t) {
          return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
          );
        })({}),
        he = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.Native = 1)] = "Native"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({});
      const de = {},
        pe = [];
      let fe = 0;
      function me(t) {
        return et(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === ce.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || pe,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || he.Emulated,
              id: "c",
              styles: t.styles || pe,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            s = t.features,
            i = t.pipes;
          return (
            (n.id += fe++),
            (n.inputs = be(t.inputs, e)),
            (n.outputs = be(t.outputs)),
            s && s.forEach((t) => t(n)),
            (n.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(ge)
              : null),
            (n.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(ye)
              : null),
            n
          );
        });
      }
      function ge(t) {
        return (
          xe(t) ||
          (function (t) {
            return t[Lt] || null;
          })(t)
        );
      }
      function ye(t) {
        return (function (t) {
          return t[Dt] || null;
        })(t);
      }
      const _e = {};
      function ve(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || pe,
          declarations: t.declarations || pe,
          imports: t.imports || pe,
          exports: t.exports || pe,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            et(() => {
              _e[t.id] = t.type;
            }),
          e
        );
      }
      function be(t, e) {
        if (null == t) return de;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s;
            Array.isArray(s) && ((i = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = i);
          }
        return n;
      }
      const we = me;
      function xe(t) {
        return t[Pt] || null;
      }
      function Se(t, e) {
        return t.hasOwnProperty(jt) ? t[jt] : null;
      }
      function Ee(t, e) {
        const n = t[Nt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${wt(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const Ce = 20,
        ke = 10;
      function Te(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Ae(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Ie(t) {
        return 0 != (8 & t.flags);
      }
      function Oe(t) {
        return 2 == (2 & t.flags);
      }
      function Re(t) {
        return 1 == (1 & t.flags);
      }
      function Pe(t) {
        return null !== t.template;
      }
      function Le(t) {
        return 0 != (512 & t[2]);
      }
      class De {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ne() {
        return Fe;
      }
      function Fe(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = Me), je;
      }
      function je() {
        const t = Ue(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === de) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function Me(t, e, n, r) {
        const s =
            Ue(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: de, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new De(l && l.currentValue, e, o === de)), (t[r] = e);
      }
      function Ue(t) {
        return t.__ngSimpleChanges__ || null;
      }
      Ne.ngInherit = !0;
      let Ve = void 0;
      function Be(t) {
        return !!t.listen;
      }
      const $e = {
        createRenderer: (t, e) =>
          void 0 !== Ve
            ? Ve
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function He(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function ze(t, e) {
        return He(e[t + Ce]);
      }
      function qe(t, e) {
        return He(e[t.index]);
      }
      function Qe(t, e) {
        return t.data[e + Ce];
      }
      function We(t, e) {
        const n = e[t];
        return Te(n) ? n : n[0];
      }
      function Ge(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Ke(t) {
        return 4 == (4 & t[2]);
      }
      function Ze(t) {
        return 128 == (128 & t[2]);
      }
      function Ye(t, e) {
        return null === t || null == e ? null : t[e];
      }
      function Je(t) {
        t[18] = 0;
      }
      function Xe(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const tn = {
        lFrame: bn(null),
        bindingsEnabled: !0,
        checkNoChangesMode: !1,
      };
      function en() {
        return tn.bindingsEnabled;
      }
      function nn() {
        return tn.lFrame.lView;
      }
      function rn() {
        return tn.lFrame.tView;
      }
      function sn() {
        return tn.lFrame.previousOrParentTNode;
      }
      function on(t, e) {
        (tn.lFrame.previousOrParentTNode = t), (tn.lFrame.isParent = e);
      }
      function an() {
        return tn.lFrame.isParent;
      }
      function ln() {
        tn.lFrame.isParent = !1;
      }
      function un() {
        return tn.checkNoChangesMode;
      }
      function cn(t) {
        tn.checkNoChangesMode = t;
      }
      function hn() {
        const t = tn.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function dn() {
        return tn.lFrame.bindingIndex++;
      }
      function pn(t, e) {
        const n = tn.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), fn(e);
      }
      function fn(t) {
        tn.lFrame.currentDirectiveIndex = t;
      }
      function mn() {
        return tn.lFrame.currentQueryIndex;
      }
      function gn(t) {
        tn.lFrame.currentQueryIndex = t;
      }
      function yn(t, e) {
        const n = vn();
        (tn.lFrame = n), (n.previousOrParentTNode = e), (n.lView = t);
      }
      function _n(t, e) {
        const n = vn(),
          r = t[1];
        (tn.lFrame = n),
          (n.previousOrParentTNode = e),
          (n.lView = t),
          (n.tView = r),
          (n.contextLView = t),
          (n.bindingIndex = r.bindingStartIndex);
      }
      function vn() {
        const t = tn.lFrame,
          e = null === t ? null : t.child;
        return null === e ? bn(t) : e;
      }
      function bn(t) {
        const e = {
          previousOrParentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
        };
        return null !== t && (t.child = e), e;
      }
      function wn() {
        const t = tn.lFrame;
        return (
          (tn.lFrame = t.parent),
          (t.previousOrParentTNode = null),
          (t.lView = null),
          t
        );
      }
      const xn = wn;
      function Sn() {
        const t = wn();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = 0),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function En() {
        return tn.lFrame.selectedIndex;
      }
      function Cn(t) {
        tn.lFrame.selectedIndex = t;
      }
      function kn() {
        const t = tn.lFrame;
        return Qe(t.tView, t.selectedIndex);
      }
      function Tn(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: s,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = e;
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function An(t, e, n) {
        Rn(t, e, 3, n);
      }
      function In(t, e, n, r) {
        (3 & t[2]) === n && Rn(t, e, n, r);
      }
      function On(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function Rn(t, e, n, r) {
        const s = null != r ? r : -1;
        let i = 0;
        for (let o = void 0 !== r ? 65535 & t[18] : 0; o < e.length; o++)
          if ("number" == typeof e[o + 1]) {
            if (((i = e[o]), null != r && i >= r)) break;
          } else
            e[o] < 0 && (t[18] += 65536),
              (i < s || -1 == s) &&
                (Pn(t, n, e, o), (t[18] = (4294901760 & t[18]) + o + 2)),
              o++;
      }
      function Pn(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          o = t[s ? -n[r] : n[r]];
        s
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), i.call(o))
          : i.call(o);
      }
      class Ln {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function Dn(t, e, n) {
        const r = Be(t);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if ("number" == typeof i) {
            if (0 !== i) break;
            s++;
            const o = n[s++],
              a = n[s++],
              l = n[s++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++s];
            Fn(o)
              ? r && t.setProperty(e, o, a)
              : r
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              s++;
          }
        }
        return s;
      }
      function Nn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function Fn(t) {
        return 64 === t.charCodeAt(0);
      }
      function jn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                Mn(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function Mn(t, e, n, r, s) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s));
            if (r === t[i + 1]) return void (t[i + 2] = s);
          }
          i++, null !== r && i++, null !== s && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s);
      }
      function Un(t) {
        return -1 !== t;
      }
      function Vn(t) {
        return 32767 & t;
      }
      function Bn(t) {
        return t >> 16;
      }
      function $n(t, e) {
        let n = Bn(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      function Hn(t) {
        return "string" == typeof t ? t : null == t ? "" : "" + t;
      }
      function zn(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : Hn(t);
      }
      const qn = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Rt))();
      function Qn(t) {
        return t instanceof Function ? t() : t;
      }
      let Wn = !0;
      function Gn(t) {
        const e = Wn;
        return (Wn = t), e;
      }
      let Kn = 0;
      function Zn(t, e) {
        const n = Jn(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Yn(r.data, t),
          Yn(e, null),
          Yn(r.blueprint, null));
        const s = Xn(t, e),
          i = t.injectorIndex;
        if (Un(s)) {
          const t = Vn(s),
            n = $n(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
        }
        return (e[i + 8] = s), i;
      }
      function Yn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Jn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null == e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Xn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = e[6],
          r = 1;
        for (; n && -1 === n.injectorIndex; )
          (n = (e = e[15]) ? e[6] : null), r++;
        return n ? n.injectorIndex | (r << 16) : -1;
      }
      function tr(t, e, n) {
        !(function (t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Mt) && (r = n[Mt]),
            null == r && (r = n[Mt] = Kn++);
          const s = 255 & r,
            i = 1 << s,
            o = 64 & s,
            a = 32 & s,
            l = e.data;
          128 & s
            ? o
              ? a
                ? (l[t + 7] |= i)
                : (l[t + 6] |= i)
              : a
              ? (l[t + 5] |= i)
              : (l[t + 4] |= i)
            : o
            ? a
              ? (l[t + 3] |= i)
              : (l[t + 2] |= i)
            : a
            ? (l[t + 1] |= i)
            : (l[t] |= i);
        })(t, e, n);
      }
      function er(t, e, n, r = lt.Default, s) {
        if (null !== t) {
          const s = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Mt) ? t[Mt] : void 0;
            return "number" == typeof e && e > 0 ? 255 & e : e;
          })(n);
          if ("function" == typeof s) {
            yn(e, t);
            try {
              const t = s();
              if (null != t || r & lt.Optional) return t;
              throw new Error(`No provider for ${zn(n)}!`);
            } finally {
              xn();
            }
          } else if ("number" == typeof s) {
            if (-1 === s) return new lr(t, e);
            let i = null,
              o = Jn(t, e),
              a = -1,
              l = r & lt.Host ? e[16][6] : null;
            for (
              (-1 === o || r & lt.SkipSelf) &&
              ((a = -1 === o ? Xn(t, e) : e[o + 8]),
              ar(r, !1) ? ((i = e[1]), (o = Vn(a)), (e = $n(a, e))) : (o = -1));
              -1 !== o;

            ) {
              a = e[o + 8];
              const t = e[1];
              if (or(s, o, t.data)) {
                const t = rr(o, e, n, i, r, l);
                if (t !== nr) return t;
              }
              ar(r, e[1].data[o + 8] === l) && or(s, o, e)
                ? ((i = t), (o = Vn(a)), (e = $n(a, e)))
                : (o = -1);
            }
          }
        }
        if (
          (r & lt.Optional && void 0 === s && (s = null),
          0 == (r & (lt.Self | lt.Host)))
        ) {
          const t = e[9],
            i = Gt(void 0);
          try {
            return t ? t.get(n, s, r & lt.Optional) : Jt(n, s, r & lt.Optional);
          } finally {
            Gt(i);
          }
        }
        if (r & lt.Optional) return s;
        throw new Error(`NodeInjector: NOT_FOUND [${zn(n)}]`);
      }
      const nr = {};
      function rr(t, e, n, r, s, i) {
        const o = e[1],
          a = o.data[t + 8],
          l = sr(
            a,
            o,
            n,
            null == r ? Oe(a) && Wn : r != o && 3 === a.type,
            s & lt.Host && i === a
          );
        return null !== l ? ir(e, o, l, a) : nr;
      }
      function sr(t, e, n, r, s) {
        const i = t.providerIndexes,
          o = e.data,
          a = 1048575 & i,
          l = t.directiveStart,
          u = i >> 20,
          c = s ? a + u : t.directiveEnd;
        for (let h = r ? a : a + u; h < c; h++) {
          const t = o[h];
          if ((h < l && n === t) || (h >= l && t.type === n)) return h;
        }
        if (s) {
          const t = o[l];
          if (t && Pe(t) && t.type === n) return l;
        }
        return null;
      }
      function ir(t, e, n, r) {
        let s = t[n];
        const i = e.data;
        if (s instanceof Ln) {
          const o = s;
          if (o.resolving) throw new Error("Circular dep for " + zn(i[n]));
          const a = Gn(o.canSeeViewProviders);
          let l;
          (o.resolving = !0), o.injectImpl && (l = Gt(o.injectImpl)), yn(t, r);
          try {
            (s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: s,
                    ngDoCheck: i,
                  } = e.type.prototype;
                  if (r) {
                    const r = Fe(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, r);
                  }
                  s &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i));
                })(n, i[n], e);
          } finally {
            o.injectImpl && Gt(l), Gn(a), (o.resolving = !1), xn();
          }
        }
        return s;
      }
      function or(t, e, n) {
        const r = 64 & t,
          s = 32 & t;
        let i;
        return (
          (i =
            128 & t
              ? r
                ? s
                  ? n[e + 7]
                  : n[e + 6]
                : s
                ? n[e + 5]
                : n[e + 4]
              : r
              ? s
                ? n[e + 3]
                : n[e + 2]
              : s
              ? n[e + 1]
              : n[e]),
          !!(i & (1 << t))
        );
      }
      function ar(t, e) {
        return !(t & lt.Self || (t & lt.Host && e));
      }
      class lr {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return er(this._tNode, this._lView, t, void 0, e);
        }
      }
      function ur(t) {
        const e = t;
        if (kt(t))
          return () => {
            const t = ur(Ct(e));
            return t ? t() : null;
          };
        let n = Se(e);
        if (null === n) {
          const t = mt(e);
          n = t && t.factory;
        }
        return n || null;
      }
      function cr(t) {
        return et(() => {
          const e = t.prototype.constructor,
            n = e[jt] || ur(e),
            r = Object.prototype;
          let s = Object.getPrototypeOf(t.prototype).constructor;
          for (; s && s !== r; ) {
            const t = s[jt] || ur(s);
            if (t && t !== n) return t;
            s = Object.getPrototypeOf(s);
          }
          return (t) => new t();
        });
      }
      function hr(t) {
        return t.ngDebugContext;
      }
      function dr(t) {
        return t.ngOriginalError;
      }
      function pr(t, ...e) {
        t.error(...e);
      }
      class fr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || pr;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (hr(t) ? hr(t) : this._findContext(dr(t))) : null;
        }
        _findOriginalError(t) {
          let e = dr(t);
          for (; e && dr(e); ) e = dr(e);
          return e;
        }
      }
      class mr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            "SafeValue must use [property]=binding: " +
            this.changingThisBreaksApplicationSecurity +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      class gr extends mr {
        getTypeName() {
          return "HTML";
        }
      }
      class yr extends mr {
        getTypeName() {
          return "Style";
        }
      }
      class _r extends mr {
        getTypeName() {
          return "Script";
        }
      }
      class vr extends mr {
        getTypeName() {
          return "URL";
        }
      }
      class br extends mr {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function wr(t) {
        return t instanceof mr ? t.changingThisBreaksApplicationSecurity : t;
      }
      function xr(t, e) {
        const n = Sr(t);
        if (null != n && n !== e) {
          if ("ResourceURL" === n && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`
          );
        }
        return n === e;
      }
      function Sr(t) {
        return (t instanceof mr && t.getTypeName()) || null;
      }
      let Er = !0,
        Cr = !1;
      function kr() {
        return (Cr = !0), Er;
      }
      class Tr {
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const e = new window.DOMParser().parseFromString(t, "text/html")
              .body;
            return e.removeChild(e.firstChild), e;
          } catch (e) {
            return null;
          }
        }
      }
      class Ar {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              "sanitization-inert"
            )),
            null == this.inertDocument.body)
          ) {
            const t = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(t);
            const e = this.inertDocument.createElement("body");
            t.appendChild(e);
          }
        }
        getInertBodyElement(t) {
          const e = this.inertDocument.createElement("template");
          if ("content" in e) return (e.innerHTML = t), e;
          const n = this.inertDocument.createElement("body");
          return (
            (n.innerHTML = t),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(n),
            n
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let r = e.length - 1; 0 < r; r--) {
            const n = e.item(r).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const Ir = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        Or = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Rr(t) {
        return (t = String(t)).match(Ir) || t.match(Or)
          ? t
          : (kr() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${t} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + t);
      }
      function Pr(t) {
        const e = {};
        for (const n of t.split(",")) e[n] = !0;
        return e;
      }
      function Lr(...t) {
        const e = {};
        for (const n of t)
          for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const Dr = Pr("area,br,col,hr,img,wbr"),
        Nr = Pr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Fr = Pr("rp,rt"),
        jr = Lr(Fr, Nr),
        Mr = Lr(
          Dr,
          Lr(
            Nr,
            Pr(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Lr(
            Fr,
            Pr(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          jr
        ),
        Ur = Pr("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Vr = Pr("srcset"),
        Br = Lr(
          Ur,
          Vr,
          Pr(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          Pr(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        $r = Pr("script,style,template");
      class Hr {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              n && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!Mr.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !$r.hasOwnProperty(e);
          this.buf.push("<"), this.buf.push(e);
          const n = t.attributes;
          for (let s = 0; s < n.length; s++) {
            const t = n.item(s),
              e = t.name,
              i = e.toLowerCase();
            if (!Br.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = t.value;
            Ur[i] && (o = Rr(o)),
              Vr[i] &&
                ((r = o),
                (o = (r = String(r))
                  .split(",")
                  .map((t) => Rr(t.trim()))
                  .join(", "))),
              this.buf.push(" ", e, '="', Qr(o), '"');
          }
          var r;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          Mr.hasOwnProperty(e) &&
            !Dr.hasOwnProperty(e) &&
            (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Qr(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              "Failed to sanitize html because the element is clobbered: " +
                t.outerHTML
            );
          return e;
        }
      }
      const zr = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        qr = /([^\#-~ |!])/g;
      function Qr(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(zr, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(qr, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Wr;
      function Gr(t) {
        return "content" in t &&
          (function (t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      var Kr = (function (t) {
        return (
          (t[(t.NONE = 0)] = "NONE"),
          (t[(t.HTML = 1)] = "HTML"),
          (t[(t.STYLE = 2)] = "STYLE"),
          (t[(t.SCRIPT = 3)] = "SCRIPT"),
          (t[(t.URL = 4)] = "URL"),
          (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          t
        );
      })({});
      function Zr(t, e) {
        t.__ngContext__ = e;
      }
      function Yr(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      const Jr = "ng-template";
      function Xr(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== Yr(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function ts(t) {
        return 0 === t.type && t.tagName !== Jr;
      }
      function es(t, e, n) {
        return e === (0 !== t.type || n ? t.tagName : Jr);
      }
      function ns(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (Nn(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !es(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (rs(r)) return !1;
                  o = !0;
                }
              } else {
                const u = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!Xr(t.attrs, u, n)) {
                    if (rs(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const c = ss(8 & r ? "class" : l, s, ts(t), n);
                if (-1 === c) {
                  if (rs(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== u) {
                  let t;
                  t = c > i ? "" : s[c + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== Yr(e, u, 0)) || (2 & r && u !== t)) {
                    if (rs(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !rs(r) && !rs(l)) return !1;
            if (o && rs(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return rs(r) || o;
      }
      function rs(t) {
        return 0 == (1 & t);
      }
      function ss(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; "string" == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function is(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (ns(t, e[r], n)) return !0;
        return !1;
      }
      function os(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function as(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const e = t[++n];
              s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & r ? (s += "." + o) : 4 & r && (s += " " + o);
          else
            "" === s || rs(o) || ((e += os(i, s)), (s = "")),
              (r = o),
              (i = i || !rs(r));
          n++;
        }
        return "" !== s && (e += os(i, s)), e;
      }
      const ls = {};
      function us(t) {
        const e = t[3];
        return Ae(e) ? e[3] : e;
      }
      function cs(t) {
        return ds(t[13]);
      }
      function hs(t) {
        return ds(t[4]);
      }
      function ds(t) {
        for (; null !== t && !Ae(t); ) t = t[4];
        return t;
      }
      function ps(t) {
        fs(rn(), nn(), En() + t, un());
      }
      function fs(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && An(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && In(e, r, 0, n);
          }
        Cn(n);
      }
      function ms(t, e) {
        return (t << 17) | (e << 2);
      }
      function gs(t) {
        return (t >> 17) & 32767;
      }
      function ys(t) {
        return 2 | t;
      }
      function _s(t) {
        return (131068 & t) >> 2;
      }
      function vs(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function bs(t) {
        return 1 | t;
      }
      function ws(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const n = t.data[i];
              gn(s), n.contentQueries(2, e[i], i);
            }
          }
      }
      function xs(t, e, n) {
        return Be(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function Ss(t, e, n, r, s, i, o, a, l, u) {
        const c = e.blueprint.slice();
        return (
          (c[0] = s),
          (c[2] = 140 | r),
          Je(c),
          (c[3] = c[15] = t),
          (c[8] = n),
          (c[10] = o || (t && t[10])),
          (c[11] = a || (t && t[11])),
          (c[12] = l || (t && t[12]) || null),
          (c[9] = u || (t && t[9]) || null),
          (c[6] = i),
          (c[16] = 2 == e.type ? t[16] : c),
          c
        );
      }
      function Es(t, e, n, r, s, i) {
        const o = n + Ce,
          a =
            t.data[o] ||
            (function (t, e, n, r, s, i) {
              const o = sn(),
                a = an(),
                l = a ? o : o && o.parent,
                u = (t.data[n] = Ds(0, l && l !== e ? l : null, r, n, s, i));
              return (
                null === t.firstChild && (t.firstChild = u),
                o &&
                  (!a || null != o.child || (null === u.parent && 2 !== o.type)
                    ? a || (o.next = u)
                    : (o.child = u)),
                u
              );
            })(t, e, o, r, s, i);
        return on(a, !0), a;
      }
      function Cs(t, e, n) {
        _n(e, e[6]);
        try {
          const r = t.viewQuery;
          null !== r && ni(1, r, n);
          const s = t.template;
          null !== s && As(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && ws(t, e),
            t.staticViewQueries && ni(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Ys(t, e[n]);
            })(e, i);
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r);
        } finally {
          (e[2] &= -5), Sn();
        }
      }
      function ks(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        _n(e, e[6]);
        const i = un();
        try {
          Je(e),
            (tn.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && As(t, e, n, 2, r);
          const o = 3 == (3 & s);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && An(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && In(e, n, 0, null), On(e, 0);
            }
          if (
            ((function (t) {
              for (let e = cs(t); null !== e; e = hs(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && Xe(r, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = cs(t); null !== e; e = hs(e))
                for (let t = ke; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  Ze(n) && ks(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && ws(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && An(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && In(e, n, 1), On(e, 1);
            }
          !(function (t, e) {
            try {
              const n = t.expandoInstructions;
              if (null !== n) {
                let r = t.expandoStartIndex,
                  s = -1,
                  i = -1;
                for (let t = 0; t < n.length; t++) {
                  const o = n[t];
                  "number" == typeof o
                    ? o <= 0
                      ? ((i = 0 - o), Cn(i), (r += 9 + n[++t]), (s = r))
                      : (r += o)
                    : (null !== o && (pn(r, s), o(2, e[s])), s++);
                }
              }
            } finally {
              Cn(-1);
            }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Zs(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && ni(2, l, r), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && An(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && In(e, n, 2), On(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Xe(e[3], -1));
        } finally {
          Sn();
        }
      }
      function Ts(t, e, n, r) {
        const s = e[10],
          i = !un(),
          o = Ke(e);
        try {
          i && !o && s.begin && s.begin(), o && Cs(t, e, r), ks(t, e, n, r);
        } finally {
          i && !o && s.end && s.end();
        }
      }
      function As(t, e, n, r, s) {
        const i = En();
        try {
          Cn(-1), 2 & r && e.length > Ce && fs(t, e, 0, un()), n(r, s);
        } finally {
          Cn(i);
        }
      }
      function Is(t, e, n) {
        en() &&
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || Zn(n, e), Zr(r, e);
            const o = n.initialInputs;
            for (let a = s; a < i; a++) {
              const r = t.data[a],
                i = Pe(r);
              i && Qs(e, n, r);
              const l = ir(e, t, a, n);
              Zr(l, e),
                null !== o && Ws(0, a - s, l, r, 0, o),
                i && (We(n.index, e)[8] = l);
            }
          })(t, e, n, qe(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                i = t.expandoInstructions,
                o = t.firstCreatePass,
                a = n.index - Ce,
                l = tn.lFrame.currentDirectiveIndex;
              try {
                Cn(a);
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n];
                  fn(n),
                    null !== r.hostBindings ||
                    0 !== r.hostVars ||
                    null !== r.hostAttrs
                      ? Vs(r, s)
                      : o && i.push(null);
                }
              } finally {
                Cn(-1), fn(l);
              }
            })(t, e, n));
      }
      function Os(t, e, n = qe) {
        const r = e.localNames;
        if (null !== r) {
          let s = e.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[s++] = a;
          }
        }
      }
      function Rs(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Ps(
              1,
              -1,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function Ps(t, e, n, r, s, i, o, a, l, u) {
        const c = Ce + r,
          h = c + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : ls);
            return n;
          })(c, h),
          p = "function" == typeof u ? u() : u;
        return (d[1] = {
          type: t,
          id: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          node: null,
          data: d.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: h,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function Ls(t, e, n, r) {
        const s = si(e);
        s.push(n),
          t.firstCreatePass &&
            (function (t) {
              return t.cleanup || (t.cleanup = []);
            })(t).push(r, s.length - 1);
      }
      function Ds(t, e, n, r, s, i) {
        return {
          type: n,
          index: r,
          injectorIndex: e ? e.injectorIndex : -1,
          directiveStart: -1,
          directiveEnd: -1,
          directiveStylingLast: -1,
          propertyBindings: null,
          flags: 0,
          providerIndexes: 0,
          tagName: s,
          attrs: i,
          mergedAttrs: null,
          localNames: null,
          initialInputs: void 0,
          inputs: null,
          outputs: null,
          tViews: null,
          next: null,
          projectionNext: null,
          child: null,
          parent: e,
          projection: null,
          styles: null,
          stylesWithoutHost: null,
          residualStyles: void 0,
          classes: null,
          classesWithoutHost: null,
          residualClasses: void 0,
          classBindings: 0,
          styleBindings: 0,
        };
      }
      function Ns(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s]);
          }
        return n;
      }
      function Fs(t, e, n, r, s, i, o, a) {
        const l = qe(e, n);
        let u,
          c = e.inputs;
        var h;
        !a && null != c && (u = c[r])
          ? (oi(t, n, u, r, s),
            Oe(e) &&
              (function (t, e) {
                const n = We(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 === e.type &&
            ((r =
              "class" === (h = r)
                ? "className"
                : "for" === h
                ? "htmlFor"
                : "formaction" === h
                ? "formAction"
                : "innerHtml" === h
                ? "innerHTML"
                : "readonly" === h
                ? "readOnly"
                : "tabindex" === h
                ? "tabIndex"
                : h),
            (s = null != o ? o(s, e.tagName || "", r) : s),
            Be(i)
              ? i.setProperty(l, r, s)
              : Fn(r) || (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
      }
      function js(t, e, n, r) {
        let s = !1;
        if (en()) {
          const i = (function (t, e, n) {
              const r = t.directiveRegistry;
              let s = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  is(n, o.selectors, !1) &&
                    (s || (s = []),
                    tr(Zn(n, e), t, o.type),
                    Pe(o) ? ($s(t, n), s.unshift(o)) : s.push(o));
                }
              return s;
            })(t, e, n),
            o = null === r ? null : { "": -1 };
          if (null !== i) {
            let r = 0;
            (s = !0), zs(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            Bs(t, n, i.length);
            let a = !1,
              l = !1;
            for (let s = 0; s < i.length; s++) {
              const u = i[s];
              (n.mergedAttrs = jn(n.mergedAttrs, u.hostAttrs)),
                qs(t, e, u),
                Hs(t.data.length - 1, u, o),
                null !== u.contentQueries && (n.flags |= 8),
                (null === u.hostBindings &&
                  null === u.hostAttrs &&
                  0 === u.hostVars) ||
                  (n.flags |= 128);
              const c = u.type.prototype;
              !a &&
                (c.ngOnChanges || c.ngOnInit || c.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index - Ce),
                (a = !0)),
                l ||
                  (!c.ngOnChanges && !c.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index - Ce
                  ),
                  (l = !0)),
                Ms(t, u),
                (r += u.hostVars);
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = r[l],
                  n = t.inputs,
                  u = null === s || ts(e) ? null : Gs(n, s);
                i.push(u), (o = Ns(n, l, o)), (a = Ns(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n),
              Us(t, e, r);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]];
                  if (null == s)
                    throw new Error(`Export of name '${e[t + 1]}' not found!`);
                  r.push(e[t], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = jn(n.mergedAttrs, n.attrs)), s;
      }
      function Ms(t, e) {
        const n = t.expandoInstructions;
        n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
      }
      function Us(t, e, n) {
        for (let r = 0; r < n; r++)
          e.push(ls), t.blueprint.push(ls), t.data.push(null);
      }
      function Vs(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Bs(t, e, n) {
        const r = Ce - e.index,
          s = t.data.length - (1048575 & e.providerIndexes);
        (t.expandoInstructions || (t.expandoInstructions = [])).push(r, s, n);
      }
      function $s(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function Hs(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          Pe(e) && (n[""] = t);
        }
      }
      function zs(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function qs(t, e, n) {
        t.data.push(n);
        const r = n.factory || (n.factory = Se(n.type)),
          s = new Ln(r, Pe(n), null);
        t.blueprint.push(s), e.push(s);
      }
      function Qs(t, e, n) {
        const r = qe(e, t),
          s = Rs(n),
          i = t[10],
          o = Js(
            t,
            Ss(t, s, null, n.onPush ? 64 : 16, r, e, i, i.createRenderer(r, n))
          );
        t[e.index] = o;
      }
      function Ws(t, e, n, r, s, i) {
        const o = i[e];
        if (null !== o) {
          const t = r.setInput;
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
          }
        }
      }
      function Gs(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Ks(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function Zs(t, e) {
        const n = We(e, t);
        if (Ze(n)) {
          const t = n[1];
          80 & n[2]
            ? ks(t, n, t.template, n[8])
            : n[5] > 0 &&
              (function t(e) {
                for (let r = cs(e); null !== r; r = hs(r))
                  for (let e = ke; e < r.length; e++) {
                    const n = r[e];
                    if (1024 & n[2]) {
                      const t = n[1];
                      ks(t, n, t.template, n[8]);
                    } else n[5] > 0 && t(n);
                  }
                const n = e[1].components;
                if (null !== n)
                  for (let r = 0; r < n.length; r++) {
                    const s = We(n[r], e);
                    Ze(s) && s[5] > 0 && t(s);
                  }
              })(n);
        }
      }
      function Ys(t, e) {
        const n = We(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          Cs(r, n, n[8]);
      }
      function Js(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Xs(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = us(t);
          if (Le(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function ti(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          ks(t, e, t.template, n);
        } catch (s) {
          throw (ii(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function ei(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = Ge(n),
              s = r[1];
            Ts(s, r, s.template, n);
          }
        })(t[8]);
      }
      function ni(t, e, n) {
        gn(0), e(t, n);
      }
      const ri = (() => Promise.resolve(null))();
      function si(t) {
        return t[7] || (t[7] = []);
      }
      function ii(t, e) {
        const n = t[9],
          r = n ? n.get(fr, null) : null;
        r && r.handleError(e);
      }
      function oi(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            u = t.data[o];
          null !== u.setInput ? u.setInput(l, s, r, a) : (l[a] = s);
        }
      }
      function ai(t, e) {
        const n = e[3];
        return -1 === t.index ? (Ae(n) ? n : null) : n;
      }
      function li(t, e) {
        const n = ai(t, e);
        return n ? bi(e[11], n[7]) : null;
      }
      function ui(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1;
          Ae(r) ? (i = r) : Te(r) && ((o = !0), (r = r[0]));
          const a = He(r);
          0 === t && null !== n
            ? null == s
              ? _i(e, n, a)
              : yi(e, n, a, s || null)
            : 1 === t && null !== n
            ? yi(e, n, a, s || null)
            : 2 === t
            ? (function (t, e, n) {
                const r = bi(t, e);
                r &&
                  (function (t, e, n, r) {
                    Be(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, r, s) {
                const i = n[7];
                i !== He(n) && ui(e, t, r, i, s);
                for (let o = ke; o < n.length; o++) {
                  const s = n[o];
                  Ci(s[1], s, t, e, r, i);
                }
              })(e, t, i, n, s);
        }
      }
      function ci(t, e, n, r) {
        const s = li(t.node, e);
        s && Ci(t, e, e[11], n ? 1 : 2, s, r);
      }
      function hi(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          s = e[3];
        1024 & e[2] && ((e[2] &= -1025), Xe(s, -1)), n.splice(r, 1);
      }
      function di(t, e) {
        if (t.length <= ke) return;
        const n = ke + e,
          r = t[n];
        if (r) {
          const s = r[17];
          null !== s && s !== t && hi(s, r), e > 0 && (t[n - 1][4] = r[4]);
          const i = ie(t, ke + e);
          ci(r[1], r, !1, null);
          const o = i[19];
          null !== o && o.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function pi(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          Be(n) && n.destroyNode && Ci(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return mi(t[1], t);
              for (; e; ) {
                let n = null;
                if (Te(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Te(e) && mi(e[1], e), (e = fi(e, t));
                  null === e && (e = t), Te(e) && mi(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function fi(t, e) {
        let n;
        return Te(t) && (n = t[6]) && 2 === n.type
          ? ai(n, t)
          : t[3] === e
          ? null
          : t[3];
      }
      function mi(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof Ln)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup;
              if (null !== n) {
                const t = e[7];
                for (let r = 0; r < n.length - 1; r += 2)
                  if ("string" == typeof n[r]) {
                    const s = n[r + 1],
                      i = "function" == typeof s ? s(e) : He(e[s]),
                      o = t[n[r + 2]],
                      a = n[r + 3];
                    "boolean" == typeof a
                      ? i.removeEventListener(n[r], o, a)
                      : a >= 0
                      ? t[a]()
                      : t[-a].unsubscribe(),
                      (r += 2);
                  } else n[r].call(t[n[r + 1]]);
                e[7] = null;
              }
            })(t, e);
          const n = e[6];
          n && 3 === n.type && Be(e[11]) && e[11].destroy();
          const r = e[17];
          if (null !== r && Ae(e[3])) {
            r !== e[3] && hi(r, e);
            const n = e[19];
            null !== n && n.detachView(t);
          }
        }
      }
      function gi(t, e, n) {
        let r = e.parent;
        for (; null != r && (4 === r.type || 5 === r.type); )
          r = (e = r).parent;
        if (null == r) {
          const t = n[6];
          return 2 === t.type ? li(t, n) : n[0];
        }
        if (e && 5 === e.type && 4 & e.flags) return qe(e, n).parentNode;
        if (2 & r.flags) {
          const e = t.data,
            n = e[e[r.index].directiveStart].encapsulation;
          if (n !== he.ShadowDom && n !== he.Native) return null;
        }
        return qe(r, n);
      }
      function yi(t, e, n, r) {
        Be(t) ? t.insertBefore(e, n, r) : e.insertBefore(n, r, !0);
      }
      function _i(t, e, n) {
        Be(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function vi(t, e, n, r) {
        null !== r ? yi(t, e, n, r) : _i(t, e, n);
      }
      function bi(t, e) {
        return Be(t) ? t.parentNode(e) : e.parentNode;
      }
      function wi(t, e) {
        if (2 === t.type) {
          const n = ai(t, e);
          return null === n ? null : Si(n.indexOf(e, ke) - ke, n);
        }
        return 4 === t.type || 5 === t.type ? qe(t, e) : null;
      }
      function xi(t, e, n, r) {
        const s = gi(t, r, e);
        if (null != s) {
          const t = e[11],
            i = wi(r.parent || e[6], e);
          if (Array.isArray(n))
            for (let e = 0; e < n.length; e++) vi(t, s, n[e], i);
          else vi(t, s, n, i);
        }
      }
      function Si(t, e) {
        const n = ke + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r)
            return (function t(e, n) {
              if (null !== n) {
                const r = n.type;
                if (3 === r) return qe(n, e);
                if (0 === r) return Si(-1, e[n.index]);
                if (4 === r || 5 === r) {
                  const r = n.child;
                  if (null !== r) return t(e, r);
                  {
                    const t = e[n.index];
                    return Ae(t) ? Si(-1, t) : He(t);
                  }
                }
                {
                  const r = e[16],
                    s = r[6],
                    i = us(r),
                    o = s.projection[n.projection];
                  return null != o ? t(i, o) : t(e, n.next);
                }
              }
              return null;
            })(t, r);
        }
        return e[7];
      }
      function Ei(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          o && 0 === e && (a && Zr(He(a), r), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (4 === l || 5 === l
                ? (Ei(t, e, n.child, r, s, i, !1), ui(e, t, s, a, i))
                : 1 === l
                ? ki(t, e, r, n, s, i)
                : ui(e, t, s, a, i)),
            (n = o ? n.projectionNext : n.next);
        }
      }
      function Ci(t, e, n, r, s, i) {
        Ei(n, r, t.node.child, e, s, i, !1);
      }
      function ki(t, e, n, r, s, i) {
        const o = n[16],
          a = o[6].projection[r.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) ui(e, t, s, a[l], i);
        else Ei(t, e, a, o[3], s, i, !0);
      }
      function Ti(t, e, n) {
        Be(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Ai(t, e, n) {
        Be(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      class Ii {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null);
        }
        get rootNodes() {
          const t = this._lView;
          return null == t[0]
            ? (function t(e, n, r, s, i = !1) {
                for (; null !== r; ) {
                  const o = n[r.index];
                  if ((null !== o && s.push(He(o)), Ae(o)))
                    for (let e = ke; e < o.length; e++) {
                      const n = o[e],
                        r = n[1].firstChild;
                      null !== r && t(n[1], n, r, s);
                    }
                  const a = r.type;
                  if (4 === a || 5 === a) t(e, n, r.child, s);
                  else if (1 === a) {
                    const e = n[16],
                      i = e[6].projection[r.projection];
                    if (Array.isArray(i)) s.push(...i);
                    else {
                      const n = us(e);
                      t(n[1], n, i, s, !0);
                    }
                  }
                  r = i ? r.projectionNext : r.next;
                }
                return s;
              })(t[1], t, t[6].child, [])
            : [];
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          pi(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Ls(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Xs(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          ti(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            cn(!0);
            try {
              ti(t, e, n);
            } finally {
              cn(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            Ci(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class Oi extends Ii {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          ei(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            cn(!0);
            try {
              ei(t);
            } finally {
              cn(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let Ri, Pi, Li;
      function Di(t, e, n) {
        return Ri || (Ri = class extends t {}), new Ri(qe(e, n));
      }
      function Ni(t, e, n, r) {
        return (
          Pi ||
            (Pi = class extends t {
              constructor(t, e, n) {
                super(),
                  (this._declarationView = t),
                  (this._declarationTContainer = e),
                  (this.elementRef = n);
              }
              createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                  n = Ss(this._declarationView, e, t, 16, null, e.node);
                n[17] = this._declarationView[
                  this._declarationTContainer.index
                ];
                const r = this._declarationView[19];
                return (
                  null !== r && (n[19] = r.createEmbeddedView(e)),
                  Cs(e, n, t),
                  new Ii(n)
                );
              }
            }),
          0 === n.type ? new Pi(r, n, Di(e, n, r)) : null
        );
      }
      function Fi(t, e, n, r) {
        let s;
        Li ||
          (Li = class extends t {
            constructor(t, e, n) {
              super(),
                (this._lContainer = t),
                (this._hostTNode = e),
                (this._hostView = n);
            }
            get element() {
              return Di(e, this._hostTNode, this._hostView);
            }
            get injector() {
              return new lr(this._hostTNode, this._hostView);
            }
            get parentInjector() {
              const t = Xn(this._hostTNode, this._hostView),
                e = $n(t, this._hostView),
                n = (function (t, e, n) {
                  if (n.parent && -1 !== n.parent.injectorIndex) {
                    const t = n.parent.injectorIndex;
                    let e = n.parent;
                    for (; null != e.parent && t == e.parent.injectorIndex; )
                      e = e.parent;
                    return e;
                  }
                  let r = Bn(t),
                    s = e,
                    i = e[6];
                  for (; r > 1; ) (s = s[15]), (i = s[6]), r--;
                  return i;
                })(t, this._hostView, this._hostTNode);
              return Un(t) && null != n
                ? new lr(n, e)
                : new lr(null, this._hostView);
            }
            clear() {
              for (; this.length > 0; ) this.remove(this.length - 1);
            }
            get(t) {
              return (
                (null !== this._lContainer[8] && this._lContainer[8][t]) || null
              );
            }
            get length() {
              return this._lContainer.length - ke;
            }
            createEmbeddedView(t, e, n) {
              const r = t.createEmbeddedView(e || {});
              return this.insert(r, n), r;
            }
            createComponent(t, e, n, r, s) {
              const i = n || this.parentInjector;
              if (!s && null == t.ngModule && i) {
                const t = i.get(ee, null);
                t && (s = t);
              }
              const o = t.create(i, r, void 0, s);
              return this.insert(o.hostView, e), o;
            }
            insert(t, e) {
              const n = t._lView,
                r = n[1];
              if (t.destroyed)
                throw new Error(
                  "Cannot insert a destroyed View in a ViewContainer!"
                );
              if ((this.allocateContainerIfNeeded(), Ae(n[3]))) {
                const e = this.indexOf(t);
                if (-1 !== e) this.detach(e);
                else {
                  const e = n[3],
                    r = new Li(e, e[6], e[3]);
                  r.detach(r.indexOf(t));
                }
              }
              const s = this._adjustIndex(e);
              return (
                (function (t, e, n, r) {
                  const s = ke + r,
                    i = n.length;
                  r > 0 && (n[s - 1][4] = e),
                    r < i - ke
                      ? ((e[4] = n[s]), se(n, ke + r, e))
                      : (n.push(e), (e[4] = null)),
                    (e[3] = n);
                  const o = e[17];
                  null !== o &&
                    n !== o &&
                    (function (t, e) {
                      const n = t[9];
                      e[16] !== e[3][3][16] && (t[2] = !0),
                        null === n ? (t[9] = [e]) : n.push(e);
                    })(o, e);
                  const a = e[19];
                  null !== a && a.insertView(t), (e[2] |= 128);
                })(r, n, this._lContainer, s),
                ci(r, n, !0, Si(s, this._lContainer)),
                t.attachToViewContainerRef(this),
                se(this._lContainer[8], s, t),
                t
              );
            }
            move(t, e) {
              if (t.destroyed)
                throw new Error(
                  "Cannot move a destroyed View in a ViewContainer!"
                );
              return this.insert(t, e);
            }
            indexOf(t) {
              const e = this._lContainer[8];
              return null !== e ? e.indexOf(t) : -1;
            }
            remove(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1),
                n = di(this._lContainer, e);
              n && (ie(this._lContainer[8], e), pi(n[1], n));
            }
            detach(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1),
                n = di(this._lContainer, e);
              return n && null != ie(this._lContainer[8], e) ? new Ii(n) : null;
            }
            _adjustIndex(t, e = 0) {
              return null == t ? this.length + e : t;
            }
            allocateContainerIfNeeded() {
              null === this._lContainer[8] && (this._lContainer[8] = []);
            }
          });
        const i = r[n.index];
        if (Ae(i)) s = i;
        else {
          let t;
          if (4 === n.type) t = He(i);
          else if (((t = r[11].createComment("")), Le(r))) {
            const e = r[11],
              s = qe(n, r);
            yi(
              e,
              bi(e, s),
              t,
              (function (t, e) {
                return Be(t) ? t.nextSibling(e) : e.nextSibling;
              })(e, s)
            );
          } else xi(r[1], r, t, n);
          (r[n.index] = s = Ks(i, r, t, n)), Js(r, s);
        }
        return new Li(s, n, r);
      }
      let ji = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Mi()), t;
      })();
      const Mi = function (t = !1) {
          return (function (t, e, n) {
            if (!n && Oe(t)) {
              const n = We(t.index, e);
              return new Ii(n, n);
            }
            return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type
              ? new Ii(e[16], e)
              : null;
          })(sn(), nn(), t);
        },
        Ui = Function,
        Vi = new Ut("Set Injector scope."),
        Bi = {},
        $i = {},
        Hi = [];
      let zi = void 0;
      function qi() {
        return void 0 === zi && (zi = new te()), zi;
      }
      function Qi(t, e = null, n = null, r) {
        return new Wi(t, n, e || qi(), r);
      }
      class Wi {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && re(e, (n) => this.processProvider(n, t, e)),
            re([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Vt, Zi(void 0, this));
          const i = this.records.get(Vi);
          (this.scope = null != i ? i.value : null),
            (this.source = r || ("object" == typeof t ? null : wt(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Bt, n = lt.Default) {
          this.assertNotDestroyed();
          const r = Wt(this);
          try {
            if (!(n & lt.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof Ut)) &&
                  pt(t);
                (e = n && this.injectableDefInScope(n) ? Zi(Gi(t), Bi) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & lt.Self ? qi() : this.parent).get(
              t,
              (e = n & lt.Optional && e === Bt ? null : e)
            );
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(wt(t)),
                r)
              )
                throw i;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e[Ht] && s.unshift(e[Ht]),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let s = wt(e);
                    if (Array.isArray(e)) s = e.map(wt).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r ? JSON.stringify(r) : wt(r))
                          );
                        }
                      s = `{${t.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
                      $t,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(i, t, "R3InjectorError", this.source);
            }
            throw i;
          } finally {
            Wt(r);
          }
          var s;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(wt(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = Ct(t))) return !1;
          let r = mt(t);
          const s = (null == r && t.ngModule) || void 0,
            i = void 0 === s ? t : s,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== s && (r = mt(s)), null == r)) return !1;
          if (null != r.imports && !o) {
            let t;
            n.push(i);
            try {
              re(r.imports, (r) => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                re(r, (t) => this.processProvider(t, n, r || Hi));
              }
          }
          this.injectorDefTypes.add(i), this.records.set(i, Zi(r.factory, Bi));
          const a = r.providers;
          if (null != a && !o) {
            const e = t;
            re(a, (t) => this.processProvider(t, e, a));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = Ji((t = Ct(t))) ? t : Ct(t && t.provide);
          const s = (function (t, e, n) {
            return Yi(t) ? Zi(void 0, t.useValue) : Zi(Ki(t), Bi);
          })(t);
          if (Ji(t) || !0 !== t.multi) this.records.get(r);
          else {
            let e = this.records.get(r);
            e ||
              ((e = Zi(void 0, Bi, !0)),
              (e.factory = () => Xt(e.multi)),
              this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Bi && ((e.value = $i), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function Gi(t) {
        const e = pt(t),
          n = null !== e ? e.factory : Se(t);
        if (null !== n) return n;
        const r = mt(t);
        if (null !== r) return r.factory;
        if (t instanceof Ut)
          throw new Error(`Token ${wt(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = oe(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${wt(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[gt] || t[vt] || (t[_t] && t[_t]()));
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function Ki(t, e, n) {
        let r = void 0;
        if (Ji(t)) {
          const e = Ct(t);
          return Se(e) || Gi(e);
        }
        if (Yi(t)) r = () => Ct(t.useValue);
        else if ((s = t) && s.useFactory)
          r = () => t.useFactory(...Xt(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          r = () => Zt(Ct(t.useExisting));
        else {
          const e = Ct(t && (t.useClass || t.provide));
          if (
            !(function (t) {
              return !!t.deps;
            })(t)
          )
            return Se(e) || Gi(e);
          r = () => new e(...Xt(t.deps));
        }
        var s;
        return r;
      }
      function Zi(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Yi(t) {
        return null !== t && "object" == typeof t && zt in t;
      }
      function Ji(t) {
        return "function" == typeof t;
      }
      const Xi = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = Qi(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let to = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? Xi(t, e, "")
              : Xi(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Bt),
          (t.NULL = new te()),
          (t.ɵprov = ht({
            token: t,
            providedIn: "any",
            factory: () => Zt(Vt),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      const eo = new Ut("AnalyzeForEntryComponents");
      function no(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          i = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            "number" == typeof t
              ? (i = t)
              : 1 == i
              ? (s = xt(s, t))
              : 2 == i && (r = xt(r, t + ": " + e[++o] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      function ro(t, e) {
        const n = Ge(t)[1],
          r = n.data.length - 1;
        Tn(n, { directiveStart: r, directiveEnd: r + 1 });
      }
      function so(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const r = [t];
        for (; e; ) {
          let s = void 0;
          if (Pe(t)) s = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            s = e.ɵdir;
          }
          if (s) {
            if (n) {
              r.push(s);
              const e = t;
              (e.inputs = io(t.inputs)),
                (e.declaredInputs = io(t.declaredInputs)),
                (e.outputs = io(t.outputs));
              const n = s.hostBindings;
              n && lo(t, n);
              const i = s.viewQuery,
                o = s.contentQueries;
              if (
                (i && oo(t, i),
                o && ao(t, o),
                ct(t.inputs, s.inputs),
                ct(t.declaredInputs, s.declaredInputs),
                ct(t.outputs, s.outputs),
                Pe(s) && s.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(s.data.animation);
              }
            }
            const e = s.features;
            if (e)
              for (let r = 0; r < e.length; r++) {
                const s = e[r];
                s && s.ngInherit && s(t), s === so && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let r = t.length - 1; r >= 0; r--) {
            const s = t[r];
            (s.hostVars = e += s.hostVars),
              (s.hostAttrs = jn(s.hostAttrs, (n = jn(n, s.hostAttrs))));
          }
        })(r);
      }
      function io(t) {
        return t === de ? {} : t === pe ? [] : t;
      }
      function oo(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      function ao(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, r, s) => {
              e(t, r, s), n(t, r, s);
            }
          : e;
      }
      function lo(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      let uo = null;
      function co() {
        if (!uo) {
          const t = Rt.Symbol;
          if (t && t.iterator) uo = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (uo = n);
            }
          }
        }
        return uo;
      }
      function ho(t) {
        return (
          !!po(t) && (Array.isArray(t) || (!(t instanceof Map) && co() in t))
        );
      }
      function po(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function fo(t, e, n) {
        return (t[e] = n);
      }
      function mo(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function go(t, e, n, r) {
        const s = mo(t, e, n);
        return mo(t, e + 1, r) || s;
      }
      function yo(t, e, n, r) {
        const s = nn();
        return (
          mo(s, dn(), e) &&
            (rn(),
            (function (t, e, n, r, s, i) {
              const o = qe(t, e),
                a = e[11];
              if (null == r)
                Be(a) ? a.removeAttribute(o, n, i) : o.removeAttribute(n);
              else {
                const e = null == s ? Hn(r) : s(r, t.tagName || "", n);
                Be(a)
                  ? a.setAttribute(o, n, e, i)
                  : i
                  ? o.setAttributeNS(i, n, e)
                  : o.setAttribute(n, e);
              }
            })(kn(), s, t, e, n, r)),
          yo
        );
      }
      function _o(t, e, n, r, s, i, o, a) {
        const l = nn(),
          u = rn(),
          c = t + Ce,
          h = u.firstCreatePass
            ? (function (t, e, n, r, s, i, o, a, l) {
                const u = e.consts,
                  c = Es(e, n[6], t, 0, o || null, Ye(u, a));
                js(e, n, c, Ye(u, l)), Tn(e, c);
                const h = (c.tViews = Ps(
                    2,
                    -1,
                    r,
                    s,
                    i,
                    e.directiveRegistry,
                    e.pipeRegistry,
                    null,
                    e.schemas,
                    u
                  )),
                  d = Ds(0, null, 2, -1, null, null);
                return (
                  (d.injectorIndex = c.injectorIndex),
                  (h.node = d),
                  null !== e.queries &&
                    (e.queries.template(e, c),
                    (h.queries = e.queries.embeddedTView(c))),
                  c
                );
              })(t, u, l, e, n, r, s, i, o)
            : u.data[c];
        on(h, !1);
        const d = l[11].createComment("");
        xi(u, l, d, h),
          Zr(d, l),
          Js(l, (l[c] = Ks(d, l, d, h))),
          Re(h) && Is(u, l, h),
          null != o && Os(l, h, a);
      }
      function vo(t, e = lt.Default) {
        const n = nn();
        return null == n ? Zt(t, e) : er(sn(), n, Ct(t), e);
      }
      function bo(t) {
        return (function (t, e) {
          if ("class" === e) return t.classes;
          if ("style" === e) return t.styles;
          const n = t.attrs;
          if (n) {
            const t = n.length;
            let r = 0;
            for (; r < t; ) {
              const s = n[r];
              if (Nn(s)) break;
              if (0 === s) r += 2;
              else if ("number" == typeof s)
                for (r++; r < t && "string" == typeof n[r]; ) r++;
              else {
                if (s === e) return n[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(sn(), t);
      }
      function wo(t, e, n) {
        const r = nn();
        return mo(r, dn(), e) && Fs(rn(), kn(), r, t, e, r[11], n, !1), wo;
      }
      function xo(t, e, n, r, s) {
        const i = s ? "class" : "style";
        oi(t, n, e.inputs[i], i, r);
      }
      function So(t, e, n, r) {
        const s = nn(),
          i = rn(),
          o = Ce + t,
          a = s[11],
          l = (s[o] = xs(e, a, tn.lFrame.currentNamespace)),
          u = i.firstCreatePass
            ? (function (t, e, n, r, s, i, o) {
                const a = e.consts,
                  l = Ye(a, i),
                  u = Es(e, n[6], t, 3, s, l);
                return (
                  js(e, n, u, Ye(a, o)),
                  null !== u.attrs && no(u, u.attrs, !1),
                  null !== u.mergedAttrs && no(u, u.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, u),
                  u
                );
              })(t, i, s, 0, e, n, r)
            : i.data[o];
        on(u, !0);
        const c = u.mergedAttrs;
        null !== c && Dn(a, l, c);
        const h = u.classes;
        null !== h && Ai(a, l, h);
        const d = u.styles;
        null !== d && Ti(a, l, d),
          xi(i, s, l, u),
          0 === tn.lFrame.elementDepthCount && Zr(l, s),
          tn.lFrame.elementDepthCount++,
          Re(u) &&
            (Is(i, s, u),
            (function (t, e, n) {
              if (Ie(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s];
                  e.contentQueries && e.contentQueries(1, n[s], s);
                }
              }
            })(i, u, s)),
          null !== r && Os(s, u);
      }
      function Eo() {
        let t = sn();
        an() ? ln() : ((t = t.parent), on(t, !1));
        const e = t;
        tn.lFrame.elementDepthCount--;
        const n = rn();
        n.firstCreatePass && (Tn(n, t), Ie(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            xo(n, e, nn(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            xo(n, e, nn(), e.stylesWithoutHost, !1);
      }
      function Co(t, e, n, r) {
        So(t, e, n, r), Eo();
      }
      function ko(t) {
        return !!t && "function" == typeof t.then;
      }
      function To(t, e, n = !1, r) {
        const s = nn(),
          i = rn(),
          o = sn();
        return (
          (function (t, e, n, r, s, i, o = !1, a) {
            const l = Re(r),
              u = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
              c = si(e);
            let h = !0;
            if (3 === r.type) {
              const d = qe(r, e),
                p = a ? a(d) : de,
                f = p.target || d,
                m = c.length,
                g = a ? (t) => a(He(t[r.index])).target : r.index;
              if (Be(n)) {
                let o = null;
                if (
                  (!a &&
                    l &&
                    (o = (function (t, e, n, r) {
                      const s = t.cleanup;
                      if (null != s)
                        for (let i = 0; i < s.length - 1; i += 2) {
                          const t = s[i];
                          if (t === n && s[i + 1] === r) {
                            const t = e[7],
                              n = s[i + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (i += 2);
                        }
                      return null;
                    })(t, e, s, r.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                    (o.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = Io(r, e, i, !1);
                  const t = n.listen(p.name || f, s, i);
                  c.push(i, t), u && u.push(s, g, m, m + 1);
                }
              } else
                (i = Io(r, e, i, !0)),
                  f.addEventListener(s, i, o),
                  c.push(i),
                  u && u.push(s, g, m, o);
            }
            const d = r.outputs;
            let p;
            if (h && null !== d && (p = d[s])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(i),
                    o = c.length;
                  c.push(i, t), u && u.push(s, r.index, o, -(o + 1));
                }
            }
          })(i, s, s[11], o, t, e, n, r),
          To
        );
      }
      function Ao(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (r) {
          return ii(t, r), !1;
        }
      }
      function Io(t, e, n, r) {
        return function s(i) {
          if (i === Function) return n;
          const o = 2 & t.flags ? We(t.index, e) : e;
          0 == (32 & e[2]) && Xs(o);
          let a = Ao(e, n, i),
            l = s.__ngNextListenerFn__;
          for (; l; ) (a = Ao(e, l, i) && a), (l = l.__ngNextListenerFn__);
          return r && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function Oo(t = 1) {
        return (function (t) {
          return (tn.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, tn.lFrame.contextLView))[8];
        })(t);
      }
      const Ro = [];
      function Po(t, e, n, r, s) {
        const i = t[n + 1],
          o = null === e;
        let a = r ? gs(i) : _s(i),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1];
          Lo(t[a], e) && ((l = !0), (t[a + 1] = r ? bs(n) : ys(n))),
            (a = r ? gs(n) : _s(n));
        }
        l && (t[n + 1] = r ? ys(i) : bs(i));
      }
      function Lo(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && ue(t, e) >= 0)
        );
      }
      function Do(t, e) {
        return (
          (function (t, e, n, r) {
            const s = nn(),
              i = rn(),
              o = (function (t) {
                const e = tn.lFrame,
                  n = e.bindingIndex;
                return (e.bindingIndex = e.bindingIndex + 2), n;
              })();
            i.firstUpdatePass &&
              (function (t, e, n, r) {
                const s = t.data;
                if (null === s[n + 1]) {
                  const i = s[En() + Ce],
                    o = (function (t, e) {
                      return e >= t.expandoStartIndex;
                    })(t, n);
                  (function (t, e) {
                    return 0 != (16 & t.flags);
                  })(i) &&
                    null === e &&
                    !o &&
                    (e = !1),
                    (e = (function (t, e, n, r) {
                      const s = (function (t) {
                        const e = tn.lFrame.currentDirectiveIndex;
                        return -1 === e ? null : t[e];
                      })(t);
                      let i = e.residualClasses;
                      if (null === s)
                        0 === e.classBindings &&
                          ((n = Fo((n = No(null, t, e, n, r)), e.attrs, r)),
                          (i = null));
                      else {
                        const o = e.directiveStylingLast;
                        if (-1 === o || t[o] !== s)
                          if (((n = No(s, t, e, n, r)), null === i)) {
                            let n = (function (t, e, n) {
                              const r = e.classBindings;
                              if (0 !== _s(r)) return t[gs(r)];
                            })(t, e);
                            void 0 !== n &&
                              Array.isArray(n) &&
                              ((n = No(null, t, e, n[1], r)),
                              (n = Fo(n, e.attrs, r)),
                              (function (t, e, n, r) {
                                t[gs(e.classBindings)] = r;
                              })(t, e, 0, n));
                          } else
                            i = (function (t, e, n) {
                              let r = void 0;
                              const s = e.directiveEnd;
                              for (
                                let i = 1 + e.directiveStylingLast;
                                i < s;
                                i++
                              )
                                r = Fo(r, t[i].hostAttrs, true);
                              return Fo(r, e.attrs, true);
                            })(t, e);
                      }
                      return void 0 !== i && (e.residualClasses = i), n;
                    })(s, i, e, r)),
                    (function (t, e, n, r, s, i) {
                      let o = e.classBindings,
                        a = gs(o),
                        l = _s(o);
                      t[r] = n;
                      let u,
                        c = !1;
                      if (Array.isArray(n)) {
                        const t = n;
                        (u = t[1]), (null === u || ue(t, u) > 0) && (c = !0);
                      } else u = n;
                      if (s)
                        if (0 !== l) {
                          const e = gs(t[a + 1]);
                          (t[r + 1] = ms(e, a)),
                            0 !== e && (t[e + 1] = vs(t[e + 1], r)),
                            (t[a + 1] = (131071 & t[a + 1]) | (r << 17));
                        } else
                          (t[r + 1] = ms(a, 0)),
                            0 !== a && (t[a + 1] = vs(t[a + 1], r)),
                            (a = r);
                      else
                        (t[r + 1] = ms(l, 0)),
                          0 === a ? (a = r) : (t[l + 1] = vs(t[l + 1], r)),
                          (l = r);
                      c && (t[r + 1] = ys(t[r + 1])),
                        Po(t, u, r, !0),
                        Po(t, u, r, !1),
                        (function (t, e, n, r, s) {
                          const i = t.residualClasses;
                          null != i &&
                            "string" == typeof e &&
                            ue(i, e) >= 0 &&
                            (n[r + 1] = bs(n[r + 1]));
                        })(e, u, t, r),
                        (o = ms(a, l)),
                        (e.classBindings = o);
                    })(s, i, e, n, o);
                }
              })(i, t, o, true),
              e !== ls &&
                mo(s, o, e) &&
                (function (t, e, n, r, s, i, o, a) {
                  if (3 !== e.type) return;
                  const l = t.data,
                    u = l[a + 1];
                  Mo(1 == (1 & u) ? jo(l, e, n, s, _s(u), o) : void 0) ||
                    (Mo(i) ||
                      ((function (t) {
                        return 2 == (2 & t);
                      })(u) &&
                        (i = jo(l, null, n, s, a, o))),
                    (function (t, e, n, r, s) {
                      const i = Be(t);
                      s
                        ? i
                          ? t.addClass(n, r)
                          : n.classList.add(r)
                        : i
                        ? t.removeClass(n, r)
                        : n.classList.remove(r);
                    })(r, 0, ze(En(), n), s, i));
                })(
                  i,
                  i.data[En() + Ce],
                  s,
                  s[11],
                  t,
                  (s[o + 1] = (function (t, e) {
                    return (
                      null == t || ("object" == typeof t && (t = wt(wr(t)))), t
                    );
                  })(e)),
                  true,
                  o
                );
          })(t, e),
          Do
        );
      }
      function No(t, e, n, r, s) {
        let i = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((i = e[a]), (r = Fo(r, i.hostAttrs, s)), i !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), r;
      }
      function Fo(t, e, n) {
        const r = n ? 1 : 2;
        let s = -1;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i];
            "number" == typeof o
              ? (s = o)
              : s === r &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                ae(t, o, !!n || e[++i]));
          }
        return void 0 === t ? null : t;
      }
      function jo(t, e, n, r, s, i) {
        const o = null === e;
        let a = void 0;
        for (; s > 0; ) {
          const e = t[s],
            i = Array.isArray(e),
            l = i ? e[1] : e,
            u = null === l;
          let c = n[s + 1];
          c === ls && (c = u ? Ro : void 0);
          let h = u ? le(c, r) : l === r ? c : void 0;
          if ((i && !Mo(h) && (h = le(e, r)), Mo(h) && ((a = h), o))) return a;
          const d = t[s + 1];
          s = o ? gs(d) : _s(d);
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles;
          null != t && (a = le(t, r));
        }
        return a;
      }
      function Mo(t) {
        return void 0 !== t;
      }
      function Uo(t, e = "") {
        const n = nn(),
          r = rn(),
          s = t + Ce,
          i = r.firstCreatePass ? Es(r, n[6], t, 3, null, null) : r.data[s],
          o = (n[s] = (function (t, e) {
            return Be(e) ? e.createText(t) : e.createTextNode(t);
          })(e, n[11]));
        xi(r, n, o, i), on(i, !1);
      }
      function Vo(t) {
        return Bo("", t, ""), Vo;
      }
      function Bo(t, e, n) {
        const r = nn(),
          s = (function (t, e, n, r) {
            return mo(t, dn(), n) ? e + Hn(n) + r : ls;
          })(r, t, e, n);
        return (
          s !== ls &&
            (function (t, e, n) {
              const r = ze(e, t),
                s = t[11];
              Be(s) ? s.setValue(r, n) : (r.textContent = n);
            })(r, En(), s),
          Bo
        );
      }
      function $o(t, e, n) {
        const r = nn();
        return mo(r, dn(), e) && Fs(rn(), kn(), r, t, e, r[11], n, !0), $o;
      }
      function Ho(t, e, n, r, s) {
        if (((t = Ct(t)), Array.isArray(t)))
          for (let i = 0; i < t.length; i++) Ho(t[i], e, n, r, s);
        else {
          const i = rn(),
            o = nn();
          let a = Ji(t) ? t : Ct(t.provide),
            l = Ki(t);
          const u = sn(),
            c = 1048575 & u.providerIndexes,
            h = u.directiveStart,
            d = u.providerIndexes >> 20;
          if (Ji(t) || !t.multi) {
            const r = new Ln(l, s, vo),
              p = Qo(a, e, s ? c : c + d, h);
            -1 === p
              ? (tr(Zn(u, o), i, a),
                zo(i, t, e.length),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                s && (u.providerIndexes += 1048576),
                n.push(r),
                o.push(r))
              : ((n[p] = r), (o[p] = r));
          } else {
            const p = Qo(a, e, c + d, h),
              f = Qo(a, e, c, c + d),
              m = p >= 0 && n[p],
              g = f >= 0 && n[f];
            if ((s && !g) || (!s && !m)) {
              tr(Zn(u, o), i, a);
              const c = (function (t, e, n, r, s) {
                const i = new Ln(t, n, vo);
                return (
                  (i.multi = []),
                  (i.index = e),
                  (i.componentProviders = 0),
                  qo(i, s, r && !n),
                  i
                );
              })(s ? Go : Wo, n.length, s, r, l);
              !s && g && (n[f].providerFactory = c),
                zo(i, t, e.length, 0),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                s && (u.providerIndexes += 1048576),
                n.push(c),
                o.push(c);
            } else zo(i, t, p > -1 ? p : f, qo(n[s ? f : p], l, !s && r));
            !s && r && g && n[f].componentProviders++;
          }
        }
      }
      function zo(t, e, n, r) {
        const s = Ji(e);
        if (s || e.useClass) {
          const i = (e.useClass || e).prototype.ngOnDestroy;
          if (i) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!s && e.multi) {
              const t = o.indexOf(n);
              -1 === t ? o.push(n, [r, i]) : o[t + 1].push(r, i);
            } else o.push(n, i);
          }
        }
      }
      function qo(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function Qo(t, e, n, r) {
        for (let s = n; s < r; s++) if (e[s] === t) return s;
        return -1;
      }
      function Wo(t, e, n, r) {
        return Ko(this.multi, []);
      }
      function Go(t, e, n, r) {
        const s = this.multi;
        let i;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = ir(n, n[1], this.providerFactory.index, r);
          (i = e.slice(0, t)), Ko(s, i);
          for (let n = t; n < e.length; n++) i.push(e[n]);
        } else (i = []), Ko(s, i);
        return i;
      }
      function Ko(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function Zo(t, e = []) {
        return (n) => {
          n.providersResolver = (n, r) =>
            (function (t, e, n) {
              const r = rn();
              if (r.firstCreatePass) {
                const s = Pe(t);
                Ho(n, r.data, r.blueprint, s, !0),
                  Ho(e, r.data, r.blueprint, s, !1);
              }
            })(n, r ? r(t) : t, e);
        };
      }
      class Yo {}
      class Jo {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${wt(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let Xo = (() => {
          class t {}
          return (t.NULL = new Jo()), t;
        })(),
        ta = (() => {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => ea(t)), t;
        })();
      const ea = function (t) {
        return Di(t, sn(), nn());
      };
      class na {}
      var ra = (function (t) {
        return (
          (t[(t.Important = 1)] = "Important"),
          (t[(t.DashCase = 2)] = "DashCase"),
          t
        );
      })({});
      let sa = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => ia()), t;
      })();
      const ia = function () {
        const t = nn(),
          e = We(sn().index, t);
        return (function (t) {
          const e = t[11];
          if (Be(e)) return e;
          throw new Error(
            "Cannot inject Renderer2 when the application uses Renderer3!"
          );
        })(Te(e) ? e : t);
      };
      let oa = (() => {
        class t {}
        return (
          (t.ɵprov = ht({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class aa {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const la = new aa("10.1.3");
      class ua {
        constructor() {}
        supports(t) {
          return ho(t);
        }
        create(t) {
          return new ha(t);
        }
      }
      const ca = (t, e) => e;
      class ha {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || ca);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < ma(n, r, s)) ? e : n,
              o = ma(i, r, s),
              a = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const t = o - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  e <= i && i < t && (s[n] = r + 1);
                }
                s[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !ho(t)))
            throw new Error(
              `Error trying to diff '${wt(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[co()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : (t = this._addAfter(new da(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new fa()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new fa()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class da {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class pa {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class fa {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new pa()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function ma(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class ga {
        constructor() {}
        supports(t) {
          return t instanceof Map || po(t);
        }
        create() {
          return new ya();
        }
      }
      class ya {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || po(t)))
              throw new Error(
                `Error trying to diff '${wt(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new _a(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class _a {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let va = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new at(), new it()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = ht({
              token: t,
              providedIn: "root",
              factory: () => new t([new ua()]),
            })),
            t
          );
        })(),
        ba = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new at(), new it()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = ht({
              token: t,
              providedIn: "root",
              factory: () => new t([new ga()]),
            })),
            t
          );
        })();
      const wa = [new ga()],
        xa = new va([new ua()]),
        Sa = new ba(wa);
      let Ea = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Ca(t, ta)), t;
      })();
      const Ca = function (t, e) {
        return Ni(t, e, sn(), nn());
      };
      let ka = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Ta(t, ta)), t;
      })();
      const Ta = function (t, e) {
          return Fi(t, e, sn(), nn());
        },
        Aa = {};
      class Ia extends Xo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = xe(t);
          return new Pa(e, this.ngModule);
        }
      }
      function Oa(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const Ra = new Ut("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => qn,
      });
      class Pa extends Yo {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(as).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Oa(this.componentDef.inputs);
        }
        get outputs() {
          return Oa(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, Aa, s);
                      return i !== Aa || r === Aa ? i : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            i = s.get(na, $e),
            o = s.get(oa, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            u = n
              ? (function (t, e, n) {
                  if (Be(t)) return t.selectRootElement(e, n === he.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(a, n, this.componentDef.encapsulation)
              : xs(
                  l,
                  i.createRenderer(null, this.componentDef),
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            c = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: qn,
              clean: ri,
              playerHandler: null,
              flags: 0,
            },
            d = Ps(0, -1, null, 1, 0, null, null, null, null, null),
            p = Ss(null, d, h, c, null, null, i, a, o, s);
          let f, m;
          _n(p, null);
          try {
            const t = (function (t, e, n, r, s, i) {
              const o = n[1];
              n[20] = t;
              const a = Es(o, null, 0, 3, null, null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (no(a, l, !0),
                null !== t &&
                  (Dn(s, t, l),
                  null !== a.classes && Ai(s, t, a.classes),
                  null !== a.styles && Ti(s, t, a.styles)));
              const u = r.createRenderer(t, e),
                c = Ss(
                  n,
                  Rs(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  r,
                  u,
                  void 0
                );
              return (
                o.firstCreatePass &&
                  (tr(Zn(a, n), o, e.type), $s(o, a), zs(a, n.length, 1)),
                Js(n, c),
                (n[20] = c)
              );
            })(u, this.componentDef, p, i, a);
            if (u)
              if (n) Dn(a, u, ["ng-version", la.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let i = t[r];
                    if ("string" == typeof i)
                      2 === s
                        ? "" !== i && e.push(i, t[++r])
                        : 8 === s && n.push(i);
                    else {
                      if (!rs(s)) break;
                      s = i;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && Dn(a, u, t), e && e.length > 0 && Ai(a, u, e.join(" "));
              }
            if (((m = Qe(d, 0)), void 0 !== e)) {
              const t = (m.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (f = (function (t, e, n, r, s) {
              const i = n[1],
                o = (function (t, e, n) {
                  const r = sn();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Bs(t, r, 1),
                    qs(t, e, n));
                  const s = ir(e, t, e.length - 1, r);
                  Zr(s, e);
                  const i = qe(r, e);
                  return i && Zr(i, e), s;
                })(i, n, e);
              r.components.push(o),
                (t[8] = o),
                s && s.forEach((t) => t(o, e)),
                e.contentQueries && e.contentQueries(1, o, n.length - 1);
              const a = sn();
              if (
                i.firstCreatePass &&
                (null !== e.hostBindings || null !== e.hostAttrs)
              ) {
                Cn(a.index - Ce);
                const t = n[1];
                Ms(t, e), Us(t, n, e.hostVars), Vs(e, o);
              }
              return o;
            })(t, this.componentDef, p, h, [ro])),
              Cs(d, p, null);
          } finally {
            Sn();
          }
          const g = new La(this.componentType, f, Di(ta, m, p), p, m);
          return (d.node.child = m), g;
        }
      }
      class La extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.destroyCbs = []),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new Oi(r)),
            (function (t, e, n, r) {
              let s = t.node;
              null == s && (t.node = s = Ds(0, null, 2, -1, null, null)),
                (r[6] = s);
            })(r[1], 0, 0, r),
            (this.componentType = t);
        }
        get injector() {
          return new lr(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(t) {
          this.destroyCbs && this.destroyCbs.push(t);
        }
      }
      const Da = void 0;
      var Na = [
        "en",
        [["a", "p"], ["AM", "PM"], Da],
        [["AM", "PM"], Da, Da],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Da,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Da,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Da, "{1} 'at' {0}", Da],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Fa = {};
      function ja(t) {
        return (
          t in Fa ||
            (Fa[t] =
              Rt.ng &&
              Rt.ng.common &&
              Rt.ng.common.locales &&
              Rt.ng.common.locales[t]),
          Fa[t]
        );
      }
      var Ma = (function (t) {
        return (
          (t[(t.LocaleId = 0)] = "LocaleId"),
          (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (t[(t.DaysFormat = 3)] = "DaysFormat"),
          (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
          (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
          (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
          (t[(t.Eras = 7)] = "Eras"),
          (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (t[(t.WeekendRange = 9)] = "WeekendRange"),
          (t[(t.DateFormat = 10)] = "DateFormat"),
          (t[(t.TimeFormat = 11)] = "TimeFormat"),
          (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
          (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
          (t[(t.NumberFormats = 14)] = "NumberFormats"),
          (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
          (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
          (t[(t.CurrencyName = 17)] = "CurrencyName"),
          (t[(t.Currencies = 18)] = "Currencies"),
          (t[(t.Directionality = 19)] = "Directionality"),
          (t[(t.PluralCase = 20)] = "PluralCase"),
          (t[(t.ExtraData = 21)] = "ExtraData"),
          t
        );
      })({});
      const Ua = "en-US";
      let Va = Ua;
      function Ba(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                "ASSERTION ERROR: " + t + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (Va = t.toLowerCase().replace(/_/g, "-"));
      }
      const $a = new Map();
      class Ha extends ee {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ia(this));
          const n = Ee(t),
            r = t[Ft] || null;
          r && Ba(r),
            (this._bootstrapComponents = Qn(n.bootstrap)),
            (this._r3Injector = Qi(
              t,
              e,
              [
                { provide: ee, useValue: this },
                { provide: Xo, useValue: this.componentFactoryResolver },
              ],
              wt(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = to.THROW_IF_NOT_FOUND, n = lt.Default) {
          return t === to || t === ee || t === Vt
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class za extends ne {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Ee(t) &&
              (function t(e) {
                if (null !== e.ɵmod.id) {
                  const t = e.ɵmod.id;
                  (function (t, e, n) {
                    if (e && e !== n)
                      throw new Error(
                        `Duplicate module registered for ${t} - ${wt(
                          e
                        )} vs ${wt(e.name)}`
                      );
                  })(t, $a.get(t), e),
                    $a.set(t, e);
                }
                let n = e.ɵmod.imports;
                n instanceof Function && (n = n()), n && n.forEach((e) => t(e));
              })(t);
        }
        create(t) {
          return new Ha(this.moduleType, t);
        }
      }
      function qa(t, e, n, r, s, i) {
        return (function (t, e, n, r, s, i, o, a) {
          const l = e + n;
          return (function (t, e, n, r, s) {
            const i = go(t, e, n, r);
            return mo(t, e + 2, s) || i;
          })(t, l, s, i, o)
            ? fo(t, l + 3, a ? r.call(a, s, i, o) : r(s, i, o))
            : Qa(t, l + 3);
        })(nn(), hn(), t, e, n, r, s, i);
      }
      function Qa(t, e) {
        const n = t[e];
        return n === ls ? void 0 : n;
      }
      const Wa = class extends S {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let r,
            s = (t) => null,
            i = () => null;
          t && "object" == typeof t
            ? ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (s = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (s = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(r, s, i);
          return t instanceof h && t.add(o), o;
        }
      };
      function Ga() {
        return this._results[co()]();
      }
      class Ka {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Wa()),
            (this.length = 0);
          const t = co(),
            e = Ka.prototype;
          e[t] || (e[t] = Ga);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = (function t(e, n) {
            void 0 === n && (n = e);
            for (let r = 0; r < e.length; r++) {
              let s = e[r];
              Array.isArray(s)
                ? (n === e && (n = e.slice(0, r)), t(s, n))
                : n !== e && n.push(s);
            }
            return n;
          })(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class Za {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Za(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Ya {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              r.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new Ya(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== al(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Ja {
        constructor(t, e, n, r = null) {
          (this.predicate = t),
            (this.descendants = e),
            (this.isStatic = n),
            (this.read = r);
        }
      }
      class Xa {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const r = null !== e ? e.length : 0,
              s = this.getByIndex(n).embeddedTView(t, r);
            s &&
              ((s.indexInDeclarationView = n),
              null !== e ? e.push(s) : (e = [s]));
          }
          return null !== e ? new Xa(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class tl {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new tl(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 4 === n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let r = 0; r < n.length; r++) {
              const s = n[r];
              this.matchTNodeWithReadOption(t, e, el(e, s)),
                this.matchTNodeWithReadOption(t, e, sr(e, t, s, !1, !1));
            }
          else
            n === Ea
              ? 0 === e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, sr(e, t, n, !1, !1));
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === ta || r === ka || (r === Ea && 0 === e.type))
                this.addMatch(e.index, -2);
              else {
                const n = sr(e, t, r, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function el(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
        return null;
      }
      function nl(t, e, n, r) {
        return -1 === n
          ? (function (t, e) {
              return 3 === t.type || 4 === t.type
                ? Di(ta, t, e)
                : 0 === t.type
                ? Ni(Ea, ta, t, e)
                : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === ta
                ? Di(ta, e, t)
                : n === Ea
                ? Ni(Ea, ta, e, t)
                : n === ka
                ? Fi(ka, ta, e, t)
                : void 0;
            })(t, e, r)
          : ir(t, t[1], n, e);
      }
      function rl(t, e, n, r) {
        const s = e[19].queries[r];
        if (null === s.matches) {
          const r = t.data,
            i = n.matches,
            o = [];
          for (let t = 0; t < i.length; t += 2) {
            const s = i[t];
            o.push(s < 0 ? null : nl(e, r[s], i[t + 1], n.metadata.read));
          }
          s.matches = o;
        }
        return s.matches;
      }
      function sl(t) {
        const e = nn(),
          n = rn(),
          r = mn();
        gn(r + 1);
        const s = al(n, r);
        if (t.dirty && Ke(e) === s.metadata.isStatic) {
          if (null === s.matches) t.reset([]);
          else {
            const i = s.crossesNgTemplate
              ? (function t(e, n, r, s) {
                  const i = e.queries.getByIndex(r),
                    o = i.matches;
                  if (null !== o) {
                    const a = rl(e, n, i, r);
                    for (let e = 0; e < o.length; e += 2) {
                      const r = o[e];
                      if (r > 0) s.push(a[e / 2]);
                      else {
                        const i = o[e + 1],
                          a = n[-r];
                        for (let e = ke; e < a.length; e++) {
                          const n = a[e];
                          n[17] === n[3] && t(n[1], n, i, s);
                        }
                        if (null !== a[9]) {
                          const e = a[9];
                          for (let n = 0; n < e.length; n++) {
                            const r = e[n];
                            t(r[1], r, i, s);
                          }
                        }
                      }
                    }
                  }
                  return s;
                })(n, e, r, [])
              : rl(n, e, s, r);
            t.reset(i), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function il(t, e, n) {
        !(function (t, e, n, r, s, i) {
          t.firstCreatePass &&
            (function (t, e, n) {
              null === t.queries && (t.queries = new Xa()),
                t.queries.track(new tl(e, -1));
            })(t, new Ja(n, r, false, s)),
            (function (t, e) {
              const n = new Ka();
              Ls(t, e, n, n.destroy),
                null === e[19] && (e[19] = new Ya()),
                e[19].queries.push(new Za(n));
            })(t, e);
        })(rn(), nn(), t, e, n);
      }
      function ol() {
        return (t = nn()), (e = mn()), t[19].queries[e].queryList;
        var t, e;
      }
      function al(t, e) {
        return t.queries.getByIndex(e);
      }
      const ll = new Ut("Application Initializer");
      let ul = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                ko(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(ll, 8));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const cl = new Ut("AppId"),
        hl = {
          provide: cl,
          useFactory: function () {
            return `${dl()}${dl()}${dl()}`;
          },
          deps: [],
        };
      function dl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const pl = new Ut("Platform Initializer"),
        fl = new Ut("Platform ID"),
        ml = new Ut("appBootstrapListener");
      let gl = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const yl = new Ut("LocaleId"),
        _l = new Ut("DefaultCurrencyCode");
      class vl {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const bl = function (t) {
          return new za(t);
        },
        wl = bl,
        xl = function (t) {
          return Promise.resolve(bl(t));
        },
        Sl = function (t) {
          const e = bl(t),
            n = Qn(Ee(t).declarations).reduce((t, e) => {
              const n = xe(e);
              return n && t.push(new Pa(n)), t;
            }, []);
          return new vl(e, n);
        },
        El = Sl,
        Cl = function (t) {
          return Promise.resolve(Sl(t));
        };
      let kl = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = wl),
              (this.compileModuleAsync = xl),
              (this.compileModuleAndAllComponentsSync = El),
              (this.compileModuleAndAllComponentsAsync = Cl);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Tl = (() => Promise.resolve(0))();
      function Al(t) {
        "undefined" == typeof Zone
          ? Tl.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Il {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Wa(!1)),
            (this.onMicrotaskEmpty = new Wa(!1)),
            (this.onStable = new Wa(!1)),
            (this.onError = new Wa(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const n = this;
          (n._nesting = 0),
            (n._outer = n._inner = Zone.current),
            Zone.wtfZoneSpec && (n._inner = n._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (n._inner = n._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (n._inner = n._inner.fork(Zone.longStackTraceZoneSpec)),
            (n.shouldCoalesceEventChangeDetection = e),
            (n.lastRequestAnimationFrameId = -1),
            (n.nativeRequestAnimationFrame = (function () {
              let t = Rt.requestAnimationFrame,
                e = Rt.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                        Rt,
                        () => {
                          t.fakeTopEventTask ||
                            (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                              "fakeTopEventTask",
                              () => {
                                (t.lastRequestAnimationFrameId = -1),
                                  Ll(t),
                                  Pl(t);
                              },
                              void 0,
                              () => {},
                              () => {}
                            )),
                            t.fakeTopEventTask.invoke();
                        }
                      )),
                      Ll(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, r, s, i, o, a) => {
                  try {
                    return Dl(t), n.invokeTask(s, i, o, a);
                  } finally {
                    e && "eventTask" === i.type && e(), Nl(t);
                  }
                },
                onInvoke: (e, n, r, s, i, o, a) => {
                  try {
                    return Dl(t), e.invoke(r, s, i, o, a);
                  } finally {
                    Nl(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          Ll(t),
                          Pl(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(n);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Il.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Il.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, t, Rl, Ol, Ol);
          try {
            return s.runTask(i, e, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function Ol() {}
      const Rl = {};
      function Pl(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Ll(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Dl(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Nl(t) {
        t._nesting--, Pl(t);
      }
      class Fl {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Wa()),
            (this.onMicrotaskEmpty = new Wa()),
            (this.onStable = new Wa()),
            (this.onError = new Wa());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let jl = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Il.assertNotInAngularZone(),
                        Al(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Al(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== r
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(Il));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ml = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Bl.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Bl.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class Ul {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Vl,
        Bl = new Ul();
      const $l = new Ut("AllowMultipleToken");
      class Hl {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function zl(t, e, n = []) {
        const r = "Platform: " + e,
          s = new Ut(r);
        return (e = []) => {
          let i = ql();
          if (!i || i.injector.get($l, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: Vi, useValue: "platform" }
                );
              !(function (t) {
                if (Vl && !Vl.destroyed && !Vl.injector.get($l, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Vl = t.get(Ql);
                const e = t.get(pl, null);
                e && e.forEach((t) => t());
              })(to.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = ql();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function ql() {
        return Vl && !Vl.destroyed ? Vl : null;
      }
      let Ql = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Fl()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Il({
                          enableLongStackTrace: kr(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              r = [{ provide: Il, useValue: n }];
            return n.run(() => {
              const e = to.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                i = s.injector.get(fr, null);
              if (!i)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                s.onDestroy(() => Kl(this._modules, s)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (t) => {
                      i.handleError(t);
                    },
                  })
                ),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return ko(r)
                      ? r.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(i, n, () => {
                  const t = s.injector.get(ul);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Ba(s.injector.get(yl, Ua) || Ua),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Wl({}, e);
            return (function (t, e, n) {
              const r = new za(n);
              return Promise.resolve(r);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Gl);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${wt(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(to));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Wl(t, e) {
        return Array.isArray(e)
          ? e.reduce(Wl, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Gl = (() => {
        class t {
          constructor(t, e, n, r, s, i) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = kr()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const o = new _((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              a = new _((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Il.assertNotInAngularZone(),
                      Al(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Il.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = q(
              o,
              a.pipe((t) => Q()(J(tt)(t)))
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof Yo
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(ee),
              s = n.create(to.NULL, [], e || n.selector, r);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const i = s.injector.get(jl, null);
            return (
              i &&
                s.injector
                  .get(Ml)
                  .registerApplication(s.location.nativeElement, i),
              this._loadComponent(s),
              kr() &&
                this._console.log(
                  "Angular is running in development mode. Call enableProdMode() to enable production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Kl(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(ml, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), Kl(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(Il), Zt(gl), Zt(to), Zt(fr), Zt(Xo), Zt(ul));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Kl(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class Zl {}
      class Yl {}
      const Jl = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let Xl = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Jl);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#");
            return (
              void 0 === r && (r = "default"),
              n("zn8P")(e)
                .then((t) => t[r])
                .then((t) => tu(t, e, r))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, r] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === r && ((r = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[r + s])
                .then((t) => tu(t, e, r))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(kl), Zt(Yl, 8));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function tu(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const eu = zl(null, "core", [
          { provide: fl, useValue: "unknown" },
          { provide: Ql, deps: [to] },
          { provide: Ml, deps: [] },
          { provide: gl, deps: [] },
        ]),
        nu = [
          {
            provide: Gl,
            useClass: Gl,
            deps: [Il, gl, to, fr, Xo, ul],
          },
          {
            provide: Ra,
            deps: [Il],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: ul, useClass: ul, deps: [[new it(), ll]] },
          { provide: kl, useClass: kl, deps: [] },
          hl,
          {
            provide: va,
            useFactory: function () {
              return xa;
            },
            deps: [],
          },
          {
            provide: ba,
            useFactory: function () {
              return Sa;
            },
            deps: [],
          },
          {
            provide: yl,
            useFactory: function (t) {
              return (
                Ba(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    Ua)
                ),
                t
              );
            },
            deps: [[new st(yl), new it(), new at()]],
          },
          { provide: _l, useValue: "USD" },
        ];
      let ru = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)(Zt(Gl));
              },
              providers: nu,
            })),
            t
          );
        })(),
        su = null;
      function iu() {
        return su;
      }
      const ou = new Ut("DocumentToken");
      let au = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ht({ factory: lu, token: t, providedIn: "platform" })),
          t
        );
      })();
      function lu() {
        return Zt(cu);
      }
      const uu = new Ut("Location Initialized");
      let cu = (() => {
        class t extends au {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = iu().getLocation()),
              (this._history = iu().getHistory());
          }
          getBaseHrefFromDOM() {
            return iu().getBaseHref(this._doc);
          }
          onPopState(t) {
            iu()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            iu()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            hu() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            hu()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(ou));
          }),
          (t.ɵprov = ht({
            factory: du,
            token: t,
            providedIn: "platform",
          })),
          t
        );
      })();
      function hu() {
        return !!window.history.pushState;
      }
      function du() {
        return new cu(Zt(ou));
      }
      function pu(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function fu(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function mu(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let gu = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ht({ factory: yu, token: t, providedIn: "root" })),
          t
        );
      })();
      function yu(t) {
        const e = Zt(ou).location;
        return new vu(Zt(au), (e && e.origin) || "");
      }
      const _u = new Ut("appBaseHref");
      let vu = (() => {
          class t extends gu {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return pu(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  mu(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + mu(r));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + mu(r));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(au), Zt(_u, 8));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        bu = (() => {
          class t extends gu {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = pu(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + mu(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + mu(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(au), Zt(_u, 8));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        wu = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new Wa()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = fu(Su(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + mu(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, Su(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + mu(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + mu(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((t) => {
                    this._notifyUrlChangeListeners(t.url, t.state);
                  }));
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(gu), Zt(au));
            }),
            (t.normalizeQueryParams = mu),
            (t.joinWithSlash = pu),
            (t.stripTrailingSlash = fu),
            (t.ɵprov = ht({ factory: xu, token: t, providedIn: "root" })),
            t
          );
        })();
      function xu() {
        return new wu(Zt(gu), Zt(au));
      }
      function Su(t) {
        return t.replace(/\/index.html$/, "");
      }
      var Eu = (function (t) {
        return (
          (t[(t.Zero = 0)] = "Zero"),
          (t[(t.One = 1)] = "One"),
          (t[(t.Two = 2)] = "Two"),
          (t[(t.Few = 3)] = "Few"),
          (t[(t.Many = 4)] = "Many"),
          (t[(t.Other = 5)] = "Other"),
          t
        );
      })({});
      class Cu {}
      let ku = (() => {
        class t extends Cu {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, "-");
                  })(t);
                  let n = ja(e);
                  if (n) return n;
                  const r = e.split("-")[0];
                  if (((n = ja(r)), n)) return n;
                  if ("en" === r) return Na;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[Ma.PluralCase];
              })(e || this.locale)(t)
            ) {
              case Eu.Zero:
                return "zero";
              case Eu.One:
                return "one";
              case Eu.Two:
                return "two";
              case Eu.Few:
                return "few";
              case Eu.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(yl));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Tu {
        constructor(t, e, n, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Au = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            kr() &&
              null != t &&
              "function" != typeof t &&
              console &&
              console.warn &&
              console.warn(
                `trackBy must be a function, but received ${JSON.stringify(
                  t
                )}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`
              ),
              (this._trackByFn = t);
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, r) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new Tu(null, this._ngForOf, -1, -1),
                    null === r ? void 0 : r
                  ),
                  s = new Iu(t, n);
                e.push(s);
              } else if (null == r)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const s = this._viewContainer.get(n);
                this._viewContainer.move(s, r);
                const i = new Iu(t, s);
                e.push(i);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, r = this._viewContainer.length; n < r; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = r),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(vo(ka), vo(Ea), vo(va));
          }),
          (t.ɵdir = we({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class Iu {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let Ou = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new Ru()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            Pu("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            Pu("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(vo(ka), vo(Ea));
          }),
          (t.ɵdir = we({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class Ru {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Pu(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${wt(e)}'.`
          );
      }
      let Lu = (() => {
          class t {
            constructor(t, e, n) {
              (this._ngEl = t),
                (this._differs = e),
                (this._renderer = n),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(t) {
              (this._ngStyle = t),
                !this._differ &&
                  t &&
                  (this._differ = this._differs.find(t).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const t = this._differ.diff(this._ngStyle);
                t && this._applyChanges(t);
              }
            }
            _setStyle(t, e) {
              const [n, r] = t.split(".");
              null != (e = null != e && r ? `${e}${r}` : e)
                ? this._renderer.setStyle(this._ngEl.nativeElement, n, e)
                : this._renderer.removeStyle(this._ngEl.nativeElement, n);
            }
            _applyChanges(t) {
              t.forEachRemovedItem((t) => this._setStyle(t.key, null)),
                t.forEachAddedItem((t) =>
                  this._setStyle(t.key, t.currentValue)
                ),
                t.forEachChangedItem((t) =>
                  this._setStyle(t.key, t.currentValue)
                );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(ta), vo(ba), vo(sa));
            }),
            (t.ɵdir = we({
              type: t,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
            })),
            t
          );
        })(),
        Du = (() => {
          class t {}
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: Cu, useClass: ku }],
            })),
            t
          );
        })();
      function Nu(t) {
        return "browser" === t;
      }
      function Fu(t) {
        return "server" === t;
      }
      let ju = (() => {
        class t {}
        return (
          (t.ɵprov = ht({
            token: t,
            providedIn: "root",
            factory: () => new Mu(Zt(ou), window, Zt(fr)),
          })),
          t
        );
      })();
      class Mu {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportsScrolling()) {
            const e =
              this.document.getElementById(t) ||
              this.document.getElementsByName(t)[0];
            e && this.scrollToElement(e);
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.window || !this.window.scrollTo) return !1;
            const t =
              Uu(this.window.history) ||
              Uu(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return !!this.window.scrollTo;
          } catch (t) {
            return !1;
          }
        }
      }
      function Uu(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration");
      }
      class Vu extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new Vu()), su || (su = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            $u || (($u = document.querySelector("base")), $u)
              ? $u.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              Bu || (Bu = document.createElement("a")),
              Bu.setAttribute("href", n),
              "/" === Bu.pathname.charAt(0) ? Bu.pathname : "/" + Bu.pathname);
          var n;
        }
        resetBaseElement() {
          $u = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return (function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const t = n.indexOf("="),
                [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
              if (r.trim() === e) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Bu,
        $u = null;
      const Hu = new Ut("TRANSITION_ID"),
        zu = [
          {
            provide: ll,
            useFactory: function (t, e, n) {
              return () => {
                n.get(ul).donePromise.then(() => {
                  const n = iu();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [Hu, ou, to],
            multi: !0,
          },
        ];
      class qu {
        static init() {
          var t;
          (t = new qu()), (Bl = t);
        }
        addToWindow(t) {
          (Rt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (Rt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Rt.getAllAngularRootElements = () => t.getAllRootElements()),
            Rt.frameworkStabilizers || (Rt.frameworkStabilizers = []),
            Rt.frameworkStabilizers.push((t) => {
              const e = Rt.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? iu().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const Qu = new Ut("EventManagerPlugins");
      let Wu = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error("No event manager plugin found for event " + t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(Qu), Zt(Il));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Gu {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = iu().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let Ku = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Zu = (() => {
          class t extends Ku {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => iu().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(ou));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Yu = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Ju = /%COMP%/g;
      function Xu(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? Xu(t, s, n) : ((s = s.replace(Ju, t)), n.push(s));
        }
        return n;
      }
      function tc(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let ec = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new nc(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case he.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new rc(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case he.Native:
              case he.ShadowDom:
                return new sc(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = Xu(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(Wu), Zt(Zu), Zt(cl));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class nc {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Yu[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const s = Yu[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = Yu[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & ra.DashCase
            ? t.style.setProperty(e, n, r & ra.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & ra.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, tc(n))
            : this.eventManager.addEventListener(t, e, tc(n));
        }
      }
      class rc extends nc {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = Xu(r + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Ju,
              r + "-" + n.id
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(Ju, r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class sc extends nc {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = r),
            (this.shadowRoot =
              r.encapsulation === he.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Xu(r.id, r.styles, []);
          for (let i = 0; i < s.length; i++) {
            const t = document.createElement("style");
            (t.textContent = s[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let ic = (() => {
        class t extends Gu {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(ou));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const oc = ["alt", "control", "meta", "shift"],
        ac = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        lc = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        uc = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let cc = (() => {
          class t extends Gu {
            constructor(t) {
              super(t);
            }
            supports(e) {
              return null != t.parseEventName(e);
            }
            addEventListener(e, n, r) {
              const s = t.parseEventName(n),
                i = t.eventCallback(s.fullKey, r, this.manager.getZone());
              return this.manager
                .getZone()
                .runOutsideAngular(() =>
                  iu().onAndCancel(e, s.domEventName, i)
                );
            }
            static parseEventName(e) {
              const n = e.toLowerCase().split("."),
                r = n.shift();
              if (0 === n.length || ("keydown" !== r && "keyup" !== r))
                return null;
              const s = t._normalizeKey(n.pop());
              let i = "";
              if (
                (oc.forEach((t) => {
                  const e = n.indexOf(t);
                  e > -1 && (n.splice(e, 1), (i += t + "."));
                }),
                (i += s),
                0 != n.length || 0 === s.length)
              )
                return null;
              const o = {};
              return (o.domEventName = r), (o.fullKey = i), o;
            }
            static getEventFullKey(t) {
              let e = "",
                n = (function (t) {
                  let e = t.key;
                  if (null == e) {
                    if (((e = t.keyIdentifier), null == e))
                      return "Unidentified";
                    e.startsWith("U+") &&
                      ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                      3 === t.location && lc.hasOwnProperty(e) && (e = lc[e]));
                  }
                  return ac[e] || e;
                })(t);
              return (
                (n = n.toLowerCase()),
                " " === n ? (n = "space") : "." === n && (n = "dot"),
                oc.forEach((r) => {
                  r != n && (0, uc[r])(t) && (e += r + ".");
                }),
                (e += n),
                e
              );
            }
            static eventCallback(e, n, r) {
              return (s) => {
                t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
              };
            }
            static _normalizeKey(t) {
              switch (t) {
                case "esc":
                  return "escape";
                default:
                  return t;
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(ou));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        hc = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ht({
              factory: function () {
                return Zt(dc);
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        dc = (() => {
          class t extends hc {
            constructor(t) {
              super(), (this._doc = t);
            }
            sanitize(t, e) {
              if (null == e) return null;
              switch (t) {
                case Kr.NONE:
                  return e;
                case Kr.HTML:
                  return xr(e, "HTML")
                    ? wr(e)
                    : (function (t, e) {
                        let n = null;
                        try {
                          Wr =
                            Wr ||
                            (function (t) {
                              return (function () {
                                try {
                                  return !!new window.DOMParser().parseFromString(
                                    "",
                                    "text/html"
                                  );
                                } catch (t) {
                                  return !1;
                                }
                              })()
                                ? new Tr()
                                : new Ar(t);
                            })(t);
                          let r = e ? String(e) : "";
                          n = Wr.getInertBodyElement(r);
                          let s = 5,
                            i = r;
                          do {
                            if (0 === s)
                              throw new Error(
                                "Failed to sanitize html because the input is unstable"
                              );
                            s--,
                              (r = i),
                              (i = n.innerHTML),
                              (n = Wr.getInertBodyElement(r));
                          } while (r !== i);
                          const o = new Hr(),
                            a = o.sanitizeChildren(Gr(n) || n);
                          return (
                            kr() &&
                              o.sanitizedSomething &&
                              console.warn(
                                "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
                              ),
                            a
                          );
                        } finally {
                          if (n) {
                            const t = Gr(n) || n;
                            for (; t.firstChild; ) t.removeChild(t.firstChild);
                          }
                        }
                      })(this._doc, String(e));
                case Kr.STYLE:
                  return xr(e, "Style") ? wr(e) : e;
                case Kr.SCRIPT:
                  if (xr(e, "Script")) return wr(e);
                  throw new Error("unsafe value used in a script context");
                case Kr.URL:
                  return Sr(e), xr(e, "URL") ? wr(e) : Rr(String(e));
                case Kr.RESOURCE_URL:
                  if (xr(e, "ResourceURL")) return wr(e);
                  throw new Error(
                    "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${t} (see http://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(t) {
              return new gr(t);
            }
            bypassSecurityTrustStyle(t) {
              return new yr(t);
            }
            bypassSecurityTrustScript(t) {
              return new _r(t);
            }
            bypassSecurityTrustUrl(t) {
              return new vr(t);
            }
            bypassSecurityTrustResourceUrl(t) {
              return new br(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(ou));
            }),
            (t.ɵprov = ht({
              factory: function () {
                return (t = Zt(Vt)), new dc(t.get(ou));
                var t;
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      const pc = zl(eu, "browser", [
          { provide: fl, useValue: "browser" },
          {
            provide: pl,
            useValue: function () {
              Vu.makeCurrent(), qu.init();
            },
            multi: !0,
          },
          {
            provide: ou,
            useFactory: function () {
              return (
                (function (t) {
                  Ve = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        fc = [
          [],
          { provide: Vi, useValue: "root" },
          {
            provide: fr,
            useFactory: function () {
              return new fr();
            },
            deps: [],
          },
          {
            provide: Qu,
            useClass: ic,
            multi: !0,
            deps: [ou, Il, fl],
          },
          { provide: Qu, useClass: cc, multi: !0, deps: [ou] },
          [],
          { provide: ec, useClass: ec, deps: [Wu, Zu, cl] },
          { provide: na, useExisting: ec },
          { provide: Ku, useExisting: Zu },
          { provide: Zu, useClass: Zu, deps: [ou] },
          { provide: jl, useClass: jl, deps: [Il] },
          { provide: Wu, useClass: Wu, deps: [Qu, Il] },
          [],
        ];
      let mc = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: cl, useValue: e.appId },
                { provide: Hu, useExisting: cl },
                zu,
              ],
            };
          }
        }
        return (
          (t.ɵmod = ve({ type: t })),
          (t.ɵinj = dt({
            factory: function (e) {
              return new (e || t)(Zt(t, 12));
            },
            providers: fc,
            imports: [Du, ru],
          })),
          t
        );
      })();
      function gc(...t) {
        let e = t[t.length - 1];
        return C(e) ? (t.pop(), N(t, e)) : z(t);
      }
      "undefined" != typeof window && window;
      class yc extends S {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new b();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      class _c extends f {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      class vc extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function bc(t, e, n, r, s = new vc(t, n, r)) {
        if (!s.closed) return e instanceof _ ? e.subscribe(s) : D(e)(s);
      }
      const wc = {};
      class xc {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new Sc(t, this.resultSelector));
        }
      }
      class Sc extends _c {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(wc), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) this.add(bc(this, t[n], void 0, n));
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n) {
          const r = this.values,
            s = this.toRespond
              ? r[n] === wc
                ? --this.toRespond
                : this.toRespond
              : 0;
          (r[n] = e),
            0 === s &&
              (this.resultSelector
                ? this._tryResultSelector(r)
                : this.destination.next(r.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const Ec = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "no elements in sequence"),
              (this.name = "EmptyError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        Cc = new _((t) => t.complete());
      function kc(t) {
        return t
          ? (function (t) {
              return new _((e) => t.schedule(() => e.complete()));
            })(t)
          : Cc;
      }
      function Tc(t) {
        return new _((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? F(n) : kc()).subscribe(e);
        });
      }
      function Ac() {
        return H(1);
      }
      function Ic(t, e) {
        return function (n) {
          return n.lift(new Oc(t, e));
        };
      }
      class Oc {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Rc(t, this.predicate, this.thisArg));
        }
      }
      class Rc extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      const Pc = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Lc(t) {
        return function (e) {
          return 0 === t ? kc() : e.lift(new Dc(t));
        };
      }
      class Dc {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Pc();
        }
        call(t, e) {
          return e.subscribe(new Nc(t, this.total));
        }
      }
      class Nc extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function Fc(t = Uc) {
        return (e) => e.lift(new jc(t));
      }
      class jc {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new Mc(t, this.errorFactory));
        }
      }
      class Mc extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function Uc() {
        return new Ec();
      }
      function Vc(t = null) {
        return (e) => e.lift(new Bc(t));
      }
      class Bc {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new $c(t, this.defaultValue));
        }
      }
      class $c extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function Hc(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(Hc((n, r) => F(t(n, r)).pipe(k((t, s) => e(n, t, r, s)))))
          : (e) => e.lift(new zc(t));
      }
      class zc {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new qc(t, this.project));
        }
      }
      class qc extends M {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e);
        }
        _innerSub(t) {
          const e = this.innerSubscription;
          e && e.unsubscribe();
          const n = new j(this),
            r = this.destination;
          r.add(n),
            (this.innerSubscription = U(t, n)),
            this.innerSubscription !== n && r.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
      }
      function Qc(t) {
        return (e) => (0 === t ? kc() : e.lift(new Wc(t)));
      }
      class Wc {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Pc();
        }
        call(t, e) {
          return e.subscribe(new Gc(t, this.total));
        }
      }
      class Gc extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Kc(...t) {
        return Ac()(gc(...t));
      }
      class Zc {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new Yc(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Yc extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function Jc(t) {
        return function (e) {
          const n = new Xc(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class Xc {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new th(t, this.selector, this.caught));
        }
      }
      class th extends M {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new j(this);
            this.add(r);
            const s = U(n, r);
            s !== r && this.add(s);
          }
        }
      }
      function eh(t, e) {
        return V(t, e, 1);
      }
      function nh(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? Ic((e, n) => t(e, n, r)) : y,
            Qc(1),
            n ? Vc(e) : Fc(() => new Ec())
          );
      }
      function rh() {}
      function sh(t, e, n) {
        return function (r) {
          return r.lift(new ih(t, e, n));
        };
      }
      class ih {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new oh(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class oh extends f {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = rh),
            (this._tapError = rh),
            (this._tapComplete = rh),
            (this._tapError = n || rh),
            (this._tapComplete = s || rh),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || rh),
                (this._tapError = e.error || rh),
                (this._tapComplete = e.complete || rh));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class ah {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new lh(t, this.callback));
        }
      }
      class lh extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class uh {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class ch extends uh {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class hh extends uh {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class dh extends uh {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ph extends uh {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class fh extends uh {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class mh extends uh {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class gh extends uh {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class yh extends uh {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _h extends uh {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class vh {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class bh {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class wh {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class xh {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Sh {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Eh {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Ch {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const kh = "primary";
      class Th {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Ah(t) {
        return new Th(t);
      }
      function Ih(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function Oh(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      function Rh(t, e) {
        const n = Object.keys(t),
          r = Object.keys(e);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), !Ph(t[s], e[s]))) return !1;
        return !0;
      }
      function Ph(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            r = [...e].sort();
          return n.every((t, e) => r[e] === t);
        }
        return t === e;
      }
      function Lh(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Dh(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Nh(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Fh(t) {
        return (e = t) && "function" == typeof e.subscribe
          ? t
          : ko(t)
          ? F(Promise.resolve(t))
          : gc(t);
        var e;
      }
      function jh(t, e, n) {
        return n
          ? (function (t, e) {
              return Rh(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!Bh(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const r in n.children) {
                  if (!e.children[r]) return !1;
                  if (!t(e.children[r], n.children[r])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => Ph(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, r, s) {
                  if (n.segments.length > s.length)
                    return (
                      !!Bh(n.segments.slice(0, s.length), s) && !r.hasChildren()
                    );
                  if (n.segments.length === s.length) {
                    if (!Bh(n.segments, s)) return !1;
                    for (const e in r.children) {
                      if (!n.children[e]) return !1;
                      if (!t(n.children[e], r.children[e])) return !1;
                    }
                    return !0;
                  }
                  {
                    const t = s.slice(0, n.segments.length),
                      i = s.slice(n.segments.length);
                    return (
                      !!Bh(n.segments, t) &&
                      !!n.children.primary &&
                      e(n.children.primary, r, i)
                    );
                  }
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      class Mh {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ah(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return qh.serialize(this);
        }
      }
      class Uh {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Nh(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Qh(this);
        }
      }
      class Vh {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Ah(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Jh(this);
        }
      }
      function Bh(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function $h(t, e) {
        let n = [];
        return (
          Nh(t.children, (t, r) => {
            r === kh && (n = n.concat(e(t, r)));
          }),
          Nh(t.children, (t, r) => {
            r !== kh && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      class Hh {}
      class zh {
        parse(t) {
          const e = new rd(t);
          return new Mh(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          return `${
            "/" +
            (function t(e, n) {
              if (!e.hasChildren()) return Qh(e);
              if (n) {
                const n = e.children.primary ? t(e.children.primary, !1) : "",
                  r = [];
                return (
                  Nh(e.children, (e, n) => {
                    n !== kh && r.push(`${n}:${t(e, !1)}`);
                  }),
                  r.length > 0 ? `${n}(${r.join("//")})` : n
                );
              }
              {
                const n = $h(e, (n, r) =>
                  r === kh ? [t(e.children.primary, !1)] : [`${r}:${t(n, !1)}`]
                );
                return 1 === Object.keys(e.children).length &&
                  null != e.children.primary
                  ? `${Qh(e)}/${n[0]}`
                  : `${Qh(e)}/(${n.join("//")})`;
              }
            })(t.root, !0)
          }${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${Gh(e)}=${Gh(t)}`).join("&")
                : `${Gh(e)}=${Gh(n)}`;
            });
            return e.length ? "?" + e.join("&") : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment ? "#" + encodeURI(t.fragment) : ""
          }`;
        }
      }
      const qh = new zh();
      function Qh(t) {
        return t.segments.map((t) => Jh(t)).join("/");
      }
      function Wh(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Gh(t) {
        return Wh(t).replace(/%3B/gi, ";");
      }
      function Kh(t) {
        return Wh(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Zh(t) {
        return decodeURIComponent(t);
      }
      function Yh(t) {
        return Zh(t.replace(/\+/g, "%20"));
      }
      function Jh(t) {
        return `${Kh(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${Kh(t)}=${Kh(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const Xh = /^[^\/()?;=#]+/;
      function td(t) {
        const e = t.match(Xh);
        return e ? e[0] : "";
      }
      const ed = /^[^=?&#]+/,
        nd = /^[^?&#]+/;
      class rd {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Uh([], {})
              : new Uh([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new Uh(t, e)),
            n
          );
        }
        parseSegment() {
          const t = td(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Vh(Zh(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = td(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = td(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[Zh(e)] = Zh(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(ed);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(nd);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const r = Yh(e),
            s = Yh(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = td(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = kh);
            const i = this.parseChildren();
            (e[s] = 1 === Object.keys(i).length ? i.primary : new Uh([], i)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class sd {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = id(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = id(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = od(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return od(t, this._root).map((t) => t.value);
        }
      }
      function id(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = id(t, n);
          if (e) return e;
        }
        return null;
      }
      function od(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = od(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class ad {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function ld(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class ud extends sd {
        constructor(t, e) {
          super(t), (this.snapshot = e), md(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function cd(t, e) {
        const n = (function (t, e) {
            const n = new pd([], {}, {}, "", {}, kh, e, null, t.root, -1, {});
            return new fd("", new ad(n, []));
          })(t, e),
          r = new yc([new Vh("", {})]),
          s = new yc({}),
          i = new yc({}),
          o = new yc({}),
          a = new yc(""),
          l = new hd(r, s, o, a, i, kh, e, n.root);
        return (l.snapshot = n.root), new ud(new ad(l, []), n);
      }
      class hd {
        constructor(t, e, n, r, s, i, o, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(k((t) => Ah(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(k((t) => Ah(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function dd(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class pd {
        constructor(t, e, n, r, s, i, o, a, l, u, c) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Ah(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ah(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class fd extends sd {
        constructor(t, e) {
          super(e), (this.url = t), md(this, e);
        }
        toString() {
          return gd(this._root);
        }
      }
      function md(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => md(t, e));
      }
      function gd(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(gd).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function yd(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            Rh(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Rh(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!Rh(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            Rh(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function _d(t, e) {
        var n, r;
        return (
          Rh(t.params, e.params) &&
          Bh((n = t.url), (r = e.url)) &&
          n.every((t, e) => Rh(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || _d(t.parent, e.parent))
        );
      }
      function vd(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function bd(t, e, n, r, s) {
        let i = {};
        return (
          r &&
            Nh(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map((t) => "" + t) : "" + t;
            }),
          new Mh(
            n.root === t
              ? e
              : (function t(e, n, r) {
                  const s = {};
                  return (
                    Nh(e.children, (e, i) => {
                      s[i] = e === n ? r : t(e, n, r);
                    }),
                    new Uh(e.segments, s)
                  );
                })(n.root, t, e),
            i,
            s
          )
        );
      }
      class wd {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && vd(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(
            (t) => "object" == typeof t && null != t && t.outlets
          );
          if (r && r !== Dh(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class xd {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function Sd(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets.primary
          : "" + t;
      }
      function Ed(t, e, n) {
        if (
          (t || (t = new Uh([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return Cd(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i;
              const e = t.segments[s],
                o = Sd(n[r]),
                a = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === o) break;
              if (o && a && "object" == typeof a && void 0 === a.outlets) {
                if (!Id(o, a, e)) return i;
                r += 2;
              } else {
                if (!Id(o, {}, e)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new Uh(t.segments.slice(0, r.pathIndex), {});
          return (
            (e.children.primary = new Uh(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            Cd(e, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new Uh(t.segments, {})
          : r.match && !t.hasChildren()
          ? kd(t, e, n)
          : r.match
          ? Cd(t, 0, s)
          : kd(t, e, n);
      }
      function Cd(t, e, n) {
        if (0 === n.length) return new Uh(t.segments, {});
        {
          const r = (function (t) {
              return "object" == typeof t[0] && null !== t[0] && t[0].outlets
                ? t[0].outlets
                : { [kh]: t };
            })(n),
            s = {};
          return (
            Nh(r, (n, r) => {
              null !== n && (s[r] = Ed(t.children[r], e, n));
            }),
            Nh(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new Uh(t.segments, s)
          );
        }
      }
      function kd(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          if (
            "object" == typeof n[s] &&
            null !== n[s] &&
            void 0 !== n[s].outlets
          ) {
            const t = Td(n[s].outlets);
            return new Uh(r, t);
          }
          if (0 === s && vd(n[0])) {
            r.push(new Vh(t.segments[e].path, n[0])), s++;
            continue;
          }
          const i = Sd(n[s]),
            o = s < n.length - 1 ? n[s + 1] : null;
          i && o && vd(o)
            ? (r.push(new Vh(i, Ad(o))), (s += 2))
            : (r.push(new Vh(i, {})), s++);
        }
        return new Uh(r, {});
      }
      function Td(t) {
        const e = {};
        return (
          Nh(t, (t, n) => {
            null !== t && (e[n] = kd(new Uh([], {}), 0, t));
          }),
          e
        );
      }
      function Ad(t) {
        const e = {};
        return Nh(t, (t, n) => (e[n] = "" + t)), e;
      }
      function Id(t, e, n) {
        return t == n.path && Rh(e, n.parameters);
      }
      class Od {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            yd(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = ld(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            Nh(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const r = ld(t),
              s = t.value.component ? n.children : e;
            Nh(r, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const r = ld(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new Eh(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new xh(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((yd(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Rd(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function Rd(t) {
        yd(t.value), t.children.forEach(Rd);
      }
      class Pd {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function Ld(t) {
        return "function" == typeof t;
      }
      function Dd(t) {
        return t instanceof Mh;
      }
      const Nd = Symbol("INITIAL_VALUE");
      function Fd() {
        return Hc((t) =>
          (function (...t) {
            let e = void 0,
              n = void 0;
            return (
              C(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              z(t, n).lift(new xc(e))
            );
          })(
            ...t.map((t) =>
              t.pipe(
                Qc(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return C(e) ? (t.pop(), (n) => Kc(t, n, e)) : (e) => Kc(t, e);
                })(Nd)
              )
            )
          ).pipe(
            (function (t, e) {
              let n = !1;
              return (
                arguments.length >= 2 && (n = !0),
                function (r) {
                  return r.lift(new Zc(t, e, n));
                }
              );
            })((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== Nd) return t;
                if ((r === Nd && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || Dd(r)) return r;
                }
                return t;
              }, t);
            }, Nd),
            Ic((t) => t !== Nd),
            k((t) => (Dd(t) ? t : !0 === t)),
            Qc(1)
          )
        );
      }
      class jd {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Md {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Ud(t) {
        return new _((e) => e.error(new jd(t)));
      }
      function Vd(t) {
        return new _((e) => e.error(new Md(t)));
      }
      function Bd(t) {
        return new _((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class $d {
        constructor(t, e, n, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(ee));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            kh
          )
            .pipe(
              k((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Jc((t) => {
                if (t instanceof Md)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof jd) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, kh)
            .pipe(k((e) => this.createUrlTree(e, t.queryParams, t.fragment)))
            .pipe(
              Jc((t) => {
                if (t instanceof jd) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new Uh([], { [kh]: t }) : t;
          return new Mh(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(k((t) => new Uh([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return gc({});
            const n = [],
              r = [],
              s = {};
            return (
              Nh(t, (t, i) => {
                const o = e(i, t).pipe(k((t) => (s[i] = t)));
                i === kh ? n.push(o) : r.push(o);
              }),
              gc.apply(null, n.concat(r)).pipe(
                Ac(),
                (function (t, e) {
                  const n = arguments.length >= 2;
                  return (r) =>
                    r.pipe(
                      t ? Ic((e, n) => t(e, n, r)) : y,
                      Lc(1),
                      n ? Vc(e) : Fc(() => new Ec())
                    );
                })(),
                k(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(t, e, r, n));
        }
        expandSegment(t, e, n, r, s, i) {
          return gc(...n).pipe(
            eh((o) =>
              this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(
                Jc((t) => {
                  if (t instanceof jd) return gc(null);
                  throw t;
                })
              )
            ),
            nh((t) => !!t),
            Jc((t, n) => {
              if (t instanceof Ec || "EmptyError" === t.name) {
                if (this.noLeftoversInUrl(e, r, s)) return gc(new Uh([], {}));
                throw new jd(e);
              }
              throw t;
            })
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return Qd(r) !== i
            ? Ud(e)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, r, s)
            : o && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
            : Ud(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? Vd(s)
            : this.lineralizeSegments(n, s).pipe(
                V((n) => {
                  const s = new Uh(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: u,
          } = Hd(e, r, s);
          if (!o) return Ud(e);
          const c = this.applyRedirectCommands(a, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? Vd(c)
            : this.lineralizeSegments(r, c).pipe(
                V((r) =>
                  this.expandSegment(t, e, n, r.concat(s.slice(l)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(k((t) => ((n._loadedConfig = t), new Uh(r, {}))))
              : gc(new Uh(r, {}));
          const { matched: s, consumedSegments: i, lastChild: o } = Hd(e, n, r);
          if (!s) return Ud(e);
          const a = r.slice(o);
          return this.getChildConfig(t, n, r).pipe(
            V((t) => {
              const n = t.module,
                r = t.routes,
                { segmentGroup: s, slicedSegments: o } = (function (
                  t,
                  e,
                  n,
                  r
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return n.some((n) => qd(t, e, n) && Qd(n) !== kh);
                    })(t, n, r)
                    ? {
                        segmentGroup: zd(
                          new Uh(
                            e,
                            (function (t, e) {
                              const n = {};
                              n.primary = e;
                              for (const r of t)
                                "" === r.path &&
                                  Qd(r) !== kh &&
                                  (n[Qd(r)] = new Uh([], {}));
                              return n;
                            })(r, new Uh(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return n.some((n) => qd(t, e, n));
                      })(t, n, r)
                    ? {
                        segmentGroup: zd(
                          new Uh(
                            t.segments,
                            (function (t, e, n, r) {
                              const s = {};
                              for (const i of n)
                                qd(t, e, i) &&
                                  !r[Qd(i)] &&
                                  (s[Qd(i)] = new Uh([], {}));
                              return Object.assign(Object.assign({}, r), s);
                            })(t, n, r, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, i, a, r);
              return 0 === o.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(k((t) => new Uh(i, t)))
                : 0 === r.length && 0 === o.length
                ? gc(new Uh(i, {}))
                : this.expandSegment(n, s, r, o, kh, !0).pipe(
                    k((t) => new Uh(i.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? gc(new Pd(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? gc(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  V((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(k((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new _((e) =>
                            e.error(
                              Ih(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : gc(new Pd([], t));
        }
        runCanLoadGuards(t, e, n) {
          const r = e.canLoad;
          return r && 0 !== r.length
            ? gc(
                r.map((r) => {
                  const s = t.get(r);
                  let i;
                  if (
                    (function (t) {
                      return t && Ld(t.canLoad);
                    })(s)
                  )
                    i = s.canLoad(e, n);
                  else {
                    if (!Ld(s)) throw new Error("Invalid CanLoad guard");
                    i = s(e, n);
                  }
                  return Fh(i);
                })
              ).pipe(
                Fd(),
                sh((t) => {
                  if (!Dd(t)) return;
                  const e = Ih(
                    `Redirecting to "${this.urlSerializer.serialize(t)}"`
                  );
                  throw ((e.url = t), e);
                }),
                k((t) => !0 === t)
              )
            : gc(!0);
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return gc(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return Bd(t.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new Mh(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            Nh(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let i = {};
          return (
            Nh(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new Uh(s, i)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function Hd(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const r = (e.matcher || Oh)(n, t, e);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function zd(t) {
        if (1 === t.numberOfChildren && t.children.primary) {
          const e = t.children.primary;
          return new Uh(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function qd(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function Qd(t) {
        return t.outlet || kh;
      }
      class Wd {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Gd {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function Kd(t, e, n) {
        const r = t._root;
        return (function t(
          e,
          n,
          r,
          s,
          i = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const o = ld(n);
          return (
            e.children.forEach((e) => {
              !(function (
                e,
                n,
                r,
                s,
                i = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const o = e.value,
                  a = n ? n.value : null,
                  l = r ? r.getContext(e.value.outlet) : null;
                if (a && o.routeConfig === a.routeConfig) {
                  const u = (function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                      case "pathParamsChange":
                        return !Bh(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !Bh(t.url, e.url) || !Rh(t.queryParams, e.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !_d(t, e) || !Rh(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !_d(t, e);
                    }
                  })(a, o, o.routeConfig.runGuardsAndResolvers);
                  u
                    ? i.canActivateChecks.push(new Wd(s))
                    : ((o.data = a.data), (o._resolvedData = a._resolvedData)),
                    t(e, n, o.component ? (l ? l.children : null) : r, s, i),
                    u &&
                      i.canDeactivateChecks.push(
                        new Gd((l && l.outlet && l.outlet.component) || null, a)
                      );
                } else
                  a && Yd(n, l, i),
                    i.canActivateChecks.push(new Wd(s)),
                    t(e, null, o.component ? (l ? l.children : null) : r, s, i);
              })(e, o[e.value.outlet], r, s.concat([e.value]), i),
                delete o[e.value.outlet];
            }),
            Nh(o, (t, e) => Yd(t, r.getContext(e), i)),
            i
          );
        })(r, e ? e._root : null, n, [r.value]);
      }
      function Zd(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function Yd(t, e, n) {
        const r = ld(t),
          s = t.value;
        Nh(r, (t, r) => {
          Yd(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Gd(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      function Jd(t, e) {
        return null !== t && e && e(new Sh(t)), gc(!0);
      }
      function Xd(t, e) {
        return null !== t && e && e(new wh(t)), gc(!0);
      }
      function tp(t, e, n) {
        const r = e.routeConfig ? e.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? gc(
              r.map((r) =>
                Tc(() => {
                  const s = Zd(r, e, n);
                  let i;
                  if (
                    (function (t) {
                      return t && Ld(t.canActivate);
                    })(s)
                  )
                    i = Fh(s.canActivate(e, t));
                  else {
                    if (!Ld(s)) throw new Error("Invalid CanActivate guard");
                    i = Fh(s(e, t));
                  }
                  return i.pipe(nh());
                })
              )
            ).pipe(Fd())
          : gc(!0);
      }
      function ep(t, e, n) {
        const r = e[e.length - 1],
          s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              Tc(() =>
                gc(
                  e.guards.map((s) => {
                    const i = Zd(s, e.node, n);
                    let o;
                    if (
                      (function (t) {
                        return t && Ld(t.canActivateChild);
                      })(i)
                    )
                      o = Fh(i.canActivateChild(r, t));
                    else {
                      if (!Ld(i))
                        throw new Error("Invalid CanActivateChild guard");
                      o = Fh(i(r, t));
                    }
                    return o.pipe(nh());
                  })
                ).pipe(Fd())
              )
            );
        return gc(s).pipe(Fd());
      }
      class np {}
      class rp {
        constructor(t, e, n, r, s, i) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          try {
            const t = op(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              e = this.processSegmentGroup(this.config, t, kh),
              n = new pd(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                kh,
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              r = new ad(n, e),
              s = new fd(this.url, r);
            return this.inheritParamsAndData(s._root), gc(s);
          } catch (t) {
            return new _((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = dd(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = $h(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              t.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    r = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${r}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(n),
            n.sort((t, e) =>
              t.value.outlet === kh
                ? -1
                : e.value.outlet === kh
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, r) {
          for (const i of t)
            try {
              return this.processSegmentAgainstRoute(i, e, n, r);
            } catch (s) {
              if (!(s instanceof np)) throw s;
            }
          if (this.noLeftoversInUrl(e, n, r)) return [];
          throw new np();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo) throw new np();
          if ((t.outlet || kh) !== r) throw new np();
          let s,
            i = [],
            o = [];
          if ("**" === t.path) {
            const i = n.length > 0 ? Dh(n).parameters : {};
            s = new pd(
              n,
              i,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              up(t),
              r,
              t.component,
              t,
              sp(e),
              ip(e) + n.length,
              cp(t)
            );
          } else {
            const a = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new np();
                return {
                  consumedSegments: [],
                  lastChild: 0,
                  parameters: {},
                };
              }
              const r = (e.matcher || Oh)(n, t, e);
              if (!r) throw new np();
              const s = {};
              Nh(r.posParams, (t, e) => {
                s[e] = t.path;
              });
              const i =
                r.consumed.length > 0
                  ? Object.assign(
                      Object.assign({}, s),
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: i,
              };
            })(e, t, n);
            (i = a.consumedSegments),
              (o = n.slice(a.lastChild)),
              (s = new pd(
                i,
                a.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                up(t),
                r,
                t.component,
                t,
                sp(e),
                ip(e) + i.length,
                cp(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: u } = op(
              e,
              i,
              o,
              a,
              this.relativeLinkResolution
            );
          if (0 === u.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return [new ad(s, t)];
          }
          if (0 === a.length && 0 === u.length) return [new ad(s, [])];
          const c = this.processSegment(a, l, u, kh);
          return [new ad(s, c)];
        }
      }
      function sp(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function ip(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function op(t, e, n, r, s) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => ap(t, e, n) && lp(n) !== kh);
          })(t, n, r)
        ) {
          const s = new Uh(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const i of n)
                if ("" === i.path && lp(i) !== kh) {
                  const n = new Uh([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[lp(i)] = n);
                }
              return s;
            })(t, e, r, new Uh(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            {
              segmentGroup: s,
              slicedSegments: [],
            }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => ap(t, e, n));
          })(t, n, r)
        ) {
          const i = new Uh(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {};
              for (const a of r)
                if (ap(t, n, a) && !s[lp(a)]) {
                  const n = new Uh([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === i ? t.segments.length : e.length),
                    (o[lp(a)] = n);
                }
              return Object.assign(Object.assign({}, s), o);
            })(t, e, n, r, t.children, s)
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            {
              segmentGroup: i,
              slicedSegments: n,
            }
          );
        }
        const i = new Uh(t.segments, t.children);
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          {
            segmentGroup: i,
            slicedSegments: n,
          }
        );
      }
      function ap(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function lp(t) {
        return t.outlet || kh;
      }
      function up(t) {
        return t.data || {};
      }
      function cp(t) {
        return t.resolve || {};
      }
      function hp(t) {
        return function (e) {
          return e.pipe(
            Hc((e) => {
              const n = t(e);
              return n ? F(n).pipe(k(() => e)) : F([e]);
            })
          );
        };
      }
      class dp extends class {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      } {}
      let pp = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = me({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && Co(0, "router-outlet");
            },
            directives: function () {
              return [Tp];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function fp(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          mp(r, gp(e, r));
        }
      }
      function mp(t, e) {
        if (!t)
          throw new Error(
            `\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(t))
          throw new Error(
            `Invalid configuration of route '${e}': Array cannot be specified`
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          t.outlet !== kh
        )
          throw new Error(
            `Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (t.redirectTo && t.children)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and children cannot be used together`
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
          );
        if (t.children && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': children and loadChildren cannot be used together`
          );
        if (t.redirectTo && t.component)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and component cannot be used together`
          );
        if (t.path && t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': path and matcher cannot be used together`
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${e}': path cannot start with a slash`
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
          );
        t.children && fp(t.children, e);
      }
      function gp(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? t + "/"
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function yp(t) {
        const e = t.children && t.children.map(yp),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== kh &&
            (n.component = pp),
          n
        );
      }
      const _p = new Ut("ROUTES");
      class vp {
        constructor(t, e, n, r) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              k((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const r = n.create(t);
                return new Pd(Lh(r.injector.get(_p)).map(yp), r);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? F(this.loader.load(t))
            : Fh(t()).pipe(
                V((t) =>
                  t instanceof ne
                    ? gc(t)
                    : F(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class bp {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new wp()),
            (this.attachRef = null);
        }
      }
      class wp {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new bp()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      class xp {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function Sp(t) {
        throw t;
      }
      function Ep(t, e, n) {
        return e.parse("/");
      }
      function Cp(t, e) {
        return gc(null);
      }
      let kp = (() => {
          class t {
            constructor(t, e, n, r, s, i, o, a) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.lastLocationChangeInfo = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new S()),
                (this.errorHandler = Sp),
                (this.malformedUriErrorHandler = Ep),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: Cp,
                  afterPreactivation: Cp,
                }),
                (this.urlHandlingStrategy = new xp()),
                (this.routeReuseStrategy = new dp()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "legacy"),
                (this.ngModule = s.get(ee)),
                (this.console = s.get(gl));
              const l = s.get(Il);
              (this.isNgZoneEnabled = l instanceof Il),
                this.resetConfig(a),
                (this.currentUrlTree = new Mh(new Uh([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new vp(
                  i,
                  o,
                  (t) => this.triggerEvent(new vh(t)),
                  (t) => this.triggerEvent(new bh(t))
                )),
                (this.routerState = cd(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new yc({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                Ic((t) => 0 !== t.id),
                k((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                Hc((t) => {
                  let n = !1,
                    r = !1;
                  return gc(t).pipe(
                    sh((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    Hc((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return gc(t).pipe(
                          Hc((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new ch(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue() ? Cc : [t]
                            );
                          }),
                          Hc((t) => Promise.resolve(t)),
                          ((r = this.ngModule.injector),
                          (s = this.configLoader),
                          (i = this.urlSerializer),
                          (o = this.config),
                          function (t) {
                            return t.pipe(
                              Hc((t) =>
                                (function (t, e, n, r, s) {
                                  return new $d(t, e, n, r, s).apply();
                                })(r, s, i, t.extractedUrl, o).pipe(
                                  k((e) =>
                                    Object.assign(Object.assign({}, t), {
                                      urlAfterRedirects: e,
                                    })
                                  )
                                )
                              )
                            );
                          }),
                          sh((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, s) {
                            return function (i) {
                              return i.pipe(
                                V((i) =>
                                  (function (
                                    t,
                                    e,
                                    n,
                                    r,
                                    s = "emptyOnly",
                                    i = "legacy"
                                  ) {
                                    return new rp(t, e, n, r, s, i).recognize();
                                  })(
                                    t,
                                    e,
                                    i.urlAfterRedirects,
                                    n(i.urlAfterRedirects),
                                    r,
                                    s
                                  ).pipe(
                                    k((t) =>
                                      Object.assign(Object.assign({}, i), {
                                        targetSnapshot: t,
                                      })
                                    )
                                  )
                                )
                              );
                            };
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          sh((t) => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects));
                          }),
                          sh((t) => {
                            const n = new fh(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      var r, s, i, o;
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: i,
                            extras: o,
                          } = t,
                          a = new ch(n, this.serializeUrl(r), s, i);
                        e.next(a);
                        const l = cd(r, this.rootComponentType).snapshot;
                        return gc(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, o), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        Cc
                      );
                    }),
                    hp((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    sh((t) => {
                      const e = new mh(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    k((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: Kd(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          V((n) => {
                            const {
                              targetSnapshot: r,
                              currentSnapshot: s,
                              guards: {
                                canActivateChecks: i,
                                canDeactivateChecks: o,
                              },
                            } = n;
                            return 0 === o.length && 0 === i.length
                              ? gc(
                                  Object.assign(Object.assign({}, n), {
                                    guardsResult: !0,
                                  })
                                )
                              : (function (t, e, n, r) {
                                  return F(t).pipe(
                                    V((t) =>
                                      (function (t, e, n, r, s) {
                                        const i =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        return i && 0 !== i.length
                                          ? gc(
                                              i.map((i) => {
                                                const o = Zd(i, e, s);
                                                let a;
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && Ld(t.canDeactivate)
                                                    );
                                                  })(o)
                                                )
                                                  a = Fh(
                                                    o.canDeactivate(t, e, n, r)
                                                  );
                                                else {
                                                  if (!Ld(o))
                                                    throw new Error(
                                                      "Invalid CanDeactivate guard"
                                                    );
                                                  a = Fh(o(t, e, n, r));
                                                }
                                                return a.pipe(nh());
                                              })
                                            ).pipe(Fd())
                                          : gc(!0);
                                      })(t.component, t.route, n, e, r)
                                    ),
                                    nh((t) => !0 !== t, !0)
                                  );
                                })(o, r, s, t).pipe(
                                  V((n) =>
                                    n && "boolean" == typeof n
                                      ? (function (t, e, n, r) {
                                          return F(e).pipe(
                                            eh((e) =>
                                              F([
                                                Xd(e.route.parent, r),
                                                Jd(e.route, r),
                                                ep(t, e.path, n),
                                                tp(t, e.route, n),
                                              ]).pipe(
                                                Ac(),
                                                nh((t) => !0 !== t, !0)
                                              )
                                            ),
                                            nh((t) => !0 !== t, !0)
                                          );
                                        })(r, i, t, e)
                                      : gc(n)
                                  ),
                                  k((t) =>
                                    Object.assign(Object.assign({}, n), {
                                      guardsResult: t,
                                    })
                                  )
                                );
                          })
                        );
                      };
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    sh((t) => {
                      if (Dd(t.guardsResult)) {
                        const e = Ih(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                    }),
                    sh((t) => {
                      const e = new gh(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    Ic((t) => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new dh(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return e.next(n), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    hp((t) => {
                      if (t.guards.canActivateChecks.length)
                        return gc(t).pipe(
                          sh((t) => {
                            const e = new yh(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          Hc((t) => {
                            let n = !1;
                            return gc(t).pipe(
                              ((r = this.paramsInheritanceStrategy),
                              (s = this.ngModule.injector),
                              function (t) {
                                return t.pipe(
                                  V((t) => {
                                    const {
                                      targetSnapshot: e,
                                      guards: { canActivateChecks: n },
                                    } = t;
                                    if (!n.length) return gc(t);
                                    let i = 0;
                                    return F(n).pipe(
                                      eh((t) =>
                                        (function (t, e, n, r) {
                                          return (function (t, e, n, r) {
                                            const s = Object.keys(t);
                                            if (0 === s.length) return gc({});
                                            const i = {};
                                            return F(s).pipe(
                                              V((s) =>
                                                (function (t, e, n, r) {
                                                  const s = Zd(t, e, r);
                                                  return Fh(
                                                    s.resolve
                                                      ? s.resolve(e, n)
                                                      : s(e, n)
                                                  );
                                                })(t[s], e, n, r).pipe(
                                                  sh((t) => {
                                                    i[s] = t;
                                                  })
                                                )
                                              ),
                                              Lc(1),
                                              V(() =>
                                                Object.keys(i).length ===
                                                s.length
                                                  ? gc(i)
                                                  : Cc
                                              )
                                            );
                                          })(t._resolve, t, e, r).pipe(
                                            k(
                                              (e) => (
                                                (t._resolvedData = e),
                                                (t.data = Object.assign(
                                                  Object.assign({}, t.data),
                                                  dd(t, n).resolve
                                                )),
                                                null
                                              )
                                            )
                                          );
                                        })(t.route, e, r, s)
                                      ),
                                      sh(() => i++),
                                      Lc(1),
                                      V((e) => (i === n.length ? gc(t) : Cc))
                                    );
                                  })
                                );
                              }),
                              sh({
                                next: () => (n = !0),
                                complete: () => {
                                  if (!n) {
                                    const n = new dh(
                                      t.id,
                                      this.serializeUrl(t.extractedUrl),
                                      "At least one route resolver didn't emit any value."
                                    );
                                    e.next(n), t.resolve(!1);
                                  }
                                },
                              })
                            );
                            var r, s;
                          }),
                          sh((t) => {
                            const e = new _h(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                    }),
                    hp((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    k((t) => {
                      const e = (function (t, e, n) {
                        const r = (function t(e, n, r) {
                          if (
                            r &&
                            e.shouldReuseRoute(n.value, r.value.snapshot)
                          ) {
                            const s = r.value;
                            s._futureSnapshot = n.value;
                            const i = (function (e, n, r) {
                              return n.children.map((n) => {
                                for (const s of r.children)
                                  if (
                                    e.shouldReuseRoute(
                                      s.value.snapshot,
                                      n.value
                                    )
                                  )
                                    return t(e, n, s);
                                return t(e, n);
                              });
                            })(e, n, r);
                            return new ad(s, i);
                          }
                          {
                            const r = e.retrieve(n.value);
                            if (r) {
                              const t = r.route;
                              return (
                                (function t(e, n) {
                                  if (
                                    e.value.routeConfig !== n.value.routeConfig
                                  )
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                    );
                                  if (e.children.length !== n.children.length)
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                    );
                                  n.value._futureSnapshot = e.value;
                                  for (let r = 0; r < e.children.length; ++r)
                                    t(e.children[r], n.children[r]);
                                })(n, t),
                                t
                              );
                            }
                            {
                              const r = new hd(
                                  new yc((s = n.value).url),
                                  new yc(s.params),
                                  new yc(s.queryParams),
                                  new yc(s.fragment),
                                  new yc(s.data),
                                  s.outlet,
                                  s.component,
                                  s
                                ),
                                i = n.children.map((n) => t(e, n));
                              return new ad(r, i);
                            }
                          }
                          var s;
                        })(t, e._root, n ? n._root : void 0);
                        return new ud(r, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    sh((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((i = this.rootContexts),
                    (o = this.routeReuseStrategy),
                    (a = (t) => this.triggerEvent(t)),
                    k(
                      (t) => (
                        new Od(
                          o,
                          t.targetRouterState,
                          t.currentRouterState,
                          a
                        ).activate(i),
                        t
                      )
                    )),
                    sh({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ((s = () => {
                      if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new dh(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        );
                        e.next(n), t.resolve(!1);
                      }
                      this.currentNavigation = null;
                    }),
                    (t) => t.lift(new ah(s))),
                    Jc((n) => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = Dd(n.url);
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const s = new dh(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                return this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const r = new ph(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(r);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (i) {
                          t.reject(i);
                        }
                      }
                      var s;
                      return Cc;
                    })
                  );
                  var s, i, o, a;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  const e = this.extractLocationChangeInfoFromEvent(t);
                  this.shouldScheduleNavigation(
                    this.lastLocationChangeInfo,
                    e
                  ) &&
                    setTimeout(() => {
                      const { source: t, state: n, urlTree: r } = e,
                        s = { replaceUrl: !0 };
                      if (n) {
                        const t = Object.assign({}, n);
                        delete t.navigationId,
                          0 !== Object.keys(t).length && (s.state = t);
                      }
                      this.scheduleNavigation(r, t, n, s);
                    }, 0),
                    (this.lastLocationChangeInfo = e);
                }));
            }
            extractLocationChangeInfoFromEvent(t) {
              var e;
              return {
                source: "popstate" === t.type ? "popstate" : "hashchange",
                urlTree: this.parseUrl(t.url),
                state: (
                  null === (e = t.state) || void 0 === e
                    ? void 0
                    : e.navigationId
                )
                  ? t.state
                  : null,
                transitionId: this.getTransition().id,
              };
            }
            shouldScheduleNavigation(t, e) {
              if (!t) return !0;
              const n = e.urlTree.toString() === t.urlTree.toString();
              return !(
                e.transitionId === t.transitionId &&
                n &&
                (("hashchange" === e.source && "popstate" === t.source) ||
                  ("popstate" === e.source && "hashchange" === t.source))
              );
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              fp(t),
                (this.config = t.map(yp)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0));
            }
            createUrlTree(t, e = {}) {
              const {
                relativeTo: n,
                queryParams: r,
                fragment: s,
                preserveQueryParams: i,
                queryParamsHandling: o,
                preserveFragment: a,
              } = e;
              kr() &&
                i &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                );
              const l = n || this.routerState.root,
                u = a ? this.currentUrlTree.fragment : s;
              let c = null;
              if (o)
                switch (o) {
                  case "merge":
                    c = Object.assign(
                      Object.assign({}, this.currentUrlTree.queryParams),
                      r
                    );
                    break;
                  case "preserve":
                    c = this.currentUrlTree.queryParams;
                    break;
                  default:
                    c = r || null;
                }
              else c = i ? this.currentUrlTree.queryParams : r || null;
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                (function (t, e, n, r, s) {
                  if (0 === n.length) return bd(e.root, e.root, e, r, s);
                  const i = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new wd(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const r = t.reduce((t, r, s) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {};
                          return (
                            Nh(r.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (r.segmentPath) return [...t, r.segmentPath];
                      }
                      return "string" != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split("/").forEach((r, s) => {
                            (0 == s && "." === r) ||
                              (0 == s && "" === r
                                ? (n = !0)
                                : ".." === r
                                ? e++
                                : "" != r && t.push(r));
                          }),
                          t)
                        : [...t, r];
                    }, []);
                    return new wd(n, e, r);
                  })(n);
                  if (i.toRoot()) return bd(e.root, new Uh([], {}), e, r, s);
                  const o = (function (t, e, n) {
                      if (t.isAbsolute) return new xd(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment;
                        return new xd(t, t === e.root, 0);
                      }
                      const r = vd(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let r = t,
                          s = e,
                          i = n;
                        for (; i > s; ) {
                          if (((i -= s), (r = r.parent), !r))
                            throw new Error("Invalid number of '../'");
                          s = r.segments.length;
                        }
                        return new xd(r, !1, s - i);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots
                      );
                    })(i, e, t),
                    a = o.processChildren
                      ? Cd(o.segmentGroup, o.index, i.commands)
                      : Ed(o.segmentGroup, o.index, i.commands);
                  return bd(o.segmentGroup, a, e, r, s);
                })(l, this.currentUrlTree, t, c, u)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              kr() &&
                this.isNgZoneEnabled &&
                !Il.isInAngularZone() &&
                this.console.warn(
                  "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
                );
              const n = Dd(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              if (Dd(t)) return jh(this.currentUrlTree, t, e);
              const n = this.parseUrl(t);
              return jh(this.currentUrlTree, n, e);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new hh(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn("Unhandled Navigation Error: ");
                }
              );
            }
            scheduleNavigation(t, e, n, r, s) {
              const i = this.getTransition(),
                o =
                  "imperative" !== e &&
                  "imperative" === (null == i ? void 0 : i.source),
                a =
                  (this.lastSuccessfulId === i.id || this.currentNavigation
                    ? i.rawUrl
                    : i.urlAfterRedirects
                  ).toString() === t.toString();
              if (o && a) return Promise.resolve(!0);
              let l, u, c;
              s
                ? ((l = s.resolve), (u = s.reject), (c = s.promise))
                : (c = new Promise((t, e) => {
                    (l = t), (u = e);
                  }));
              const h = ++this.navigationId;
              return (
                this.setTransition({
                  id: h,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: l,
                  reject: u,
                  promise: c,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                c.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e, n, r) {
              const s = this.urlSerializer.serialize(t);
              (r = r || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    );
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Zt(Ui),
                Zt(Hh),
                Zt(wp),
                Zt(wu),
                Zt(to),
                Zt(Zl),
                Zt(kl),
                Zt(void 0)
              );
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Tp = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.parentContexts = t),
                (this.location = e),
                (this.resolver = n),
                (this.changeDetector = s),
                (this.activated = null),
                (this._activatedRoute = null),
                (this.activateEvents = new Wa()),
                (this.deactivateEvents = new Wa()),
                (this.name = r || kh),
                t.onChildOutletCreated(this.name, this);
            }
            ngOnDestroy() {
              this.parentContexts.onChildOutletDestroyed(this.name);
            }
            ngOnInit() {
              if (!this.activated) {
                const t = this.parentContexts.getContext(this.name);
                t &&
                  t.route &&
                  (t.attachRef
                    ? this.attach(t.attachRef, t.route)
                    : this.activateWith(t.route, t.resolver || null));
              }
            }
            get isActivated() {
              return !!this.activated;
            }
            get component() {
              if (!this.activated) throw new Error("Outlet is not activated");
              return this.activated.instance;
            }
            get activatedRoute() {
              if (!this.activated) throw new Error("Outlet is not activated");
              return this._activatedRoute;
            }
            get activatedRouteData() {
              return this._activatedRoute
                ? this._activatedRoute.snapshot.data
                : {};
            }
            detach() {
              if (!this.activated) throw new Error("Outlet is not activated");
              this.location.detach();
              const t = this.activated;
              return (this.activated = null), (this._activatedRoute = null), t;
            }
            attach(t, e) {
              (this.activated = t),
                (this._activatedRoute = e),
                this.location.insert(t.hostView);
            }
            deactivate() {
              if (this.activated) {
                const t = this.component;
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t);
              }
            }
            activateWith(t, e) {
              if (this.isActivated)
                throw new Error("Cannot activate an already activated outlet");
              this._activatedRoute = t;
              const n = (e = e || this.resolver).resolveComponentFactory(
                  t._futureSnapshot.routeConfig.component
                ),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                s = new Ap(t, r, this.location.injector);
              (this.activated = this.location.createComponent(
                n,
                this.location.length,
                s
              )),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(wp), vo(ka), vo(Xo), bo("name"), vo(ji));
            }),
            (t.ɵdir = we({
              type: t,
              selectors: [["router-outlet"]],
              outputs: {
                activateEvents: "activate",
                deactivateEvents: "deactivate",
              },
              exportAs: ["outlet"],
            })),
            t
          );
        })();
      class Ap {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === hd
            ? this.route
            : t === wp
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class Ip {}
      class Op {
        preload(t, e) {
          return gc(null);
        }
      }
      let Rp = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new vp(
                  e,
                  n,
                  (e) => t.triggerEvent(new vh(e)),
                  (e) => t.triggerEvent(new bh(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Ic((t) => t instanceof hh),
                  eh(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(ee);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children));
              return F(n).pipe(
                H(),
                k((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    V(
                      (t) => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      )
                    )
                  )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(kp), Zt(Zl), Zt(kl), Zt(to), Zt(Ip));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Pp = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof ch
                  ? ((this.store[
                      this.lastId
                    ] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof hh &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Ch &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new Ch(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(kp), Zt(ju), Zt(void 0));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Lp = new Ut("ROUTER_CONFIGURATION"),
        Dp = new Ut("ROUTER_FORROOT_GUARD"),
        Np = [
          wu,
          { provide: Hh, useClass: zh },
          {
            provide: kp,
            useFactory: function (t, e, n, r, s, i, o, a = {}, l, u) {
              const c = new kp(null, t, e, n, r, s, i, Lh(o));
              if (
                (l && (c.urlHandlingStrategy = l),
                u && (c.routeReuseStrategy = u),
                a.errorHandler && (c.errorHandler = a.errorHandler),
                a.malformedUriErrorHandler &&
                  (c.malformedUriErrorHandler = a.malformedUriErrorHandler),
                a.enableTracing)
              ) {
                const t = iu();
                c.events.subscribe((e) => {
                  t.logGroup("Router Event: " + e.constructor.name),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return (
                a.onSameUrlNavigation &&
                  (c.onSameUrlNavigation = a.onSameUrlNavigation),
                a.paramsInheritanceStrategy &&
                  (c.paramsInheritanceStrategy = a.paramsInheritanceStrategy),
                a.urlUpdateStrategy &&
                  (c.urlUpdateStrategy = a.urlUpdateStrategy),
                a.relativeLinkResolution &&
                  (c.relativeLinkResolution = a.relativeLinkResolution),
                c
              );
            },
            deps: [
              Hh,
              wp,
              wu,
              to,
              Zl,
              kl,
              _p,
              Lp,
              [class {}, new it()],
              [class {}, new it()],
            ],
          },
          wp,
          {
            provide: hd,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [kp],
          },
          { provide: Zl, useClass: Xl },
          Rp,
          Op,
          class {
            preload(t, e) {
              return e().pipe(Jc(() => gc(null)));
            }
          },
          { provide: Lp, useValue: { enableTracing: !1 } },
        ];
      function Fp() {
        return new Hl("Router", kp);
      }
      let jp = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                Np,
                Bp(e),
                {
                  provide: Dp,
                  useFactory: Vp,
                  deps: [[kp, new it(), new at()]],
                },
                { provide: Lp, useValue: n || {} },
                {
                  provide: gu,
                  useFactory: Up,
                  deps: [au, [new st(_u), new it()], Lp],
                },
                { provide: Pp, useFactory: Mp, deps: [kp, ju, Lp] },
                {
                  provide: Ip,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : Op,
                },
                { provide: Hl, multi: !0, useFactory: Fp },
                [
                  $p,
                  {
                    provide: ll,
                    multi: !0,
                    useFactory: Hp,
                    deps: [$p],
                  },
                  { provide: qp, useFactory: zp, deps: [$p] },
                  { provide: ml, multi: !0, useExisting: qp },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [Bp(e)] };
          }
        }
        return (
          (t.ɵmod = ve({ type: t })),
          (t.ɵinj = dt({
            factory: function (e) {
              return new (e || t)(Zt(Dp, 8), Zt(kp, 8));
            },
          })),
          t
        );
      })();
      function Mp(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Pp(t, e, n);
      }
      function Up(t, e, n = {}) {
        return n.useHash ? new bu(t, e) : new vu(t, e);
      }
      function Vp(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function Bp(t) {
        return [
          { provide: eo, multi: !0, useValue: t },
          { provide: _p, multi: !0, useValue: t },
        ];
      }
      let $p = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new S());
          }
          appInitializer() {
            return this.injector.get(uu, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(kp),
                r = this.injector.get(Lp);
              if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) t(!0);
              else if ("disabled" === r.initialNavigation)
                n.setUpLocationChangeListener(), t(!0);
              else {
                if ("enabled" !== r.initialNavigation)
                  throw new Error(
                    `Invalid initialNavigation options: '${r.initialNavigation}'`
                  );
                (n.hooks.afterPreactivation = () =>
                  this.initNavigation
                    ? gc(null)
                    : ((this.initNavigation = !0),
                      t(!0),
                      this.resultOfPreactivationDone)),
                  n.initialNavigation();
              }
              return e;
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(Lp),
              n = this.injector.get(Rp),
              r = this.injector.get(Pp),
              s = this.injector.get(kp),
              i = this.injector.get(Gl);
            t === i.components[0] &&
              (this.isLegacyEnabled(e)
                ? s.initialNavigation()
                : this.isLegacyDisabled(e) && s.setUpLocationChangeListener(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          isLegacyEnabled(t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }
          isLegacyDisabled(t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(to));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Hp(t) {
        return t.appInitializer.bind(t);
      }
      function zp(t) {
        return t.bootstrapListener.bind(t);
      }
      const qp = new Ut("Router Initializer"),
        Qp = [];
      let Wp = (() => {
        class t {}
        return (
          (t.ɵmod = ve({ type: t })),
          (t.ɵinj = dt({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[jp.forRoot(Qp)], jp],
          })),
          t
        );
      })();
      class Gp extends h {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class Kp extends Gp {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            r = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(r, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n = !1,
            r = void 0;
          try {
            this.work(t);
          } catch (s) {
            (n = !0), (r = (!!s && s) || new Error(s));
          }
          if (n) return this.unsubscribe(), r;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            r = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== r && n.splice(r, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
      let Zp = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class Yp extends Zp {
        constructor(t, e = Zp.now) {
          super(t, () =>
            Yp.delegate && Yp.delegate !== this ? Yp.delegate.now() : e()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return Yp.delegate && Yp.delegate !== this
            ? Yp.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      function Jp(t, e, n, s) {
        return (
          r(n) && ((s = n), (n = void 0)),
          s
            ? Jp(t, e, n).pipe(k((t) => (l(t) ? s(...t) : s(t))))
            : new _((r) => {
                !(function t(e, n, r, s, i) {
                  let o;
                  if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addEventListener &&
                        "function" == typeof t.removeEventListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addEventListener(n, r, i),
                      (o = () => t.removeEventListener(n, r, i));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.on &&
                        "function" == typeof t.off
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.on(n, r), (o = () => t.off(n, r));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addListener &&
                        "function" == typeof t.removeListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addListener(n, r), (o = () => t.removeListener(n, r));
                  } else {
                    if (!e || !e.length)
                      throw new TypeError("Invalid event target");
                    for (let o = 0, a = e.length; o < a; o++)
                      t(e[o], n, r, s, i);
                  }
                  s.add(o);
                })(
                  t,
                  e,
                  function (t) {
                    r.next(
                      arguments.length > 1
                        ? Array.prototype.slice.call(arguments)
                        : t
                    );
                  },
                  r,
                  n
                );
              })
        );
      }
      const Xp = new Yp(Kp);
      function tf(t) {
        return (e) => e.lift(new ef(t));
      }
      class ef {
        constructor(t) {
          this.notifier = t;
        }
        call(t, e) {
          const n = new nf(t),
            r = U(this.notifier, new j(n));
          return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n;
        }
      }
      class nf extends M {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext() {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      const rf = {
          provide: ml,
          useFactory: function (t, e) {
            return () => {
              if (Nu(e)) {
                const e = Array.from(t.querySelectorAll(`[class*=${sf}]`)),
                  n = /\bflex-layout-.+?\b/g;
                e.forEach((t) => {
                  t.classList.contains(sf + "ssr") && t.parentNode
                    ? t.parentNode.removeChild(t)
                    : t.className.replace(n, "");
                });
              }
            };
          },
          deps: [ou, fl],
          multi: !0,
        },
        sf = "flex-layout-";
      let of = (() => {
        class t {}
        return (
          (t.ɵmod = ve({ type: t })),
          (t.ɵinj = dt({
            factory: function (e) {
              return new (e || t)();
            },
            providers: [rf],
          })),
          t
        );
      })();
      class af {
        constructor(t = !1, e = "all", n = "", r = "", s = 0) {
          (this.matches = t),
            (this.mediaQuery = e),
            (this.mqAlias = n),
            (this.suffix = r),
            (this.priority = s),
            (this.property = "");
        }
        clone() {
          return new af(
            this.matches,
            this.mediaQuery,
            this.mqAlias,
            this.suffix
          );
        }
      }
      let lf = (() => {
        class t {
          constructor() {
            this.stylesheet = new Map();
          }
          addStyleToElement(t, e, n) {
            const r = this.stylesheet.get(t);
            r ? r.set(e, n) : this.stylesheet.set(t, new Map([[e, n]]));
          }
          clearStyles() {
            this.stylesheet.clear();
          }
          getStyleForElement(t, e) {
            const n = this.stylesheet.get(t);
            let r = "";
            if (n) {
              const t = n.get(e);
              ("number" != typeof t && "string" != typeof t) || (r = t + "");
            }
            return r;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ht({
            factory: function () {
              return new t();
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      const uf = {
          addFlexToParent: !0,
          addOrientationBps: !1,
          disableDefaultBps: !1,
          disableVendorPrefixes: !1,
          serverLoaded: !1,
          useColumnBasisZero: !0,
          printWithBreakpoints: [],
          mediaTriggerAutoRestore: !0,
          ssrObserveBreakpoints: [],
        },
        cf = new Ut("Flex Layout token, config options for the library", {
          providedIn: "root",
          factory: () => uf,
        }),
        hf = new Ut("FlexLayoutServerLoaded", {
          providedIn: "root",
          factory: () => !1,
        }),
        df = new Ut(
          "Flex Layout token, collect all breakpoints into one provider",
          { providedIn: "root", factory: () => null }
        );
      function pf(t, e) {
        return (
          (t = t ? t.clone() : new af()),
          e &&
            ((t.mqAlias = e.alias),
            (t.mediaQuery = e.mediaQuery),
            (t.suffix = e.suffix),
            (t.priority = e.priority)),
          t
        );
      }
      const ff = "inline",
        mf = ["row", "column", "row-reverse", "column-reverse"];
      function gf(t) {
        if (t)
          switch (t.toLowerCase()) {
            case "reverse":
            case "wrap-reverse":
            case "reverse-wrap":
              t = "wrap-reverse";
              break;
            case "no":
            case "none":
            case "nowrap":
              t = "nowrap";
              break;
            default:
              t = "wrap";
          }
        return t;
      }
      let yf = (() => {
        class t {
          constructor(t, e, n, r) {
            (this.elementRef = t),
              (this.styleBuilder = e),
              (this.styler = n),
              (this.marshal = r),
              (this.DIRECTIVE_KEY = ""),
              (this.inputs = []),
              (this.mru = {}),
              (this.destroySubject = new S()),
              (this.styleCache = new Map());
          }
          get parentElement() {
            return this.elementRef.nativeElement.parentElement;
          }
          get nativeElement() {
            return this.elementRef.nativeElement;
          }
          get activatedValue() {
            return this.marshal.getValue(
              this.nativeElement,
              this.DIRECTIVE_KEY
            );
          }
          set activatedValue(t) {
            this.marshal.setValue(
              this.nativeElement,
              this.DIRECTIVE_KEY,
              t,
              this.marshal.activatedAlias
            );
          }
          ngOnChanges(t) {
            Object.keys(t).forEach((e) => {
              if (-1 !== this.inputs.indexOf(e)) {
                const n = e.split(".").slice(1).join(".");
                this.setValue(t[e].currentValue, n);
              }
            });
          }
          ngOnDestroy() {
            this.destroySubject.next(),
              this.destroySubject.complete(),
              this.marshal.releaseElement(this.nativeElement);
          }
          init(t = []) {
            this.marshal.init(
              this.elementRef.nativeElement,
              this.DIRECTIVE_KEY,
              this.updateWithValue.bind(this),
              this.clearStyles.bind(this),
              t
            );
          }
          addStyles(t, e) {
            const n = this.styleBuilder,
              r = n.shouldCache;
            let s = this.styleCache.get(t);
            (s && r) ||
              ((s = n.buildStyles(t, e)), r && this.styleCache.set(t, s)),
              (this.mru = Object.assign({}, s)),
              this.applyStyleToElement(s),
              n.sideEffect(t, s, e);
          }
          clearStyles() {
            Object.keys(this.mru).forEach((t) => {
              this.mru[t] = "";
            }),
              this.applyStyleToElement(this.mru),
              (this.mru = {});
          }
          triggerUpdate() {
            this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY);
          }
          getFlexFlowDirection(t, e = !1) {
            if (t) {
              const [n, r] = this.styler.getFlowDirection(t);
              if (!r && e) {
                const e = (function (t) {
                  let [e, n, r] = (function (t) {
                    t = t ? t.toLowerCase() : "";
                    let [e, n, r] = t.split(" ");
                    return (
                      mf.find((t) => t === e) || (e = mf[0]),
                      n === ff && ((n = r !== ff ? r : ""), (r = ff)),
                      [e, gf(n), !!r]
                    );
                  })(t);
                  return (function (t, e = null, n = !1) {
                    return {
                      display: n ? "inline-flex" : "flex",
                      "box-sizing": "border-box",
                      "flex-direction": t,
                      "flex-wrap": e || null,
                    };
                  })(e, n, r);
                })(n);
                this.styler.applyStyleToElements(e, [t]);
              }
              return n.trim();
            }
            return "row";
          }
          hasWrap(t) {
            return this.styler.hasWrap(t);
          }
          applyStyleToElement(t, e, n = this.nativeElement) {
            this.styler.applyStyleToElement(n, t, e);
          }
          setValue(t, e) {
            this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, t, e);
          }
          updateWithValue(t) {
            this.currentValue !== t &&
              (this.addStyles(t), (this.currentValue = t));
          }
        }
        return (
          (t.ɵfac = function (t) {
            !(function () {
              throw new Error("invalid");
            })();
          }),
          (t.ɵdir = we({ type: t, features: [Ne] })),
          t
        );
      })();
      const _f = [
          {
            alias: "xs",
            mediaQuery: "screen and (min-width: 0px) and (max-width: 599.9px)",
            priority: 1e3,
          },
          {
            alias: "sm",
            mediaQuery:
              "screen and (min-width: 600px) and (max-width: 959.9px)",
            priority: 900,
          },
          {
            alias: "md",
            mediaQuery:
              "screen and (min-width: 960px) and (max-width: 1279.9px)",
            priority: 800,
          },
          {
            alias: "lg",
            mediaQuery:
              "screen and (min-width: 1280px) and (max-width: 1919.9px)",
            priority: 700,
          },
          {
            alias: "xl",
            mediaQuery:
              "screen and (min-width: 1920px) and (max-width: 4999.9px)",
            priority: 600,
          },
          {
            alias: "lt-sm",
            overlapping: !0,
            mediaQuery: "screen and (max-width: 599.9px)",
            priority: 950,
          },
          {
            alias: "lt-md",
            overlapping: !0,
            mediaQuery: "screen and (max-width: 959.9px)",
            priority: 850,
          },
          {
            alias: "lt-lg",
            overlapping: !0,
            mediaQuery: "screen and (max-width: 1279.9px)",
            priority: 750,
          },
          {
            alias: "lt-xl",
            overlapping: !0,
            priority: 650,
            mediaQuery: "screen and (max-width: 1919.9px)",
          },
          {
            alias: "gt-xs",
            overlapping: !0,
            mediaQuery: "screen and (min-width: 600px)",
            priority: -950,
          },
          {
            alias: "gt-sm",
            overlapping: !0,
            mediaQuery: "screen and (min-width: 960px)",
            priority: -850,
          },
          {
            alias: "gt-md",
            overlapping: !0,
            mediaQuery: "screen and (min-width: 1280px)",
            priority: -750,
          },
          {
            alias: "gt-lg",
            overlapping: !0,
            mediaQuery: "screen and (min-width: 1920px)",
            priority: -650,
          },
        ],
        vf = "(orientation: portrait) and (max-width: 599.9px)",
        bf = "(orientation: landscape) and (max-width: 959.9px)",
        wf =
          "(orientation: portrait) and (min-width: 600px) and (max-width: 839.9px)",
        xf =
          "(orientation: landscape) and (min-width: 960px) and (max-width: 1279.9px)",
        Sf = "(orientation: portrait) and (min-width: 840px)",
        Ef = "(orientation: landscape) and (min-width: 1280px)",
        Cf = {
          HANDSET: `${vf}, ${bf}`,
          TABLET: `${wf} , ${xf}`,
          WEB: `${Sf}, ${Ef} `,
          HANDSET_PORTRAIT: "" + vf,
          TABLET_PORTRAIT: wf + " ",
          WEB_PORTRAIT: "" + Sf,
          HANDSET_LANDSCAPE: "" + bf,
          TABLET_LANDSCAPE: "" + xf,
          WEB_LANDSCAPE: "" + Ef,
        },
        kf = [
          {
            alias: "handset",
            priority: 2e3,
            mediaQuery: Cf.HANDSET,
          },
          {
            alias: "handset.landscape",
            priority: 2e3,
            mediaQuery: Cf.HANDSET_LANDSCAPE,
          },
          {
            alias: "handset.portrait",
            priority: 2e3,
            mediaQuery: Cf.HANDSET_PORTRAIT,
          },
          {
            alias: "tablet",
            priority: 2100,
            mediaQuery: Cf.TABLET,
          },
          {
            alias: "tablet.landscape",
            priority: 2100,
            mediaQuery: Cf.TABLET_LANDSCAPE,
          },
          {
            alias: "tablet.portrait",
            priority: 2100,
            mediaQuery: Cf.TABLET_PORTRAIT,
          },
          {
            alias: "web",
            priority: 2200,
            mediaQuery: Cf.WEB,
            overlapping: !0,
          },
          {
            alias: "web.landscape",
            priority: 2200,
            mediaQuery: Cf.WEB_LANDSCAPE,
            overlapping: !0,
          },
          {
            alias: "web.portrait",
            priority: 2200,
            mediaQuery: Cf.WEB_PORTRAIT,
            overlapping: !0,
          },
        ],
        Tf = /(\.|-|_)/g;
      function Af(t) {
        let e = t.length > 0 ? t.charAt(0) : "",
          n = t.length > 1 ? t.slice(1) : "";
        return e.toUpperCase() + n;
      }
      const If = new Ut("Token (@angular/flex-layout) Breakpoints", {
        providedIn: "root",
        factory: () => {
          const t = Yt(df),
            e = Yt(cf),
            n = [].concat.apply(
              [],
              (t || []).map((t) => (Array.isArray(t) ? t : [t]))
            );
          return (function (t, e = []) {
            const n = {};
            return (
              t.forEach((t) => {
                n[t.alias] = t;
              }),
              e.forEach((t) => {
                n[t.alias]
                  ? (function (t, ...e) {
                      if (null == t)
                        throw TypeError(
                          "Cannot convert undefined or null to object"
                        );
                      for (let n of e)
                        if (null != n)
                          for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
                    })(n[t.alias], t)
                  : (n[t.alias] = t);
              }),
              (r = Object.keys(n).map((t) => n[t])).forEach((t) => {
                t.suffix ||
                  ((t.suffix = t.alias
                    .replace(Tf, "|")
                    .split("|")
                    .map(Af)
                    .join("")),
                  (t.overlapping = !!t.overlapping));
              }),
              r
            );
            var r;
          })(
            (e.disableDefaultBps ? [] : _f).concat(
              e.addOrientationBps ? kf : []
            ),
            n
          );
        },
      });
      function Of(t, e) {
        return ((e && e.priority) || 0) - ((t && t.priority) || 0);
      }
      function Rf(t, e) {
        return (t.priority || 0) - (e.priority || 0);
      }
      let Pf = (() => {
          class t {
            constructor(t) {
              (this.findByMap = new Map()), (this.items = [...t].sort(Rf));
            }
            findByAlias(t) {
              return t ? this.findWithPredicate(t, (e) => e.alias == t) : null;
            }
            findByQuery(t) {
              return this.findWithPredicate(t, (e) => e.mediaQuery == t);
            }
            get overlappings() {
              return this.items.filter((t) => 1 == t.overlapping);
            }
            get aliases() {
              return this.items.map((t) => t.alias);
            }
            get suffixes() {
              return this.items.map((t) => (t.suffix ? t.suffix : ""));
            }
            findWithPredicate(t, e) {
              let n = this.findByMap.get(t);
              return (
                n ||
                  ((n = this.items.find(e) || null), this.findByMap.set(t, n)),
                n || null
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(If));
            }),
            (t.ɵprov = ht({
              factory: function () {
                return new t(Zt(If));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Lf = (() => {
          class t {
            constructor(t, e, n) {
              (this._zone = t),
                (this._platformId = e),
                (this._document = n),
                (this.source = new yc(new af(!0))),
                (this.registry = new Map()),
                (this.pendingRemoveListenerFns = []),
                (this._observable$ = this.source.asObservable());
            }
            get activations() {
              const t = [];
              return (
                this.registry.forEach((e, n) => {
                  e.matches && t.push(n);
                }),
                t
              );
            }
            isActive(t) {
              const e = this.registry.get(t);
              return e
                ? e.matches
                : this.registerQuery(t).some((t) => t.matches);
            }
            observe(t, e = !1) {
              if (t && t.length) {
                const n = this._observable$.pipe(
                  Ic((n) => !e || t.indexOf(n.mediaQuery) > -1)
                );
                return q(
                  new _((e) => {
                    const n = this.registerQuery(t);
                    if (n.length) {
                      const t = n.pop();
                      n.forEach((t) => {
                        e.next(t);
                      }),
                        this.source.next(t);
                    }
                    e.complete();
                  }),
                  n
                );
              }
              return this._observable$;
            }
            registerQuery(t) {
              const e = Array.isArray(t) ? t : [t],
                n = [];
              return (
                (function (t, e) {
                  const n = t.filter((t) => !Df[t]);
                  if (n.length > 0) {
                    const t = n.join(", ");
                    try {
                      const r = e.createElement("style");
                      r.setAttribute("type", "text/css"),
                        r.styleSheet ||
                          r.appendChild(
                            e.createTextNode(
                              `\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${t} {.fx-query-test{ }}\n`
                            )
                          ),
                        e.head.appendChild(r),
                        n.forEach((t) => (Df[t] = r));
                    } catch (r) {
                      console.error(r);
                    }
                  }
                })(e, this._document),
                e.forEach((t) => {
                  const e = (e) => {
                    this._zone.run(() =>
                      this.source.next(new af(e.matches, t))
                    );
                  };
                  let r = this.registry.get(t);
                  r ||
                    ((r = this.buildMQL(t)),
                    r.addListener(e),
                    this.pendingRemoveListenerFns.push(() =>
                      r.removeListener(e)
                    ),
                    this.registry.set(t, r)),
                    r.matches && n.push(new af(!0, t));
                }),
                n
              );
            }
            ngOnDestroy() {
              let t;
              for (; (t = this.pendingRemoveListenerFns.pop()); ) t();
            }
            buildMQL(t) {
              return (function (t, e) {
                return e && window.matchMedia("all").addListener
                  ? window.matchMedia(t)
                  : {
                      matches: "all" === t || "" === t,
                      media: t,
                      addListener: () => {},
                      removeListener: () => {},
                      onchange: null,
                      addEventListener() {},
                      removeEventListener() {},
                      dispatchEvent: () => !1,
                    };
              })(t, Nu(this._platformId));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(Il), Zt(fl), Zt(ou));
            }),
            (t.ɵprov = ht({
              factory: function () {
                return new t(Zt(Il), Zt(fl), Zt(ou));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      const Df = {},
        Nf = "print",
        Ff = { alias: Nf, mediaQuery: Nf, priority: 1e3 };
      let jf = (() => {
        class t {
          constructor(t, e, n) {
            (this.breakpoints = t),
              (this.layoutConfig = e),
              (this._document = n),
              (this.registeredBeforeAfterPrintHooks = !1),
              (this.isPrintingBeforeAfterEvent = !1),
              (this.beforePrintEventListeners = []),
              (this.afterPrintEventListeners = []),
              (this.isPrinting = !1),
              (this.queue = new Mf()),
              (this.deactivations = []);
          }
          withPrintQuery(t) {
            return [...t, Nf];
          }
          isPrintEvent(t) {
            return t.mediaQuery.startsWith(Nf);
          }
          get printAlias() {
            return this.layoutConfig.printWithBreakpoints || [];
          }
          get printBreakPoints() {
            return this.printAlias
              .map((t) => this.breakpoints.findByAlias(t))
              .filter((t) => null !== t);
          }
          getEventBreakpoints({ mediaQuery: t }) {
            const e = this.breakpoints.findByQuery(t);
            return (e
              ? [...this.printBreakPoints, e]
              : this.printBreakPoints
            ).sort(Of);
          }
          updateEvent(t) {
            let e = this.breakpoints.findByQuery(t.mediaQuery);
            return (
              this.isPrintEvent(t) &&
                ((e = this.getEventBreakpoints(t)[0]),
                (t.mediaQuery = e ? e.mediaQuery : "")),
              pf(t, e)
            );
          }
          registerBeforeAfterPrintHooks(t) {
            if (
              !this._document.defaultView ||
              this.registeredBeforeAfterPrintHooks
            )
              return;
            this.registeredBeforeAfterPrintHooks = !0;
            const e = () => {
                this.isPrinting ||
                  ((this.isPrintingBeforeAfterEvent = !0),
                  this.startPrinting(
                    t,
                    this.getEventBreakpoints(new af(!0, Nf))
                  ),
                  t.updateStyles());
              },
              n = () => {
                (this.isPrintingBeforeAfterEvent = !1),
                  this.isPrinting && (this.stopPrinting(t), t.updateStyles());
              };
            this._document.defaultView.addEventListener("beforeprint", e),
              this._document.defaultView.addEventListener("afterprint", n),
              this.beforePrintEventListeners.push(e),
              this.afterPrintEventListeners.push(n);
          }
          interceptEvents(t) {
            return (
              this.registerBeforeAfterPrintHooks(t),
              (e) => {
                this.isPrintEvent(e)
                  ? e.matches && !this.isPrinting
                    ? (this.startPrinting(t, this.getEventBreakpoints(e)),
                      t.updateStyles())
                    : e.matches ||
                      !this.isPrinting ||
                      this.isPrintingBeforeAfterEvent ||
                      (this.stopPrinting(t), t.updateStyles())
                  : this.collectActivations(e);
              }
            );
          }
          blockPropagation() {
            return (t) => !(this.isPrinting || this.isPrintEvent(t));
          }
          startPrinting(t, e) {
            (this.isPrinting = !0),
              (t.activatedBreakpoints = this.queue.addPrintBreakpoints(e));
          }
          stopPrinting(t) {
            (t.activatedBreakpoints = this.deactivations),
              (this.deactivations = []),
              this.queue.clear(),
              (this.isPrinting = !1);
          }
          collectActivations(t) {
            if (!this.isPrinting || this.isPrintingBeforeAfterEvent)
              if (t.matches)
                this.isPrintingBeforeAfterEvent || (this.deactivations = []);
              else {
                const e = this.breakpoints.findByQuery(t.mediaQuery);
                e && (this.deactivations.push(e), this.deactivations.sort(Of));
              }
          }
          ngOnDestroy() {
            this.beforePrintEventListeners.forEach((t) =>
              this._document.defaultView.removeEventListener("beforeprint", t)
            ),
              this.afterPrintEventListeners.forEach((t) =>
                this._document.defaultView.removeEventListener("afterprint", t)
              );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(Pf), Zt(cf), Zt(ou));
          }),
          (t.ɵprov = ht({
            factory: function () {
              return new t(Zt(Pf), Zt(cf), Zt(ou));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class Mf {
        constructor() {
          this.printBreakpoints = [];
        }
        addPrintBreakpoints(t) {
          return (
            t.push(Ff),
            t.sort(Of),
            t.forEach((t) => this.addBreakpoint(t)),
            this.printBreakpoints
          );
        }
        addBreakpoint(t) {
          t &&
            void 0 ===
              this.printBreakpoints.find(
                (e) => e.mediaQuery === t.mediaQuery
              ) &&
            (this.printBreakpoints = (function (t) {
              return !!t && t.mediaQuery.startsWith(Nf);
            })(t)
              ? [t, ...this.printBreakpoints]
              : [...this.printBreakpoints, t]);
        }
        clear() {
          this.printBreakpoints = [];
        }
      }
      function Uf(t) {
        for (let e in t) {
          let n = t[e] || "";
          switch (e) {
            case "display":
              t.display =
                "flex" === n
                  ? ["-webkit-flex", "flex"]
                  : "inline-flex" === n
                  ? ["-webkit-inline-flex", "inline-flex"]
                  : n;
              break;
            case "align-items":
            case "align-self":
            case "align-content":
            case "flex":
            case "flex-basis":
            case "flex-flow":
            case "flex-grow":
            case "flex-shrink":
            case "flex-wrap":
            case "justify-content":
              t["-webkit-" + e] = n;
              break;
            case "flex-direction":
              (n = n || "row"),
                (t["-webkit-flex-direction"] = n),
                (t["flex-direction"] = n);
              break;
            case "order":
              t.order = t["-webkit-" + e] = isNaN(+n) ? "0" : n;
          }
        }
        return t;
      }
      let Vf = (() => {
        class t {
          constructor(t, e, n, r) {
            (this._serverStylesheet = t),
              (this._serverModuleLoaded = e),
              (this._platformId = n),
              (this.layoutConfig = r);
          }
          applyStyleToElement(t, e, n = null) {
            let r = {};
            "string" == typeof e && ((r[e] = n), (e = r)),
              (r = this.layoutConfig.disableVendorPrefixes ? e : Uf(e)),
              this._applyMultiValueStyleToElement(r, t);
          }
          applyStyleToElements(t, e = []) {
            const n = this.layoutConfig.disableVendorPrefixes ? t : Uf(t);
            e.forEach((t) => {
              this._applyMultiValueStyleToElement(n, t);
            });
          }
          getFlowDirection(t) {
            const e = "flex-direction";
            let n = this.lookupStyle(t, e);
            return [
              n || "row",
              this.lookupInlineStyle(t, e) ||
              (Fu(this._platformId) && this._serverModuleLoaded)
                ? n
                : "",
            ];
          }
          hasWrap(t) {
            return "wrap" === this.lookupStyle(t, "flex-wrap");
          }
          lookupAttributeValue(t, e) {
            return t.getAttribute(e) || "";
          }
          lookupInlineStyle(t, e) {
            return Nu(this._platformId)
              ? t.style.getPropertyValue(e)
              : this._getServerStyle(t, e);
          }
          lookupStyle(t, e, n = !1) {
            let r = "";
            return (
              t &&
                ((r = this.lookupInlineStyle(t, e)) ||
                  (Nu(this._platformId)
                    ? n || (r = getComputedStyle(t).getPropertyValue(e))
                    : this._serverModuleLoaded &&
                      (r = this._serverStylesheet.getStyleForElement(t, e)))),
              r ? r.trim() : ""
            );
          }
          _applyMultiValueStyleToElement(t, e) {
            Object.keys(t)
              .sort()
              .forEach((n) => {
                const r = t[n],
                  s = Array.isArray(r) ? r : [r];
                s.sort();
                for (let t of s)
                  (t = t ? t + "" : ""),
                    Nu(this._platformId) || !this._serverModuleLoaded
                      ? Nu(this._platformId)
                        ? e.style.setProperty(n, t)
                        : this._setServerStyle(e, n, t)
                      : this._serverStylesheet.addStyleToElement(e, n, t);
              });
          }
          _setServerStyle(t, e, n) {
            e = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            const r = this._readStyleAttribute(t);
            (r[e] = n || ""), this._writeStyleAttribute(t, r);
          }
          _getServerStyle(t, e) {
            return this._readStyleAttribute(t)[e] || "";
          }
          _readStyleAttribute(t) {
            const e = {},
              n = t.getAttribute("style");
            if (n) {
              const t = n.split(/;+/g);
              for (let n = 0; n < t.length; n++) {
                const r = t[n].trim();
                if (r.length > 0) {
                  const t = r.indexOf(":");
                  if (-1 === t) throw new Error("Invalid CSS style: " + r);
                  e[r.substr(0, t).trim()] = r.substr(t + 1).trim();
                }
              }
            }
            return e;
          }
          _writeStyleAttribute(t, e) {
            let n = "";
            for (const r in e) e[r] && (n += r + ":" + e[r] + ";");
            t.setAttribute("style", n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(lf), Zt(hf), Zt(fl), Zt(cf));
          }),
          (t.ɵprov = ht({
            factory: function () {
              return new t(Zt(lf), Zt(hf), Zt(fl), Zt(cf));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class Bf {
        constructor() {
          this.shouldCache = !0;
        }
        sideEffect(t, e, n) {}
      }
      function $f(t, e = "1", n = "1") {
        let r = [e, n, t],
          s = t.indexOf("calc");
        if (s > 0) {
          r[2] = Hf(t.substring(s).trim());
          let e = t.substr(0, s).trim().split(" ");
          2 == e.length && ((r[0] = e[0]), (r[1] = e[1]));
        } else if (0 == s) r[2] = Hf(t.trim());
        else {
          let s = t.split(" ");
          r = 3 === s.length ? s : [e, n, t];
        }
        return r;
      }
      function Hf(t) {
        return t.replace(/[\s]/g, "").replace(/[\/\*\+\-]/g, " $& ");
      }
      let zf = (() => {
        class t {
          constructor(t, e, n) {
            (this.matchMedia = t),
              (this.breakpoints = e),
              (this.hook = n),
              (this.activatedBreakpoints = []),
              (this.elementMap = new Map()),
              (this.elementKeyMap = new WeakMap()),
              (this.watcherMap = new WeakMap()),
              (this.updateMap = new WeakMap()),
              (this.clearMap = new WeakMap()),
              (this.subject = new S()),
              this.observeActivations();
          }
          get activatedAlias() {
            return this.activatedBreakpoints[0]
              ? this.activatedBreakpoints[0].alias
              : "";
          }
          onMediaChange(t) {
            const e = this.findByQuery(t.mediaQuery);
            e &&
              ((t = pf(t, e)).matches &&
              -1 === this.activatedBreakpoints.indexOf(e)
                ? (this.activatedBreakpoints.push(e),
                  this.activatedBreakpoints.sort(Of),
                  this.updateStyles())
                : t.matches ||
                  -1 === this.activatedBreakpoints.indexOf(e) ||
                  (this.activatedBreakpoints.splice(
                    this.activatedBreakpoints.indexOf(e),
                    1
                  ),
                  this.activatedBreakpoints.sort(Of),
                  this.updateStyles()));
          }
          init(t, e, n, r, s = []) {
            qf(this.updateMap, t, e, n),
              qf(this.clearMap, t, e, r),
              this.buildElementKeyMap(t, e),
              this.watchExtraTriggers(t, e, s);
          }
          getValue(t, e, n) {
            const r = this.elementMap.get(t);
            if (r) {
              const t = void 0 !== n ? r.get(n) : this.getActivatedValues(r, e);
              if (t) return t.get(e);
            }
          }
          hasValue(t, e) {
            const n = this.elementMap.get(t);
            if (n) {
              const t = this.getActivatedValues(n, e);
              if (t) return void 0 !== t.get(e) || !1;
            }
            return !1;
          }
          setValue(t, e, n, r) {
            let s = this.elementMap.get(t);
            if (s) {
              const i = (s.get(r) || new Map()).set(e, n);
              s.set(r, i), this.elementMap.set(t, s);
            } else
              (s = new Map().set(r, new Map().set(e, n))),
                this.elementMap.set(t, s);
            const i = this.getValue(t, e);
            void 0 !== i && this.updateElement(t, e, i);
          }
          trackValue(t, e) {
            return this.subject
              .asObservable()
              .pipe(Ic((n) => n.element === t && n.key === e));
          }
          updateStyles() {
            this.elementMap.forEach((t, e) => {
              const n = new Set(this.elementKeyMap.get(e));
              let r = this.getActivatedValues(t);
              r &&
                r.forEach((t, r) => {
                  this.updateElement(e, r, t), n.delete(r);
                }),
                n.forEach((n) => {
                  if (((r = this.getActivatedValues(t, n)), r)) {
                    const t = r.get(n);
                    this.updateElement(e, n, t);
                  } else this.clearElement(e, n);
                });
            });
          }
          clearElement(t, e) {
            const n = this.clearMap.get(t);
            if (n) {
              const r = n.get(e);
              r && (r(), this.subject.next({ element: t, key: e, value: "" }));
            }
          }
          updateElement(t, e, n) {
            const r = this.updateMap.get(t);
            if (r) {
              const s = r.get(e);
              s && (s(n), this.subject.next({ element: t, key: e, value: n }));
            }
          }
          releaseElement(t) {
            const e = this.watcherMap.get(t);
            e && (e.forEach((t) => t.unsubscribe()), this.watcherMap.delete(t));
            const n = this.elementMap.get(t);
            n && (n.forEach((t, e) => n.delete(e)), this.elementMap.delete(t));
          }
          triggerUpdate(t, e) {
            const n = this.elementMap.get(t);
            if (n) {
              const r = this.getActivatedValues(n, e);
              r &&
                (e
                  ? this.updateElement(t, e, r.get(e))
                  : r.forEach((e, n) => this.updateElement(t, n, e)));
            }
          }
          buildElementKeyMap(t, e) {
            let n = this.elementKeyMap.get(t);
            n || ((n = new Set()), this.elementKeyMap.set(t, n)), n.add(e);
          }
          watchExtraTriggers(t, e, n) {
            if (n && n.length) {
              let r = this.watcherMap.get(t);
              if (
                (r || ((r = new Map()), this.watcherMap.set(t, r)), !r.get(e))
              ) {
                const s = q(...n).subscribe(() => {
                  const n = this.getValue(t, e);
                  this.updateElement(t, e, n);
                });
                r.set(e, s);
              }
            }
          }
          findByQuery(t) {
            return this.breakpoints.findByQuery(t);
          }
          getActivatedValues(t, e) {
            for (let r = 0; r < this.activatedBreakpoints.length; r++) {
              const n = t.get(this.activatedBreakpoints[r].alias);
              if (n && (void 0 === e || (n.has(e) && null != n.get(e))))
                return n;
            }
            const n = t.get("");
            return void 0 === e || (n && n.has(e)) ? n : void 0;
          }
          observeActivations() {
            const t = this.breakpoints.items.map((t) => t.mediaQuery);
            this.matchMedia
              .observe(this.hook.withPrintQuery(t))
              .pipe(
                sh(this.hook.interceptEvents(this)),
                Ic(this.hook.blockPropagation())
              )
              .subscribe(this.onMediaChange.bind(this));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(Lf), Zt(Pf), Zt(jf));
          }),
          (t.ɵprov = ht({
            factory: function () {
              return new t(Zt(Lf), Zt(Pf), Zt(jf));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      function qf(t, e, n, r) {
        if (void 0 !== r) {
          let s = t.get(e);
          s || ((s = new Map()), t.set(e, s)), s.set(n, r);
        }
      }
      const Qf = new Ut("cdk-dir-doc", {
        providedIn: "root",
        factory: function () {
          return Yt(ou);
        },
      });
      let Wf = (() => {
          class t {
            constructor(t) {
              if (((this.value = "ltr"), (this.change = new Wa()), t)) {
                const e = t.documentElement ? t.documentElement.dir : null,
                  n = (t.body ? t.body.dir : null) || e;
                this.value = "ltr" === n || "rtl" === n ? n : "ltr";
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(Qf, 8));
            }),
            (t.ɵprov = ht({
              factory: function () {
                return new t(Zt(Qf, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Gf = (() => {
          class t {}
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      const Kf = "inline",
        Zf = ["row", "column", "row-reverse", "column-reverse"];
      function Yf(t) {
        t = t ? t.toLowerCase() : "";
        let [e, n, r] = t.split(" ");
        return (
          Zf.find((t) => t === e) || (e = Zf[0]),
          n === Kf && ((n = r !== Kf ? r : ""), (r = Kf)),
          [e, Xf(n), !!r]
        );
      }
      function Jf(t) {
        let [e] = Yf(t);
        return e.indexOf("row") > -1;
      }
      function Xf(t) {
        if (t)
          switch (t.toLowerCase()) {
            case "reverse":
            case "wrap-reverse":
            case "reverse-wrap":
              t = "wrap-reverse";
              break;
            case "no":
            case "none":
            case "nowrap":
              t = "nowrap";
              break;
            default:
              t = "wrap";
          }
        return t;
      }
      let tm = (() => {
        class t extends Bf {
          buildStyles(t) {
            return (function (t) {
              let [e, n, r] = Yf(t);
              return (function (t, e = null, n = !1) {
                return {
                  display: n ? "inline-flex" : "flex",
                  "box-sizing": "border-box",
                  "flex-direction": t,
                  "flex-wrap": e || null,
                };
              })(e, n, r);
            })(t);
          }
        }
        (t.ɵfac = function (n) {
          return e(n || t);
        }),
          (t.ɵprov = ht({
            factory: function () {
              return new t();
            },
            token: t,
            providedIn: "root",
          }));
        const e = cr(t);
        return t;
      })();
      const em = [
        "fxLayout",
        "fxLayout.xs",
        "fxLayout.sm",
        "fxLayout.md",
        "fxLayout.lg",
        "fxLayout.xl",
        "fxLayout.lt-sm",
        "fxLayout.lt-md",
        "fxLayout.lt-lg",
        "fxLayout.lt-xl",
        "fxLayout.gt-xs",
        "fxLayout.gt-sm",
        "fxLayout.gt-md",
        "fxLayout.gt-lg",
      ];
      let nm = (() => {
          class t extends yf {
            constructor(t, e, n, r) {
              super(t, n, e, r),
                (this.DIRECTIVE_KEY = "layout"),
                (this.styleCache = sm),
                this.init();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(ta), vo(Vf), vo(tm), vo(zf));
            }),
            (t.ɵdir = we({ type: t, features: [so] })),
            t
          );
        })(),
        rm = (() => {
          class t extends nm {
            constructor() {
              super(...arguments), (this.inputs = em);
            }
          }
          (t.ɵfac = function (n) {
            return e(n || t);
          }),
            (t.ɵdir = we({
              type: t,
              selectors: [
                ["", "fxLayout", ""],
                ["", "fxLayout.xs", ""],
                ["", "fxLayout.sm", ""],
                ["", "fxLayout.md", ""],
                ["", "fxLayout.lg", ""],
                ["", "fxLayout.xl", ""],
                ["", "fxLayout.lt-sm", ""],
                ["", "fxLayout.lt-md", ""],
                ["", "fxLayout.lt-lg", ""],
                ["", "fxLayout.lt-xl", ""],
                ["", "fxLayout.gt-xs", ""],
                ["", "fxLayout.gt-sm", ""],
                ["", "fxLayout.gt-md", ""],
                ["", "fxLayout.gt-lg", ""],
              ],
              inputs: {
                fxLayout: "fxLayout",
                "fxLayout.xs": "fxLayout.xs",
                "fxLayout.sm": "fxLayout.sm",
                "fxLayout.md": "fxLayout.md",
                "fxLayout.lg": "fxLayout.lg",
                "fxLayout.xl": "fxLayout.xl",
                "fxLayout.lt-sm": "fxLayout.lt-sm",
                "fxLayout.lt-md": "fxLayout.lt-md",
                "fxLayout.lt-lg": "fxLayout.lt-lg",
                "fxLayout.lt-xl": "fxLayout.lt-xl",
                "fxLayout.gt-xs": "fxLayout.gt-xs",
                "fxLayout.gt-sm": "fxLayout.gt-sm",
                "fxLayout.gt-md": "fxLayout.gt-md",
                "fxLayout.gt-lg": "fxLayout.gt-lg",
              },
              features: [so],
            }));
          const e = cr(t);
          return t;
        })();
      const sm = new Map(),
        im = {
          "margin-left": null,
          "margin-right": null,
          "margin-top": null,
          "margin-bottom": null,
        };
      let om = (() => {
        class t extends Bf {
          constructor(t) {
            super(), (this._styler = t);
          }
          buildStyles(t, e) {
            return t.endsWith(fm)
              ? (function (t, e) {
                  const [n, r] = t.split(" "),
                    s = (t) => "-" + t;
                  let i = "0px",
                    o = s(r || n),
                    a = "0px";
                  return (
                    "rtl" === e ? (a = s(n)) : (i = s(n)),
                    {
                      margin: `0px ${i} ${o} ${a}`,
                    }
                  );
                })((t = t.slice(0, t.indexOf(fm))), e.directionality)
              : {};
          }
          sideEffect(t, e, n) {
            const r = n.items;
            if (t.endsWith(fm)) {
              const e = (function (t, e) {
                const [n, r] = t.split(" ");
                let s = "0px",
                  i = "0px";
                return (
                  "rtl" === e ? (i = n) : (s = n),
                  {
                    padding: `0px ${s} ${r || n} ${i}`,
                  }
                );
              })((t = t.slice(0, t.indexOf(fm))), n.directionality);
              this._styler.applyStyleToElements(e, n.items);
            } else {
              const e = r.pop(),
                s = (function (t, e) {
                  const n = mm(e.directionality, e.layout),
                    r = Object.assign({}, im);
                  return (r[n] = t), r;
                })(t, n);
              this._styler.applyStyleToElements(s, r),
                this._styler.applyStyleToElements(im, [e]);
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(Vf));
          }),
          (t.ɵprov = ht({
            factory: function () {
              return new t(Zt(Vf));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      const am = [
        "fxLayoutGap",
        "fxLayoutGap.xs",
        "fxLayoutGap.sm",
        "fxLayoutGap.md",
        "fxLayoutGap.lg",
        "fxLayoutGap.xl",
        "fxLayoutGap.lt-sm",
        "fxLayoutGap.lt-md",
        "fxLayoutGap.lt-lg",
        "fxLayoutGap.lt-xl",
        "fxLayoutGap.gt-xs",
        "fxLayoutGap.gt-sm",
        "fxLayoutGap.gt-md",
        "fxLayoutGap.gt-lg",
      ];
      let lm = (() => {
          class t extends yf {
            constructor(t, e, n, r, s, i) {
              super(t, s, r, i),
                (this.zone = e),
                (this.directionality = n),
                (this.styleUtils = r),
                (this.layout = "row"),
                (this.DIRECTIVE_KEY = "layout-gap"),
                (this.observerSubject = new S());
              const o = [
                this.directionality.change,
                this.observerSubject.asObservable(),
              ];
              this.init(o),
                this.marshal
                  .trackValue(this.nativeElement, "layout")
                  .pipe(tf(this.destroySubject))
                  .subscribe(this.onLayoutChange.bind(this));
            }
            get childrenNodes() {
              const t = this.nativeElement.children,
                e = [];
              for (let n = t.length; n--; ) e[n] = t[n];
              return e;
            }
            ngAfterContentInit() {
              this.buildChildObservable(), this.triggerUpdate();
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.observer && this.observer.disconnect();
            }
            onLayoutChange(t) {
              const e = t.value.split(" ");
              (this.layout = e[0]),
                Zf.find((t) => t === this.layout) || (this.layout = "row"),
                this.triggerUpdate();
            }
            updateWithValue(t) {
              const e = this.childrenNodes
                .filter((t) => 1 === t.nodeType && this.willDisplay(t))
                .sort((t, e) => {
                  const n = +this.styler.lookupStyle(t, "order"),
                    r = +this.styler.lookupStyle(e, "order");
                  return isNaN(n) || isNaN(r) || n === r ? 0 : n > r ? 1 : -1;
                });
              if (e.length > 0) {
                const n = this.directionality.value,
                  r = this.layout;
                "row" === r && "rtl" === n
                  ? (this.styleCache = cm)
                  : "row" === r && "rtl" !== n
                  ? (this.styleCache = dm)
                  : "column" === r && "rtl" === n
                  ? (this.styleCache = hm)
                  : "column" === r && "rtl" !== n && (this.styleCache = pm),
                  this.addStyles(t, { directionality: n, items: e, layout: r });
              }
            }
            clearStyles() {
              const t = Object.keys(this.mru).length > 0,
                e = t ? "padding" : mm(this.directionality.value, this.layout);
              t && super.clearStyles(),
                this.styleUtils.applyStyleToElements(
                  { [e]: "" },
                  this.childrenNodes
                );
            }
            willDisplay(t) {
              const e = this.marshal.getValue(t, "show-hide");
              return (
                !0 === e ||
                (void 0 === e &&
                  "none" !== this.styleUtils.lookupStyle(t, "display"))
              );
            }
            buildChildObservable() {
              this.zone.runOutsideAngular(() => {
                "undefined" != typeof MutationObserver &&
                  ((this.observer = new MutationObserver((t) => {
                    t.some(
                      (t) =>
                        (t.addedNodes && t.addedNodes.length > 0) ||
                        (t.removedNodes && t.removedNodes.length > 0)
                    ) && this.observerSubject.next();
                  })),
                  this.observer.observe(this.nativeElement, { childList: !0 }));
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                vo(ta),
                vo(Il),
                vo(Wf),
                vo(Vf),
                vo(om),
                vo(zf)
              );
            }),
            (t.ɵdir = we({ type: t, features: [so] })),
            t
          );
        })(),
        um = (() => {
          class t extends lm {
            constructor() {
              super(...arguments), (this.inputs = am);
            }
          }
          (t.ɵfac = function (n) {
            return e(n || t);
          }),
            (t.ɵdir = we({
              type: t,
              selectors: [
                ["", "fxLayoutGap", ""],
                ["", "fxLayoutGap.xs", ""],
                ["", "fxLayoutGap.sm", ""],
                ["", "fxLayoutGap.md", ""],
                ["", "fxLayoutGap.lg", ""],
                ["", "fxLayoutGap.xl", ""],
                ["", "fxLayoutGap.lt-sm", ""],
                ["", "fxLayoutGap.lt-md", ""],
                ["", "fxLayoutGap.lt-lg", ""],
                ["", "fxLayoutGap.lt-xl", ""],
                ["", "fxLayoutGap.gt-xs", ""],
                ["", "fxLayoutGap.gt-sm", ""],
                ["", "fxLayoutGap.gt-md", ""],
                ["", "fxLayoutGap.gt-lg", ""],
              ],
              inputs: {
                fxLayoutGap: "fxLayoutGap",
                "fxLayoutGap.xs": "fxLayoutGap.xs",
                "fxLayoutGap.sm": "fxLayoutGap.sm",
                "fxLayoutGap.md": "fxLayoutGap.md",
                "fxLayoutGap.lg": "fxLayoutGap.lg",
                "fxLayoutGap.xl": "fxLayoutGap.xl",
                "fxLayoutGap.lt-sm": "fxLayoutGap.lt-sm",
                "fxLayoutGap.lt-md": "fxLayoutGap.lt-md",
                "fxLayoutGap.lt-lg": "fxLayoutGap.lt-lg",
                "fxLayoutGap.lt-xl": "fxLayoutGap.lt-xl",
                "fxLayoutGap.gt-xs": "fxLayoutGap.gt-xs",
                "fxLayoutGap.gt-sm": "fxLayoutGap.gt-sm",
                "fxLayoutGap.gt-md": "fxLayoutGap.gt-md",
                "fxLayoutGap.gt-lg": "fxLayoutGap.gt-lg",
              },
              features: [so],
            }));
          const e = cr(t);
          return t;
        })();
      const cm = new Map(),
        hm = new Map(),
        dm = new Map(),
        pm = new Map(),
        fm = " grid";
      function mm(t, e) {
        switch (e) {
          case "column":
            return "margin-bottom";
          case "column-reverse":
            return "margin-top";
          case "row":
            return "rtl" === t ? "margin-left" : "margin-right";
          case "row-reverse":
            return "rtl" === t ? "margin-right" : "margin-left";
          default:
            return "rtl" === t ? "margin-left" : "margin-right";
        }
      }
      function gm(t, ...e) {
        if (null == t)
          throw TypeError("Cannot convert undefined or null to object");
        for (let n of e)
          if (null != n) for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
        return t;
      }
      let ym = (() => {
        class t extends Bf {
          constructor(t) {
            super(), (this.layoutConfig = t);
          }
          buildStyles(t, e) {
            let [n, r, ...s] = t.split(" "),
              i = s.join(" ");
            const o = e.direction.indexOf("column") > -1 ? "column" : "row",
              a = Jf(o) ? "max-width" : "max-height",
              l = Jf(o) ? "min-width" : "min-height",
              u = String(i).indexOf("calc") > -1,
              c = u || "auto" === i,
              h = String(i).indexOf("%") > -1 && !u,
              d =
                String(i).indexOf("px") > -1 ||
                String(i).indexOf("rem") > -1 ||
                String(i).indexOf("em") > -1 ||
                String(i).indexOf("vw") > -1 ||
                String(i).indexOf("vh") > -1;
            let p = u || d;
            (n = "0" == n ? 0 : n), (r = "0" == r ? 0 : r);
            const f = !n && !r;
            let m = {};
            const g = {
              "max-width": null,
              "max-height": null,
              "min-width": null,
              "min-height": null,
            };
            switch (i || "") {
              case "":
                const t = !1 !== this.layoutConfig.useColumnBasisZero;
                i = "row" === o ? "0%" : t ? "0.000000001px" : "auto";
                break;
              case "initial":
              case "nogrow":
                (n = 0), (i = "auto");
                break;
              case "grow":
                i = "100%";
                break;
              case "noshrink":
                (r = 0), (i = "auto");
                break;
              case "auto":
                break;
              case "none":
                (n = 0), (r = 0), (i = "auto");
                break;
              default:
                p || h || isNaN(i) || (i += "%"),
                  "0%" === i && (p = !0),
                  "0px" === i && (i = "0%"),
                  (m = gm(
                    g,
                    u
                      ? {
                          "flex-grow": n,
                          "flex-shrink": r,
                          "flex-basis": p ? i : "100%",
                        }
                      : { flex: `${n} ${r} ${p ? i : "100%"}` }
                  ));
            }
            return (
              m.flex ||
                m["flex-grow"] ||
                (m = gm(
                  g,
                  u
                    ? {
                        "flex-grow": n,
                        "flex-shrink": r,
                        "flex-basis": i,
                      }
                    : { flex: `${n} ${r} ${i}` }
                )),
              "0%" !== i &&
                "0px" !== i &&
                "0.000000001px" !== i &&
                "auto" !== i &&
                ((m[l] = f || (p && n) ? i : null),
                (m[a] = f || (!c && r) ? i : null)),
              m[l] || m[a]
                ? e.hasWrap &&
                  (m[u ? "flex-basis" : "flex"] = m[a]
                    ? u
                      ? m[a]
                      : `${n} ${r} ${m[a]}`
                    : u
                    ? m[l]
                    : `${n} ${r} ${m[l]}`)
                : (m = gm(
                    g,
                    u
                      ? {
                          "flex-grow": n,
                          "flex-shrink": r,
                          "flex-basis": i,
                        }
                      : { flex: `${n} ${r} ${i}` }
                  )),
              gm(m, { "box-sizing": "border-box" })
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(cf));
          }),
          (t.ɵprov = ht({
            factory: function () {
              return new t(Zt(cf));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      const _m = [
        "fxFlex",
        "fxFlex.xs",
        "fxFlex.sm",
        "fxFlex.md",
        "fxFlex.lg",
        "fxFlex.xl",
        "fxFlex.lt-sm",
        "fxFlex.lt-md",
        "fxFlex.lt-lg",
        "fxFlex.lt-xl",
        "fxFlex.gt-xs",
        "fxFlex.gt-sm",
        "fxFlex.gt-md",
        "fxFlex.gt-lg",
      ];
      let vm = (() => {
          class t extends yf {
            constructor(t, e, n, r, s) {
              super(t, r, e, s),
                (this.layoutConfig = n),
                (this.marshal = s),
                (this.DIRECTIVE_KEY = "flex"),
                (this.direction = void 0),
                (this.wrap = void 0),
                (this.flexGrow = "1"),
                (this.flexShrink = "1"),
                this.init();
            }
            get shrink() {
              return this.flexShrink;
            }
            set shrink(t) {
              (this.flexShrink = t || "1"), this.triggerReflow();
            }
            get grow() {
              return this.flexGrow;
            }
            set grow(t) {
              (this.flexGrow = t || "1"), this.triggerReflow();
            }
            ngOnInit() {
              this.parentElement &&
                (this.marshal
                  .trackValue(this.parentElement, "layout")
                  .pipe(tf(this.destroySubject))
                  .subscribe(this.onLayoutChange.bind(this)),
                this.marshal
                  .trackValue(this.nativeElement, "layout-align")
                  .pipe(tf(this.destroySubject))
                  .subscribe(this.triggerReflow.bind(this)));
            }
            onLayoutChange(t) {
              const e = t.value.split(" ");
              (this.direction = e[0]),
                (this.wrap = void 0 !== e[1] && "wrap" === e[1]),
                this.triggerUpdate();
            }
            updateWithValue(t) {
              void 0 === this.direction &&
                (this.direction = this.getFlexFlowDirection(
                  this.parentElement,
                  !1 !== this.layoutConfig.addFlexToParent
                )),
                void 0 === this.wrap &&
                  (this.wrap = this.hasWrap(this.parentElement));
              const e = this.direction,
                n = e.startsWith("row"),
                r = this.wrap;
              n && r
                ? (this.styleCache = Sm)
                : n && !r
                ? (this.styleCache = wm)
                : !n && r
                ? (this.styleCache = Em)
                : n || r || (this.styleCache = xm);
              const s = $f(
                String(t).replace(";", ""),
                this.flexGrow,
                this.flexShrink
              );
              this.addStyles(s.join(" "), { direction: e, hasWrap: r });
            }
            triggerReflow() {
              const t = this.activatedValue;
              if (void 0 !== t) {
                const e = $f(t + "", this.flexGrow, this.flexShrink);
                this.marshal.updateElement(
                  this.nativeElement,
                  this.DIRECTIVE_KEY,
                  e.join(" ")
                );
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(ta), vo(Vf), vo(cf), vo(ym), vo(zf));
            }),
            (t.ɵdir = we({
              type: t,
              inputs: {
                shrink: ["fxShrink", "shrink"],
                grow: ["fxGrow", "grow"],
              },
              features: [so],
            })),
            t
          );
        })(),
        bm = (() => {
          class t extends vm {
            constructor() {
              super(...arguments), (this.inputs = _m);
            }
          }
          (t.ɵfac = function (n) {
            return e(n || t);
          }),
            (t.ɵdir = we({
              type: t,
              selectors: [
                ["", "fxFlex", ""],
                ["", "fxFlex.xs", ""],
                ["", "fxFlex.sm", ""],
                ["", "fxFlex.md", ""],
                ["", "fxFlex.lg", ""],
                ["", "fxFlex.xl", ""],
                ["", "fxFlex.lt-sm", ""],
                ["", "fxFlex.lt-md", ""],
                ["", "fxFlex.lt-lg", ""],
                ["", "fxFlex.lt-xl", ""],
                ["", "fxFlex.gt-xs", ""],
                ["", "fxFlex.gt-sm", ""],
                ["", "fxFlex.gt-md", ""],
                ["", "fxFlex.gt-lg", ""],
              ],
              inputs: {
                fxFlex: "fxFlex",
                "fxFlex.xs": "fxFlex.xs",
                "fxFlex.sm": "fxFlex.sm",
                "fxFlex.md": "fxFlex.md",
                "fxFlex.lg": "fxFlex.lg",
                "fxFlex.xl": "fxFlex.xl",
                "fxFlex.lt-sm": "fxFlex.lt-sm",
                "fxFlex.lt-md": "fxFlex.lt-md",
                "fxFlex.lt-lg": "fxFlex.lt-lg",
                "fxFlex.lt-xl": "fxFlex.lt-xl",
                "fxFlex.gt-xs": "fxFlex.gt-xs",
                "fxFlex.gt-sm": "fxFlex.gt-sm",
                "fxFlex.gt-md": "fxFlex.gt-md",
                "fxFlex.gt-lg": "fxFlex.gt-lg",
              },
              features: [so],
            }));
          const e = cr(t);
          return t;
        })();
      const wm = new Map(),
        xm = new Map(),
        Sm = new Map(),
        Em = new Map(),
        Cm = {
          margin: 0,
          width: "100%",
          height: "100%",
          "min-width": "100%",
          "min-height": "100%",
        };
      let km = (() => {
          class t extends Bf {
            buildStyles(t) {
              return Cm;
            }
          }
          (t.ɵfac = function (n) {
            return e(n || t);
          }),
            (t.ɵprov = ht({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            }));
          const e = cr(t);
          return t;
        })(),
        Tm = (() => {
          class t extends yf {
            constructor(t, e, n, r) {
              super(t, n, e, r), (this.styleCache = Am), this.addStyles("");
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(ta), vo(Vf), vo(km), vo(zf));
            }),
            (t.ɵdir = we({
              type: t,
              selectors: [
                ["", "fxFill", ""],
                ["", "fxFlexFill", ""],
              ],
              features: [so],
            })),
            t
          );
        })();
      const Am = new Map();
      let Im = (() => {
        class t extends Bf {
          buildStyles(t, e) {
            const n = {},
              [r, s] = t.split(" ");
            switch (r) {
              case "center":
                n["justify-content"] = "center";
                break;
              case "space-around":
                n["justify-content"] = "space-around";
                break;
              case "space-between":
                n["justify-content"] = "space-between";
                break;
              case "space-evenly":
                n["justify-content"] = "space-evenly";
                break;
              case "end":
              case "flex-end":
                n["justify-content"] = "flex-end";
                break;
              case "start":
              case "flex-start":
              default:
                n["justify-content"] = "flex-start";
            }
            switch (s) {
              case "start":
              case "flex-start":
                n["align-items"] = n["align-content"] = "flex-start";
                break;
              case "center":
                n["align-items"] = n["align-content"] = "center";
                break;
              case "end":
              case "flex-end":
                n["align-items"] = n["align-content"] = "flex-end";
                break;
              case "space-between":
                (n["align-content"] = "space-between"),
                  (n["align-items"] = "stretch");
                break;
              case "space-around":
                (n["align-content"] = "space-around"),
                  (n["align-items"] = "stretch");
                break;
              case "baseline":
                (n["align-content"] = "stretch"),
                  (n["align-items"] = "baseline");
                break;
              case "stretch":
              default:
                n["align-items"] = n["align-content"] = "stretch";
            }
            return gm(n, {
              display: e.inline ? "inline-flex" : "flex",
              "flex-direction": e.layout,
              "box-sizing": "border-box",
              "max-width":
                "stretch" === s ? (Jf(e.layout) ? null : "100%") : null,
              "max-height": "stretch" === s && Jf(e.layout) ? "100%" : null,
            });
          }
        }
        (t.ɵfac = function (n) {
          return e(n || t);
        }),
          (t.ɵprov = ht({
            factory: function () {
              return new t();
            },
            token: t,
            providedIn: "root",
          }));
        const e = cr(t);
        return t;
      })();
      const Om = [
        "fxLayoutAlign",
        "fxLayoutAlign.xs",
        "fxLayoutAlign.sm",
        "fxLayoutAlign.md",
        "fxLayoutAlign.lg",
        "fxLayoutAlign.xl",
        "fxLayoutAlign.lt-sm",
        "fxLayoutAlign.lt-md",
        "fxLayoutAlign.lt-lg",
        "fxLayoutAlign.lt-xl",
        "fxLayoutAlign.gt-xs",
        "fxLayoutAlign.gt-sm",
        "fxLayoutAlign.gt-md",
        "fxLayoutAlign.gt-lg",
      ];
      let Rm = (() => {
          class t extends yf {
            constructor(t, e, n, r) {
              super(t, n, e, r),
                (this.DIRECTIVE_KEY = "layout-align"),
                (this.layout = "row"),
                (this.inline = !1),
                this.init(),
                this.marshal
                  .trackValue(this.nativeElement, "layout")
                  .pipe(tf(this.destroySubject))
                  .subscribe(this.onLayoutChange.bind(this));
            }
            updateWithValue(t) {
              const e = this.layout || "row",
                n = this.inline;
              "row" === e && n
                ? (this.styleCache = jm)
                : "row" !== e || n
                ? "row-reverse" === e && n
                  ? (this.styleCache = Um)
                  : "row-reverse" !== e || n
                  ? "column" === e && n
                    ? (this.styleCache = Mm)
                    : "column" !== e || n
                    ? "column-reverse" === e && n
                      ? (this.styleCache = Vm)
                      : "column-reverse" !== e || n || (this.styleCache = Fm)
                    : (this.styleCache = Dm)
                  : (this.styleCache = Nm)
                : (this.styleCache = Lm),
                this.addStyles(t, { layout: e, inline: n });
            }
            onLayoutChange(t) {
              const e = t.value.split(" ");
              (this.layout = e[0]),
                (this.inline = t.value.includes("inline")),
                Zf.find((t) => t === this.layout) || (this.layout = "row"),
                this.triggerUpdate();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(ta), vo(Vf), vo(Im), vo(zf));
            }),
            (t.ɵdir = we({ type: t, features: [so] })),
            t
          );
        })(),
        Pm = (() => {
          class t extends Rm {
            constructor() {
              super(...arguments), (this.inputs = Om);
            }
          }
          (t.ɵfac = function (n) {
            return e(n || t);
          }),
            (t.ɵdir = we({
              type: t,
              selectors: [
                ["", "fxLayoutAlign", ""],
                ["", "fxLayoutAlign.xs", ""],
                ["", "fxLayoutAlign.sm", ""],
                ["", "fxLayoutAlign.md", ""],
                ["", "fxLayoutAlign.lg", ""],
                ["", "fxLayoutAlign.xl", ""],
                ["", "fxLayoutAlign.lt-sm", ""],
                ["", "fxLayoutAlign.lt-md", ""],
                ["", "fxLayoutAlign.lt-lg", ""],
                ["", "fxLayoutAlign.lt-xl", ""],
                ["", "fxLayoutAlign.gt-xs", ""],
                ["", "fxLayoutAlign.gt-sm", ""],
                ["", "fxLayoutAlign.gt-md", ""],
                ["", "fxLayoutAlign.gt-lg", ""],
              ],
              inputs: {
                fxLayoutAlign: "fxLayoutAlign",
                "fxLayoutAlign.xs": "fxLayoutAlign.xs",
                "fxLayoutAlign.sm": "fxLayoutAlign.sm",
                "fxLayoutAlign.md": "fxLayoutAlign.md",
                "fxLayoutAlign.lg": "fxLayoutAlign.lg",
                "fxLayoutAlign.xl": "fxLayoutAlign.xl",
                "fxLayoutAlign.lt-sm": "fxLayoutAlign.lt-sm",
                "fxLayoutAlign.lt-md": "fxLayoutAlign.lt-md",
                "fxLayoutAlign.lt-lg": "fxLayoutAlign.lt-lg",
                "fxLayoutAlign.lt-xl": "fxLayoutAlign.lt-xl",
                "fxLayoutAlign.gt-xs": "fxLayoutAlign.gt-xs",
                "fxLayoutAlign.gt-sm": "fxLayoutAlign.gt-sm",
                "fxLayoutAlign.gt-md": "fxLayoutAlign.gt-md",
                "fxLayoutAlign.gt-lg": "fxLayoutAlign.gt-lg",
              },
              features: [so],
            }));
          const e = cr(t);
          return t;
        })();
      const Lm = new Map(),
        Dm = new Map(),
        Nm = new Map(),
        Fm = new Map(),
        jm = new Map(),
        Mm = new Map(),
        Um = new Map(),
        Vm = new Map();
      let Bm,
        $m = (() => {
          class t {}
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[of, Gf]],
            })),
            t
          );
        })();
      try {
        Bm = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch (ab) {
        Bm = !1;
      }
      let Hm,
        zm,
        qm = (() => {
          class t {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? Nu(this._platformId)
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !Bm) &&
                  "undefined" != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(fl));
            }),
            (t.ɵprov = ht({
              factory: function () {
                return new t(Zt(fl));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Qm = (() => {
          class t {}
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      function Wm(t) {
        return (function () {
          if (null == Hm && "undefined" != typeof window)
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (Hm = !0) })
              );
            } finally {
              Hm = Hm || !1;
            }
          return Hm;
        })()
          ? t
          : !!t.capture;
      }
      function Gm(t) {
        return null != t && "" + t != "false";
      }
      function Km(t, e = 0) {
        return (function (t) {
          return !isNaN(parseFloat(t)) && !isNaN(Number(t));
        })(t)
          ? Number(t)
          : e;
      }
      function Zm(t) {
        return t instanceof ta ? t.nativeElement : t;
      }
      function Ym(t) {
        return 0 === t.buttons;
      }
      "undefined" != typeof Element && Element;
      const Jm = new Ut("cdk-focus-monitor-default-options"),
        Xm = Wm({ passive: !0, capture: !0 });
      let tg = (() => {
        class t {
          constructor(t, e, n, r) {
            (this._ngZone = t),
              (this._platform = e),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._documentKeydownListener = () => {
                (this._lastTouchTarget = null),
                  this._setOriginForCurrentEventQueue("keyboard");
              }),
              (this._documentMousedownListener = (t) => {
                if (!this._lastTouchTarget) {
                  const e = Ym(t) ? "keyboard" : "mouse";
                  this._setOriginForCurrentEventQueue(e);
                }
              }),
              (this._documentTouchstartListener = (t) => {
                null != this._touchTimeoutId &&
                  clearTimeout(this._touchTimeoutId),
                  (this._lastTouchTarget = eg(t)),
                  (this._touchTimeoutId = setTimeout(
                    () => (this._lastTouchTarget = null),
                    650
                  ));
              }),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._rootNodeFocusAndBlurListener = (t) => {
                const e = eg(t),
                  n = "focus" === t.type ? this._onFocus : this._onBlur;
                for (let r = e; r; r = r.parentElement) n.call(this, t, r);
              }),
              (this._document = n),
              (this._detectionMode =
                (null == r ? void 0 : r.detectionMode) || 0);
          }
          monitor(t, e = !1) {
            if (!this._platform.isBrowser) return gc(null);
            const n = Zm(t),
              r =
                (function (t) {
                  if (
                    (function () {
                      if (null == zm) {
                        const t =
                          "undefined" != typeof document ? document.head : null;
                        zm = !(!t || (!t.createShadowRoot && !t.attachShadow));
                      }
                      return zm;
                    })()
                  ) {
                    const e = t.getRootNode ? t.getRootNode() : null;
                    if (
                      "undefined" != typeof ShadowRoot &&
                      ShadowRoot &&
                      e instanceof ShadowRoot
                    )
                      return e;
                  }
                  return null;
                })(n) || this._getDocument(),
              s = this._elementInfo.get(n);
            if (s) return e && (s.checkChildren = !0), s.subject;
            const i = { checkChildren: e, subject: new S(), rootNode: r };
            return (
              this._elementInfo.set(n, i),
              this._registerGlobalListeners(i),
              i.subject
            );
          }
          stopMonitoring(t) {
            const e = Zm(t),
              n = this._elementInfo.get(e);
            n &&
              (n.subject.complete(),
              this._setClasses(e),
              this._elementInfo.delete(e),
              this._removeGlobalListeners(n));
          }
          focusVia(t, e, n) {
            const r = Zm(t);
            this._setOriginForCurrentEventQueue(e),
              "function" == typeof r.focus && r.focus(n);
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, e) => this.stopMonitoring(e));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _toggleClass(t, e, n) {
            n ? t.classList.add(e) : t.classList.remove(e);
          }
          _getFocusOrigin(t) {
            return this._origin
              ? this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : this._wasCausedByTouch(t)
              ? "touch"
              : "program";
          }
          _setClasses(t, e) {
            this._toggleClass(t, "cdk-focused", !!e),
              this._toggleClass(t, "cdk-touch-focused", "touch" === e),
              this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e),
              this._toggleClass(t, "cdk-mouse-focused", "mouse" === e),
              this._toggleClass(t, "cdk-program-focused", "program" === e);
          }
          _setOriginForCurrentEventQueue(t) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = t),
                0 === this._detectionMode &&
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    1
                  ));
            });
          }
          _wasCausedByTouch(t) {
            const e = eg(t);
            return (
              this._lastTouchTarget instanceof Node &&
              e instanceof Node &&
              (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
            );
          }
          _onFocus(t, e) {
            const n = this._elementInfo.get(e);
            if (!n || (!n.checkChildren && e !== eg(t))) return;
            const r = this._getFocusOrigin(t);
            this._setClasses(e, r),
              this._emitOrigin(n.subject, r),
              (this._lastFocusOrigin = r);
          }
          _onBlur(t, e) {
            const n = this._elementInfo.get(e);
            !n ||
              (n.checkChildren &&
                t.relatedTarget instanceof Node &&
                e.contains(t.relatedTarget)) ||
              (this._setClasses(e), this._emitOrigin(n.subject, null));
          }
          _emitOrigin(t, e) {
            this._ngZone.run(() => t.next(e));
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const e = t.rootNode,
              n = this._rootNodeFocusListenerCount.get(e) || 0;
            n ||
              this._ngZone.runOutsideAngular(() => {
                e.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  Xm
                ),
                  e.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    Xm
                  );
              }),
              this._rootNodeFocusListenerCount.set(e, n + 1),
              1 == ++this._monitoredElementCount &&
                this._ngZone.runOutsideAngular(() => {
                  const t = this._getDocument(),
                    e = this._getWindow();
                  t.addEventListener(
                    "keydown",
                    this._documentKeydownListener,
                    Xm
                  ),
                    t.addEventListener(
                      "mousedown",
                      this._documentMousedownListener,
                      Xm
                    ),
                    t.addEventListener(
                      "touchstart",
                      this._documentTouchstartListener,
                      Xm
                    ),
                    e.addEventListener("focus", this._windowFocusListener);
                });
          }
          _removeGlobalListeners(t) {
            const e = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(e)) {
              const t = this._rootNodeFocusListenerCount.get(e);
              t > 1
                ? this._rootNodeFocusListenerCount.set(e, t - 1)
                : (e.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    Xm
                  ),
                  e.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    Xm
                  ),
                  this._rootNodeFocusListenerCount.delete(e));
            }
            if (!--this._monitoredElementCount) {
              const t = this._getDocument(),
                e = this._getWindow();
              t.removeEventListener(
                "keydown",
                this._documentKeydownListener,
                Xm
              ),
                t.removeEventListener(
                  "mousedown",
                  this._documentMousedownListener,
                  Xm
                ),
                t.removeEventListener(
                  "touchstart",
                  this._documentTouchstartListener,
                  Xm
                ),
                e.removeEventListener("focus", this._windowFocusListener),
                clearTimeout(this._windowFocusTimeoutId),
                clearTimeout(this._touchTimeoutId),
                clearTimeout(this._originTimeoutId);
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(Il), Zt(qm), Zt(ou, 8), Zt(Jm, 8));
          }),
          (t.ɵprov = ht({
            factory: function () {
              return new t(Zt(Il), Zt(qm), Zt(ou, 8), Zt(Jm, 8));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      function eg(t) {
        return t.composedPath ? t.composedPath()[0] : t.target;
      }
      const ng = "cdk-high-contrast-black-on-white",
        rg = "cdk-high-contrast-white-on-black",
        sg = "cdk-high-contrast-active";
      let ig = (() => {
        class t {
          constructor(t, e) {
            (this._platform = t), (this._document = e);
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0;
            const t = this._document.createElement("div");
            (t.style.backgroundColor = "rgb(1,2,3)"),
              (t.style.position = "absolute"),
              this._document.body.appendChild(t);
            const e = this._document.defaultView || window,
              n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
              r = ((n && n.backgroundColor) || "").replace(/ /g, "");
            switch ((this._document.body.removeChild(t), r)) {
              case "rgb(0,0,0)":
                return 2;
              case "rgb(255,255,255)":
                return 1;
            }
            return 0;
          }
          _applyBodyHighContrastModeCssClasses() {
            if (this._platform.isBrowser && this._document.body) {
              const t = this._document.body.classList;
              t.remove(sg), t.remove(ng), t.remove(rg);
              const e = this.getHighContrastMode();
              1 === e
                ? (t.add(sg), t.add(ng))
                : 2 === e && (t.add(sg), t.add(rg));
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(qm), Zt(ou));
          }),
          (t.ɵprov = ht({
            factory: function () {
              return new t(Zt(qm), Zt(ou));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      const og = new aa("10.2.2");
      class ag {}
      const lg = "*";
      function ug(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function cg(t) {
        return { type: 6, styles: t, offset: null };
      }
      function hg(t) {
        Promise.resolve(null).then(t);
      }
      class dg {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          hg(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {}
        setPosition(t) {}
        getPosition() {
          return 0;
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class pg {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            n = 0,
            r = 0;
          const s = this.players.length;
          0 == s
            ? hg(() => this._onFinish())
            : this.players.forEach((t) => {
                t.onDone(() => {
                  ++e == s && this._onFinish();
                }),
                  t.onDestroy(() => {
                    ++n == s && this._onDestroy();
                  }),
                  t.onStart(() => {
                    ++r == s && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (t, e) => Math.max(t, e.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((t) => {
            const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
            t.setPosition(n);
          });
        }
        getPosition() {
          let t = 0;
          return (
            this.players.forEach((e) => {
              const n = e.getPosition();
              t = Math.min(n, t);
            }),
            t
          );
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      function fg() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function mg(t) {
        switch (t.length) {
          case 0:
            return new dg();
          case 1:
            return t[0];
          default:
            return new pg(t);
        }
      }
      function gg(t, e, n, r, s = {}, i = {}) {
        const o = [],
          a = [];
        let l = -1,
          u = null;
        if (
          (r.forEach((t) => {
            const n = t.offset,
              r = n == l,
              c = (r && u) || {};
            Object.keys(t).forEach((n) => {
              let r = n,
                a = t[n];
              if ("offset" !== n)
                switch (((r = e.normalizePropertyName(r, o)), a)) {
                  case "!":
                    a = s[n];
                    break;
                  case lg:
                    a = i[n];
                    break;
                  default:
                    a = e.normalizeStyleValue(n, r, a, o);
                }
              c[r] = a;
            }),
              r || a.push(c),
              (u = c),
              (l = n);
          }),
          o.length)
        ) {
          const t = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${t}${o.join(t)}`
          );
        }
        return a;
      }
      function yg(t, e, n, r) {
        switch (e) {
          case "start":
            t.onStart(() => r(n && _g(n, "start", t)));
            break;
          case "done":
            t.onDone(() => r(n && _g(n, "done", t)));
            break;
          case "destroy":
            t.onDestroy(() => r(n && _g(n, "destroy", t)));
        }
      }
      function _g(t, e, n) {
        const r = n.totalTime,
          s = vg(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == r ? t.totalTime : r,
            !!n.disabled
          ),
          i = t._data;
        return null != i && (s._data = i), s;
      }
      function vg(t, e, n, r, s = "", i = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: r,
          phaseName: s,
          totalTime: i,
          disabled: !!o,
        };
      }
      function bg(t, e, n) {
        let r;
        return (
          t instanceof Map
            ? ((r = t.get(e)), r || t.set(e, (r = n)))
            : ((r = t[e]), r || (r = t[e] = n)),
          r
        );
      }
      function wg(t) {
        const e = t.indexOf(":");
        return [t.substring(1, e), t.substr(e + 1)];
      }
      let xg = (t, e) => !1,
        Sg = (t, e) => !1,
        Eg = (t, e, n) => [];
      const Cg = fg();
      (Cg || "undefined" != typeof Element) &&
        ((xg = (t, e) => t.contains(e)),
        (Sg = (() => {
          if (Cg || Element.prototype.matches) return (t, e) => t.matches(e);
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector;
            return e ? (t, n) => e.apply(t, [n]) : Sg;
          }
        })()),
        (Eg = (t, e, n) => {
          let r = [];
          if (n) r.push(...t.querySelectorAll(e));
          else {
            const n = t.querySelector(e);
            n && r.push(n);
          }
          return r;
        }));
      let kg = null,
        Tg = !1;
      function Ag(t) {
        kg ||
          ((kg = ("undefined" != typeof document ? document.body : null) || {}),
          (Tg = !!kg.style && "WebkitAppearance" in kg.style));
        let e = !0;
        return (
          kg.style &&
            !(function (t) {
              return "ebkit" == t.substring(1, 6);
            })(t) &&
            ((e = t in kg.style), !e && Tg) &&
            (e =
              "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in kg.style),
          e
        );
      }
      const Ig = Sg,
        Og = xg,
        Rg = Eg;
      function Pg(t) {
        const e = {};
        return (
          Object.keys(t).forEach((n) => {
            const r = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[r] = t[n];
          }),
          e
        );
      }
      let Lg = (() => {
          class t {
            validateStyleProperty(t) {
              return Ag(t);
            }
            matchesElement(t, e) {
              return Ig(t, e);
            }
            containsElement(t, e) {
              return Og(t, e);
            }
            query(t, e, n) {
              return Rg(t, e, n);
            }
            computeStyle(t, e, n) {
              return n || "";
            }
            animate(t, e, n, r, s, i = [], o) {
              return new dg(n, r);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Dg = (() => {
          class t {}
          return (t.NOOP = new Lg()), t;
        })();
      const Ng = "ng-enter",
        Fg = "ng-leave",
        jg = "ng-trigger",
        Mg = ".ng-trigger",
        Ug = "ng-animating",
        Vg = ".ng-animating";
      function Bg(t) {
        if ("number" == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : $g(parseFloat(e[1]), e[2]);
      }
      function $g(t, e) {
        switch (e) {
          case "s":
            return 1e3 * t;
          default:
            return t;
        }
      }
      function Hg(t, e, n) {
        return t.hasOwnProperty("duration")
          ? t
          : (function (t, e, n) {
              let r,
                s = 0,
                i = "";
              if ("string" == typeof t) {
                const n = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === n)
                  return (
                    e.push(`The provided timing value "${t}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                r = $g(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (s = $g(parseFloat(o), n[4]));
                const a = n[5];
                a && (i = a);
              } else r = t;
              if (!n) {
                let n = !1,
                  i = e.length;
                r < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (n = !0)),
                  s < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (n = !0)),
                  n &&
                    e.splice(
                      i,
                      0,
                      `The provided timing value "${t}" is invalid.`
                    );
              }
              return { duration: r, delay: s, easing: i };
            })(t, e, n);
      }
      function zg(t, e = {}) {
        return (
          Object.keys(t).forEach((n) => {
            e[n] = t[n];
          }),
          e
        );
      }
      function qg(t, e, n = {}) {
        if (e) for (let r in t) n[r] = t[r];
        else zg(t, n);
        return n;
      }
      function Qg(t, e, n) {
        return n ? e + ":" + n + ";" : "";
      }
      function Wg(t) {
        let e = "";
        for (let n = 0; n < t.style.length; n++) {
          const r = t.style.item(n);
          e += Qg(0, r, t.style.getPropertyValue(r));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (e += Qg(
              0,
              n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              t.style[n]
            ));
        t.setAttribute("style", e);
      }
      function Gg(t, e, n) {
        t.style &&
          (Object.keys(e).forEach((r) => {
            const s = ny(r);
            n && !n.hasOwnProperty(r) && (n[r] = t.style[s]),
              (t.style[s] = e[r]);
          }),
          fg() && Wg(t));
      }
      function Kg(t, e) {
        t.style &&
          (Object.keys(e).forEach((e) => {
            const n = ny(e);
            t.style[n] = "";
          }),
          fg() && Wg(t));
      }
      function Zg(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : ug(t)) : t;
      }
      const Yg = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function Jg(t) {
        let e = [];
        if ("string" == typeof t) {
          let n;
          for (; (n = Yg.exec(t)); ) e.push(n[1]);
          Yg.lastIndex = 0;
        }
        return e;
      }
      function Xg(t, e, n) {
        const r = t.toString(),
          s = r.replace(Yg, (t, r) => {
            let s = e[r];
            return (
              e.hasOwnProperty(r) ||
                (n.push("Please provide a value for the animation param " + r),
                (s = "")),
              s.toString()
            );
          });
        return s == r ? t : s;
      }
      function ty(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const ey = /-+([a-z0-9])/g;
      function ny(t) {
        return t.replace(ey, (...t) => t[1].toUpperCase());
      }
      function ry(t, e) {
        return 0 === t || 0 === e;
      }
      function sy(t, e, n) {
        const r = Object.keys(n);
        if (r.length && e.length) {
          let i = e[0],
            o = [];
          if (
            (r.forEach((t) => {
              i.hasOwnProperty(t) || o.push(t), (i[t] = n[t]);
            }),
            o.length)
          )
            for (var s = 1; s < e.length; s++) {
              let n = e[s];
              o.forEach(function (e) {
                n[e] = oy(t, e);
              });
            }
        }
        return e;
      }
      function iy(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(
              "Unable to resolve animation metadata node #" + e.type
            );
        }
      }
      function oy(t, e) {
        return window.getComputedStyle(t)[e];
      }
      const ay = "*";
      function ly(t, e) {
        const n = [];
        return (
          "string" == typeof t
            ? t.split(/\s*,\s*/).forEach((t) =>
                (function (t, e, n) {
                  if (":" == t[0]) {
                    const r = (function (t, e) {
                      switch (t) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, e) => parseFloat(e) > parseFloat(t);
                        case ":decrement":
                          return (t, e) => parseFloat(e) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${t}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(t, n);
                    if ("function" == typeof r) return void e.push(r);
                    t = r;
                  }
                  const r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${t}" is not supported`
                      ),
                      e
                    );
                  const s = r[1],
                    i = r[2],
                    o = r[3];
                  e.push(hy(s, o)),
                    "<" != i[0] || (s == ay && o == ay) || e.push(hy(o, s));
                })(t, n, e)
              )
            : n.push(t),
          n
        );
      }
      const uy = new Set(["true", "1"]),
        cy = new Set(["false", "0"]);
      function hy(t, e) {
        const n = uy.has(t) || cy.has(t),
          r = uy.has(e) || cy.has(e);
        return (s, i) => {
          let o = t == ay || t == s,
            a = e == ay || e == i;
          return (
            !o && n && "boolean" == typeof s && (o = s ? uy.has(t) : cy.has(t)),
            !a && r && "boolean" == typeof i && (a = i ? uy.has(e) : cy.has(e)),
            o && a
          );
        };
      }
      const dy = new RegExp("s*:selfs*,?", "g");
      function py(t, e, n) {
        return new fy(t).build(e, n);
      }
      class fy {
        constructor(t) {
          this._driver = t;
        }
        build(t, e) {
          const n = new my(e);
          return this._resetContextStyleTimingState(n), iy(this, Zg(t), n);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = {}),
            (t.collectedStyles[""] = {}),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let n = (e.queryCount = 0),
            r = (e.depCount = 0);
          const s = [],
            i = [];
          return (
            "@" == t.name.charAt(0) &&
              e.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            t.definitions.forEach((t) => {
              if ((this._resetContextStyleTimingState(e), 0 == t.type)) {
                const n = t,
                  r = n.name;
                r
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((t) => {
                    (n.name = t), s.push(this.visitState(n, e));
                  }),
                  (n.name = r);
              } else if (1 == t.type) {
                const s = this.visitTransition(t, e);
                (n += s.queryCount), (r += s.depCount), i.push(s);
              } else
                e.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: t.name,
              states: s,
              transitions: i,
              queryCount: n,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const n = this.visitStyle(t.styles, e),
            r = (t.options && t.options.params) || null;
          if (n.containsDynamicStyles) {
            const s = new Set(),
              i = r || {};
            if (
              (n.styles.forEach((t) => {
                if (gy(t)) {
                  const e = t;
                  Object.keys(e).forEach((t) => {
                    Jg(e[t]).forEach((t) => {
                      i.hasOwnProperty(t) || s.add(t);
                    });
                  });
                }
              }),
              s.size)
            ) {
              const n = ty(s.values());
              e.errors.push(
                `state("${
                  t.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: t.name,
            style: n,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const n = iy(this, Zg(t.animation), e);
          return {
            type: 1,
            matchers: ly(t.expr, e.errors),
            animation: n,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: yy(t.options),
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map((t) => iy(this, t, e)),
            options: yy(t.options),
          };
        }
        visitGroup(t, e) {
          const n = e.currentTime;
          let r = 0;
          const s = t.steps.map((t) => {
            e.currentTime = n;
            const s = iy(this, t, e);
            return (r = Math.max(r, e.currentTime)), s;
          });
          return (
            (e.currentTime = r),
            {
              type: 3,
              steps: s,
              options: yy(t.options),
            }
          );
        }
        visitAnimate(t, e) {
          const n = (function (t, e) {
            let n = null;
            if (t.hasOwnProperty("duration")) n = t;
            else if ("number" == typeof t) return _y(Hg(t, e).duration, 0, "");
            const r = t;
            if (
              r
                .split(/\s+/)
                .some((t) => "{" == t.charAt(0) && "{" == t.charAt(1))
            ) {
              const t = _y(0, 0, "");
              return (t.dynamic = !0), (t.strValue = r), t;
            }
            return (n = n || Hg(r, e)), _y(n.duration, n.delay, n.easing);
          })(t.timings, e.errors);
          let r;
          e.currentAnimateTimings = n;
          let s = t.styles ? t.styles : cg({});
          if (5 == s.type) r = this.visitKeyframes(s, e);
          else {
            let s = t.styles,
              i = !1;
            if (!s) {
              i = !0;
              const t = {};
              n.easing && (t.easing = n.easing), (s = cg(t));
            }
            e.currentTime += n.duration + n.delay;
            const o = this.visitStyle(s, e);
            (o.isEmptyStep = i), (r = o);
          }
          return (
            (e.currentAnimateTimings = null),
            {
              type: 4,
              timings: n,
              style: r,
              options: null,
            }
          );
        }
        visitStyle(t, e) {
          const n = this._makeStyleAst(t, e);
          return this._validateStyleAst(n, e), n;
        }
        _makeStyleAst(t, e) {
          const n = [];
          Array.isArray(t.styles)
            ? t.styles.forEach((t) => {
                "string" == typeof t
                  ? t == lg
                    ? n.push(t)
                    : e.errors.push(
                        `The provided style string value ${t} is not allowed.`
                      )
                  : n.push(t);
              })
            : n.push(t.styles);
          let r = !1,
            s = null;
          return (
            n.forEach((t) => {
              if (gy(t)) {
                const e = t,
                  n = e.easing;
                if ((n && ((s = n), delete e.easing), !r))
                  for (let t in e)
                    if (e[t].toString().indexOf("{{") >= 0) {
                      r = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: s,
              offset: t.offset,
              containsDynamicStyles: r,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const n = e.currentAnimateTimings;
          let r = e.currentTime,
            s = e.currentTime;
          n && s > 0 && (s -= n.duration + n.delay),
            t.styles.forEach((t) => {
              "string" != typeof t &&
                Object.keys(t).forEach((n) => {
                  if (!this._driver.validateStyleProperty(n))
                    return void e.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`
                    );
                  const i = e.collectedStyles[e.currentQuerySelector],
                    o = i[n];
                  let a = !0;
                  o &&
                    (s != r &&
                      s >= o.startTime &&
                      r <= o.endTime &&
                      (e.errors.push(
                        `The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${r}ms"`
                      ),
                      (a = !1)),
                    (s = o.startTime)),
                    a && (i[n] = { startTime: s, endTime: r }),
                    e.options &&
                      (function (t, e, n) {
                        const r = e.params || {},
                          s = Jg(t);
                        s.length &&
                          s.forEach((t) => {
                            r.hasOwnProperty(t) ||
                              n.push(
                                `Unable to resolve the local animation param ${t} in the given list of values`
                              );
                          });
                      })(t[n], e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const n = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              n
            );
          let r = 0;
          const s = [];
          let i = !1,
            o = !1,
            a = 0;
          const l = t.steps.map((t) => {
            const n = this._makeStyleAst(t, e);
            let l =
                null != n.offset
                  ? n.offset
                  : (function (t) {
                      if ("string" == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach((t) => {
                          if (gy(t) && t.hasOwnProperty("offset")) {
                            const n = t;
                            (e = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (gy(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        (e = parseFloat(n.offset)), delete n.offset;
                      }
                      return e;
                    })(n.styles),
              u = 0;
            return (
              null != l && (r++, (u = n.offset = l)),
              (o = o || u < 0 || u > 1),
              (i = i || u < a),
              (a = u),
              s.push(u),
              n
            );
          });
          o &&
            e.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            i &&
              e.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const u = t.steps.length;
          let c = 0;
          r > 0 && r < u
            ? e.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == r && (c = 1 / (u - 1));
          const h = u - 1,
            d = e.currentTime,
            p = e.currentAnimateTimings,
            f = p.duration;
          return (
            l.forEach((t, r) => {
              const i = c > 0 ? (r == h ? 1 : c * r) : s[r],
                o = i * f;
              (e.currentTime = d + p.delay + o),
                (p.duration = o),
                this._validateStyleAst(t, e),
                (t.offset = i),
                n.styles.push(t);
            }),
            n
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: iy(this, Zg(t.animation), e),
            options: yy(t.options),
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: yy(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: yy(t.options),
          };
        }
        visitQuery(t, e) {
          const n = e.currentQuerySelector,
            r = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [s, i] = (function (t) {
            const e = !!t.split(/\s*,\s*/).find((t) => ":self" == t);
            return (
              e && (t = t.replace(dy, "")),
              [
                (t = t
                  .replace(/@\*/g, Mg)
                  .replace(/@\w+/g, (t) => ".ng-trigger-" + t.substr(1))
                  .replace(/:animating/g, Vg)),
                e,
              ]
            );
          })(t.selector);
          (e.currentQuerySelector = n.length ? n + " " + s : s),
            bg(e.collectedStyles, e.currentQuerySelector, {});
          const o = iy(this, Zg(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = n),
            {
              type: 11,
              selector: s,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: i,
              animation: o,
              originalSelector: t.selector,
              options: yy(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push("stagger() can only be used inside of query()");
          const n =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Hg(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: iy(this, Zg(t.animation), e),
            timings: n,
            options: null,
          };
        }
      }
      class my {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function gy(t) {
        return !Array.isArray(t) && "object" == typeof t;
      }
      function yy(t) {
        var e;
        return (
          t
            ? (t = zg(t)).params && (t.params = (e = t.params) ? zg(e) : null)
            : (t = {}),
          t
        );
      }
      function _y(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function vy(t, e, n, r, s, i, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: r,
          duration: s,
          delay: i,
          totalTime: s + i,
          easing: o,
          subTimeline: a,
        };
      }
      class by {
        constructor() {
          this._map = new Map();
        }
        consume(t) {
          let e = this._map.get(t);
          return e ? this._map.delete(t) : (e = []), e;
        }
        append(t, e) {
          let n = this._map.get(t);
          n || this._map.set(t, (n = [])), n.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const wy = new RegExp(":enter", "g"),
        xy = new RegExp(":leave", "g");
      function Sy(t, e, n, r, s, i = {}, o = {}, a, l, u = []) {
        return new Ey().buildKeyframes(t, e, n, r, s, i, o, a, l, u);
      }
      class Ey {
        buildKeyframes(t, e, n, r, s, i, o, a, l, u = []) {
          l = l || new by();
          const c = new ky(t, e, l, r, s, u, []);
          (c.options = a),
            c.currentTimeline.setStyles([i], null, c.errors, a),
            iy(this, n, c);
          const h = c.timelines.filter((t) => t.containsAnimation());
          if (h.length && Object.keys(o).length) {
            const t = h[h.length - 1];
            t.allowOnlyTimelineStyles() || t.setStyles([o], null, c.errors, a);
          }
          return h.length
            ? h.map((t) => t.buildKeyframes())
            : [vy(e, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const n = e.subInstructions.consume(e.element);
          if (n) {
            const r = e.createSubContext(t.options),
              s = e.currentTimeline.currentTime,
              i = this._visitSubInstructions(n, r, r.options);
            s != i && e.transformIntoNewTimeline(i);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const n = e.createSubContext(t.options);
          n.transformIntoNewTimeline(),
            this.visitReference(t.animation, n),
            e.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _visitSubInstructions(t, e, n) {
          let r = e.currentTimeline.currentTime;
          const s = null != n.duration ? Bg(n.duration) : null,
            i = null != n.delay ? Bg(n.delay) : null;
          return (
            0 !== s &&
              t.forEach((t) => {
                const n = e.appendInstructionToTimeline(t, s, i);
                r = Math.max(r, n.duration + n.delay);
              }),
            r
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            iy(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const n = e.subContextCount;
          let r = e;
          const s = t.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((r = e.createSubContext(s)),
            r.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = Cy));
            const t = Bg(s.delay);
            r.delayNextStep(t);
          }
          t.steps.length &&
            (t.steps.forEach((t) => iy(this, t, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > n && r.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const n = [];
          let r = e.currentTimeline.currentTime;
          const s = t.options && t.options.delay ? Bg(t.options.delay) : 0;
          t.steps.forEach((i) => {
            const o = e.createSubContext(t.options);
            s && o.delayNextStep(s),
              iy(this, i, o),
              (r = Math.max(r, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach((t) => e.currentTimeline.mergeTimelineCollectedStyles(t)),
            e.transformIntoNewTimeline(r),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const n = t.strValue;
            return Hg(e.params ? Xg(n, e.params, e.errors) : n, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const n = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            r = e.currentTimeline;
          n.delay && (e.incrementTime(n.delay), r.snapshotCurrentStyles());
          const s = t.style;
          5 == s.type
            ? this.visitKeyframes(s, e)
            : (e.incrementTime(n.duration),
              this.visitStyle(s, e),
              r.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const n = e.currentTimeline,
            r = e.currentAnimateTimings;
          !r && n.getCurrentStyleProperties().length && n.forwardFrame();
          const s = (r && r.easing) || t.easing;
          t.isEmptyStep
            ? n.applyEmptyStep(s)
            : n.setStyles(t.styles, s, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const n = e.currentAnimateTimings,
            r = e.currentTimeline.duration,
            s = n.duration,
            i = e.createSubContext().currentTimeline;
          (i.easing = n.easing),
            t.styles.forEach((t) => {
              i.forwardTime((t.offset || 0) * s),
                i.setStyles(t.styles, t.easing, e.errors, e.options),
                i.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(i),
            e.transformIntoNewTimeline(r + s),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const n = e.currentTimeline.currentTime,
            r = t.options || {},
            s = r.delay ? Bg(r.delay) : 0;
          s &&
            (6 === e.previousNode.type ||
              (0 == n &&
                e.currentTimeline.getCurrentStyleProperties().length)) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = Cy));
          let i = n;
          const o = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!r.optional,
            e.errors
          );
          e.currentQueryTotal = o.length;
          let a = null;
          o.forEach((n, r) => {
            e.currentQueryIndex = r;
            const o = e.createSubContext(t.options, n);
            s && o.delayNextStep(s),
              n === e.element && (a = o.currentTimeline),
              iy(this, t.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (i = Math.max(i, o.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(i),
            a &&
              (e.currentTimeline.mergeTimelineCollectedStyles(a),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const n = e.parentContext,
            r = e.currentTimeline,
            s = t.timings,
            i = Math.abs(s.duration),
            o = i * (e.currentQueryTotal - 1);
          let a = i * e.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              a = o - a;
              break;
            case "full":
              a = n.currentStaggerTime;
          }
          const l = e.currentTimeline;
          a && l.delayNextStep(a);
          const u = l.currentTime;
          iy(this, t.animation, e),
            (e.previousNode = t),
            (n.currentStaggerTime =
              r.currentTime - u + (r.startTime - n.currentTimeline.startTime));
        }
      }
      const Cy = {};
      class ky {
        constructor(t, e, n, r, s, i, o, a) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = n),
            (this._enterClassName = r),
            (this._leaveClassName = s),
            (this.errors = i),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Cy),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = a || new Ty(this._driver, e, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const n = t;
          let r = this.options;
          null != n.duration && (r.duration = Bg(n.duration)),
            null != n.delay && (r.delay = Bg(n.delay));
          const s = n.params;
          if (s) {
            let t = r.params;
            t || (t = this.options.params = {}),
              Object.keys(s).forEach((n) => {
                (e && t.hasOwnProperty(n)) || (t[n] = Xg(s[n], t, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const n = (t.params = {});
              Object.keys(e).forEach((t) => {
                n[t] = e[t];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, n) {
          const r = e || this.element,
            s = new ky(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, n || 0)
            );
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(t),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = Cy),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, n) {
          const r = {
              duration: null != e ? e : t.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != n ? n : 0) +
                t.delay,
              easing: "",
            },
            s = new Ay(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              r,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(s), r;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, n, r, s, i) {
          let o = [];
          if ((r && o.push(this.element), t.length > 0)) {
            t = (t = t.replace(wy, "." + this._enterClassName)).replace(
              xy,
              "." + this._leaveClassName
            );
            let e = this._driver.query(this.element, t, 1 != n);
            0 !== n &&
              (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)),
              o.push(...e);
          }
          return (
            s ||
              0 != o.length ||
              i.push(
                `\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
              ),
            o
          );
        }
      }
      class Ty {
        constructor(t, e, n, r) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(
              e
            )),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new Ty(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          (this._localTimelineStyles[t] = e),
            (this._globalTimelineStyles[t] = e),
            (this._styleSummary[t] = {
              time: this.currentTime,
              value: e,
            });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && (this._previousKeyframe.easing = t),
            Object.keys(this._globalTimelineStyles).forEach((t) => {
              (this._backFill[t] = this._globalTimelineStyles[t] || lg),
                (this._currentKeyframe[t] = lg);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(t, e, n, r) {
          e && (this._previousKeyframe.easing = e);
          const s = (r && r.params) || {},
            i = (function (t, e) {
              const n = {};
              let r;
              return (
                t.forEach((t) => {
                  "*" === t
                    ? ((r = r || Object.keys(e)),
                      r.forEach((t) => {
                        n[t] = lg;
                      }))
                    : qg(t, !1, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          Object.keys(i).forEach((t) => {
            const e = Xg(i[t], s, n);
            (this._pendingStyles[t] = e),
              this._localTimelineStyles.hasOwnProperty(t) ||
                (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(
                  t
                )
                  ? this._globalTimelineStyles[t]
                  : lg),
              this._updateStyle(t, e);
          });
        }
        applyStylesToKeyframe() {
          const t = this._pendingStyles,
            e = Object.keys(t);
          0 != e.length &&
            ((this._pendingStyles = {}),
            e.forEach((e) => {
              this._currentKeyframe[e] = t[e];
            }),
            Object.keys(this._localTimelineStyles).forEach((t) => {
              this._currentKeyframe.hasOwnProperty(t) ||
                (this._currentKeyframe[t] = this._localTimelineStyles[t]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((t) => {
            const e = this._localTimelineStyles[t];
            (this._pendingStyles[t] = e), this._updateStyle(t, e);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          Object.keys(t._styleSummary).forEach((e) => {
            const n = this._styleSummary[e],
              r = t._styleSummary[e];
            (!n || r.time > n.time) && this._updateStyle(e, r.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((s, i) => {
            const o = qg(s, !0);
            Object.keys(o).forEach((n) => {
              const r = o[n];
              "!" == r ? t.add(n) : r == lg && e.add(n);
            }),
              n || (o.offset = i / this.duration),
              r.push(o);
          });
          const s = t.size ? ty(t.values()) : [],
            i = e.size ? ty(e.values()) : [];
          if (n) {
            const t = r[0],
              e = zg(t);
            (t.offset = 0), (e.offset = 1), (r = [t, e]);
          }
          return vy(
            this.element,
            r,
            s,
            i,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class Ay extends Ty {
        constructor(t, e, n, r, s, i, o = !1) {
          super(t, e, i.delay),
            (this.element = e),
            (this.keyframes = n),
            (this.preStyleProps = r),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = o),
            (this.timings = {
              duration: i.duration,
              delay: i.delay,
              easing: i.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: n, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const s = [],
              i = n + e,
              o = e / i,
              a = qg(t[0], !1);
            (a.offset = 0), s.push(a);
            const l = qg(t[0], !1);
            (l.offset = Iy(o)), s.push(l);
            const u = t.length - 1;
            for (let r = 1; r <= u; r++) {
              let o = qg(t[r], !1);
              (o.offset = Iy((e + o.offset * n) / i)), s.push(o);
            }
            (n = i), (e = 0), (r = ""), (t = s);
          }
          return vy(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            n,
            e,
            r,
            !0
          );
        }
      }
      function Iy(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class Oy {}
      class Ry extends Oy {
        normalizePropertyName(t, e) {
          return ny(t);
        }
        normalizeStyleValue(t, e, n, r) {
          let s = "";
          const i = n.toString().trim();
          if (Py[e] && 0 !== n && "0" !== n)
            if ("number" == typeof n) s = "px";
            else {
              const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              e &&
                0 == e[1].length &&
                r.push(`Please provide a CSS unit value for ${t}:${n}`);
            }
          return i + s;
        }
      }
      const Py = (() =>
        (function (t) {
          const e = {};
          return t.forEach((t) => (e[t] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function Ly(t, e, n, r, s, i, o, a, l, u, c, h, d) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: s,
          fromState: n,
          fromStyles: i,
          toState: r,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: h,
          errors: d,
        };
      }
      const Dy = {};
      class Ny {
        constructor(t, e, n) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = n);
        }
        match(t, e, n, r) {
          return (function (t, e, n, r, s) {
            return t.some((t) => t(e, n, r, s));
          })(this.ast.matchers, t, e, n, r);
        }
        buildStyles(t, e, n) {
          const r = this._stateStyles["*"],
            s = this._stateStyles[t],
            i = r ? r.buildStyles(e, n) : {};
          return s ? s.buildStyles(e, n) : i;
        }
        build(t, e, n, r, s, i, o, a, l, u) {
          const c = [],
            h = (this.ast.options && this.ast.options.params) || Dy,
            d = this.buildStyles(n, (o && o.params) || Dy, c),
            p = (a && a.params) || Dy,
            f = this.buildStyles(r, p, c),
            m = new Set(),
            g = new Map(),
            y = new Map(),
            _ = "void" === r,
            v = { params: Object.assign(Object.assign({}, h), p) },
            b = u ? [] : Sy(t, e, this.ast.animation, s, i, d, f, v, l, c);
          let w = 0;
          if (
            (b.forEach((t) => {
              w = Math.max(t.duration + t.delay, w);
            }),
            c.length)
          )
            return Ly(e, this._triggerName, n, r, _, d, f, [], [], g, y, w, c);
          b.forEach((t) => {
            const n = t.element,
              r = bg(g, n, {});
            t.preStyleProps.forEach((t) => (r[t] = !0));
            const s = bg(y, n, {});
            t.postStyleProps.forEach((t) => (s[t] = !0)), n !== e && m.add(n);
          });
          const x = ty(m.values());
          return Ly(e, this._triggerName, n, r, _, d, f, b, x, g, y, w);
        }
      }
      class Fy {
        constructor(t, e) {
          (this.styles = t), (this.defaultParams = e);
        }
        buildStyles(t, e) {
          const n = {},
            r = zg(this.defaultParams);
          return (
            Object.keys(t).forEach((e) => {
              const n = t[e];
              null != n && (r[e] = n);
            }),
            this.styles.styles.forEach((t) => {
              if ("string" != typeof t) {
                const s = t;
                Object.keys(s).forEach((t) => {
                  let i = s[t];
                  i.length > 1 && (i = Xg(i, r, e)), (n[t] = i);
                });
              }
            }),
            n
          );
        }
      }
      class jy {
        constructor(t, e) {
          (this.name = t),
            (this.ast = e),
            (this.transitionFactories = []),
            (this.states = {}),
            e.states.forEach((t) => {
              this.states[t.name] = new Fy(
                t.style,
                (t.options && t.options.params) || {}
              );
            }),
            My(this.states, "true", "1"),
            My(this.states, "false", "0"),
            e.transitions.forEach((e) => {
              this.transitionFactories.push(new Ny(t, e, this.states));
            }),
            (this.fallbackTransition = new Ny(
              t,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(t, e) => !0],
                options: null,
                queryCount: 0,
                depCount: 0,
              },
              this.states
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, n, r) {
          return (
            this.transitionFactories.find((s) => s.match(t, e, n, r)) || null
          );
        }
        matchStyles(t, e, n) {
          return this.fallbackTransition.buildStyles(t, e, n);
        }
      }
      function My(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      const Uy = new by();
      class Vy {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(t, e) {
          const n = [],
            r = py(this._driver, e, n);
          if (n.length)
            throw new Error(
              "Unable to build the animation due to the following errors: " +
                n.join("\n")
            );
          this._animations[t] = r;
        }
        _buildPlayer(t, e, n) {
          const r = t.element,
            s = gg(0, this._normalizer, 0, t.keyframes, e, n);
          return this._driver.animate(
            r,
            s,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, n = {}) {
          const r = [],
            s = this._animations[t];
          let i;
          const o = new Map();
          if (
            (s
              ? ((i = Sy(this._driver, e, s, Ng, Fg, {}, {}, n, Uy, r)),
                i.forEach((t) => {
                  const e = bg(o, t.element, {});
                  t.postStyleProps.forEach((t) => (e[t] = null));
                }))
              : (r.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (i = [])),
            r.length)
          )
            throw new Error(
              "Unable to create the animation due to the following errors: " +
                r.join("\n")
            );
          o.forEach((t, e) => {
            Object.keys(t).forEach((n) => {
              t[n] = this._driver.computeStyle(e, n, lg);
            });
          });
          const a = mg(
            i.map((t) => {
              const e = o.get(t.element);
              return this._buildPlayer(t, {}, e);
            })
          );
          return (
            (this._playersById[t] = a),
            a.onDestroy(() => this.destroy(t)),
            this.players.push(a),
            a
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), delete this._playersById[t];
          const n = this.players.indexOf(e);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(t) {
          const e = this._playersById[t];
          if (!e)
            throw new Error(
              "Unable to find the timeline player referenced by " + t
            );
          return e;
        }
        listen(t, e, n, r) {
          const s = vg(e, "", "", "");
          return yg(this._getPlayer(t), n, s, r), () => {};
        }
        command(t, e, n, r) {
          if ("register" == n) return void this.register(t, r[0]);
          if ("create" == n) return void this.create(t, e, r[0] || {});
          const s = this._getPlayer(t);
          switch (n) {
            case "play":
              s.play();
              break;
            case "pause":
              s.pause();
              break;
            case "reset":
              s.reset();
              break;
            case "restart":
              s.restart();
              break;
            case "finish":
              s.finish();
              break;
            case "init":
              s.init();
              break;
            case "setPosition":
              s.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const By = "ng-animate-queued",
        $y = "ng-animate-disabled",
        Hy = ".ng-animate-disabled",
        zy = [],
        qy = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        Qy = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        };
      class Wy {
        constructor(t, e = "") {
          this.namespaceId = e;
          const n = t && t.hasOwnProperty("value");
          if (((this.value = null != (r = n ? t.value : t) ? r : null), n)) {
            const e = zg(t);
            delete e.value, (this.options = e);
          } else this.options = {};
          var r;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const t = this.options.params;
            Object.keys(e).forEach((n) => {
              null == t[n] && (t[n] = e[n]);
            });
          }
        }
      }
      const Gy = "void",
        Ky = new Wy(Gy);
      class Zy {
        constructor(t, e, n) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            r_(e, this._hostClassName);
        }
        listen(t, e, n, r) {
          if (!this._triggers.hasOwnProperty(e))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${e}" because the provided event is undefined!`
            );
          if ("start" != (s = n) && "done" != s)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`
            );
          var s;
          const i = bg(this._elementListeners, t, []),
            o = { name: e, phase: n, callback: r };
          i.push(o);
          const a = bg(this._engine.statesByElement, t, {});
          return (
            a.hasOwnProperty(e) ||
              (r_(t, jg), r_(t, "ng-trigger-" + e), (a[e] = Ky)),
            () => {
              this._engine.afterFlush(() => {
                const t = i.indexOf(o);
                t >= 0 && i.splice(t, 1), this._triggers[e] || delete a[e];
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers[t] && ((this._triggers[t] = e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers[t];
          if (!e)
            throw new Error(
              `The provided animation trigger "${t}" has not been registered!`
            );
          return e;
        }
        trigger(t, e, n, r = !0) {
          const s = this._getTrigger(e),
            i = new Jy(this.id, e, t);
          let o = this._engine.statesByElement.get(t);
          o ||
            (r_(t, jg),
            r_(t, "ng-trigger-" + e),
            this._engine.statesByElement.set(t, (o = {})));
          let a = o[e];
          const l = new Wy(n, this.id);
          if (
            (!(n && n.hasOwnProperty("value")) &&
              a &&
              l.absorbOptions(a.options),
            (o[e] = l),
            a || (a = Ky),
            l.value !== Gy && a.value === l.value)
          ) {
            if (
              !(function (t, e) {
                const n = Object.keys(t),
                  r = Object.keys(e);
                if (n.length != r.length) return !1;
                for (let s = 0; s < n.length; s++) {
                  const r = n[s];
                  if (!e.hasOwnProperty(r) || t[r] !== e[r]) return !1;
                }
                return !0;
              })(a.params, l.params)
            ) {
              const e = [],
                n = s.matchStyles(a.value, a.params, e),
                r = s.matchStyles(l.value, l.params, e);
              e.length
                ? this._engine.reportError(e)
                : this._engine.afterFlush(() => {
                    Kg(t, n), Gg(t, r);
                  });
            }
            return;
          }
          const u = bg(this._engine.playersByElement, t, []);
          u.forEach((t) => {
            t.namespaceId == this.id &&
              t.triggerName == e &&
              t.queued &&
              t.destroy();
          });
          let c = s.matchTransition(a.value, l.value, t, l.params),
            h = !1;
          if (!c) {
            if (!r) return;
            (c = s.fallbackTransition), (h = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: c,
              fromState: a,
              toState: l,
              player: i,
              isFallbackTransition: h,
            }),
            h ||
              (r_(t, By),
              i.onStart(() => {
                s_(t, By);
              })),
            i.onDone(() => {
              let e = this.players.indexOf(i);
              e >= 0 && this.players.splice(e, 1);
              const n = this._engine.playersByElement.get(t);
              if (n) {
                let t = n.indexOf(i);
                t >= 0 && n.splice(t, 1);
              }
            }),
            this.players.push(i),
            u.push(i),
            i
          );
        }
        deregister(t) {
          delete this._triggers[t],
            this._engine.statesByElement.forEach((e, n) => {
              delete e[t];
            }),
            this._elementListeners.forEach((e, n) => {
              this._elementListeners.set(
                n,
                e.filter((e) => e.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach((t) => t.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const n = this._engine.driver.query(t, Mg, !0);
          n.forEach((t) => {
            if (t.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(t);
            n.size
              ? n.forEach((n) => n.triggerLeaveAnimation(t, e, !1, !0))
              : this.clearElementCache(t);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              n.forEach((t) => this.clearElementCache(t))
            );
        }
        triggerLeaveAnimation(t, e, n, r) {
          const s = this._engine.statesByElement.get(t);
          if (s) {
            const i = [];
            if (
              (Object.keys(s).forEach((e) => {
                if (this._triggers[e]) {
                  const n = this.trigger(t, e, Gy, r);
                  n && i.push(n);
                }
              }),
              i.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e),
                n && mg(i).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t);
          if (e) {
            const n = new Set();
            e.forEach((e) => {
              const r = e.name;
              if (n.has(r)) return;
              n.add(r);
              const s = this._triggers[r].fallbackTransition,
                i = this._engine.statesByElement.get(t)[r] || Ky,
                o = new Wy(Gy),
                a = new Jy(this.id, r, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: r,
                  transition: s,
                  fromState: i,
                  toState: o,
                  player: a,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const n = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let r = !1;
          if (n.totalAnimations) {
            const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
            if (e && e.length) r = !0;
            else {
              let e = t;
              for (; (e = e.parentNode); )
                if (n.statesByElement.get(e)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), r))
            n.markElementAsRemoved(this.id, t, !1, e);
          else {
            const r = t.__ng_removed;
            (r && r !== qy) ||
              (n.afterFlush(() => this.clearElementCache(t)),
              n.destroyInnerAnimations(t),
              n._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          r_(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((n) => {
              const r = n.player;
              if (r.destroyed) return;
              const s = n.element,
                i = this._elementListeners.get(s);
              i &&
                i.forEach((e) => {
                  if (e.name == n.triggerName) {
                    const r = vg(
                      s,
                      n.triggerName,
                      n.fromState.value,
                      n.toState.value
                    );
                    (r._data = t), yg(n.player, e.phase, r, e.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : e.push(n);
            }),
            (this._queue = []),
            e.sort((t, e) => {
              const n = t.transition.ast.depCount,
                r = e.transition.ast.depCount;
              return 0 == n || 0 == r
                ? n - r
                : this._engine.driver.containsElement(t.element, e.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((e) => e.element === t) || e),
            e
          );
        }
      }
      class Yy {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (t, e) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((e) => {
                e.queued && t.push(e);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const n = new Zy(t, e, this);
          return (
            e.parentNode
              ? this._balanceNamespaceList(n, e)
              : (this.newHostElements.set(e, n), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = n)
          );
        }
        _balanceNamespaceList(t, e) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let r = !1;
            for (let s = n; s >= 0; s--)
              if (
                this.driver.containsElement(
                  this._namespaceList[s].hostElement,
                  e
                )
              ) {
                this._namespaceList.splice(s + 1, 0, t), (r = !0);
                break;
              }
            r || this._namespaceList.splice(0, 0, t);
          } else this._namespaceList.push(t);
          return this.namespacesByHostElement.set(e, t), t;
        }
        register(t, e) {
          let n = this._namespaceLookup[t];
          return n || (n = this.createNamespace(t, e)), n;
        }
        registerTrigger(t, e, n) {
          let r = this._namespaceLookup[t];
          r && r.register(e, n) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const n = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement),
              delete this._namespaceLookup[t];
            const e = this._namespaceList.indexOf(n);
            e >= 0 && this._namespaceList.splice(e, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            n = this.statesByElement.get(t);
          if (n) {
            const t = Object.keys(n);
            for (let r = 0; r < t.length; r++) {
              const s = n[t[r]].namespaceId;
              if (s) {
                const t = this._fetchNamespace(s);
                t && e.add(t);
              }
            }
          }
          return e;
        }
        trigger(t, e, n, r) {
          if (Xy(e)) {
            const s = this._fetchNamespace(t);
            if (s) return s.trigger(e, n, r), !0;
          }
          return !1;
        }
        insertNode(t, e, n, r) {
          if (!Xy(e)) return;
          const s = e.__ng_removed;
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const t = this.collectedLeaveElements.indexOf(e);
            t >= 0 && this.collectedLeaveElements.splice(t, 1);
          }
          if (t) {
            const r = this._fetchNamespace(t);
            r && r.insertNode(e, n);
          }
          r && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), r_(t, $y))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), s_(t, $y));
        }
        removeNode(t, e, n, r) {
          if (Xy(e)) {
            const s = t ? this._fetchNamespace(t) : null;
            if (
              (s ? s.removeNode(e, r) : this.markElementAsRemoved(t, e, !1, r),
              n)
            ) {
              const n = this.namespacesByHostElement.get(e);
              n && n.id !== t && n.removeNode(e, r);
            }
          } else this._onRemovalComplete(e, r);
        }
        markElementAsRemoved(t, e, n, r) {
          this.collectedLeaveElements.push(e),
            (e.__ng_removed = {
              namespaceId: t,
              setForRemoval: r,
              hasAnimation: n,
              removedBeforeQueried: !1,
            });
        }
        listen(t, e, n, r, s) {
          return Xy(e) ? this._fetchNamespace(t).listen(e, n, r, s) : () => {};
        }
        _buildInstruction(t, e, n, r, s) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            n,
            r,
            t.fromState.options,
            t.toState.options,
            e,
            s
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, Mg, !0);
          e.forEach((t) => this.destroyActiveAnimationsForElement(t)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, Vg, !0)),
              e.forEach((t) => this.finishActiveQueriedAnimationOnElement(t)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((t) => {
              t.queued ? (t.markedForDestroy = !0) : t.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((t) => t.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return mg(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t.__ng_removed;
          if (e && e.setForRemoval) {
            if (((t.__ng_removed = qy), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const n = this._fetchNamespace(e.namespaceId);
              n && n.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          this.driver.matchesElement(t, Hy) &&
            this.markElementAsDisabled(t, !1),
            this.driver.query(t, Hy, !0).forEach((t) => {
              this.markElementAsDisabled(t, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((t, e) =>
                this._balanceNamespaceList(t, e)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              r_(this.collectedEnterElements[n], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              e = this._flushAnimations(n, t);
            } finally {
              for (let t = 0; t < n.length; t++) n[t]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((t) => t()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const t = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? mg(e).onDone(() => {
                    t.forEach((t) => t());
                  })
                : t.forEach((t) => t());
          }
        }
        reportError(t) {
          throw new Error(
            "Unable to process animations due to the following failed trigger transitions\n " +
              t.join("\n")
          );
        }
        _flushAnimations(t, e) {
          const n = new by(),
            r = [],
            s = new Map(),
            i = [],
            o = new Map(),
            a = new Map(),
            l = new Map(),
            u = new Set();
          this.disabledNodes.forEach((t) => {
            u.add(t);
            const e = this.driver.query(t, ".ng-animate-queued", !0);
            for (let n = 0; n < e.length; n++) u.add(e[n]);
          });
          const c = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            d = n_(h, this.collectedEnterElements),
            p = new Map();
          let f = 0;
          d.forEach((t, e) => {
            const n = Ng + f++;
            p.set(e, n), t.forEach((t) => r_(t, n));
          });
          const m = [],
            g = new Set(),
            y = new Set();
          for (let O = 0; O < this.collectedLeaveElements.length; O++) {
            const t = this.collectedLeaveElements[O],
              e = t.__ng_removed;
            e &&
              e.setForRemoval &&
              (m.push(t),
              g.add(t),
              e.hasAnimation
                ? this.driver
                    .query(t, ".ng-star-inserted", !0)
                    .forEach((t) => g.add(t))
                : y.add(t));
          }
          const _ = new Map(),
            v = n_(h, Array.from(g));
          v.forEach((t, e) => {
            const n = Fg + f++;
            _.set(e, n), t.forEach((t) => r_(t, n));
          }),
            t.push(() => {
              d.forEach((t, e) => {
                const n = p.get(e);
                t.forEach((t) => s_(t, n));
              }),
                v.forEach((t, e) => {
                  const n = _.get(e);
                  t.forEach((t) => s_(t, n));
                }),
                m.forEach((t) => {
                  this.processLeaveNode(t);
                });
            });
          const b = [],
            w = [];
          for (let O = this._namespaceList.length - 1; O >= 0; O--)
            this._namespaceList[O].drainQueuedTransitions(e).forEach((t) => {
              const e = t.player,
                s = t.element;
              if ((b.push(e), this.collectedEnterElements.length)) {
                const t = s.__ng_removed;
                if (t && t.setForMove) return void e.destroy();
              }
              const u = !c || !this.driver.containsElement(c, s),
                h = _.get(s),
                d = p.get(s),
                f = this._buildInstruction(t, n, d, h, u);
              if (f.errors && f.errors.length) w.push(f);
              else {
                if (u)
                  return (
                    e.onStart(() => Kg(s, f.fromStyles)),
                    e.onDestroy(() => Gg(s, f.toStyles)),
                    void r.push(e)
                  );
                if (t.isFallbackTransition)
                  return (
                    e.onStart(() => Kg(s, f.fromStyles)),
                    e.onDestroy(() => Gg(s, f.toStyles)),
                    void r.push(e)
                  );
                f.timelines.forEach((t) => (t.stretchStartingKeyframe = !0)),
                  n.append(s, f.timelines),
                  i.push({ instruction: f, player: e, element: s }),
                  f.queriedElements.forEach((t) => bg(o, t, []).push(e)),
                  f.preStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    if (n.length) {
                      let t = a.get(e);
                      t || a.set(e, (t = new Set())),
                        n.forEach((e) => t.add(e));
                    }
                  }),
                  f.postStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    let r = l.get(e);
                    r || l.set(e, (r = new Set())), n.forEach((t) => r.add(t));
                  });
              }
            });
          if (w.length) {
            const t = [];
            w.forEach((e) => {
              t.push(`@${e.triggerName} has failed due to:\n`),
                e.errors.forEach((e) => t.push(`- ${e}\n`));
            }),
              b.forEach((t) => t.destroy()),
              this.reportError(t);
          }
          const x = new Map(),
            S = new Map();
          i.forEach((t) => {
            const e = t.element;
            n.has(e) &&
              (S.set(e, e),
              this._beforeAnimationBuild(
                t.player.namespaceId,
                t.instruction,
                x
              ));
          }),
            r.forEach((t) => {
              const e = t.element;
              this._getPreviousPlayers(
                e,
                !1,
                t.namespaceId,
                t.triggerName,
                null
              ).forEach((t) => {
                bg(x, e, []).push(t), t.destroy();
              });
            });
          const E = m.filter((t) => o_(t, a, l)),
            C = new Map();
          e_(C, this.driver, y, l, lg).forEach((t) => {
            o_(t, a, l) && E.push(t);
          });
          const k = new Map();
          d.forEach((t, e) => {
            e_(k, this.driver, new Set(t), a, "!");
          }),
            E.forEach((t) => {
              const e = C.get(t),
                n = k.get(t);
              C.set(t, Object.assign(Object.assign({}, e), n));
            });
          const T = [],
            A = [],
            I = {};
          i.forEach((t) => {
            const { element: e, player: i, instruction: o } = t;
            if (n.has(e)) {
              if (u.has(e))
                return (
                  i.onDestroy(() => Gg(e, o.toStyles)),
                  (i.disabled = !0),
                  i.overrideTotalTime(o.totalTime),
                  void r.push(i)
                );
              let t = I;
              if (S.size > 1) {
                let n = e;
                const r = [];
                for (; (n = n.parentNode); ) {
                  const e = S.get(n);
                  if (e) {
                    t = e;
                    break;
                  }
                  r.push(n);
                }
                r.forEach((e) => S.set(e, t));
              }
              const n = this._buildAnimation(i.namespaceId, o, x, s, k, C);
              if ((i.setRealPlayer(n), t === I)) T.push(i);
              else {
                const e = this.playersByElement.get(t);
                e && e.length && (i.parentPlayer = mg(e)), r.push(i);
              }
            } else
              Kg(e, o.fromStyles),
                i.onDestroy(() => Gg(e, o.toStyles)),
                A.push(i),
                u.has(e) && r.push(i);
          }),
            A.forEach((t) => {
              const e = s.get(t.element);
              if (e && e.length) {
                const n = mg(e);
                t.setRealPlayer(n);
              }
            }),
            r.forEach((t) => {
              t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy();
            });
          for (let O = 0; O < m.length; O++) {
            const t = m[O],
              e = t.__ng_removed;
            if ((s_(t, Fg), e && e.hasAnimation)) continue;
            let n = [];
            if (o.size) {
              let e = o.get(t);
              e && e.length && n.push(...e);
              let r = this.driver.query(t, Vg, !0);
              for (let t = 0; t < r.length; t++) {
                let e = o.get(r[t]);
                e && e.length && n.push(...e);
              }
            }
            const r = n.filter((t) => !t.destroyed);
            r.length ? i_(this, t, r) : this.processLeaveNode(t);
          }
          return (
            (m.length = 0),
            T.forEach((t) => {
              this.players.push(t),
                t.onDone(() => {
                  t.destroy();
                  const e = this.players.indexOf(t);
                  this.players.splice(e, 1);
                }),
                t.play();
            }),
            T
          );
        }
        elementContainsData(t, e) {
          let n = !1;
          const r = e.__ng_removed;
          return (
            r && r.setForRemoval && (n = !0),
            this.playersByElement.has(e) && (n = !0),
            this.playersByQueriedElement.has(e) && (n = !0),
            this.statesByElement.has(e) && (n = !0),
            this._fetchNamespace(t).elementContainsData(e) || n
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, n, r, s) {
          let i = [];
          if (e) {
            const e = this.playersByQueriedElement.get(t);
            e && (i = e);
          } else {
            const e = this.playersByElement.get(t);
            if (e) {
              const t = !s || s == Gy;
              e.forEach((e) => {
                e.queued || ((t || e.triggerName == r) && i.push(e));
              });
            }
          }
          return (
            (n || r) &&
              (i = i.filter(
                (t) => !((n && n != t.namespaceId) || (r && r != t.triggerName))
              )),
            i
          );
        }
        _beforeAnimationBuild(t, e, n) {
          const r = e.element,
            s = e.isRemovalTransition ? void 0 : t,
            i = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const o of e.timelines) {
            const t = o.element,
              a = t !== r,
              l = bg(n, t, []);
            this._getPreviousPlayers(t, a, s, i, e.toState).forEach((t) => {
              const e = t.getRealPlayer();
              e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t);
            });
          }
          Kg(r, e.fromStyles);
        }
        _buildAnimation(t, e, n, r, s, i) {
          const o = e.triggerName,
            a = e.element,
            l = [],
            u = new Set(),
            c = new Set(),
            h = e.timelines.map((e) => {
              const h = e.element;
              u.add(h);
              const d = h.__ng_removed;
              if (d && d.removedBeforeQueried)
                return new dg(e.duration, e.delay);
              const p = h !== a,
                f = (function (t) {
                  const e = [];
                  return (
                    (function t(e, n) {
                      for (let r = 0; r < e.length; r++) {
                        const s = e[r];
                        s instanceof pg ? t(s.players, n) : n.push(s);
                      }
                    })(t, e),
                    e
                  );
                })((n.get(h) || zy).map((t) => t.getRealPlayer())).filter(
                  (t) => !!t.element && t.element === h
                ),
                m = s.get(h),
                g = i.get(h),
                y = gg(0, this._normalizer, 0, e.keyframes, m, g),
                _ = this._buildPlayer(e, y, f);
              if ((e.subTimeline && r && c.add(h), p)) {
                const e = new Jy(t, o, h);
                e.setRealPlayer(_), l.push(e);
              }
              return _;
            });
          l.forEach((t) => {
            bg(this.playersByQueriedElement, t.element, []).push(t),
              t.onDone(() =>
                (function (t, e, n) {
                  let r;
                  if (t instanceof Map) {
                    if (((r = t.get(e)), r)) {
                      if (r.length) {
                        const t = r.indexOf(n);
                        r.splice(t, 1);
                      }
                      0 == r.length && t.delete(e);
                    }
                  } else if (((r = t[e]), r)) {
                    if (r.length) {
                      const t = r.indexOf(n);
                      r.splice(t, 1);
                    }
                    0 == r.length && delete t[e];
                  }
                  return r;
                })(this.playersByQueriedElement, t.element, t)
              );
          }),
            u.forEach((t) => r_(t, Ug));
          const d = mg(h);
          return (
            d.onDestroy(() => {
              u.forEach((t) => s_(t, Ug)), Gg(a, e.toStyles);
            }),
            c.forEach((t) => {
              bg(r, t, []).push(d);
            }),
            d
          );
        }
        _buildPlayer(t, e, n) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                n
              )
            : new dg(t.duration, t.delay);
        }
      }
      class Jy {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = n),
            (this._player = new dg()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            Object.keys(this._queuedCallbacks).forEach((e) => {
              this._queuedCallbacks[e].forEach((n) => yg(t, e, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          bg(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function Xy(t) {
        return t && 1 === t.nodeType;
      }
      function t_(t, e) {
        const n = t.style.display;
        return (t.style.display = null != e ? e : "none"), n;
      }
      function e_(t, e, n, r, s) {
        const i = [];
        n.forEach((t) => i.push(t_(t)));
        const o = [];
        r.forEach((n, r) => {
          const i = {};
          n.forEach((t) => {
            const n = (i[t] = e.computeStyle(r, t, s));
            (n && 0 != n.length) || ((r.__ng_removed = Qy), o.push(r));
          }),
            t.set(r, i);
        });
        let a = 0;
        return n.forEach((t) => t_(t, i[a++])), o;
      }
      function n_(t, e) {
        const n = new Map();
        if ((t.forEach((t) => n.set(t, [])), 0 == e.length)) return n;
        const r = new Set(e),
          s = new Map();
        return (
          e.forEach((t) => {
            const e = (function t(e) {
              if (!e) return 1;
              let i = s.get(e);
              if (i) return i;
              const o = e.parentNode;
              return (i = n.has(o) ? o : r.has(o) ? 1 : t(o)), s.set(e, i), i;
            })(t);
            1 !== e && n.get(e).push(t);
          }),
          n
        );
      }
      function r_(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          let n = t.$$classes;
          n || (n = t.$$classes = {}), (n[e] = !0);
        }
      }
      function s_(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          let n = t.$$classes;
          n && delete n[e];
        }
      }
      function i_(t, e, n) {
        mg(n).onDone(() => t.processLeaveNode(e));
      }
      function o_(t, e, n) {
        const r = n.get(t);
        if (!r) return !1;
        let s = e.get(t);
        return s ? r.forEach((t) => s.add(t)) : e.set(t, r), n.delete(t), !0;
      }
      class a_ {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (t, e) => {}),
            (this._transitionEngine = new Yy(t, e, n)),
            (this._timelineEngine = new Vy(t, e, n)),
            (this._transitionEngine.onRemovalComplete = (t, e) =>
              this.onRemovalComplete(t, e));
        }
        registerTrigger(t, e, n, r, s) {
          const i = t + "-" + r;
          let o = this._triggerCache[i];
          if (!o) {
            const t = [],
              e = py(this._driver, s, t);
            if (t.length)
              throw new Error(
                `The animation trigger "${r}" has failed to build due to the following errors:\n - ${t.join(
                  "\n - "
                )}`
              );
            (o = (function (t, e) {
              return new jy(t, e);
            })(r, e)),
              (this._triggerCache[i] = o);
          }
          this._transitionEngine.registerTrigger(e, r, o);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, n, r) {
          this._transitionEngine.insertNode(t, e, n, r);
        }
        onRemove(t, e, n, r) {
          this._transitionEngine.removeNode(t, e, r || !1, n);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, n, r) {
          if ("@" == n.charAt(0)) {
            const [t, s] = wg(n);
            this._timelineEngine.command(t, e, s, r);
          } else this._transitionEngine.trigger(t, e, n, r);
        }
        listen(t, e, n, r, s) {
          if ("@" == n.charAt(0)) {
            const [t, r] = wg(n);
            return this._timelineEngine.listen(t, e, r, s);
          }
          return this._transitionEngine.listen(t, e, n, r, s);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function l_(t, e) {
        let n = null,
          r = null;
        return (
          Array.isArray(e) && e.length
            ? ((n = c_(e[0])), e.length > 1 && (r = c_(e[e.length - 1])))
            : e && (n = c_(e)),
          n || r ? new u_(t, n, r) : null
        );
      }
      let u_ = (() => {
        class t {
          constructor(e, n, r) {
            (this._element = e),
              (this._startStyles = n),
              (this._endStyles = r),
              (this._state = 0);
            let s = t.initialStylesByElement.get(e);
            s || t.initialStylesByElement.set(e, (s = {})),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Gg(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Gg(this._element, this._initialStyles),
                this._endStyles &&
                  (Gg(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Kg(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Kg(this._element, this._endStyles),
                  (this._endStyles = null)),
                Gg(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (t.initialStylesByElement = new WeakMap()), t;
      })();
      function c_(t) {
        let e = null;
        const n = Object.keys(t);
        for (let r = 0; r < n.length; r++) {
          const s = n[r];
          h_(s) && ((e = e || {}), (e[s] = t[s]));
        }
        return e;
      }
      function h_(t) {
        return "display" === t || "position" === t;
      }
      const d_ = "animation",
        p_ = "animationend";
      class f_ {
        constructor(t, e, n, r, s, i, o) {
          (this._element = t),
            (this._name = e),
            (this._duration = n),
            (this._delay = r),
            (this._easing = s),
            (this._fillMode = i),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (t) => this._handleCallback(t));
        }
        apply() {
          !(function (t, e) {
            const n = b_(t, "").trim();
            n.length &&
              ((function (t, e) {
                let n = 0;
                for (let r = 0; r < t.length; r++) "," === t.charAt(r) && n++;
              })(n),
              (e = `${n}, ${e}`)),
              v_(t, "", e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            __(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          m_(this._element, this._name, "paused");
        }
        resume() {
          m_(this._element, this._name, "running");
        }
        setPosition(t) {
          const e = g_(this._element, this._name);
          (this._position = t * this._duration),
            v_(this._element, "Delay", `-${this._position}ms`, e);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(t) {
          const e = t._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
          t.animationName == this._name &&
            Math.max(e - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            __(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (t, e) {
              const n = b_(t, "").split(","),
                r = y_(n, e);
              r >= 0 && (n.splice(r, 1), v_(t, "", n.join(",")));
            })(this._element, this._name));
        }
      }
      function m_(t, e, n) {
        v_(t, "PlayState", n, g_(t, e));
      }
      function g_(t, e) {
        const n = b_(t, "");
        return n.indexOf(",") > 0 ? y_(n.split(","), e) : y_([n], e);
      }
      function y_(t, e) {
        for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
        return -1;
      }
      function __(t, e, n) {
        n ? t.removeEventListener(p_, e) : t.addEventListener(p_, e);
      }
      function v_(t, e, n, r) {
        const s = d_ + e;
        if (null != r) {
          const e = t.style[s];
          if (e.length) {
            const t = e.split(",");
            (t[r] = n), (n = t.join(","));
          }
        }
        t.style[s] = n;
      }
      function b_(t, e) {
        return t.style[d_ + e];
      }
      class w_ {
        constructor(t, e, n, r, s, i, o, a) {
          (this.element = t),
            (this.keyframes = e),
            (this.animationName = n),
            (this._duration = r),
            (this._delay = s),
            (this._finalStyles = o),
            (this._specialStyles = a),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = i || "linear"),
            (this.totalTime = r + s),
            this._buildStyler();
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((t) => t()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(t) {
          this._styler.setPosition(t);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          this._styler.destroy(), this._buildStyler(), this._styler.apply();
        }
        _buildStyler() {
          this._styler = new f_(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
        beforeDestroy() {
          this.init();
          const t = {};
          if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach((n) => {
              "offset" != n &&
                (t[n] = e ? this._finalStyles[n] : oy(this.element, n));
            });
          }
          this.currentSnapshot = t;
        }
      }
      class x_ extends dg {
        constructor(t, e) {
          super(),
            (this.element = t),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = Pg(e));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((t) => {
              this._startingStyles[t] = this.element.style[t];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach((t) =>
              this.element.style.setProperty(t, this._styles[t])
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach((t) => {
              const e = this._startingStyles[t];
              e
                ? this.element.style.setProperty(t, e)
                : this.element.style.removeProperty(t);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class S_ {
        constructor() {
          (this._count = 0),
            (this._head = document.querySelector("head")),
            (this._warningIssued = !1);
        }
        validateStyleProperty(t) {
          return Ag(t);
        }
        matchesElement(t, e) {
          return Ig(t, e);
        }
        containsElement(t, e) {
          return Og(t, e);
        }
        query(t, e, n) {
          return Rg(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        buildKeyframeElement(t, e, n) {
          n = n.map((t) => Pg(t));
          let r = `@keyframes ${e} {\n`,
            s = "";
          n.forEach((t) => {
            s = " ";
            const e = parseFloat(t.offset);
            (r += `${s}${100 * e}% {\n`),
              (s += " "),
              Object.keys(t).forEach((e) => {
                const n = t[e];
                switch (e) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      n && (r += `${s}animation-timing-function: ${n};\n`)
                    );
                  default:
                    return void (r += `${s}${e}: ${n};\n`);
                }
              }),
              (r += s + "}\n");
          }),
            (r += "}\n");
          const i = document.createElement("style");
          return (i.innerHTML = r), i;
        }
        animate(t, e, n, r, s, i = [], o) {
          o && this._notifyFaultyScrubber();
          const a = i.filter((t) => t instanceof w_),
            l = {};
          ry(n, r) &&
            a.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (l[t] = e[t]));
            });
          const u = (function (t) {
            let e = {};
            return (
              t &&
                (Array.isArray(t) ? t : [t]).forEach((t) => {
                  Object.keys(t).forEach((n) => {
                    "offset" != n && "easing" != n && (e[n] = t[n]);
                  });
                }),
              e
            );
          })((e = sy(t, e, l)));
          if (0 == n) return new x_(t, u);
          const c = "gen_css_kf_" + this._count++,
            h = this.buildKeyframeElement(t, c, e);
          document.querySelector("head").appendChild(h);
          const d = l_(t, e),
            p = new w_(t, e, c, n, r, s, u, d);
          return (
            p.onDestroy(() => {
              var t;
              (t = h).parentNode.removeChild(t);
            }),
            p
          );
        }
        _notifyFaultyScrubber() {
          this._warningIssued ||
            (console.warn(
              "@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n",
              "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."
            ),
            (this._warningIssued = !0));
        }
      }
      class E_ {
        constructor(t, e, n, r) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = n),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(t, e, n) {
          return t.animate(e, n);
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          this.domPlayer.currentTime = t * this.time;
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((e) => {
              "offset" != e &&
                (t[e] = this._finished
                  ? this._finalKeyframe[e]
                  : oy(this.element, e));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class C_ {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            k_().toString()
          )),
            (this._cssKeyframesDriver = new S_());
        }
        validateStyleProperty(t) {
          return Ag(t);
        }
        matchesElement(t, e) {
          return Ig(t, e);
        }
        containsElement(t, e) {
          return Og(t, e);
        }
        query(t, e, n) {
          return Rg(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        overrideWebAnimationsSupport(t) {
          this._isNativeImpl = t;
        }
        animate(t, e, n, r, s, i = [], o) {
          if (!o && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(t, e, n, r, s, i);
          const a = {
            duration: n,
            delay: r,
            fill: 0 == r ? "both" : "forwards",
          };
          s && (a.easing = s);
          const l = {},
            u = i.filter((t) => t instanceof E_);
          ry(n, r) &&
            u.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (l[t] = e[t]));
            });
          const c = l_(t, (e = sy(t, (e = e.map((t) => qg(t, !1))), l)));
          return new E_(t, e, a, c);
        }
      }
      function k_() {
        return (
          ("undefined" != typeof window &&
            void 0 !== window.document &&
            Element.prototype.animate) ||
          {}
        );
      }
      let T_ = (() => {
        class t extends ag {
          constructor(t, e) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(e.body, {
                id: "0",
                encapsulation: he.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const e = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(t) ? ug(t) : t;
            return (
              O_(this._renderer, null, e, "register", [n]),
              new A_(e, this._renderer)
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(na), Zt(ou));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class A_ extends class {} {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new I_(this._id, t, e || {}, this._renderer);
        }
      }
      class I_ {
        constructor(t, e, n, r) {
          (this.id = t),
            (this.element = e),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", n);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return O_(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset");
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          return 0;
        }
      }
      function O_(t, e, n, r, s) {
        return t.setProperty(e, `@@${n}:${r}`, s);
      }
      const R_ = "@",
        P_ = "@.disabled";
      let L_ = (() => {
        class t {
          constructor(t, e, n) {
            (this.delegate = t),
              (this.engine = e),
              (this._zone = n),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (e.onRemovalComplete = (t, e) => {
                e && e.parentNode(t) && e.removeChild(t.parentNode, t);
              });
          }
          createRenderer(t, e) {
            const n = this.delegate.createRenderer(t, e);
            if (!(t && e && e.data && e.data.animation)) {
              let t = this._rendererCache.get(n);
              return (
                t ||
                  ((t = new D_("", n, this.engine)),
                  this._rendererCache.set(n, t)),
                t
              );
            }
            const r = e.id,
              s = e.id + "-" + this._currentId;
            this._currentId++, this.engine.register(s, t);
            const i = (e) => {
              Array.isArray(e)
                ? e.forEach(i)
                : this.engine.registerTrigger(r, s, t, e.name, e);
            };
            return e.data.animation.forEach(i), new N_(this, s, n, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, e, n) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => e(n))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((t) => {
                        const [e, n] = t;
                        e(n);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([e, n]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(na), Zt(a_), Zt(Il));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class D_ {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode
              ? (t) => e.destroyNode(t)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, n) {
          this.delegate.insertBefore(t, e, n),
            this.engine.onInsert(this.namespaceId, e, t, !0);
        }
        removeChild(t, e, n) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, n);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, n, r) {
          this.delegate.setAttribute(t, e, n, r);
        }
        removeAttribute(t, e, n) {
          this.delegate.removeAttribute(t, e, n);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, n, r) {
          this.delegate.setStyle(t, e, n, r);
        }
        removeStyle(t, e, n) {
          this.delegate.removeStyle(t, e, n);
        }
        setProperty(t, e, n) {
          e.charAt(0) == R_ && e == P_
            ? this.disableAnimations(t, !!n)
            : this.delegate.setProperty(t, e, n);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, n) {
          return this.delegate.listen(t, e, n);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class N_ extends D_ {
        constructor(t, e, n, r) {
          super(e, n, r), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, n) {
          e.charAt(0) == R_
            ? "." == e.charAt(1) && e == P_
              ? this.disableAnimations(t, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, t, e.substr(1), n)
            : this.delegate.setProperty(t, e, n);
        }
        listen(t, e, n) {
          if (e.charAt(0) == R_) {
            const r = (function (t) {
              switch (t) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return t;
              }
            })(t);
            let s = e.substr(1),
              i = "";
            return (
              s.charAt(0) != R_ &&
                ([s, i] = (function (t) {
                  const e = t.indexOf(".");
                  return [t.substring(0, e), t.substr(e + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, r, s, i, (t) => {
                this.factory.scheduleListenerCallback(t._data || -1, n, t);
              })
            );
          }
          return this.delegate.listen(t, e, n);
        }
      }
      let F_ = (() => {
        class t extends a_ {
          constructor(t, e, n) {
            super(t.body, e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Zt(ou), Zt(Dg), Zt(Oy));
          }),
          (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const j_ = new Ut("AnimationModuleType"),
        M_ = [
          {
            provide: Dg,
            useFactory: function () {
              return "function" == typeof k_() ? new C_() : new S_();
            },
          },
          { provide: j_, useValue: "BrowserAnimations" },
          { provide: ag, useClass: T_ },
          {
            provide: Oy,
            useFactory: function () {
              return new Ry();
            },
          },
          { provide: a_, useClass: F_ },
          {
            provide: na,
            useFactory: function (t, e, n) {
              return new L_(t, e, n);
            },
            deps: [ec, a_, Il],
          },
        ];
      let U_ = (() => {
        class t {}
        return (
          (t.ɵmod = ve({ type: t })),
          (t.ɵinj = dt({
            factory: function (e) {
              return new (e || t)();
            },
            providers: M_,
            imports: [mc],
          })),
          t
        );
      })();
      const V_ = new aa("10.2.2"),
        B_ = new Ut("mat-sanity-checks", {
          providedIn: "root",
          factory: function () {
            return !0;
          },
        });
      let $_,
        H_ = (() => {
          class t {
            constructor(t, e, n) {
              (this._hasDoneGlobalChecks = !1),
                (this._document = n),
                t._applyBodyHighContrastModeCssClasses(),
                (this._sanityChecks = e),
                this._hasDoneGlobalChecks ||
                  (this._checkDoctypeIsDefined(),
                  this._checkThemeIsPresent(),
                  this._checkCdkVersionMatch(),
                  (this._hasDoneGlobalChecks = !0));
            }
            _getDocument() {
              const t = this._document || document;
              return "object" == typeof t && t ? t : null;
            }
            _getWindow() {
              const t = this._getDocument(),
                e = (null == t ? void 0 : t.defaultView) || window;
              return "object" == typeof e && e ? e : null;
            }
            _checksAreEnabled() {
              return kr() && !this._isTestEnv();
            }
            _isTestEnv() {
              const t = this._getWindow();
              return t && (t.__karma__ || t.jasmine);
            }
            _checkDoctypeIsDefined() {
              const t =
                  this._checksAreEnabled() &&
                  (!0 === this._sanityChecks || this._sanityChecks.doctype),
                e = this._getDocument();
              t &&
                e &&
                !e.doctype &&
                console.warn(
                  "Current document does not have a doctype. This may cause some Angular Material components not to behave as expected."
                );
            }
            _checkThemeIsPresent() {
              const t =
                  !this._checksAreEnabled() ||
                  !1 === this._sanityChecks ||
                  !this._sanityChecks.theme,
                e = this._getDocument();
              if (t || !e || !e.body || "function" != typeof getComputedStyle)
                return;
              const n = e.createElement("div");
              n.classList.add("mat-theme-loaded-marker"), e.body.appendChild(n);
              const r = getComputedStyle(n);
              r &&
                "none" !== r.display &&
                console.warn(
                  "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"
                ),
                e.body.removeChild(n);
            }
            _checkCdkVersionMatch() {
              this._checksAreEnabled() &&
                (!0 === this._sanityChecks || this._sanityChecks.version) &&
                V_.full !== og.full &&
                console.warn(
                  "The Angular Material version (" +
                    V_.full +
                    ") does not match the Angular CDK version (" +
                    og.full +
                    ").\nPlease ensure the versions of these two packages exactly match."
                );
            }
          }
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)(Zt(ig), Zt(B_, 8), Zt(ou, 8));
              },
              imports: [[Gf], Gf],
            })),
            t
          );
        })();
      function z_(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = Gm(t);
          }
        };
      }
      function q_(t, e) {
        return class extends t {
          constructor(...t) {
            super(...t), (this.defaultColor = e), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const e = t || this.defaultColor;
            e !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  "mat-" + this._color
                ),
              e && this._elementRef.nativeElement.classList.add("mat-" + e),
              (this._color = e));
          }
        };
      }
      function Q_(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = Gm(t);
          }
        };
      }
      function W_(t, e = 0) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._tabIndex = e), (this.defaultTabIndex = e);
          }
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(t) {
            this._tabIndex = null != t ? Km(t) : this.defaultTabIndex;
          }
        };
      }
      try {
        $_ = "undefined" != typeof Intl;
      } catch (ab) {
        $_ = !1;
      }
      class G_ {
        constructor(t, e, n) {
          (this._renderer = t),
            (this.element = e),
            (this.config = n),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const K_ = { enterDuration: 450, exitDuration: 400 },
        Z_ = Wm({ passive: !0 }),
        Y_ = ["mousedown", "touchstart"],
        J_ = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class X_ {
        constructor(t, e, n, r) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = Zm(n));
        }
        fadeInRipple(t, e, n = {}) {
          const r = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            s = Object.assign(Object.assign({}, K_), n.animation);
          n.centered &&
            ((t = r.left + r.width / 2), (e = r.top + r.height / 2));
          const i =
              n.radius ||
              (function (t, e, n) {
                const r = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                  s = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                return Math.sqrt(r * r + s * s);
              })(t, e, r),
            o = t - r.left,
            a = e - r.top,
            l = s.enterDuration,
            u = document.createElement("div");
          u.classList.add("mat-ripple-element"),
            (u.style.left = o - i + "px"),
            (u.style.top = a - i + "px"),
            (u.style.height = 2 * i + "px"),
            (u.style.width = 2 * i + "px"),
            null != n.color && (u.style.backgroundColor = n.color),
            (u.style.transitionDuration = l + "ms"),
            this._containerElement.appendChild(u),
            window.getComputedStyle(u).getPropertyValue("opacity"),
            (u.style.transform = "scale(1)");
          const c = new G_(this, u, n);
          return (
            (c.state = 0),
            this._activeRipples.add(c),
            n.persistent || (this._mostRecentTransientRipple = c),
            this._runTimeoutOutsideZone(() => {
              const t = c === this._mostRecentTransientRipple;
              (c.state = 1),
                n.persistent || (t && this._isPointerDown) || c.fadeOut();
            }, l),
            c
          );
        }
        fadeOutRipple(t) {
          const e = this._activeRipples.delete(t);
          if (
            (t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !e)
          )
            return;
          const n = t.element,
            r = Object.assign(Object.assign({}, K_), t.config.animation);
          (n.style.transitionDuration = r.exitDuration + "ms"),
            (n.style.opacity = "0"),
            (t.state = 2),
            this._runTimeoutOutsideZone(() => {
              (t.state = 3), n.parentNode.removeChild(n);
            }, r.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach((t) => t.fadeOut());
        }
        setupTriggerEvents(t) {
          const e = Zm(t);
          e &&
            e !== this._triggerElement &&
            (this._removeTriggerEvents(),
            (this._triggerElement = e),
            this._registerEvents(Y_));
        }
        handleEvent(t) {
          "mousedown" === t.type
            ? this._onMousedown(t)
            : "touchstart" === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(J_),
              (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(t) {
          const e = Ym(t),
            n =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          this._target.rippleDisabled ||
            e ||
            n ||
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let t = 0; t < e.length; t++)
              this.fadeInRipple(
                e[t].clientX,
                e[t].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._activeRipples.forEach((t) => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(t, e = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(t, e));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach((t) => {
              this._triggerElement.addEventListener(t, this, Z_);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (Y_.forEach((t) => {
              this._triggerElement.removeEventListener(t, this, Z_);
            }),
            this._pointerUpEventsRegistered &&
              J_.forEach((t) => {
                this._triggerElement.removeEventListener(t, this, Z_);
              }));
        }
      }
      const tv = new Ut("mat-ripple-global-options");
      let ev = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this._elementRef = t),
                (this._animationMode = s),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = r || {}),
                (this._rippleRenderer = new X_(this, e, t, n));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = t), this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(
                  Object.assign(
                    Object.assign({}, this._globalOptions.animation),
                    "NoopAnimations" === this._animationMode
                      ? { enterDuration: 0, exitDuration: 0 }
                      : {}
                  ),
                  this.animation
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(t, e = 0, n) {
              return "number" == typeof t
                ? this._rippleRenderer.fadeInRipple(
                    t,
                    e,
                    Object.assign(Object.assign({}, this.rippleConfig), n)
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Object.assign(Object.assign({}, this.rippleConfig), t)
                  );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(ta), vo(Il), vo(qm), vo(tv, 8), vo(j_, 8));
            }),
            (t.ɵdir = we({
              type: t,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && Do("mat-ripple-unbounded", e.unbounded);
              },
              inputs: {
                radius: ["matRippleRadius", "radius"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                animation: ["matRippleAnimation", "animation"],
              },
              exportAs: ["matRipple"],
            })),
            t
          );
        })(),
        nv = (() => {
          class t {}
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[H_, Qm], H_],
            })),
            t
          );
        })();
      const rv = ["mat-button", ""],
        sv = ["*"],
        iv = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab",
        ];
      class ov {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const av = q_(z_(Q_(ov)));
      let lv = (() => {
          class t extends av {
            constructor(t, e, n) {
              super(t),
                (this._focusMonitor = e),
                (this._animationMode = n),
                (this.isRoundButton = this._hasHostAttributes(
                  "mat-fab",
                  "mat-mini-fab"
                )),
                (this.isIconButton = this._hasHostAttributes(
                  "mat-icon-button"
                ));
              for (const r of iv)
                this._hasHostAttributes(r) &&
                  this._getHostElement().classList.add(r);
              t.nativeElement.classList.add("mat-button-base"),
                this.isRoundButton && (this.color = "accent");
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(t = "program", e) {
              this._focusMonitor.focusVia(this._getHostElement(), t, e);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...t) {
              return t.some((t) => this._getHostElement().hasAttribute(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(ta), vo(tg), vo(j_, 8));
            }),
            (t.ɵcmp = me({
              type: t,
              selectors: [
                ["button", "mat-button", ""],
                ["button", "mat-raised-button", ""],
                ["button", "mat-icon-button", ""],
                ["button", "mat-fab", ""],
                ["button", "mat-mini-fab", ""],
                ["button", "mat-stroked-button", ""],
                ["button", "mat-flat-button", ""],
              ],
              viewQuery: function (t, e) {
                var n;
                1 & t && il(ev, !0),
                  2 & t && sl((n = ol())) && (e.ripple = n.first);
              },
              hostAttrs: [1, "mat-focus-indicator"],
              hostVars: 5,
              hostBindings: function (t, e) {
                2 & t &&
                  (yo("disabled", e.disabled || null),
                  Do(
                    "_mat-animation-noopable",
                    "NoopAnimations" === e._animationMode
                  )("mat-button-disabled", e.disabled));
              },
              inputs: {
                disabled: "disabled",
                disableRipple: "disableRipple",
                color: "color",
              },
              exportAs: ["matButton"],
              features: [so],
              attrs: rv,
              ngContentSelectors: sv,
              decls: 4,
              vars: 5,
              consts: [
                [1, "mat-button-wrapper"],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-button-ripple",
                  3,
                  "matRippleDisabled",
                  "matRippleCentered",
                  "matRippleTrigger",
                ],
                [1, "mat-button-focus-overlay"],
              ],
              template: function (t, e) {
                1 & t &&
                  ((function (t) {
                    const e = nn()[16][6];
                    if (!e.projection) {
                      const t = (e.projection = oe(1, null)),
                        n = t.slice();
                      let r = e.child;
                      for (; null !== r; ) {
                        const e = 0;
                        null !== e &&
                          (n[e] ? (n[e].projectionNext = r) : (t[e] = r),
                          (n[e] = r)),
                          (r = r.next);
                      }
                    }
                  })(),
                  So(0, "span", 0),
                  (function (t, e = 0, n) {
                    const r = nn(),
                      s = rn(),
                      i = Es(s, r[6], t, 1, null, n || null);
                    null === i.projection && (i.projection = e),
                      ln(),
                      (function (t, e, n) {
                        ki(
                          e[11],
                          0,
                          e,
                          n,
                          gi(t, n, e),
                          wi(n.parent || e[6], e)
                        );
                      })(s, r, i);
                  })(1),
                  Eo(),
                  Co(2, "span", 1),
                  Co(3, "span", 2)),
                  2 & t &&
                    (ps(2),
                    Do(
                      "mat-button-ripple-round",
                      e.isRoundButton || e.isIconButton
                    ),
                    wo("matRippleDisabled", e._isRippleDisabled())(
                      "matRippleCentered",
                      e.isIconButton
                    )("matRippleTrigger", e._getHostElement()));
              },
              directives: [ev],
              styles: [
                ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.cdk-high-contrast-active .mat-button-focus-overlay{background-color:#fff}.cdk-high-contrast-black-on-white .mat-button-focus-overlay{background-color:#000}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        uv = (() => {
          class t {}
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[nv, H_], H_],
            })),
            t
          );
        })();
      const cv = new Ut("NgValueAccessor"),
        hv = ["sliderWrapper"],
        dv = Wm({ passive: !1 }),
        pv = { provide: cv, useExisting: Et(() => yv), multi: !0 };
      class fv {}
      class mv {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const gv = W_(q_(z_(mv), "accent"));
      let yv = (() => {
        class t extends gv {
          constructor(t, e, n, r, s, i, o, a) {
            super(t),
              (this._focusMonitor = e),
              (this._changeDetectorRef = n),
              (this._dir = r),
              (this._ngZone = i),
              (this._animationMode = a),
              (this._invert = !1),
              (this._max = 100),
              (this._min = 0),
              (this._step = 1),
              (this._thumbLabel = !1),
              (this._tickInterval = 0),
              (this._value = null),
              (this._vertical = !1),
              (this.change = new Wa()),
              (this.input = new Wa()),
              (this.valueChange = new Wa()),
              (this.onTouched = () => {}),
              (this._percent = 0),
              (this._isSliding = !1),
              (this._isActive = !1),
              (this._tickIntervalPercent = 0),
              (this._sliderDimensions = null),
              (this._controlValueAccessorChangeFn = () => {}),
              (this._dirChangeSubscription = h.EMPTY),
              (this._pointerDown = (t) => {
                this.disabled ||
                  this._isSliding ||
                  (!_v(t) && 0 !== t.button) ||
                  this._ngZone.run(() => {
                    const e = this.value,
                      n = vv(t);
                    (this._isSliding = !0),
                      (this._lastPointerEvent = t),
                      t.preventDefault(),
                      this._focusHostElement(),
                      this._onMouseenter(),
                      this._bindGlobalEvents(t),
                      this._focusHostElement(),
                      this._updateValueFromPosition(n),
                      (this._valueOnSlideStart = e),
                      e != this.value && this._emitInputEvent();
                  });
              }),
              (this._pointerMove = (t) => {
                if (this._isSliding) {
                  t.preventDefault();
                  const e = this.value;
                  (this._lastPointerEvent = t),
                    this._updateValueFromPosition(vv(t)),
                    e != this.value && this._emitInputEvent();
                }
              }),
              (this._pointerUp = (t) => {
                this._isSliding &&
                  (t.preventDefault(),
                  this._removeGlobalEvents(),
                  (this._isSliding = !1),
                  this._valueOnSlideStart == this.value ||
                    this.disabled ||
                    this._emitChangeEvent(),
                  (this._valueOnSlideStart = this._lastPointerEvent = null));
              }),
              (this._windowBlur = () => {
                this._lastPointerEvent &&
                  this._pointerUp(this._lastPointerEvent);
              }),
              (this._document = o),
              (this.tabIndex = parseInt(s) || 0),
              i.runOutsideAngular(() => {
                const e = t.nativeElement;
                e.addEventListener("mousedown", this._pointerDown, dv),
                  e.addEventListener("touchstart", this._pointerDown, dv);
              });
          }
          get invert() {
            return this._invert;
          }
          set invert(t) {
            this._invert = Gm(t);
          }
          get max() {
            return this._max;
          }
          set max(t) {
            (this._max = Km(t, this._max)),
              (this._percent = this._calculatePercentage(this._value)),
              this._changeDetectorRef.markForCheck();
          }
          get min() {
            return this._min;
          }
          set min(t) {
            (this._min = Km(t, this._min)),
              null === this._value && (this.value = this._min),
              (this._percent = this._calculatePercentage(this._value)),
              this._changeDetectorRef.markForCheck();
          }
          get step() {
            return this._step;
          }
          set step(t) {
            (this._step = Km(t, this._step)),
              this._step % 1 != 0 &&
                (this._roundToDecimal = this._step
                  .toString()
                  .split(".")
                  .pop().length),
              this._changeDetectorRef.markForCheck();
          }
          get thumbLabel() {
            return this._thumbLabel;
          }
          set thumbLabel(t) {
            this._thumbLabel = Gm(t);
          }
          get tickInterval() {
            return this._tickInterval;
          }
          set tickInterval(t) {
            this._tickInterval =
              "auto" === t
                ? "auto"
                : "number" == typeof t || "string" == typeof t
                ? Km(t, this._tickInterval)
                : 0;
          }
          get value() {
            return (
              null === this._value && (this.value = this._min), this._value
            );
          }
          set value(t) {
            if (t !== this._value) {
              let e = Km(t);
              this._roundToDecimal &&
                (e = parseFloat(e.toFixed(this._roundToDecimal))),
                (this._value = e),
                (this._percent = this._calculatePercentage(this._value)),
                this._changeDetectorRef.markForCheck();
            }
          }
          get vertical() {
            return this._vertical;
          }
          set vertical(t) {
            this._vertical = Gm(t);
          }
          get displayValue() {
            return this.displayWith
              ? this.displayWith(this.value)
              : this._roundToDecimal && this.value && this.value % 1 != 0
              ? this.value.toFixed(this._roundToDecimal)
              : this.value || 0;
          }
          focus(t) {
            this._focusHostElement(t);
          }
          blur() {
            this._blurHostElement();
          }
          get percent() {
            return this._clamp(this._percent);
          }
          _shouldInvertAxis() {
            return this.vertical ? !this.invert : this.invert;
          }
          _isMinValue() {
            return 0 === this.percent;
          }
          _getThumbGap() {
            return this.disabled
              ? 7
              : this._isMinValue() && !this.thumbLabel
              ? this._isActive
                ? 10
                : 7
              : 0;
          }
          _getTrackBackgroundStyles() {
            const t = this.vertical
              ? `1, ${1 - this.percent}, 1`
              : 1 - this.percent + ", 1, 1";
            return {
              transform: `translate${this.vertical ? "Y" : "X"}(${
                this._shouldInvertMouseCoords() ? "-" : ""
              }${this._getThumbGap()}px) scale3d(${t})`,
            };
          }
          _getTrackFillStyles() {
            const t = this.percent,
              e = this.vertical ? `1, ${t}, 1` : t + ", 1, 1";
            return {
              transform: `translate${this.vertical ? "Y" : "X"}(${
                this._shouldInvertMouseCoords() ? "" : "-"
              }${this._getThumbGap()}px) scale3d(${e})`,
              display: 0 === t ? "none" : "",
            };
          }
          _getTicksContainerStyles() {
            return {
              transform: `translate${this.vertical ? "Y" : "X"}(${
                this.vertical || "rtl" != this._getDirection() ? "-" : ""
              }${(this._tickIntervalPercent / 2) * 100}%)`,
            };
          }
          _getTicksStyles() {
            let t = 100 * this._tickIntervalPercent,
              e = {
                backgroundSize: this.vertical ? `2px ${t}%` : t + "% 2px",
                transform: `translateZ(0) translate${
                  this.vertical ? "Y" : "X"
                }(${this.vertical || "rtl" != this._getDirection() ? "" : "-"}${
                  t / 2
                }%)${
                  this.vertical || "rtl" != this._getDirection()
                    ? ""
                    : " rotate(180deg)"
                }`,
              };
            if (this._isMinValue() && this._getThumbGap()) {
              const t = this._shouldInvertAxis();
              let n;
              (n = this.vertical
                ? t
                  ? "Bottom"
                  : "Top"
                : t
                ? "Right"
                : "Left"),
                (e["padding" + n] = this._getThumbGap() + "px");
            }
            return e;
          }
          _getThumbContainerStyles() {
            const t = this._shouldInvertAxis();
            return {
              transform: `translate${this.vertical ? "Y" : "X"}(-${
                100 *
                (("rtl" != this._getDirection() || this.vertical ? t : !t)
                  ? this.percent
                  : 1 - this.percent)
              }%)`,
            };
          }
          _shouldInvertMouseCoords() {
            const t = this._shouldInvertAxis();
            return "rtl" != this._getDirection() || this.vertical ? t : !t;
          }
          _getDirection() {
            return this._dir && "rtl" == this._dir.value ? "rtl" : "ltr";
          }
          ngAfterViewInit() {
            this._focusMonitor.monitor(this._elementRef, !0).subscribe((t) => {
              (this._isActive = !!t && "keyboard" !== t),
                this._changeDetectorRef.detectChanges();
            }),
              this._dir &&
                (this._dirChangeSubscription = this._dir.change.subscribe(
                  () => {
                    this._changeDetectorRef.markForCheck();
                  }
                ));
          }
          ngOnDestroy() {
            const t = this._elementRef.nativeElement;
            t.removeEventListener("mousedown", this._pointerDown, dv),
              t.removeEventListener("touchstart", this._pointerDown, dv),
              (this._lastPointerEvent = null),
              this._removeGlobalEvents(),
              this._focusMonitor.stopMonitoring(this._elementRef),
              this._dirChangeSubscription.unsubscribe();
          }
          _onMouseenter() {
            this.disabled ||
              ((this._sliderDimensions = this._getSliderDimensions()),
              this._updateTickIntervalPercent());
          }
          _onFocus() {
            (this._sliderDimensions = this._getSliderDimensions()),
              this._updateTickIntervalPercent();
          }
          _onBlur() {
            this.onTouched();
          }
          _onKeydown(t) {
            if (
              this.disabled ||
              (function (t, ...e) {
                return e.length
                  ? e.some((e) => t[e])
                  : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey;
              })(t)
            )
              return;
            const e = this.value;
            switch (t.keyCode) {
              case 33:
                this._increment(10);
                break;
              case 34:
                this._increment(-10);
                break;
              case 35:
                this.value = this.max;
                break;
              case 36:
                this.value = this.min;
                break;
              case 37:
                this._increment("rtl" == this._getDirection() ? 1 : -1);
                break;
              case 38:
                this._increment(1);
                break;
              case 39:
                this._increment("rtl" == this._getDirection() ? -1 : 1);
                break;
              case 40:
                this._increment(-1);
                break;
              default:
                return;
            }
            e != this.value &&
              (this._emitInputEvent(), this._emitChangeEvent()),
              (this._isSliding = !0),
              t.preventDefault();
          }
          _onKeyup() {
            this._isSliding = !1;
          }
          _getWindow() {
            return this._document.defaultView || window;
          }
          _bindGlobalEvents(t) {
            const e = this._document,
              n = _v(t),
              r = n ? "touchend" : "mouseup";
            e.addEventListener(
              n ? "touchmove" : "mousemove",
              this._pointerMove,
              dv
            ),
              e.addEventListener(r, this._pointerUp, dv),
              n && e.addEventListener("touchcancel", this._pointerUp, dv);
            const s = this._getWindow();
            void 0 !== s && s && s.addEventListener("blur", this._windowBlur);
          }
          _removeGlobalEvents() {
            const t = this._document;
            t.removeEventListener("mousemove", this._pointerMove, dv),
              t.removeEventListener("mouseup", this._pointerUp, dv),
              t.removeEventListener("touchmove", this._pointerMove, dv),
              t.removeEventListener("touchend", this._pointerUp, dv),
              t.removeEventListener("touchcancel", this._pointerUp, dv);
            const e = this._getWindow();
            void 0 !== e &&
              e &&
              e.removeEventListener("blur", this._windowBlur);
          }
          _increment(t) {
            this.value = this._clamp(
              (this.value || 0) + this.step * t,
              this.min,
              this.max
            );
          }
          _updateValueFromPosition(t) {
            if (!this._sliderDimensions) return;
            let e = this._clamp(
              ((this.vertical ? t.y : t.x) -
                (this.vertical
                  ? this._sliderDimensions.top
                  : this._sliderDimensions.left)) /
                (this.vertical
                  ? this._sliderDimensions.height
                  : this._sliderDimensions.width)
            );
            if ((this._shouldInvertMouseCoords() && (e = 1 - e), 0 === e))
              this.value = this.min;
            else if (1 === e) this.value = this.max;
            else {
              const t = this._calculateValue(e),
                n =
                  Math.round((t - this.min) / this.step) * this.step + this.min;
              this.value = this._clamp(n, this.min, this.max);
            }
          }
          _emitChangeEvent() {
            this._controlValueAccessorChangeFn(this.value),
              this.valueChange.emit(this.value),
              this.change.emit(this._createChangeEvent());
          }
          _emitInputEvent() {
            this.input.emit(this._createChangeEvent());
          }
          _updateTickIntervalPercent() {
            if (this.tickInterval && this._sliderDimensions)
              if ("auto" == this.tickInterval) {
                let t = this.vertical
                    ? this._sliderDimensions.height
                    : this._sliderDimensions.width,
                  e = Math.ceil(30 / ((t * this.step) / (this.max - this.min)));
                this._tickIntervalPercent = (e * this.step) / t;
              } else
                this._tickIntervalPercent =
                  (this.tickInterval * this.step) / (this.max - this.min);
          }
          _createChangeEvent(t = this.value) {
            let e = new fv();
            return (e.source = this), (e.value = t), e;
          }
          _calculatePercentage(t) {
            return ((t || 0) - this.min) / (this.max - this.min);
          }
          _calculateValue(t) {
            return this.min + t * (this.max - this.min);
          }
          _clamp(t, e = 0, n = 1) {
            return Math.max(e, Math.min(t, n));
          }
          _getSliderDimensions() {
            return this._sliderWrapper
              ? this._sliderWrapper.nativeElement.getBoundingClientRect()
              : null;
          }
          _focusHostElement(t) {
            this._elementRef.nativeElement.focus(t);
          }
          _blurHostElement() {
            this._elementRef.nativeElement.blur();
          }
          writeValue(t) {
            this.value = t;
          }
          registerOnChange(t) {
            this._controlValueAccessorChangeFn = t;
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this.disabled = t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              vo(ta),
              vo(tg),
              vo(ji),
              vo(Wf, 8),
              bo("tabindex"),
              vo(Il),
              vo(ou),
              vo(j_, 8)
            );
          }),
          (t.ɵcmp = me({
            type: t,
            selectors: [["mat-slider"]],
            viewQuery: function (t, e) {
              var n;
              1 & t && il(hv, !0),
                2 & t && sl((n = ol())) && (e._sliderWrapper = n.first);
            },
            hostAttrs: [
              "role",
              "slider",
              1,
              "mat-slider",
              "mat-focus-indicator",
            ],
            hostVars: 28,
            hostBindings: function (t, e) {
              1 & t &&
                To("focus", function () {
                  return e._onFocus();
                })("blur", function () {
                  return e._onBlur();
                })("keydown", function (t) {
                  return e._onKeydown(t);
                })("keyup", function () {
                  return e._onKeyup();
                })("mouseenter", function () {
                  return e._onMouseenter();
                })("selectstart", function (t) {
                  return t.preventDefault();
                }),
                2 & t &&
                  ($o("tabIndex", e.tabIndex),
                  yo("aria-disabled", e.disabled)("aria-valuemax", e.max)(
                    "aria-valuemin",
                    e.min
                  )("aria-valuenow", e.value)(
                    "aria-orientation",
                    e.vertical ? "vertical" : "horizontal"
                  ),
                  Do("mat-slider-disabled", e.disabled)(
                    "mat-slider-has-ticks",
                    e.tickInterval
                  )("mat-slider-horizontal", !e.vertical)(
                    "mat-slider-axis-inverted",
                    e._shouldInvertAxis()
                  )(
                    "mat-slider-invert-mouse-coords",
                    e._shouldInvertMouseCoords()
                  )("mat-slider-sliding", e._isSliding)(
                    "mat-slider-thumb-label-showing",
                    e.thumbLabel
                  )("mat-slider-vertical", e.vertical)(
                    "mat-slider-min-value",
                    e._isMinValue()
                  )(
                    "mat-slider-hide-last-tick",
                    e.disabled ||
                      (e._isMinValue() &&
                        e._getThumbGap() &&
                        e._shouldInvertAxis())
                  )(
                    "_mat-animation-noopable",
                    "NoopAnimations" === e._animationMode
                  ));
            },
            inputs: {
              disabled: "disabled",
              color: "color",
              tabIndex: "tabIndex",
              invert: "invert",
              max: "max",
              min: "min",
              value: "value",
              step: "step",
              thumbLabel: "thumbLabel",
              tickInterval: "tickInterval",
              vertical: "vertical",
              displayWith: "displayWith",
            },
            outputs: {
              change: "change",
              input: "input",
              valueChange: "valueChange",
            },
            exportAs: ["matSlider"],
            features: [Zo([pv]), so],
            decls: 13,
            vars: 6,
            consts: [
              [1, "mat-slider-wrapper"],
              ["sliderWrapper", ""],
              [1, "mat-slider-track-wrapper"],
              [1, "mat-slider-track-background", 3, "ngStyle"],
              [1, "mat-slider-track-fill", 3, "ngStyle"],
              [1, "mat-slider-ticks-container", 3, "ngStyle"],
              [1, "mat-slider-ticks", 3, "ngStyle"],
              [1, "mat-slider-thumb-container", 3, "ngStyle"],
              [1, "mat-slider-focus-ring"],
              [1, "mat-slider-thumb"],
              [1, "mat-slider-thumb-label"],
              [1, "mat-slider-thumb-label-text"],
            ],
            template: function (t, e) {
              1 & t &&
                (So(0, "div", 0, 1),
                So(2, "div", 2),
                Co(3, "div", 3),
                Co(4, "div", 4),
                Eo(),
                So(5, "div", 5),
                Co(6, "div", 6),
                Eo(),
                So(7, "div", 7),
                Co(8, "div", 8),
                Co(9, "div", 9),
                So(10, "div", 10),
                So(11, "span", 11),
                Uo(12),
                Eo(),
                Eo(),
                Eo(),
                Eo()),
                2 & t &&
                  (ps(3),
                  wo("ngStyle", e._getTrackBackgroundStyles()),
                  ps(1),
                  wo("ngStyle", e._getTrackFillStyles()),
                  ps(1),
                  wo("ngStyle", e._getTicksContainerStyles()),
                  ps(1),
                  wo("ngStyle", e._getTicksStyles()),
                  ps(1),
                  wo("ngStyle", e._getThumbContainerStyles()),
                  ps(5),
                  Vo(e.displayValue));
            },
            directives: [Lu],
            styles: [
              '.mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:none;vertical-align:middle}.mat-slider:not(.mat-slider-disabled):active,.mat-slider.mat-slider-sliding:not(.mat-slider-disabled){cursor:-webkit-grabbing;cursor:grabbing}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-track-background{position:absolute;transform-origin:100% 100%;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{background-repeat:repeat;background-clip:content-box;box-sizing:border-box;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-focus-ring{position:absolute;width:30px;height:30px;border-radius:50%;transform:scale(0);opacity:0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider.cdk-keyboard-focused .mat-slider-focus-ring,.mat-slider.cdk-program-focused .mat-slider-focus-ring{transform:scale(1);opacity:1}.mat-slider:not(.mat-slider-disabled):not(.mat-slider-sliding) .mat-slider-thumb-label,.mat-slider:not(.mat-slider-disabled):not(.mat-slider-sliding) .mat-slider-thumb{cursor:-webkit-grab;cursor:grab}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(0.7);transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),border-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),border-radius 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.cdk-high-contrast-active .mat-slider-thumb-label{outline:solid 1px}.mat-slider-thumb-label-text{z-index:1;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-sliding .mat-slider-track-fill,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-thumb-container{transition-duration:0ms}.mat-slider-has-ticks .mat-slider-wrapper::after{content:"";position:absolute;border-width:0;border-style:solid;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-disabled) .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-disabled) .mat-slider-ticks{opacity:1}.mat-slider-thumb-label-showing .mat-slider-focus-ring{display:none}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.mat-slider:not(.mat-slider-disabled).cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.mat-slider:not(.mat-slider-disabled).cdk-focused .mat-slider-thumb-label{border-radius:50% 50% 0}.mat-slider:not(.mat-slider-disabled).cdk-focused .mat-slider-thumb-label-text{opacity:1}.mat-slider:not(.mat-slider-disabled).cdk-mouse-focused .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled).cdk-touch-focused .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled).cdk-program-focused .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-disabled .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(0.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}.cdk-high-contrast-active .mat-slider-horizontal .mat-slider-ticks-container{height:0;outline:solid 2px;top:1px}.mat-slider-horizontal .mat-slider-ticks{height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-focus-ring{top:-15px;right:-15px}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(0.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.cdk-focused .mat-slider-thumb-label{transform:rotate(45deg)}.cdk-high-contrast-active .mat-slider-horizontal.cdk-focused .mat-slider-thumb-label,.cdk-high-contrast-active .mat-slider-horizontal.cdk-focused .mat-slider-thumb-label-text{transform:none}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}.cdk-high-contrast-active .mat-slider-vertical .mat-slider-ticks-container{width:0;outline:solid 2px;left:1px}.mat-slider-vertical .mat-slider-focus-ring{bottom:-15px;left:-15px}.mat-slider-vertical .mat-slider-ticks{width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb{-webkit-backface-visibility:hidden;backface-visibility:hidden}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(0.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.cdk-focused .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%}.mat-slider._mat-animation-noopable .mat-slider-track-fill,.mat-slider._mat-animation-noopable .mat-slider-track-background,.mat-slider._mat-animation-noopable .mat-slider-ticks,.mat-slider._mat-animation-noopable .mat-slider-thumb-container,.mat-slider._mat-animation-noopable .mat-slider-focus-ring,.mat-slider._mat-animation-noopable .mat-slider-thumb,.mat-slider._mat-animation-noopable .mat-slider-thumb-label,.mat-slider._mat-animation-noopable .mat-slider-thumb-label-text,.mat-slider._mat-animation-noopable .mat-slider-has-ticks .mat-slider-wrapper::after{transition:none}\n',
            ],
            encapsulation: 2,
            changeDetection: 0,
          })),
          t
        );
      })();
      function _v(t) {
        return "t" === t.type[0];
      }
      function vv(t) {
        const e = _v(t) ? t.touches[0] || t.changedTouches[0] : t;
        return { x: e.clientX, y: e.clientY };
      }
      let bv = (() => {
        class t {}
        return (
          (t.ɵmod = ve({ type: t })),
          (t.ɵinj = dt({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[Du, H_], H_],
          })),
          t
        );
      })();
      class wv {
        constructor(t, e, n = !0) {
          (this.key = t),
            (this.value = e),
            (this.key = n ? t.replace(/['"]/g, "").trim() : t.trim()),
            (this.value = n ? e.replace(/['"]/g, "").trim() : e.trim()),
            (this.value = this.value.replace(/;/, ""));
        }
      }
      function xv(t) {
        let e = typeof t;
        return "object" === e
          ? t.constructor === Array
            ? "array"
            : t.constructor === Set
            ? "set"
            : "object"
          : e;
      }
      function Sv(t) {
        const [e, ...n] = t.split(":");
        return new wv(e, n.join(":"));
      }
      function Ev(t, e) {
        return e.key && (t[e.key] = e.value), t;
      }
      let Cv = (() => {
        class t extends yf {
          constructor(t, e, n, r, s, i, o, a, l) {
            super(t, null, e, n),
              (this.sanitizer = r),
              (this.ngStyleInstance = o),
              (this.DIRECTIVE_KEY = "ngStyle"),
              this.ngStyleInstance || (this.ngStyleInstance = new Lu(t, s, i)),
              this.init();
            const u = this.nativeElement.getAttribute("style") || "";
            (this.fallbackStyles = this.buildStyleMap(u)),
              (this.isServer = a && Fu(l));
          }
          updateWithValue(t) {
            const e = this.buildStyleMap(t);
            (this.ngStyleInstance.ngStyle = Object.assign(
              Object.assign({}, this.fallbackStyles),
              e
            )),
              this.isServer && this.applyStyleToElement(e),
              this.ngStyleInstance.ngDoCheck();
          }
          clearStyles() {
            (this.ngStyleInstance.ngStyle = this.fallbackStyles),
              this.ngStyleInstance.ngDoCheck();
          }
          buildStyleMap(t) {
            const e = (t) => this.sanitizer.sanitize(Kr.STYLE, t) || "";
            if (t)
              switch (xv(t)) {
                case "string":
                  return Av(
                    (function (t, e = ";") {
                      return String(t)
                        .trim()
                        .split(e)
                        .map((t) => t.trim())
                        .filter((t) => "" !== t);
                    })(t),
                    e
                  );
                case "array":
                  return Av(t, e);
                case "set":
                default:
                  return (function (t, e) {
                    let n = [];
                    return (
                      "set" === xv(t)
                        ? t.forEach((t) => n.push(t))
                        : Object.keys(t).forEach((e) => {
                            n.push(`${e}:${t[e]}`);
                          }),
                      (function (t, e) {
                        return t
                          .map(Sv)
                          .filter((t) => !!t)
                          .map((t) => (e && (t.value = e(t.value)), t))
                          .reduce(Ev, {});
                      })(n, e)
                    );
                  })(t, e);
              }
            return {};
          }
          ngDoCheck() {
            this.ngStyleInstance.ngDoCheck();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              vo(ta),
              vo(Vf),
              vo(zf),
              vo(hc),
              vo(ba),
              vo(sa),
              vo(Lu, 10),
              vo(hf),
              vo(fl)
            );
          }),
          (t.ɵdir = we({ type: t, features: [so] })),
          t
        );
      })();
      const kv = [
        "ngStyle",
        "ngStyle.xs",
        "ngStyle.sm",
        "ngStyle.md",
        "ngStyle.lg",
        "ngStyle.xl",
        "ngStyle.lt-sm",
        "ngStyle.lt-md",
        "ngStyle.lt-lg",
        "ngStyle.lt-xl",
        "ngStyle.gt-xs",
        "ngStyle.gt-sm",
        "ngStyle.gt-md",
        "ngStyle.gt-lg",
      ];
      let Tv = (() => {
        class t extends Cv {
          constructor() {
            super(...arguments), (this.inputs = kv);
          }
        }
        (t.ɵfac = function (n) {
          return e(n || t);
        }),
          (t.ɵdir = we({
            type: t,
            selectors: [
              ["", "ngStyle", ""],
              ["", "ngStyle.xs", ""],
              ["", "ngStyle.sm", ""],
              ["", "ngStyle.md", ""],
              ["", "ngStyle.lg", ""],
              ["", "ngStyle.xl", ""],
              ["", "ngStyle.lt-sm", ""],
              ["", "ngStyle.lt-md", ""],
              ["", "ngStyle.lt-lg", ""],
              ["", "ngStyle.lt-xl", ""],
              ["", "ngStyle.gt-xs", ""],
              ["", "ngStyle.gt-sm", ""],
              ["", "ngStyle.gt-md", ""],
              ["", "ngStyle.gt-lg", ""],
            ],
            inputs: {
              ngStyle: "ngStyle",
              "ngStyle.xs": "ngStyle.xs",
              "ngStyle.sm": "ngStyle.sm",
              "ngStyle.md": "ngStyle.md",
              "ngStyle.lg": "ngStyle.lg",
              "ngStyle.xl": "ngStyle.xl",
              "ngStyle.lt-sm": "ngStyle.lt-sm",
              "ngStyle.lt-md": "ngStyle.lt-md",
              "ngStyle.lt-lg": "ngStyle.lt-lg",
              "ngStyle.lt-xl": "ngStyle.lt-xl",
              "ngStyle.gt-xs": "ngStyle.gt-xs",
              "ngStyle.gt-sm": "ngStyle.gt-sm",
              "ngStyle.gt-md": "ngStyle.gt-md",
              "ngStyle.gt-lg": "ngStyle.gt-lg",
            },
            features: [so],
          }));
        const e = cr(t);
        return t;
      })();
      function Av(t, e) {
        return t
          .map(Sv)
          .filter((t) => !!t)
          .map((t) => (e && (t.value = e(t.value)), t))
          .reduce(Ev, {});
      }
      let Iv = (() => {
        class t {}
        return (
          (t.ɵmod = ve({ type: t })),
          (t.ɵinj = dt({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[of]],
          })),
          t
        );
      })();
      function Ov(t, e, n, r) {
        return new (n || (n = Promise))(function (s, i) {
          function o(t) {
            try {
              l(r.next(t));
            } catch (e) {
              i(e);
            }
          }
          function a(t) {
            try {
              l(r.throw(t));
            } catch (e) {
              i(e);
            }
          }
          function l(t) {
            var e;
            t.done
              ? s(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(o, a);
          }
          l((r = r.apply(t, e || [])).next());
        });
      }
      const Rv = function () {
        return { visibility: "hidden" };
      };
      function Pv(t, e) {
        if ((1 & t && (So(0, "p", 4), Uo(1), Eo()), 2 & t)) {
          const t = Oo().$implicit;
          wo(
            "ngStyle.lt-md",
            (function (t, e, n) {
              const r = hn() + 2,
                s = nn();
              return s[r] === ls
                ? fo(s, r, e())
                : (function (t, e) {
                    return t[e];
                  })(s, r);
            })(0, Rv)
          ),
            ps(1),
            Vo(t.value);
        }
      }
      const Lv = function (t, e, n) {
        return { "width.vh": t, "height.vh": e, "background-color": n };
      };
      function Dv(t, e) {
        if (
          (1 & t && (So(0, "div", 2), _o(1, Pv, 2, 3, "p", 3), Eo()), 2 & t)
        ) {
          const t = e.$implicit,
            n = Oo();
          wo(
            "ngStyle.gt-md",
            qa(
              4,
              Lv,
              15 - (n.width / n.num.length) * 14,
              (t.value + 5) / 2,
              t.color
            )
          )(
            "ngStyle.lt-md",
            qa(
              8,
              Lv,
              3 - (n.width / n.num.length) * 2,
              (t.value + 5) / 3,
              t.color
            )
          )(
            "ngStyle.md",
            qa(
              12,
              Lv,
              15 - (n.width / n.num.length) * 14,
              (t.value + 5) / 2,
              t.color
            )
          ),
            ps(1),
            wo("ngIf", n.num.length < 50);
        }
      }
      let Nv = (() => {
        class t {
          constructor() {
            (this.num = []),
              (this.nums = []),
              (this.width = 5),
              (this.sortStatus = new Wa());
          }
          ngOnInit() {}
          ngOnChanges(t) {
            t.sort &&
              t.sort.currentValue.status &&
              new Promise((e) => {
                "bubbleSort" === t.sort.currentValue.sortType &&
                  e(this.bubbleSort());
              }).finally(() => {
                this.sortStatus.emit({ status: !1 }),
                  setTimeout(() => {
                    for (let t = 0; t < this.num.length; t++)
                      this.changeColor(
                        t,
                        "rgba(78, 216, 96, 0.8)",
                        7,
                        !1
                      ).then();
                  }, 10);
              }),
              t.nums && (this.num = t.nums.currentValue),
              t.width && (this.width = t.width.currentValue);
          }
          bubbleSort() {
            this.sortStatus.emit({ status: !0 });
            let t = 0,
              e = 0;
            for (let n = 1; n < this.num.length; n++) e += n;
            return new Promise((n) =>
              Ov(this, void 0, void 0, function* () {
                for (let r = 0; r < this.num.length - 1; r++) {
                  for (let s = 0; s < this.num.length - 1 - r; s++)
                    yield this.time(s).then(() => {
                      t++, t === e && n();
                    });
                  yield this.changeColor(
                    this.num.length - r - 1,
                    "rgba(169, 92, 232, 0.8)",
                    5,
                    !1
                  );
                }
                yield this.changeColor(0, "rgba(169, 92, 232, 0.8)", 5, !1);
              })
            );
          }
          numberSwap(t, e) {
            return Ov(this, void 0, void 0, function* () {
              return new Promise((n) => {
                n(
                  setTimeout(() => {
                    const e = this.num[t + 1];
                    (this.num[t + 1] = this.num[t]), (this.num[t] = e);
                  }, 5 * e * (75 - this.num.length))
                );
              });
            });
          }
          changeColor(t, e, n, r = !0) {
            return Ov(this, void 0, void 0, function* () {
              return new Promise((s) => {
                s(
                  setTimeout(() => {
                    (this.num[t].color = e), r && (this.num[t + 1].color = e);
                  }, 5 * n * (75 - this.num.length))
                );
              });
            });
          }
          time(t) {
            return Ov(this, void 0, void 0, function* () {
              return new Promise((e) => {
                setTimeout(() => {
                  e(
                    this.changeColor(t, "rgba(78, 216, 96, 0.8)", 1).then(
                      () => {
                        this.num[t].value > this.num[t + 1].value
                          ? this.changeColor(
                              t,
                              "rgba(219, 57, 57, 0.8)",
                              2
                            ).then(() => {
                              this.numberSwap(t, 3).then(() => {
                                this.changeColor(
                                  t,
                                  "rgba(78, 216, 96, 0.8)",
                                  4
                                ).then(() => {
                                  this.changeColor(t, "#0097A7", 5);
                                });
                              });
                            })
                          : this.changeColor(t, "#0097A7", 2);
                      }
                    )
                  );
                }, 24 * (75 - this.num.length));
              });
            });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = me({
            type: t,
            selectors: [["app-sorting"]],
            inputs: { sort: "sort", nums: "nums", width: "width" },
            outputs: { sortStatus: "sortStatus" },
            features: [Ne],
            decls: 2,
            vars: 1,
            consts: [
              [
                "fxLayout",
                "row",
                "fxLayoutAlign",
                "center end",
                "fxLayoutGap",
                ".5%",
              ],
              [
                "style",
                "text-align: center; color: white; font-size: smaller; border-radius: 1vh",
                3,
                "ngStyle.gt-md",
                "ngStyle.lt-md",
                "ngStyle.md",
                4,
                "ngFor",
                "ngForOf",
              ],
              [
                2,
                "text-align",
                "center",
                "color",
                "white",
                "font-size",
                "smaller",
                "border-radius",
                "1vh",
                3,
                "ngStyle.gt-md",
                "ngStyle.lt-md",
                "ngStyle.md",
              ],
              [3, "ngStyle.lt-md", 4, "ngIf"],
              [3, "ngStyle.lt-md"],
            ],
            template: function (t, e) {
              1 & t && (So(0, "div", 0), _o(1, Dv, 2, 16, "div", 1), Eo()),
                2 & t && (ps(1), wo("ngForOf", e.num));
            },
            directives: [rm, Pm, um, Au, Tv, Ou],
            styles: [""],
          })),
          t
        );
      })();
      const Fv = function (t) {
          return { color: t };
        },
        jv = function (t, e) {
          return { status: t, sortType: e };
        };
      let Mv = (() => {
          class t {
            constructor(t) {
              (this.cdRef = t),
                (this.trigger = !1),
                (this.nums = []),
                (this.range = 20),
                (this.disable = !1),
                (this.sortType = ""),
                (this.sortDisable = !0),
                (this.generateDisable = !1);
            }
            ngOnInit() {
              this.rand(), (this.disable = !1);
            }
            sortTrigger() {
              this.trigger = !0;
            }
            sortTypeChange(t) {
              (this.sortType = t), (this.sortDisable = !1), (this.disable = !0);
            }
            change(t) {
              (this.range = Number(t.value)), this.rand();
            }
            rand() {
              this.nums = [];
              for (let t = 0; t <= this.range + 4; t++) {
                const t = 149 * Math.random() + 1;
                this.nums.push({ value: Math.round(t), color: "#0097A7" });
              }
            }
            buttonDisable(t) {
              (this.trigger = !1),
                (this.disable = this.sortDisable = this.generateDisable =
                  t.status),
                this.cdRef.detectChanges();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(vo(ji));
            }),
            (t.ɵcmp = me({
              type: t,
              selectors: [["app-main"]],
              decls: 13,
              vars: 17,
              consts: [
                ["fxFill", "", "fxLayout", "column"],
                [
                  "fxLayout",
                  "row",
                  "fxLayoutAlign",
                  "start center",
                  2,
                  "background-color",
                  "#757575",
                  3,
                  "fxFlex.gt-md",
                  "fxFlex.lt-sm",
                ],
                ["fxFlex", "50%"],
                ["mat-button", "", "name", "generate", 3, "disabled", "click"],
                ["mat-button", "", "name", "sort", 3, "disabled", "click"],
                [
                  "max",
                  "100",
                  "min",
                  "1",
                  "value",
                  "20",
                  3,
                  "disabled",
                  "input",
                ],
                [
                  "mat-button",
                  "",
                  "name",
                  "sort",
                  3,
                  "disabled",
                  "ngStyle",
                  "click",
                ],
                [
                  "fxFlex",
                  "100%",
                  "fxLayoutAlign",
                  "center center",
                  3,
                  "fxFlex.gt-md",
                  "fxFlex.lt-sm",
                ],
                [3, "nums", "sort", "width", "sortStatus"],
              ],
              template: function (t, e) {
                var n, r, s, i;
                1 & t &&
                  (So(0, "div", 0),
                  So(1, "div", 1),
                  So(2, "div", 2),
                  So(3, "button", 3),
                  To("click", function () {
                    return e.rand();
                  }),
                  Uo(4, "Generate new !"),
                  Eo(),
                  So(5, "button", 4),
                  To("click", function () {
                    return e.sortTrigger();
                  }),
                  Uo(6, "Sort"),
                  Eo(),
                  So(7, "mat-slider", 5),
                  To("input", function (t) {
                    return e.change(t);
                  }),
                  Eo(),
                  Eo(),
                  So(8, "div", 2),
                  So(9, "button", 6),
                  To("click", function () {
                    return e.sortTypeChange("bubbleSort");
                  }),
                  Uo(10, "Bubble Sort "),
                  Eo(),
                  Eo(),
                  Eo(),
                  So(11, "div", 7),
                  So(12, "app-sorting", 8),
                  To("sortStatus", function (t) {
                    return e.buttonDisable(t);
                  }),
                  Eo(),
                  Eo(),
                  Eo()),
                  2 & t &&
                    (ps(1),
                    wo("fxFlex.gt-md", 8)("fxFlex.lt-sm", 18),
                    ps(2),
                    wo("disabled", e.generateDisable),
                    ps(2),
                    wo("disabled", e.sortDisable),
                    ps(2),
                    wo("disabled", e.disable),
                    ps(2),
                    wo("disabled", e.disable)(
                      "ngStyle",
                      ((n = 12),
                      (r = Fv),
                      (s = !0 === e.disable ? "#101820" : "white"),
                      (function (t, e, n, r, s, i) {
                        const o = e + n;
                        return mo(t, o, s)
                          ? fo(t, o + 1, i ? r.call(i, s) : r(s))
                          : Qa(t, o + 1);
                      })(nn(), hn(), n, r, s, i))
                    ),
                    ps(2),
                    wo("fxFlex.gt-md", 92)("fxFlex.lt-sm", 82),
                    ps(1),
                    wo("nums", e.nums)(
                      "sort",
                      (function (t, e, n, r, s) {
                        return (function (t, e, n, r, s, i, o) {
                          const a = e + n;
                          return go(t, a, s, i)
                            ? fo(t, a + 2, o ? r.call(o, s, i) : r(s, i))
                            : Qa(t, a + 2);
                        })(nn(), hn(), t, e, n, r, s);
                      })(14, jv, e.trigger, e.sortType)
                    )("width", e.range));
              },
              directives: [Tm, rm, Pm, bm, lv, yv, Lu, Tv, Nv],
              styles: [""],
            })),
            t
          );
        })(),
        Uv = (() => {
          class t {
            constructor() {
              this.title = "sorting-visualizer";
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = me({
              type: t,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && Co(0, "app-main");
              },
              directives: [Mv],
              styles: [""],
            })),
            t
          );
        })(),
        Vv = (() => {
          class t {}
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[of]],
            })),
            t
          );
        })(),
        Bv = (() => {
          class t {
            constructor(t, e) {
              Fu(e) &&
                !t &&
                console.warn(
                  "Warning: Flex Layout loaded on the server without FlexLayoutServerModule"
                );
            }
            static withConfig(e, n = []) {
              return {
                ngModule: t,
                providers: e.serverLoaded
                  ? [
                      {
                        provide: cf,
                        useValue: Object.assign(Object.assign({}, uf), e),
                      },
                      { provide: df, useValue: n, multi: !0 },
                      { provide: hf, useValue: !0 },
                    ]
                  : [
                      {
                        provide: cf,
                        useValue: Object.assign(Object.assign({}, uf), e),
                      },
                      { provide: df, useValue: n, multi: !0 },
                    ],
              };
            }
          }
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)(Zt(hf), Zt(fl));
              },
              imports: [[$m, Iv, Vv], $m, Iv, Vv],
            })),
            t
          );
        })();
      function $v(t, e) {
        return new _(
          e
            ? (n) => e.schedule(Hv, 0, { error: t, subscriber: n })
            : (e) => e.error(t)
        );
      }
      function Hv({ error: t, subscriber: e }) {
        e.error(t);
      }
      const zv = new _(rh);
      let qv = (() => {
        class t {
          constructor(t, e, n) {
            (this.kind = t),
              (this.value = e),
              (this.error = n),
              (this.hasValue = "N" === t);
          }
          observe(t) {
            switch (this.kind) {
              case "N":
                return t.next && t.next(this.value);
              case "E":
                return t.error && t.error(this.error);
              case "C":
                return t.complete && t.complete();
            }
          }
          do(t, e, n) {
            switch (this.kind) {
              case "N":
                return t && t(this.value);
              case "E":
                return e && e(this.error);
              case "C":
                return n && n();
            }
          }
          accept(t, e, n) {
            return t && "function" == typeof t.next
              ? this.observe(t)
              : this.do(t, e, n);
          }
          toObservable() {
            switch (this.kind) {
              case "N":
                return gc(this.value);
              case "E":
                return $v(this.error);
              case "C":
                return kc();
            }
            throw new Error("unexpected notification kind value");
          }
          static createNext(e) {
            return void 0 !== e ? new t("N", e) : t.undefinedValueNotification;
          }
          static createError(e) {
            return new t("E", void 0, e);
          }
          static createComplete() {
            return t.completeNotification;
          }
        }
        return (
          (t.completeNotification = new t("C")),
          (t.undefinedValueNotification = new t("N", void 0)),
          t
        );
      })();
      class Qv {
        constructor(t, e) {
          (this.delay = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new Wv(t, this.delay, this.scheduler));
        }
      }
      class Wv extends f {
        constructor(t, e, n) {
          super(t),
            (this.delay = e),
            (this.scheduler = n),
            (this.queue = []),
            (this.active = !1),
            (this.errored = !1);
        }
        static dispatch(t) {
          const e = t.source,
            n = e.queue,
            r = t.scheduler,
            s = t.destination;
          for (; n.length > 0 && n[0].time - r.now() <= 0; )
            n.shift().notification.observe(s);
          if (n.length > 0) {
            const e = Math.max(0, n[0].time - r.now());
            this.schedule(t, e);
          } else this.unsubscribe(), (e.active = !1);
        }
        _schedule(t) {
          (this.active = !0),
            this.destination.add(
              t.schedule(Wv.dispatch, this.delay, {
                source: this,
                destination: this.destination,
                scheduler: t,
              })
            );
        }
        scheduleNotification(t) {
          if (!0 === this.errored) return;
          const e = this.scheduler,
            n = new Gv(e.now() + this.delay, t);
          this.queue.push(n), !1 === this.active && this._schedule(e);
        }
        _next(t) {
          this.scheduleNotification(qv.createNext(t));
        }
        _error(t) {
          (this.errored = !0),
            (this.queue = []),
            this.destination.error(t),
            this.unsubscribe();
        }
        _complete() {
          this.scheduleNotification(qv.createComplete()), this.unsubscribe();
        }
      }
      class Gv {
        constructor(t, e) {
          (this.time = t), (this.notification = e);
        }
      }
      const Kv =
        "Service workers are disabled or not supported by this browser";
      class Zv {
        constructor(t) {
          if (((this.serviceWorker = t), t)) {
            const e = Jp(t, "controllerchange").pipe(k(() => t.controller)),
              n = Kc(
                Tc(() => gc(t.controller)),
                e
              );
            (this.worker = n.pipe(Ic((t) => !!t))),
              (this.registration = this.worker.pipe(
                Hc(() => t.getRegistration())
              ));
            const r = Jp(t, "message")
              .pipe(k((t) => t.data))
              .pipe(Ic((t) => t && t.type))
              .pipe(J(new S()));
            r.connect(), (this.events = r);
          } else
            this.worker = this.events = this.registration = Tc(() =>
              $v(
                new Error(
                  "Service workers are disabled or not supported by this browser"
                )
              )
            );
        }
        postMessage(t, e) {
          return this.worker
            .pipe(
              Qc(1),
              sh((n) => {
                n.postMessage(Object.assign({ action: t }, e));
              })
            )
            .toPromise()
            .then(() => {});
        }
        postMessageWithStatus(t, e, n) {
          const r = this.waitForStatus(n),
            s = this.postMessage(t, e);
          return Promise.all([r, s]).then(() => {});
        }
        generateNonce() {
          return Math.round(1e7 * Math.random());
        }
        eventsOfType(t) {
          return this.events.pipe(Ic((e) => e.type === t));
        }
        nextEventOfType(t) {
          return this.eventsOfType(t).pipe(Qc(1));
        }
        waitForStatus(t) {
          return this.eventsOfType("STATUS")
            .pipe(
              Ic((e) => e.nonce === t),
              Qc(1),
              k((t) => {
                if (!t.status) throw new Error(t.error);
              })
            )
            .toPromise();
        }
        get isEnabled() {
          return !!this.serviceWorker;
        }
      }
      let Yv = (() => {
          class t {
            constructor(t) {
              if (
                ((this.sw = t),
                (this.subscriptionChanges = new S()),
                !t.isEnabled)
              )
                return (
                  (this.messages = zv),
                  (this.notificationClicks = zv),
                  void (this.subscription = zv)
                );
              (this.messages = this.sw
                .eventsOfType("PUSH")
                .pipe(k((t) => t.data))),
                (this.notificationClicks = this.sw
                  .eventsOfType("NOTIFICATION_CLICK")
                  .pipe(k((t) => t.data))),
                (this.pushManager = this.sw.registration.pipe(
                  k((t) => t.pushManager)
                ));
              const e = this.pushManager.pipe(Hc((t) => t.getSubscription()));
              this.subscription = q(e, this.subscriptionChanges);
            }
            get isEnabled() {
              return this.sw.isEnabled;
            }
            requestSubscription(t) {
              if (!this.sw.isEnabled) return Promise.reject(new Error(Kv));
              const e = { userVisibleOnly: !0 };
              let n = this.decodeBase64(
                  t.serverPublicKey.replace(/_/g, "/").replace(/-/g, "+")
                ),
                r = new Uint8Array(new ArrayBuffer(n.length));
              for (let s = 0; s < n.length; s++) r[s] = n.charCodeAt(s);
              return (
                (e.applicationServerKey = r),
                this.pushManager
                  .pipe(
                    Hc((t) => t.subscribe(e)),
                    Qc(1)
                  )
                  .toPromise()
                  .then((t) => (this.subscriptionChanges.next(t), t))
              );
            }
            unsubscribe() {
              return this.sw.isEnabled
                ? this.subscription
                    .pipe(
                      Qc(1),
                      Hc((t) => {
                        if (null === t)
                          throw new Error(
                            "Not subscribed to push notifications."
                          );
                        return t.unsubscribe().then((t) => {
                          if (!t) throw new Error("Unsubscribe failed!");
                          this.subscriptionChanges.next(null);
                        });
                      })
                    )
                    .toPromise()
                : Promise.reject(new Error(Kv));
            }
            decodeBase64(t) {
              return atob(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(Zv));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Jv = (() => {
          class t {
            constructor(t) {
              if (((this.sw = t), !t.isEnabled))
                return (this.available = zv), void (this.activated = zv);
              (this.available = this.sw.eventsOfType("UPDATE_AVAILABLE")),
                (this.activated = this.sw.eventsOfType("UPDATE_ACTIVATED"));
            }
            get isEnabled() {
              return this.sw.isEnabled;
            }
            checkForUpdate() {
              if (!this.sw.isEnabled) return Promise.reject(new Error(Kv));
              const t = this.sw.generateNonce();
              return this.sw.postMessageWithStatus(
                "CHECK_FOR_UPDATES",
                { statusNonce: t },
                t
              );
            }
            activateUpdate() {
              if (!this.sw.isEnabled) return Promise.reject(new Error(Kv));
              const t = this.sw.generateNonce();
              return this.sw.postMessageWithStatus(
                "ACTIVATE_UPDATE",
                { statusNonce: t },
                t
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Zt(Zv));
            }),
            (t.ɵprov = ht({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class Xv {}
      const tb = new Ut("NGSW_REGISTER_SCRIPT");
      function eb(t, e, n, r) {
        return () => {
          if (!Nu(r) || !("serviceWorker" in navigator) || !1 === n.enabled)
            return;
          let s;
          if (
            (navigator.serviceWorker.addEventListener(
              "controllerchange",
              () => {
                null !== navigator.serviceWorker.controller &&
                  navigator.serviceWorker.controller.postMessage({
                    action: "INITIALIZE",
                  });
              }
            ),
            "function" == typeof n.registrationStrategy)
          )
            s = n.registrationStrategy();
          else {
            const [e, ...r] = (
              n.registrationStrategy || "registerWhenStable:30000"
            ).split(":");
            switch (e) {
              case "registerImmediately":
                s = gc(null);
                break;
              case "registerWithDelay":
                s = nb(+r[0] || 0);
                break;
              case "registerWhenStable":
                s = r[0] ? q(rb(t), nb(+r[0])) : rb(t);
                break;
              default:
                throw new Error(
                  "Unknown ServiceWorker registration strategy: " +
                    n.registrationStrategy
                );
            }
          }
          t.get(Il).runOutsideAngular(() =>
            s
              .pipe(Qc(1))
              .subscribe(() =>
                navigator.serviceWorker
                  .register(e, { scope: n.scope })
                  .catch((t) =>
                    console.error("Service worker registration failed with:", t)
                  )
              )
          );
        };
      }
      function nb(t) {
        return gc(null).pipe(
          (function (t, e = Xp) {
            var n;
            const r =
              (n = t) instanceof Date && !isNaN(+n)
                ? +t - e.now()
                : Math.abs(t);
            return (t) => t.lift(new Qv(r, e));
          })(t)
        );
      }
      function rb(t) {
        return t.get(Gl).isStable.pipe(Ic((t) => t));
      }
      function sb(t, e) {
        return new Zv(
          Nu(e) && !1 !== t.enabled ? navigator.serviceWorker : void 0
        );
      }
      let ib = (() => {
          class t {
            static register(e, n = {}) {
              return {
                ngModule: t,
                providers: [
                  { provide: tb, useValue: e },
                  { provide: Xv, useValue: n },
                  { provide: Zv, useFactory: sb, deps: [Xv, fl] },
                  {
                    provide: ll,
                    useFactory: eb,
                    deps: [to, tb, Xv, fl],
                    multi: !0,
                  },
                ],
              };
            }
          }
          return (
            (t.ɵmod = ve({ type: t })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [Yv, Jv],
            })),
            t
          );
        })(),
        ob = (() => {
          class t {}
          return (
            (t.ɵmod = ve({ type: t, bootstrap: [Uv] })),
            (t.ɵinj = dt({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [],
              imports: [
                [
                  mc,
                  Wp,
                  U_,
                  Bv,
                  uv,
                  bv,
                  ib.register("ngsw-worker.js", { enabled: !0 }),
                ],
              ],
            })),
            t
          );
        })();
      (function () {
        if (Cr)
          throw new Error("Cannot enable prod mode after platform setup.");
        Er = !1;
      })(),
        pc()
          .bootstrapModule(ob)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
