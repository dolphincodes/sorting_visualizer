(window.webpackJsonp = window.webpackJsonp || [])
    .push([
      [ 1 ], {
        0 : function(t, e, n) { t.exports = n("zUnb") },
        zUnb : function(t, e, n) {
          "use strict";
          function s(t) { return "function" == typeof t }
          n.r(e);
          let i = !1;
          const r = {
            Promise : void 0,
            set useDeprecatedSynchronousErrorHandling(t) {
              if (t) {
                const t = new Error;
                console.warn(
                    "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                    t.stack)
              } else
                i &&
                    console.log(
                        "RxJS: Back to a better error behavior. Thank you. <3");
              i = t
            },
            get useDeprecatedSynchronousErrorHandling() { return i }
          };
          function o(t) { setTimeout(() => {throw t}, 0) }
          const a = {
            closed : !0,
            next(t) {},
            error(t) {
              if (r.useDeprecatedSynchronousErrorHandling)
                throw t;
              o(t)
            },
            complete() {}
          },
                l = (() => Array.isArray ||
                           (t => t && "number" == typeof t.length))();
          function c(t) { return null !== t && "object" == typeof t }
          const u = (() => {
            function t(t) {
              return Error.call(this),
                     this.message =
                         t ? `${t.length} errors occurred during unsubscription:\n${
                                 t.map((t, e) => `${e + 1}) ${t.toString()}`)
                                     .join("\n  ")}`
                           : "",
                     this.name = "UnsubscriptionError", this.errors = t, this
            } return t.prototype = Object.create(Error.prototype),
            t
          })();
          let h = (() => {
            class t {
              constructor(t) {
                this.closed = !1, this._parentOrParents = null,
                this._subscriptions = null,
                t && (this._ctorUnsubscribe = !0, this._unsubscribe = t)
              }
              unsubscribe() {
                let e;
                if (this.closed)
                  return;
                let {
                  _parentOrParents : n,
                  _ctorUnsubscribe : i,
                  _unsubscribe : r,
                  _subscriptions : o
                } = this;
                if (this.closed = !0, this._parentOrParents = null,
                    this._subscriptions = null, n instanceof t)
                  n.remove(this);
                else if (null !== n)
                  for (let t = 0; t < n.length; ++t)
                    n[t].remove(this);
                if (s(r)) {
                  i && (this._unsubscribe = void 0);
                  try {
                    r.call(this)
                  } catch (a) {
                    e = a instanceof u ? d(a.errors) : [ a ]
                  }
                }
                if (l(o)) {
                  let t = -1, n = o.length;
                  for (; ++t < n;) {
                    const n = o[t];
                    if (c(n))
                      try {
                        n.unsubscribe()
                      } catch (a) {
                        e = e || [],
                        a instanceof u ? e = e.concat(d(a.errors)) : e.push(a)
                      }
                  }
                }
                if (e)
                  throw new u(e)
              }
              add(e) {
                let n = e;
                if (!e)
                  return t.EMPTY;
                switch (typeof e) {
                case "function":
                  n = new t(e);
                case "object":
                  if (n === this || n.closed ||
                      "function" != typeof n.unsubscribe)
                    return n;
                  if (this.closed)
                    return n.unsubscribe(), n;
                  if (!(n instanceof t)) {
                    const e = n;
                    n = new t, n._subscriptions = [ e ]
                  }
                  break;
                default:
                  throw new Error("unrecognized teardown " + e +
                                  " added to Subscription.")
                }
                let {_parentOrParents : s} = n;
                if (null === s)
                  n._parentOrParents = this;
                else if (s instanceof t) {
                  if (s === this)
                    return n;
                  n._parentOrParents = [ s, this ]
                } else {
                  if (-1 !== s.indexOf(this))
                    return n;
                  s.push(this)
                }
                const i = this._subscriptions;
                return null === i ? this._subscriptions = [ n ] : i.push(n), n
              }
              remove(t) {
                const e = this._subscriptions;
                if (e) {
                  const n = e.indexOf(t);
                  -1 !== n && e.splice(n, 1)
                }
              }
            } return t.EMPTY = function(t) { return t.closed = !0, t }(new t),
            t
          })();
          function d(t) {
            return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e),
                            [])
          }
          const p = (() => "function" == typeof Symbol
                               ? Symbol("rxSubscriber")
                               : "@@rxSubscriber_" + Math.random())();
          class f extends h {
            constructor(t, e, n) {
              switch (super(), this.syncErrorValue = null,
                      this.syncErrorThrown = !1, this.syncErrorThrowable = !1,
                      this.isStopped = !1, arguments.length) {
              case 0:
                this.destination = a;
                break;
              case 1:
                if (!t) {
                  this.destination = a;
                  break
                }
                if ("object" == typeof t) {
                  t instanceof f
                      ? (this.syncErrorThrowable = t.syncErrorThrowable,
                         this.destination = t, t.add(this))
                      : (this.syncErrorThrowable = !0,
                         this.destination = new m(this, t));
                  break
                }
              default:
                this.syncErrorThrowable = !0,
                this.destination = new m(this, t, e, n)
              }
            }
            [p]() { return this }
            static create(t, e, n) {
              const s = new f(t, e, n);
              return s.syncErrorThrowable = !1, s
            }
            next(t) { this.isStopped || this._next(t) }
            error(t) { this.isStopped || (this.isStopped = !0, this._error(t)) }
            complete() {
              this.isStopped || (this.isStopped = !0, this._complete())
            }
            unsubscribe() {
              this.closed || (this.isStopped = !0, super.unsubscribe())
            }
            _next(t) { this.destination.next(t) }
            _error(t) { this.destination.error(t), this.unsubscribe() }
            _complete() { this.destination.complete(), this.unsubscribe() }
            _unsubscribeAndRecycle() {
              const {_parentOrParents : t} = this;
              return this._parentOrParents = null, this.unsubscribe(),
                     this.closed = !1, this.isStopped = !1,
                     this._parentOrParents = t, this
            }
          }
          class m extends f {
            constructor(t, e, n, i) {
              let r;
              super(), this._parentSubscriber = t;
              let o = this;
              s(e) ? r = e
                   : e && (r = e.next, n = e.error, i = e.complete,
                           e !== a &&
                               (o = Object.create(e),
                                s(o.unsubscribe) &&
                                    this.add(o.unsubscribe.bind(o)),
                                o.unsubscribe = this.unsubscribe.bind(this))),
                     this._context = o, this._next = r, this._error = n,
                     this._complete = i
            }
            next(t) {
              if (!this.isStopped && this._next) {
                const {_parentSubscriber : e} = this;
                r.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                    ? this.__tryOrSetError(e, this._next, t) &&
                          this.unsubscribe()
                    : this.__tryOrUnsub(this._next, t)
              }
            }
            error(t) {
              if (!this.isStopped) {
                const {_parentSubscriber :
                           e} = this,
                           {useDeprecatedSynchronousErrorHandling : n} = r;
                if (this._error)
                  n && e.syncErrorThrowable
                      ? (this.__tryOrSetError(e, this._error, t),
                         this.unsubscribe())
                      : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                else if (e.syncErrorThrowable)
                  n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : o(t),
                      this.unsubscribe();
                else {
                  if (this.unsubscribe(), n)
                    throw t;
                  o(t)
                }
              }
            }
            complete() {
              if (!this.isStopped) {
                const {_parentSubscriber : t} = this;
                if (this._complete) {
                  const e = () => this._complete.call(this._context);
                  r.useDeprecatedSynchronousErrorHandling &&
                          t.syncErrorThrowable
                      ? (this.__tryOrSetError(t, e), this.unsubscribe())
                      : (this.__tryOrUnsub(e), this.unsubscribe())
                } else
                  this.unsubscribe()
              }
            }
            __tryOrUnsub(t, e) {
              try {
                t.call(this._context, e)
              } catch (n) {
                if (this.unsubscribe(), r.useDeprecatedSynchronousErrorHandling)
                  throw n;
                o(n)
              }
            }
            __tryOrSetError(t, e, n) {
              if (!r.useDeprecatedSynchronousErrorHandling)
                throw new Error("bad call");
              try {
                e.call(this._context, n)
              } catch (s) {
                return r.useDeprecatedSynchronousErrorHandling
                           ? (t.syncErrorValue = s, t.syncErrorThrown = !0, !0)
                           : (o(s), !0)
              }
              return !1
            }
            _unsubscribe() {
              const {_parentSubscriber : t} = this;
              this._context = null, this._parentSubscriber = null,
              t.unsubscribe()
            }
          }
          const g = (() => "function" == typeof Symbol && Symbol.observable ||
                           "@@observable")();
          function y(t) { return t }
          let _ = (() => {
            class t {
              constructor(t) { this._isScalar = !1, t && (this._subscribe = t) }
              lift(e) {
                const n = new t;
                return n.source = this, n.operator = e, n
              }
              subscribe(t, e, n) {
                const {operator : s} = this, i = function(t, e, n) {
                  if (t) {
                    if (t instanceof f)
                      return t;
                    if (t[p])
                      return t[p]()
                  }
                  return t || e || n ? new f(t, e, n) : new f(a)
                }(t, e, n);
                if (i.add(s ? s.call(i, this.source)
                            : this.source ||
                                      r.useDeprecatedSynchronousErrorHandling &&
                                          !i.syncErrorThrowable
                                  ? this._subscribe(i)
                                  : this._trySubscribe(i)),
                    r.useDeprecatedSynchronousErrorHandling &&
                        i.syncErrorThrowable &&
                        (i.syncErrorThrowable = !1, i.syncErrorThrown))
                  throw i.syncErrorValue;
                return i
              }
              _trySubscribe(t) {
                try {
                  return this._subscribe(t)
                } catch (e) {
                  r.useDeprecatedSynchronousErrorHandling &&
                      (t.syncErrorThrown = !0, t.syncErrorValue = e),
                      function(t) {
                        for (; t;) {
                          const {closed : e, destination : n, isStopped : s} =
                              t;
                          if (e || s)
                            return !1;
                          t = n && n instanceof f ? n : null
                        }
                        return !0
                      }(t)
                          ? t.error(e)
                          : console.warn(e)
                }
              }
              forEach(t, e) {
                return new (e = v(e))((e, n) => {
                  let s;
                  s = this.subscribe(e => {
                    try {
                      t(e)
                    } catch (i) {
                      n(i), s && s.unsubscribe()
                    }
                  }, n, e)
                })
              }
              _subscribe(t) {
                const {source : e} = this;
                return e && e.subscribe(t)
              }
              [g]() { return this }
              pipe(...t) {
                return 0 === t.length
                           ? this
                           : (0 === (e = t).length
                                  ? y
                                  : 1 === e.length ? e[0] : function(t) {
                                      return e.reduce((t, e) => e(t), t)
                                    })(this);
                var e
              }
              toPromise(t) {
                return new (t = v(t))((t, e) => {
                  let n;
                  this.subscribe(t => n = t, t => e(t), () => t(n))
                })
              }
            } return t.create = e => new t(e),
            t
          })();
          function v(t) {
            if (t || (t = r.Promise || Promise), !t)
              throw new Error("no Promise impl found");
            return t
          }
          const b = (() => {
            function t() {
              return Error.call(this), this.message = "object unsubscribed",
                                       this.name = "ObjectUnsubscribedError",
                                       this
            } return t.prototype = Object.create(Error.prototype),
            t
          })();
          class w extends h {
            constructor(t, e) {
              super(), this.subject = t, this.subscriber = e, this.closed = !1
            }
            unsubscribe() {
              if (this.closed)
                return;
              this.closed = !0;
              const t = this.subject, e = t.observers;
              if (this.subject = null,
                  !e || 0 === e.length || t.isStopped || t.closed)
                return;
              const n = e.indexOf(this.subscriber);
              -1 !== n && e.splice(n, 1)
            }
          }
          class x extends f {
            constructor(t) { super(t), this.destination = t }
          }
          let S = (() => {
            class t extends _ {
              constructor() {
                super(), this.observers = [], this.closed = !1,
                         this.isStopped = !1, this.hasError = !1,
                         this.thrownError = null
              }
              [p]() { return new x(this) }
              lift(t) {
                const e = new E(this, this);
                return e.operator = t, e
              }
              next(t) {
                if (this.closed)
                  throw new b;
                if (!this.isStopped) {
                  const {observers : e} = this, n = e.length, s = e.slice();
                  for (let i = 0; i < n; i++)
                    s[i].next(t)
                }
              }
              error(t) {
                if (this.closed)
                  throw new b;
                this.hasError = !0, this.thrownError = t, this.isStopped = !0;
                const {observers : e} = this, n = e.length, s = e.slice();
                for (let i = 0; i < n; i++)
                  s[i].error(t);
                this.observers.length = 0
              }
              complete() {
                if (this.closed)
                  throw new b;
                this.isStopped = !0;
                const {observers : t} = this, e = t.length, n = t.slice();
                for (let s = 0; s < e; s++)
                  n[s].complete();
                this.observers.length = 0
              }
              unsubscribe() {
                this.isStopped = !0, this.closed = !0, this.observers = null
              }
              _trySubscribe(t) {
                if (this.closed)
                  throw new b;
                return super._trySubscribe(t)
              }
              _subscribe(t) {
                if (this.closed)
                  throw new b;
                return this.hasError
                           ? (t.error(this.thrownError), h.EMPTY)
                           : this.isStopped
                                 ? (t.complete(), h.EMPTY)
                                 : (this.observers.push(t), new w(this, t))
              }
              asObservable() {
                const t = new _;
                return t.source = this, t
              }
            } return t.create = (t, e) => new E(t, e),
                            t
          })();
          class E extends S {
            constructor(t, e) { super(), this.destination = t, this.source = e }
            next(t) {
              const {destination : e} = this;
              e && e.next && e.next(t)
            }
            error(t) {
              const {destination : e} = this;
              e && e.error && this.destination.error(t)
            }
            complete() {
              const {destination : t} = this;
              t && t.complete && this.destination.complete()
            }
            _subscribe(t) {
              const {source : e} = this;
              return e ? this.source.subscribe(t) : h.EMPTY
            }
          }
          function C(t) { return t && "function" == typeof t.schedule }
          function k(t, e) {
            return function(n) {
              if ("function" != typeof t)
                throw new TypeError(
                    "argument is not a function. Are you looking for `mapTo()`?");
              return n.lift(new T(t, e))
            }
          }
          class T {
            constructor(t, e) { this.project = t, this.thisArg = e }
            call(t, e) {
              return e.subscribe(new A(t, this.project, this.thisArg))
            }
          }
          class A extends f {
            constructor(t, e, n) {
              super(t), this.project = e, this.count = 0,
                        this.thisArg = n || this
            }
            _next(t) {
              let e;
              try {
                e = this.project.call(this.thisArg, t, this.count++)
              } catch (n) {
                return void this.destination.error(n)
              }
              this.destination.next(e)
            }
          }
          const I = t => e => {
            for (let n = 0, s = t.length; n < s && !e.closed; n++)
              e.next(t[n]);
            e.complete()
          };
          function R() {
            return "function" == typeof Symbol && Symbol.iterator
                       ? Symbol.iterator
                       : "@@iterator"
          }
          const O = R(), P = t => t && "number" == typeof t.length &&
                                  "function" != typeof t;
          function L(t) {
            return !!t && "function" != typeof t.subscribe &&
                   "function" == typeof t.then
          }
          const D = t => {
            if (t && "function" == typeof t[g])
              return s = t, t => {
                const e = s[g]();
                if ("function" != typeof e.subscribe)
                  throw new TypeError(
                      "Provided object does not correctly implement Symbol.observable");
                return e.subscribe(t)
              };
            if (P(t))
              return I(t);
            if (L(t))
              return n = t,
                     t => (n.then(e => {t.closed || (t.next(e), t.complete())},
                                  e => t.error(e))
                               .then(null, o),
                           t);
            if (t && "function" == typeof t[O])
              return e = t, t => {
                const n = e[O]();
                for (;;) {
                  let e;
                  try {
                    e = n.next()
                  } catch (s) {
                    return t.error(s), t
                  }
                  if (e.done) {
                    t.complete();
                    break
                  }
                  if (t.next(e.value), t.closed)
                    break
                }
                return "function" == typeof n.return &&
                           t.add(() => {n.return && n.return()}),
                       t
              };
            {
              const e = c(t) ? "an invalid object" : `'${t}'`;
              throw new TypeError(`You provided ${
                  e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)
            }
            var e, n, s
          };
          function N(t, e) {
            return new _(n => {
              const s = new h;
              let i = 0;
              return s.add(e.schedule((function() {
                i !== t.length
                    ? (n.next(t[i++]), n.closed || s.add(this.schedule()))
                    : n.complete()
              }))),
                     s
            })
          }
          function F(t, e) {
            return e ? function(t, e) {
              if (null != t) {
                if (function(t) { return t && "function" == typeof t[g] }(t))
                  return function(t, e) {
                    return new _(n => {
                      const s = new h;
                      return s.add(e.schedule(() => {
                        const i = t[g]();
                        s.add(i.subscribe({
                          next(t) { s.add(e.schedule(() => n.next(t))) },
                          error(t) { s.add(e.schedule(() => n.error(t))) },
                          complete() { s.add(e.schedule(() => n.complete())) }
                        }))
                      })),
                             s
                    })
                  }(t, e);
                if (L(t))
                  return function(t, e) {
                    return new _(n => {
                      const s = new h;
                      return s.add(e.schedule(
                                 () => t.then(
                                     t => {s.add(e.schedule(() => {
                                       n.next(t),
                                       s.add(e.schedule(() => n.complete()))
                                     }))},
                                     t => {s.add(
                                         e.schedule(() => n.error(t)))}))),
                             s
                    })
                  }(t, e);
                if (P(t))
                  return N(t, e);
                if (function(t) { return t && "function" == typeof t[O] }(t) ||
                    "string" == typeof t)
                  return function(t, e) {
                    if (!t)
                      throw new Error("Iterable cannot be null");
                    return new _(n => {
                      const s = new h;
                      let i;
                      return s.add(() => {i && "function" == typeof i.return &&
                                          i.return()}),
                             s.add(e.schedule(() => {
                               i = t[O](),
                               s.add(e.schedule((function() {
                                 if (n.closed)
                                   return;
                                 let t, e;
                                 try {
                                   const n = i.next();
                                   t = n.value, e = n.done
                                 } catch (s) {
                                   return void n.error(s)
                                 }
                                 e ? n.complete() : (n.next(t), this.schedule())
                               })))
                             })),
                             s
                    })
                  }(t, e)
              }
              throw new TypeError((null !== t && typeof t || t) +
                                  " is not observable")
            }(t, e) : t instanceof _ ? t : new _(D(t))
          }
          class M extends f {
            constructor(t) { super(), this.parent = t }
            _next(t) { this.parent.notifyNext(t) }
            _error(t) { this.parent.notifyError(t), this.unsubscribe() }
            _complete() { this.parent.notifyComplete(), this.unsubscribe() }
          }
          class j extends f {
            notifyNext(t) { this.destination.next(t) }
            notifyError(t) { this.destination.error(t) }
            notifyComplete() { this.destination.complete() }
          }
          function V(t, e) {
            if (!e.closed)
              return t instanceof _ ? t.subscribe(e) : D(t)(e)
          }
          function B(t, e, n = Number.POSITIVE_INFINITY) {
            return "function" == typeof e
                       ? s => s.pipe(B((n, s) => F(t(n, s)).pipe(
                                           k((t, i) => e(n, t, s, i))),
                                       n))
                       : ("number" == typeof e && (n = e),
                          e => e.lift(new H(t, n)))
          }
          class H {
            constructor(t, e = Number.POSITIVE_INFINITY) {
              this.project = t, this.concurrent = e
            }
            call(t, e) {
              return e.subscribe(new U(t, this.project, this.concurrent))
            }
          }
          class U extends j {
            constructor(t, e, n = Number.POSITIVE_INFINITY) {
              super(t), this.project = e, this.concurrent = n,
                        this.hasCompleted = !1, this.buffer = [],
                        this.active = 0, this.index = 0
            }
            _next(t) {
              this.active < this.concurrent ? this._tryNext(t)
                                            : this.buffer.push(t)
            }
            _tryNext(t) {
              let e;
              const n = this.index++;
              try {
                e = this.project(t, n)
              } catch (s) {
                return void this.destination.error(s)
              }
              this.active++, this._innerSub(e)
            }
            _innerSub(t) {
              const e = new M(this), n = this.destination;
              n.add(e);
              const s = V(t, e);
              s !== e && n.add(s)
            }
            _complete() {
              this.hasCompleted = !0,
              0 === this.active && 0 === this.buffer.length &&
                  this.destination.complete(),
              this.unsubscribe()
            }
            notifyNext(t) { this.destination.next(t) }
            notifyComplete() {
              const t = this.buffer;
              this.active--, t.length > 0
                                 ? this._next(t.shift())
                                 : 0 === this.active && this.hasCompleted &&
                                       this.destination.complete()
            }
          }
          function z(t = Number.POSITIVE_INFINITY) { return B(y, t) }
          function $(t, e) { return e ? N(t, e) : new _(I(t)) }
          function q(...t) {
            let e = Number.POSITIVE_INFINITY, n = null, s = t[t.length - 1];
            return C(s) ? (n = t.pop(),
                           t.length > 1 && "number" == typeof t[t.length - 1] &&
                               (e = t.pop()))
                        : "number" == typeof s && (e = t.pop()),
                   null === n && 1 === t.length && t[0] instanceof _
                       ? t[0]
                       : z(e)($(t, n))
          }
          function W() {
            return function(t) { return t.lift(new G(t)) }
          }
          class G {
            constructor(t) { this.connectable = t }
            call(t, e) {
              const {connectable : n} = this;
              n._refCount++;
              const s = new Q(t, n), i = e.subscribe(s);
              return s.closed || (s.connection = n.connect()), i
            }
          }
          class Q extends f {
            constructor(t, e) { super(t), this.connectable = e }
            _unsubscribe() {
              const {connectable : t} = this;
              if (!t)
                return void (this.connection = null);
              this.connectable = null;
              const e = t._refCount;
              if (e <= 0)
                return void (this.connection = null);
              if (t._refCount = e - 1, e > 1)
                return void (this.connection = null);
              const {connection : n} = this, s = t._connection;
              this.connection = null, !s || n && s !== n || s.unsubscribe()
            }
          }
          class K extends _ {
            constructor(t, e) {
              super(), this.source = t, this.subjectFactory = e,
                       this._refCount = 0, this._isComplete = !1
            }
            _subscribe(t) { return this.getSubject().subscribe(t) }
            getSubject() {
              const t = this._subject;
              return t && !t.isStopped ||
                         (this._subject = this.subjectFactory()),
                     this._subject
            }
            connect() {
              let t = this._connection;
              return t || (this._isComplete = !1, t = this._connection = new h,
                           t.add(this.source.subscribe(
                               new Y(this.getSubject(), this))),
                           t.closed && (this._connection = null, t = h.EMPTY)),
                     t
            }
            refCount() { return W()(this) }
          }
          const Z = (() => {
            const t = K.prototype;
            return {
              operator: {value: null}, _refCount: {value: 0, writable: !0},
                  _subject: {value: null, writable: !0},
                  _connection: {value: null, writable: !0},
                  _subscribe: {value: t._subscribe},
                  _isComplete: {value: t._isComplete, writable: !0},
                  getSubject: {value: t.getSubject},
                  connect: {value: t.connect}, refCount: {value: t.refCount}
            }
          })();
          class Y extends x {
            constructor(t, e) { super(t), this.connectable = e }
            _error(t) { this._unsubscribe(), super._error(t) }
            _complete() {
              this.connectable._isComplete = !0, this._unsubscribe(),
              super._complete()
            }
            _unsubscribe() {
              const t = this.connectable;
              if (t) {
                this.connectable = null;
                const e = t._connection;
                t._refCount = 0, t._subject = null, t._connection = null,
                e && e.unsubscribe()
              }
            }
          }
          function X(t, e) {
            return function(n) {
              let s;
              if (s = "function" == typeof t ? t : function() { return t },
                  "function" == typeof e)
                return n.lift(new J(s, e));
              const i = Object.create(n, Z);
              return i.source = n, i.subjectFactory = s, i
            }
          }
          class J {
            constructor(t, e) { this.subjectFactory = t, this.selector = e }
            call(t, e) {
              const {selector : n} = this, s = this.subjectFactory(),
                                i = n(s).subscribe(t);
              return i.add(e.subscribe(s)), i
            }
          }
          function tt() { return new S }
          function et(t) { return {toString : t}.toString() }
          const nt = "__parameters__";
          function st(t, e, n) {
            return et(() => {
              const s = function(t) {
                return function(...e) {
                  if (t) {
                    const n = t(...e);
                    for (const t in n)
                      this[t] = n[t]
                  }
                }
              }(e);
              function i(...t) {
                if (this instanceof i)
                  return s.apply(this, t), this;
                const e = new i(...t);
                return n.annotation = e, n;
                function n(t, n, s) {
                  const i =
                      t.hasOwnProperty(nt)
                          ? t[nt]
                          : Object.defineProperty(t, nt, {value : []})[nt];
                  for (; i.length <= s;)
                    i.push(null);
                  return (i[s] = i[s] || []).push(e), t
                }
              }
              return n && (i.prototype = Object.create(n.prototype)),
                     i.prototype.ngMetadataName = t, i.annotationCls = i, i
            })
          }
          const it = st("Inject", t => ({token : t})), rt = st("Optional"),
                ot = st("Self"), at = st("SkipSelf");
          var lt = function(t) {
            return t[t.Default = 0] = "Default", t[t.Host = 1] = "Host",
                                 t[t.Self = 2] = "Self",
                                 t[t.SkipSelf = 4] = "SkipSelf",
                                 t[t.Optional = 8] = "Optional", t
          }({});
          function ct(t) {
            for (let e in t)
              if (t[e] === ct)
                return e;
            throw Error("Could not find renamed property on target object.")
          }
          function ut(t, e) {
            for (const n in e)
              e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n])
          }
          function ht(t) {
            return {
              token: t.token, providedIn: t.providedIn || null,
                  factory: t.factory, value: void 0
            }
          }
          function dt(t) {
            return {
              factory: t.factory, providers: t.providers || [],
                  imports: t.imports || []
            }
          }
          function pt(t) { return ft(t, t[gt]) || ft(t, t[vt]) }
          function ft(t, e) { return e && e.token === t ? e : null }
          function mt(t) {
            return t && (t.hasOwnProperty(yt) || t.hasOwnProperty(bt)) ? t[yt]
                                                                       : null
          }
          const gt = ct({"\u0275prov" : ct}), yt = ct({"\u0275inj" : ct}),
                _t = ct({"\u0275provFallback" : ct}),
                vt = ct({ngInjectableDef : ct}), bt = ct({ngInjectorDef : ct});
          function wt(t) {
            if ("string" == typeof t)
              return t;
            if (Array.isArray(t))
              return "[" + t.map(wt).join(", ") + "]";
            if (null == t)
              return "" + t;
            if (t.overriddenName)
              return "" + t.overriddenName;
            if (t.name)
              return "" + t.name;
            const e = t.toString();
            if (null == e)
              return "" + e;
            const n = e.indexOf("\n");
            return -1 === n ? e : e.substring(0, n)
          }
          function xt(t, e) {
            return null == t || "" === t
                       ? null === e ? "" : e
                       : null == e || "" === e ? t : t + " " + e
          }
          const St = ct({__forward_ref__ : ct});
          function Et(t) {
            return t.__forward_ref__ = Et,
                   t.toString = function() { return wt(this()) }, t
          }
          function Ct(t) { return kt(t) ? t() : t }
          function kt(t) {
            return "function" == typeof t && t.hasOwnProperty(St) &&
                   t.__forward_ref__ === Et
          }
          const Tt = "undefined" != typeof globalThis && globalThis,
                At = "undefined" != typeof window && window,
                It = "undefined" != typeof self &&
                     "undefined" != typeof WorkerGlobalScope &&
                     self instanceof WorkerGlobalScope && self,
                Rt = "undefined" != typeof global && global,
                Ot = Tt || Rt || At || It, Pt = ct({"\u0275cmp" : ct}),
                Lt = ct({"\u0275dir" : ct}), Dt = ct({"\u0275pipe" : ct}),
                Nt = ct({"\u0275mod" : ct}), Ft = ct({"\u0275loc" : ct}),
                Mt = ct({"\u0275fac" : ct}), jt = ct({__NG_ELEMENT_ID__ : ct});
          class Vt {
            constructor(t, e) {
              this._desc = t, this.ngMetadataName = "InjectionToken",
              this.\u0275prov = void 0,
              "number" == typeof e
                  ? this.__NG_ELEMENT_ID__ = e
                  : void 0 !== e && (this.\u0275prov = ht({
                                       token : this,
                                       providedIn : e.providedIn || "root",
                                       factory : e.factory
                                     }))
            }
            toString() { return "InjectionToken " + this._desc }
          }
          const Bt = new Vt("INJECTOR", -1), Ht = {}, Ut = /\n/gm,
                zt = "__source", $t = ct({provide : String, useValue : ct});
          let qt, Wt = void 0;
          function Gt(t) {
            const e = Wt;
            return Wt = t, e
          }
          function Qt(t) {
            const e = qt;
            return qt = t, e
          }
          function Kt(t, e = lt.Default) {
            if (void 0 === Wt)
              throw new Error(
                  "inject() must be called from an injection context");
            return null === Wt ? Xt(t, void 0, e)
                               : Wt.get(t, e & lt.Optional ? null : void 0, e)
          }
          function Zt(t, e = lt.Default) { return (qt || Kt)(Ct(t), e) }
          const Yt = Zt;
          function Xt(t, e, n) {
            const s = pt(t);
            if (s && "root" == s.providedIn)
              return void 0 === s.value ? s.value = s.factory() : s.value;
            if (n & lt.Optional)
              return null;
            if (void 0 !== e)
              return e;
            throw new Error(`Injector: NOT_FOUND [${wt(t)}]`)
          }
          function Jt(t) {
            const e = [];
            for (let n = 0; n < t.length; n++) {
              const s = Ct(t[n]);
              if (Array.isArray(s)) {
                if (0 === s.length)
                  throw new Error("Arguments array must have arguments.");
                let t = void 0, n = lt.Default;
                for (let e = 0; e < s.length; e++) {
                  const i = s[e];
                  i instanceof rt || "Optional" === i.ngMetadataName || i === rt
                      ? n |= lt.Optional
                      : i instanceof at || "SkipSelf" === i.ngMetadataName ||
                                i === at
                            ? n |= lt.SkipSelf
                            : i instanceof ot || "Self" === i.ngMetadataName ||
                                      i === ot
                                  ? n |= lt.Self
                                  : t = i instanceof it || i === it ? i.token
                                                                    : i
                }
                e.push(Zt(t, n))
              } else
                e.push(Zt(s))
            }
            return e
          }
          class te {
            get(t, e = Ht) {
              if (e === Ht) {
                const e =
                    new Error(`NullInjectorError: No provider for ${wt(t)}!`);
                throw e.name = "NullInjectorError", e
              }
              return e
            }
          }
          class ee {}
          class ne {}
          function se(t, e) {
            t.forEach(t => Array.isArray(t) ? se(t, e) : e(t))
          }
          function ie(t, e, n) { e >= t.length ? t.push(n) : t.splice(e, 0, n) }
          function re(t, e) {
            return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
          }
          function oe(t, e) {
            const n = [];
            for (let s = 0; s < t; s++)
              n.push(e);
            return n
          }
          function ae(t, e, n) {
            let s = ce(t, e);
            return s >= 0 ? t[1 | s] = n : (s = ~s, function(t, e, n, s) {
                     let i = t.length;
                     if (i == e)
                       t.push(n, s);
                     else if (1 === i)
                       t.push(s, t[0]), t[0] = n;
                     else {
                       for (i--, t.push(t[i - 1], t[i]); i > e;)
                         t[i] = t[i - 2], i--;
                       t[e] = n, t[e + 1] = s
                     }
                   }(t, s, e, n)), s
          }
          function le(t, e) {
            const n = ce(t, e);
            if (n >= 0)
              return t[1 | n]
          }
          function ce(t, e) {
            return function(t, e, n) {
              let s = 0, i = t.length >> 1;
              for (; i !== s;) {
                const n = s + (i - s >> 1), r = t[n << 1];
                if (e === r)
                  return n << 1;
                r > e ? i = n : s = n + 1
              }
              return ~(i << 1)
            }(t, e)
          }
          var ue = function(t) {
            return t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default", t
          }({}), he = function(t) {
            return t[t.Emulated = 0] = "Emulated", t[t.Native = 1] = "Native",
                                  t[t.None = 2] = "None",
                                  t[t.ShadowDom = 3] = "ShadowDom", t
          }({});
          const de = {}, pe = [];
          let fe = 0;
          function me(t) {
            return et(() => {
              const e = {}, n = {
                type : t.type,
                providersResolver : null,
                decls : t.decls,
                vars : t.vars,
                factory : null,
                template : t.template || null,
                consts : t.consts || null,
                ngContentSelectors : t.ngContentSelectors,
                hostBindings : t.hostBindings || null,
                hostVars : t.hostVars || 0,
                hostAttrs : t.hostAttrs || null,
                contentQueries : t.contentQueries || null,
                declaredInputs : e,
                inputs : null,
                outputs : null,
                exportAs : t.exportAs || null,
                onPush : t.changeDetection === ue.OnPush,
                directiveDefs : null,
                pipeDefs : null,
                selectors : t.selectors || pe,
                viewQuery : t.viewQuery || null,
                features : t.features || null,
                data : t.data || {},
                encapsulation : t.encapsulation || he.Emulated,
                id : "c",
                styles : t.styles || pe,
                _ : null,
                setInput : null,
                schemas : t.schemas || null,
                tView : null
              },
                    s = t.directives, i = t.features, r = t.pipes;
              return n.id += fe++,
                     n.inputs = be(t.inputs, e), n.outputs = be(t.outputs),
                     i && i.forEach(t => t(n)),
                     n.directiveDefs =
                         s ? () => ("function" == typeof s ? s() : s).map(ge)
                           : null,
                     n.pipeDefs =
                         r ? () => ("function" == typeof r ? r() : r).map(ye)
                           : null,
                     n
            })
          }
          function ge(t) {
            return Se(t) || function(t) { return t[Lt] || null }(t)
          }
          function ye(t) {
            return function(t) { return t[Dt] || null }(t)
          }
          const _e = {};
          function ve(t) {
            const e = {
              type : t.type,
              bootstrap : t.bootstrap || pe,
              declarations : t.declarations || pe,
              imports : t.imports || pe,
              exports : t.exports || pe,
              transitiveCompileScopes : null,
              schemas : t.schemas || null,
              id : t.id || null
            };
            return null != t.id && et(() => {_e[t.id] = t.type}), e
          }
          function be(t, e) {
            if (null == t)
              return de;
            const n = {};
            for (const s in t)
              if (t.hasOwnProperty(s)) {
                let i = t[s], r = i;
                Array.isArray(i) && (r = i[1], i = i[0]), n[i] = s,
                                                          e && (e[i] = r)
              }
            return n
          }
          const we = me;
          function xe(t) {
            return {
              type: t.type, name: t.name, factory: null, pure: !1 !== t.pure,
                  onDestroy: t.type.prototype.ngOnDestroy || null
            }
          }
          function Se(t) { return t[Pt] || null }
          function Ee(t, e) { return t.hasOwnProperty(Mt) ? t[Mt] : null }
          function Ce(t, e) {
            const n = t[Nt] || null;
            if (!n && !0 === e)
              throw new Error(
                  `Type ${wt(t)} does not have '\u0275mod' property.`);
            return n
          }
          const ke = 20, Te = 10;
          function Ae(t) { return Array.isArray(t) && "object" == typeof t[1] }
          function Ie(t) { return Array.isArray(t) && !0 === t[1] }
          function Re(t) { return 0 != (8 & t.flags) }
          function Oe(t) { return 2 == (2 & t.flags) }
          function Pe(t) { return 1 == (1 & t.flags) }
          function Le(t) { return null !== t.template }
          function De(t) { return 0 != (512 & t[2]) }
          class Ne {
            constructor(t, e, n) {
              this.previousValue = t, this.currentValue = e,
              this.firstChange = n
            }
            isFirstChange() { return this.firstChange }
          }
          function Fe() { return Me }
          function Me(t) {
            return t.type.prototype.ngOnChanges && (t.setInput = Ve), je
          }
          function je() {
            const t = Be(this), e = null == t ? void 0 : t.current;
            if (e) {
              const n = t.previous;
              if (n === de)
                t.previous = e;
              else
                for (let t in e)
                  n[t] = e[t];
              t.current = null, this.ngOnChanges(e)
            }
          }
          function Ve(t, e, n, s) {
            const i =
                Be(t) || function(t, e) { return t.__ngSimpleChanges__ = e }(
                             t, {previous : de, current : null}),
                  r = i.current || (i.current = {}), o = i.previous,
                  a = this.declaredInputs[n], l = o[a];
            r[a] = new Ne(l && l.currentValue, e, o === de), t[s] = e
          }
          function Be(t) { return t.__ngSimpleChanges__ || null }
          Fe.ngInherit = !0;
          let He = void 0;
          function Ue(t) { return !!t.listen }
          const ze = {
            createRenderer : (t, e) =>
                void 0 !== He
                    ? He
                    : "undefined" != typeof document ? document : void 0
          };
          function $e(t) {
            for (; Array.isArray(t);)
              t = t[0];
            return t
          }
          function qe(t, e) { return $e(e[t + ke]) }
          function We(t, e) { return $e(e[t.index]) }
          function Ge(t, e) { return t.data[e + ke] }
          function Qe(t, e) {
            const n = e[t];
            return Ae(n) ? n : n[0]
          }
          function Ke(t) {
            const e = function(t) { return t.__ngContext__ || null }(t);
            return e ? Array.isArray(e) ? e : e.lView : null
          }
          function Ze(t) { return 4 == (4 & t[2]) }
          function Ye(t) { return 128 == (128 & t[2]) }
          function Xe(t, e) { return null === t || null == e ? null : t[e] }
          function Je(t) { t[18] = 0 }
          function tn(t, e) {
            t[5] += e;
            let n = t, s = t[3];
            for (; null !== s &&
                   (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);)
              s[5] += e, n = s, s = s[3]
          }
          const en = {
            lFrame : wn(null),
            bindingsEnabled : !0,
            checkNoChangesMode : !1
          };
          function nn() { return en.bindingsEnabled }
          function sn() { return en.lFrame.lView }
          function rn() { return en.lFrame.tView }
          function on() { return en.lFrame.previousOrParentTNode }
          function an(t, e) {
            en.lFrame.previousOrParentTNode = t, en.lFrame.isParent = e
          }
          function ln() { return en.lFrame.isParent }
          function cn() { en.lFrame.isParent = !1 }
          function un() { return en.checkNoChangesMode }
          function hn(t) { en.checkNoChangesMode = t }
          function dn() {
            const t = en.lFrame;
            let e = t.bindingRootIndex;
            return -1 === e &&
                       (e = t.bindingRootIndex = t.tView.bindingStartIndex),
                   e
          }
          function pn() { return en.lFrame.bindingIndex++ }
          function fn(t, e) {
            const n = en.lFrame;
            n.bindingIndex = n.bindingRootIndex = t, mn(e)
          }
          function mn(t) { en.lFrame.currentDirectiveIndex = t }
          function gn() { return en.lFrame.currentQueryIndex }
          function yn(t) { en.lFrame.currentQueryIndex = t }
          function _n(t, e) {
            const n = bn();
            en.lFrame = n, n.previousOrParentTNode = e, n.lView = t
          }
          function vn(t, e) {
            const n = bn(), s = t[1];
            en.lFrame = n, n.previousOrParentTNode = e, n.lView = t,
            n.tView = s, n.contextLView = t,
            n.bindingIndex = s.bindingStartIndex
          }
          function bn() {
            const t = en.lFrame, e = null === t ? null : t.child;
            return null === e ? wn(t) : e
          }
          function wn(t) {
            const e = {
              previousOrParentTNode : null,
              isParent : !0,
              lView : null,
              tView : null,
              selectedIndex : 0,
              contextLView : null,
              elementDepthCount : 0,
              currentNamespace : null,
              currentDirectiveIndex : -1,
              bindingRootIndex : -1,
              bindingIndex : -1,
              currentQueryIndex : 0,
              parent : t,
              child : null
            };
            return null !== t && (t.child = e), e
          }
          function xn() {
            const t = en.lFrame;
            return en.lFrame = t.parent, t.previousOrParentTNode = null,
                   t.lView = null, t
          }
          const Sn = xn;
          function En() {
            const t = xn();
            t.isParent = !0, t.tView = null, t.selectedIndex = 0,
            t.contextLView = null, t.elementDepthCount = 0,
            t.currentDirectiveIndex = -1, t.currentNamespace = null,
            t.bindingRootIndex = -1, t.bindingIndex = -1,
            t.currentQueryIndex = 0
          }
          function Cn() { return en.lFrame.selectedIndex }
          function kn(t) { en.lFrame.selectedIndex = t }
          function Tn() {
            const t = en.lFrame;
            return Ge(t.tView, t.selectedIndex)
          }
          function An(t, e) {
            for (let n = e.directiveStart, s = e.directiveEnd; n < s; n++) {
              const e = t.data[n].type.prototype, {
                ngAfterContentInit : s,
                ngAfterContentChecked : i,
                ngAfterViewInit : r,
                ngAfterViewChecked : o,
                ngOnDestroy : a
              } = e;
              s && (t.contentHooks || (t.contentHooks = [])).push(-n, s),
                  i && ((t.contentHooks || (t.contentHooks = [])).push(n, i),
                        (t.contentCheckHooks || (t.contentCheckHooks = []))
                            .push(n, i)),
                  r && (t.viewHooks || (t.viewHooks = [])).push(-n, r),
                  o && ((t.viewHooks || (t.viewHooks = [])).push(n, o),
                        (t.viewCheckHooks || (t.viewCheckHooks = []))
                            .push(n, o)),
                  null != a &&
                      (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
            }
          }
          function In(t, e, n) { Pn(t, e, 3, n) }
          function Rn(t, e, n, s) { (3 & t[2]) === n && Pn(t, e, n, s) }
          function On(t, e) {
            let n = t[2];
            (3 & n) === e && (n &= 2047, n += 1, t[2] = n)
          }
          function Pn(t, e, n, s) {
            const i = null != s ? s : -1;
            let r = 0;
            for (let o = void 0 !== s ? 65535 & t[18] : 0; o < e.length; o++)
              if ("number" == typeof e[o + 1]) {
                if (r = e[o], null != s && r >= s)
                  break
              } else
                e[o] < 0 && (t[18] += 65536),
                    (r < i || -1 == i) &&
                        (Ln(t, n, e, o), t[18] = (4294901760 & t[18]) + o + 2),
                    o++
          }
          function Ln(t, e, n, s) {
            const i = n[s] < 0, r = n[s + 1], o = t[i ? -n[s] : n[s]];
            i ? t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e &&
                    (t[2] += 2048, r.call(o))
              : r.call(o)
          }
          class Dn {
            constructor(t, e, n) {
              this.factory = t, this.resolving = !1,
              this.canSeeViewProviders = e, this.injectImpl = n
            }
          }
          function Nn(t, e, n) {
            const s = Ue(t);
            let i = 0;
            for (; i < n.length;) {
              const r = n[i];
              if ("number" == typeof r) {
                if (0 !== r)
                  break;
                i++;
                const o = n[i++], a = n[i++], l = n[i++];
                s ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
              } else {
                const o = r, a = n[++i];
                Mn(o) ? s && t.setProperty(e, o, a)
                      : s ? t.setAttribute(e, o, a) : e.setAttribute(o, a),
                    i++
              }
            }
            return i
          }
          function Fn(t) { return 3 === t || 4 === t || 6 === t }
          function Mn(t) { return 64 === t.charCodeAt(0) }
          function jn(t, e) {
            if (null === e || 0 === e.length)
              ;
            else if (null === t || 0 === t.length)
              t = e.slice();
            else {
              let n = -1;
              for (let s = 0; s < e.length; s++) {
                const i = e[s];
                "number" == typeof i
                    ? n = i
                    : 0 === n ||
                          Vn(t, n, i, null, -1 === n || 2 === n ? e[++s] : null)
              }
            }
            return t
          }
          function Vn(t, e, n, s, i) {
            let r = 0, o = t.length;
            if (-1 === e)
              o = -1;
            else
              for (; r < t.length;) {
                const n = t[r++];
                if ("number" == typeof n) {
                  if (n === e) {
                    o = -1;
                    break
                  }
                  if (n > e) {
                    o = r - 1;
                    break
                  }
                }
              }
            for (; r < t.length;) {
              const e = t[r];
              if ("number" == typeof e)
                break;
              if (e === n) {
                if (null === s)
                  return void (null !== i && (t[r + 1] = i));
                if (s === t[r + 1])
                  return void (t[r + 2] = i)
              }
              r++, null !== s && r++, null !== i && r++
            }
            -1 !== o && (t.splice(o, 0, e), r = o + 1), t.splice(r++, 0, n),
                null !== s && t.splice(r++, 0, s),
                null !== i && t.splice(r++, 0, i)
          }
          function Bn(t) { return -1 !== t }
          function Hn(t) { return 32767 & t }
          function Un(t) { return t >> 16 }
          function zn(t, e) {
            let n = Un(t), s = e;
            for (; n > 0;)
              s = s[15], n--;
            return s
          }
          function $n(t) {
            return "string" == typeof t ? t : null == t ? "" : "" + t
          }
          function qn(t) {
            return"function"==typeof t?t.name||t.toString():"object"==typeof t&&null!=t&&"function"==typeof t.type?t.type.name||t.type.toString():$n(t)
          }
          const Wn = (() => ("undefined" != typeof requestAnimationFrame &&
                                 requestAnimationFrame ||
                             setTimeout)
                                .bind(Ot))();
          function Gn(t) {
            return { name: "body", target: t.ownerDocument.body }
          }
          function Qn(t) { return t instanceof Function ? t() : t }
          let Kn = !0;
          function Zn(t) {
            const e = Kn;
            return Kn = t, e
          }
          let Yn = 0;
          function Xn(t, e) {
            const n = ts(t, e);
            if (-1 !== n)
              return n;
            const s = e[1];
            s.firstCreatePass && (t.injectorIndex = e.length, Jn(s.data, t),
                                  Jn(e, null), Jn(s.blueprint, null));
            const i = es(t, e), r = t.injectorIndex;
            if (Bn(i)) {
              const t = Hn(i), n = zn(i, e), s = n[1].data;
              for (let i = 0; i < 8; i++)
                e[r + i] = n[t + i] | s[t + i]
            }
            return e[r + 8] = i, r
          }
          function Jn(t, e) { t.push(0, 0, 0, 0, 0, 0, 0, 0, e) }
          function ts(t, e) {
            return -1 === t.injectorIndex ||
                           t.parent &&
                               t.parent.injectorIndex === t.injectorIndex ||
                           null == e[t.injectorIndex + 8]
                       ? -1
                       : t.injectorIndex
          }
          function es(t, e) {
            if (t.parent && -1 !== t.parent.injectorIndex)
              return t.parent.injectorIndex;
            let n = e[6], s = 1;
            for (; n && -1 === n.injectorIndex;)
              n = (e = e[15]) ? e[6] : null, s++;
            return n ? n.injectorIndex | s << 16 : -1
          }
          function ns(t, e, n) {
            !function(t, e, n) {
              let s;
              "string" == typeof n ? s = n.charCodeAt(0) || 0
                                   : n.hasOwnProperty(jt) && (s = n[jt]),
                                     null == s && (s = n[jt] = Yn++);
              const i = 255 & s, r = 1 << i, o = 64 & i, a = 32 & i, l = e.data;
              128&i ? o ? a ? l[t + 7] |= r : l[t + 6] |= r
                        : a ? l[t + 5] |= r : l[t + 4] |= r
                    : o ? a ? l[t + 3] |= r : l[t + 2] |= r
                        : a ? l[t + 1] |= r : l[t] |= r
            }(t, e, n)
          }
          function ss(t, e, n, s = lt.Default, i) {
            if (null !== t) {
              const i = function(t) {
                if ("string" == typeof t)
                  return t.charCodeAt(0) || 0;
                const e = t.hasOwnProperty(jt) ? t[jt] : void 0;
                return "number" == typeof e && e > 0 ? 255 & e : e
              }(n);
              if ("function" == typeof i) {
                _n(e, t);
                try {
                  const t = i();
                  if (null != t || s & lt.Optional)
                    return t;
                  throw new Error(`No provider for ${qn(n)}!`)
                } finally {
                  Sn()
                }
              } else if ("number" == typeof i) {
                if (-1 === i)
                  return new us(t, e);
                let r = null, o = ts(t, e), a = -1,
                    l = s & lt.Host ? e[16][6] : null;
                for ((-1 === o || s & lt.SkipSelf) &&
                         (a = -1 === o ? es(t, e) : e[o + 8],
                         cs(s, !1) ? (r = e[1], o = Hn(a), e = zn(a, e))
                                   : o = -1);
                     - 1 !== o;) {
                  a = e[o + 8];
                  const t = e[1];
                  if (ls(i, o, t.data)) {
                    const t = rs(o, e, n, r, s, l);
                    if (t !== is)
                      return t
                  }
                  cs(s, e[1].data[o + 8] === l) && ls(i, o, e)
                      ? (r = t, o = Hn(a), e = zn(a, e))
                      : o = -1
                }
              }
            }
            if (s & lt.Optional && void 0 === i && (i = null),
                0 == (s & (lt.Self | lt.Host))) {
              const t = e[9], r = Qt(void 0);
              try {
                return t ? t.get(n, i, s & lt.Optional)
                         : Xt(n, i, s & lt.Optional)
              } finally {
                Qt(r)
              }
            }
            if (s & lt.Optional)
              return i;
            throw new Error(`NodeInjector: NOT_FOUND [${qn(n)}]`)
          }
          const is = {};
          function rs(t, e, n, s, i, r) {
            const o = e[1], a = o.data[t + 8],
                  l = os(a, o, n,
                         null == s ? Oe(a) && Kn : s != o && 3 === a.type,
                         i & lt.Host && r === a);
            return null !== l ? as (e, o, l, a) : is
          }
          function os(t, e, n, s, i) {
            const r = t.providerIndexes, o = e.data, a = 1048575 & r,
                  l = t.directiveStart, c = r >> 20,
                  u = i ? a + c : t.directiveEnd;
            for (let h = s ? a : a + c; h < u; h++) {
              const t = o[h];
              if (h < l && n === t || h >= l && t.type === n)
                return h
            }
            if (i) {
              const t = o[l];
              if (t && Le(t) && t.type === n)
                return l
            }
            return null
          }
          function as (t, e, n, s) {
            let i = t[n];
            const r = e.data;
            if (i instanceof Dn) {
              const o = i;
              if (o.resolving)
                throw new Error("Circular dep for " + qn(r[n]));
              const a = Zn(o.canSeeViewProviders);
              let l;
              o.resolving = !0, o.injectImpl && (l = Qt(o.injectImpl)),
              _n(t, s);
              try {
                i = t[n] = o.factory(void 0, r, t, s),
                e.firstCreatePass &&
                    n >= s.directiveStart && function(t, e, n) {
                      const {ngOnChanges : s, ngOnInit : i, ngDoCheck : r} =
                          e.type.prototype;
                      if (s) {
                        const s = Me(e);
                        (n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                            (n.preOrderCheckHooks ||
                             (n.preOrderCheckHooks = []))
                                .push(t, s)
                      }
                      i && (n.preOrderHooks || (n.preOrderHooks = []))
                               .push(0 - t, i),
                          r && ((n.preOrderHooks || (n.preOrderHooks = []))
                                    .push(t, r),
                                (n.preOrderCheckHooks ||
                                 (n.preOrderCheckHooks = []))
                                    .push(t, r))
                    }(n, r[n], e)
              } finally {
                o.injectImpl && Qt(l), Zn(a), o.resolving = !1, Sn()
              }
            }
            return i
          }
          function ls(t, e, n) {
            const s = 64 & t, i = 32 & t;
            let r;
            return r = 128 & t
                           ? s ? i ? n[e + 7] : n[e + 6]
                               : i ? n[e + 5] : n[e + 4]
                           : s ? i ? n[e + 3] : n[e + 2] : i ? n[e + 1] : n[e],
                   !!(r & 1 << t)
          }
          function cs(t, e) { return !(t & lt.Self || t & lt.Host && e) }
          class us {
            constructor(t, e) { this._tNode = t, this._lView = e }
            get(t, e) { return ss(this._tNode, this._lView, t, void 0, e) }
          }
          function hs(t) {
            const e = t;
            if (kt(t))
              return () => {
                const t = hs(Ct(e));
                return t ? t() : null
              };
            let n = Ee(e);
            if (null === n) {
              const t = mt(e);
              n = t && t.factory
            }
            return n || null
          }
          function ds(t) {
            return et(() => {
              const e = t.prototype.constructor, n = e[Mt] || hs(e),
                    s = Object.prototype;
              let i = Object.getPrototypeOf(t.prototype).constructor;
              for (; i && i !== s;) {
                const t = i[Mt] || hs(i);
                if (t && t !== n)
                  return t;
                i = Object.getPrototypeOf(i)
              }
              return t => new t
            })
          }
          function ps(t) { return t.ngDebugContext }
          function fs(t) { return t.ngOriginalError }
          function ms(t, ...e) { t.error(...e) }
          class gs {
            constructor() { this._console = console }
            handleError(t) {
              const e = this._findOriginalError(t), n = this._findContext(t),
                    s = function(t) { return t.ngErrorLogger || ms }(t);
              s(this._console, "ERROR", t),
                  e && s(this._console, "ORIGINAL ERROR", e),
                  n && s(this._console, "ERROR CONTEXT", n)
            }
            _findContext(t) {
              return t ? ps(t) ? ps(t) : this._findContext(fs(t)) : null
            }
            _findOriginalError(t) {
              let e = fs(t);
              for (; e && fs(e);)
                e = fs(e);
              return e
            }
          }
          class ys {
            constructor(t) { this.changingThisBreaksApplicationSecurity = t }
            toString() {
              return "SafeValue must use [property]=binding: " +
                     this.changingThisBreaksApplicationSecurity +
                     " (see http://g.co/ng/security#xss)"
            }
          }
          class _s extends ys {
            getTypeName() { return "HTML" }
          }
          class vs extends ys {
            getTypeName() { return "Style" }
          }
          class bs extends ys {
            getTypeName() { return "Script" }
          }
          class ws extends ys {
            getTypeName() { return "URL" }
          }
          class xs extends ys {
            getTypeName() { return "ResourceURL" }
          }
          function Ss(t) {
            return t instanceof ys ? t.changingThisBreaksApplicationSecurity : t
          }
          function Es(t, e) {
            const n = Cs(t);
            if (null != n && n !== e) {
              if ("ResourceURL" === n && "URL" === e)
                return !0;
              throw new Error(`Required a safe ${e}, got a ${
                  n} (see http://g.co/ng/security#xss)`)
            }
            return n === e
          }
          function Cs(t) { return t instanceof ys && t.getTypeName() || null }
          let ks = !0, Ts = !1;
          function As() { return Ts = !0, ks }
          class Is {
            getInertBodyElement(t) {
              t = "<body><remove></remove>" + t;
              try {
                const e =
                    (new window.DOMParser).parseFromString(t, "text/html").body;
                return e.removeChild(e.firstChild), e
              } catch (e) {
                return null
              }
            }
          }
          class Rs {
            constructor(t) {
              if (this.defaultDoc = t,
                  this.inertDocument =
                      this.defaultDoc.implementation.createHTMLDocument(
                          "sanitization-inert"),
                  null == this.inertDocument.body) {
                const t = this.inertDocument.createElement("html");
                this.inertDocument.appendChild(t);
                const e = this.inertDocument.createElement("body");
                t.appendChild(e)
              }
            }
            getInertBodyElement(t) {
              const e = this.inertDocument.createElement("template");
              if ("content" in e)
                return e.innerHTML = t, e;
              const n = this.inertDocument.createElement("body");
              return n.innerHTML = t,
                     this.defaultDoc.documentMode && this.stripCustomNsAttrs(n),
                     n
            }
            stripCustomNsAttrs(t) {
              const e = t.attributes;
              for (let s = e.length - 1; 0 < s; s--) {
                const n = e.item(s).name;
                "xmlns:ns1" !== n && 0 !== n.indexOf("ns1:") ||
                    t.removeAttribute(n)
              }
              let n = t.firstChild;
              for (; n;)
                n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
                    n = n.nextSibling
            }
          }
          const Os =
              /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
                Ps =
                    /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
          function Ls(t) {
            return (t = String(t)).match(Os) || t.match(Ps)
                       ? t
                       : (As() &&
                              console.warn(
                                  `WARNING: sanitizing unsafe URL value ${
                                      t} (see http://g.co/ng/security#xss)`),
                          "unsafe:" + t)
          }
          function Ds(t) {
            const e = {};
            for (const n of t.split(","))
              e[n] = !0;
            return e
          }
          function Ns(...t) {
            const e = {};
            for (const n of t)
              for (const t in n)
                n.hasOwnProperty(t) && (e[t] = !0);
            return e
          }
          const Fs = Ds("area,br,col,hr,img,wbr"),
                Ms = Ds("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                js = Ds("rp,rt"), Vs = Ns(js, Ms),
                Bs = Ns(
                    Fs,
                    Ns(Ms,
                       Ds("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),
                    Ns(js,
                       Ds("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),
                    Vs),
                Hs = Ds(
                    "background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
                Us = Ds("srcset"),
                zs = Ns(Hs,
                        Us, Ds("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), Ds("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
                $s = Ds("script,style,template");
          class qs {
            constructor() { this.sanitizedSomething = !1, this.buf = [] }
            sanitizeChildren(t) {
              let e = t.firstChild, n = !0;
              for (; e;)
                if (e.nodeType === Node.ELEMENT_NODE
                        ? n = this.startElement(e)
                        : e.nodeType === Node.TEXT_NODE
                              ? this.chars(e.nodeValue)
                              : this.sanitizedSomething = !0,
                    n && e.firstChild)
                  e = e.firstChild;
                else
                  for (; e;) {
                    e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                    let t = this.checkClobberedElement(e, e.nextSibling);
                    if (t) {
                      e = t;
                      break
                    }
                    e = this.checkClobberedElement(e, e.parentNode)
                  }
              return this.buf.join("")
            }
            startElement(t) {
              const e = t.nodeName.toLowerCase();
              if (!Bs.hasOwnProperty(e))
                return this.sanitizedSomething = !0, !$s.hasOwnProperty(e);
              this.buf.push("<"), this.buf.push(e);
              const n = t.attributes;
              for (let i = 0; i < n.length; i++) {
                const t = n.item(i), e = t.name, r = e.toLowerCase();
                if (!zs.hasOwnProperty(r)) {
                  this.sanitizedSomething = !0;
                  continue
                }
                let o = t.value;
                Hs[r] && (o = Ls(o)),
                    Us[r] && (s = o, o = (s = String(s))
                                             .split(",")
                                             .map(t => Ls(t.trim()))
                                             .join(", ")),
                    this.buf.push(" ", e, '="', Qs(o), '"')
              }
              var s;
              return this.buf.push(">"), !0
            }
            endElement(t) {
              const e = t.nodeName.toLowerCase();
              Bs.hasOwnProperty(e) && !Fs.hasOwnProperty(e) &&
                  (this.buf.push("</"), this.buf.push(e), this.buf.push(">"))
            }
            chars(t) { this.buf.push(Qs(t)) }
            checkClobberedElement(t, e) {
              if (e && (t.compareDocumentPosition(e) &
                        Node.DOCUMENT_POSITION_CONTAINED_BY) ===
                           Node.DOCUMENT_POSITION_CONTAINED_BY)
                throw new Error(
                    "Failed to sanitize html because the element is clobbered: " +
                    t.outerHTML);
              return e
            }
          }
          const Ws = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Gs = /([^\#-~ |!])/g;
          function Qs(t) {
            return t.replace(/&/g, "&amp;")
                .replace(Ws, (function(t) {
                           return "&#" +
                                  (1024 * (t.charCodeAt(0) - 55296) +
                                   (t.charCodeAt(1) - 56320) + 65536) +
                                  ";"
                         }))
                .replace(Gs,
                         (function(t) { return "&#" + t.charCodeAt(0) + ";" }))
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
          }
          let Ks;
          function Zs(t) {
            return "content" in t && function(t) {
              return t.nodeType === Node.ELEMENT_NODE &&
                     "TEMPLATE" === t.nodeName
            }(t) ? t.content : null
          }
          var Ys = function(t) {
            return t[t.NONE = 0] = "NONE", t[t.HTML = 1] = "HTML",
                              t[t.STYLE = 2] = "STYLE",
                              t[t.SCRIPT = 3] = "SCRIPT", t[t.URL = 4] = "URL",
                              t[t.RESOURCE_URL = 5] = "RESOURCE_URL", t
          }({});
          function Xs(t, e) { t.__ngContext__ = e }
          function Js(t, e, n) {
            let s = t.length;
            for (;;) {
              const i = t.indexOf(e, n);
              if (-1 === i)
                return i;
              if (0 === i || t.charCodeAt(i - 1) <= 32) {
                const n = e.length;
                if (i + n === s || t.charCodeAt(i + n) <= 32)
                  return i
              }
              n = i + 1
            }
          }
          const ti = "ng-template";
          function ei(t, e, n) {
            let s = 0;
            for (; s < t.length;) {
              let i = t[s++];
              if (n && "class" === i) {
                if (i = t[s], -1 !== Js(i.toLowerCase(), e, 0))
                  return !0
              } else if (1 === i) {
                for (; s < t.length && "string" == typeof (i = t[s++]);)
                  if (i.toLowerCase() === e)
                    return !0;
                return !1
              }
            }
            return !1
          }
          function ni(t) { return 0 === t.type && t.tagName !== ti }
          function si(t, e, n) {
            return e === (0 !== t.type || n ? t.tagName : ti)
          }
          function ii(t, e, n) {
            let s = 4;
            const i = t.attrs || [], r = function(t) {
              for (let e = 0; e < t.length; e++)
                if (Fn(t[e]))
                  return e;
              return t.length
            }(i);
            let o = !1;
            for (let a = 0; a < e.length; a++) {
              const l = e[a];
              if ("number" != typeof l) {
                if (!o)
                  if (4 & s) {
                    if (s = 2 | 1 & s, "" !== l && !si(t, l, n) ||
                                           "" === l && 1 === e.length) {
                      if (ri(s))
                        return !1;
                      o = !0
                    }
                  } else {
                    const c = 8 & s ? l : e[++a];
                    if (8 & s && null !== t.attrs) {
                      if (!ei(t.attrs, c, n)) {
                        if (ri(s))
                          return !1;
                        o = !0
                      }
                      continue
                    }
                    const u = oi(8 & s ? "class" : l, i, ni(t), n);
                    if (-1 === u) {
                      if (ri(s))
                        return !1;
                      o = !0;
                      continue
                    }
                    if ("" !== c) {
                      let t;
                      t = u > r ? "" : i[u + 1].toLowerCase();
                      const e = 8 & s ? t : null;
                      if (e && -1 !== Js(e, c, 0) || 2 & s && c !== t) {
                        if (ri(s))
                          return !1;
                        o = !0
                      }
                    }
                  }
              } else {
                if (!o && !ri(s) && !ri(l))
                  return !1;
                if (o && ri(l))
                  continue;
                o = !1, s = l | 1 & s
              }
            }
            return ri(s) || o
          }
          function ri(t) { return 0 == (1 & t) }
          function oi(t, e, n, s) {
            if (null === e)
              return -1;
            let i = 0;
            if (s || !n) {
              let n = !1;
              for (; i < e.length;) {
                const s = e[i];
                if (s === t)
                  return i;
                if (3 === s || 6 === s)
                  n = !0;
                else {
                  if (1 === s || 2 === s) {
                    let t = e[++i];
                    for (; "string" == typeof t;)
                      t = e[++i];
                    continue
                  }
                  if (4 === s)
                    break;
                  if (0 === s) {
                    i += 4;
                    continue
                  }
                }
                i += n ? 1 : 2
              }
              return -1
            }
            return function(t, e) {
              let n = t.indexOf(4);
              if (n > -1)
                for (n++; n < t.length;) {
                  const s = t[n];
                  if ("number" == typeof s)
                    return -1;
                  if (s === e)
                    return n;
                  n++
                }
              return -1
            }(e, t)
          }
          function ai(t, e, n = !1) {
            for (let s = 0; s < e.length; s++)
              if (ii(t, e[s], n))
                return !0;
            return !1
          }
          function li(t, e) { return t ? ":not(" + e.trim() + ")" : e }
          function ci(t) {
            let e = t[0], n = 1, s = 2, i = "", r = !1;
            for (; n < t.length;) {
              let o = t[n];
              if ("string" == typeof o)
                if (2 & s) {
                  const e = t[++n];
                  i += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
                } else
                  8&s ? i += "." + o : 4 & s && (i += " " + o);
              else
                "" === i || ri(o) || (e += li(r, i), i = ""), s = o,
                                                              r = r || !ri(s);
              n++
            }
            return "" !== i && (e += li(r, i)), e
          }
          const ui = {};
          function hi(t) {
            const e = t[3];
            return Ie(e) ? e[3] : e
          }
          function di(t) { return fi(t[13]) }
          function pi(t) { return fi(t[4]) }
          function fi(t) {
            for (; null !== t && !Ie(t);)
              t = t[4];
            return t
          }
          function mi(t) { gi(rn(), sn(), Cn() + t, un()) }
          function gi(t, e, n, s) {
            if (!s)
              if (3 == (3 & e[2])) {
                const s = t.preOrderCheckHooks;
                null !== s && In(e, s, n)
              } else {
                const s = t.preOrderHooks;
                null !== s && Rn(e, s, 0, n)
              }
            kn(n)
          }
          function yi(t, e) { return t << 17 | e << 2 }
          function _i(t) { return t >> 17 & 32767 }
          function vi(t) { return 2 | t }
          function bi(t) { return (131068 & t) >> 2 }
          function wi(t, e) { return -131069 & t | e << 2 }
          function xi(t) { return 1 | t }
          function Si(t, e) {
            const n = t.contentQueries;
            if (null !== n)
              for (let s = 0; s < n.length; s += 2) {
                const i = n[s], r = n[s + 1];
                if (-1 !== r) {
                  const n = t.data[r];
                  yn(i), n.contentQueries(2, e[r], r)
                }
              }
          }
          function Ei(t, e, n) {
            return Ue(e) ? e.createElement(t, n)
                         : null === n ? e.createElement(t)
                                      : e.createElementNS(n, t)
          }
          function Ci(t, e, n, s, i, r, o, a, l, c) {
            const u = e.blueprint.slice();
            return u[0] = i, u[2] = 140 | s, Je(u), u[3] = u[15] = t, u[8] = n,
                   u[10] = o || t && t[10], u[11] = a || t && t[11],
                   u[12] = l || t && t[12] || null,
                   u[9] = c || t && t[9] || null, u[6] = r,
                   u[16] = 2 == e.type ? t[16] : u, u
          }
          function ki(t, e, n, s, i, r) {
            const o = n + ke, a = t.data[o] || function(t, e, n, s, i, r) {
              const o = on(), a = ln(), l = a ? o : o && o.parent,
                    c = t.data[n] = Fi(0, l && l !== e ? l : null, s, n, i, r);
              return null === t.firstChild && (t.firstChild = c),
                     o &&
                         (!a || null != o.child || null === c.parent && 2 !== o.type ? a ||
                                                                                           (o.next =
                                                                                                c)
                                                                                     : o.child =
                                                                                           c),
                     c
            }(t, e, o, s, i, r);
            return an(a, !0), a
          }
          function Ti(t, e, n) {
            vn(e, e[6]);
            try {
              const s = t.viewQuery;
              null !== s && ir(1, s, n);
              const i = t.template;
              null !== i && Ri(t, e, i, 1, n),
                  t.firstCreatePass && (t.firstCreatePass = !1),
                  t.staticContentQueries && Si(t, e),
                  t.staticViewQueries && ir(2, t.viewQuery, n);
              const r = t.components;
              null !== r && function(t, e) {
                for (let n = 0; n < e.length; n++)
                  Ji(t, e[n])
              }(e, r)
            } catch (s) {
              throw t.firstCreatePass && (t.incompleteFirstPass = !0), s
            } finally {
              e[2] &= -5, En()
            }
          }
          function Ai(t, e, n, s) {
            const i = e[2];
            if (256 == (256 & i))
              return;
            vn(e, e[6]);
            const r = un();
            try {
              Je(e), en.lFrame.bindingIndex = t.bindingStartIndex,
                     null !== n && Ri(t, e, n, 2, s);
              const o = 3 == (3 & i);
              if (!r)
                if (o) {
                  const n = t.preOrderCheckHooks;
                  null !== n && In(e, n, null)
                } else {
                  const n = t.preOrderHooks;
                  null !== n && Rn(e, n, 0, null), On(e, 0)
                }
              if (
                  function(t) {
                    for (let e = di(t); null !== e; e = pi(e)) {
                      if (!e[2])
                        continue;
                      const t = e[9];
                      for (let e = 0; e < t.length; e++) {
                        const n = t[e], s = n[3];
                        0 == (1024 & n[2]) && tn(s, 1), n[2] |= 1024
                      }
                    }
                  }(e),
                  function(t) {
                    for (let e = di(t); null !== e; e = pi(e))
                      for (let t = Te; t < e.length; t++) {
                        const n = e[t], s = n[1];
                        Ye(n) && Ai(s, n, s.template, n[8])
                      }
                  }(e),
                  null !== t.contentQueries && Si(t, e), !r)
                if (o) {
                  const n = t.contentCheckHooks;
                  null !== n && In(e, n)
                } else {
                  const n = t.contentHooks;
                  null !== n && Rn(e, n, 1), On(e, 1)
                }
              !function(t, e) {
                try {
                  const n = t.expandoInstructions;
                  if (null !== n) {
                    let s = t.expandoStartIndex, i = -1, r = -1;
                    for (let t = 0; t < n.length; t++) {
                      const o = n[t];
                      "number" == typeof o
                          ? o <= 0 ? (r = 0 - o, kn(r), s += 9 + n[++t], i = s)
                                   : s += o
                          : (null !== o && (fn(s, i), o(2, e[i])), i++)
                    }
                  }
                } finally {
                  kn(-1)
                }
              }(t, e);
              const a = t.components;
              null !== a && function(t, e) {
                for (let n = 0; n < e.length; n++)
                  Xi(t, e[n])
              }(e, a);
              const l = t.viewQuery;
              if (null !== l && ir(2, l, s), !r)
                if (o) {
                  const n = t.viewCheckHooks;
                  null !== n && In(e, n)
                } else {
                  const n = t.viewHooks;
                  null !== n && Rn(e, n, 2), On(e, 2)
                }
              !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
                  r || (e[2] &= -73), 1024&e[2] && (e[2] &= -1025, tn(e[3], -1))
            } finally {
              En()
            }
          }
          function Ii(t, e, n, s) {
            const i = e[10], r = !un(), o = Ze(e);
            try {
              r && !o && i.begin && i.begin(), o && Ti(t, e, s), Ai(t, e, n, s)
            } finally {
              r && !o && i.end && i.end()
            }
          }
          function Ri(t, e, n, s, i) {
            const r = Cn();
            try {
              kn(-1), 2&s && e.length > ke && gi(t, e, 0, un()), n(s, i)
            } finally {
              kn(r)
            }
          }
          function Oi(t, e, n) {
            nn()&&(function(t,e,n,s){const i=n.directiveStart,r=n.directiveEnd;t.firstCreatePass||Xn(n,e),Xs(s,e);const o=n.initialInputs;for(let a=i;a<r;a++){const s=t.data[a],r=Le(s);r&&Qi(e,n,s);const l=as(e,t,a,n);Xs(l,e),null!==o&&Ki(0,a-i,l,s,0,o),r&&(Qe(n.index,e)[8]=l)}}(t,e,n,We(n,e)),128==(128&n.flags)&&function(t,e,n){const s=n.directiveStart,i=n.directiveEnd,r=t.expandoInstructions,o=t.firstCreatePass,a=n.index-ke,l=en.lFrame.currentDirectiveIndex;try{kn(a);for(let n=s;n<i;n++){const s=t.data[n],i=e[n];mn(n),null!==s.hostBindings||0!==s.hostVars||null!==s.hostAttrs?Ui(s,i):o&&r.push(null)}}finally{kn(-1),mn(l)}}(t,e,n))
          }
          function Pi(t, e, n = We) {
            const s = e.localNames;
            if (null !== s) {
              let i = e.index + 1;
              for (let r = 0; r < s.length; r += 2) {
                const o = s[r + 1], a = -1 === o ? n(e, t) : t[o];
                t[i++] = a
              }
            }
          }
          function Li(t) {
            const e = t.tView;
            return null === e || e.incompleteFirstPass
                       ? t.tView = Di(1, -1, t.template, t.decls, t.vars,
                                      t.directiveDefs, t.pipeDefs, t.viewQuery,
                                      t.schemas, t.consts)
                       : e
          }
          function Di(t, e, n, s, i, r, o, a, l, c) {
            const u = ke + s, h = u + i, d = function(t, e) {
              const n = [];
              for (let s = 0; s < e; s++)
                n.push(s < t ? null : ui);
              return n
            }(u, h), p = "function" == typeof c ? c() : c;
            return d[1] = {
              type : t,
              id : e,
              blueprint : d,
              template : n,
              queries : null,
              viewQuery : a,
              node : null,
              data : d.slice().fill(null, u),
              bindingStartIndex : u,
              expandoStartIndex : h,
              expandoInstructions : null,
              firstCreatePass : !0,
              firstUpdatePass : !0,
              staticViewQueries : !1,
              staticContentQueries : !1,
              preOrderHooks : null,
              preOrderCheckHooks : null,
              contentHooks : null,
              contentCheckHooks : null,
              viewHooks : null,
              viewCheckHooks : null,
              destroyHooks : null,
              cleanup : null,
              contentQueries : null,
              components : null,
              directiveRegistry : "function" == typeof r ? r() : r,
              pipeRegistry : "function" == typeof o ? o() : o,
              firstChild : null,
              schemas : l,
              consts : p,
              incompleteFirstPass : !1
            }
          }
          function Ni(t, e, n, s) {
            const i = or(e);
            i.push(n), t.firstCreatePass && function(t) {
              return t.cleanup || (t.cleanup = [])
            }(t).push(s, i.length - 1)
          }
          function Fi(t, e, n, s, i, r) {
            return {
              type: n, index: s, injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1, directiveEnd: -1,
                  directiveStylingLast: -1, propertyBindings: null, flags: 0,
                  providerIndexes: 0, tagName: i, attrs: r, mergedAttrs: null,
                  localNames: null, initialInputs: void 0, inputs: null,
                  outputs: null, tViews: null, next: null, projectionNext: null,
                  child: null, parent: e, projection: null, styles: null,
                  stylesWithoutHost: null, residualStyles: void 0,
                  classes: null, classesWithoutHost: null,
                  residualClasses: void 0, classBindings: 0, styleBindings: 0
            }
          }
          function Mi(t, e, n) {
            for (let s in t)
              if (t.hasOwnProperty(s)) {
                const i = t[s];
                (n = null === n ? {} : n).hasOwnProperty(s) ? n[s].push(e, i)
                                                            : n[s] = [ e, i ]
              }
            return n
          }
          function ji(t, e, n, s, i, r, o, a) {
            const l = We(e, n);
            let c, u = e.inputs;
            var h;
            !a && null != u && (c = u[s])
                ? (lr(t, n, c, s, i), Oe(e) &&
                                          function(t, e) {
                                            const n = Qe(e, t);
                                            16&n[2] || (n[2] |= 64)
                                          }(n, e.index))
                : 3 === e.type &&
                      (s = "class" === (h = s)
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
                                                             : h,
                       i = null != o ? o(i, e.tagName || "", s) : i,
                       Ue(r) ? r.setProperty(l, s, i)
                             : Mn(s) || (l.setProperty ? l.setProperty(s, i)
                                                       : l[s] = i))
          }
          function Vi(t, e, n, s) {
            let i = !1;
            if (nn()) {
              const r = function(t, e, n) {
                const s = t.directiveRegistry;
                let i = null;
                if (s)
                  for (let r = 0; r < s.length; r++) {
                    const o = s[r];
                    ai(n, o.selectors, !1) &&
                        (i || (i = []), ns(Xn(n, e), t, o.type),
                         Le(o) ? ($i(t, n), i.unshift(o)) : i.push(o))
                  }
                return i
              }(t, e, n), o = null === s ? null : {"" : -1};
              if (null !== r) {
                let s = 0;
                i = !0, Wi(n, t.data.length, r.length);
                for (let t = 0; t < r.length; t++) {
                  const e = r[t];
                  e.providersResolver && e.providersResolver(e)
                }
                zi(t, n, r.length);
                let a = !1, l = !1;
                for (let i = 0; i < r.length; i++) {
                  const c = r[i];
                  n.mergedAttrs = jn(n.mergedAttrs, c.hostAttrs), Gi(t, e, c),
                  qi(t.data.length - 1, c, o),
                  null !== c.contentQueries && (n.flags |= 8),
                  null === c.hostBindings && null === c.hostAttrs &&
                          0 === c.hostVars ||
                      (n.flags |= 128);
                  const u = c.type.prototype;
                  !a && (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                      ((t.preOrderHooks || (t.preOrderHooks = []))
                           .push(n.index - ke),
                       a = !0),
                      l || !u.ngOnChanges && !u.ngDoCheck ||
                          ((t.preOrderCheckHooks || (t.preOrderCheckHooks = []))
                               .push(n.index - ke),
                           l = !0),
                      Bi(t, c), s += c.hostVars
                }
                !function(t, e) {
                  const n = e.directiveEnd, s = t.data, i = e.attrs, r = [];
                  let o = null, a = null;
                  for (let l = e.directiveStart; l < n; l++) {
                    const t = s[l], n = t.inputs,
                          c = null === i || ni(e) ? null : Zi(n, i);
                    r.push(c), o = Mi(n, l, o), a = Mi(t.outputs, l, a)
                  }
                  null !== o && (o.hasOwnProperty("class") && (e.flags |= 16),
                                 o.hasOwnProperty("style") && (e.flags |= 32)),
                      e.initialInputs = r, e.inputs = o, e.outputs = a
                }(t, n),
                    Hi(t, e, s)
              }
              o && function(t, e, n) {
                if (e) {
                  const s = t.localNames = [];
                  for (let t = 0; t < e.length; t += 2) {
                    const i = n[e[t + 1]];
                    if (null == i)
                      throw new Error(
                          `Export of name '${e[t + 1]}' not found!`);
                    s.push(e[t], i)
                  }
                }
              }(n, s, o)
            }
            return n.mergedAttrs = jn(n.mergedAttrs, n.attrs), i
          }
          function Bi(t, e) {
            const n = t.expandoInstructions;
            n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars)
          }
          function Hi(t, e, n) {
            for (let s = 0; s < n; s++)
              e.push(ui), t.blueprint.push(ui), t.data.push(null)
          }
          function Ui(t, e) { null !== t.hostBindings && t.hostBindings(1, e) }
          function zi(t, e, n) {
            const s = ke - e.index,
                  i = t.data.length - (1048575 & e.providerIndexes);
            (t.expandoInstructions || (t.expandoInstructions = []))
                .push(s, i, n)
          }
          function $i(t, e) {
            e.flags |= 2, (t.components || (t.components = [])).push(e.index)
          }
          function qi(t, e, n) {
            if (n) {
              if (e.exportAs)
                for (let s = 0; s < e.exportAs.length; s++)
                  n[e.exportAs[s]] = t;
              Le(e) && (n[""] = t)
            }
          }
          function Wi(t, e, n) {
            t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n,
                          t.providerIndexes = e
          }
          function Gi(t, e, n) {
            t.data.push(n);
            const s = n.factory || (n.factory = Ee(n.type)),
                  i = new Dn(s, Le(n), null);
            t.blueprint.push(i), e.push(i)
          }
          function Qi(t, e, n) {
            const s = We(e, t), i = Li(n), r = t[10],
                  o = tr(t, Ci(t, i, null, n.onPush ? 64 : 16, s, e, r,
                               r.createRenderer(s, n)));
            t[e.index] = o
          }
          function Ki(t, e, n, s, i, r) {
            const o = r[e];
            if (null !== o) {
              const t = s.setInput;
              for (let e = 0; e < o.length;) {
                const i = o[e++], r = o[e++], a = o[e++];
                null !== t ? s.setInput(n, a, i, r) : n[r] = a
              }
            }
          }
          function Zi(t, e) {
            let n = null, s = 0;
            for (; s < e.length;) {
              const i = e[s];
              if (0 !== i)
                if (5 !== i) {
                  if ("number" == typeof i)
                    break;
                  t.hasOwnProperty(i) &&
                      (null === n && (n = []), n.push(i, t[i], e[s + 1])),
                      s += 2
                } else
                  s += 2;
              else
                s += 4
            }
            return n
          }
          function Yi(t, e, n, s) {
            return new Array(t, !0, !1, e, null, 0, s, n, null, null)
          }
          function Xi(t, e) {
            const n = Qe(e, t);
            if (Ye(n)) {
              const t = n[1];
              80&n[2] ? Ai(t, n, t.template, n[8]) : n[5] > 0 && function t(e) {
                for (let s = di(e); null !== s; s = pi(s))
                  for (let e = Te; e < s.length; e++) {
                    const n = s[e];
                    if (1024 & n[2]) {
                      const t = n[1];
                      Ai(t, n, t.template, n[8])
                    } else
                      n[5] > 0 && t(n)
                  }
                const n = e[1].components;
                if (null !== n)
                  for (let s = 0; s < n.length; s++) {
                    const i = Qe(n[s], e);
                    Ye(i) && i[5] > 0 && t(i)
                  }
              }(n)
            }
          }
          function Ji(t, e) {
            const n = Qe(e, t), s = n[1];
            !function(t, e) {
              for (let n = e.length; n < t.blueprint.length; n++)
                e.push(t.blueprint[n])
            }(s, n),
                Ti(s, n, n[8])
          }
          function tr(t, e) {
            return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e
          }
          function er(t) {
            for (; t;) {
              t[2] |= 64;
              const e = hi(t);
              if (De(t) && !e)
                return t;
              t = e
            }
            return null
          }
          function nr(t, e, n) {
            const s = e[10];
            s.begin && s.begin();
            try {
              Ai(t, e, t.template, n)
            } catch (i) {
              throw ar(e, i), i
            } finally {
              s.end && s.end()
            }
          }
          function sr(t) {
            !function(t) {
              for (let e = 0; e < t.components.length; e++) {
                const n = t.components[e], s = Ke(n), i = s[1];
                Ii(i, s, i.template, n)
              }
            }(t[8])
          }
          function ir(t, e, n) { yn(0), e(t, n) }
          const rr = (() => Promise.resolve(null))();
          function or(t) { return t[7] || (t[7] = []) }
          function ar(t, e) {
            const n = t[9], s = n ? n.get(gs, null) : null;
            s && s.handleError(e)
          }
          function lr(t, e, n, s, i) {
            for (let r = 0; r < n.length;) {
              const o = n[r++], a = n[r++], l = e[o], c = t.data[o];
              null !== c.setInput ? c.setInput(l, i, s, a) : l[a] = i
            }
          }
          function cr(t, e) {
            const n = e[3];
            return -1 === t.index ? Ie(n) ? n : null : n
          }
          function ur(t, e) {
            const n = cr(t, e);
            return n ? xr(e[11], n[7]) : null
          }
          function hr(t, e, n, s, i) {
            if (null != s) {
              let r, o = !1;
              Ie(s) ? r = s : Ae(s) && (o = !0, s = s[0]);
              const a = $e(s);
              0 === t && null !== n ? null == i ? br(e, n, a) : vr(e, n, a, i || null) : 1 === t && null !== n ? vr(e, n, a, i || null) : 2 === t ? function(t, e, n) {
                const s = xr(t, e);
                s && function(t, e, n, s) {
                  Ue(t) ? t.removeChild(e, n, s) : e.removeChild(n)
                }(t, s, e, n)
              }(e, a, o) : 3 === t && e.destroyNode(a), null != r && function(t, e, n, s, i) {
                const r = n[7];
                r !== $e(n) && hr(e, t, s, r, i);
                for (let o = Te; o < n.length; o++) {
                  const i = n[o];
                  Tr(i[1], i, t, e, s, r)
                }
              }(e, t, r, n, i)
            }
          }
          function dr(t, e, n, s) {
            const i = ur(t.node, e);
            i && Tr(t, e, e[11], n ? 1 : 2, i, s)
          }
          function pr(t, e) {
            const n = t[9], s = n.indexOf(e), i = e[3];
            1024&e[2] && (e[2] &= -1025, tn(i, -1)), n.splice(s, 1)
          }
          function fr(t, e) {
            if (t.length <= Te)
              return;
            const n = Te + e, s = t[n];
            if (s) {
              const i = s[17];
              null !== i && i !== t && pr(i, s), e > 0 && (t[n - 1][4] = s[4]);
              const r = re(t, Te + e);
              dr(s[1], s, !1, null);
              const o = r[19];
              null !== o && o.detachView(r[1]), s[3] = null, s[4] = null,
                                                s[2] &= -129
            }
            return s
          }
          function mr(t, e) {
            if (!(256 & e[2])) {
              const n = e[11];
              Ue(n) && n.destroyNode && Tr(t, e, n, 3, null, null),
                  function(t) {
                    let e = t[13];
                    if (!e)
                      return yr(t[1], t);
                    for (; e;) {
                      let n = null;
                      if (Ae(e))
                        n = e[13];
                      else {
                        const t = e[10];
                        t && (n = t)
                      }
                      if (!n) {
                        for (; e && !e[4] && e !== t;)
                          Ae(e) && yr(e[1], e), e = gr(e, t);
                        null === e && (e = t), Ae(e) && yr(e[1], e),
                            n = e && e[4]
                      }
                      e = n
                    }
                  }(e)
            }
          }
          function gr(t, e) {
            let n;
            return Ae(t) && (n = t[6]) && 2 === n.type ? cr(n, t)
                                                       : t[3] === e ? null
                                                                    : t[3]
          }
          function yr(t, e) {
            if (!(256 & e[2])) {
              e[2] &= -129, e[2] |= 256, function(t, e) {
                let n;
                if (null != t && null != (n = t.destroyHooks))
                  for (let s = 0; s < n.length; s += 2) {
                    const t = e[n[s]];
                    if (!(t instanceof Dn)) {
                      const e = n[s + 1];
                      if (Array.isArray(e))
                        for (let n = 0; n < e.length; n += 2)
                          e[n + 1].call(t[e[n]]);
                      else
                        e.call(t)
                    }
                  }
              }(t, e), function(t, e) {
                const n = t.cleanup;
                if (null !== n) {
                  const t = e[7];
                  for (let s = 0; s < n.length - 1; s += 2)
                    if ("string" == typeof n[s]) {
                      const i = n[s + 1],
                            r = "function" == typeof i ? i(e) : $e(e[i]),
                            o = t[n[s + 2]], a = n[s + 3];
                      "boolean" == typeof a
                          ? r.removeEventListener(n[s], o, a)
                          : a >= 0 ? t[a]() : t[-a].unsubscribe(),
                          s += 2
                    } else
                      n[s].call(t[n[s + 1]]);
                  e[7] = null
                }
              }(t, e);
              const n = e[6];
              n && 3 === n.type && Ue(e[11]) && e[11].destroy();
              const s = e[17];
              if (null !== s && Ie(e[3])) {
                s !== e[3] && pr(s, e);
                const n = e[19];
                null !== n && n.detachView(t)
              }
            }
          }
          function _r(t, e, n) {
            let s = e.parent;
            for (; null != s && (4 === s.type || 5 === s.type);)
              s = (e = s).parent;
            if (null == s) {
              const t = n[6];
              return 2 === t.type ? ur(t, n) : n[0]
            }
            if (e && 5 === e.type && 4 & e.flags)
              return We(e, n).parentNode;
            if (2 & s.flags) {
              const e = t.data, n = e[e[s.index].directiveStart].encapsulation;
              if (n !== he.ShadowDom && n !== he.Native)
                return null
            }
            return We(s, n)
          }
          function vr(t, e, n, s) {
            Ue(t) ? t.insertBefore(e, n, s) : e.insertBefore(n, s, !0)
          }
          function br(t, e, n) {
            Ue(t) ? t.appendChild(e, n) : e.appendChild(n)
          }
          function wr(t, e, n, s) { null !== s ? vr(t, e, n, s) : br(t, e, n) }
          function xr(t, e) { return Ue(t) ? t.parentNode(e) : e.parentNode }
          function Sr(t, e) {
            if (2 === t.type) {
              const n = cr(t, e);
              return null === n ? null : Cr(n.indexOf(e, Te) - Te, n)
            }
            return 4 === t.type || 5 === t.type ? We(t, e) : null
          }
          function Er(t, e, n, s) {
            const i = _r(t, s, e);
            if (null != i) {
              const t = e[11], r = Sr(s.parent || e[6], e);
              if (Array.isArray(n))
                for (let e = 0; e < n.length; e++)
                  wr(t, i, n[e], r);
              else
                wr(t, i, n, r)
            }
          }
          function Cr(t, e) {
            const n = Te + t + 1;
            if (n < e.length) {
              const t = e[n], s = t[1].firstChild;
              if (null !== s)
                return function t(e, n) {
                  if (null !== n) {
                    const s = n.type;
                    if (3 === s)
                      return We(n, e);
                    if (0 === s)
                      return Cr(-1, e[n.index]);
                    if (4 === s || 5 === s) {
                      const s = n.child;
                      if (null !== s)
                        return t(e, s);
                      {
                        const t = e[n.index];
                        return Ie(t) ? Cr(-1, t) : $e(t)
                      }
                    }
                    {
                      const s = e[16], i = s[6], r = hi(s),
                            o = i.projection[n.projection];
                      return null != o ? t(r, o) : t(e, n.next)
                    }
                  }
                  return null
                }(t, s)
            }
            return e[7]
          }
          function kr(t, e, n, s, i, r, o) {
            for (; null != n;) {
              const a = s[n.index], l = n.type;
              o && 0 === e && (a && Xs($e(a), s), n.flags |= 4),
                  64 != (64 & n.flags) &&
                      (4 === l || 5 === l
                           ? (kr(t, e, n.child, s, i, r, !1), hr(e, t, i, a, r))
                           : 1 === l ? Ar(t, e, s, n, i, r)
                                     : hr(e, t, i, a, r)),
                  n = o ? n.projectionNext : n.next
            }
          }
          function Tr(t, e, n, s, i, r) { kr(n, s, t.node.child, e, i, r, !1) }
          function Ar(t, e, n, s, i, r) {
            const o = n[16], a = o[6].projection[s.projection];
            if (Array.isArray(a))
              for (let l = 0; l < a.length; l++)
                hr(e, t, i, a[l], r);
            else
              kr(t, e, a, o[3], i, r, !0)
          }
          function Ir(t, e, n) {
            Ue(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n
          }
          function Rr(t, e, n) {
            Ue(t) ? "" === n ? t.removeAttribute(e, "class")
                             : t.setAttribute(e, "class", n)
                  : e.className = n
          }
          class Or {
            constructor(t, e) {
              this._lView = t, this._cdRefInjectingView = e,
              this._appRef = null, this._viewContainerRef = null
            }
            get rootNodes() {
              const t = this._lView;
              return null == t[0] ? function t(e, n, s, i, r = !1) {
                for (; null !== s;) {
                  const o = n[s.index];
                  if (null !== o && i.push($e(o)), Ie(o))
                    for (let e = Te; e < o.length; e++) {
                      const n = o[e], s = n[1].firstChild;
                      null !== s && t(n[1], n, s, i)
                    }
                  const a = s.type;
                  if (4 === a || 5 === a)
                    t(e, n, s.child, i);
                  else if (1 === a) {
                    const e = n[16], r = e[6].projection[s.projection];
                    if (Array.isArray(r))
                      i.push(...r);
                    else {
                      const n = hi(e);
                      t(n[1], n, r, i, !0)
                    }
                  }
                  s = r ? s.projectionNext : s.next
                }
                return i
              }(t[1], t, t[6].child, []) : []
            }
            get context() { return this._lView[8] }
            get destroyed() { return 256 == (256 & this._lView[2]) }
            destroy() {
              if (this._appRef)
                this._appRef.detachView(this);
              else if (this._viewContainerRef) {
                const t = this._viewContainerRef.indexOf(this);
                t > -1 && this._viewContainerRef.detach(t),
                    this._viewContainerRef = null
              }
              mr(this._lView[1], this._lView)
            }
            onDestroy(t) { Ni(this._lView[1], this._lView, null, t) }
            markForCheck() { er(this._cdRefInjectingView || this._lView) }
            detach() { this._lView[2] &= -129 }
            reattach() { this._lView[2] |= 128 }
            detectChanges() { nr(this._lView[1], this._lView, this.context) }
            checkNoChanges() {
              !function(t, e, n) {
                hn(!0);
                try {
                  nr(t, e, n)
                } finally {
                  hn(!1)
                }
              }(this._lView[1], this._lView, this.context)
            }
            attachToViewContainerRef(t) {
              if (this._appRef)
                throw new Error(
                    "This view is already attached directly to the ApplicationRef!");
              this._viewContainerRef = t
            }
            detachFromAppRef() {
              var t;
              this._appRef = null,
              Tr(this._lView[1], t = this._lView, t[11], 2, null, null)
            }
            attachToAppRef(t) {
              if (this._viewContainerRef)
                throw new Error(
                    "This view is already attached to a ViewContainer!");
              this._appRef = t
            }
          }
          class Pr extends Or {
            constructor(t) { super(t), this._view = t }
            detectChanges() { sr(this._view) }
            checkNoChanges() {
              !function(t) {
                hn(!0);
                try {
                  sr(t)
                } finally {
                  hn(!1)
                }
              }(this._view)
            }
            get context() { return null }
          }
          let Lr, Dr, Nr;
          function Fr(t, e, n) {
            return Lr || (Lr = class extends t {}), new Lr(We(e, n))
          }
          function Mr(t, e, n, s) {
            return Dr || (Dr = class extends t {
                     constructor(t, e, n) {
                       super(), this._declarationView = t,
                                this._declarationTContainer = e,
                                this.elementRef = n
                     }
                     createEmbeddedView(t) {
                       const e = this._declarationTContainer.tViews,
                             n = Ci(this._declarationView, e, t, 16, null,
                                    e.node);
                       n[17] = this._declarationView[this._declarationTContainer
                                                         .index];
                       const s = this._declarationView[19];
                       return null !== s && (n[19] = s.createEmbeddedView(e)),
                              Ti(e, n, t), new Or(n)
                     }
                   }),
                   0 === n.type ? new Dr(s, n, Fr(e, n, s)) : null
          }
          function jr(t, e, n, s) {
            let i;
            Nr || (Nr = class extends t {
              constructor(t, e, n) {
                super(), this._lContainer = t, this._hostTNode = e,
                         this._hostView = n
              }
              get element() { return Fr(e, this._hostTNode, this._hostView) }
              get injector() { return new us(this._hostTNode, this._hostView) }
              get parentInjector() {
                const t = es(this._hostTNode, this._hostView),
                      e = zn(t, this._hostView), n = function(t, e, n) {
                        if (n.parent && -1 !== n.parent.injectorIndex) {
                          const t = n.parent.injectorIndex;
                          let e = n.parent;
                          for (;
                               null != e.parent && t == e.parent.injectorIndex;)
                            e = e.parent;
                          return e
                        }
                        let s = Un(t), i = e, r = e[6];
                        for (; s > 1;)
                          i = i[15], r = i[6], s--;
                        return r
                      }(t, this._hostView, this._hostTNode);
                return Bn(t) && null != n ? new us(n, e)
                                          : new us(null, this._hostView)
              }
              clear() {
                for (; this.length > 0;)
                  this.remove(this.length - 1)
              }
              get(t) {
                return null !== this._lContainer[8] && this._lContainer[8][t] ||
                       null
              }
              get length() { return this._lContainer.length - Te }
              createEmbeddedView(t, e, n) {
                const s = t.createEmbeddedView(e || {});
                return this.insert(s, n), s
              }
              createComponent(t, e, n, s, i) {
                const r = n || this.parentInjector;
                if (!i && null == t.ngModule && r) {
                  const t = r.get(ee, null);
                  t && (i = t)
                }
                const o = t.create(r, s, void 0, i);
                return this.insert(o.hostView, e), o
              }
              insert(t, e) {
                const n = t._lView, s = n[1];
                if (t.destroyed)
                  throw new Error(
                      "Cannot insert a destroyed View in a ViewContainer!");
                if (this.allocateContainerIfNeeded(), Ie(n[3])) {
                  const e = this.indexOf(t);
                  if (-1 !== e)
                    this.detach(e);
                  else {
                    const e = n[3], s = new Nr(e, e[6], e[3]);
                    s.detach(s.indexOf(t))
                  }
                }
                const i = this._adjustIndex(e);
                return function(t, e, n, s) {
                  const i = Te + s, r = n.length;
                  s > 0 && (n[i - 1][4] = e),
                      s < r - Te ? (e[4] = n[i], ie(n, Te + s, e))
                                 : (n.push(e), e[4] = null),
                      e[3] = n;
                  const o = e[17];
                  null !== o && n !== o && function(t, e) {
                    const n = t[9];
                    e[16] !== e[3][3][16] && (t[2] = !0),
                        null === n ? t[9] = [ e ] : n.push(e)
                  }(o, e);
                  const a = e[19];
                  null !== a && a.insertView(t), e[2] |= 128
                }(s, n, this._lContainer, i),
                       dr(s, n, !0, Cr(i, this._lContainer)),
                       t.attachToViewContainerRef(this),
                       ie(this._lContainer[8], i, t), t
              }
              move(t, e) {
                if (t.destroyed)
                  throw new Error(
                      "Cannot move a destroyed View in a ViewContainer!");
                return this.insert(t, e)
              }
              indexOf(t) {
                const e = this._lContainer[8];
                return null !== e ? e.indexOf(t) : -1
              }
              remove(t) {
                this.allocateContainerIfNeeded();
                const e = this._adjustIndex(t, -1), n = fr(this._lContainer, e);
                n && (re(this._lContainer[8], e), mr(n[1], n))
              }
              detach(t) {
                this.allocateContainerIfNeeded();
                const e = this._adjustIndex(t, -1), n = fr(this._lContainer, e);
                return n && null != re(this._lContainer[8], e) ? new Or(n)
                                                               : null
              }
              _adjustIndex(t, e = 0) { return null == t ? this.length + e : t }
              allocateContainerIfNeeded() {
                null === this._lContainer[8] && (this._lContainer[8] = [])
              }
            });
            const r = s[n.index];
            if (Ie(r))
              i = r;
            else {
              let t;
              if (4 === n.type)
                t = $e(r);
              else if (t = s[11].createComment(""), De(s)) {
                const e = s[11], i = We(n, s);
                vr(e, xr(e, i), t, function(t, e) {
                  return Ue(t) ? t.nextSibling(e) : e.nextSibling
                }(e, i))
              } else
                Er(s[1], s, t, n);
              s[n.index] = i = Yi(r, s, t, n), tr(s, i)
            }
            return new Nr(i, n, s)
          }
          function Vr(t = !1) {
            return function(t, e, n) {
              if (!n && Oe(t)) {
                const n = Qe(t.index, e);
                return new Or(n, n)
              }
              return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type ? new Or(
                                                                                        e[16],
                                                                                        e)
                                                                                  : null
            }(on(), sn(), t)
          }
          let Br =
              (() => {class t {} return t.__NG_ELEMENT_ID__ = () => Hr(), t})();
          const Hr = Vr, Ur = Function, zr = new Vt("Set Injector scope."),
                $r = {}, qr = {}, Wr = [];
          let Gr = void 0;
          function Qr() { return void 0 === Gr && (Gr = new te), Gr }
          function Kr(t, e = null, n = null, s) {
            return new Zr(t, n, e || Qr(), s)
          }
          class Zr {
            constructor(t, e, n, s = null) {
              this.parent = n, this.records = new Map,
              this.injectorDefTypes = new Set, this.onDestroy = new Set,
              this._destroyed = !1;
              const i = [];
              e && se(e, n => this.processProvider(n, t, e)),
                  se([ t ], t => this.processInjectorType(t, [], i)),
                  this.records.set(Bt, Jr(void 0, this));
              const r = this.records.get(zr);
              this.scope = null != r ? r.value : null,
              this.source = s || ("object" == typeof t ? null : wt(t))
            }
            get destroyed() { return this._destroyed }
            destroy() {
              this.assertNotDestroyed(), this._destroyed = !0;
              try {
                this.onDestroy.forEach(t => t.ngOnDestroy())
              } finally {
                this.records.clear(), this.onDestroy.clear(),
                    this.injectorDefTypes.clear()
              }
            }
            get(t, e = Ht, n = lt.Default) {
              this.assertNotDestroyed();
              const s = Gt(this);
              try {
                if (!(n & lt.SkipSelf)) {
                  let e = this.records.get(t);
                  if (void 0 === e) {
                    const n = ("function" == typeof (i = t) ||
                               "object" == typeof i && i instanceof Vt) &&
                              pt(t);
                    e = n && this.injectableDefInScope(n) ? Jr(Yr(t), $r)
                                                          : null,
                    this.records.set(t, e)
                  }
                  if (null != e)
                    return this.hydrate(t, e)
                }
                return (n & lt.Self ? Qr() : this.parent)
                    .get(t, e = n & lt.Optional && e === Ht ? null : e)
              } catch (r) {
                if ("NullInjectorError" === r.name) {
                  if ((r.ngTempTokenPath = r.ngTempTokenPath || [])
                          .unshift(wt(t)),
                      s)
                    throw r;
                  return function(t, e, n, s) {
                    const i = t.ngTempTokenPath;
                    throw e[zt] && i.unshift(e[zt]),
                        t.message =
                            function(t, e, n, s = null) {
                          t = t && "\n" === t.charAt(0) &&
                                      "\u0275" == t.charAt(1)
                                  ? t.substr(2)
                                  : t;
                          let i = wt(e);
                          if (Array.isArray(e))
                            i = e.map(wt).join(" -> ");
                          else if ("object" == typeof e) {
                            let t = [];
                            for (let n in e)
                              if (e.hasOwnProperty(n)) {
                                let s = e[n];
                                t.push(n + ":" +
                                       ("string" == typeof s ? JSON.stringify(s)
                                                             : wt(s)))
                              }
                            i = `{${t.join(", ")}}`
                          }
                          return `${n}${s ? "(" + s + ")" : ""}[${i}]: ${
                              t.replace(Ut, "\n  ")}`
                        }("\n" + t.message, i, n, s),
                        t.ngTokenPath = i, t.ngTempTokenPath = null, t
                  }(r, t, "R3InjectorError", this.source)
                }
                throw r
              } finally {
                Gt(s)
              }
              var i
            }
            _resolveInjectorDefTypes() {
              this.injectorDefTypes.forEach(t => this.get(t))
            }
            toString() {
              const t = [];
              return this.records.forEach((e, n) => t.push(wt(n))),
                     `R3Injector[${t.join(", ")}]`
            }
            assertNotDestroyed() {
              if (this._destroyed)
                throw new Error("Injector has already been destroyed.")
            }
            processInjectorType(t, e, n) {
              if (!(t = Ct(t)))
                return !1;
              let s = mt(t);
              const i = null == s && t.ngModule || void 0,
                    r = void 0 === i ? t : i, o = -1 !== n.indexOf(r);
              if (void 0 !== i && (s = mt(i)), null == s)
                return !1;
              if (null != s.imports && !o) {
                let t;
                n.push(r);
                try {
                  se(s.imports, s => {this.processInjectorType(s, e, n) &&
                                      (void 0 === t && (t = []), t.push(s))})
                } finally {
                }
                if (void 0 !== t)
                  for (let e = 0; e < t.length; e++) {
                    const {ngModule : n, providers : s} = t[e];
                    se(s, t => this.processProvider(t, n, s || Wr))
                  }
              }
              this.injectorDefTypes.add(r),
                  this.records.set(r, Jr(s.factory, $r));
              const a = s.providers;
              if (null != a && !o) {
                const e = t;
                se(a, t => this.processProvider(t, e, a))
              }
              return void 0 !== i && void 0 !== t.providers
            }
            processProvider(t, e, n) {
              let s = eo(t = Ct(t)) ? t : Ct(t && t.provide);
              const i = function(
                  t, e,
                  n) { return to(t) ? Jr(void 0, t.useValue) : Jr(Xr(t), $r) }(
                  t);
              if (eo(t) || !0 !== t.multi)
                this.records.get(s);
              else {
                let e = this.records.get(s);
                e || (e = Jr(void 0, $r, !0), e.factory = () => Jt(e.multi),
                      this.records.set(s, e)),
                    s = t, e.multi.push(t)
              }
              this.records.set(s, i)
            }
            hydrate(t, e) {
              var n;
              return e.value === $r && (e.value = qr, e.value = e.factory()),
                     "object" == typeof e.value && e.value &&
                         null !== (n = e.value) && "object" == typeof n &&
                         "function" == typeof n.ngOnDestroy &&
                         this.onDestroy.add(e.value),
                     e.value
            }
            injectableDefInScope(t) {
              return !!t.providedIn &&
                     ("string" == typeof t.providedIn
                          ? "any" === t.providedIn ||
                                t.providedIn === this.scope
                          : this.injectorDefTypes.has(t.providedIn))
            }
          }
          function Yr(t) {
            const e = pt(t), n = null !== e ? e.factory : Ee(t);
            if (null !== n)
              return n;
            const s = mt(t);
            if (null !== s)
              return s.factory;
            if (t instanceof Vt)
              throw new Error(
                  `Token ${wt(t)} is missing a \u0275prov definition.`);
            if (t instanceof Function)
              return function(t) {
                const e = t.length;
                if (e > 0) {
                  const n = oe(e, "?");
                  throw new Error(`Can't resolve all parameters for ${
                      wt(t)}: (${n.join(", ")}).`)
                }
                const n = function(t) {
                  const e = t && (t[gt] || t[vt] || t[_t] && t[_t]());
                  if (e) {
                    const n = function(t) {
                      if (t.hasOwnProperty("name"))
                        return t.name;
                      const e = ("" + t).match(/^function\s*([^\s(]+)/);
                      return null === e ? "" : e[1]
                    }(t);
                    return console.warn(`DEPRECATED: DI is instantiating a token "${
                               n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${
                               n}" class.`),
                           e
                  }
                  return null
                }(t);
                return null !== n ? () => n.factory(t) : () => new t
              }(t);
            throw new Error("unreachable")
          }
          function Xr(t, e, n) {
            let s = void 0;
            if (eo(t)) {
              const e = Ct(t);
              return Ee(e) || Yr(e)
            }
            if (to(t))
              s = () => Ct(t.useValue);
            else if ((i = t) && i.useFactory)
              s = () => t.useFactory(...Jt(t.deps || []));
            else if (function(t) { return !(!t || !t.useExisting) }(t))
              s = () => Zt(Ct(t.useExisting));
            else {
              const e = Ct(t && (t.useClass || t.provide));
              if (!function(t) { return !!t.deps }(t))
                return Ee(e) || Yr(e);
              s = () => new e(...Jt(t.deps))
            }
            var i;
            return s
          }
          function Jr(t, e, n = !1) {
            return { factory: t, value: e, multi: n ? [] : void 0 }
          }
          function to(t) {
            return null !== t && "object" == typeof t && $t in t
          }
          function eo(t) { return "function" == typeof t }
          const no = function(t, e, n) {
            return function(t, e = null, n = null, s) {
              const i = Kr(t, e, n, s);
              return i._resolveInjectorDefTypes(), i
            }({name : n}, e, t, n)
          };
          let so = (() => {
            class t {
              static create(t, e) {
                return Array.isArray(t)
                           ? no(t, e, "")
                           : no(t.providers, t.parent, t.name || "")
              }
            } return t.THROW_IF_NOT_FOUND = Ht,
            t.NULL = new te,
            t.\u0275prov =
                ht({token : t, providedIn : "any", factory : () => Zt(Bt)}),
            t.__NG_ELEMENT_ID__ = -1,
            t
          })();
          const io = new Vt("AnalyzeForEntryComponents");
          function ro(t, e, n) {
            let s = n ? t.styles : null, i = n ? t.classes : null, r = 0;
            if (null !== e)
              for (let o = 0; o < e.length; o++) {
                const t = e[o];
                "number" == typeof t
                    ? r = t
                    : 1 == r ? i = xt(i, t)
                             : 2 == r && (s = xt(s, t + ": " + e[++o] + ";"))
              }
            n ? t.styles = s : t.stylesWithoutHost = s,
                n ? t.classes = i : t.classesWithoutHost = i
          }
          function oo(t, e) {
            const n = Ke(t)[1], s = n.data.length - 1;
            An(n, {directiveStart : s, directiveEnd : s + 1})
          }
          function ao(t) {
            let e = Object.getPrototypeOf(t.type.prototype).constructor, n = !0;
            const s = [ t ];
            for (; e;) {
              let i = void 0;
              if (Le(t))
                i = e.\u0275cmp || e.\u0275dir;
              else {
                if (e.\u0275cmp)
                  throw new Error("Directives cannot inherit Components");
                i = e.\u0275dir
              }
              if (i) {
                if (n) {
                  s.push(i);
                  const e = t;
                  e.inputs = lo(t.inputs),
                  e.declaredInputs = lo(t.declaredInputs),
                  e.outputs = lo(t.outputs);
                  const n = i.hostBindings;
                  n && ho(t, n);
                  const r = i.viewQuery, o = i.contentQueries;
                  if (r && co(t, r), o && uo(t, o), ut(t.inputs, i.inputs),
                      ut(t.declaredInputs, i.declaredInputs),
                      ut(t.outputs, i.outputs), Le(i) && i.data.animation) {
                    const e = t.data;
                    e.animation = (e.animation || []).concat(i.data.animation)
                  }
                }
                const e = i.features;
                if (e)
                  for (let s = 0; s < e.length; s++) {
                    const i = e[s];
                    i && i.ngInherit && i(t), i === ao && (n = !1)
                  }
              }
              e = Object.getPrototypeOf(e)
            }
            !function(t) {
              let e = 0, n = null;
              for (let s = t.length - 1; s >= 0; s--) {
                const i = t[s];
                i.hostVars = e += i.hostVars,
                i.hostAttrs = jn(i.hostAttrs, n = jn(n, i.hostAttrs))
              }
            }(s)
          }
          function lo(t) { return t === de ? {} : t === pe ? [] : t }
          function co(t, e) {
            const n = t.viewQuery;
            t.viewQuery = n ? (t, s) => { e(t, s), n(t, s) } : e
          }
          function uo(t, e) {
            const n = t.contentQueries;
            t.contentQueries = n ? (t, s, i) => { e(t, s, i), n(t, s, i) } : e
          }
          function ho(t, e) {
            const n = t.hostBindings;
            t.hostBindings = n ? (t, s) => { e(t, s), n(t, s) } : e
          }
          let po = null;
          function fo() {
            if (!po) {
              const t = Ot.Symbol;
              if (t && t.iterator)
                po = t.iterator;
              else {
                const t = Object.getOwnPropertyNames(Map.prototype);
                for (let e = 0; e < t.length; ++e) {
                  const n = t[e];
                  "entries" !== n && "size" !== n &&
                      Map.prototype[n] === Map.prototype.entries && (po = n)
                }
              }
            }
            return po
          }
          class mo {
            constructor(t) { this.wrapped = t }
            static wrap(t) { return new mo(t) }
            static unwrap(t) { return mo.isWrapped(t) ? t.wrapped : t }
            static isWrapped(t) { return t instanceof mo }
          }
          function go(t) {
            return !!yo(t) &&
                   (Array.isArray(t) || !(t instanceof Map) && fo() in t)
          }
          function yo(t) {
            return null !== t &&
                   ("function" == typeof t || "object" == typeof t)
          }
          function _o(t, e, n) { return t[e] = n }
          function vo(t, e, n) { return !Object.is(t[e], n) && (t[e] = n, !0) }
          function bo(t, e, n, s) {
            const i = vo(t, e, n);
            return vo(t, e + 1, s) || i
          }
          function wo(t, e, n, s) {
            const i = sn();
            return vo(i, pn(), e) && (rn(), function(t, e, n, s, i, r) {
                     const o = We(t, e), a = e[11];
                     if (null == s)
                       Ue(a) ? a.removeAttribute(o, n, r)
                             : o.removeAttribute(n);
                     else {
                       const e = null == i ? $n(s) : i(s, t.tagName || "", n);
                       Ue(a) ? a.setAttribute(o, n, e, r)
                             : r ? o.setAttributeNS(r, n, e)
                                 : o.setAttribute(n, e)
                     }
                   }(Tn(), i, t, e, n, s)), wo
          }
          function xo(t, e, n, s, i, r, o, a) {
            const l = sn(), c = rn(), u = t + ke,
                  h = c.firstCreatePass ? function(t, e, n, s, i, r, o, a, l) {
                    const c = e.consts,
                          u = ki(e, n[6], t, 0, o || null, Xe(c, a));
                    Vi(e, n, u, Xe(c, l)), An(e, u);
                    const h = u.tViews = Di(2, -1, s, i, r, e.directiveRegistry,
                                            e.pipeRegistry, null, e.schemas, c),
                          d = Fi(0, null, 2, -1, null, null);
                    return d.injectorIndex = u.injectorIndex, h.node = d,
                           null !== e.queries &&
                               (e.queries.template(e, u),
                                h.queries = e.queries.embeddedTView(u)),
                           u
                  }(t, c, l, e, n, s, i, r, o) : c.data[u];
            an(h, !1);
            const d = l[11].createComment("");
            Er(c, l, d, h), Xs(d, l), tr(l, l[u] = Yi(d, l, d, h)),
                Pe(h) && Oi(c, l, h), null != o && Pi(l, h, a)
          }
          function So(t, e = lt.Default) {
            const n = sn();
            return null == n ? Zt(t, e) : ss(on(), n, Ct(t), e)
          }
          function Eo(t) {
            return function(t, e) {
              if ("class" === e)
                return t.classes;
              if ("style" === e)
                return t.styles;
              const n = t.attrs;
              if (n) {
                const t = n.length;
                let s = 0;
                for (; s < t;) {
                  const i = n[s];
                  if (Fn(i))
                    break;
                  if (0 === i)
                    s += 2;
                  else if ("number" == typeof i)
                    for (s++; s < t && "string" == typeof n[s];)
                      s++;
                  else {
                    if (i === e)
                      return n[s + 1];
                    s += 2
                  }
                }
              }
              return null
            }(on(), t)
          }
          function Co(t, e, n) {
            const s = sn();
            return vo(s, pn(), e) && ji(rn(), Tn(), s, t, e, s[11], n, !1), Co
          }
          function ko(t, e, n, s, i) {
            const r = i ? "class" : "style";
            lr(t, n, e.inputs[r], r, s)
          }
          function To(t, e, n, s) {
            const i = sn(), r = rn(), o = ke + t, a = i[11],
                  l = i[o] = Ei(e, a, en.lFrame.currentNamespace),
                  c = r.firstCreatePass ? function(t, e, n, s, i, r, o) {
                    const a = e.consts, l = Xe(a, r),
                          c = ki(e, n[6], t, 3, i, l);
                    return Vi(e, n, c, Xe(a, o)),
                           null !== c.attrs && ro(c, c.attrs, !1),
                           null !== c.mergedAttrs && ro(c, c.mergedAttrs, !0),
                           null !== e.queries && e.queries.elementStart(e, c), c
                  }(t, r, i, 0, e, n, s) : r.data[o];
            an(c, !0);
            const u = c.mergedAttrs;
            null !== u && Nn(a, l, u);
            const h = c.classes;
            null !== h && Rr(a, l, h);
            const d = c.styles;
            null !== d && Ir(a, l, d), Er(r, i, l, c),
                0 === en.lFrame.elementDepthCount && Xs(l, i),
                en.lFrame.elementDepthCount++,
                Pe(c) && (Oi(r, i, c), function(t, e, n) {
                  if (Re(e)) {
                    const s = e.directiveEnd;
                    for (let i = e.directiveStart; i < s; i++) {
                      const e = t.data[i];
                      e.contentQueries && e.contentQueries(1, n[i], i)
                    }
                  }
                }(r, c, i)), null !== s && Pi(i, c)
          }
          function Ao() {
            let t = on();
            ln() ? cn() : (t = t.parent, an(t, !1));
            const e = t;
            en.lFrame.elementDepthCount--;
            const n = rn();
            n.firstCreatePass && (An(n, t), Re(t) && n.queries.elementEnd(t)),
                null != e.classesWithoutHost &&
                    function(t) { return 0 != (16 & t.flags) }(e) &&
                    ko(n, e, sn(), e.classesWithoutHost, !0),
                null != e.stylesWithoutHost &&
                    function(t) { return 0 != (32 & t.flags) }(e) &&
                    ko(n, e, sn(), e.stylesWithoutHost, !1)
          }
          function Io(t, e, n, s) { To(t, e, n, s), Ao() }
          function Ro(t) { return !!t && "function" == typeof t.then }
          function Oo(t) { return !!t && "function" == typeof t.subscribe }
          function Po(t, e, n = !1, s) {
            const i = sn(), r = rn(), o = on();
            return function(t, e, n, s, i, r, o = !1, a) {
              const l = Pe(s),
                    c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
                    u = or(e);
              let h = !0;
              if (3 === s.type) {
                const d = We(s, e), p = a ? a(d) : de, f = p.target || d,
                      m = u.length,
                      g = a ? t => a($e(t[s.index])).target : s.index;
                if (Ue(n)) {
                  let o = null;
                  if (!a && l && (o = function(t, e, n, s) {
                        const i = t.cleanup;
                        if (null != i)
                          for (let r = 0; r < i.length - 1; r += 2) {
                            const t = i[r];
                            if (t === n && i[r + 1] === s) {
                              const t = e[7], n = i[r + 2];
                              return t.length > n ? t[n] : null
                            }
                            "string" == typeof t && (r += 2)
                          }
                        return null
                      }(t, e, i, s.index)), null !== o)
                    (o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = r,
                                               o.__ngLastListenerFn__ = r,
                                               h = !1;
                  else {
                    r = Do(s, e, r, !1);
                    const t = n.listen(p.name || f, i, r);
                    u.push(r, t), c && c.push(i, g, m, m + 1)
                  }
                } else
                  r = Do(s, e, r, !0), f.addEventListener(i, r, o), u.push(r),
                  c && c.push(i, g, m, o)
              }
              const d = s.outputs;
              let p;
              if (h && null !== d && (p = d[i])) {
                const t = p.length;
                if (t)
                  for (let n = 0; n < t; n += 2) {
                    const t = e[p[n]][p[n + 1]].subscribe(r), o = u.length;
                    u.push(r, t), c && c.push(i, s.index, o, -(o + 1))
                  }
              }
            }(r, i, i[11], o, t, e, n, s),
                   Po
          }
          function Lo(t, e, n) {
            try {
              return !1 !== e(n)
            } catch (s) {
              return ar(t, s), !1
            }
          }
          function Do(t, e, n, s) {
            return function i(r) {
              if (r === Function)
                return n;
              const o = 2 & t.flags ? Qe(t.index, e) : e;
              0 == (32 & e[2]) && er(o);
              let a = Lo(e, n, r), l = i.__ngNextListenerFn__;
              for (; l;)
                a = Lo(e, l, r) && a, l = l.__ngNextListenerFn__;
              return s && !1 === a && (r.preventDefault(), r.returnValue = !1),
                     a
            }
          }
          function No(t = 1) {
            return function(t) {
              return (en.lFrame.contextLView = function(t, e) {
                for (; t > 0;)
                  e = e[15], t--;
                return e
              }(t, en.lFrame.contextLView))[8]
            }(t)
          }
          const Fo = [];
          function Mo(t, e, n, s, i) {
            const r = t[n + 1], o = null === e;
            let a = s ? _i(r) : bi(r), l = !1;
            for (; 0 !== a && (!1 === l || o);) {
              const n = t[a + 1];
              jo(t[a], e) && (l = !0, t[a + 1] = s ? xi(n) : vi(n)),
                  a = s ? _i(n) : bi(n)
            }
            l && (t[n + 1] = s ? vi(r) : xi(r))
          }
          function jo(t, e) {
            return null === t || null == e ||
                   (Array.isArray(t) ? t[1] : t) === e ||
                   !(!Array.isArray(t) || "string" != typeof e) && ce(t, e) >= 0
          }
          function Vo(t, e, n) { return Ho(t, e, n, !1), Vo }
          function Bo(t, e) { return Ho(t, e, null, !0), Bo }
          function Ho(t, e, n, s) {
            const i = sn(), r = rn(), o = function(t) {
              const e = en.lFrame, n = e.bindingIndex;
              return e.bindingIndex = e.bindingIndex + 2, n
            }();
            r.firstUpdatePass &&
                function(t, e, n, s) {
                  const i = t.data;
                  if (null === i[n + 1]) {
                    const r = i[Cn() + ke],
                          o = function(
                              t, e) { return e >= t.expandoStartIndex }(t, n);
                    (function(t, e) { return 0 != (t.flags & (e ? 16 : 32)) })(
                        r, s) &&
                        null === e && !o && (e = !1),
                        e = function(t, e, n, s) {
                          const i = function(t) {
                            const e = en.lFrame.currentDirectiveIndex;
                            return -1 === e ? null : t[e]
                          }(t);
                          let r = s ? e.residualClasses : e.residualStyles;
                          if (null === i)
                            0 === (s ? e.classBindings : e.styleBindings) &&
                                (n = zo(n = Uo(null, t, e, n, s), e.attrs, s),
                                 r = null);
                          else {
                            const o = e.directiveStylingLast;
                            if (-1 === o || t[o] !== i)
                              if (n = Uo(i, t, e, n, s), null === r) {
                                let n = function(t, e, n) {
                                  const s =
                                      n ? e.classBindings : e.styleBindings;
                                  if (0 !== bi(s))
                                    return t[_i(s)]
                                }(t, e, s);
                                void 0 !== n && Array.isArray(n) &&
                                    (n = Uo(null, t, e, n[1], s),
                                     n = zo(n, e.attrs, s),
                                     function(t, e, n, s) {
                                       t[_i(n ? e.classBindings
                                              : e.styleBindings)] = s
                                     }(t, e, s, n))
                              } else
                                r = function(t, e, n) {
                                  let s = void 0;
                                  const i = e.directiveEnd;
                                  for (let r = 1 + e.directiveStylingLast;
                                       r < i; r++)
                                    s = zo(s, t[r].hostAttrs, n);
                                  return zo(s, e.attrs, n)
                                }(t, e, s)
                          }
                          return void 0 !== r && (s ? e.residualClasses = r
                                                    : e.residualStyles = r),
                                 n
                        }(i, r, e, s), function(t, e, n, s, i, r) {
                          let o = r ? e.classBindings : e.styleBindings,
                              a = _i(o), l = bi(o);
                          t[s] = n;
                          let c, u = !1;
                          if (Array.isArray(n)) {
                            const t = n;
                            c = t[1], (null === c || ce(t, c) > 0) && (u = !0)
                          } else
                            c = n;
                          if (i)
                            if (0 !== l) {
                              const e = _i(t[a + 1]);
                              t[s + 1] = yi(e, a),
                                    0 !== e && (t[e + 1] = wi(t[e + 1], s)),
                                    t[a + 1] = 131071 & t[a + 1] | s << 17
                            } else
                              t[s + 1] = yi(a, 0),
                                    0 !== a && (t[a + 1] = wi(t[a + 1], s)),
                                    a = s;
                          else
                            t[s + 1] = yi(l, 0),
                                  0 === a ? a = s : t[l + 1] = wi(t[l + 1], s),
                                  l = s;
                          u && (t[s + 1] = vi(t[s + 1])), Mo(t, c, s, !0),
                              Mo(t, c, s, !1),
                              function(t, e, n, s, i) {
                                const r =
                                    i ? t.residualClasses : t.residualStyles;
                                null != r && "string" == typeof e &&
                                    ce(r, e) >= 0 && (n[s + 1] = xi(n[s + 1]))
                              }(e, c, t, s, r),
                              o = yi(a, l),
                              r ? e.classBindings = o : e.styleBindings = o
                        }(i, r, e, n, o, s)
                  }
                }(r, t, o, s),
                e !== ui && vo(i, o, e) && function(t, e, n, s, i, r, o, a) {
                  if (3 !== e.type)
                    return;
                  const l = t.data, c = l[a + 1];
                  qo(1 == (1 & c) ? $o(l, e, n, i, bi(c), o) : void 0) ||
                      (qo(r) || function(t) { return 2 == (2 & t) }(c) &&
                                    (r = $o(l, null, n, i, a, o)),
                       function(t, e, n, s, i) {
                         const r = Ue(t);
                         if (e)
                           i ? r ? t.addClass(n, s) : n.classList.add(s)
                             : r ? t.removeClass(n, s) : n.classList.remove(s);
                         else {
                           const e = -1 == s.indexOf("-") ? void 0 : 2;
                           null == i ? r ? t.removeStyle(n, s, e)
                                         : n.style.removeProperty(s)
                                     : r ? t.setStyle(n, s, i, e)
                                         : n.style.setProperty(s, i)
                         }
                       }(s, o, qe(Cn(), n), i, r))
                }(r, r.data[Cn() + ke], i, i[11], t, i[o + 1] = function(t, e) {
                  return null == t ||
                             ("string" == typeof e
                                  ? t += e
                                  : "object" == typeof t && (t = wt(Ss(t)))),
                         t
                }(e, n), s, o)
          }
          function Uo(t, e, n, s, i) {
            let r = null;
            const o = n.directiveEnd;
            let a = n.directiveStylingLast;
            for (-1 === a ? a = n.directiveStart : a++;
                 a < o && (r = e[a], s = zo(s, r.hostAttrs, i), r !== t);)
              a++;
            return null !== t && (n.directiveStylingLast = a), s
          }
          function zo(t, e, n) {
            const s = n ? 1 : 2;
            let i = -1;
            if (null !== e)
              for (let r = 0; r < e.length; r++) {
                const o = e[r];
                "number" == typeof o
                    ? i = o
                    : i === s && (Array.isArray(t) ||
                                      (t = void 0 === t ? [] : [ "", t ]),
                                  ae(t, o, !!n || e[++r]))
              }
            return void 0 === t ? null : t
          }
          function $o(t, e, n, s, i, r) {
            const o = null === e;
            let a = void 0;
            for (; i > 0;) {
              const e = t[i], r = Array.isArray(e), l = r ? e[1] : e,
                    c = null === l;
              let u = n[i + 1];
              u === ui && (u = c ? Fo : void 0);
              let h = c ? le(u, s) : l === s ? u : void 0;
              if (r && !qo(h) && (h = le(e, s)), qo(h) && (a = h, o))
                return a;
              const d = t[i + 1];
              i = o ? _i(d) : bi(d)
            }
            if (null !== e) {
              let t = r ? e.residualClasses : e.residualStyles;
              null != t && (a = le(t, s))
            }
            return a
          }
          function qo(t) { return void 0 !== t }
          function Wo(t, e = "") {
            const n = sn(), s = rn(), i = t + ke,
                  r = s.firstCreatePass ? ki(s, n[6], t, 3, null, null)
                                        : s.data[i],
                  o = n[i] = function(t, e) {
                    return Ue(e) ? e.createText(t) : e.createTextNode(t)
                  }(e, n[11]);
            Er(s, n, o, r), an(r, !1)
          }
          function Go(t) { return Qo("", t, ""), Go }
          function Qo(t, e, n) {
            const s = sn(),
                  i = function(
                      t, e, n,
                      s) { return vo(t, pn(), n) ? e + $n(n) + s : ui }(s, t, e,
                                                                        n);
            return i !== ui && function(t, e, n) {
              const s = qe(e, t), i = t[11];
              Ue(i) ? i.setValue(s, n) : s.textContent = n
            }(s, Cn(), i), Qo
          }
          function Ko(t, e, n) {
            const s = sn();
            return vo(s, pn(), e) && ji(rn(), Tn(), s, t, e, s[11], n, !0), Ko
          }
          function Zo(t, e, n, s, i) {
            if (t = Ct(t), Array.isArray(t))
              for (let r = 0; r < t.length; r++)
                Zo(t[r], e, n, s, i);
            else {
              const r = rn(), o = sn();
              let a = eo(t) ? t : Ct(t.provide), l = Xr(t);
              const c = on(), u = 1048575 & c.providerIndexes,
                    h = c.directiveStart, d = c.providerIndexes >> 20;
              if (eo(t) || !t.multi) {
                const s = new Dn(l, i, So), p = Jo(a, e, i ? u : u + d, h);
                -1 === p ? (ns(Xn(c, o), r, a), Yo(r, t, e.length), e.push(a),
                            c.directiveStart++, c.directiveEnd++,
                            i && (c.providerIndexes += 1048576), n.push(s),
                            o.push(s))
                         : (n[p] = s, o[p] = s)
              } else {
                const p = Jo(a, e, u + d, h), f = Jo(a, e, u, u + d),
                      m = p >= 0 && n[p], g = f >= 0 && n[f];
                if (i && !g || !i && !m) {
                  ns(Xn(c, o), r, a);
                  const u = function(t, e, n, s, i) {
                    const r = new Dn(t, n, So);
                    return r.multi = [], r.index = e, r.componentProviders = 0,
                           Xo(r, i, s && !n), r
                  }(i ? ea : ta, n.length, i, s, l);
                  !i && g && (n[f].providerFactory = u), Yo(r, t, e.length, 0),
                      e.push(a), c.directiveStart++, c.directiveEnd++,
                      i && (c.providerIndexes += 1048576), n.push(u), o.push(u)
                } else
                  Yo(r, t, p > -1 ? p : f, Xo(n[i ? f : p], l, !i && s));
                !i && s && g && n[f].componentProviders++
              }
            }
          }
          function Yo(t, e, n, s) {
            const i = eo(e);
            if (i || e.useClass) {
              const r = (e.useClass || e).prototype.ngOnDestroy;
              if (r) {
                const o = t.destroyHooks || (t.destroyHooks = []);
                if (!i && e.multi) {
                  const t = o.indexOf(n);
                  -1 === t ? o.push(n, [ s, r ]) : o[t + 1].push(s, r)
                } else
                  o.push(n, r)
              }
            }
          }
          function Xo(t, e, n) {
            return n && t.componentProviders++, t.multi.push(e) - 1
          }
          function Jo(t, e, n, s) {
            for (let i = n; i < s; i++)
              if (e[i] === t)
                return i;
            return -1
          }
          function ta(t, e, n, s) { return na(this.multi, []) }
          function ea(t, e, n, s) {
            const i = this.multi;
            let r;
            if (this.providerFactory) {
              const t = this.providerFactory.componentProviders,
                    e = as (n, n[1], this.providerFactory.index, s);
              r = e.slice(0, t), na(i, r);
              for (let n = t; n < e.length; n++)
                r.push(e[n])
            } else
              r = [], na(i, r);
            return r
          }
          function na(t, e) {
            for (let n = 0; n < t.length; n++)
              e.push((0, t[n])());
            return e
          }
          function sa(t, e = []) {
            return n => {
              n.providersResolver = (n, s) => function(t, e, n) {
                const s = rn();
                if (s.firstCreatePass) {
                  const i = Le(t);
                  Zo(n, s.data, s.blueprint, i, !0),
                      Zo(e, s.data, s.blueprint, i, !1)
                }
              }(n, s ? s(t) : t, e)
            }
          }
          class ia {}
          class ra {
            resolveComponentFactory(t) {
              throw function(t) {
                const e = Error(`No component factory found for ${
                    wt(t)}. Did you add it to @NgModule.entryComponents?`);
                return e.ngComponent = t, e
              }(t)
            }
          }
          let oa = (() => {class t {} return t.NULL = new ra, t})(),
              aa = (() => {
                class t {
                  constructor(t) { this.nativeElement = t }
                } return t.__NG_ELEMENT_ID__ = () => la(t),
                t
              })();
          const la = function(t) { return Fr(t, on(), sn()) };
          class ca {}
          var ua = function(t) {
            return t[t.Important = 1] = "Important",
                                   t[t.DashCase = 2] = "DashCase", t
          }({});
          let ha =
              (() => {class t {} return t.__NG_ELEMENT_ID__ = () => da(), t})();
          const da = function() {
            const t = sn(), e = Qe(on().index, t);
            return function(t) {
              const e = t[11];
              if (Ue(e))
                return e;
              throw new Error(
                  "Cannot inject Renderer2 when the application uses Renderer3!")
            }(Ae(e) ? e : t)
          };
          let pa = (() => {
            class t {} return t.\u0275prov =
                ht({token : t, providedIn : "root", factory : () => null}),
            t
          })();
          class fa {
            constructor(t) {
              this.full = t, this.major = t.split(".")[0],
              this.minor = t.split(".")[1],
              this.patch = t.split(".").slice(2).join(".")
            }
          }
          const ma = new fa("10.1.3");
          class ga {
            constructor() {}
            supports(t) { return go(t) }
            create(t) { return new _a(t) }
          }
          const ya = (t, e) => e;
          class _a {
            constructor(t) {
              this.length = 0, this._linkedRecords = null,
              this._unlinkedRecords = null, this._previousItHead = null,
              this._itHead = null, this._itTail = null,
              this._additionsHead = null, this._additionsTail = null,
              this._movesHead = null, this._movesTail = null,
              this._removalsHead = null, this._removalsTail = null,
              this._identityChangesHead = null,
              this._identityChangesTail = null, this._trackByFn = t || ya
            }
            forEachItem(t) {
              let e;
              for (e = this._itHead; null !== e; e = e._next)
                t(e)
            }
            forEachOperation(t) {
              let e = this._itHead, n = this._removalsHead, s = 0, i = null;
              for (; e || n;) {
                const r = !n || e && e.currentIndex < xa(n, s, i) ? e : n,
                      o = xa(r, s, i), a = r.currentIndex;
                if (r === n)
                  s--, n = n._nextRemoved;
                else if (e = e._next, null == r.previousIndex)
                  s++;
                else {
                  i || (i = []);
                  const t = o - s, e = a - s;
                  if (t != e) {
                    for (let n = 0; n < t; n++) {
                      const s = n < i.length ? i[n] : i[n] = 0, r = s + n;
                      e <= r && r < t && (i[n] = s + 1)
                    }
                    i[r.previousIndex] = e - t
                  }
                }
                o !== a && t(r, o, a)
              }
            }
            forEachPreviousItem(t) {
              let e;
              for (e = this._previousItHead; null !== e; e = e._nextPrevious)
                t(e)
            }
            forEachAddedItem(t) {
              let e;
              for (e = this._additionsHead; null !== e; e = e._nextAdded)
                t(e)
            }
            forEachMovedItem(t) {
              let e;
              for (e = this._movesHead; null !== e; e = e._nextMoved)
                t(e)
            }
            forEachRemovedItem(t) {
              let e;
              for (e = this._removalsHead; null !== e; e = e._nextRemoved)
                t(e)
            }
            forEachIdentityChange(t) {
              let e;
              for (e = this._identityChangesHead; null !== e;
                   e = e._nextIdentityChange)
                t(e)
            }
            diff(t) {
              if (null == t && (t = []), !go(t))
                throw new Error(`Error trying to diff '${
                    wt(t)}'. Only arrays and iterables are allowed`);
              return this.check(t) ? this : null
            }
            onDestroy() {}
            check(t) {
              this._reset();
              let e, n, s, i = this._itHead, r = !1;
              if (Array.isArray(t)) {
                this.length = t.length;
                for (let e = 0; e < this.length; e++)
                  n = t[e], s = this._trackByFn(e, n),
                  null !== i && Object.is(i.trackById, s)
                      ? (r && (i = this._verifyReinsertion(i, n, s, e)),
                         Object.is(i.item, n) || this._addIdentityChange(i, n))
                      : (i = this._mismatch(i, n, s, e), r = !0),
                  i = i._next
              } else
                e = 0,
                function(t, e) {
                  if (Array.isArray(t))
                    for (let n = 0; n < t.length; n++)
                      e(t[n]);
                  else {
                    const n = t[fo()]();
                    let s;
                    for (; !(s = n.next()).done;)
                      e(s.value)
                  }
                }(t, t => {
                  s = this._trackByFn(e, t),
                  null !== i && Object.is(i.trackById, s)
                      ? (r && (i = this._verifyReinsertion(i, t, s, e)),
                         Object.is(i.item, t) || this._addIdentityChange(i, t))
                      : (i = this._mismatch(i, t, s, e), r = !0),
                  i = i._next,
                  e++
                }),
                this.length = e;
              return this._truncate(i), this.collection = t, this.isDirty
            }
            get isDirty() {
              return null !== this._additionsHead || null !== this._movesHead ||
                     null !== this._removalsHead ||
                     null !== this._identityChangesHead
            }
            _reset() {
              if (this.isDirty) {
                let t;
                for (t = this._previousItHead = this._itHead; null !== t;
                     t = t._next)
                  t._nextPrevious = t._next;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                  t.previousIndex = t.currentIndex;
                for (this._additionsHead = this._additionsTail = null,
                    t = this._movesHead;
                     null !== t; t = t._nextMoved)
                  t.previousIndex = t.currentIndex;
                this._movesHead = this._movesTail = null,
                this._removalsHead = this._removalsTail = null,
                this._identityChangesHead = this._identityChangesTail = null
              }
            }
            _mismatch(t, e, n, s) {
              let i;
              return null === t
                         ? i = this._itTail
                         : (i = t._prev, this._remove(t)),
                           null !== (t = null === this._linkedRecords
                                             ? null
                                             : this._linkedRecords.get(n, s))
                               ? (Object.is(t.item, e) ||
                                      this._addIdentityChange(t, e),
                                  this._moveAfter(t, i, s))
                               : null !== (t = null === this._unlinkedRecords
                                                   ? null
                                                   : this._unlinkedRecords.get(
                                                         n, null))
                                     ? (Object.is(t.item, e) ||
                                            this._addIdentityChange(t, e),
                                        this._reinsertAfter(t, i, s))
                                     : t = this._addAfter(new va(e, n), i, s),
                           t
            }
            _verifyReinsertion(t, e, n, s) {
              let i = null === this._unlinkedRecords
                          ? null
                          : this._unlinkedRecords.get(n, null);
              return null !== i
                         ? t = this._reinsertAfter(i, t._prev, s)
                         : t.currentIndex != s &&
                               (t.currentIndex = s, this._addToMoves(t, s)),
                           t
            }
            _truncate(t) {
              for (; null !== t;) {
                const e = t._next;
                this._addToRemovals(this._unlink(t)), t = e
              }
              null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                  null !== this._additionsTail &&
                      (this._additionsTail._nextAdded = null),
                  null !== this._movesTail &&
                      (this._movesTail._nextMoved = null),
                  null !== this._itTail && (this._itTail._next = null),
                  null !== this._removalsTail &&
                      (this._removalsTail._nextRemoved = null),
                  null !== this._identityChangesTail &&
                      (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(t, e, n) {
              null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
              const s = t._prevRemoved, i = t._nextRemoved;
              return null === s ? this._removalsHead = i : s._nextRemoved = i,
                                  null === i ? this._removalsTail = s
                                             : i._prevRemoved = s,
                                  this._insertAfter(t, e, n),
                                  this._addToMoves(t, n), t
            }
            _moveAfter(t, e, n) {
              return this._unlink(t), this._insertAfter(t, e, n),
                     this._addToMoves(t, n), t
            }
            _addAfter(t, e, n) {
              return this._insertAfter(t, e, n),
                     this._additionsTail =
                         null === this._additionsTail
                             ? this._additionsHead = t
                             : this._additionsTail._nextAdded = t,
                     t
            }
            _insertAfter(t, e, n) {
              const s = null === e ? this._itHead : e._next;
              return t._next = s, t._prev = e,
                     null === s ? this._itTail = t : s._prev = t,
                     null === e ? this._itHead = t : e._next = t,
                     null === this._linkedRecords &&
                         (this._linkedRecords = new wa),
                     this._linkedRecords.put(t), t.currentIndex = n, t
            }
            _remove(t) { return this._addToRemovals(this._unlink(t)) }
            _unlink(t) {
              null !== this._linkedRecords && this._linkedRecords.remove(t);
              const e = t._prev, n = t._next;
              return null === e ? this._itHead = n : e._next = n,
                                  null === n ? this._itTail = e : n._prev = e, t
            }
            _addToMoves(t, e) {
              return t.previousIndex === e ||
                         (this._movesTail = null === this._movesTail
                                                ? this._movesHead = t
                                                : this._movesTail._nextMoved =
                                                      t),
                     t
            }
            _addToRemovals(t) {
              return null === this._unlinkedRecords &&
                         (this._unlinkedRecords = new wa),
                     this._unlinkedRecords.put(t),
                     t.currentIndex = null, t._nextRemoved = null,
                     null === this._removalsTail
                         ? (this._removalsTail = this._removalsHead = t,
                            t._prevRemoved = null)
                         : (t._prevRemoved = this._removalsTail,
                            this._removalsTail =
                                this._removalsTail._nextRemoved = t),
                     t
            }
            _addIdentityChange(t, e) {
              return t.item = e,
                     this._identityChangesTail =
                         null === this._identityChangesTail
                             ? this._identityChangesHead = t
                             : this._identityChangesTail._nextIdentityChange =
                                   t,
                     t
            }
          }
          class va {
            constructor(t, e) {
              this.item = t, this.trackById = e, this.currentIndex = null,
              this.previousIndex = null, this._nextPrevious = null,
              this._prev = null, this._next = null, this._prevDup = null,
              this._nextDup = null, this._prevRemoved = null,
              this._nextRemoved = null, this._nextAdded = null,
              this._nextMoved = null, this._nextIdentityChange = null
            }
          }
          class ba {
            constructor() { this._head = null, this._tail = null }
            add(t) {
              null === this._head
                  ? (this._head = this._tail = t, t._nextDup = null,
                     t._prevDup = null)
                  : (this._tail._nextDup = t, t._prevDup = this._tail,
                     t._nextDup = null, this._tail = t)
            }
            get(t, e) {
              let n;
              for (n = this._head; null !== n; n = n._nextDup)
                if ((null === e || e <= n.currentIndex) &&
                    Object.is(n.trackById, t))
                  return n;
              return null
            }
            remove(t) {
              const e = t._prevDup, n = t._nextDup;
              return null === e ? this._head = n : e._nextDup = n,
                                  null === n ? this._tail = e : n._prevDup = e,
                                  null === this._head
            }
          }
          class wa {
            constructor() { this.map = new Map }
            put(t) {
              const e = t.trackById;
              let n = this.map.get(e);
              n || (n = new ba, this.map.set(e, n)), n.add(t)
            }
            get(t, e) {
              const n = this.map.get(t);
              return n ? n.get(t, e) : null
            }
            remove(t) {
              const e = t.trackById;
              return this.map.get(e).remove(t) && this.map.delete(e), t
            }
            get isEmpty() { return 0 === this.map.size }
            clear() { this.map.clear() }
          }
          function xa(t, e, n) {
            const s = t.previousIndex;
            if (null === s)
              return s;
            let i = 0;
            return n && s < n.length && (i = n[s]), s + e + i
          }
          class Sa {
            constructor() {}
            supports(t) { return t instanceof Map || yo(t) }
            create() { return new Ea }
          }
          class Ea {
            constructor() {
              this._records = new Map, this._mapHead = null,
              this._appendAfter = null, this._previousMapHead = null,
              this._changesHead = null, this._changesTail = null,
              this._additionsHead = null, this._additionsTail = null,
              this._removalsHead = null, this._removalsTail = null
            }
            get isDirty() {
              return null !== this._additionsHead ||
                     null !== this._changesHead || null !== this._removalsHead
            }
            forEachItem(t) {
              let e;
              for (e = this._mapHead; null !== e; e = e._next)
                t(e)
            }
            forEachPreviousItem(t) {
              let e;
              for (e = this._previousMapHead; null !== e; e = e._nextPrevious)
                t(e)
            }
            forEachChangedItem(t) {
              let e;
              for (e = this._changesHead; null !== e; e = e._nextChanged)
                t(e)
            }
            forEachAddedItem(t) {
              let e;
              for (e = this._additionsHead; null !== e; e = e._nextAdded)
                t(e)
            }
            forEachRemovedItem(t) {
              let e;
              for (e = this._removalsHead; null !== e; e = e._nextRemoved)
                t(e)
            }
            diff(t) {
              if (t) {
                if (!(t instanceof Map || yo(t)))
                  throw new Error(`Error trying to diff '${
                      wt(t)}'. Only maps and objects are allowed`)
              } else
                t = new Map;
              return this.check(t) ? this : null
            }
            onDestroy() {}
            check(t) {
              this._reset();
              let e = this._mapHead;
              if (this._appendAfter = null, this._forEach(t, (t, n) => {
                    if (e && e.key === n)
                      this._maybeAddToChanges(e, t), this._appendAfter = e,
                                                     e = e._next;
                    else {
                      const s = this._getOrCreateRecordForKey(n, t);
                      e = this._insertBeforeOrAppend(e, s)
                    }
                  }), e) {
                e._prev && (e._prev._next = null), this._removalsHead = e;
                for (let t = e; null !== t; t = t._nextRemoved)
                  t === this._mapHead && (this._mapHead = null),
                      this._records.delete(t.key),
                      t._nextRemoved = t._next,
                      t.previousValue = t.currentValue, t.currentValue = null,
                      t._prev = null, t._next = null
              }
              return this._changesTail &&
                         (this._changesTail._nextChanged = null),
                     this._additionsTail &&
                         (this._additionsTail._nextAdded = null),
                     this.isDirty
            }
            _insertBeforeOrAppend(t, e) {
              if (t) {
                const n = t._prev;
                return e._next = t, e._prev = n, t._prev = e,
                       n && (n._next = e),
                       t === this._mapHead && (this._mapHead = e),
                       this._appendAfter = t, t
              }
              return this._appendAfter ? (this._appendAfter._next = e,
                                          e._prev = this._appendAfter)
                                       : this._mapHead = e,
                                         this._appendAfter = e, null
            }
            _getOrCreateRecordForKey(t, e) {
              if (this._records.has(t)) {
                const n = this._records.get(t);
                this._maybeAddToChanges(n, e);
                const s = n._prev, i = n._next;
                return s && (s._next = i), i && (i._prev = s), n._next = null,
                                                               n._prev = null, n
              }
              const n = new Ca(t);
              return this._records.set(t, n), n.currentValue = e,
                                              this._addToAdditions(n), n
            }
            _reset() {
              if (this.isDirty) {
                let t;
                for (this._previousMapHead = this._mapHead,
                    t = this._previousMapHead;
                     null !== t; t = t._next)
                  t._nextPrevious = t._next;
                for (t = this._changesHead; null !== t; t = t._nextChanged)
                  t.previousValue = t.currentValue;
                for (t = this._additionsHead; null != t; t = t._nextAdded)
                  t.previousValue = t.currentValue;
                this._changesHead = this._changesTail = null,
                this._additionsHead = this._additionsTail = null,
                this._removalsHead = null
              }
            }
            _maybeAddToChanges(t, e) {
              Object.is(e, t.currentValue) ||
                  (t.previousValue = t.currentValue, t.currentValue = e,
                   this._addToChanges(t))
            }
            _addToAdditions(t) {
              null === this._additionsHead
                  ? this._additionsHead = this._additionsTail = t
                  : (this._additionsTail._nextAdded = t,
                     this._additionsTail = t)
            }
            _addToChanges(t) {
              null === this._changesHead
                  ? this._changesHead = this._changesTail = t
                  : (this._changesTail._nextChanged = t, this._changesTail = t)
            }
            _forEach(t, e) {
              t instanceof Map ? t.forEach(e)
                               : Object.keys(t).forEach(n => e(t[n], n))
            }
          }
          class Ca {
            constructor(t) {
              this.key = t, this.previousValue = null, this.currentValue = null,
              this._nextPrevious = null, this._next = null, this._prev = null,
              this._nextAdded = null, this._nextRemoved = null,
              this._nextChanged = null
            }
          }
          let ka = (() => {
            class t {
              constructor(t) { this.factories = t }
              static create(e, n) {
                if (null != n) {
                  const t = n.factories.slice();
                  e = e.concat(t)
                }
                return new t(e)
              }
              static extend(e) {
                return {
                  provide: t, useFactory: n => {
                    if (!n)
                      throw new Error(
                          "Cannot extend IterableDiffers without a parent injector");
                    return t.create(e, n)
                  }, deps: [ [ t, new at, new rt ] ]
                }
              }
              find(t) {
                const e = this.factories.find(e => e.supports(t));
                if (null != e)
                  return e;
                throw new Error(`Cannot find a differ supporting object '${
                    t}' of type '${n = t, n.name || typeof n}'`);
                var n
              }
            } return t.\u0275prov = ht({
              token : t,
              providedIn : "root",
              factory : () => new t([ new ga ])
            }),
            t
          })(),
              Ta = (() => {
                class t {
                  constructor(t) { this.factories = t }
                  static create(e, n) {
                    if (n) {
                      const t = n.factories.slice();
                      e = e.concat(t)
                    }
                    return new t(e)
                  }
                  static extend(e) {
                    return {
                      provide: t, useFactory: n => {
                        if (!n)
                          throw new Error(
                              "Cannot extend KeyValueDiffers without a parent injector");
                        return t.create(e, n)
                      }, deps: [ [ t, new at, new rt ] ]
                    }
                  }
                  find(t) {
                    const e = this.factories.find(e => e.supports(t));
                    if (e)
                      return e;
                    throw new Error(
                        `Cannot find a differ supporting object '${t}'`)
                  }
                } return t.\u0275prov = ht({
                  token : t,
                  providedIn : "root",
                  factory : () => new t([ new Sa ])
                }),
                t
              })();
          const Aa = [ new Sa ], Ia = new ka([ new ga ]), Ra = new Ta(Aa);
          let Oa = (() => {
            class t {} return t.__NG_ELEMENT_ID__ = () => Pa(t, aa),
            t
          })();
          const Pa = function(t, e) { return Mr(t, e, on(), sn()) };
          let La = (() => {
            class t {} return t.__NG_ELEMENT_ID__ = () => Da(t, aa),
            t
          })();
          const Da = function(t, e) { return jr(t, e, on(), sn()) }, Na = {};
          class Fa extends oa {
            constructor(t) { super(), this.ngModule = t }
            resolveComponentFactory(t) {
              const e = Se(t);
              return new Va(e, this.ngModule)
            }
          }
          function Ma(t) {
            const e = [];
            for (let n in t)
              t.hasOwnProperty(n) &&
                  e.push({propName : t[n], templateName : n});
            return e
          }
          const ja = new Vt("SCHEDULER_TOKEN",
                            {providedIn : "root", factory : () => Wn});
          class Va extends ia {
            constructor(t, e) {
              super(), this.componentDef = t, this.ngModule = e,
                       this.componentType = t.type,
                       this.selector = t.selectors.map(ci).join(","),
                       this.ngContentSelectors =
                           t.ngContentSelectors ? t.ngContentSelectors : [],
                       this.isBoundToModule = !!e
            }
            get inputs() { return Ma(this.componentDef.inputs) }
            get outputs() { return Ma(this.componentDef.outputs) }
            create(t, e, n, s) {
              const i=(s=s||this.ngModule)?function(t,e){return{get:(n,s,i)=>{const r=t.get(n,Na,i);return r!==Na||s===Na?r:e.get(n,s,i)}}}(t,s.injector):t,r=i.get(ca,ze),o=i.get(pa,null),a=r.createRenderer(null,this.componentDef),l=this.componentDef.selectors[0][0]||"div",c=n?function(t,e,n){if(Ue(t))return t.selectRootElement(e,n===he.ShadowDom);let s="string"==typeof e?t.querySelector(e):e;return s.textContent="",s}(a,n,this.componentDef.encapsulation):Ei(l,r.createRenderer(null,this.componentDef),function(t){const e=t.toLowerCase();return"svg"===e?"http://www.w3.org/2000/svg":"math"===e?"http://www.w3.org/1998/MathML/":null}(l)),u=this.componentDef.onPush?576:528,h={components:[],scheduler:Wn,clean:rr,playerHandler:null,flags:0},d=Di(0,-1,null,1,0,null,null,null,null,null),p=Ci(null,d,h,u,null,null,r,a,o,i);
              let f, m;
              vn(p, null);
              try {
                const t = function(t, e, n, s, i, r) {
                  const o = n[1];
                  n[20] = t;
                  const a = ki(o, null, 0, 3, null, null),
                        l = a.mergedAttrs = e.hostAttrs;
                  null !== l &&
                      (ro(a, l, !0),
                       null !== t && (Nn(i, t, l),
                                      null !== a.classes && Rr(i, t, a.classes),
                                      null !== a.styles && Ir(i, t, a.styles)));
                  const c = s.createRenderer(t, e),
                        u = Ci(n, Li(e), null, e.onPush ? 64 : 16, n[20], a, s,
                               c, void 0);
                  return o.firstCreatePass && (ns(Xn(a, n), o, e.type),
                                               $i(o, a), Wi(a, n.length, 1)),
                         tr(n, u), n[20] = u
                }(c, this.componentDef, p, r, a);
                if (c)
                  if (n)
                    Nn(a, c, [ "ng-version", ma.full ]);
                  else {
                    const {attrs : t, classes : e} = function(t) {
                      const e = [], n = [];
                      let s = 1, i = 2;
                      for (; s < t.length;) {
                        let r = t[s];
                        if ("string" == typeof r)
                          2 === i ? "" !== r && e.push(r, t[++s])
                                  : 8 === i && n.push(r);
                        else {
                          if (!ri(i))
                            break;
                          i = r
                        }
                        s++
                      }
                      return { attrs: e, classes: n }
                    }(this.componentDef.selectors[0]);
                    t && Nn(a, c, t), e && e.length > 0 && Rr(a, c, e.join(" "))
                  }
                if (m = Ge(d, 0), void 0 !== e) {
                  const t = m.projection = [];
                  for (let n = 0; n < this.ngContentSelectors.length; n++) {
                    const s = e[n];
                    t.push(null != s ? Array.from(s) : null)
                  }
                }
                f = function(t, e, n, s, i) {
                  const r = n[1], o = function(t, e, n) {
                    const s = on();
                    t.firstCreatePass &&
                        (n.providersResolver && n.providersResolver(n),
                         zi(t, s, 1), Gi(t, e, n));
                    const i = as (e, t, e.length - 1, s);
                    Xs(i, e);
                    const r = We(s, e);
                    return r && Xs(r, e), i
                  }(r, n, e);
                  s.components.push(o),
                      t[8] = o, i && i.forEach(t => t(o, e)),
                      e.contentQueries && e.contentQueries(1, o, n.length - 1);
                  const a = on();
                  if (r.firstCreatePass &&
                      (null !== e.hostBindings || null !== e.hostAttrs)) {
                    kn(a.index - ke);
                    const t = n[1];
                    Bi(t, e), Hi(t, n, e.hostVars), Ui(e, o)
                  }
                  return o
                }(t, this.componentDef, p, h, [ oo ]), Ti(d, p, null)
              } finally {
                En()
              }
              const g = new Ba(this.componentType, f, Fr(aa, m, p), p, m);
              return d.node.child = m, g
            }
          }
          class Ba extends class {}
          {
            constructor(t, e, n, s, i) {
              super(),
                  this.location = n, this._rootLView = s, this._tNode = i,
                  this.destroyCbs = [], this.instance = e,
                  this.hostView = this.changeDetectorRef = new Pr(s),
                  function(t, e, n, s) {
                    let i = t.node;
                    null == i && (t.node = i = Fi(0, null, 2, -1, null, null)),
                        s[6] = i
                  }(s[1], 0, 0, s),
                  this.componentType = t
            }
            get injector() { return new us(this._tNode, this._rootLView) }
            destroy() {
              this.destroyCbs &&
                  (this.destroyCbs.forEach(t => t()), this.destroyCbs = null,
                   !this.hostView.destroyed && this.hostView.destroy())
            }
            onDestroy(t) { this.destroyCbs && this.destroyCbs.push(t) }
          }
          const Ha = void 0;
          var Ua = [
            "en",
            [ [ "a", "p" ], [ "AM", "PM" ], Ha ],
            [ [ "AM", "PM" ], Ha, Ha ],
            [
              [ "S", "M", "T", "W", "T", "F", "S" ],
              [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
              [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"
              ],
              [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
            ],
            Ha,
            [
              [ "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D" ],
              [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec"
              ],
              [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
              ]
            ],
            Ha,
            [
              [ "B", "A" ], [ "BC", "AD" ], [ "Before Christ", "Anno Domini" ]
            ],
            0,
            [ 6, 0 ],
            [ "M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y" ],
            [ "h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz" ],
            [ "{1}, {0}", Ha, "{1} 'at' {0}", Ha ],
            [
              ".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e",
              "NaN", ":"
            ],
            [ "#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0" ],
            "USD",
            "$",
            "US Dollar",
            {},
            "ltr",
            function(t) {
              let e = Math.floor(Math.abs(t)),
                  n = t.toString().replace(/^[^.]*\.?/, "").length;
              return 1 === e && 0 === n ? 1 : 5
            }
          ];
          let za = {};
          function $a(t) {
            return t in za ||
                       (za[t] = Ot.ng && Ot.ng.common && Ot.ng.common.locales &&
                                Ot.ng.common.locales[t]),
                   za[t]
          }
          var qa = function(t) {
            return t[t.LocaleId = 0] = "LocaleId",
                                  t[t.DayPeriodsFormat = 1] =
                                      "DayPeriodsFormat",
                                  t[t.DayPeriodsStandalone = 2] =
                                      "DayPeriodsStandalone",
                                  t[t.DaysFormat = 3] = "DaysFormat",
                                  t[t.DaysStandalone = 4] = "DaysStandalone",
                                  t[t.MonthsFormat = 5] = "MonthsFormat",
                                  t[t.MonthsStandalone = 6] =
                                      "MonthsStandalone",
                                  t[t.Eras = 7] = "Eras",
                                  t[t.FirstDayOfWeek = 8] = "FirstDayOfWeek",
                                  t[t.WeekendRange = 9] = "WeekendRange",
                                  t[t.DateFormat = 10] = "DateFormat",
                                  t[t.TimeFormat = 11] = "TimeFormat",
                                  t[t.DateTimeFormat = 12] = "DateTimeFormat",
                                  t[t.NumberSymbols = 13] = "NumberSymbols",
                                  t[t.NumberFormats = 14] = "NumberFormats",
                                  t[t.CurrencyCode = 15] = "CurrencyCode",
                                  t[t.CurrencySymbol = 16] = "CurrencySymbol",
                                  t[t.CurrencyName = 17] = "CurrencyName",
                                  t[t.Currencies = 18] = "Currencies",
                                  t[t.Directionality = 19] = "Directionality",
                                  t[t.PluralCase = 20] = "PluralCase",
                                  t[t.ExtraData = 21] = "ExtraData", t
          }({});
          const Wa = "en-US";
          let Ga = Wa;
          function Qa(t) {
            var e, n;
            n = "Expected localeId to be defined",
            null == (e = t) &&
                function(t, e, n, s) {
                  throw new Error("ASSERTION ERROR: " + t +
                                  ` [Expected=> null != ${e} <=Actual]`)
                }(n, e),
            "string" == typeof t && (Ga = t.toLowerCase().replace(/_/g, "-"))
          }
          const Ka = new Map;
          class Za extends ee {
            constructor(t, e) {
              super(), this._parent = e, this._bootstrapComponents = [],
                       this.injector = this, this.destroyCbs = [],
                       this.componentFactoryResolver = new Fa(this);
              const n = Ce(t), s = t[Ft] || null;
              s && Qa(s),
                  this._bootstrapComponents = Qn(n.bootstrap),
                  this._r3Injector = Kr(
                      t, e,
                      [
                        {provide : ee, useValue : this},
                        {provide : oa, useValue : this.componentFactoryResolver}
                      ],
                      wt(t)),
                  this._r3Injector._resolveInjectorDefTypes(),
                  this.instance = this.get(t)
            }
            get(t, e = so.THROW_IF_NOT_FOUND, n = lt.Default) {
              return t === so || t === ee || t === Bt
                         ? this
                         : this._r3Injector.get(t, e, n)
            }
            destroy() {
              const t = this._r3Injector;
              !t.destroyed && t.destroy(), this.destroyCbs.forEach(t => t()),
                  this.destroyCbs = null
            }
            onDestroy(t) { this.destroyCbs.push(t) }
          }
          class Ya extends ne {
            constructor(t) {
              super(), this.moduleType = t, null !== Ce(t) && function t(e) {
                if (null !== e.\u0275mod.id) {
                  const t = e.\u0275mod.id;
                  (function(t, e, n) {
                    if (e && e !== n)
                      throw new Error(`Duplicate module registered for ${t} - ${
                          wt(e)} vs ${wt(e.name)}`)
                  })(t, Ka.get(t), e),
                      Ka.set(t, e)
                }
                let n = e.\u0275mod.imports;
                n instanceof Function && (n = n()), n && n.forEach(e => t(e))
              }(t)
            }
            create(t) { return new Za(this.moduleType, t) }
          }
          function Xa(t, e, n, s, i, r) {
            return function(t, e, n, s, i, r, o, a) {
              const l = e + n;
              return function(t, e, n, s, i) {
                const r = bo(t, e, n, s);
                return vo(t, e + 2, i) || r
              }(t, l, i, r, o)
                         ? _o(t, l + 3, a ? s.call(a, i, r, o) : s(i, r, o))
                         : Ja(t, l + 3)
            }(sn(), dn(), t, e, n, s, i, r)
          }
          function Ja(t, e) {
            const n = t[e];
            return n === ui ? void 0 : n
          }
          const tl = class extends S {
            constructor(t = !1) { super(), this.__isAsync = t }
            emit(t) { super.next(t) }
            subscribe(t, e, n) {
              let s, i = t => null, r = () => null;
              t && "object" == typeof t
                  ? (s = this.__isAsync ? e => {setTimeout(() => t.next(e))}
                                        : e => {t.next(e)},
                     t.error && (i = this.__isAsync
                                         ? e => {setTimeout(() => t.error(e))}
                                         : e => {t.error(e)}),
                     t.complete &&
                         (r = this.__isAsync
                                  ? () => {setTimeout(() => t.complete())}
                                  : () => {t.complete()}))
                  : (s = this.__isAsync ? e => {setTimeout(() => t(e))}
                                        : e => {t(e)},
                     e && (i = this.__isAsync ? t => {setTimeout(() => e(t))}
                                              : t => {e(t)}),
                     n && (r = this.__isAsync ? () => {setTimeout(() => n())}
                                              : () => {n()}));
              const o = super.subscribe(s, i, r);
              return t instanceof h && t.add(o), o
            }
          };
          function el() { return this._results[fo()]() }
          class nl {
            constructor() {
              this.dirty = !0, this._results = [], this.changes = new tl,
              this.length = 0;
              const t = fo(), e = nl.prototype;
              e[t] || (e[t] = el)
            }
            map(t) { return this._results.map(t) }
            filter(t) { return this._results.filter(t) }
            find(t) { return this._results.find(t) }
            reduce(t, e) { return this._results.reduce(t, e) }
            forEach(t) { this._results.forEach(t) }
            some(t) { return this._results.some(t) }
            toArray() { return this._results.slice() }
            toString() { return this._results.toString() }
            reset(t) {
              this._results =
                  function t(e, n) {
                void 0 === n && (n = e);
                for (let s = 0; s < e.length; s++) {
                  let i = e[s];
                  Array.isArray(i) ? (n === e && (n = e.slice(0, s)), t(i, n))
                                   : n !== e && n.push(i)
                }
                return n
              }(t),
              this.dirty = !1, this.length = this._results.length,
              this.last = this._results[this.length - 1],
              this.first = this._results[0]
            }
            notifyOnChanges() { this.changes.emit(this) }
            setDirty() { this.dirty = !0 }
            destroy() { this.changes.complete(), this.changes.unsubscribe() }
          }
          class sl {
            constructor(t) { this.queryList = t, this.matches = null }
            clone() { return new sl(this.queryList) }
            setDirty() { this.queryList.setDirty() }
          }
          class il {
            constructor(t = []) { this.queries = t }
            createEmbeddedView(t) {
              const e = t.queries;
              if (null !== e) {
                const n =
                    null !== t.contentQueries ? t.contentQueries[0] : e.length,
                      s = [];
                for (let t = 0; t < n; t++) {
                  const n = e.getByIndex(t);
                  s.push(this.queries[n.indexInDeclarationView].clone())
                }
                return new il(s)
              }
              return null
            }
            insertView(t) { this.dirtyQueriesWithMatches(t) }
            detachView(t) { this.dirtyQueriesWithMatches(t) }
            dirtyQueriesWithMatches(t) {
              for (let e = 0; e < this.queries.length; e++)
                null !== fl(t, e).matches && this.queries[e].setDirty()
            }
          }
          class rl {
            constructor(t, e, n, s = null) {
              this.predicate = t, this.descendants = e, this.isStatic = n,
              this.read = s
            }
          }
          class ol {
            constructor(t = []) { this.queries = t }
            elementStart(t, e) {
              for (let n = 0; n < this.queries.length; n++)
                this.queries[n].elementStart(t, e)
            }
            elementEnd(t) {
              for (let e = 0; e < this.queries.length; e++)
                this.queries[e].elementEnd(t)
            }
            embeddedTView(t) {
              let e = null;
              for (let n = 0; n < this.length; n++) {
                const s = null !== e ? e.length : 0,
                      i = this.getByIndex(n).embeddedTView(t, s);
                i && (i.indexInDeclarationView = n,
                      null !== e ? e.push(i) : e = [ i ])
              }
              return null !== e ? new ol(e) : null
            }
            template(t, e) {
              for (let n = 0; n < this.queries.length; n++)
                this.queries[n].template(t, e)
            }
            getByIndex(t) { return this.queries[t] }
            get length() { return this.queries.length }
            track(t) { this.queries.push(t) }
          }
          class al {
            constructor(t, e = -1) {
              this.metadata = t, this.matches = null,
              this.indexInDeclarationView = -1, this.crossesNgTemplate = !1,
              this._appliesToNextNode = !0, this._declarationNodeIndex = e
            }
            elementStart(t, e) {
              this.isApplyingToNode(e) && this.matchTNode(t, e)
            }
            elementEnd(t) {
              this._declarationNodeIndex === t.index &&
                  (this._appliesToNextNode = !1)
            }
            template(t, e) { this.elementStart(t, e) }
            embeddedTView(t, e) {
              return this.isApplyingToNode(t)
                         ? (this.crossesNgTemplate = !0,
                            this.addMatch(-t.index, e), new al(this.metadata))
                         : null
            }
            isApplyingToNode(t) {
              if (this._appliesToNextNode && !1 === this.metadata.descendants) {
                const e = this._declarationNodeIndex;
                let n = t.parent;
                for (; null !== n && 4 === n.type && n.index !== e;)
                  n = n.parent;
                return e === (null !== n ? n.index : -1)
              }
              return this._appliesToNextNode
            }
            matchTNode(t, e) {
              const n = this.metadata.predicate;
              if (Array.isArray(n))
                for (let s = 0; s < n.length; s++) {
                  const i = n[s];
                  this.matchTNodeWithReadOption(t, e, ll(e, i)),
                      this.matchTNodeWithReadOption(t, e, os(e, t, i, !1, !1))
                }
              else
                n === Oa
                    ? 0 === e.type && this.matchTNodeWithReadOption(t, e, -1)
                    : this.matchTNodeWithReadOption(t, e, os(e, t, n, !1, !1))
            }
            matchTNodeWithReadOption(t, e, n) {
              if (null !== n) {
                const s = this.metadata.read;
                if (null !== s)
                  if (s === aa || s === La || s === Oa && 0 === e.type)
                    this.addMatch(e.index, -2);
                  else {
                    const n = os(e, t, s, !1, !1);
                    null !== n && this.addMatch(e.index, n)
                  }
                else
                  this.addMatch(e.index, n)
              }
            }
            addMatch(t, e) {
              null === this.matches ? this.matches = [ t, e ]
                                    : this.matches.push(t, e)
            }
          }
          function ll(t, e) {
            const n = t.localNames;
            if (null !== n)
              for (let s = 0; s < n.length; s += 2)
                if (n[s] === e)
                  return n[s + 1];
            return null
          }
          function cl(t, e, n, s) {
            return -1 === n ? function(t, e) {
              return 3 === t.type || 4 === t.type ? Fr(aa, t, e)
                                                  : 0 === t.type ? Mr(Oa, aa, t,
                                                                      e)
                                                                 : null
            }(e, t) : -2 === n ? function(t, e, n) {
              return n === aa ? Fr(aa, e, t)
                              : n === Oa ? Mr(Oa, aa, e, t)
                                         : n === La ? jr(La, aa, e, t) : void 0
            }(t, e, s) : as (t, t[1], n, e)
          }
          function ul(t, e, n, s) {
            const i = e[19].queries[s];
            if (null === i.matches) {
              const s = t.data, r = n.matches, o = [];
              for (let t = 0; t < r.length; t += 2) {
                const i = r[t];
                o.push(i < 0 ? null : cl(e, s[i], r[t + 1], n.metadata.read))
              }
              i.matches = o
            }
            return i.matches
          }
          function hl(t) {
            const e = sn(), n = rn(), s = gn();
            yn(s + 1);
            const i = fl(n, s);
            if (t.dirty && Ze(e) === i.metadata.isStatic) {
              if (null === i.matches)
                t.reset([]);
              else {
                const r = i.crossesNgTemplate ? function t(e, n, s, i) {
                  const r = e.queries.getByIndex(s), o = r.matches;
                  if (null !== o) {
                    const a = ul(e, n, r, s);
                    for (let e = 0; e < o.length; e += 2) {
                      const s = o[e];
                      if (s > 0)
                        i.push(a[e / 2]);
                      else {
                        const r = o[e + 1], a = n[-s];
                        for (let e = Te; e < a.length; e++) {
                          const n = a[e];
                          n[17] === n[3] && t(n[1], n, r, i)
                        }
                        if (null !== a[9]) {
                          const e = a[9];
                          for (let n = 0; n < e.length; n++) {
                            const s = e[n];
                            t(s[1], s, r, i)
                          }
                        }
                      }
                    }
                  }
                  return i
                }(n, e, s, []) : ul(n, e, i, s);
                t.reset(r), t.notifyOnChanges()
              }
              return !0
            }
            return !1
          }
          function dl(t, e, n) {
            !function(t, e, n, s, i, r) {
              t.firstCreatePass && function(t, e, n) {
                null === t.queries && (t.queries = new ol),
                    t.queries.track(new al(e, -1))
              }(t, new rl(n, s, false, i)), function(t, e) {
                const n = new nl;
                Ni(t, e, n, n.destroy), null === e[19] && (e[19] = new il),
                    e[19].queries.push(new sl(n))
              }(t, e)
            }(rn(), sn(), t, e, n)
          }
          function pl() {
            return t = sn(), e = gn(), t[19].queries[e].queryList;
            var t, e
          }
          function fl(t, e) { return t.queries.getByIndex(e) }
          const ml = new Vt("Application Initializer");
          let gl = (() => {
            class t {
              constructor(t) {
                this.appInits = t, this.initialized = !1, this.done = !1,
                this.donePromise =
                    new Promise((t, e) => {this.resolve = t, this.reject = e})
              }
              runInitializers() {
                if (this.initialized)
                  return;
                const t = [], e = () => { this.done = !0, this.resolve() };
                if (this.appInits)
                  for (let n = 0; n < this.appInits.length; n++) {
                    const e = this.appInits[n]();
                    Ro(e) && t.push(e)
                  }
                Promise.all(t).then(() => {e()}).catch(t => {this.reject(t)}),
                    0 === t.length && e(), this.initialized = !0
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(ml, 8)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          const yl = new Vt("AppId"), _l = {
            provide : yl,
            useFactory : function() { return `${vl()}${vl()}${vl()}` },
            deps : []
          };
          function vl() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
          }
          const bl = new Vt("Platform Initializer"), wl = new Vt("Platform ID"),
                xl = new Vt("appBootstrapListener");
          let Sl = (() => {
            class t {
              log(t) { console.log(t) }
              warn(t) { console.warn(t) }
            } return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          const El = new Vt("LocaleId"), Cl = new Vt("DefaultCurrencyCode");
          class kl {
            constructor(t, e) {
              this.ngModuleFactory = t, this.componentFactories = e
            }
          }
          const Tl = function(t) { return new Ya(t) }, Al = Tl,
                Il = function(t) { return Promise.resolve(Tl(t)) },
                Rl = function(t) {
                  const e = Tl(t), n = Qn(Ce(t).declarations).reduce((t, e) => {
                    const n = Se(e);
                    return n && t.push(new Va(n)), t
                  }, []);
                  return new kl(e, n)
                }, Ol = Rl, Pl = function(t) { return Promise.resolve(Rl(t)) };
          let Ll = (() => {
            class t {
              constructor() {
                this.compileModuleSync = Al, this.compileModuleAsync = Il,
                this.compileModuleAndAllComponentsSync = Ol,
                this.compileModuleAndAllComponentsAsync = Pl
              }
              clearCache() {}
              clearCacheFor(t) {}
              getModuleId(t) {}
            } return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          const Dl = (() => Promise.resolve(0))();
          function Nl(t) {
            "undefined" == typeof Zone
                ? Dl.then(() => {t && t.apply(null, null)})
                : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
          }
          class Fl {
            constructor({
              enableLongStackTrace : t = !1,
              shouldCoalesceEventChangeDetection: e = !1
            }) {
              if (this.hasPendingMacrotasks = !1,
                  this.hasPendingMicrotasks = !1, this.isStable = !0,
                  this.onUnstable = new tl(!1),
                  this.onMicrotaskEmpty = new tl(!1),
                  this.onStable = new tl(!1), this.onError = new tl(!1),
                  "undefined" == typeof Zone)
                throw new Error(
                    "In this configuration Angular requires Zone.js");
              Zone.assertZonePatched();
              const n = this;
              n._nesting = 0, n._outer = n._inner = Zone.current,
              Zone.wtfZoneSpec && (n._inner = n._inner.fork(Zone.wtfZoneSpec)),
              Zone.TaskTrackingZoneSpec &&
                  (n._inner = n._inner.fork(new Zone.TaskTrackingZoneSpec)),
              t && Zone.longStackTraceZoneSpec &&
                  (n._inner = n._inner.fork(Zone.longStackTraceZoneSpec)),
              n.shouldCoalesceEventChangeDetection = e,
              n.lastRequestAnimationFrameId = -1,
              n.nativeRequestAnimationFrame = function() {
                let t = Ot.requestAnimationFrame, e = Ot.cancelAnimationFrame;
                if ("undefined" != typeof Zone && t && e) {
                  const n = t[Zone.__symbol__("OriginalDelegate")];
                  n && (t = n);
                  const s = e[Zone.__symbol__("OriginalDelegate")];
                  s && (e = s)
                }
                return {
                  nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e
                }
              }().nativeRequestAnimationFrame, function(t) {
                const e =
                    !!t.shouldCoalesceEventChangeDetection &&
                    t.nativeRequestAnimationFrame && (() => {
                      !function(t) {
                        -1 === t.lastRequestAnimationFrameId &&
                            (t.lastRequestAnimationFrameId =
                                 t.nativeRequestAnimationFrame.call(Ot, () => {
                                   t.fakeTopEventTask ||
                                       (t.fakeTopEventTask =
                                            Zone.root.scheduleEventTask(
                                                "fakeTopEventTask", () => {
                                                  t.lastRequestAnimationFrameId =
                                                      -1,
                                                  Bl(t),
                                                  Vl(t)
                                                },
                                                void 0, () => {}, () => {})),
                                   t.fakeTopEventTask.invoke()
                                 }),
                             Bl(t))
                      }(t)
                    });
                t._inner = t._inner.fork({
                  name : "angular",
                  properties :
                      {isAngularZone : !0, maybeDelayChangeDetection : e},
                  onInvokeTask : (n, s, i, r, o, a) => {
                    try {
                      return Hl(t), n.invokeTask(i, r, o, a)
                    } finally {
                      e && "eventTask" === r.type && e(), Ul(t)
                    }
                  },
                  onInvoke : (e, n, s, i, r, o, a) => {
                    try {
                      return Hl(t), e.invoke(s, i, r, o, a)
                    } finally {
                      Ul(t)
                    }
                  },
                  onHasTask : (e, n, s, i) => {
                    e.hasTask(s, i),
                        n === s &&
                            ("microTask" == i.change
                                 ? (t._hasPendingMicrotasks = i.microTask,
                                    Bl(t), Vl(t))
                                 : "macroTask" == i.change &&
                                       (t.hasPendingMacrotasks = i.macroTask))
                  },
                  onHandleError : (e, n, s, i) =>
                      (e.handleError(s, i),
                       t.runOutsideAngular(() => t.onError.emit(i)), !1)
                })
              }(n)
            }
            static isInAngularZone() {
              return !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
              if (!Fl.isInAngularZone())
                throw new Error(
                    "Expected to be in Angular Zone, but it is not!")
            }
            static assertNotInAngularZone() {
              if (Fl.isInAngularZone())
                throw new Error(
                    "Expected to not be in Angular Zone, but it is!")
            }
            run(t, e, n) { return this._inner.run(t, e, n) }
            runTask(t, e, n, s) {
              const i = this._inner,
                    r = i.scheduleEventTask("NgZoneEvent: " + s, t, jl, Ml, Ml);
              try {
                return i.runTask(r, e, n)
              } finally {
                i.cancelTask(r)
              }
            }
            runGuarded(t, e, n) { return this._inner.runGuarded(t, e, n) }
            runOutsideAngular(t) { return this._outer.run(t) }
          }
          function Ml() {}
          const jl = {};
          function Vl(t) {
            if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
              try {
                t._nesting++, t.onMicrotaskEmpty.emit(null)
              } finally {
                if (t._nesting--, !t.hasPendingMicrotasks)
                  try {
                    t.runOutsideAngular(() => t.onStable.emit(null))
                  } finally {
                    t.isStable = !0
                  }
              }
          }
          function Bl(t) {
            t.hasPendingMicrotasks =
                !!(t._hasPendingMicrotasks ||
                   t.shouldCoalesceEventChangeDetection &&
                       -1 !== t.lastRequestAnimationFrameId)
          }
          function Hl(t) {
            t._nesting++,
                t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
          }
          function Ul(t) { t._nesting--, Vl(t) }
          class zl {
            constructor() {
              this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1,
              this.isStable = !0, this.onUnstable = new tl,
              this.onMicrotaskEmpty = new tl, this.onStable = new tl,
              this.onError = new tl
            }
            run(t, e, n) { return t.apply(e, n) }
            runGuarded(t, e, n) { return t.apply(e, n) }
            runOutsideAngular(t) { return t() }
            runTask(t, e, n, s) { return t.apply(e, n) }
          }
          let $l = (() => {
            class t {
              constructor(t) {
                this._ngZone = t, this._pendingCount = 0,
                this._isZoneStable = !0, this._didWork = !1,
                this._callbacks = [], this.taskTrackingZone = null,
                this._watchAngularEvents(),
                t.run(() => {this.taskTrackingZone =
                                 "undefined" == typeof Zone
                                     ? null
                                     : Zone.current.get("TaskTrackingZone")})
              }
              _watchAngularEvents() {
                this._ngZone.onUnstable.subscribe({
                  next : () => { this._didWork = !0, this._isZoneStable = !1 }
                }),
                    this._ngZone.runOutsideAngular(
                        () => {this._ngZone.onStable.subscribe({
                          next : () => {
                            Fl.assertNotInAngularZone(), Nl(() => {
                              this._isZoneStable = !0,
                              this._runCallbacksIfReady()
                            })
                          }
                        })})
              }
              increasePendingRequestCount() {
                return this._pendingCount += 1, this._didWork = !0,
                                                this._pendingCount
              }
              decreasePendingRequestCount() {
                if (this._pendingCount -= 1, this._pendingCount < 0)
                  throw new Error("pending async requests below zero");
                return this._runCallbacksIfReady(), this._pendingCount
              }
              isStable() {
                return this._isZoneStable && 0 === this._pendingCount &&
                       !this._ngZone.hasPendingMacrotasks
              }
              _runCallbacksIfReady() {
                if (this.isStable())
                  Nl(() => {
                    for (; 0 !== this._callbacks.length;) {
                      let t = this._callbacks.pop();
                      clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                    }
                    this._didWork = !1
                  });
                else {
                  let t = this.getPendingTasks();
                  this._callbacks = this._callbacks.filter(
                      e => !e.updateCb || !e.updateCb(t) ||
                           (clearTimeout(e.timeoutId), !1)),
                  this._didWork = !0
                }
              }
              getPendingTasks() {
                return this.taskTrackingZone
                           ? this.taskTrackingZone.macroTasks.map(
                                 t => ({
                                   source : t.source,
                                   creationLocation : t.creationLocation,
                                   data : t.data
                                 }))
                           : []
              }
              addCallback(t, e, n) {
                let s = -1;
                e && e > 0 &&
                    (s = setTimeout(() => {
                       this._callbacks =
                           this._callbacks.filter(t => t.timeoutId !== s),
                       t(this._didWork, this.getPendingTasks())
                     },
                                    e)),
                    this._callbacks.push(
                        {doneCb : t, timeoutId : s, updateCb : n})
              }
              whenStable(t, e, n) {
                if (n && !this.taskTrackingZone)
                  throw new Error(
                      'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                this.addCallback(t, e, n), this._runCallbacksIfReady()
              }
              getPendingRequestCount() { return this._pendingCount }
              findProviders(t, e, n) { return [] }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(Fl)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })(),
              ql = (() => {
                class t {
                  constructor() {
                    this._applications = new Map, Ql.addToWindow(this)
                  }
                  registerApplication(t, e) { this._applications.set(t, e) }
                  unregisterApplication(t) { this._applications.delete(t) }
                  unregisterAllApplications() { this._applications.clear() }
                  getTestability(t) { return this._applications.get(t) || null }
                  getAllTestabilities() {
                    return Array.from(this._applications.values())
                  }
                  getAllRootElements() {
                    return Array.from(this._applications.keys())
                  }
                  findTestabilityInTree(t, e = !0) {
                    return Ql.findTestabilityInTree(this, t, e)
                  }
                } return t.\u0275fac = function(e) { return new (e || t) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
          class Wl {
            addToWindow(t) {}
            findTestabilityInTree(t, e, n) { return null }
          }
          let Gl, Ql = new Wl;
          const Kl = new Vt("AllowMultipleToken");
          class Zl {
            constructor(t, e) { this.name = t, this.token = e }
          }
          function Yl(t, e, n = []) {
            const s = "Platform: " + e, i = new Vt(s);
            return (e = []) => {
              let r = Xl();
              if (!r || r.injector.get(Kl, !1))
                if (t)
                  t(n.concat(e).concat({provide : i, useValue : !0}));
                else {
                  const t =
                      n.concat(e).concat({provide : i, useValue : !0},
                                         {provide : zr, useValue : "platform"});
                  !function(t) {
                    if (Gl && !Gl.destroyed && !Gl.injector.get(Kl, !1))
                      throw new Error(
                          "There can be only one platform. Destroy the previous one to create a new one.");
                    Gl = t.get(Jl);
                    const e = t.get(bl, null);
                    e && e.forEach(t => t())
                  }(so.create({providers : t, name : s}))
                }
              return function(t) {
                const e = Xl();
                if (!e)
                  throw new Error("No platform exists!");
                if (!e.injector.get(t, null))
                  throw new Error(
                      "A platform with a different configuration has been created. Please destroy it first.");
                return e
              }(i)
            }
          }
          function Xl() { return Gl && !Gl.destroyed ? Gl : null }
          let Jl = (() => {
            class t {
              constructor(t) {
                this._injector = t, this._modules = [],
                this._destroyListeners = [], this._destroyed = !1
              }
              bootstrapModuleFactory(t, e) {
                const n =
                    function(t, e) {
                  let n;
                  return n = "noop" === t
                                 ? new zl
                                 : ("zone.js" === t ? void 0 : t) || new Fl({
                                     enableLongStackTrace : As(),
                                     shouldCoalesceEventChangeDetection : e
                                   }),
                         n
                }(e ? e.ngZone : void 0, e && e.ngZoneEventCoalescing || !1),
                      s = [ {provide : Fl, useValue : n} ];
                return n.run(() => {
                  const e = so.create({
                    providers : s,
                    parent : this.injector,
                    name : t.moduleType.name
                  }),
                        i = t.create(e), r = i.injector.get(gs, null);
                  if (!r)
                    throw new Error(
                        "No ErrorHandler. Is platform module (BrowserModule) included?");
                  return i.onDestroy(() => nc(this._modules, i)),
                         n.runOutsideAngular(
                             () => n.onError.subscribe(
                                 {next : t => { r.handleError(t) }})),
                         function(t, e, n) {
                           try {
                             const s = n();
                             return Ro(s) ? s.catch(n => {
                               throw e.runOutsideAngular(() =>
                                                             t.handleError(n)),
                               n
                             })
                                          : s
                           } catch (s) {
                             throw e.runOutsideAngular(() => t.handleError(s)),
                                 s
                           }
                         }(r, n, () => {
                           const t = i.injector.get(gl);
                           return t.runInitializers(),
                                  t.donePromise.then(
                                      () => (Qa(i.injector.get(El, Wa) || Wa),
                                             this._moduleDoBootstrap(i), i))
                         })
                })
              }
              bootstrapModule(t, e = []) {
                const n = tc({}, e);
                return function(t, e, n) {
                  const s = new Ya(n);
                  return Promise.resolve(s)
                }(0, 0,
                  t).then(t => this.bootstrapModuleFactory(t, n))
              }
              _moduleDoBootstrap(t) {
                const e = t.injector.get(ec);
                if (t._bootstrapComponents.length > 0)
                  t._bootstrapComponents.forEach(t => e.bootstrap(t));
                else {
                  if (!t.instance.ngDoBootstrap)
                    throw new Error(`The module ${
                        wt(t.instance
                               .constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
                  t.instance.ngDoBootstrap(e)
                }
                this._modules.push(t)
              }
              onDestroy(t) { this._destroyListeners.push(t) }
              get injector() { return this._injector }
              destroy() {
                if (this._destroyed)
                  throw new Error("The platform has already been destroyed!");
                this._modules.slice().forEach(t => t.destroy()),
                    this._destroyListeners.forEach(t => t()),
                    this._destroyed = !0
              }
              get destroyed() { return this._destroyed }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(so)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          function tc(t, e) {
            return Array.isArray(e) ? e.reduce(tc, t)
                                    : Object.assign(Object.assign({}, t), e)
          }
          let ec = (() => {
            class t {
              constructor(t, e, n, s, i, r) {
                this._zone = t, this._console = e, this._injector = n,
                this._exceptionHandler = s, this._componentFactoryResolver = i,
                this._initStatus = r, this._bootstrapListeners = [],
                this._views = [], this._runningTick = !1,
                this._enforceNoNewChanges = !1, this._stable = !0,
                this.componentTypes = [], this.components = [],
                this._enforceNoNewChanges = As(),
                this._zone.onMicrotaskEmpty.subscribe(
                    {next : () => { this._zone.run(() => {this.tick()}) }});
                const o = new _(t => {
                  this._stable = this._zone.isStable &&
                                 !this._zone.hasPendingMacrotasks &&
                                 !this._zone.hasPendingMicrotasks,
                  this._zone.runOutsideAngular(
                      () => {t.next(this._stable), t.complete()})
                }),
                      a = new _(t => {
                        let e;
                        this._zone.runOutsideAngular(
                            () => {e = this._zone.onStable.subscribe(() => {
                              Fl.assertNotInAngularZone(),
                              Nl(() => {this._stable ||
                                        this._zone.hasPendingMacrotasks ||
                                        this._zone.hasPendingMicrotasks ||
                                        (this._stable = !0, t.next(!0))})
                            })});
                        const n = this._zone.onUnstable.subscribe(() => {
                          Fl.assertInAngularZone(),
                          this._stable &&
                              (this._stable = !1,
                               this._zone.runOutsideAngular(() => {t.next(!1)}))
                        });
                        return () => { e.unsubscribe(), n.unsubscribe() }
                      });
                this.isStable = q(o, a.pipe(t => W()(X(tt)(t))))
              }
              bootstrap(t, e) {
                if (!this._initStatus.done)
                  throw new Error(
                      "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                let n;
                n = t instanceof ia ? t
                                    : this._componentFactoryResolver
                                          .resolveComponentFactory(t),
                this.componentTypes.push(n.componentType);
                const s = n.isBoundToModule ? void 0 : this._injector.get(ee),
                      i = n.create(so.NULL, [], e || n.selector, s);
                i.onDestroy(() => {this._unloadComponent(i)});
                const r = i.injector.get($l, null);
                return r && i.injector.get(ql).registerApplication(
                                i.location.nativeElement, r),
                       this._loadComponent(i),
                       As() &&
                           this._console.log(
                               "Angular is running in development mode. Call enableProdMode() to enable production mode."),
                       i
              }
              tick() {
                if (this._runningTick)
                  throw new Error("ApplicationRef.tick is called recursively");
                try {
                  this._runningTick = !0;
                  for (let t of this._views)
                    t.detectChanges();
                  if (this._enforceNoNewChanges)
                    for (let t of this._views)
                      t.checkNoChanges()
                } catch (t) {
                  this._zone.runOutsideAngular(
                      () => this._exceptionHandler.handleError(t))
                } finally {
                  this._runningTick = !1
                }
              }
              attachView(t) {
                const e = t;
                this._views.push(e), e.attachToAppRef(this)
              }
              detachView(t) {
                const e = t;
                nc(this._views, e), e.detachFromAppRef()
              }
              _loadComponent(t) {
                this.attachView(t.hostView), this.tick(),
                    this.components.push(t),
                    this._injector.get(xl, [])
                        .concat(this._bootstrapListeners)
                        .forEach(e => e(t))
              }
              _unloadComponent(t) {
                this.detachView(t.hostView), nc(this.components, t)
              }
              ngOnDestroy() { this._views.slice().forEach(t => t.destroy()) }
              get viewCount() { return this._views.length }
            } return t.\u0275fac =
                function(e) {
                  return new (e || t)(Zt(Fl), Zt(Sl), Zt(so), Zt(gs), Zt(oa),
                                      Zt(gl))
                },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          function nc(t, e) {
            const n = t.indexOf(e);
            n > -1 && t.splice(n, 1)
          }
          class sc {}
          class ic {}
          const rc = {factoryPathPrefix : "", factoryPathSuffix : ".ngfactory"};
          let oc = (() => {
            class t {
              constructor(t, e) { this._compiler = t, this._config = e || rc }
              load(t) { return this.loadAndCompile(t) }
              loadAndCompile(t) {
                let [e, s] = t.split("#");
                return void 0 === s && (s = "default"),
                       n("zn8P")(e)
                           .then(t => t[s])
                           .then(t => ac(t, e, s))
                           .then(t => this._compiler.compileModuleAsync(t))
              }
              loadFactory(t) {
                let [e, s] = t.split("#"), i = "NgFactory";
                return void 0 === s && (s = "default", i = ""),
                       n("zn8P")(this._config.factoryPathPrefix + e +
                                 this._config.factoryPathSuffix)
                           .then(t => t[s + i])
                           .then(t => ac(t, e, s))
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(Ll), Zt(ic, 8)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          function ac(t, e, n) {
            if (!t)
              throw new Error(`Cannot find '${n}' in '${e}'`);
            return t
          }
          const lc = Yl(null, "core",
                        [
                          {provide : wl, useValue : "unknown"},
                          {provide : Jl, deps : [ so ]},
                          {provide : ql, deps : []}, {provide : Sl, deps : []}
                        ]),
                cc = [
                  {
                    provide : ec,
                    useClass : ec,
                    deps : [ Fl, Sl, so, gs, oa, gl ]
                  },
                  {
                    provide : ja,
                    deps : [ Fl ],
                    useFactory : function(t) {
                      let e = [];
                      return t.onStable.subscribe(() => {
                        for (; e.length;)
                          e.pop()()
                      }),
                             function(t) { e.push(t) }
                    }
                  },
                  {provide : gl, useClass : gl, deps : [ [ new rt, ml ] ]},
                  {provide : Ll, useClass : Ll, deps : []}, _l, {
                    provide : ka,
                    useFactory : function() { return Ia },
                    deps : []
                  },
                  {
                    provide : Ta,
                    useFactory : function() { return Ra },
                    deps : []
                  },
                  {
                    provide : El,
                    useFactory : function(t) {
                      return Qa(t = t ||
                                    "undefined" != typeof $localize &&
                                        $localize.locale ||
                                    Wa),
                             t
                    },
                    deps : [ [ new it(El), new rt, new at ] ]
                  },
                  {provide : Cl, useValue : "USD"}
                ];
          let uc = (() => {
            class t {
              constructor(t) {}
            } return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t)(Zt(ec)) },
              providers : cc
            }),
            t
          })(),
              hc = null;
          function dc() { return hc }
          const pc = new Vt("DocumentToken");
          let fc = (() => {
            class t {} return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275prov =
                ht({factory : mc, token : t, providedIn : "platform"}),
            t
          })();
          function mc() { return Zt(yc) }
          const gc = new Vt("Location Initialized");
          let yc = (() => {
            class t extends fc {
              constructor(t) { super(), this._doc = t, this._init() }
              _init() {
                this.location = dc().getLocation(),
                this._history = dc().getHistory()
              }
              getBaseHrefFromDOM() { return dc().getBaseHref(this._doc) }
              onPopState(t) {
                dc().getGlobalEventTarget(this._doc, "window")
                    .addEventListener("popstate", t, !1)
              }
              onHashChange(t) {
                dc().getGlobalEventTarget(this._doc, "window")
                    .addEventListener("hashchange", t, !1)
              }
              get href() { return this.location.href }
              get protocol() { return this.location.protocol }
              get hostname() { return this.location.hostname }
              get port() { return this.location.port }
              get pathname() { return this.location.pathname }
              get search() { return this.location.search }
              get hash() { return this.location.hash }
              set pathname(t) { this.location.pathname = t }
              pushState(t, e, n) {
                _c() ? this._history.pushState(t, e, n) : this.location.hash = n
              }
              replaceState(t, e, n) {
                _c() ? this._history.replaceState(t, e, n)
                     : this.location.hash = n
              }
              forward() { this._history.forward() }
              back() { this._history.back() }
              getState() { return this._history.state }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(pc)) },
                            t.\u0275prov = ht({
                              factory : vc,
                              token : t,
                              providedIn : "platform"
                            }),
                            t
          })();
          function _c() { return !!window.history.pushState }
          function vc() { return new yc(Zt(pc)) }
          function bc(t, e) {
            if (0 == t.length)
              return e;
            if (0 == e.length)
              return t;
            let n = 0;
            return t.endsWith("/") && n++, e.startsWith("/") && n++,
                   2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
          }
          function wc(t) {
            const e = t.match(/#|\?|$/), n = e && e.index || t.length;
            return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
          }
          function xc(t) { return t && "?" !== t[0] ? "?" + t : t }
          let Sc = (() => {
            class t {} return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275prov = ht({factory : Ec, token : t, providedIn : "root"}),
            t
          })();
          function Ec(t) {
            const e = Zt(pc).location;
            return new kc(Zt(fc), e && e.origin || "")
          }
          const Cc = new Vt("appBaseHref");
          let kc = (() => {
            class t extends Sc {
              constructor(t, e) {
                if (super(), this._platformLocation = t,
                    null == e &&
                        (e = this._platformLocation.getBaseHrefFromDOM()),
                    null == e)
                  throw new Error(
                      "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                this._baseHref = e
              }
              onPopState(t) {
                this._platformLocation.onPopState(t),
                    this._platformLocation.onHashChange(t)
              }
              getBaseHref() { return this._baseHref }
              prepareExternalUrl(t) { return bc(this._baseHref, t) }
              path(t = !1) {
                const e = this._platformLocation.pathname +
                          xc(this._platformLocation.search),
                      n = this._platformLocation.hash;
                return n && t ? `${e}${n}` : e
              }
              pushState(t, e, n, s) {
                const i = this.prepareExternalUrl(n + xc(s));
                this._platformLocation.pushState(t, e, i)
              }
              replaceState(t, e, n, s) {
                const i = this.prepareExternalUrl(n + xc(s));
                this._platformLocation.replaceState(t, e, i)
              }
              forward() { this._platformLocation.forward() }
              back() { this._platformLocation.back() }
            } return t
                                .\u0275fac = function(
                                e) { return new (e || t)(Zt(fc), Zt(Cc, 8)) },
                            t.\u0275prov =
                                ht({token : t, factory : t.\u0275fac}),
                            t
          })(),
              Tc = (() => {
                class t extends
                    Sc {
                      constructor(t, e) {
                        super(), this._platformLocation = t,
                                 this._baseHref = "",
                                 null != e && (this._baseHref = e)
                      }
                      onPopState(t) {
                        this._platformLocation.onPopState(t),
                            this._platformLocation.onHashChange(t)
                      }
                      getBaseHref() { return this._baseHref }
                      path(t = !1) {
                        let e = this._platformLocation.hash;
                        return null == e && (e = "#"),
                               e.length > 0 ? e.substring(1) : e
                      }
                      prepareExternalUrl(t) {
                        const e = bc(this._baseHref, t);
                        return e.length > 0 ? "#" + e : e
                      }
                      pushState(t, e, n, s) {
                        let i = this.prepareExternalUrl(n + xc(s));
                        0 == i.length && (i = this._platformLocation.pathname),
                            this._platformLocation.pushState(t, e, i)
                      }
                      replaceState(t, e, n, s) {
                        let i = this.prepareExternalUrl(n + xc(s));
                        0 == i.length && (i = this._platformLocation.pathname),
                            this._platformLocation.replaceState(t, e, i)
                      }
                      forward() { this._platformLocation.forward() }
                      back() { this._platformLocation.back() }
                    } return t.\u0275fac =
                        function(e) { return new (e || t)(Zt(fc), Zt(Cc, 8)) },
                    t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                    t
              })(),
              Ac = (() => {
                class t {
                  constructor(t, e) {
                    this._subject = new tl, this._urlChangeListeners = [],
                    this._platformStrategy = t;
                    const n = this._platformStrategy.getBaseHref();
                    this._platformLocation = e, this._baseHref = wc(Rc(n)),
                    this._platformStrategy.onPopState(t => {this._subject.emit({
                                                        url : this.path(!0),
                                                        pop : !0,
                                                        state : t.state,
                                                        type : t.type
                                                      })})
                  }
                  path(t = !1) {
                    return this.normalize(this._platformStrategy.path(t))
                  }
                  getState() { return this._platformLocation.getState() }
                  isCurrentPathEqualTo(t, e = "") {
                    return this.path() == this.normalize(t + xc(e))
                  }
                  normalize(e) {
                    return t.stripTrailingSlash(function(t, e) {
                      return t && e.startsWith(t) ? e.substring(t.length) : e
                    }(this._baseHref, Rc(e)))
                  }
                  prepareExternalUrl(t) {
                    return t && "/" !== t[0] && (t = "/" + t),
                           this._platformStrategy.prepareExternalUrl(t)
                  }
                  go(t, e = "", n = null) {
                    this._platformStrategy.pushState(n, "", t, e),
                        this._notifyUrlChangeListeners(
                            this.prepareExternalUrl(t + xc(e)), n)
                  }
                  replaceState(t, e = "", n = null) {
                    this._platformStrategy.replaceState(n, "", t, e),
                        this._notifyUrlChangeListeners(
                            this.prepareExternalUrl(t + xc(e)), n)
                  }
                  forward() { this._platformStrategy.forward() }
                  back() { this._platformStrategy.back() }
                  onUrlChange(t) {
                    this._urlChangeListeners.push(t),
                        this._urlChangeSubscription ||
                            (this._urlChangeSubscription = this.subscribe(
                                 t => {this._notifyUrlChangeListeners(
                                     t.url, t.state)}))
                  }
                  _notifyUrlChangeListeners(t = "", e) {
                    this._urlChangeListeners.forEach(n => n(t, e))
                  }
                  subscribe(t, e, n) {
                    return this._subject.subscribe(
                        {next : t, error : e, complete : n})
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Sc), Zt(fc)) },
                t.normalizeQueryParams = xc,
                t.joinWithSlash = bc,
                t.stripTrailingSlash = wc,
                t.\u0275prov =
                    ht({factory : Ic, token : t, providedIn : "root"}),
                t
              })();
          function Ic() { return new Ac(Zt(Sc), Zt(fc)) }
          function Rc(t) { return t.replace(/\/index.html$/, "") }
          var Oc = function(t) {
            return t[t.Zero = 0] = "Zero", t[t.One = 1] = "One",
                              t[t.Two = 2] = "Two", t[t.Few = 3] = "Few",
                              t[t.Many = 4] = "Many", t[t.Other = 5] = "Other",
                              t
          }({});
          class Pc {}
          let Lc = (() => {
            class t extends Pc {
              constructor(t) { super(), this.locale = t }
              getPluralCategory(t, e) {
                switch (function(t) {
                  return function(t) {
                    const e = function(
                        t) { return t.toLowerCase().replace(/_/g, "-") }(t);
                    let n = $a(e);
                    if (n)
                      return n;
                    const s = e.split("-")[0];
                    if (n = $a(s), n)
                      return n;
                    if ("en" === s)
                      return Ua;
                    throw new Error(
                        `Missing locale data for the locale "${t}".`)
                  }(t)[qa.PluralCase]
                }(e || this.locale)(t)) {
                case Oc.Zero:
                  return "zero";
                case Oc.One:
                  return "one";
                case Oc.Two:
                  return "two";
                case Oc.Few:
                  return "few";
                case Oc.Many:
                  return "many";
                default:
                  return "other"
                }
              }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(El)) },
                            t.\u0275prov =
                                ht({token : t, factory : t.\u0275fac}),
                            t
          })(),
              Dc = (() => {
                class t {
                  constructor(t, e, n, s) {
                    this._iterableDiffers = t, this._keyValueDiffers = e,
                    this._ngEl = n, this._renderer = s,
                    this._iterableDiffer = null, this._keyValueDiffer = null,
                    this._initialClasses = [], this._rawClass = null
                  }
                  set klass(t) {
                    this._removeClasses(this._initialClasses),
                        this._initialClasses =
                            "string" == typeof t ? t.split(/\s+/) : [],
                        this._applyClasses(this._initialClasses),
                        this._applyClasses(this._rawClass)
                  }
                  set ngClass(t) {
                    this._removeClasses(this._rawClass),
                        this._applyClasses(this._initialClasses),
                        this._iterableDiffer = null,
                        this._keyValueDiffer = null,
                        this._rawClass =
                            "string" == typeof t ? t.split(/\s+/) : t,
                        this._rawClass &&
                            (go(this._rawClass) ? this._iterableDiffer =
                                                      this._iterableDiffers
                                                          .find(this._rawClass)
                                                          .create()
                                                : this._keyValueDiffer =
                                                      this._keyValueDiffers
                                                          .find(this._rawClass)
                                                          .create())
                  }
                  ngDoCheck() {
                    if (this._iterableDiffer) {
                      const t = this._iterableDiffer.diff(this._rawClass);
                      t && this._applyIterableChanges(t)
                    } else if (this._keyValueDiffer) {
                      const t = this._keyValueDiffer.diff(this._rawClass);
                      t && this._applyKeyValueChanges(t)
                    }
                  }
                  _applyKeyValueChanges(t) {
                    t.forEachAddedItem(
                        t => this._toggleClass(t.key, t.currentValue)),
                        t.forEachChangedItem(
                            t => this._toggleClass(t.key, t.currentValue)),
                        t.forEachRemovedItem(
                            t => {t.previousValue &&
                                  this._toggleClass(t.key, !1)})
                  }
                  _applyIterableChanges(t) {
                    t.forEachAddedItem(t => {
                      if ("string" != typeof t.item)
                        throw new Error(
                            "NgClass can only toggle CSS classes expressed as strings, got " +
                            wt(t.item));
                      this._toggleClass(t.item, !0)
                    }),
                        t.forEachRemovedItem(t => this._toggleClass(t.item, !1))
                  }
                  _applyClasses(t) {
                    t && (Array.isArray(t) || t instanceof Set
                              ? t.forEach(t => this._toggleClass(t, !0))
                              : Object.keys(t).forEach(
                                    e => this._toggleClass(e, !!t[e])))
                  }
                  _removeClasses(t) {
                    t && (Array.isArray(t) || t instanceof Set
                              ? t.forEach(t => this._toggleClass(t, !1))
                              : Object.keys(t).forEach(
                                    t => this._toggleClass(t, !1)))
                  }
                  _toggleClass(t, e) {
                    (t = t.trim()) &&
                        t.split(/\s+/g).forEach(
                            t => {e ? this._renderer.addClass(
                                          this._ngEl.nativeElement, t)
                                    : this._renderer.removeClass(
                                          this._ngEl.nativeElement, t)})
                  }
                } return t
                    .\u0275fac = function(
                    e) { return new (e || t)(So(ka), So(Ta), So(aa), So(ha)) },
                t.\u0275dir = we({
                  type : t,
                  selectors : [ [ "", "ngClass", "" ] ],
                  inputs : {klass : [ "class", "klass" ], ngClass : "ngClass"}
                }),
                t
              })();
          class Nc {
            constructor(t, e, n, s) {
              this.$implicit = t, this.ngForOf = e, this.index = n,
              this.count = s
            }
            get first() { return 0 === this.index }
            get last() { return this.index === this.count - 1 }
            get even() { return this.index % 2 == 0 }
            get odd() { return !this.even }
          }
          let Fc = (() => {
            class t {
              constructor(t, e, n) {
                this._viewContainer = t, this._template = e, this._differs = n,
                this._ngForOf = null, this._ngForOfDirty = !0,
                this._differ = null
              }
              set ngForOf(t) { this._ngForOf = t, this._ngForOfDirty = !0 }
              set ngForTrackBy(t) {
                As() && null != t && "function" != typeof t && console &&
                    console.warn &&
                    console.warn(`trackBy must be a function, but received ${
                        JSON.stringify(
                            t)}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`),
                    this._trackByFn = t
              }
              get ngForTrackBy() { return this._trackByFn }
              set ngForTemplate(t) { t && (this._template = t) }
              ngDoCheck() {
                if (this._ngForOfDirty) {
                  this._ngForOfDirty = !1;
                  const n = this._ngForOf;
                  if (!this._differ && n)
                    try {
                      this._differ =
                          this._differs.find(n).create(this.ngForTrackBy)
                    } catch (e) {
                      throw new Error(`Cannot find a differ supporting object '${
                          n}' of type '${
                          t = n,
                          t.name ||
                              typeof
                                  t}'. NgFor only supports binding to Iterables such as Arrays.`)
                    }
                }
                var t;
                if (this._differ) {
                  const t = this._differ.diff(this._ngForOf);
                  t && this._applyChanges(t)
                }
              }
              _applyChanges(t) {
                const e = [];
                t.forEachOperation((t, n, s) => {
                  if (null == t.previousIndex) {
                    const n = this._viewContainer.createEmbeddedView(
                        this._template, new Nc(null, this._ngForOf, -1, -1),
                        null === s ? void 0 : s),
                          i = new Mc(t, n);
                    e.push(i)
                  } else if (null == s)
                    this._viewContainer.remove(null === n ? void 0 : n);
                  else if (null !== n) {
                    const i = this._viewContainer.get(n);
                    this._viewContainer.move(i, s);
                    const r = new Mc(t, i);
                    e.push(r)
                  }
                });
                for (let n = 0; n < e.length; n++)
                  this._perViewChange(e[n].view, e[n].record);
                for (let n = 0, s = this._viewContainer.length; n < s; n++) {
                  const t = this._viewContainer.get(n);
                  t.context.index = n, t.context.count = s,
                  t.context.ngForOf = this._ngForOf
                }
                t.forEachIdentityChange(
                    t => {this._viewContainer.get(t.currentIndex)
                              .context.$implicit = t.item})
              }
              _perViewChange(t, e) { t.context.$implicit = e.item }
              static ngTemplateContextGuard(t, e) { return !0 }
            } return t.\u0275fac =
                function(e) { return new (e || t)(So(La), So(Oa), So(ka)) },
            t.\u0275dir = we({
              type : t,
              selectors : [ [ "", "ngFor", "", "ngForOf", "" ] ],
              inputs : {
                ngForOf : "ngForOf",
                ngForTrackBy : "ngForTrackBy",
                ngForTemplate : "ngForTemplate"
              }
            }),
            t
          })();
          class Mc {
            constructor(t, e) { this.record = t, this.view = e }
          }
          let jc = (() => {
            class t {
              constructor(t, e) {
                this._viewContainer = t, this._context = new Vc,
                this._thenTemplateRef = null, this._elseTemplateRef = null,
                this._thenViewRef = null, this._elseViewRef = null,
                this._thenTemplateRef = e
              }
              set ngIf(t) {
                this._context.$implicit = this._context.ngIf = t,
                this._updateView()
              }
              set ngIfThen(t) {
                Bc("ngIfThen", t), this._thenTemplateRef = t,
                                   this._thenViewRef = null, this._updateView()
              }
              set ngIfElse(t) {
                Bc("ngIfElse", t), this._elseTemplateRef = t,
                                   this._elseViewRef = null, this._updateView()
              }
              _updateView() {
                this._context.$implicit
                    ? this._thenViewRef ||
                          (this._viewContainer.clear(),
                           this._elseViewRef = null,
                           this._thenTemplateRef &&
                               (this._thenViewRef =
                                    this._viewContainer.createEmbeddedView(
                                        this._thenTemplateRef, this._context)))
                    : this._elseViewRef ||
                          (this._viewContainer.clear(),
                           this._thenViewRef = null,
                           this._elseTemplateRef &&
                               (this._elseViewRef =
                                    this._viewContainer.createEmbeddedView(
                                        this._elseTemplateRef, this._context)))
              }
              static ngTemplateContextGuard(t, e) { return !0 }
            } return t.\u0275fac =
                function(e) { return new (e || t)(So(La), So(Oa)) },
            t.\u0275dir = we({
              type : t,
              selectors : [ [ "", "ngIf", "" ] ],
              inputs :
                  {ngIf : "ngIf", ngIfThen : "ngIfThen", ngIfElse : "ngIfElse"}
            }),
            t
          })();
          class Vc {
            constructor() { this.$implicit = null, this.ngIf = null }
          }
          function Bc(t, e) {
            if (e && !e.createEmbeddedView)
              throw new Error(
                  `${t} must be a TemplateRef, but received '${wt(e)}'.`)
          }
          let Hc = (() => {
            class t {
              constructor(t, e, n) {
                this._ngEl = t, this._differs = e, this._renderer = n,
                this._ngStyle = null, this._differ = null
              }
              set ngStyle(t) {
                this._ngStyle = t,
                !this._differ && t &&
                    (this._differ = this._differs.find(t).create())
              }
              ngDoCheck() {
                if (this._differ) {
                  const t = this._differ.diff(this._ngStyle);
                  t && this._applyChanges(t)
                }
              }
              _setStyle(t, e) {
                const [n, s] = t.split(".");
                null != (e = null != e && s ? `${e}${s}` : e)
                    ? this._renderer.setStyle(this._ngEl.nativeElement, n, e)
                    : this._renderer.removeStyle(this._ngEl.nativeElement, n)
              }
              _applyChanges(t) {
                t.forEachRemovedItem(t => this._setStyle(t.key, null)),
                    t.forEachAddedItem(
                        t => this._setStyle(t.key, t.currentValue)),
                    t.forEachChangedItem(
                        t => this._setStyle(t.key, t.currentValue))
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(So(aa), So(Ta), So(ha)) },
            t.\u0275dir = we({
              type : t,
              selectors : [ [ "", "ngStyle", "" ] ],
              inputs : {ngStyle : "ngStyle"}
            }),
            t
          })();
          class Uc {
            createSubscription(t, e) {
              return t.subscribe({next : e, error : t => { throw t }})
            }
            dispose(t) { t.unsubscribe() }
            onDestroy(t) { t.unsubscribe() }
          }
          class zc {
            createSubscription(t, e) { return t.then(e, t => {throw t}) }
            dispose(t) {}
            onDestroy(t) {}
          }
          const $c = new zc, qc = new Uc;
          let Wc = (() => {
            class t {
              constructor(t) {
                this._ref = t, this._latestValue = null,
                this._subscription = null, this._obj = null,
                this._strategy = null
              }
              ngOnDestroy() { this._subscription && this._dispose() }
              transform(t) {
                return this._obj ? t !== this._obj
                                       ? (this._dispose(), this.transform(t))
                                       : this._latestValue
                                 : (t && this._subscribe(t), this._latestValue)
              }
              _subscribe(t) {
                this._obj = t, this._strategy = this._selectStrategy(t),
                this._subscription = this._strategy.createSubscription(
                    t, e => this._updateLatestValue(t, e))
              }
              _selectStrategy(e) {
                if (Ro(e))
                  return $c;
                if (Oo(e))
                  return qc;
                throw Error(`InvalidPipeArgument: '${e}' for pipe '${wt(t)}'`)
              }
              _dispose() {
                this._strategy.dispose(this._subscription),
                    this._latestValue = null, this._subscription = null,
                    this._obj = null
              }
              _updateLatestValue(t, e) {
                t === this._obj &&
                    (this._latestValue = e, this._ref.markForCheck())
              }
            } return t.\u0275fac =
                function(e) {
                  return new (e || t)(function(t = lt.Default) {
                    const e = Vr(!0);
                    if (null != e || t & lt.Optional)
                      return e;
                    throw new Error("No provider for ChangeDetectorRef!")
                  }())
                },
            t.\u0275pipe = xe({name : "async", type : t, pure : !1}),
            t
          })(),
              Gc = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  providers : [ {provide : Pc, useClass : Lc} ]
                }),
                t
              })();
          function Qc(t) { return "browser" === t }
          function Kc(t) { return "server" === t }
          let Zc = (() => {
            class t {} return t.\u0275prov = ht({
              token : t,
              providedIn : "root",
              factory : () => new Yc(Zt(pc), window, Zt(gs))
            }),
            t
          })();
          class Yc {
            constructor(t, e, n) {
              this.document = t, this.window = e, this.errorHandler = n,
              this.offset = () => [0, 0]
            }
            setOffset(t) { this.offset = Array.isArray(t) ? () => t : t }
            getScrollPosition() {
              return this.supportsScrolling()
                         ? [ this.window.scrollX, this.window.scrollY ]
                         : [ 0, 0 ]
            }
            scrollToPosition(t) {
              this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
            }
            scrollToAnchor(t) {
              if (this.supportsScrolling()) {
                const e = this.document.getElementById(t) ||
                          this.document.getElementsByName(t)[0];
                e && this.scrollToElement(e)
              }
            }
            setHistoryScrollRestoration(t) {
              if (this.supportScrollRestoration()) {
                const e = this.window.history;
                e && e.scrollRestoration && (e.scrollRestoration = t)
              }
            }
            scrollToElement(t) {
              const e = t.getBoundingClientRect(),
                    n = e.left + this.window.pageXOffset,
                    s = e.top + this.window.pageYOffset, i = this.offset();
              this.window.scrollTo(n - i[0], s - i[1])
            }
            supportScrollRestoration() {
              try {
                if (!this.window || !this.window.scrollTo)
                  return !1;
                const t = Xc(this.window.history) ||
                          Xc(Object.getPrototypeOf(this.window.history));
                return !(!t || !t.writable && !t.set)
              } catch (t) {
                return !1
              }
            }
            supportsScrolling() {
              try {
                return !!this.window.scrollTo
              } catch (t) {
                return !1
              }
            }
          }
          function Xc(t) {
            return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
          }
          class Jc extends class extends class {}
          {constructor() { super() } supportsDOMEvents() { return !0 }} {
            static makeCurrent() {
              var t;
              t = new Jc, hc || (hc = t)
            }
            getProperty(t, e) { return t[e] }
            log(t) {
              window.console && window.console.log && window.console.log(t)
            }
            logGroup(t) {
              window.console && window.console.group && window.console.group(t)
            }
            logGroupEnd() {
              window.console && window.console.groupEnd &&
                  window.console.groupEnd()
            }
            onAndCancel(t, e, n) {
              return t.addEventListener(e, n, !1),
                     () => { t.removeEventListener(e, n, !1) }
            }
            dispatchEvent(t, e) { t.dispatchEvent(e) }
            remove(t) { return t.parentNode && t.parentNode.removeChild(t), t }
            getValue(t) { return t.value }
            createElement(t, e) {
              return (e = e || this.getDefaultDocument()).createElement(t)
            }
            createHtmlDocument() {
              return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() { return document }
            isElementNode(t) { return t.nodeType === Node.ELEMENT_NODE }
            isShadowRoot(t) { return t instanceof DocumentFragment }
            getGlobalEventTarget(t, e) {
              return "window" === e
                         ? window
                         : "document" === e ? t : "body" === e ? t.body : null
            }
            getHistory() { return window.history }
            getLocation() { return window.location }
            getBaseHref(t) {
              const e = eu || (eu = document.querySelector("base"), eu)
                            ? eu.getAttribute("href")
                            : null;
              return null == e
                         ? null
                         : (n = e, tu || (tu = document.createElement("a")),
                            tu.setAttribute("href", n),
                            "/" === tu.pathname.charAt(0) ? tu.pathname
                                                          : "/" + tu.pathname);
              var n
            }
            resetBaseElement() { eu = null }
            getUserAgent() { return window.navigator.userAgent }
            performanceNow() {
              return window.performance && window.performance.now
                         ? window.performance.now()
                         : (new Date).getTime()
            }
            supportsCookies() { return !0 }
            getCookie(t) {
              return function(t, e) {
                e = encodeURIComponent(e);
                for (const n of t.split(";")) {
                  const t = n.indexOf("="),
                        [ s, i ] = -1 == t ? [ n, "" ]
                                           : [ n.slice(0, t), n.slice(t + 1) ];
                  if (s.trim() === e)
                    return decodeURIComponent(i)
                }
                return null
              }(document.cookie, t)
            }
          }
          let tu, eu = null;
          const nu = new Vt("TRANSITION_ID"),
                su = [ {
                  provide : ml,
                  useFactory : function(t, e, n) {
                    return () => {
                      n.get(gl).donePromise.then(() => {
                        const n = dc();
                        Array.prototype.slice
                            .apply(e.querySelectorAll("style[ng-transition]"))
                            .filter(e => e.getAttribute("ng-transition") === t)
                            .forEach(t => n.remove(t))
                      })
                    }
                  },
                  deps : [ nu, pc, so ],
                  multi : !0
                } ];
          class iu {
            static init() {
              var t;
              t = new iu, Ql = t
            }
            addToWindow(t) {
              Ot.getAngularTestability =
                  (e, n = !0) => {
                    const s = t.findTestabilityInTree(e, n);
                    if (null == s)
                      throw new Error(
                          "Could not find testability for element.");
                    return s
                  },
              Ot.getAllAngularTestabilities = () => t.getAllTestabilities(),
              Ot.getAllAngularRootElements = () => t.getAllRootElements(),
              Ot.frameworkStabilizers || (Ot.frameworkStabilizers = []),
              Ot.frameworkStabilizers.push(t => {
                const e = Ot.getAllAngularTestabilities();
                let n = e.length, s = !1;
                const i = function(e) { s = s || e, n--, 0 == n && t(s) };
                e.forEach((function(t) { t.whenStable(i) }))
              })
            }
            findTestabilityInTree(t, e, n) {
              if (null == e)
                return null;
              const s = t.getTestability(e);
              return null != s
                         ? s
                         : n ? dc().isShadowRoot(e)
                                   ? this.findTestabilityInTree(t, e.host, !0)
                                   : this.findTestabilityInTree(
                                         t, e.parentElement, !0)
                             : null
            }
          }
          const ru = new Vt("EventManagerPlugins");
          let ou = (() => {
            class t {
              constructor(t, e) {
                this._zone = e, this._eventNameToPlugin = new Map,
                t.forEach(t => t.manager = this),
                this._plugins = t.slice().reverse()
              }
              addEventListener(t, e, n) {
                return this._findPluginFor(e).addEventListener(t, e, n)
              }
              addGlobalEventListener(t, e, n) {
                return this._findPluginFor(e).addGlobalEventListener(t, e, n)
              }
              getZone() { return this._zone }
              _findPluginFor(t) {
                const e = this._eventNameToPlugin.get(t);
                if (e)
                  return e;
                const n = this._plugins;
                for (let s = 0; s < n.length; s++) {
                  const e = n[s];
                  if (e.supports(t))
                    return this._eventNameToPlugin.set(t, e), e
                }
                throw new Error("No event manager plugin found for event " + t)
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(ru), Zt(Fl)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          class au {
            constructor(t) { this._doc = t }
            addGlobalEventListener(t, e, n) {
              const s = dc().getGlobalEventTarget(this._doc, t);
              if (!s)
                throw new Error(`Unsupported event target ${s} for event ${e}`);
              return this.addEventListener(s, e, n)
            }
          }
          let lu = (() => {
            class t {
              constructor() { this._stylesSet = new Set }
              addStyles(t) {
                const e = new Set;
                t.forEach(t => {this._stylesSet.has(t) ||
                                (this._stylesSet.add(t), e.add(t))}),
                    this.onStylesAdded(e)
              }
              onStylesAdded(t) {}
              getAllStyles() { return Array.from(this._stylesSet) }
            } return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })(),
              cu = (() => {
                class t extends lu {
                  constructor(t) {
                    super(), this._doc = t, this._hostNodes = new Set,
                             this._styleNodes = new Set,
                             this._hostNodes.add(t.head)
                  }
                  _addStylesToHost(t, e) {
                    t.forEach(t => {
                      const n = this._doc.createElement("style");
                      n.textContent = t, this._styleNodes.add(e.appendChild(n))
                    })
                  }
                  addHost(t) {
                    this._addStylesToHost(this._stylesSet, t),
                        this._hostNodes.add(t)
                  }
                  removeHost(t) { this._hostNodes.delete(t) }
                  onStylesAdded(t) {
                    this._hostNodes.forEach(e => this._addStylesToHost(t, e))
                  }
                  ngOnDestroy() {
                    this._styleNodes.forEach(t => dc().remove(t))
                  }
                } return t.\u0275fac =
                                    function(e) { return new (e || t)(Zt(pc)) },
                                t.\u0275prov =
                                    ht({token : t, factory : t.\u0275fac}),
                                t
              })();
          const uu = {
            svg : "http://www.w3.org/2000/svg",
            xhtml : "http://www.w3.org/1999/xhtml",
            xlink : "http://www.w3.org/1999/xlink",
            xml : "http://www.w3.org/XML/1998/namespace",
            xmlns : "http://www.w3.org/2000/xmlns/"
          },
                hu = /%COMP%/g;
          function du(t, e, n) {
            for (let s = 0; s < e.length; s++) {
              let i = e[s];
              Array.isArray(i) ? du(t, i, n) : (i = i.replace(hu, t), n.push(i))
            }
            return n
          }
          function pu(t) {
            return e => {
              if ("__ngUnwrap__" === e)
                return t;
              !1 === t(e) && (e.preventDefault(), e.returnValue = !1)
            }
          }
          let fu = (() => {
            class t {
              constructor(t, e, n) {
                this.eventManager = t, this.sharedStylesHost = e,
                this.appId = n, this.rendererByCompId = new Map,
                this.defaultRenderer = new mu(t)
              }
              createRenderer(t, e) {
                if (!t || !e)
                  return this.defaultRenderer;
                switch (e.encapsulation) {
                case he.Emulated: {
                  let n = this.rendererByCompId.get(e.id);
                  return n || (n = new gu(this.eventManager,
                                          this.sharedStylesHost, e, this.appId),
                               this.rendererByCompId.set(e.id, n)),
                         n.applyToHost(t), n
                }
                case he.Native:
                case he.ShadowDom:
                  return new yu(this.eventManager, this.sharedStylesHost, t, e);
                default:
                  if (!this.rendererByCompId.has(e.id)) {
                    const t = du(e.id, e.styles, []);
                    this.sharedStylesHost.addStyles(t),
                        this.rendererByCompId.set(e.id, this.defaultRenderer)
                  }
                  return this.defaultRenderer
                }
              }
              begin() {}
              end() {}
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(ou), Zt(cu), Zt(yl)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          class mu {
            constructor(t) {
              this.eventManager = t, this.data = Object.create(null)
            }
            destroy() {}
            createElement(t, e) {
              return e ? document.createElementNS(uu[e] || e, t)
                       : document.createElement(t)
            }
            createComment(t) { return document.createComment(t) }
            createText(t) { return document.createTextNode(t) }
            appendChild(t, e) { t.appendChild(e) }
            insertBefore(t, e, n) { t && t.insertBefore(e, n) }
            removeChild(t, e) { t && t.removeChild(e) }
            selectRootElement(t, e) {
              let n = "string" == typeof t ? document.querySelector(t) : t;
              if (!n)
                throw new Error(
                    `The selector "${t}" did not match any elements`);
              return e || (n.textContent = ""), n
            }
            parentNode(t) { return t.parentNode }
            nextSibling(t) { return t.nextSibling }
            setAttribute(t, e, n, s) {
              if (s) {
                e = s + ":" + e;
                const i = uu[s];
                i ? t.setAttributeNS(i, e, n) : t.setAttribute(e, n)
              } else
                t.setAttribute(e, n)
            }
            removeAttribute(t, e, n) {
              if (n) {
                const s = uu[n];
                s ? t.removeAttributeNS(s, e) : t.removeAttribute(`${n}:${e}`)
              } else
                t.removeAttribute(e)
            }
            addClass(t, e) { t.classList.add(e) }
            removeClass(t, e) { t.classList.remove(e) }
            setStyle(t, e, n, s) {
              s&ua.DashCase ? t.style.setProperty(
                                  e, n, s & ua.Important ? "important" : "")
                            : t.style[e] = n
            }
            removeStyle(t, e, n) {
              n&ua.DashCase ? t.style.removeProperty(e) : t.style[e] = ""
            }
            setProperty(t, e, n) { t[e] = n }
            setValue(t, e) { t.nodeValue = e }
            listen(t, e, n) {
              return "string" == typeof t
                         ? this.eventManager.addGlobalEventListener(t, e, pu(n))
                         : this.eventManager.addEventListener(t, e, pu(n))
            }
          }
          class gu extends mu {
            constructor(t, e, n, s) {
              super(t), this.component = n;
              const i = du(s + "-" + n.id, n.styles, []);
              e.addStyles(i),
                  this.contentAttr =
                      "_ngcontent-%COMP%".replace(hu, s + "-" + n.id),
                  this.hostAttr = "_nghost-%COMP%".replace(hu, s + "-" + n.id)
            }
            applyToHost(t) { super.setAttribute(t, this.hostAttr, "") }
            createElement(t, e) {
              const n = super.createElement(t, e);
              return super.setAttribute(n, this.contentAttr, ""), n
            }
          }
          class yu extends mu {
            constructor(t, e, n, s) {
              super(t), this.sharedStylesHost = e, this.hostEl = n,
                        this.component = s,
                        this.shadowRoot = s.encapsulation === he.ShadowDom
                                              ? n.attachShadow({mode : "open"})
                                              : n.createShadowRoot(),
                        this.sharedStylesHost.addHost(this.shadowRoot);
              const i = du(s.id, s.styles, []);
              for (let r = 0; r < i.length; r++) {
                const t = document.createElement("style");
                t.textContent = i[r], this.shadowRoot.appendChild(t)
              }
            }
            nodeOrShadowRoot(t) {
              return t === this.hostEl ? this.shadowRoot : t
            }
            destroy() { this.sharedStylesHost.removeHost(this.shadowRoot) }
            appendChild(t, e) {
              return super.appendChild(this.nodeOrShadowRoot(t), e)
            }
            insertBefore(t, e, n) {
              return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
            }
            removeChild(t, e) {
              return super.removeChild(this.nodeOrShadowRoot(t), e)
            }
            parentNode(t) {
              return this.nodeOrShadowRoot(
                  super.parentNode(this.nodeOrShadowRoot(t)))
            }
          }
          let _u = (() => {
            class t extends au {
              constructor(t) { super(t) }
              supports(t) { return !0 }
              addEventListener(t, e, n) {
                return t.addEventListener(e, n, !1),
                       () => this.removeEventListener(t, e, n)
              }
              removeEventListener(t, e, n) {
                return t.removeEventListener(e, n)
              }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(pc)) },
                            t.\u0275prov =
                                ht({token : t, factory : t.\u0275fac}),
                            t
          })();
          const vu = [ "alt", "control", "meta", "shift" ], bu = {
            "\b" : "Backspace",
            "\t" : "Tab",
            "\x7f" : "Delete",
            "\x1b" : "Escape",
            Del : "Delete",
            Esc : "Escape",
            Left : "ArrowLeft",
            Right : "ArrowRight",
            Up : "ArrowUp",
            Down : "ArrowDown",
            Menu : "ContextMenu",
            Scroll : "ScrollLock",
            Win : "OS"
          },
                wu = {
                  A : "1",
                  B : "2",
                  C : "3",
                  D : "4",
                  E : "5",
                  F : "6",
                  G : "7",
                  H : "8",
                  I : "9",
                  J : "*",
                  K : "+",
                  M : "-",
                  N : ".",
                  O : "/",
                  "`" : "0",
                  "\x90" : "NumLock"
                },
                xu = {
                  alt : t => t.altKey,
                  control : t => t.ctrlKey,
                  meta : t => t.metaKey,
                  shift : t => t.shiftKey
                };
          let Su = (() => {
            class t extends au {
              constructor(t) { super(t) }
              supports(e) { return null != t.parseEventName(e) }
              addEventListener(e, n, s) {
                const i = t.parseEventName(n),
                      r = t.eventCallback(i.fullKey, s, this.manager.getZone());
                return this.manager.getZone().runOutsideAngular(
                    () => dc().onAndCancel(e, i.domEventName, r))
              }
              static parseEventName(e) {
                const n = e.toLowerCase().split("."), s = n.shift();
                if (0 === n.length || "keydown" !== s && "keyup" !== s)
                  return null;
                const i = t._normalizeKey(n.pop());
                let r = "";
                if (vu.forEach(t => {
                      const e = n.indexOf(t);
                      e > -1 && (n.splice(e, 1), r += t + ".")
                    }),
                    r += i, 0 != n.length || 0 === i.length)
                  return null;
                const o = {};
                return o.domEventName = s, o.fullKey = r, o
              }
              static getEventFullKey(t) {
                let e = "", n = function(t) {
                  let e = t.key;
                  if (null == e) {
                    if (e = t.keyIdentifier, null == e)
                      return "Unidentified";
                    e.startsWith("U+") &&
                        (e = String.fromCharCode(parseInt(e.substring(2), 16)),
                         3 === t.location && wu.hasOwnProperty(e) &&
                             (e = wu[e]))
                  }
                  return bu[e] || e
                }(t);
                return n = n.toLowerCase(),
                       " " === n ? n = "space" : "." === n && (n = "dot"),
                       vu.forEach(
                           s => {s != n && (0, xu[s])(t) && (e += s + ".")}),
                       e += n, e
              }
              static eventCallback(e, n, s) {
                return i => {
                  t.getEventFullKey(i) === e && s.runGuarded(() => n(i))
                }
              }
              static _normalizeKey(t) {
                switch (t) {
                case "esc":
                  return "escape";
                default:
                  return t
                }
              }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(pc)) },
                            t.\u0275prov =
                                ht({token : t, factory : t.\u0275fac}),
                            t
          })(),
              Eu = (() => {
                class t {} return t.\u0275fac = function(
                    e) { return new (e || t) },
                t.\u0275prov = ht({
                  factory : function() { return Zt(Cu) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })(),
              Cu = (() => {
                class t extends Eu {
                  constructor(t) { super(), this._doc = t }
                  sanitize(t, e) {
                    if (null == e)
                      return null;
                    switch (t) {
                    case Ys.NONE:
                      return e;
                    case Ys.HTML:
                      return Es(e, "HTML") ? Ss(e) : function(t, e) {
                        let n = null;
                        try {
                          Ks = Ks || function(t) {
                            return function() {
                              try {
                                return !!(new window.DOMParser)
                                             .parseFromString("", "text/html")
                              } catch (t) {
                                return !1
                              }
                            }()
                                       ? new Is
                                       : new Rs(t)
                          }(t);
                          let s = e ? String(e) : "";
                          n = Ks.getInertBodyElement(s);
                          let i = 5, r = s;
                          do {
                            if (0 === i)
                              throw new Error(
                                  "Failed to sanitize html because the input is unstable");
                            i--, s = r, r = n.innerHTML,
                                 n = Ks.getInertBodyElement(s)
                          } while (s !== r);
                          const o = new qs, a = o.sanitizeChildren(Zs(n) || n);
                          return As() && o.sanitizedSomething &&
                                     console.warn(
                                         "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"),
                                 a
                        } finally {
                          if (n) {
                            const t = Zs(n) || n;
                            for (; t.firstChild;)
                              t.removeChild(t.firstChild)
                          }
                        }
                      }(this._doc, String(e));
                    case Ys.STYLE:
                      return Es(e, "Style") ? Ss(e) : e;
                    case Ys.SCRIPT:
                      if (Es(e, "Script"))
                        return Ss(e);
                      throw new Error("unsafe value used in a script context");
                    case Ys.URL:
                      return Cs(e), Es(e, "URL") ? Ss(e) : Ls(String(e));
                    case Ys.RESOURCE_URL:
                      if (Es(e, "ResourceURL"))
                        return Ss(e);
                      throw new Error(
                          "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");
                    default:
                      throw new Error(`Unexpected SecurityContext ${
                          t} (see http://g.co/ng/security#xss)`)
                    }
                  }
                  bypassSecurityTrustHtml(t) { return new _s(t) }
                  bypassSecurityTrustStyle(t) { return new vs(t) }
                  bypassSecurityTrustScript(t) { return new bs(t) }
                  bypassSecurityTrustUrl(t) { return new ws(t) }
                  bypassSecurityTrustResourceUrl(t) { return new xs(t) }
                } return t.\u0275fac =
                                    function(e) { return new (e || t)(Zt(pc)) },
                                t.\u0275prov = ht({
                                  factory : function() {
                                    return t = Zt(Bt), new Cu(t.get(pc));
                                    var t
                                  },
                                  token : t,
                                  providedIn : "root"
                                }),
                                t
              })();
          const ku =
              Yl(lc, "browser",
                 [
                   {provide : wl, useValue : "browser"}, {
                     provide : bl,
                     useValue : function() { Jc.makeCurrent(), iu.init() },
                     multi : !0
                   },
                   {
                     provide : pc,
                     useFactory : function() {
                       return function(t) { He = t }(document), document
                     },
                     deps : []
                   }
                 ]),
                Tu = [
                  [], {provide : zr, useValue : "root"}, {
                    provide : gs,
                    useFactory : function() { return new gs },
                    deps : []
                  },
                  {
                    provide : ru,
                    useClass : _u,
                    multi : !0,
                    deps : [ pc, Fl, wl ]
                  },
                  {provide : ru, useClass : Su, multi : !0, deps : [ pc ]}, [],
                  {provide : fu, useClass : fu, deps : [ ou, cu, yl ]},
                  {provide : ca, useExisting : fu},
                  {provide : lu, useExisting : cu},
                  {provide : cu, useClass : cu, deps : [ pc ]},
                  {provide : $l, useClass : $l, deps : [ Fl ]},
                  {provide : ou, useClass : ou, deps : [ ru, Fl ]}, []
                ];
          let Au = (() => {
            class t {
              constructor(t) {
                if (t)
                  throw new Error(
                      "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
              }
              static withServerTransition(e) {
                return {
                  ngModule: t, providers: [
                    {provide : yl, useValue : e.appId},
                    {provide : nu, useExisting : yl}, su
                  ]
                }
              }
            } return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t)(Zt(t, 12)) },
              providers : Tu,
              imports : [ Gc, uc ]
            }),
            t
          })();
          function Iu(...t) {
            let e = t[t.length - 1];
            return C(e) ? (t.pop(), N(t, e)) : $(t)
          }
          "undefined" != typeof window && window;
          class Ru extends S {
            constructor(t) { super(), this._value = t }
            get value() { return this.getValue() }
            _subscribe(t) {
              const e = super._subscribe(t);
              return e && !e.closed && t.next(this._value), e
            }
            getValue() {
              if (this.hasError)
                throw this.thrownError;
              if (this.closed)
                throw new b;
              return this._value
            }
            next(t) { super.next(this._value = t) }
          }
          class Ou extends f {
            notifyNext(t, e, n, s, i) { this.destination.next(e) }
            notifyError(t, e) { this.destination.error(t) }
            notifyComplete(t) { this.destination.complete() }
          }
          class Pu extends f {
            constructor(t, e, n) {
              super(), this.parent = t, this.outerValue = e,
                       this.outerIndex = n, this.index = 0
            }
            _next(t) {
              this.parent.notifyNext(this.outerValue, t, this.outerIndex,
                                     this.index++, this)
            }
            _error(t) { this.parent.notifyError(t, this), this.unsubscribe() }
            _complete() { this.parent.notifyComplete(this), this.unsubscribe() }
          }
          function Lu(t, e, n, s, i = new Pu(t, n, s)) {
            if (!i.closed)
              return e instanceof _ ? e.subscribe(i) : D(e)(i)
          }
          const Du = {};
          function Nu(...t) {
            let e = void 0, n = void 0;
            return C(t[t.length - 1]) && (n = t.pop()),
                   "function" == typeof t[t.length - 1] && (e = t.pop()),
                   1 === t.length && l(t[0]) && (t = t[0]),
                   $(t, n).lift(new Fu(e))
          }
          class Fu {
            constructor(t) { this.resultSelector = t }
            call(t, e) { return e.subscribe(new Mu(t, this.resultSelector)) }
          }
          class Mu extends Ou {
            constructor(t, e) {
              super(t), this.resultSelector = e, this.active = 0,
                        this.values = [], this.observables = []
            }
            _next(t) { this.values.push(Du), this.observables.push(t) }
            _complete() {
              const t = this.observables, e = t.length;
              if (0 === e)
                this.destination.complete();
              else {
                this.active = e, this.toRespond = e;
                for (let n = 0; n < e; n++)
                  this.add(Lu(this, t[n], void 0, n))
              }
            }
            notifyComplete(t) {
              0 == (this.active -= 1) && this.destination.complete()
            }
            notifyNext(t, e, n) {
              const s = this.values,
                    i = this.toRespond
                            ? s[n] === Du ? --this.toRespond : this.toRespond
                            : 0;
              s[n] = e, 0 === i && (this.resultSelector
                                        ? this._tryResultSelector(s)
                                        : this.destination.next(s.slice()))
            }
            _tryResultSelector(t) {
              let e;
              try {
                e = this.resultSelector.apply(this, t)
              } catch (n) {
                return void this.destination.error(n)
              }
              this.destination.next(e)
            }
          }
          const ju = (() => {
            function t() {
              return Error.call(this), this.message = "no elements in sequence",
                                       this.name = "EmptyError", this
            } return t.prototype = Object.create(Error.prototype),
            t
          })(),
                Vu = new _(t => t.complete());
          function Bu(t) {
            return t ? function(t) {
              return new _(e => t.schedule(() => e.complete()))
            }(t) : Vu
          }
          function Hu(t) {
            return new _(e => {
              let n;
              try {
                n = t()
              } catch (s) {
                return void e.error(s)
              }
              return (n ? F(n) : Bu()).subscribe(e)
            })
          }
          function Uu() { return z(1) }
          function zu(t, e) {
            return function(n) { return n.lift(new $u(t, e)) }
          }
          class $u {
            constructor(t, e) { this.predicate = t, this.thisArg = e }
            call(t, e) {
              return e.subscribe(new qu(t, this.predicate, this.thisArg))
            }
          }
          class qu extends f {
            constructor(t, e, n) {
              super(t), this.predicate = e, this.thisArg = n, this.count = 0
            }
            _next(t) {
              let e;
              try {
                e = this.predicate.call(this.thisArg, t, this.count++)
              } catch (n) {
                return void this.destination.error(n)
              }
              e && this.destination.next(t)
            }
          }
          const Wu = (() => {
            function t() {
              return Error.call(this), this.message = "argument out of range",
                                       this.name = "ArgumentOutOfRangeError",
                                       this
            } return t.prototype = Object.create(Error.prototype),
            t
          })();
          function Gu(t) {
            return function(e) { return 0 === t ? Bu() : e.lift(new Qu(t)) }
          }
          class Qu {
            constructor(t) {
              if (this.total = t, this.total < 0)
                throw new Wu
            }
            call(t, e) { return e.subscribe(new Ku(t, this.total)) }
          }
          class Ku extends f {
            constructor(t, e) {
              super(t), this.total = e, this.ring = new Array, this.count = 0
            }
            _next(t) {
              const e = this.ring, n = this.total, s = this.count++;
              e.length < n ? e.push(t) : e[s % n] = t
            }
            _complete() {
              const t = this.destination;
              let e = this.count;
              if (e > 0) {
                const n = this.count >= this.total ? this.total : this.count,
                      s = this.ring;
                for (let i = 0; i < n; i++) {
                  const i = e++ % n;
                  t.next(s[i])
                }
              }
              t.complete()
            }
          }
          function Zu(t = Ju) { return e => e.lift(new Yu(t)) }
          class Yu {
            constructor(t) { this.errorFactory = t }
            call(t, e) { return e.subscribe(new Xu(t, this.errorFactory)) }
          }
          class Xu extends f {
            constructor(t, e) {
              super(t), this.errorFactory = e, this.hasValue = !1
            }
            _next(t) { this.hasValue = !0, this.destination.next(t) }
            _complete() {
              if (this.hasValue)
                return this.destination.complete();
              {
                let e;
                try {
                  e = this.errorFactory()
                } catch (t) {
                  e = t
                }
                this.destination.error(e)
              }
            }
          }
          function Ju() { return new ju }
          function th(t = null) { return e => e.lift(new eh(t)) }
          class eh {
            constructor(t) { this.defaultValue = t }
            call(t, e) { return e.subscribe(new nh(t, this.defaultValue)) }
          }
          class nh extends f {
            constructor(t, e) {
              super(t), this.defaultValue = e, this.isEmpty = !0
            }
            _next(t) { this.isEmpty = !1, this.destination.next(t) }
            _complete() {
              this.isEmpty && this.destination.next(this.defaultValue),
                  this.destination.complete()
            }
          }
          function sh(t, e) {
            return "function" == typeof e
                       ? n => n.pipe(sh((n, s) => F(t(n, s)).pipe(
                                            k((t, i) => e(n, t, s, i)))))
                       : e => e.lift(new ih(t))
          }
          class ih {
            constructor(t) { this.project = t }
            call(t, e) { return e.subscribe(new rh(t, this.project)) }
          }
          class rh extends j {
            constructor(t, e) { super(t), this.project = e, this.index = 0 }
            _next(t) {
              let e;
              const n = this.index++;
              try {
                e = this.project(t, n)
              } catch (s) {
                return void this.destination.error(s)
              }
              this._innerSub(e)
            }
            _innerSub(t) {
              const e = this.innerSubscription;
              e && e.unsubscribe();
              const n = new M(this), s = this.destination;
              s.add(n),
                  this.innerSubscription = V(t, n),
                  this.innerSubscription !== n && s.add(this.innerSubscription)
            }
            _complete() {
              const {innerSubscription : t} = this;
              t && !t.closed || super._complete(), this.unsubscribe()
            }
            _unsubscribe() { this.innerSubscription = void 0 }
            notifyComplete() {
              this.innerSubscription = void 0,
              this.isStopped && super._complete()
            }
            notifyNext(t) { this.destination.next(t) }
          }
          function oh(t) { return e => 0 === t ? Bu() : e.lift(new ah(t)) }
          class ah {
            constructor(t) {
              if (this.total = t, this.total < 0)
                throw new Wu
            }
            call(t, e) { return e.subscribe(new lh(t, this.total)) }
          }
          class lh extends f {
            constructor(t, e) { super(t), this.total = e, this.count = 0 }
            _next(t) {
              const e = this.total, n = ++this.count;
              n <= e &&
                  (this.destination.next(t),
                   n === e && (this.destination.complete(), this.unsubscribe()))
            }
          }
          function ch(...t) { return Uu()(Iu(...t)) }
          function uh(...t) {
            const e = t[t.length - 1];
            return C(e) ? (t.pop(), n => ch(t, n, e)) : e => ch(t, e)
          }
          class hh {
            constructor(t, e, n = !1) {
              this.accumulator = t, this.seed = e, this.hasSeed = n
            }
            call(t, e) {
              return e.subscribe(
                  new dh(t, this.accumulator, this.seed, this.hasSeed))
            }
          }
          class dh extends f {
            constructor(t, e, n, s) {
              super(t), this.accumulator = e, this._seed = n, this.hasSeed = s,
                        this.index = 0
            }
            get seed() { return this._seed }
            set seed(t) { this.hasSeed = !0, this._seed = t }
            _next(t) {
              if (this.hasSeed)
                return this._tryNext(t);
              this.seed = t, this.destination.next(t)
            }
            _tryNext(t) {
              const e = this.index++;
              let n;
              try {
                n = this.accumulator(this.seed, t, e)
              } catch (s) {
                this.destination.error(s)
              }
              this.seed = n, this.destination.next(n)
            }
          }
          function ph(t) {
            return function(e) {
              const n = new fh(t), s = e.lift(n);
              return n.caught = s
            }
          }
          class fh {
            constructor(t) { this.selector = t }
            call(t, e) {
              return e.subscribe(new mh(t, this.selector, this.caught))
            }
          }
          class mh extends j {
            constructor(t, e, n) {
              super(t), this.selector = e, this.caught = n
            }
            error(t) {
              if (!this.isStopped) {
                let n;
                try {
                  n = this.selector(t, this.caught)
                } catch (e) {
                  return void super.error(e)
                }
                this._unsubscribeAndRecycle();
                const s = new M(this);
                this.add(s);
                const i = V(n, s);
                i !== s && this.add(i)
              }
            }
          }
          function gh(t, e) { return B(t, e, 1) }
          function yh(t, e) {
            const n = arguments.length >= 2;
            return s => s.pipe(t ? zu((e, n) => t(e, n, s)) : y, oh(1),
                               n ? th(e) : Zu(() => new ju))
          }
          function _h() {}
          function vh(t, e, n) {
            return function(s) { return s.lift(new bh(t, e, n)) }
          }
          class bh {
            constructor(t, e, n) {
              this.nextOrObserver = t, this.error = e, this.complete = n
            }
            call(t, e) {
              return e.subscribe(
                  new wh(t, this.nextOrObserver, this.error, this.complete))
            }
          }
          class wh extends f {
            constructor(t, e, n, i) {
              super(t),
                  this._tapNext = _h, this._tapError = _h,
                  this._tapComplete = _h, this._tapError = n || _h,
                  this._tapComplete = i || _h,
                  s(e) ? (this._context = this, this._tapNext = e)
                       : e && (this._context = e, this._tapNext = e.next || _h,
                               this._tapError = e.error || _h,
                               this._tapComplete = e.complete || _h)
            }
            _next(t) {
              try {
                this._tapNext.call(this._context, t)
              } catch (e) {
                return void this.destination.error(e)
              }
              this.destination.next(t)
            }
            _error(t) {
              try {
                this._tapError.call(this._context, t)
              } catch (t) {
                return void this.destination.error(t)
              }
              this.destination.error(t)
            }
            _complete() {
              try {
                this._tapComplete.call(this._context)
              } catch (t) {
                return void this.destination.error(t)
              }
              return this.destination.complete()
            }
          }
          class xh {
            constructor(t) { this.callback = t }
            call(t, e) { return e.subscribe(new Sh(t, this.callback)) }
          }
          class Sh extends f {
            constructor(t, e) { super(t), this.add(new h(e)) }
          }
          class Eh {
            constructor(t, e) { this.id = t, this.url = e }
          }
          class Ch extends Eh {
            constructor(t, e, n = "imperative", s = null) {
              super(t, e), this.navigationTrigger = n, this.restoredState = s
            }
            toString() {
              return `NavigationStart(id: ${this.id}, url: '${this.url}')`
            }
          }
          class kh extends Eh {
            constructor(t, e, n) { super(t, e), this.urlAfterRedirects = n }
            toString() {
              return `NavigationEnd(id: ${this.id}, url: '${
                  this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
            }
          }
          class Th extends Eh {
            constructor(t, e, n) { super(t, e), this.reason = n }
            toString() {
              return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
            }
          }
          class Ah extends Eh {
            constructor(t, e, n) { super(t, e), this.error = n }
            toString() {
              return `NavigationError(id: ${this.id}, url: '${
                  this.url}', error: ${this.error})`
            }
          }
          class Ih extends Eh {
            constructor(t, e, n, s) {
              super(t, e), this.urlAfterRedirects = n, this.state = s
            }
            toString() {
              return `RoutesRecognized(id: ${this.id}, url: '${
                  this.url}', urlAfterRedirects: '${
                  this.urlAfterRedirects}', state: ${this.state})`
            }
          }
          class Rh extends Eh {
            constructor(t, e, n, s) {
              super(t, e), this.urlAfterRedirects = n, this.state = s
            }
            toString() {
              return `GuardsCheckStart(id: ${this.id}, url: '${
                  this.url}', urlAfterRedirects: '${
                  this.urlAfterRedirects}', state: ${this.state})`
            }
          }
          class Oh extends Eh {
            constructor(t, e, n, s, i) {
              super(t, e), this.urlAfterRedirects = n, this.state = s,
                           this.shouldActivate = i
            }
            toString() {
              return `GuardsCheckEnd(id: ${this.id}, url: '${
                  this.url}', urlAfterRedirects: '${
                  this.urlAfterRedirects}', state: ${
                  this.state}, shouldActivate: ${this.shouldActivate})`
            }
          }
          class Ph extends Eh {
            constructor(t, e, n, s) {
              super(t, e), this.urlAfterRedirects = n, this.state = s
            }
            toString() {
              return `ResolveStart(id: ${this.id}, url: '${
                  this.url}', urlAfterRedirects: '${
                  this.urlAfterRedirects}', state: ${this.state})`
            }
          }
          class Lh extends Eh {
            constructor(t, e, n, s) {
              super(t, e), this.urlAfterRedirects = n, this.state = s
            }
            toString() {
              return `ResolveEnd(id: ${this.id}, url: '${
                  this.url}', urlAfterRedirects: '${
                  this.urlAfterRedirects}', state: ${this.state})`
            }
          }
          class Dh {
            constructor(t) { this.route = t }
            toString() {
              return `RouteConfigLoadStart(path: ${this.route.path})`
            }
          }
          class Nh {
            constructor(t) { this.route = t }
            toString() { return `RouteConfigLoadEnd(path: ${this.route.path})` }
          }
          class Fh {
            constructor(t) { this.snapshot = t }
            toString() {
              return `ChildActivationStart(path: '${
                  this.snapshot.routeConfig && this.snapshot.routeConfig.path ||
                  ""}')`
            }
          }
          class Mh {
            constructor(t) { this.snapshot = t }
            toString() {
              return `ChildActivationEnd(path: '${
                  this.snapshot.routeConfig && this.snapshot.routeConfig.path ||
                  ""}')`
            }
          }
          class jh {
            constructor(t) { this.snapshot = t }
            toString() {
              return `ActivationStart(path: '${
                  this.snapshot.routeConfig && this.snapshot.routeConfig.path ||
                  ""}')`
            }
          }
          class Vh {
            constructor(t) { this.snapshot = t }
            toString() {
              return `ActivationEnd(path: '${
                  this.snapshot.routeConfig && this.snapshot.routeConfig.path ||
                  ""}')`
            }
          }
          class Bh {
            constructor(t, e, n) {
              this.routerEvent = t, this.position = e, this.anchor = n
            }
            toString() {
              return `Scroll(anchor: '${this.anchor}', position: '${
                  this.position ? `${this.position[0]}, ${this.position[1]}`
                                : null}')`
            }
          }
          const Hh = "primary";
          class Uh {
            constructor(t) {
              this.params = t || {}
            }
            has(t) {
              return Object.prototype.hasOwnProperty.call(this.params, t)
            }
            get(t) {
              if (this.has(t)) {
                const e = this.params[t];
                return Array.isArray(e) ? e[0] : e
              }
              return null
            }
            getAll(t) {
              if (this.has(t)) {
                const e = this.params[t];
                return Array.isArray(e) ? e : [ e ]
              }
              return []
            }
            get keys() { return Object.keys(this.params) }
          }
          function zh(t) { return new Uh(t) }
          function $h(t) {
            const e = Error("NavigationCancelingError: " + t);
            return e.ngNavigationCancelingError = !0, e
          }
          function qh(t, e, n) {
            const s = n.path.split("/");
            if (s.length > t.length)
              return null;
            if ("full" === n.pathMatch &&
                (e.hasChildren() || s.length < t.length))
              return null;
            const i = {};
            for (let r = 0; r < s.length; r++) {
              const e = s[r], n = t[r];
              if (e.startsWith(":"))
                i[e.substring(1)] = n;
              else if (e !== n.path)
                return null
            }
            return { consumed: t.slice(0, s.length), posParams: i }
          }
          function Wh(t, e) {
            const n = Object.keys(t), s = Object.keys(e);
            if (!n || !s || n.length != s.length)
              return !1;
            let i;
            for (let r = 0; r < n.length; r++)
              if (i = n[r], !Gh(t[i], e[i]))
                return !1;
            return !0
          }
          function Gh(t, e) {
            if (Array.isArray(t) && Array.isArray(e)) {
              if (t.length !== e.length)
                return !1;
              const n = [...t ].sort(), s = [...e ].sort();
              return n.every((t, e) => s[e] === t)
            }
            return t === e
          }
          function Qh(t) { return Array.prototype.concat.apply([], t) }
          function Kh(t) { return t.length > 0 ? t[t.length - 1] : null }
          function Zh(t, e) {
            for (const n in t)
              t.hasOwnProperty(n) && e(t[n], n)
          }
          function Yh(t) {
            return Oo(t) ? t : Ro(t) ? F(Promise.resolve(t)) : Iu(t)
          }
          function Xh(t, e, n) {
            return n ? function(t, e) {
              return Wh(t, e)
            }(t.queryParams, e.queryParams) && function t(e, n) {
              if (!nd(e.segments, n.segments))
                return !1;
              if (e.numberOfChildren !== n.numberOfChildren)
                return !1;
              for (const s in n.children) {
                if (!e.children[s])
                  return !1;
                if (!t(e.children[s], n.children[s]))
                  return !1
              }
              return !0
            }(t.root, e.root) : function(t, e) {
              return Object.keys(e).length <= Object.keys(t).length &&
                     Object.keys(e).every(n => Gh(t[n], e[n]))
            }(t.queryParams, e.queryParams) && function t(e, n) {
              return function e(n, s, i) {
                if (n.segments.length > i.length)
                  return !!nd(n.segments.slice(0, i.length), i) &&
                         !s.hasChildren();
                if (n.segments.length === i.length) {
                  if (!nd(n.segments, i))
                    return !1;
                  for (const e in s.children) {
                    if (!n.children[e])
                      return !1;
                    if (!t(n.children[e], s.children[e]))
                      return !1
                  }
                  return !0
                }
                {
                  const t = i.slice(0, n.segments.length),
                        r = i.slice(n.segments.length);
                  return !!nd(n.segments, t) && !!n.children.primary &&
                         e(n.children.primary, s, r)
                }
              }(e, n, n.segments)
            }(t.root, e.root)
          }
          class Jh {
            constructor(t, e, n) {
              this.root = t, this.queryParams = e, this.fragment = n
            }
            get queryParamMap() {
              return this._queryParamMap ||
                         (this._queryParamMap = zh(this.queryParams)),
                     this._queryParamMap
            }
            toString() { return od.serialize(this) }
          }
          class td {
            constructor(t, e) {
              this.segments = t, this.children = e, this.parent = null,
              Zh(e, (t, e) => t.parent = this)
            }
            hasChildren() { return this.numberOfChildren > 0 }
            get numberOfChildren() { return Object.keys(this.children).length }
            toString() { return ad(this) }
          }
          class ed {
            constructor(t, e) { this.path = t, this.parameters = e }
            get parameterMap() {
              return this._parameterMap ||
                         (this._parameterMap = zh(this.parameters)),
                     this._parameterMap
            }
            toString() { return pd(this) }
          }
          function nd(t, e) {
            return t.length === e.length &&
                   t.every((t, n) => t.path === e[n].path)
          }
          function sd(t, e) {
            let n = [];
            return Zh(t.children,
                      (t, s) => {s === Hh && (n = n.concat(e(t, s)))}),
                   Zh(t.children,
                      (t, s) => {s !== Hh && (n = n.concat(e(t, s)))}),
                   n
          }
          class id {}
          class rd {
            parse(t) {
              const e = new _d(t);
              return new Jh(e.parseRootSegment(), e.parseQueryParams(),
                            e.parseFragment())
            }
            serialize(t) {
              return `${
                     "/" +
                     function t(e, n) {
                       if (!e.hasChildren())
                         return ad(e);
                       if (n) {
                         const n = e.children.primary
                                       ? t(e.children.primary, !1)
                                       : "",
                               s = [];
                         return Zh(e.children,
                                   (e, n) => {n !== Hh &&
                                              s.push(`${n}:${t(e, !1)}`)}),
                                s.length > 0 ? `${n}(${s.join("//")})` : n
                       }
                       {
                         const n =
                             sd(e, (n, s) => s === Hh
                                                 ? [ t(e.children.primary, !1) ]
                                                 : [ `${s}:${t(n, !1)}` ]);
                         return 1 === Object.keys(e.children).length &&
                                        null != e.children.primary
                                    ? `${ad(e)}/${n[0]}`
                                    : `${ad(e)}/(${n.join("//")})`
                       }
                     }(t.root, !0)}${function(t) {
                const e = Object.keys(t).map(e => {
                  const n = t[e];
                  return Array.isArray(n)
                             ? n.map(t => `${cd(e)}=${cd(t)}`).join("&")
                             : `${cd(e)}=${cd(n)}`
                });
                return e.length ? "?" + e.join("&") : ""
              }(t.queryParams)}${
                              "string" == typeof t.fragment
                                  ? "#" + encodeURI(t.fragment)
                                  : ""}`
            }
          }
          const od = new rd;
          function ad(t) { return t.segments.map(t => pd(t)).join("/") }
          function ld(t) {
            return encodeURIComponent(t)
                .replace(/%40/g, "@")
                .replace(/%3A/gi, ":")
                .replace(/%24/g, "$")
                .replace(/%2C/gi, ",")
          }
          function cd(t) { return ld(t).replace(/%3B/gi, ";") }
          function ud(t) {
            return ld(t)
                .replace(/\(/g, "%28")
                .replace(/\)/g, "%29")
                .replace(/%26/gi, "&")
          }
          function hd(t) { return decodeURIComponent(t) }
          function dd(t) { return hd(t.replace(/\+/g, "%20")) }
          function pd(t) {
            return `${ud(t.path)}${
                e = t.parameters,
                Object.keys(e).map(t => `;${ud(t)}=${ud(e[t])}`).join("")}`;
            var e
          }
          const fd = /^[^\/()?;=#]+/;
          function md(t) {
            const e = t.match(fd);
            return e ? e[0] : ""
          }
          const gd = /^[^=?&#]+/, yd = /^[^?&#]+/;
          class _d {
            constructor(t) { this.url = t, this.remaining = t }
            parseRootSegment() {
              return this.consumeOptional("/"),
                     "" === this.remaining || this.peekStartsWith("?") ||
                             this.peekStartsWith("#")
                         ? new td([], {})
                         : new td([], this.parseChildren())
            }
            parseQueryParams() {
              const t = {};
              if (this.consumeOptional("?"))
                do {
                  this.parseQueryParam(t)
                } while (this.consumeOptional("&"));
              return t
            }
            parseFragment() {
              return this.consumeOptional("#")
                         ? decodeURIComponent(this.remaining)
                         : null
            }
            parseChildren() {
              if ("" === this.remaining)
                return {};
              this.consumeOptional("/");
              const t = [];
              for (this.peekStartsWith("(") || t.push(this.parseSegment());
                   this.peekStartsWith("/") && !this.peekStartsWith("//") &&
                   !this.peekStartsWith("/(");)
                this.capture("/"), t.push(this.parseSegment());
              let e = {};
              this.peekStartsWith("/(") &&
                  (this.capture("/"), e = this.parseParens(!0));
              let n = {};
              return this.peekStartsWith("(") && (n = this.parseParens(!1)),
                     (t.length > 0 || Object.keys(e).length > 0) &&
                         (n.primary = new td(t, e)),
                     n
            }
            parseSegment() {
              const t = md(this.remaining);
              if ("" === t && this.peekStartsWith(";"))
                throw new Error(
                    `Empty path url segment cannot have parameters: '${
                        this.remaining}'.`);
              return this.capture(t), new ed(hd(t), this.parseMatrixParams())
            }
            parseMatrixParams() {
              const t = {};
              for (; this.consumeOptional(";");)
                this.parseParam(t);
              return t
            }
            parseParam(t) {
              const e = md(this.remaining);
              if (!e)
                return;
              this.capture(e);
              let n = "";
              if (this.consumeOptional("=")) {
                const t = md(this.remaining);
                t && (n = t, this.capture(n))
              }
              t[hd(e)] = hd(n)
            }
            parseQueryParam(t) {
              const e = function(t) {
                const e = t.match(gd);
                return e ? e[0] : ""
              }(this.remaining);
              if (!e)
                return;
              this.capture(e);
              let n = "";
              if (this.consumeOptional("=")) {
                const t = function(t) {
                  const e = t.match(yd);
                  return e ? e[0] : ""
                }(this.remaining);
                t && (n = t, this.capture(n))
              }
              const s = dd(e), i = dd(n);
              if (t.hasOwnProperty(s)) {
                let e = t[s];
                Array.isArray(e) || (e = [ e ], t[s] = e), e.push(i)
              } else
                t[s] = i
            }
            parseParens(t) {
              const e = {};
              for (this.capture("(");
                   !this.consumeOptional(")") && this.remaining.length > 0;) {
                const n = md(this.remaining), s = this.remaining[n.length];
                if ("/" !== s && ")" !== s && ";" !== s)
                  throw new Error(`Cannot parse url '${this.url}'`);
                let i = void 0;
                n.indexOf(":") > -1 ? (i = n.substr(0, n.indexOf(":")),
                                       this.capture(i), this.capture(":"))
                                    : t && (i = Hh);
                const r = this.parseChildren();
                e[i] = 1 === Object.keys(r).length ? r.primary : new td([], r),
                this.consumeOptional("//")
              }
              return e
            }
            peekStartsWith(t) { return this.remaining.startsWith(t) }
            consumeOptional(t) {
              return !!this.peekStartsWith(t) &&
                     (this.remaining = this.remaining.substring(t.length), !0)
            }
            capture(t) {
              if (!this.consumeOptional(t))
                throw new Error(`Expected "${t}".`)
            }
          }
          class vd {
            constructor(t) { this._root = t }
            get root() { return this._root.value }
            parent(t) {
              const e = this.pathFromRoot(t);
              return e.length > 1 ? e[e.length - 2] : null
            }
            children(t) {
              const e = bd(t, this._root);
              return e ? e.children.map(t => t.value) : []
            }
            firstChild(t) {
              const e = bd(t, this._root);
              return e && e.children.length > 0 ? e.children[0].value : null
            }
            siblings(t) {
              const e = wd(t, this._root);
              return e.length < 2 ? []
                                  : e[e.length - 2]
                                        .children.map(t => t.value)
                                        .filter(e => e !== t)
            }
            pathFromRoot(t) { return wd(t, this._root).map(t => t.value) }
          }
          function bd(t, e) {
            if (t === e.value)
              return e;
            for (const n of e.children) {
              const e = bd(t, n);
              if (e)
                return e
            }
            return null
          }
          function wd(t, e) {
            if (t === e.value)
              return [ e ];
            for (const n of e.children) {
              const s = wd(t, n);
              if (s.length)
                return s.unshift(e), s
            }
            return []
          }
          class xd {
            constructor(t, e) { this.value = t, this.children = e }
            toString() { return `TreeNode(${this.value})` }
          }
          function Sd(t) {
            const e = {};
            return t && t.children.forEach(t => e[t.value.outlet] = t), e
          }
          class Ed extends vd {
            constructor(t, e) { super(t), this.snapshot = e, Rd(this, t) }
            toString() { return this.snapshot.toString() }
          }
          function Cd(t, e) {
            const n =
                function(t, e) {
              const n = new Ad([], {}, {}, "", {}, Hh, e, null, t.root, -1, {});
              return new Id("", new xd(n, []))
            }(t, e),
                  s = new Ru([ new ed("", {}) ]), i = new Ru({}),
                  r = new Ru({}), o = new Ru({}), a = new Ru(""),
                  l = new kd(s, i, o, a, r, Hh, e, n.root);
            return l.snapshot = n.root, new Ed(new xd(l, []), n)
          }
          class kd {
            constructor(t, e, n, s, i, r, o, a) {
              this.url = t, this.params = e, this.queryParams = n,
              this.fragment = s, this.data = i, this.outlet = r,
              this.component = o, this._futureSnapshot = a
            }
            get routeConfig() { return this._futureSnapshot.routeConfig }
            get root() { return this._routerState.root }
            get parent() { return this._routerState.parent(this) }
            get firstChild() { return this._routerState.firstChild(this) }
            get children() { return this._routerState.children(this) }
            get pathFromRoot() { return this._routerState.pathFromRoot(this) }
            get paramMap() {
              return this._paramMap ||
                         (this._paramMap = this.params.pipe(k(t => zh(t)))),
                     this._paramMap
            }
            get queryParamMap() {
              return this._queryParamMap ||
                         (this._queryParamMap =
                              this.queryParams.pipe(k(t => zh(t)))),
                     this._queryParamMap
            }
            toString() {
              return this.snapshot ? this.snapshot.toString()
                                   : `Future(${this._futureSnapshot})`
            }
          }
          function Td(t, e = "emptyOnly") {
            const n = t.pathFromRoot;
            let s = 0;
            if ("always" !== e)
              for (s = n.length - 1; s >= 1;) {
                const t = n[s], e = n[s - 1];
                if (t.routeConfig && "" === t.routeConfig.path)
                  s--;
                else {
                  if (e.component)
                    break;
                  s--
                }
              }
            return function(t) {
              return t.reduce(
                  (t, e) => ({
                    params :
                        Object.assign(Object.assign({}, t.params), e.params),
                    data : Object.assign(Object.assign({}, t.data), e.data),
                    resolve : Object.assign(Object.assign({}, t.resolve),
                                            e._resolvedData)
                  }),
                  {params : {}, data : {}, resolve : {}})
            }(n.slice(s))
          }
          class Ad {
            constructor(t, e, n, s, i, r, o, a, l, c, u) {
              this.url = t, this.params = e, this.queryParams = n,
              this.fragment = s, this.data = i, this.outlet = r,
              this.component = o, this.routeConfig = a, this._urlSegment = l,
              this._lastPathIndex = c, this._resolve = u
            }
            get root() { return this._routerState.root }
            get parent() { return this._routerState.parent(this) }
            get firstChild() { return this._routerState.firstChild(this) }
            get children() { return this._routerState.children(this) }
            get pathFromRoot() { return this._routerState.pathFromRoot(this) }
            get paramMap() {
              return this._paramMap || (this._paramMap = zh(this.params)),
                     this._paramMap
            }
            get queryParamMap() {
              return this._queryParamMap ||
                         (this._queryParamMap = zh(this.queryParams)),
                     this._queryParamMap
            }
            toString() {
              return `Route(url:'${
                  this.url.map(t => t.toString()).join("/")}', path:'${
                  this.routeConfig ? this.routeConfig.path : ""}')`
            }
          }
          class Id extends vd {
            constructor(t, e) { super(e), this.url = t, Rd(this, e) }
            toString() { return Od(this._root) }
          }
          function Rd(t, e) {
            e.value._routerState = t, e.children.forEach(e => Rd(t, e))
          }
          function Od(t) {
            const e = t.children.length > 0
                          ? ` { ${t.children.map(Od).join(", ")} } `
                          : "";
            return `${t.value}${e}`
          }
          function Pd(t) {
            if (t.snapshot) {
              const e = t.snapshot, n = t._futureSnapshot;
              t.snapshot = n,
              Wh(e.queryParams, n.queryParams) ||
                  t.queryParams.next(n.queryParams),
              e.fragment !== n.fragment && t.fragment.next(n.fragment),
              Wh(e.params, n.params) || t.params.next(n.params),
              function(t, e) {
                if (t.length !== e.length)
                  return !1;
                for (let n = 0; n < t.length; ++n)
                  if (!Wh(t[n], e[n]))
                    return !1;
                return !0
              }(e.url, n.url) ||
                  t.url.next(n.url),
              Wh(e.data, n.data) || t.data.next(n.data)
            } else
              t.snapshot = t._futureSnapshot,
              t.data.next(t._futureSnapshot.data)
          }
          function Ld(t, e) {
            var n, s;
            return Wh(t.params, e.params) && nd(n = t.url, s = e.url) &&
                   n.every((t, e) => Wh(t.parameters, s[e].parameters)) &&
                   !(!t.parent != !e.parent) &&
                   (!t.parent || Ld(t.parent, e.parent))
          }
          function Dd(t) {
            return "object" == typeof t && null != t && !t.outlets &&
                   !t.segmentPath
          }
          function Nd(t, e, n, s, i) {
            let r = {};
            return s && Zh(s, (t, e) => {r[e] = Array.isArray(t)
                                                    ? t.map(t => "" + t)
                                                    : "" + t}),
                   new Jh(n.root === t ? e : function t(e, n, s) {
                     const i = {};
                     return Zh(e.children,
                               (e, r) => {i[r] = e === n ? s : t(e, n, s)}),
                            new td(e.segments, i)
                   }(n.root, t, e), r, i)
          }
          class Fd {
            constructor(t, e, n) {
              if (this.isAbsolute = t, this.numberOfDoubleDots = e,
                  this.commands = n, t && n.length > 0 && Dd(n[0]))
                throw new Error("Root segment cannot have matrix parameters");
              const s =
                  n.find(t => "object" == typeof t && null != t && t.outlets);
              if (s && s !== Kh(n))
                throw new Error("{outlets:{}} has to be the last command")
            }
            toRoot() {
              return this.isAbsolute && 1 === this.commands.length &&
                     "/" == this.commands[0]
            }
          }
          class Md {
            constructor(t, e, n) {
              this.segmentGroup = t, this.processChildren = e, this.index = n
            }
          }
          function jd(t) {
            return "object" == typeof t && null != t && t.outlets
                       ? t.outlets.primary
                       : "" + t
          }
          function Vd(t, e, n) {
            if (t || (t = new td([], {})),
                0 === t.segments.length && t.hasChildren())
              return Bd(t, e, n);
            const s = function(t, e, n) {
              let s = 0, i = e;
              const r = {match : !1, pathIndex : 0, commandIndex : 0};
              for (; i < t.segments.length;) {
                if (s >= n.length)
                  return r;
                const e = t.segments[i], o = jd(n[s]),
                      a = s < n.length - 1 ? n[s + 1] : null;
                if (i > 0 && void 0 === o)
                  break;
                if (o && a && "object" == typeof a && void 0 === a.outlets) {
                  if (!$d(o, a, e))
                    return r;
                  s += 2
                } else {
                  if (!$d(o, {}, e))
                    return r;
                  s++
                }
                i++
              }
              return { match: !0, pathIndex: i, commandIndex: s }
            }(t, e, n), i = n.slice(s.commandIndex);
            if (s.match && s.pathIndex < t.segments.length) {
              const e = new td(t.segments.slice(0, s.pathIndex), {});
              return e.children.primary =
                         new td(t.segments.slice(s.pathIndex), t.children),
                     Bd(e, 0, i)
            }
            return s.match && 0 === i.length
                       ? new td(t.segments, {})
                       : s.match && !t.hasChildren()
                             ? Hd(t, e, n)
                             : s.match ? Bd(t, 0, i) : Hd(t, e, n)
          }
          function Bd(t, e, n) {
            if (0 === n.length)
              return new td(t.segments, {});
            {
              const s = function(t) {
                return "object" == typeof t[0] && null !== t[0] && t[0].outlets
                           ? t[0].outlets
                           : {[Hh] : t}
              }(n), i = {};
              return Zh(s, (n, s) => {null !== n &&
                                      (i[s] = Vd(t.children[s], e, n))}),
                     Zh(t.children, (t, e) => {void 0 === s[e] && (i[e] = t)}),
                     new td(t.segments, i)
            }
          }
          function Hd(t, e, n) {
            const s = t.segments.slice(0, e);
            let i = 0;
            for (; i < n.length;) {
              if ("object" == typeof n[i] && null !== n[i] &&
                  void 0 !== n[i].outlets) {
                const t = Ud(n[i].outlets);
                return new td(s, t)
              }
              if (0 === i && Dd(n[0])) {
                s.push(new ed(t.segments[e].path, n[0])), i++;
                continue
              }
              const r = jd(n[i]), o = i < n.length - 1 ? n[i + 1] : null;
              r && o && Dd(o) ? (s.push(new ed(r, zd(o))), i += 2)
                              : (s.push(new ed(r, {})), i++)
            }
            return new td(s, {})
          }
          function Ud(t) {
            const e = {};
            return Zh(t, (t, n) => {null !== t &&
                                    (e[n] = Hd(new td([], {}), 0, t))}),
                   e
          }
          function zd(t) {
            const e = {};
            return Zh(t, (t, n) => e[n] = "" + t), e
          }
          function $d(t, e, n) { return t == n.path && Wh(e, n.parameters) }
          class qd {
            constructor(t, e, n, s) {
              this.routeReuseStrategy = t, this.futureState = e,
              this.currState = n, this.forwardEvent = s
            }
            activate(t) {
              const e = this.futureState._root,
                    n = this.currState ? this.currState._root : null;
              this.deactivateChildRoutes(e, n, t), Pd(this.futureState.root),
                  this.activateChildRoutes(e, n, t)
            }
            deactivateChildRoutes(t, e, n) {
              const s = Sd(e);
              t.children.forEach(t => {
                const e = t.value.outlet;
                this.deactivateRoutes(t, s[e], n), delete s[e]
              }),
                  Zh(s, (t, e) => {this.deactivateRouteAndItsChildren(t, n)})
            }
            deactivateRoutes(t, e, n) {
              const s = t.value, i = e ? e.value : null;
              if (s === i)
                if (s.component) {
                  const i = n.getContext(s.outlet);
                  i && this.deactivateChildRoutes(t, e, i.children)
                } else
                  this.deactivateChildRoutes(t, e, n);
              else
                i && this.deactivateRouteAndItsChildren(e, n)
            }
            deactivateRouteAndItsChildren(t, e) {
              this.routeReuseStrategy.shouldDetach(t.value.snapshot)
                  ? this.detachAndStoreRouteSubtree(t, e)
                  : this.deactivateRouteAndOutlet(t, e)
            }
            detachAndStoreRouteSubtree(t, e) {
              const n = e.getContext(t.value.outlet);
              if (n && n.outlet) {
                const e = n.outlet.detach(),
                      s = n.children.onOutletDeactivated();
                this.routeReuseStrategy.store(
                    t.value.snapshot,
                    {componentRef : e, route : t, contexts : s})
              }
            }
            deactivateRouteAndOutlet(t, e) {
              const n = e.getContext(t.value.outlet);
              if (n) {
                const s = Sd(t), i = t.value.component ? n.children : e;
                Zh(s, (t, e) => this.deactivateRouteAndItsChildren(t, i)),
                    n.outlet && (n.outlet.deactivate(),
                                 n.children.onOutletDeactivated())
              }
            }
            activateChildRoutes(t, e, n) {
              const s = Sd(e);
              t.children.forEach(t => {
                this.activateRoutes(t, s[t.value.outlet], n),
                this.forwardEvent(new Vh(t.value.snapshot))
              }),
                  t.children.length &&
                      this.forwardEvent(new Mh(t.value.snapshot))
            }
            activateRoutes(t, e, n) {
              const s = t.value, i = e ? e.value : null;
              if (Pd(s), s === i)
                if (s.component) {
                  const i = n.getOrCreateContext(s.outlet);
                  this.activateChildRoutes(t, e, i.children)
                } else
                  this.activateChildRoutes(t, e, n);
              else if (s.component) {
                const e = n.getOrCreateContext(s.outlet);
                if (this.routeReuseStrategy.shouldAttach(s.snapshot)) {
                  const t = this.routeReuseStrategy.retrieve(s.snapshot);
                  this.routeReuseStrategy.store(s.snapshot, null),
                      e.children.onOutletReAttached(t.contexts),
                      e.attachRef = t.componentRef, e.route = t.route.value,
                      e.outlet &&
                          e.outlet.attach(t.componentRef, t.route.value),
                      Wd(t.route)
                } else {
                  const n =
                      function(t) {
                    for (let e = t.parent; e; e = e.parent) {
                      const t = e.routeConfig;
                      if (t && t._loadedConfig)
                        return t._loadedConfig;
                      if (t && t.component)
                        return null
                    }
                    return null
                  }(s.snapshot),
                        i = n ? n.module.componentFactoryResolver : null;
                  e.attachRef = null, e.route = s, e.resolver = i,
                  e.outlet && e.outlet.activateWith(s, i),
                  this.activateChildRoutes(t, null, e.children)
                }
              } else
                this.activateChildRoutes(t, null, n)
            }
          }
          function Wd(t) { Pd(t.value), t.children.forEach(Wd) }
          class Gd {
            constructor(t, e) { this.routes = t, this.module = e }
          }
          function Qd(t) { return "function" == typeof t }
          function Kd(t) { return t instanceof Jh }
          const Zd = Symbol("INITIAL_VALUE");
          function Yd() {
            return sh(
                t => Nu(...t.map(t => t.pipe(oh(1), uh(Zd))))
                         .pipe(
                             function(t, e) {
                               let n = !1;
                               return arguments.length >= 2 && (n = !0),
                                      function(
                                          s) { return s.lift(new hh(t, e, n)) }
                             }(
                                 (t, e) => {
                                   let n = !1;
                                   return e.reduce((t, s, i) => {
                                     if (t !== Zd)
                                       return t;
                                     if (s === Zd && (n = !0), !n) {
                                       if (!1 === s)
                                         return s;
                                       if (i === e.length - 1 || Kd(s))
                                         return s
                                     }
                                     return t
                                   }, t)
                                 },
                                 Zd),
                             zu(t => t !== Zd), k(t => Kd(t) ? t : !0 === t),
                             oh(1)))
          }
          class Xd {
            constructor(t) { this.segmentGroup = t || null }
          }
          class Jd {
            constructor(t) { this.urlTree = t }
          }
          function tp(t) { return new _(e => e.error(new Xd(t))) }
          function ep(t) { return new _(e => e.error(new Jd(t))) }
          function np(t) {
            return new _(
                e => e.error(new Error(
                    `Only absolute redirects can have named outlets. redirectTo: '${
                        t}'`)))
          }
          class sp {
            constructor(t, e, n, s, i) {
              this.configLoader = e, this.urlSerializer = n, this.urlTree = s,
              this.config = i, this.allowRedirects = !0,
              this.ngModule = t.get(ee)
            }
            apply() {
              return this
                  .expandSegmentGroup(this.ngModule, this.config,
                                      this.urlTree.root, Hh)
                  .pipe(k(t => this.createUrlTree(t, this.urlTree.queryParams,
                                                  this.urlTree.fragment)))
                  .pipe(ph(t => {
                    if (t instanceof Jd)
                      return this.allowRedirects = !1, this.match(t.urlTree);
                    if (t instanceof Xd)
                      throw this.noMatchError(t);
                    throw t
                  }))
            }
            match(t) {
              return this
                  .expandSegmentGroup(this.ngModule, this.config, t.root, Hh)
                  .pipe(
                      k(e => this.createUrlTree(e, t.queryParams, t.fragment)))
                  .pipe(ph(t => {
                    if (t instanceof Xd)
                      throw this.noMatchError(t);
                    throw t
                  }))
            }
            noMatchError(t) {
              return new Error(
                  `Cannot match any routes. URL Segment: '${t.segmentGroup}'`)
            }
            createUrlTree(t, e, n) {
              const s = t.segments.length > 0 ? new td([], {[Hh] : t}) : t;
              return new Jh(s, e, n)
            }
            expandSegmentGroup(t, e, n, s) {
              return 0 === n.segments.length && n.hasChildren()
                         ? this.expandChildren(t, e, n).pipe(
                               k(t => new td([], t)))
                         : this.expandSegment(t, n, e, n.segments, s, !0)
            }
            expandChildren(t, e, n) {
              return function(t, e) {
                if (0 === Object.keys(t).length)
                  return Iu({});
                const n = [], s = [], i = {};
                return Zh(t,
                          (t, r) => {
                            const o = e(r, t).pipe(k(t => i[r] = t));
                            r === Hh ? n.push(o) : s.push(o)
                          }),
                       Iu.apply(null, n.concat(s)).pipe(Uu(), function(t, e) {
                         const n = arguments.length >= 2;
                         return s => s.pipe(t ? zu((e, n) => t(e, n, s)) : y,
                                            Gu(1), n ? th(e) : Zu(() => new ju))
                       }(), k(() => i))
              }(n.children, (n, s) => this.expandSegmentGroup(t, e, s, n))
            }
            expandSegment(t, e, n, s, i, r) {
              return Iu(...n).pipe(
                  gh(o => this.expandSegmentAgainstRoute(t, e, n, o, s, i, r)
                              .pipe(ph(t => {
                                if (t instanceof Xd)
                                  return Iu(null);
                                throw t
                              }))),
                  yh(t => !!t), ph((t, n) => {
                    if (t instanceof ju || "EmptyError" === t.name) {
                      if (this.noLeftoversInUrl(e, s, i))
                        return Iu(new td([], {}));
                      throw new Xd(e)
                    }
                    throw t
                  }))
            }
            noLeftoversInUrl(t, e, n) {
              return 0 === e.length && !t.children[n]
            }
            expandSegmentAgainstRoute(t, e, n, s, i, r, o) {
              return ap(s) !== r
                         ? tp(e)
                         : void 0 === s.redirectTo
                               ? this.matchSegmentAgainstRoute(t, e, s, i)
                               : o && this.allowRedirects
                                     ? this.expandSegmentAgainstRouteUsingRedirect(
                                           t, e, n, s, i, r)
                                     : tp(e)
            }
            expandSegmentAgainstRouteUsingRedirect(t, e, n, s, i, r) {
              return "**" === s.path
                         ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(
                               t, n, s, r)
                         : this.expandRegularSegmentAgainstRouteUsingRedirect(
                               t, e, n, s, i, r)
            }
            expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, s) {
              const i = this.applyRedirectCommands([], n.redirectTo, {});
              return n.redirectTo.startsWith("/")
                         ? ep(i)
                         : this.lineralizeSegments(n, i).pipe(B(n => {
                             const i = new td(n, {});
                             return this.expandSegment(t, i, e, n, s, !1)
                           }))
            }
            expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, s, i, r) {
              const {
                matched : o,
                consumedSegments : a,
                lastChild : l,
                positionalParamSegments : c
              } = ip(e, s, i);
              if (!o)
                return tp(e);
              const u = this.applyRedirectCommands(a, s.redirectTo, c);
              return s.redirectTo.startsWith("/")
                         ? ep(u)
                         : this.lineralizeSegments(s, u).pipe(
                               B(s => this.expandSegment(
                                     t, e, n, s.concat(i.slice(l)), r, !1)))
            }
            matchSegmentAgainstRoute(t, e, n, s) {
              if ("**" === n.path)
                return n.loadChildren ? this.configLoader.load(t.injector, n)
                                            .pipe(k(t => (n._loadedConfig = t,
                                                          new td(s, {}))))
                                      : Iu(new td(s, {}));
              const {matched : i, consumedSegments : r, lastChild : o} =
                  ip(e, n, s);
              if (!i)
                return tp(e);
              const a = s.slice(o);
              return this.getChildConfig(t, n, s).pipe(B(t => {
                const n = t.module, s = t.routes, {
                  segmentGroup : i,
                  slicedSegments : o
                } = function(t, e, n, s) {
                  return n.length > 0 &&
                                 function(t, e, n) {
                                   return n.some(n => op(t, e, n) &&
                                                      ap(n) !== Hh)
                                 }(t, n, s)
                             ? {
                                 segmentGroup : rp(
                                     new td(e,
                                            function(t, e) {
                                              const n = {};
                                              n.primary = e;
                                              for (const s of t)
                                                "" === s.path && ap(s) !== Hh &&
                                                    (n[ap(s)] = new td([], {}));
                                              return n
                                            }(s, new td(n, t.children)))),
                                 slicedSegments : []
                               }
                             : 0 === n.length &&
                                       function(t, e, n) {
                                         return n.some(n => op(t, e, n))
                                       }(t, n, s)
                                   ? {
                                       segmentGroup : rp(new td(
                                           t.segments,
                                           function(t, e, n, s) {
                                             const i = {};
                                             for (const r of n)
                                               op(t, e, r) && !s[ap(r)] &&
                                                   (i[ap(r)] = new td([], {}));
                                             return Object.assign(
                                                 Object.assign({}, s), i)
                                           }(t, n, s, t.children))),
                                       slicedSegments : n
                                     }
                                   : {segmentGroup : t, slicedSegments : n}
                }(e, r, a, s);
                return 0 === o.length && i.hasChildren()
                           ? this.expandChildren(n, s, i).pipe(
                                 k(t => new td(r, t)))
                           : 0 === s.length && 0 === o.length
                                 ? Iu(new td(r, {}))
                                 : this.expandSegment(n, i, s, o, Hh, !0)
                                       .pipe(k(t => new td(r.concat(t.segments),
                                                           t.children)))
              }))
            }
            getChildConfig(t, e, n) {
              return e.children?Iu(new Gd(e.children,t)):e.loadChildren?void 0!==e._loadedConfig?Iu(e._loadedConfig):this.runCanLoadGuards(t.injector,e,n).pipe(B(n=>n?this.configLoader.load(t.injector,e).pipe(k(t=>(e._loadedConfig=t,t))):function(t){return new _(e=>e.error($h(`Cannot load children because the guard of the route "path: '${t.path}'" returned false`)))}(e))):Iu(new Gd([],t))
            }
            runCanLoadGuards(t, e, n) {
              const s = e.canLoad;
              return s && 0 !== s.length
                         ? Iu(s.map(s => {
                             const i = t.get(s);
                             let r;
                             if (function(t) { return t && Qd(t.canLoad) }(i))
                               r = i.canLoad(e, n);
                             else {
                               if (!Qd(i))
                                 throw new Error("Invalid CanLoad guard");
                               r = i(e, n)
                             }
                             return Yh(r)
                           }))
                               .pipe(Yd(), vh(t => {
                                       if (!Kd(t))
                                         return;
                                       const e = $h(`Redirecting to "${
                                           this.urlSerializer.serialize(t)}"`);
                                       throw e.url = t, e
                                     }),
                                     k(t => !0 === t))
                         : Iu(!0)
            }
            lineralizeSegments(t, e) {
              let n = [], s = e.root;
              for (;;) {
                if (n = n.concat(s.segments), 0 === s.numberOfChildren)
                  return Iu(n);
                if (s.numberOfChildren > 1 || !s.children.primary)
                  return np(t.redirectTo);
                s = s.children.primary
              }
            }
            applyRedirectCommands(t, e, n) {
              return this.applyRedirectCreatreUrlTree(
                  e, this.urlSerializer.parse(e), t, n)
            }
            applyRedirectCreatreUrlTree(t, e, n, s) {
              const i = this.createSegmentGroup(t, e.root, n, s);
              return new Jh(i,
                            this.createQueryParams(e.queryParams,
                                                   this.urlTree.queryParams),
                            e.fragment)
            }
            createQueryParams(t, e) {
              const n = {};
              return Zh(t, (t, s) => {
                       if ("string" == typeof t && t.startsWith(":")) {
                         const i = t.substring(1);
                         n[s] = e[i]
                       } else
                         n[s] = t
                     }), n
            }
            createSegmentGroup(t, e, n, s) {
              const i = this.createSegments(t, e.segments, n, s);
              let r = {};
              return Zh(e.children,
                        (e, i) => {r[i] = this.createSegmentGroup(t, e, n, s)}),
                     new td(i, r)
            }
            createSegments(t, e, n, s) {
              return e.map(e => e.path.startsWith(":")
                                    ? this.findPosParam(t, e, s)
                                    : this.findOrReturn(e, n))
            }
            findPosParam(t, e, n) {
              const s = n[e.path.substring(1)];
              if (!s)
                throw new Error(
                    `Cannot redirect to '${t}'. Cannot find '${e.path}'.`);
              return s
            }
            findOrReturn(t, e) {
              let n = 0;
              for (const s of e) {
                if (s.path === t.path)
                  return e.splice(n), s;
                n++
              }
              return t
            }
          }
          function ip(t, e, n) {
            if ("" === e.path)
              return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
                         ? {
                             matched : !1,
                             consumedSegments : [],
                             lastChild : 0,
                             positionalParamSegments : {}
                           }
                         : {
                             matched : !0,
                             consumedSegments : [],
                             lastChild : 0,
                             positionalParamSegments : {}
                           };
            const s = (e.matcher || qh)(n, t, e);
            return s ? {
              matched : !0,
              consumedSegments : s.consumed,
              lastChild : s.consumed.length,
              positionalParamSegments : s.posParams
            }
                     : {
                         matched : !1,
                         consumedSegments : [],
                         lastChild : 0,
                         positionalParamSegments : {}
                       }
          }
          function rp(t) {
            if (1 === t.numberOfChildren && t.children.primary) {
              const e = t.children.primary;
              return new td(t.segments.concat(e.segments), e.children)
            }
            return t
          }
          function op(t, e, n) {
            return (!(t.hasChildren() || e.length > 0) ||
                    "full" !== n.pathMatch) &&
                   "" === n.path && void 0 !== n.redirectTo
          }
          function ap(t) { return t.outlet || Hh }
          class lp {
            constructor(t) {
              this.path = t, this.route = this.path[this.path.length - 1]
            }
          }
          class cp {
            constructor(t, e) { this.component = t, this.route = e }
          }
          function up(t, e, n) {
            const s = t._root;
            return function t(
                e, n, s, i,
                r = {canDeactivateChecks : [], canActivateChecks : []}) {
              const o = Sd(n);
              return e.children.forEach(e => {
                !function(
                    e, n, s, i,
                    r = {canDeactivateChecks : [], canActivateChecks : []}) {
                  const o = e.value, a = n ? n.value : null,
                        l = s ? s.getContext(e.value.outlet) : null;
                  if (a && o.routeConfig === a.routeConfig) {
                    const c = function(t, e, n) {
                      if ("function" == typeof n)
                        return n(t, e);
                      switch (n) {
                      case "pathParamsChange":
                        return !nd(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return !nd(t.url, e.url) ||
                               !Wh(t.queryParams, e.queryParams);
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !Ld(t, e) || !Wh(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !Ld(t, e)
                      }
                    }(a, o, o.routeConfig.runGuardsAndResolvers);
                    c ? r.canActivateChecks.push(new lp(i))
                      : (o.data = a.data, o._resolvedData = a._resolvedData),
                        t(e, n, o.component ? l ? l.children : null : s, i, r),
                        c &&
                            r.canDeactivateChecks.push(new cp(
                                l && l.outlet && l.outlet.component || null, a))
                  } else
                    a && dp(n, l, r), r.canActivateChecks.push(new lp(i)),
                        t(e, null, o.component ? l ? l.children : null : s, i,
                          r)
                }(e, o[e.value.outlet], s, i.concat([ e.value ]), r),
                delete o[e.value.outlet]
              }),
                     Zh(o, (t, e) => dp(t, s.getContext(e), r)), r
            }(s, e ? e._root : null, n, [ s.value ])
          }
          function hp(t, e, n) {
            const s = function(t) {
              if (!t)
                return null;
              for (let e = t.parent; e; e = e.parent) {
                const t = e.routeConfig;
                if (t && t._loadedConfig)
                  return t._loadedConfig
              }
              return null
            }(e);
            return (s ? s.module.injector : n).get(t)
          }
          function dp(t, e, n) {
            const s = Sd(t), i = t.value;
            Zh(s, (t, s) => {dp(
                      t, i.component ? e ? e.children.getContext(s) : null : e,
                      n)}),
                n.canDeactivateChecks.push(
                    new cp(i.component && e && e.outlet && e.outlet.isActivated
                               ? e.outlet.component
                               : null,
                           i))
          }
          function pp(t, e) { return null !== t && e && e(new jh(t)), Iu(!0) }
          function fp(t, e) { return null !== t && e && e(new Fh(t)), Iu(!0) }
          function mp(t, e, n) {
            const s = e.routeConfig ? e.routeConfig.canActivate : null;
            return s && 0 !== s.length
                       ? Iu(s.map(s => Hu(() => {
                                    const i = hp(s, e, n);
                                    let r;
                                    if (function(t) {
                                          return t && Qd(t.canActivate)
                                        }(i))
                                      r = Yh(i.canActivate(e, t));
                                    else {
                                      if (!Qd(i))
                                        throw new Error(
                                            "Invalid CanActivate guard");
                                      r = Yh(i(e, t))
                                    }
                                    return r.pipe(yh())
                                  })))
                             .pipe(Yd())
                       : Iu(!0)
          }
          function gp(t, e, n) {
            const s = e[e.length - 1],
                  i = e.slice(0, e.length - 1)
                          .reverse()
                          .map(t => function(t) {
                            const e = t.routeConfig
                                          ? t.routeConfig.canActivateChild
                                          : null;
                            return e && 0 !== e.length ? {node : t, guards : e}
                                                       : null
                          }(t))
                          .filter(t => null !== t)
                          .map(
                              e => Hu(
                                  () =>
                                      Iu(e.guards.map(i => {
                                        const r = hp(i, e.node, n);
                                        let o;
                                        if (function(t) {
                                              return t && Qd(t.canActivateChild)
                                            }(r))
                                          o = Yh(r.canActivateChild(s, t));
                                        else {
                                          if (!Qd(r))
                                            throw new Error(
                                                "Invalid CanActivateChild guard");
                                          o = Yh(r(s, t))
                                        }
                                        return o.pipe(yh())
                                      })).pipe(Yd())));
            return Iu(i).pipe(Yd())
          }
          class yp {}
          class _p {
            constructor(t, e, n, s, i, r) {
              this.rootComponentType = t, this.config = e, this.urlTree = n,
              this.url = s, this.paramsInheritanceStrategy = i,
              this.relativeLinkResolution = r
            }
            recognize() {
              try {
                const t = wp(this.urlTree.root, [], [], this.config,
                             this.relativeLinkResolution)
                              .segmentGroup,
                      e = this.processSegmentGroup(this.config, t, Hh),
                      n = new Ad([], Object.freeze({}),
                                 Object.freeze(Object.assign(
                                     {}, this.urlTree.queryParams)),
                                 this.urlTree.fragment, {}, Hh,
                                 this.rootComponentType, null,
                                 this.urlTree.root, -1, {}),
                      s = new xd(n, e), i = new Id(this.url, s);
                return this.inheritParamsAndData(i._root), Iu(i)
              } catch (t) {
                return new _(e => e.error(t))
              }
            }
            inheritParamsAndData(t) {
              const e = t.value, n = Td(e, this.paramsInheritanceStrategy);
              e.params = Object.freeze(n.params),
              e.data = Object.freeze(n.data),
              t.children.forEach(t => this.inheritParamsAndData(t))
            }
            processSegmentGroup(t, e, n) {
              return 0 === e.segments.length && e.hasChildren()
                         ? this.processChildren(t, e)
                         : this.processSegment(t, e, e.segments, n)
            }
            processChildren(t, e) {
              const n = sd(e, (e, n) => this.processSegmentGroup(t, e, n));
              return function(t) {
                const e = {};
                t.forEach(t => {
                  const n = e[t.value.outlet];
                  if (n) {
                    const e = n.url.map(t => t.toString()).join("/"),
                          s = t.value.url.map(t => t.toString()).join("/");
                    throw new Error(
                        `Two segments cannot have the same outlet name: '${
                            e}' and '${s}'.`)
                  }
                  e[t.value.outlet] = t.value
                })
              }(n),
                     n.sort((t, e) => t.value.outlet === Hh
                                          ? -1
                                          : e.value.outlet === Hh
                                                ? 1
                                                : t.value.outlet.localeCompare(
                                                      e.value.outlet)),
                     n
            }
            processSegment(t, e, n, s) {
              for (const r of t)
                try {
                  return this.processSegmentAgainstRoute(r, e, n, s)
                } catch (i) {
                  if (!(i instanceof yp))
                    throw i
                }
              if (this.noLeftoversInUrl(e, n, s))
                return [];
              throw new yp
            }
            noLeftoversInUrl(t, e, n) {
              return 0 === e.length && !t.children[n]
            }
            processSegmentAgainstRoute(t, e, n, s) {
              if (t.redirectTo)
                throw new yp;
              if ((t.outlet || Hh) !== s)
                throw new yp;
              let i, r = [], o = [];
              if ("**" === t.path) {
                const r = n.length > 0 ? Kh(n).parameters : {};
                i = new Ad(
                    n, r,
                    Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                    this.urlTree.fragment, Ep(t), s, t.component, t, vp(e),
                    bp(e) + n.length, Cp(t))
              } else {
                const a = function(t, e, n) {
                  if ("" === e.path) {
                    if ("full" === e.pathMatch &&
                        (t.hasChildren() || n.length > 0))
                      throw new yp;
                    return {
                      consumedSegments: [], lastChild: 0, parameters: {}
                    }
                  }
                  const s = (e.matcher || qh)(n, t, e);
                  if (!s)
                    throw new yp;
                  const i = {};
                  Zh(s.posParams, (t, e) => {i[e] = t.path});
                  const r =
                      s.consumed.length > 0
                          ? Object.assign(
                                Object.assign({}, i),
                                s.consumed[s.consumed.length - 1].parameters)
                          : i;
                  return {
                    consumedSegments: s.consumed, lastChild: s.consumed.length,
                        parameters: r
                  }
                }(e, t, n);
                r = a.consumedSegments, o = n.slice(a.lastChild),
                i = new Ad(
                    r, a.parameters,
                    Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                    this.urlTree.fragment, Ep(t), s, t.component, t, vp(e),
                    bp(e) + r.length, Cp(t))
              }
              const a = function(t) {
                return t.children ? t.children
                                  : t.loadChildren ? t._loadedConfig.routes : []
              }(t), {segmentGroup : l,
                     slicedSegments :
                         c} = wp(e, r, o, a, this.relativeLinkResolution);
              if (0 === c.length && l.hasChildren()) {
                const t = this.processChildren(a, l);
                return [ new xd(i, t) ]
              }
              if (0 === a.length && 0 === c.length)
                return [ new xd(i, []) ];
              const u = this.processSegment(a, l, c, Hh);
              return [ new xd(i, u) ]
            }
          }
          function vp(t) {
            let e = t;
            for (; e._sourceSegment;)
              e = e._sourceSegment;
            return e
          }
          function bp(t) {
            let e = t, n = e._segmentIndexShift ? e._segmentIndexShift : 0;
            for (; e._sourceSegment;)
              e = e._sourceSegment,
              n += e._segmentIndexShift ? e._segmentIndexShift : 0;
            return n - 1
          }
          function wp(t, e, n, s, i) {
            if (n.length > 0 && function(t, e, n) {
                  return n.some(n => xp(t, e, n) && Sp(n) !== Hh)
                }(t, n, s)) {
              const i = new td(e, function(t, e, n, s) {
                const i = {};
                i.primary = s, s._sourceSegment = t,
                s._segmentIndexShift = e.length;
                for (const r of n)
                  if ("" === r.path && Sp(r) !== Hh) {
                    const n = new td([], {});
                    n._sourceSegment = t, n._segmentIndexShift = e.length,
                    i[Sp(r)] = n
                  }
                return i
              }(t, e, s, new td(n, t.children)));
              return i._sourceSegment = t, i._segmentIndexShift = e.length, {
                segmentGroup: i, slicedSegments: []
              }
            }
            if (0 === n.length &&
                function(t, e, n) { return n.some(n => xp(t, e, n)) }(t, n,
                                                                      s)) {
              const r = new td(t.segments, function(t, e, n, s, i, r) {
                const o = {};
                for (const a of s)
                  if (xp(t, n, a) && !i[Sp(a)]) {
                    const n = new td([], {});
                    n._sourceSegment = t,
                    n._segmentIndexShift =
                        "legacy" === r ? t.segments.length : e.length,
                    o[Sp(a)] = n
                  }
                return Object.assign(Object.assign({}, i), o)
              }(t, e, n, s, t.children, i));
              return r._sourceSegment = t, r._segmentIndexShift = e.length, {
                segmentGroup: r, slicedSegments: n
              }
            }
            const r = new td(t.segments, t.children);
            return r._sourceSegment = t, r._segmentIndexShift = e.length, {
              segmentGroup: r, slicedSegments: n
            }
          }
          function xp(t, e, n) {
            return (!(t.hasChildren() || e.length > 0) ||
                    "full" !== n.pathMatch) &&
                   "" === n.path && void 0 === n.redirectTo
          }
          function Sp(t) { return t.outlet || Hh }
          function Ep(t) {
            return t.data || {}
          }
          function Cp(t) {
            return t.resolve || {}
          }
          function kp(t) {
            return function(e) {
              return e.pipe(sh(e => {
                const n = t(e);
                return n ? F(n).pipe(k(() => e)) : F([ e ])
              }))
            }
          }
          class Tp extends class {
            shouldDetach(t) { return !1 }
            store(t, e) {}
            shouldAttach(t) { return !1 }
            retrieve(t) { return null }
            shouldReuseRoute(t, e) { return t.routeConfig === e.routeConfig }
          }
          {}
          let Ap = (() => {
            class t {} return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275cmp = me({
              type : t,
              selectors : [ [ "ng-component" ] ],
              decls : 1,
              vars : 0,
              template : function(t, e) { 1&t && Io(0, "router-outlet") },
              directives : function() { return [ Up ] },
              encapsulation : 2
            }),
            t
          })();
          function Ip(t, e = "") {
            for (let n = 0; n < t.length; n++) {
              const s = t[n];
              Rp(s, Op(e, s))
            }
          }
          function Rp(t, e) {
            if (!t)
              throw new Error(`\n      Invalid configuration of route '${
                  e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `);
            if (Array.isArray(t))
              throw new Error(`Invalid configuration of route '${
                  e}': Array cannot be specified`);
            if (!t.component && !t.children && !t.loadChildren && t.outlet &&
                t.outlet !== Hh)
              throw new Error(`Invalid configuration of route '${
                  e}': a componentless route without children or loadChildren cannot have a named outlet set`);
            if (t.redirectTo && t.children)
              throw new Error(`Invalid configuration of route '${
                  e}': redirectTo and children cannot be used together`);
            if (t.redirectTo && t.loadChildren)
              throw new Error(`Invalid configuration of route '${
                  e}': redirectTo and loadChildren cannot be used together`);
            if (t.children && t.loadChildren)
              throw new Error(`Invalid configuration of route '${
                  e}': children and loadChildren cannot be used together`);
            if (t.redirectTo && t.component)
              throw new Error(`Invalid configuration of route '${
                  e}': redirectTo and component cannot be used together`);
            if (t.path && t.matcher)
              throw new Error(`Invalid configuration of route '${
                  e}': path and matcher cannot be used together`);
            if (void 0 === t.redirectTo && !t.component && !t.children &&
                !t.loadChildren)
              throw new Error(`Invalid configuration of route '${
                  e}'. One of the following must be provided: component, redirectTo, children or loadChildren`);
            if (void 0 === t.path && void 0 === t.matcher)
              throw new Error(`Invalid configuration of route '${
                  e}': routes must have either a path or a matcher specified`);
            if ("string" == typeof t.path && "/" === t.path.charAt(0))
              throw new Error(`Invalid configuration of route '${
                  e}': path cannot start with a slash`);
            if ("" === t.path && void 0 !== t.redirectTo &&
                void 0 === t.pathMatch)
              throw new Error(`Invalid configuration of route '{path: "${
                  e}", redirectTo: "${
                  t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`);
            if (void 0 !== t.pathMatch && "full" !== t.pathMatch &&
                "prefix" !== t.pathMatch)
              throw new Error(`Invalid configuration of route '${
                  e}': pathMatch can only be set to 'prefix' or 'full'`);
            t.children && Ip(t.children, e)
          }
          function Op(t, e) {
            return e ? t || e.path
                           ? t && !e.path
                                 ? t + "/"
                                 : !t && e.path ? e.path : `${t}/${e.path}`
                           : ""
                     : t
          }
          function Pp(t) {
            const e = t.children && t.children.map(Pp),
                  n = e ? Object.assign(Object.assign({}, t), {children : e})
                        : Object.assign({}, t);
            return !n.component && (e || n.loadChildren) && n.outlet &&
                       n.outlet !== Hh && (n.component = Ap),
                   n
          }
          const Lp = new Vt("ROUTES");
          class Dp {
            constructor(t, e, n, s) {
              this.loader = t, this.compiler = e, this.onLoadStartListener = n,
              this.onLoadEndListener = s
            }
            load(t, e) {
              return this.onLoadStartListener && this.onLoadStartListener(e),
                     this.loadModuleFactory(e.loadChildren).pipe(k(n => {
                       this.onLoadEndListener && this.onLoadEndListener(e);
                       const s = n.create(t);
                       return new Gd(Qh(s.injector.get(Lp)).map(Pp), s)
                     }))
            }
            loadModuleFactory(t) {
              return "string" == typeof t
                         ? F(this.loader.load(t))
                         : Yh(t()).pipe(
                               B(t => t instanceof ne
                                          ? Iu(t)
                                          : F(this.compiler.compileModuleAsync(
                                                t))))
            }
          }
          class Np {
            constructor() {
              this.outlet = null, this.route = null, this.resolver = null,
              this.children = new Fp, this.attachRef = null
            }
          }
          class Fp {
            constructor() { this.contexts = new Map }
            onChildOutletCreated(t, e) {
              const n = this.getOrCreateContext(t);
              n.outlet = e, this.contexts.set(t, n)
            }
            onChildOutletDestroyed(t) {
              const e = this.getContext(t);
              e && (e.outlet = null)
            }
            onOutletDeactivated() {
              const t = this.contexts;
              return this.contexts = new Map, t
            }
            onOutletReAttached(t) { this.contexts = t }
            getOrCreateContext(t) {
              let e = this.getContext(t);
              return e || (e = new Np, this.contexts.set(t, e)), e
            }
            getContext(t) { return this.contexts.get(t) || null }
          }
          class Mp {
            shouldProcessUrl(t) { return !0 }
            extract(t) { return t }
            merge(t, e) { return t }
          }
          function jp(t) { throw t }
          function Vp(t, e, n) { return e.parse("/") }
          function Bp(t, e) { return Iu(null) }
          let Hp = (() => {
            class t {
              constructor(t, e, n, s, i, r, o, a) {
                this.rootComponentType = t, this.urlSerializer = e,
                this.rootContexts = n, this.location = s, this.config = a,
                this.lastSuccessfulNavigation = null,
                this.currentNavigation = null,
                this.lastLocationChangeInfo = null, this.navigationId = 0,
                this.isNgZoneEnabled = !1, this.events = new S,
                this.errorHandler = jp, this.malformedUriErrorHandler = Vp,
                this.navigated = !1, this.lastSuccessfulId = -1, this.hooks = {
                  beforePreactivation : Bp,
                  afterPreactivation : Bp
                },
                this.urlHandlingStrategy = new Mp,
                this.routeReuseStrategy = new Tp,
                this.onSameUrlNavigation = "ignore",
                this.paramsInheritanceStrategy = "emptyOnly",
                this.urlUpdateStrategy = "deferred",
                this.relativeLinkResolution = "legacy",
                this.ngModule = i.get(ee), this.console = i.get(Sl);
                const l = i.get(Fl);
                this.isNgZoneEnabled = l instanceof Fl, this.resetConfig(a),
                this.currentUrlTree = new Jh(new td([], {}), {}, null),
                this.rawUrlTree = this.currentUrlTree,
                this.browserUrlTree = this.currentUrlTree,
                this.configLoader =
                    new Dp(r, o, t => this.triggerEvent(new Dh(t)),
                           t => this.triggerEvent(new Nh(t))),
                this.routerState =
                    Cd(this.currentUrlTree, this.rootComponentType),
                this.transitions = new Ru({
                  id : 0,
                  currentUrlTree : this.currentUrlTree,
                  currentRawUrl : this.currentUrlTree,
                  extractedUrl :
                      this.urlHandlingStrategy.extract(this.currentUrlTree),
                  urlAfterRedirects :
                      this.urlHandlingStrategy.extract(this.currentUrlTree),
                  rawUrl : this.currentUrlTree,
                  extras : {},
                  resolve : null,
                  reject : null,
                  promise : Promise.resolve(!0),
                  source : "imperative",
                  restoredState : null,
                  currentSnapshot : this.routerState.snapshot,
                  targetSnapshot : null,
                  currentRouterState : this.routerState,
                  targetRouterState : null,
                  guards : {canActivateChecks : [], canDeactivateChecks : []},
                  guardsResult : null
                }),
                this.navigations = this.setupNavigations(this.transitions),
                this.processNavigations()
              }
              setupNavigations(t) {
                const e = this.events;
                return t.pipe(
                    zu(t => 0 !== t.id),
                    k(t => Object.assign(Object.assign({}, t), {
                      extractedUrl : this.urlHandlingStrategy.extract(t.rawUrl)
                    })),
                    sh(t => {
                      let n = !1, s = !1;
                      return Iu(t).pipe(
                          vh(t => {
                            this.currentNavigation =
                            {
                              id: t.id, initialUrl: t.currentRawUrl,
                                  extractedUrl: t.extractedUrl,
                                  trigger: t.source, extras: t.extras,
                                  previousNavigation:
                                          this.lastSuccessfulNavigation
                                      ? Object.assign(
                                            Object.assign(
                                                {},
                                                this.lastSuccessfulNavigation),
                                            {previousNavigation : null})
                                      : null
                            }
                          }),
                          sh(t => {
                            const n = !this.navigated ||
                                      t.extractedUrl.toString() !==
                                          this.browserUrlTree.toString();
                            if (("reload" === this.onSameUrlNavigation || n) &&
                                this.urlHandlingStrategy.shouldProcessUrl(
                                    t.rawUrl))
                              return Iu(t).pipe(
                                  sh(t => {
                                    const n = this.transitions.getValue();
                                    return e.next(new Ch(t.id,
                                                         this.serializeUrl(
                                                             t.extractedUrl),
                                                         t.source,
                                                         t.restoredState)),
                                           n !== this.transitions.getValue()
                                               ? Vu
                                               : [ t ]
                                  }),
                                  sh(t => Promise.resolve(t)),
                                  (s = this.ngModule.injector,
                                   i = this.configLoader,
                                   r = this.urlSerializer, o = this.config,
                                   function(t) {
                                     return t.pipe(sh(
                                         t => function(t, e, n, s, i) {
                                           return new sp(t, e, n, s, i).apply()
                                         }(s, i, r, t.extractedUrl, o)
                                                  .pipe(k(
                                                      e => Object.assign(
                                                          Object.assign({}, t),
                                                          {
                                                            urlAfterRedirects :
                                                                e
                                                          })))))
                                   }),
                                  vh(t => {
                                         this.currentNavigation = Object.assign(
                                             Object.assign(
                                                 {}, this.currentNavigation),
                                             {finalUrl :
                                                  t.urlAfterRedirects})}),
                                  function(t, e, n, s, i) {
                                    return function(r) {
                                      return r.pipe(B(
                                          r => function(t, e, n, s,
                                                        i = "emptyOnly",
                                                        r = "legacy") {
                                            return new _p(t, e, n, s, i, r)
                                                .recognize()
                                          }(t, e, r.urlAfterRedirects,
                                            n(r.urlAfterRedirects), s, i)
                                                   .pipe(k(
                                                       t => Object.assign(
                                                           Object.assign({}, r),
                                                           {
                                                             targetSnapshot : t
                                                           })))))
                                    }
                                  }(this.rootComponentType, this.config,
                                    t => this.serializeUrl(t),
                                    this.paramsInheritanceStrategy,
                                    this.relativeLinkResolution),
                                  vh(t => {"eager" === this.urlUpdateStrategy &&
                                           (t.extras.skipLocationChange ||
                                                this.setBrowserUrl(
                                                    t.urlAfterRedirects,
                                                    !!t.extras.replaceUrl, t.id,
                                                    t.extras.state),
                                            this.browserUrlTree =
                                                t.urlAfterRedirects)}),
                                  vh(t => {
                                    const n = new Ih(
                                        t.id, this.serializeUrl(t.extractedUrl),
                                        this.serializeUrl(t.urlAfterRedirects),
                                        t.targetSnapshot);
                                    e.next(n)
                                  }));
                            var s, i, r, o;
                            if (n && this.rawUrlTree &&
                                this.urlHandlingStrategy.shouldProcessUrl(
                                    this.rawUrlTree)) {
                              const {
                                id : n,
                                extractedUrl : s,
                                source : i,
                                restoredState : r,
                                extras : o
                              } = t,
                             a = new Ch(n, this.serializeUrl(s), i, r);
                              e.next(a);
                              const l = Cd(s, this.rootComponentType).snapshot;
                              return Iu(Object.assign(Object.assign({}, t), {
                                targetSnapshot : l,
                                urlAfterRedirects : s,
                                extras : Object.assign(
                                    Object.assign({}, o),
                                    {skipLocationChange : !1, replaceUrl : !1})
                              }))
                            }
                            return this.rawUrlTree = t.rawUrl,
                                   this.browserUrlTree = t.urlAfterRedirects,
                                   t.resolve(null), Vu
                          }),
                          kp(t => {
                            const {
                              targetSnapshot : e,
                              id : n,
                              extractedUrl : s,
                              rawUrl : i,
                              extras : {skipLocationChange : r, replaceUrl : o}
                            } = t;
                            return this.hooks.beforePreactivation(e, {
                              navigationId : n,
                              appliedUrlTree : s,
                              rawUrlTree : i,
                              skipLocationChange : !!r,
                              replaceUrl : !!o
                            })
                          }),
                          vh(t => {
                            const e =
                                new Rh(t.id, this.serializeUrl(t.extractedUrl),
                                       this.serializeUrl(t.urlAfterRedirects),
                                       t.targetSnapshot);
                            this.triggerEvent(e)
                          }),
                          k(t => Object.assign(Object.assign({}, t), {
                            guards : up(t.targetSnapshot, t.currentSnapshot,
                                        this.rootContexts)
                          })),
                          function(t, e) {
                            return function(n) {
                              return n.pipe(B(n => {
                                const {
                                  targetSnapshot : s,
                                  currentSnapshot : i,
                                  guards : {
                                    canActivateChecks : r,
                                    canDeactivateChecks : o
                                  }
                                } = n;
                                return 0===o.length&&0===r.length?Iu(Object.assign(Object.assign({},n),{guardsResult:!0})):function(t,e,n,s){return F(t).pipe(B(t=>function(t,e,n,s,i){const r=e&&e.routeConfig?e.routeConfig.canDeactivate:null;return r&&0!==r.length?Iu(r.map(r=>{const o=hp(r,e,i);let a;if(function(t){return t&&Qd(t.canDeactivate)}(o))a=Yh(o.canDeactivate(t,e,n,s));else{if(!Qd(o))throw new Error("Invalid CanDeactivate guard");a=Yh(o(t,e,n,s))}return a.pipe(yh())})).pipe(Yd()):Iu(!0)}(t.component,t.route,n,e,s)),yh(t=>!0!==t,!0))}(o,s,i,t).pipe(B(n=>n&&"boolean"==typeof n?function(t,e,n,s){return F(e).pipe(gh(e=>F([fp(e.route.parent,s),pp(e.route,s),gp(t,e.path,n),mp(t,e.route,n)]).pipe(Uu(),yh(t=>!0!==t,!0))),yh(t=>!0!==t,!0))}(s,r,t,e):Iu(n)),k(t=>Object.assign(Object.assign({},n),{guardsResult:t})))
                              }))
                            }
                          }(this.ngModule.injector, t => this.triggerEvent(t)),
                          vh(t => {
                            if (Kd(t.guardsResult)) {
                              const e = $h(`Redirecting to "${
                                  this.serializeUrl(t.guardsResult)}"`);
                              throw e.url = t.guardsResult, e
                            }
                          }),
                          vh(t => {
                            const e =
                                new Oh(t.id, this.serializeUrl(t.extractedUrl),
                                       this.serializeUrl(t.urlAfterRedirects),
                                       t.targetSnapshot, !!t.guardsResult);
                            this.triggerEvent(e)
                          }),
                          zu(t => {
                            if (!t.guardsResult) {
                              this.resetUrlToCurrentUrlTree();
                              const n = new Th(
                                  t.id, this.serializeUrl(t.extractedUrl), "");
                              return e.next(n), t.resolve(!1), !1
                            }
                            return !0
                          }),
                          kp(t => {
                            if (t.guards.canActivateChecks.length)
                              return Iu(t).pipe(
                                  vh(t => {
                                    const e = new Ph(
                                        t.id, this.serializeUrl(t.extractedUrl),
                                        this.serializeUrl(t.urlAfterRedirects),
                                        t.targetSnapshot);
                                    this.triggerEvent(e)
                                  }),
                                  sh(t => {
                                    let n = !1;
                                    return Iu(t).pipe(
                                        (s = this.paramsInheritanceStrategy,
                                         i = this.ngModule.injector,
                                         function(t) {
                                           return t.pipe(B(t => {
                                             const {
                                               targetSnapshot : e,
                                               guards : {canActivateChecks : n}
                                             } = t;
                                             if (!n.length)
                                               return Iu(t);
                                             let r = 0;
                                             return F(n).pipe(
                                                 gh(t => function(t, e, n, s) {
                                                   return function(t, e, n, s) {
                                                     const i = Object.keys(t);
                                                     if (0 === i.length)
                                                       return Iu({});
                                                     const r = {};
                                                     return F(i).pipe(
                                                         B(i => function(t, e,
                                                                         n, s) {
                                                           const i =
                                                               hp(t, e, s);
                                                           return Yh(
                                                               i.resolve
                                                                   ? i.resolve(
                                                                         e, n)
                                                                   : i(e, n))
                                                         }(t[i], e, n, s)
                                                                    .pipe(vh(
                                                                        t => {
                                                                            r[i] =
                                                                                t}))),
                                                         Gu(1),
                                                         B(() =>
                                                               Object.keys(
                                                                         r).length ===
                                                                       i.length
                                                                   ? Iu(r)
                                                                   : Vu))
                                                   }(t._resolve, t, e, s)
                                                       .pipe(k(
                                                           e => (
                                                               t._resolvedData =
                                                                   e,
                                                               t.data = Object.assign(
                                                                   Object.assign(
                                                                       {},
                                                                       t.data),
                                                                   Td(t, n)
                                                                       .resolve),
                                                               null)))
                                                 }(t.route, e, s, i)),
                                                 vh(() => r++), Gu(1),
                                                 B(e => r === n.length ? Iu(t)
                                                                       : Vu))
                                           }))
                                         }),
                                        vh({
                                          next : () => n = !0,
                                          complete : () => {
                                            if (!n) {
                                              const n = new Th(
                                                  t.id,
                                                  this.serializeUrl(
                                                      t.extractedUrl),
                                                  "At least one route resolver didn't emit any value.");
                                              e.next(n), t.resolve(!1)
                                            }
                                          }
                                        }));
                                    var s, i
                                  }),
                                  vh(t => {
                                    const e = new Lh(
                                        t.id, this.serializeUrl(t.extractedUrl),
                                        this.serializeUrl(t.urlAfterRedirects),
                                        t.targetSnapshot);
                                    this.triggerEvent(e)
                                  }))
                          }),
                          kp(t => {
                            const {
                              targetSnapshot : e,
                              id : n,
                              extractedUrl : s,
                              rawUrl : i,
                              extras : {skipLocationChange : r, replaceUrl : o}
                            } = t;
                            return this.hooks.afterPreactivation(e, {
                              navigationId : n,
                              appliedUrlTree : s,
                              rawUrlTree : i,
                              skipLocationChange : !!r,
                              replaceUrl : !!o
                            })
                          }),
                          k(t => {
                            const e =
                                function(t, e, n) {
                              const s = function t(e, n, s) {
                                if (s && e.shouldReuseRoute(n.value,
                                                            s.value.snapshot)) {
                                  const i = s.value;
                                  i._futureSnapshot = n.value;
                                  const r = function(e, n, s) {
                                    return n.children.map(n => {
                                      for (const i of s.children)
                                        if (e.shouldReuseRoute(i.value.snapshot,
                                                               n.value))
                                          return t(e, n, i);
                                      return t(e, n)
                                    })
                                  }(e, n, s);
                                  return new xd(i, r)
                                }
                                {
                                  const s = e.retrieve(n.value);
                                  if (s) {
                                    const t = s.route;
                                    return function t(e, n) {
                                      if (e.value.routeConfig !==
                                          n.value.routeConfig)
                                        throw new Error(
                                            "Cannot reattach ActivatedRouteSnapshot created from a different route");
                                      if (e.children.length !==
                                          n.children.length)
                                        throw new Error(
                                            "Cannot reattach ActivatedRouteSnapshot with a different number of children");
                                      n.value._futureSnapshot = e.value;
                                      for (let s = 0; s < e.children.length;
                                           ++s)
                                        t(e.children[s], n.children[s])
                                    }(n, t),
                                           t
                                  }
                                  {
                                    const s = new kd(
                                        new Ru((i = n.value).url),
                                        new Ru(i.params), new Ru(i.queryParams),
                                        new Ru(i.fragment), new Ru(i.data),
                                        i.outlet, i.component, i),
                                          r = n.children.map(n => t(e, n));
                                    return new xd(s, r)
                                  }
                                }
                                var i
                              }(t, e._root, n ? n._root : void 0);
                              return new Ed(s, e)
                            }(this.routeReuseStrategy, t.targetSnapshot,
                                t.currentRouterState);
                            return Object.assign(Object.assign({}, t),
                                                 {targetRouterState : e})
                          }),
                          vh(t => {
                            this.currentUrlTree = t.urlAfterRedirects,
                            this.rawUrlTree = this.urlHandlingStrategy.merge(
                                this.currentUrlTree, t.rawUrl),
                            this.routerState = t.targetRouterState,
                            "deferred" === this.urlUpdateStrategy &&
                                (t.extras.skipLocationChange ||
                                     this.setBrowserUrl(this.rawUrlTree,
                                                        !!t.extras.replaceUrl,
                                                        t.id, t.extras.state),
                                 this.browserUrlTree = t.urlAfterRedirects)
                          }),
                          (r = this.rootContexts, o = this.routeReuseStrategy,
                           a = t => this.triggerEvent(t),
                           k(t => (new qd(o, t.targetRouterState,
                                          t.currentRouterState, a)
                                       .activate(r),
                                   t))),
                          vh({next() { n = !0 }, complete() { n = !0 }}),
                          (i = () => {
                            if (!n && !s) {
                              this.resetUrlToCurrentUrlTree();
                              const n = new Th(
                                  t.id, this.serializeUrl(t.extractedUrl),
                                  `Navigation ID ${
                                      t.id} is not equal to the current navigation id ${
                                      this.navigationId}`);
                              e.next(n), t.resolve(!1)
                            }
                            this.currentNavigation = null
                          }, t => t.lift(new xh(i))), ph(n => {
                            if (s = !0,
                                (i = n) && i.ngNavigationCancelingError) {
                              const s = Kd(n.url);
                              s || (this.navigated = !0,
                                    this.resetStateAndUrl(t.currentRouterState,
                                                          t.currentUrlTree,
                                                          t.rawUrl));
                              const i = new Th(
                                  t.id, this.serializeUrl(t.extractedUrl),
                                  n.message);
                              e.next(i), s ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                    n.url, this.rawUrlTree);
                                return this.scheduleNavigation(
                                    e, "imperative", null, {
                                      skipLocationChange :
                                          t.extras.skipLocationChange,
                                      replaceUrl :
                                          "eager" === this.urlUpdateStrategy
                                    },
                                    {
                                      resolve : t.resolve,
                                      reject : t.reject,
                                      promise : t.promise
                                    })
                              }, 0) : t.resolve(!1)
                            } else {
                              this.resetStateAndUrl(t.currentRouterState,
                                                    t.currentUrlTree, t.rawUrl);
                              const s = new Ah(
                                  t.id, this.serializeUrl(t.extractedUrl), n);
                              e.next(s);
                              try {
                                t.resolve(this.errorHandler(n))
                              } catch (r) {
                                t.reject(r)
                              }
                            }
                            var i;
                            return Vu
                          }));
                      var i, r, o, a
                    }))
              }
              resetRootComponentType(t) {
                this.rootComponentType = t,
                this.routerState.root.component = this.rootComponentType
              }
              getTransition() {
                const t = this.transitions.value;
                return t.urlAfterRedirects = this.browserUrlTree, t
              }
              setTransition(t) {
                this.transitions.next(
                    Object.assign(Object.assign({}, this.getTransition()), t))
              }
              initialNavigation() {
                this.setUpLocationChangeListener(),
                    0 === this.navigationId &&
                        this.navigateByUrl(this.location.path(!0),
                                           {replaceUrl : !0})
              }
              setUpLocationChangeListener() {
                this.locationSubscription ||
                    (this.locationSubscription = this.location.subscribe(t => {
                      const e = this.extractLocationChangeInfoFromEvent(t);
                      this.shouldScheduleNavigation(this.lastLocationChangeInfo,
                                                    e) &&
                          setTimeout(
                              () => {
                                const {source : t,
                                       state : n,
                                       urlTree : s} = e,
                                                 i = {replaceUrl : !0};
                                if (n) {
                                  const t = Object.assign({}, n);
                                  delete t.navigationId,
                                      0 !== Object.keys(t).length &&
                                          (i.state = t)
                                }
                                this.scheduleNavigation(s, t, n, i)
                              },
                              0),
                          this.lastLocationChangeInfo = e
                    }))
              }
              extractLocationChangeInfoFromEvent(t) {
                var e;
                return {
                  source: "popstate" === t.type ? "popstate" : "hashchange",
                      urlTree: this.parseUrl(t.url),
                      state: (null === (e = t.state) || void 0 === e
                                  ? void 0
                                  : e.navigationId)
                          ? t.state
                          : null,
                      transitionId: this.getTransition().id
                }
              }
              shouldScheduleNavigation(t, e) {
                if (!t)
                  return !0;
                const n = e.urlTree.toString() === t.urlTree.toString();
                return !(
                    e.transitionId === t.transitionId && n &&
                    ("hashchange" === e.source && "popstate" === t.source ||
                     "popstate" === e.source && "hashchange" === t.source))
              }
              get url() { return this.serializeUrl(this.currentUrlTree) }
              getCurrentNavigation() { return this.currentNavigation }
              triggerEvent(t) { this.events.next(t) }
              resetConfig(t) {
                Ip(t), this.config = t.map(Pp), this.navigated = !1,
                       this.lastSuccessfulId = -1
              }
              ngOnDestroy() { this.dispose() }
              dispose() {
                this.locationSubscription &&
                    (this.locationSubscription.unsubscribe(),
                     this.locationSubscription = void 0)
              }
              createUrlTree(t, e = {}) {
                const {
                  relativeTo : n,
                  queryParams : s,
                  fragment : i,
                  preserveQueryParams : r,
                  queryParamsHandling : o,
                  preserveFragment : a
                } = e;
                As() && r && console && console.warn &&
                    console.warn(
                        "preserveQueryParams is deprecated, use queryParamsHandling instead.");
                const l = n || this.routerState.root,
                      c = a ? this.currentUrlTree.fragment : i;
                let u = null;
                if (o)
                  switch (o) {
                  case "merge":
                    u = Object.assign(
                        Object.assign({}, this.currentUrlTree.queryParams), s);
                    break;
                  case "preserve":
                    u = this.currentUrlTree.queryParams;
                    break;
                  default:
                    u = s || null
                  }
                else
                  u = r ? this.currentUrlTree.queryParams : s || null;
                return null !== u && (u = this.removeEmptyProps(u)), function(
                                                                         t, e,
                                                                         n, s,
                                                                         i) {
                  if (0 === n.length)
                    return Nd(e.root, e.root, e, s, i);
                  const r = function(t) {
                    if ("string" == typeof t[0] && 1 === t.length &&
                        "/" === t[0])
                      return new Fd(!0, 0, t);
                    let e = 0, n = !1;
                    const s = t.reduce((t, s, i) => {
                      if ("object" == typeof s && null != s) {
                        if (s.outlets) {
                          const e = {};
                          return Zh(s.outlets,
                                    (t, n) => {e[n] = "string" == typeof t
                                                          ? t.split("/")
                                                          : t}),
                                 [...t, {outlets : e} ]
                        }
                        if (s.segmentPath)
                          return [...t, s.segmentPath ]
                      }
                      return "string" != typeof s
                                 ? [...t, s ]
                                 : 0 === i
                                       ? (s.split("/").forEach(
                                              (s, i) => {
                                                  0 == i && "." === s ||
                                                  (0 == i && "" === s
                                                       ? n = !0
                                                       : ".." === s
                                                             ? e++
                                                             : "" != s &&
                                                                   t.push(s))}),
                                          t)
                                       : [...t, s ]
                    }, []);
                    return new Fd(n, e, s)
                  }(n);
                  if (r.toRoot())
                    return Nd(e.root, new td([], {}), e, s, i);
                  const o =
                      function(t, e, n) {
                    if (t.isAbsolute)
                      return new Md(e.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const t = n.snapshot._urlSegment;
                      return new Md(t, t === e.root, 0)
                    }
                    const s = Dd(t.commands[0]) ? 0 : 1;
                    return function(t, e, n) {
                      let s = t, i = e, r = n;
                      for (; r > i;) {
                        if (r -= i, s = s.parent, !s)
                          throw new Error("Invalid number of '../'");
                        i = s.segments.length
                      }
                      return new Md(s, !1, i - r)
                    }(n.snapshot._urlSegment, n.snapshot._lastPathIndex + s,
                      t.numberOfDoubleDots)
                  }(r, e, t),
                        a = o.processChildren
                                ? Bd(o.segmentGroup, o.index, r.commands)
                                : Vd(o.segmentGroup, o.index, r.commands);
                  return Nd(o.segmentGroup, a, e, s, i)
                }(l, this.currentUrlTree, t, u, c)
              }
              navigateByUrl(t, e = {skipLocationChange : !1}) {
                As() && this.isNgZoneEnabled && !Fl.isInAngularZone() &&
                    this.console.warn(
                        "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?");
                const n = Kd(t) ? t : this.parseUrl(t),
                      s = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
                return this.scheduleNavigation(s, "imperative", null, e)
              }
              navigate(t, e = {skipLocationChange : !1}) {
                return function(t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(`The requested path contains ${
                          n} segment at index ${e}`)
                  }
                }(t),
                       this.navigateByUrl(this.createUrlTree(t, e), e)
              }
              serializeUrl(t) { return this.urlSerializer.serialize(t) }
              parseUrl(t) {
                let e;
                try {
                  e = this.urlSerializer.parse(t)
                } catch (n) {
                  e = this.malformedUriErrorHandler(n, this.urlSerializer, t)
                }
                return e
              }
              isActive(t, e) {
                if (Kd(t))
                  return Xh(this.currentUrlTree, t, e);
                const n = this.parseUrl(t);
                return Xh(this.currentUrlTree, n, e)
              }
              removeEmptyProps(t) {
                return Object.keys(t).reduce((e, n) => {
                  const s = t[n];
                  return null != s && (e[n] = s), e
                }, {})
              }
              processNavigations() {
                this.navigations.subscribe(
                    t => {
                      this.navigated = !0,
                      this.lastSuccessfulId = t.id,
                      this.events.next(
                          new kh(t.id, this.serializeUrl(t.extractedUrl),
                                 this.serializeUrl(this.currentUrlTree))),
                      this.lastSuccessfulNavigation = this.currentNavigation,
                      this.currentNavigation = null,
                      t.resolve(!0)
                    },
                    t => {this.console.warn("Unhandled Navigation Error: ")})
              }
              scheduleNavigation(t, e, n, s, i) {
                const r = this.getTransition(),
                      o = "imperative" !== e &&
                          "imperative" === (null == r ? void 0 : r.source),
                      a = (this.lastSuccessfulId === r.id ||
                                   this.currentNavigation
                               ? r.rawUrl
                               : r.urlAfterRedirects)
                              .toString() === t.toString();
                if (o && a)
                  return Promise.resolve(!0);
                let l, c, u;
                i ? (l = i.resolve, c = i.reject, u = i.promise)
                  : u = new Promise((t, e) => {l = t, c = e});
                const h = ++this.navigationId;
                return this.setTransition({
                  id : h,
                  source : e,
                  restoredState : n,
                  currentUrlTree : this.currentUrlTree,
                  currentRawUrl : this.rawUrlTree,
                  rawUrl : t,
                  extras : s,
                  resolve : l,
                  reject : c,
                  promise : u,
                  currentSnapshot : this.routerState.snapshot,
                  currentRouterState : this.routerState
                }),
                       u.catch(t => Promise.reject(t))
              }
              setBrowserUrl(t, e, n, s) {
                const i = this.urlSerializer.serialize(t);
                s = s || {},
                this.location.isCurrentPathEqualTo(i) || e
                    ? this.location.replaceState(
                          i, "",
                          Object.assign(Object.assign({}, s),
                                        {navigationId : n}))
                    : this.location.go(i, "",
                                       Object.assign(Object.assign({}, s),
                                                     {navigationId : n}))
              }
              resetStateAndUrl(t, e, n) {
                this.routerState = t, this.currentUrlTree = e,
                this.rawUrlTree =
                    this.urlHandlingStrategy.merge(this.currentUrlTree, n),
                this.resetUrlToCurrentUrlTree()
              }
              resetUrlToCurrentUrlTree() {
                this.location.replaceState(
                    this.urlSerializer.serialize(this.rawUrlTree), "",
                    {navigationId : this.lastSuccessfulId})
              }
            } return t.\u0275fac =
                function(e) {
                  return new (e || t)(Zt(Ur), Zt(id), Zt(Fp), Zt(Ac), Zt(so),
                                      Zt(sc), Zt(Ll), Zt(void 0))
                },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })(),
              Up = (() => {
                class t {
                  constructor(t, e, n, s, i) {
                    this.parentContexts = t, this.location = e,
                    this.resolver = n, this.changeDetector = i,
                    this.activated = null, this._activatedRoute = null,
                    this.activateEvents = new tl,
                    this.deactivateEvents = new tl, this.name = s || Hh,
                    t.onChildOutletCreated(this.name, this)
                  }
                  ngOnDestroy() {
                    this.parentContexts.onChildOutletDestroyed(this.name)
                  }
                  ngOnInit() {
                    if (!this.activated) {
                      const t = this.parentContexts.getContext(this.name);
                      t && t.route &&
                          (t.attachRef
                               ? this.attach(t.attachRef, t.route)
                               : this.activateWith(t.route, t.resolver || null))
                    }
                  }
                  get isActivated() { return !!this.activated }
                  get component() {
                    if (!this.activated)
                      throw new Error("Outlet is not activated");
                    return this.activated.instance
                  }
                  get activatedRoute() {
                    if (!this.activated)
                      throw new Error("Outlet is not activated");
                    return this._activatedRoute
                  }
                  get activatedRouteData() {
                    return this._activatedRoute
                               ? this._activatedRoute.snapshot.data
                               : {}
                  }
                  detach() {
                    if (!this.activated)
                      throw new Error("Outlet is not activated");
                    this.location.detach();
                    const t = this.activated;
                    return this.activated = null, this._activatedRoute = null, t
                  }
                  attach(t, e) {
                    this.activated = t, this._activatedRoute = e,
                    this.location.insert(t.hostView)
                  }
                  deactivate() {
                    if (this.activated) {
                      const t = this.component;
                      this.activated.destroy(), this.activated = null,
                                                this._activatedRoute = null,
                                                this.deactivateEvents.emit(t)
                    }
                  }
                  activateWith(t, e) {
                    if (this.isActivated)
                      throw new Error(
                          "Cannot activate an already activated outlet");
                    this._activatedRoute = t;
                    const n = (e = e || this.resolver)
                                  .resolveComponentFactory(
                                      t._futureSnapshot.routeConfig.component),
                          s = this.parentContexts.getOrCreateContext(this.name)
                                  .children,
                          i = new zp(t, s, this.location.injector);
                    this.activated = this.location.createComponent(
                        n, this.location.length, i),
                    this.changeDetector.markForCheck(),
                    this.activateEvents.emit(this.activated.instance)
                  }
                } return t.\u0275fac =
                    function(e) {
                      return new (e || t)(So(Fp), So(La), So(oa), Eo("name"),
                                          So(Br))
                    },
                t.\u0275dir = we({
                  type : t,
                  selectors : [ [ "router-outlet" ] ],
                  outputs : {
                    activateEvents : "activate",
                    deactivateEvents : "deactivate"
                  },
                  exportAs : [ "outlet" ]
                }),
                t
              })();
          class zp {
            constructor(t, e, n) {
              this.route = t, this.childContexts = e, this.parent = n
            }
            get(t, e) {
              return t === kd
                         ? this.route
                         : t === Fp ? this.childContexts : this.parent.get(t, e)
            }
          }
          class $p {}
          class qp {
            preload(t, e) { return Iu(null) }
          }
          let Wp = (() => {
            class t {
              constructor(t, e, n, s, i) {
                this.router = t, this.injector = s, this.preloadingStrategy = i,
                this.loader = new Dp(e, n, e => t.triggerEvent(new Dh(e)),
                                     e => t.triggerEvent(new Nh(e)))
              }
              setUpPreloading() {
                this.subscription = this.router.events
                                        .pipe(zu(t => t instanceof kh),
                                              gh(() => this.preload()))
                                        .subscribe(() => {})
              }
              preload() {
                const t = this.injector.get(ee);
                return this.processRoutes(t, this.router.config)
              }
              ngOnDestroy() {
                this.subscription && this.subscription.unsubscribe()
              }
              processRoutes(t, e) {
                const n = [];
                for (const s of e)
                  if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                    const t = s._loadedConfig;
                    n.push(this.processRoutes(t.module, t.routes))
                  } else
                    s.loadChildren && !s.canLoad
                        ? n.push(this.preloadConfig(t, s))
                        : s.children &&
                              n.push(this.processRoutes(t, s.children));
                return F(n).pipe(z(), k(t => {}))
              }
              preloadConfig(t, e) {
                return this.preloadingStrategy.preload(
                    e, () => this.loader.load(t.injector, e)
                                 .pipe(B(t => (e._loadedConfig = t,
                                               this.processRoutes(t.module,
                                                                  t.routes)))))
              }
            } return t.\u0275fac =
                function(e) {
                  return new (e || t)(Zt(Hp), Zt(sc), Zt(Ll), Zt(so), Zt($p))
                },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })(),
              Gp = (() => {
                class t {
                  constructor(t, e, n = {}) {
                    this.router = t, this.viewportScroller = e,
                    this.options = n, this.lastId = 0,
                    this.lastSource = "imperative", this.restoredId = 0,
                    this.store = {},
                    n.scrollPositionRestoration =
                        n.scrollPositionRestoration || "disabled",
                    n.anchorScrolling = n.anchorScrolling || "disabled"
                  }
                  init() {
                    "disabled" !== this.options.scrollPositionRestoration &&
                        this.viewportScroller.setHistoryScrollRestoration(
                            "manual"),
                        this.routerEventsSubscription =
                            this.createScrollEvents(),
                        this.scrollEventsSubscription =
                            this.consumeScrollEvents()
                  }
                  createScrollEvents() {
                    return this.router.events.subscribe(
                        t => {
                            t instanceof Ch
                                ? (this.store[this.lastId] =
                                       this.viewportScroller
                                           .getScrollPosition(),
                                   this.lastSource = t.navigationTrigger,
                                   this.restoredId =
                                       t.restoredState
                                           ? t.restoredState.navigationId
                                           : 0)
                                : t instanceof kh &&
                                      (this.lastId = t.id,
                                       this.scheduleScrollEvent(
                                           t, this.router
                                                  .parseUrl(t.urlAfterRedirects)
                                                  .fragment))})
                  }
                  consumeScrollEvents() {
                    return this.router.events.subscribe(
                        t => {
                            t instanceof Bh &&
                            (t.position
                                 ? "top" === this.options
                                                 .scrollPositionRestoration
                                       ? this.viewportScroller.scrollToPosition(
                                             [ 0, 0 ])
                                       : "enabled" ===
                                                 this.options
                                                     .scrollPositionRestoration &&
                                             this.viewportScroller
                                                 .scrollToPosition(t.position)
                                 : t.anchor && "enabled" ===
                                                   this.options.anchorScrolling
                                       ? this.viewportScroller.scrollToAnchor(
                                             t.anchor)
                                       : "disabled" !==
                                                 this.options
                                                     .scrollPositionRestoration &&
                                             this.viewportScroller
                                                 .scrollToPosition([ 0, 0 ]))})
                  }
                  scheduleScrollEvent(t, e) {
                    this.router.triggerEvent(
                        new Bh(t,
                               "popstate" === this.lastSource
                                   ? this.store[this.restoredId]
                                   : null,
                               e))
                  }
                  ngOnDestroy() {
                    this.routerEventsSubscription &&
                        this.routerEventsSubscription.unsubscribe(),
                        this.scrollEventsSubscription &&
                            this.scrollEventsSubscription.unsubscribe()
                  }
                } return t.\u0275fac =
                    function(
                        e) { return new (e || t)(Zt(Hp), Zt(Zc), Zt(void 0)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
          const Qp = new Vt("ROUTER_CONFIGURATION"),
                Kp = new Vt("ROUTER_FORROOT_GUARD"), Zp = [
                  Ac, {provide : id, useClass : rd}, {
                    provide : Hp,
                    useFactory : function(t, e, n, s, i, r, o, a = {}, l, c) {
                      const u = new Hp(null, t, e, n, s, i, r, Qh(o));
                      if (l && (u.urlHandlingStrategy = l),
                          c && (u.routeReuseStrategy = c),
                          a.errorHandler && (u.errorHandler = a.errorHandler),
                          a.malformedUriErrorHandler &&
                              (u.malformedUriErrorHandler =
                                   a.malformedUriErrorHandler),
                          a.enableTracing) {
                        const t = dc();
                        u.events.subscribe(e => {
                          t.logGroup("Router Event: " + e.constructor.name),
                          t.log(e.toString()),
                          t.log(e),
                          t.logGroupEnd()
                        })
                      }
                      return a.onSameUrlNavigation &&
                                 (u.onSameUrlNavigation =
                                      a.onSameUrlNavigation),
                             a.paramsInheritanceStrategy &&
                                 (u.paramsInheritanceStrategy =
                                      a.paramsInheritanceStrategy),
                             a.urlUpdateStrategy &&
                                 (u.urlUpdateStrategy = a.urlUpdateStrategy),
                             a.relativeLinkResolution &&
                                 (u.relativeLinkResolution =
                                      a.relativeLinkResolution),
                             u
                    },
                    deps : [
                      id, Fp, Ac, so, sc, Ll, Lp, Qp, [ class {}, new rt ],
                      [ class {}, new rt ]
                    ]
                  },
                  Fp, {
                    provide : kd,
                    useFactory : function(t) { return t.routerState.root },
                    deps : [ Hp ]
                  },
                  {provide : sc, useClass : oc}, Wp, qp,
                  class {preload(t, e) { return e().pipe(ph(() => Iu(null))) }},
                  {provide : Qp, useValue : {enableTracing : !1}}
                ];
          function Yp() { return new Zl("Router", Hp) }
          let Xp = (() => {
            class t {
              constructor(t, e) {}
              static forRoot(e, n) {
                return {
                  ngModule: t, providers: [
                    Zp, nf(e), {
                      provide : Kp,
                      useFactory : ef,
                      deps : [ [ Hp, new rt, new at ] ]
                    },
                    {provide : Qp, useValue : n || {}}, {
                      provide : Sc,
                      useFactory : tf,
                      deps : [ fc, [ new it(Cc), new rt ], Qp ]
                    },
                    {provide : Gp, useFactory : Jp, deps : [ Hp, Zc, Qp ]}, {
                      provide : $p,
                      useExisting :
                          n && n.preloadingStrategy ? n.preloadingStrategy : qp
                    },
                    {provide : Zl, multi : !0, useFactory : Yp},
                    [
                      sf, {
                        provide : ml,
                        multi : !0,
                        useFactory : rf,
                        deps : [ sf ]
                      },
                      {provide : af, useFactory : of, deps : [ sf ]},
                      {provide : xl, multi : !0, useExisting : af}
                    ]
                  ]
                }
              }
              static forChild(e) {
                return { ngModule: t, providers: [ nf(e) ] }
              }
            } return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(
                  e) { return new (e || t)(Zt(Kp, 8), Zt(Hp, 8)) }
            }),
            t
          })();
          function Jp(t, e, n) {
            return n.scrollOffset && e.setOffset(n.scrollOffset),
                   new Gp(t, e, n)
          }
          function tf(t, e, n = {}) {
            return n.useHash ? new Tc(t, e) : new kc(t, e)
          }
          function ef(t) {
            if (t)
              throw new Error(
                  "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
            return "guarded"
          }
          function nf(t) {
            return [
              {provide : io, multi : !0, useValue : t},
              {provide : Lp, multi : !0, useValue : t}
            ]
          }
          let sf = (() => {
            class t {
              constructor(t) {
                this.injector = t, this.initNavigation = !1,
                this.resultOfPreactivationDone = new S
              }
              appInitializer() {
                return this.injector.get(gc, Promise.resolve(null)).then(() => {
                  let t = null;
                  const e = new Promise(e => t = e), n = this.injector.get(Hp),
                        s = this.injector.get(Qp);
                  if (this.isLegacyDisabled(s) || this.isLegacyEnabled(s))
                    t(!0);
                  else if ("disabled" === s.initialNavigation)
                    n.setUpLocationChangeListener(), t(!0);
                  else {
                    if ("enabled" !== s.initialNavigation)
                      throw new Error(`Invalid initialNavigation options: '${
                          s.initialNavigation}'`);
                    n.hooks.afterPreactivation = () =>
                        this.initNavigation ? Iu(null)
                                            : (this.initNavigation = !0, t(!0),
                                               this.resultOfPreactivationDone),
                    n.initialNavigation()
                  }
                  return e
                })
              }
              bootstrapListener(t) {
                const e = this.injector.get(Qp), n = this.injector.get(Wp),
                      s = this.injector.get(Gp), i = this.injector.get(Hp),
                      r = this.injector.get(ec);
                t === r.components[0] &&
                    (this.isLegacyEnabled(e)
                         ? i.initialNavigation()
                         : this.isLegacyDisabled(e) &&
                               i.setUpLocationChangeListener(),
                     n.setUpPreloading(), s.init(),
                     i.resetRootComponentType(r.componentTypes[0]),
                     this.resultOfPreactivationDone.next(null),
                     this.resultOfPreactivationDone.complete())
              }
              isLegacyEnabled(t) {
                return "legacy_enabled" === t.initialNavigation ||
                       !0 === t.initialNavigation ||
                       void 0 === t.initialNavigation
              }
              isLegacyDisabled(t) {
                return "legacy_disabled" === t.initialNavigation ||
                       !1 === t.initialNavigation
              }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(so)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          function rf(t) { return t.appInitializer.bind(t) }
          function of (t) { return t.bootstrapListener.bind(t) }
          const af = new Vt("Router Initializer"), lf = [];
          let cf = (() => {
            class t {} return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t) },
              imports : [ [ Xp.forRoot(lf) ], Xp ]
            }),
            t
          })();
          class uf extends h {
            constructor(t, e) { super() }
            schedule(t, e = 0) { return this }
          }
          class hf extends uf {
            constructor(t, e) {
              super(t, e), this.scheduler = t, this.work = e, this.pending = !1
            }
            schedule(t, e = 0) {
              if (this.closed)
                return this;
              this.state = t;
              const n = this.id, s = this.scheduler;
              return null != n && (this.id = this.recycleAsyncId(s, n, e)),
                     this.pending = !0, this.delay = e,
                     this.id = this.id || this.requestAsyncId(s, this.id, e),
                     this
            }
            requestAsyncId(t, e, n = 0) {
              return setInterval(t.flush.bind(t, this), n)
            }
            recycleAsyncId(t, e, n = 0) {
              if (null !== n && this.delay === n && !1 === this.pending)
                return e;
              clearInterval(e)
            }
            execute(t, e) {
              if (this.closed)
                return new Error("executing a cancelled action");
              this.pending = !1;
              const n = this._execute(t, e);
              if (n)
                return n;
              !1 === this.pending && null != this.id &&
                  (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }
            _execute(t, e) {
              let n = !1, s = void 0;
              try {
                this.work(t)
              } catch (i) {
                n = !0, s = !!i && i || new Error(i)
              }
              if (n)
                return this.unsubscribe(), s
            }
            _unsubscribe() {
              const t = this.id, e = this.scheduler, n = e.actions,
                    s = n.indexOf(this);
              this.work = null, this.state = null, this.pending = !1,
              this.scheduler = null, -1 !== s && n.splice(s, 1),
              null != t && (this.id = this.recycleAsyncId(e, t, null)),
              this.delay = null
            }
          }
          let df = (() => {
            class t {
              constructor(e, n = t.now) {
                this.SchedulerAction = e, this.now = n
              }
              schedule(t, e = 0, n) {
                return new this.SchedulerAction(this, t).schedule(n, e)
              }
            } return t.now = () => Date.now(),
            t
          })();
          class pf extends df {
            constructor(t, e = df.now) {
              super(t, () => pf.delegate && pf.delegate !== this
                                 ? pf.delegate.now()
                                 : e()),
                  this.actions = [], this.active = !1, this.scheduled = void 0
            }
            schedule(t, e = 0, n) {
              return pf.delegate && pf.delegate !== this
                         ? pf.delegate.schedule(t, e, n)
                         : super.schedule(t, e, n)
            }
            flush(t) {
              const {actions : e} = this;
              if (this.active)
                return void e.push(t);
              let n;
              this.active = !0;
              do {
                if (n = t.execute(t.state, t.delay))
                  break
              } while (t = e.shift());
              if (this.active = !1, n) {
                for (; t = e.shift();)
                  t.unsubscribe();
                throw n
              }
            }
          }
          function ff(t, e, n, i) {
            return s(n) && (i = n, n = void 0),
                   i ? ff(t, e, n).pipe(k(t => l(t) ? i(...t) : i(t)))
                     : new _(s => {
                         !function t(e, n, s, i, r) {
                           let o;
                           if (function(t) {
                                 return t &&
                                        "function" ==
                                            typeof t.addEventListener &&
                                        "function" ==
                                            typeof t.removeEventListener
                               }(e)) {
                             const t = e;
                             e.addEventListener(n, s, r),
                                 o = () => t.removeEventListener(n, s, r)
                           } else if (function(t) {
                                        return t && "function" == typeof t.on &&
                                               "function" == typeof t.off
                                      }(e)) {
                             const t = e;
                             e.on(n, s), o = () => t.off(n, s)
                           } else if (function(t) {
                                        return t &&
                                               "function" ==
                                                   typeof t.addListener &&
                                               "function" ==
                                                   typeof t.removeListener
                                      }(e)) {
                             const t = e;
                             e.addListener(n, s),
                                 o = () => t.removeListener(n, s)
                           } else {
                             if (!e || !e.length)
                               throw new TypeError("Invalid event target");
                             for (let o = 0, a = e.length; o < a; o++)
                               t(e[o], n, s, i, r)
                           }
                           i.add(o)
                         }(t, e, (function(t) {
                             s.next(arguments.length > 1
                                        ? Array.prototype.slice.call(arguments)
                                        : t)
                           }),
                           s, n)
                       })
          }
          const mf = new pf(hf);
          class gf {
            constructor(t, e) { this.dueTime = t, this.scheduler = e }
            call(t, e) {
              return e.subscribe(new yf(t, this.dueTime, this.scheduler))
            }
          }
          class yf extends f {
            constructor(t, e, n) {
              super(t), this.dueTime = e, this.scheduler = n,
                        this.debouncedSubscription = null,
                        this.lastValue = null, this.hasValue = !1
            }
            _next(t) {
              this.clearDebounce(),
                  this.lastValue = t, this.hasValue = !0,
                  this.add(this.debouncedSubscription =
                               this.scheduler.schedule(_f, this.dueTime, this))
            }
            _complete() { this.debouncedNext(), this.destination.complete() }
            debouncedNext() {
              if (this.clearDebounce(), this.hasValue) {
                const {lastValue : t} = this;
                this.lastValue = null, this.hasValue = !1,
                this.destination.next(t)
              }
            }
            clearDebounce() {
              const t = this.debouncedSubscription;
              null !== t && (this.remove(t), t.unsubscribe(),
                             this.debouncedSubscription = null)
            }
          }
          function _f(t) { t.debouncedNext() }
          function vf(t) { return e => e.lift(new bf(t)) }
          class bf {
            constructor(t) { this.notifier = t }
            call(t, e) {
              const n = new wf(t), s = V(this.notifier, new M(n));
              return s && !n.seenValue ? (n.add(s), e.subscribe(n)) : n
            }
          }
          class wf extends j {
            constructor(t) { super(t), this.seenValue = !1 }
            notifyNext() { this.seenValue = !0, this.complete() }
            notifyComplete() {}
          }
          const xf = {
            provide : xl,
            useFactory : function(t, e) {
              return () => {
                if (Qc(e)) {
                  const e = Array.from(t.querySelectorAll(`[class*=${Sf}]`)),
                        n = /\bflex-layout-.+?\b/g;
                  e.forEach(
                      t => {t.classList.contains(Sf + "ssr") && t.parentNode
                                ? t.parentNode.removeChild(t)
                                : t.className.replace(n, "")})
                }
              }
            },
            deps : [ pc, wl ],
            multi : !0
          },
                Sf = "flex-layout-";
          let Ef = (() => {
            class t {} return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t) },
              providers : [ xf ]
            }),
            t
          })();
          class Cf {
            constructor(t = !1, e = "all", n = "", s = "", i = 0) {
              this.matches = t, this.mediaQuery = e, this.mqAlias = n,
              this.suffix = s, this.priority = i, this.property = ""
            }
            clone() {
              return new Cf(this.matches, this.mediaQuery, this.mqAlias,
                            this.suffix)
            }
          }
          let kf = (() => {
            class t {
              constructor() { this.stylesheet = new Map }
              addStyleToElement(t, e, n) {
                const s = this.stylesheet.get(t);
                s ? s.set(e, n) : this.stylesheet.set(t, new Map([ [ e, n ] ]))
              }
              clearStyles() { this.stylesheet.clear() }
              getStyleForElement(t, e) {
                const n = this.stylesheet.get(t);
                let s = "";
                if (n) {
                  const t = n.get(e);
                  "number" != typeof t && "string" != typeof t || (s = t + "")
                }
                return s
              }
            } return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275prov = ht({
              factory : function() { return new t },
              token : t,
              providedIn : "root"
            }),
            t
          })();
          const Tf = {
            addFlexToParent : !0,
            addOrientationBps : !1,
            disableDefaultBps : !1,
            disableVendorPrefixes : !1,
            serverLoaded : !1,
            useColumnBasisZero : !0,
            printWithBreakpoints : [],
            mediaTriggerAutoRestore : !0,
            ssrObserveBreakpoints : []
          },
                Af = new Vt("Flex Layout token, config options for the library",
                            {providedIn : "root", factory : () => Tf}),
                If = new Vt("FlexLayoutServerLoaded",
                            {providedIn : "root", factory : () => !1}),
                Rf = new Vt(
                    "Flex Layout token, collect all breakpoints into one provider",
                    {providedIn : "root", factory : () => null});
          function Of(t, e) {
            return t = t ? t.clone() : new Cf,
                   e && (t.mqAlias = e.alias, t.mediaQuery = e.mediaQuery,
                         t.suffix = e.suffix, t.priority = e.priority),
                   t
          }
          const Pf = "inline",
                Lf = [ "row", "column", "row-reverse", "column-reverse" ];
          function Df(t) {
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
                t = "wrap"
              }
            return t
          }
          let Nf = (() => {
            class t {
              constructor(t, e, n, s) {
                this.elementRef = t, this.styleBuilder = e, this.styler = n,
                this.marshal = s, this.DIRECTIVE_KEY = "", this.inputs = [],
                this.mru = {}, this.destroySubject = new S,
                this.styleCache = new Map
              }
              get parentElement() {
                return this.elementRef.nativeElement.parentElement
              }
              get nativeElement() { return this.elementRef.nativeElement }
              get activatedValue() {
                return this.marshal.getValue(this.nativeElement,
                                             this.DIRECTIVE_KEY)
              }
              set activatedValue(t) {
                this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, t,
                                      this.marshal.activatedAlias)
              }
              ngOnChanges(t) {
                Object.keys(t).forEach(e => {
                  if (-1 !== this.inputs.indexOf(e)) {
                    const n = e.split(".").slice(1).join(".");
                    this.setValue(t[e].currentValue, n)
                  }
                })
              }
              ngOnDestroy() {
                this.destroySubject.next(), this.destroySubject.complete(),
                    this.marshal.releaseElement(this.nativeElement)
              }
              init(t = []) {
                this.marshal.init(this.elementRef.nativeElement,
                                  this.DIRECTIVE_KEY,
                                  this.updateWithValue.bind(this),
                                  this.clearStyles.bind(this), t)
              }
              addStyles(t, e) {
                const n = this.styleBuilder, s = n.shouldCache;
                let i = this.styleCache.get(t);
                i && s ||
                    (i = n.buildStyles(t, e), s && this.styleCache.set(t, i)),
                    this.mru = Object.assign({}, i),
                    this.applyStyleToElement(i), n.sideEffect(t, i, e)
              }
              clearStyles() {
                Object.keys(this.mru).forEach(t => {this.mru[t] = ""}),
                    this.applyStyleToElement(this.mru), this.mru = {}
              }
              triggerUpdate() {
                this.marshal.triggerUpdate(this.nativeElement,
                                           this.DIRECTIVE_KEY)
              }
              getFlexFlowDirection(t, e = !1) {
                if (t) {
                  const [n, s] = this.styler.getFlowDirection(t);
                  if (!s && e) {
                    const e = function(t) {
                      let [e, n, s] = function(t) {
                        t = t ? t.toLowerCase() : "";
                        let [e, n, s] = t.split(" ");
                        return Lf.find(t => t === e) || (e = Lf[0]),
                               n === Pf && (n = s !== Pf ? s : "", s = Pf),
                               [ e, Df(n), !!s ]
                      }(t);
                      return function(t, e = null, n = !1) {
                        return {
                          display: n ? "inline-flex" : "flex",
                              "box-sizing": "border-box", "flex-direction": t,
                              "flex-wrap": e || null
                        }
                      }(e, n, s)
                    }(n);
                    this.styler.applyStyleToElements(e, [ t ])
                  }
                  return n.trim()
                }
                return "row"
              }
              hasWrap(t) { return this.styler.hasWrap(t) }
              applyStyleToElement(t, e, n = this.nativeElement) {
                this.styler.applyStyleToElement(n, t, e)
              }
              setValue(t, e) {
                this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, t,
                                      e)
              }
              updateWithValue(t) {
                this.currentValue !== t &&
                    (this.addStyles(t), this.currentValue = t)
              }
            } return t.\u0275fac =
                function(t) { !function() { throw new Error("invalid") }() },
            t.\u0275dir = we({type : t, features : [ Fe ]}),
            t
          })();
          const Ff =
              [
                {
                  alias : "xs",
                  mediaQuery :
                      "screen and (min-width: 0px) and (max-width: 599.9px)",
                  priority : 1e3
                },
                {
                  alias : "sm",
                  mediaQuery :
                      "screen and (min-width: 600px) and (max-width: 959.9px)",
                  priority : 900
                },
                {
                  alias : "md",
                  mediaQuery :
                      "screen and (min-width: 960px) and (max-width: 1279.9px)",
                  priority : 800
                },
                {
                  alias : "lg",
                  mediaQuery :
                      "screen and (min-width: 1280px) and (max-width: 1919.9px)",
                  priority : 700
                },
                {
                  alias : "xl",
                  mediaQuery :
                      "screen and (min-width: 1920px) and (max-width: 4999.9px)",
                  priority : 600
                },
                {
                  alias : "lt-sm",
                  overlapping : !0,
                  mediaQuery : "screen and (max-width: 599.9px)",
                  priority : 950
                },
                {
                  alias : "lt-md",
                  overlapping : !0,
                  mediaQuery : "screen and (max-width: 959.9px)",
                  priority : 850
                },
                {
                  alias : "lt-lg",
                  overlapping : !0,
                  mediaQuery : "screen and (max-width: 1279.9px)",
                  priority : 750
                },
                {
                  alias : "lt-xl",
                  overlapping : !0,
                  priority : 650,
                  mediaQuery : "screen and (max-width: 1919.9px)"
                },
                {
                  alias : "gt-xs",
                  overlapping : !0,
                  mediaQuery : "screen and (min-width: 600px)",
                  priority : -950
                },
                {
                  alias : "gt-sm",
                  overlapping : !0,
                  mediaQuery : "screen and (min-width: 960px)",
                  priority : -850
                },
                {
                  alias : "gt-md",
                  overlapping : !0,
                  mediaQuery : "screen and (min-width: 1280px)",
                  priority : -750
                },
                {
                  alias : "gt-lg",
                  overlapping : !0,
                  mediaQuery : "screen and (min-width: 1920px)",
                  priority : -650
                }
              ],
                Mf = "(orientation: portrait) and (max-width: 599.9px)",
                jf = "(orientation: landscape) and (max-width: 959.9px)",
                Vf =
                    "(orientation: portrait) and (min-width: 600px) and (max-width: 839.9px)",
                Bf =
                    "(orientation: landscape) and (min-width: 960px) and (max-width: 1279.9px)",
                Hf = "(orientation: portrait) and (min-width: 840px)",
                Uf = "(orientation: landscape) and (min-width: 1280px)", zf = {
                  HANDSET : `${Mf}, ${jf}`,
                  TABLET : `${Vf} , ${Bf}`,
                  WEB : `${Hf}, ${Uf} `,
                  HANDSET_PORTRAIT : "" + Mf,
                  TABLET_PORTRAIT : Vf + " ",
                  WEB_PORTRAIT : "" + Hf,
                  HANDSET_LANDSCAPE : "" + jf,
                  TABLET_LANDSCAPE : "" + Bf,
                  WEB_LANDSCAPE : "" + Uf
                },
                $f =
                    [
                      {
                        alias : "handset",
                        priority : 2e3,
                        mediaQuery : zf.HANDSET
                      },
                      {
                        alias : "handset.landscape",
                        priority : 2e3,
                        mediaQuery : zf.HANDSET_LANDSCAPE
                      },
                      {
                        alias : "handset.portrait",
                        priority : 2e3,
                        mediaQuery : zf.HANDSET_PORTRAIT
                      },
                      {
                        alias : "tablet",
                        priority : 2100,
                        mediaQuery : zf.TABLET
                      },
                      {
                        alias : "tablet.landscape",
                        priority : 2100,
                        mediaQuery : zf.TABLET_LANDSCAPE
                      },
                      {
                        alias : "tablet.portrait",
                        priority : 2100,
                        mediaQuery : zf.TABLET_PORTRAIT
                      },
                      {
                        alias : "web",
                        priority : 2200,
                        mediaQuery : zf.WEB,
                        overlapping : !0
                      },
                      {
                        alias : "web.landscape",
                        priority : 2200,
                        mediaQuery : zf.WEB_LANDSCAPE,
                        overlapping : !0
                      },
                      {
                        alias : "web.portrait",
                        priority : 2200,
                        mediaQuery : zf.WEB_PORTRAIT,
                        overlapping : !0
                      }
                    ],
                qf = /(\.|-|_)/g;
          function Wf(t) {
            let e = t.length > 0 ? t.charAt(0) : "",
                n = t.length > 1 ? t.slice(1) : "";
            return e.toUpperCase() + n
          }
          const Gf = new Vt("Token (@angular/flex-layout) Breakpoints", {
            providedIn : "root",
            factory : () => {
              const t = Yt(Rf), e = Yt(Af),
                    n = [].concat.apply(
                        [], (t || []).map(t => Array.isArray(t) ? t : [ t ]));
              return function(t, e = []) {
                const n = {};
                return t.forEach(t=>{n[t.alias]=t}),e.forEach(t=>{n[t.alias]?function(t,...e){if(null==t)throw TypeError("Cannot convert undefined or null to object");for(let n of e)if(null!=n)for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e])}(n[t.alias],t):n[t.alias]=t}),(s=Object.keys(n).map(t=>n[t])).forEach(t=>{t.suffix||(t.suffix=t.alias.replace(qf,"|").split("|").map(Wf).join(""),t.overlapping=!!t.overlapping)}),s;
                var s
              }((e.disableDefaultBps ? [] : Ff)
                    .concat(e.addOrientationBps ? $f : []),
                n)
            }
          });
          function Qf(t, e) {
            return (e && e.priority || 0) - (t && t.priority || 0)
          }
          function Kf(t, e) { return (t.priority || 0) - (e.priority || 0) }
          let Zf = (() => {
            class t {
              constructor(t) {
                this.findByMap = new Map, this.items = [...t ].sort(Kf)
              }
              findByAlias(t) {
                return t ? this.findWithPredicate(t, e => e.alias == t) : null
              }
              findByQuery(t) {
                return this.findWithPredicate(t, e => e.mediaQuery == t)
              }
              get overlappings() {
                return this.items.filter(t => 1 == t.overlapping)
              }
              get aliases() { return this.items.map(t => t.alias) }
              get suffixes() {
                return this.items.map(t => t.suffix ? t.suffix : "")
              }
              findWithPredicate(t, e) {
                let n = this.findByMap.get(t);
                return n || (n = this.items.find(e) || null,
                             this.findByMap.set(t, n)),
                       n || null
              }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(Gf)) },
            t.\u0275prov = ht({
              factory : function() { return new t(Zt(Gf)) },
              token : t,
              providedIn : "root"
            }),
            t
          })(),
              Yf = (() => {
                class t {
                  constructor(t, e, n) {
                    this._zone = t, this._platformId = e, this._document = n,
                    this.source = new Ru(new Cf(!0)), this.registry = new Map,
                    this.pendingRemoveListenerFns = [],
                    this._observable$ = this.source.asObservable()
                  }
                  get activations() {
                    const t = [];
                    return this.registry.forEach(
                               (e, n) => {e.matches && t.push(n)}),
                           t
                  }
                  isActive(t) {
                    const e = this.registry.get(t);
                    return e ? e.matches
                             : this.registerQuery(t).some(t => t.matches)
                  }
                  observe(t, e = !1) {
                    if (t && t.length) {
                      const n = this._observable$.pipe(
                          zu(n => !e || t.indexOf(n.mediaQuery) > -1));
                      return q(new _(e => {
                                 const n = this.registerQuery(t);
                                 if (n.length) {
                                   const t = n.pop();
                                   n.forEach(t => {e.next(t)}),
                                       this.source.next(t)
                                 }
                                 e.complete()
                               }),
                               n)
                    }
                    return this._observable$
                  }
                  registerQuery(t) {
                    const e = Array.isArray(t) ? t : [ t ], n = [];
                    return function(t, e) {
                      const n = t.filter(t => !Xf[t]);
                      if (n.length > 0) {
                        const t = n.join(", ");
                        try {
                          const s = e.createElement("style");
                          s.setAttribute("type", "text/css"),
                              s.styleSheet ||
                                  s.appendChild(e.createTextNode(
                                      `\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${
                                          t} {.fx-query-test{ }}\n`)),
                              e.head.appendChild(s), n.forEach(t => Xf[t] = s)
                        } catch (s) {
                          console.error(s)
                        }
                      }
                    }(e, this._document),
                           e.forEach(t => {
                             const e = e => {
                               this._zone.run(
                                   () => this.source.next(new Cf(e.matches, t)))
                             };
                             let s = this.registry.get(t);
                             s || (s = this.buildMQL(t), s.addListener(e),
                                   this.pendingRemoveListenerFns.push(
                                       () => s.removeListener(e)),
                                   this.registry.set(t, s)),
                                 s.matches && n.push(new Cf(!0, t))
                           }),
                           n
                  }
                  ngOnDestroy() {
                    let t;
                    for (; t = this.pendingRemoveListenerFns.pop();)
                      t()
                  }
                  buildMQL(t) {
                    return function(t, e) {
                      return e && window.matchMedia("all").addListener
                                 ? window.matchMedia(t)
                                 : {
                                     matches : "all" === t || "" === t,
                                     media : t,
                                     addListener : () => {},
                                     removeListener : () => {},
                                     onchange : null,
                                     addEventListener() {},
                                     removeEventListener() {},
                                     dispatchEvent : () => !1
                                   }
                    }(t, Qc(this._platformId))
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Fl), Zt(wl), Zt(pc)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(Fl), Zt(wl), Zt(pc)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
          const Xf = {}, Jf = "print",
                tm = {alias : Jf, mediaQuery : Jf, priority : 1e3};
          let em = (() => {
            class t {
              constructor(t, e, n) {
                this.breakpoints = t, this.layoutConfig = e, this._document = n,
                this.registeredBeforeAfterPrintHooks = !1,
                this.isPrintingBeforeAfterEvent = !1,
                this.beforePrintEventListeners = [],
                this.afterPrintEventListeners = [], this.isPrinting = !1,
                this.queue = new nm, this.deactivations = []
              }
              withPrintQuery(t) { return [...t, Jf ] }
              isPrintEvent(t) { return t.mediaQuery.startsWith(Jf) }
              get printAlias() {
                return this.layoutConfig.printWithBreakpoints || []
              }
              get printBreakPoints() {
                return this.printAlias.map(t => this.breakpoints.findByAlias(t))
                    .filter(t => null !== t)
              }
              getEventBreakpoints({mediaQuery : t}) {
                const e = this.breakpoints.findByQuery(t);
                return (e ? [...this.printBreakPoints, e ]
                          : this.printBreakPoints)
                    .sort(Qf)
              }
              updateEvent(t) {
                let e = this.breakpoints.findByQuery(t.mediaQuery);
                return this.isPrintEvent(t) &&
                           (e = this.getEventBreakpoints(t)[0],
                            t.mediaQuery = e ? e.mediaQuery : ""),
                       Of(t, e)
              }
              registerBeforeAfterPrintHooks(t) {
                if (!this._document.defaultView ||
                    this.registeredBeforeAfterPrintHooks)
                  return;
                this.registeredBeforeAfterPrintHooks = !0;
                const e = () => {
                  this.isPrinting ||
                      (this.isPrintingBeforeAfterEvent = !0,
                       this.startPrinting(
                           t, this.getEventBreakpoints(new Cf(!0, Jf))),
                       t.updateStyles())
                }, n = () => {
                  this.isPrintingBeforeAfterEvent = !1,
                  this.isPrinting && (this.stopPrinting(t), t.updateStyles())
                };
                this._document.defaultView.addEventListener("beforeprint", e),
                    this._document.defaultView.addEventListener("afterprint",
                                                                n),
                    this.beforePrintEventListeners.push(e),
                    this.afterPrintEventListeners.push(n)
              }
              interceptEvents(t) {
                return this.registerBeforeAfterPrintHooks(t), e => {
                  this.isPrintEvent(e)
                      ? e.matches && !this.isPrinting
                            ? (this.startPrinting(t,
                                                  this.getEventBreakpoints(e)),
                               t.updateStyles())
                            : e.matches || !this.isPrinting ||
                                  this.isPrintingBeforeAfterEvent ||
                                  (this.stopPrinting(t), t.updateStyles())
                      : this.collectActivations(e)
                }
              }
              blockPropagation() {
                return t => !(this.isPrinting || this.isPrintEvent(t))
              }
              startPrinting(t, e) {
                this.isPrinting = !0,
                t.activatedBreakpoints = this.queue.addPrintBreakpoints(e)
              }
              stopPrinting(t) {
                t.activatedBreakpoints = this.deactivations,
                this.deactivations = [], this.queue.clear(),
                this.isPrinting = !1
              }
              collectActivations(t) {
                if (!this.isPrinting || this.isPrintingBeforeAfterEvent)
                  if (t.matches)
                    this.isPrintingBeforeAfterEvent ||
                        (this.deactivations = []);
                  else {
                    const e = this.breakpoints.findByQuery(t.mediaQuery);
                    e && (this.deactivations.push(e),
                          this.deactivations.sort(Qf))
                  }
              }
              ngOnDestroy() {
                this.beforePrintEventListeners.forEach(
                    t => this._document.defaultView.removeEventListener(
                        "beforeprint", t)),
                    this.afterPrintEventListeners.forEach(
                        t => this._document.defaultView.removeEventListener(
                            "afterprint", t))
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(Zf), Zt(Af), Zt(pc)) },
            t.\u0275prov = ht({
              factory : function() { return new t(Zt(Zf), Zt(Af), Zt(pc)) },
              token : t,
              providedIn : "root"
            }),
            t
          })();
          class nm {
            constructor() { this.printBreakpoints = [] }
            addPrintBreakpoints(t) {
              return t.push(tm), t.sort(Qf),
                     t.forEach(t => this.addBreakpoint(t)),
                     this.printBreakpoints
            }
            addBreakpoint(t) {
              t &&
                  void 0 === this.printBreakpoints.find(e => e.mediaQuery ===
                                                             t.mediaQuery) &&
                  (this.printBreakpoints =
                       function(
                           t) { return !!t && t.mediaQuery.startsWith(Jf) }(t)
                           ? [ t, ...this.printBreakpoints ]
                           : [...this.printBreakpoints, t ])
            }
            clear() { this.printBreakpoints = [] }
          }
          function sm(t) {
            for (let e in t) {
              let n = t[e] || "";
              switch (e) {
              case "display":
                t.display = "flex" === n
                                ? [ "-webkit-flex", "flex" ]
                                : "inline-flex" === n
                                      ? [ "-webkit-inline-flex", "inline-flex" ]
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
                n = n || "row", t["-webkit-flex-direction"] = n,
                t["flex-direction"] = n;
                break;
              case "order":
                t.order = t["-webkit-" + e] = isNaN(+n) ? "0" : n
              }
            }
            return t
          }
          let im = (() => {
            class t {
              constructor(t, e, n, s) {
                this._serverStylesheet = t, this._serverModuleLoaded = e,
                this._platformId = n, this.layoutConfig = s
              }
              applyStyleToElement(t, e, n = null) {
                let s = {};
                "string" == typeof e && (s[e] = n, e = s),
                    s = this.layoutConfig.disableVendorPrefixes ? e : sm(e),
                    this._applyMultiValueStyleToElement(s, t)
              }
              applyStyleToElements(t, e = []) {
                const n = this.layoutConfig.disableVendorPrefixes ? t : sm(t);
                e.forEach(t => {this._applyMultiValueStyleToElement(n, t)})
              }
              getFlowDirection(t) {
                const e = "flex-direction";
                let n = this.lookupStyle(t, e);
                return [
                  n || "row",
                  this.lookupInlineStyle(t, e) ||
                          Kc(this._platformId) && this._serverModuleLoaded
                      ? n
                      : ""
                ]
              }
              hasWrap(t) { return "wrap" === this.lookupStyle(t, "flex-wrap") }
              lookupAttributeValue(t, e) { return t.getAttribute(e) || "" }
              lookupInlineStyle(t, e) {
                return Qc(this._platformId) ? t.style.getPropertyValue(e)
                                            : this._getServerStyle(t, e)
              }
              lookupStyle(t, e, n = !1) {
                let s = "";
                return t && ((s = this.lookupInlineStyle(t, e)) ||
                             (Qc(this._platformId)
                                  ? n || (s = getComputedStyle(t)
                                                  .getPropertyValue(e))
                                  : this._serverModuleLoaded &&
                                        (s = this._serverStylesheet
                                                 .getStyleForElement(t, e)))),
                       s ? s.trim() : ""
              }
              _applyMultiValueStyleToElement(t, e) {
                Object.keys(t).sort().forEach(n => {
                  const s = t[n], i = Array.isArray(s) ? s : [ s ];
                  i.sort();
                  for (let t of i)
                    t = t ? t + "" : "",
                    Qc(this._platformId) || !this._serverModuleLoaded
                        ? Qc(this._platformId) ? e.style.setProperty(n, t)
                                               : this._setServerStyle(e, n, t)
                        : this._serverStylesheet.addStyleToElement(e, n, t)
                })
              }
              _setServerStyle(t, e, n) {
                e = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                const s = this._readStyleAttribute(t);
                s[e] = n || "", this._writeStyleAttribute(t, s)
              }
              _getServerStyle(t, e) {
                return this._readStyleAttribute(t)[e] || ""
              }
              _readStyleAttribute(t) {
                const e = {}, n = t.getAttribute("style");
                if (n) {
                  const t = n.split(/;+/g);
                  for (let n = 0; n < t.length; n++) {
                    const s = t[n].trim();
                    if (s.length > 0) {
                      const t = s.indexOf(":");
                      if (-1 === t)
                        throw new Error("Invalid CSS style: " + s);
                      e[s.substr(0, t).trim()] = s.substr(t + 1).trim()
                    }
                  }
                }
                return e
              }
              _writeStyleAttribute(t, e) {
                let n = "";
                for (const s in e)
                  e[s] && (n += s + ":" + e[s] + ";");
                t.setAttribute("style", n)
              }
            } return t.\u0275fac =
                function(
                    e) { return new (e || t)(Zt(kf), Zt(If), Zt(wl), Zt(Af)) },
            t.\u0275prov = ht({
              factory :
                  function() { return new t(Zt(kf), Zt(If), Zt(wl), Zt(Af)) },
              token : t,
              providedIn : "root"
            }),
            t
          })();
          class rm {
            constructor() { this.shouldCache = !0 }
            sideEffect(t, e, n) {}
          }
          function om(t, e = "1", n = "1") {
            let s = [ e, n, t ], i = t.indexOf("calc");
            if (i > 0) {
              s[2] = am(t.substring(i).trim());
              let e = t.substr(0, i).trim().split(" ");
              2 == e.length && (s[0] = e[0], s[1] = e[1])
            } else if (0 == i)
              s[2] = am(t.trim());
            else {
              let i = t.split(" ");
              s = 3 === i.length ? i : [ e, n, t ]
            }
            return s
          }
          function am(t) {
            return t.replace(/[\s]/g, "").replace(/[\/\*\+\-]/g, " $& ")
          }
          let lm = (() => {
            class t {
              constructor(t, e, n) {
                this.matchMedia = t, this.breakpoints = e, this.hook = n,
                this.activatedBreakpoints = [], this.elementMap = new Map,
                this.elementKeyMap = new WeakMap, this.watcherMap = new WeakMap,
                this.updateMap = new WeakMap, this.clearMap = new WeakMap,
                this.subject = new S, this.observeActivations()
              }
              get activatedAlias() {
                return this.activatedBreakpoints[0]
                           ? this.activatedBreakpoints[0].alias
                           : ""
              }
              onMediaChange(t) {
                const e = this.findByQuery(t.mediaQuery);
                e && ((t = Of(t, e)).matches &&
                              -1 === this.activatedBreakpoints.indexOf(e)
                          ? (this.activatedBreakpoints.push(e),
                             this.activatedBreakpoints.sort(Qf),
                             this.updateStyles())
                          : t.matches ||
                                -1 === this.activatedBreakpoints.indexOf(e) ||
                                (this.activatedBreakpoints.splice(
                                     this.activatedBreakpoints.indexOf(e), 1),
                                 this.activatedBreakpoints.sort(Qf),
                                 this.updateStyles()))
              }
              init(t, e, n, s, i = []) {
                cm(this.updateMap, t, e, n), cm(this.clearMap, t, e, s),
                    this.buildElementKeyMap(t, e),
                    this.watchExtraTriggers(t, e, i)
              }
              getValue(t, e, n) {
                const s = this.elementMap.get(t);
                if (s) {
                  const t =
                      void 0 !== n ? s.get(n) : this.getActivatedValues(s, e);
                  if (t)
                    return t.get(e)
                }
              }
              hasValue(t, e) {
                const n = this.elementMap.get(t);
                if (n) {
                  const t = this.getActivatedValues(n, e);
                  if (t)
                    return void 0 !== t.get(e) || !1
                }
                return !1
              }
              setValue(t, e, n, s) {
                let i = this.elementMap.get(t);
                if (i) {
                  const r = (i.get(s) || new Map).set(e, n);
                  i.set(s, r), this.elementMap.set(t, i)
                } else
                  i = (new Map).set(s, (new Map).set(e, n)),
                  this.elementMap.set(t, i);
                const r = this.getValue(t, e);
                void 0 !== r && this.updateElement(t, e, r)
              }
              trackValue(t, e) {
                return this.subject.asObservable().pipe(
                    zu(n => n.element === t && n.key === e))
              }
              updateStyles() {
                this.elementMap.forEach((t, e) => {
                  const n = new Set(this.elementKeyMap.get(e));
                  let s = this.getActivatedValues(t);
                  s &&
                      s.forEach(
                          (t, s) => {this.updateElement(e, s, t), n.delete(s)}),
                      n.forEach(n => {
                        if (s = this.getActivatedValues(t, n), s) {
                          const t = s.get(n);
                          this.updateElement(e, n, t)
                        } else
                          this.clearElement(e, n)
                      })
                })
              }
              clearElement(t, e) {
                const n = this.clearMap.get(t);
                if (n) {
                  const s = n.get(e);
                  s && (s(),
                        this.subject.next({element : t, key : e, value : ""}))
                }
              }
              updateElement(t, e, n) {
                const s = this.updateMap.get(t);
                if (s) {
                  const i = s.get(e);
                  i && (i(n),
                        this.subject.next({element : t, key : e, value : n}))
                }
              }
              releaseElement(t) {
                const e = this.watcherMap.get(t);
                e && (e.forEach(t => t.unsubscribe()),
                      this.watcherMap.delete(t));
                const n = this.elementMap.get(t);
                n && (n.forEach((t, e) => n.delete(e)),
                      this.elementMap.delete(t))
              }
              triggerUpdate(t, e) {
                const n = this.elementMap.get(t);
                if (n) {
                  const s = this.getActivatedValues(n, e);
                  s && (e ? this.updateElement(t, e, s.get(e))
                          : s.forEach((e, n) => this.updateElement(t, n, e)))
                }
              }
              buildElementKeyMap(t, e) {
                let n = this.elementKeyMap.get(t);
                n || (n = new Set, this.elementKeyMap.set(t, n)), n.add(e)
              }
              watchExtraTriggers(t, e, n) {
                if (n && n.length) {
                  let s = this.watcherMap.get(t);
                  if (s || (s = new Map, this.watcherMap.set(t, s)),
                      !s.get(e)) {
                    const i = q(...n).subscribe(() => {
                      const n = this.getValue(t, e);
                      this.updateElement(t, e, n)
                    });
                    s.set(e, i)
                  }
                }
              }
              findByQuery(t) { return this.breakpoints.findByQuery(t) }
              getActivatedValues(t, e) {
                for (let s = 0; s < this.activatedBreakpoints.length; s++) {
                  const n = t.get(this.activatedBreakpoints[s].alias);
                  if (n && (void 0 === e || n.has(e) && null != n.get(e)))
                    return n
                }
                const n = t.get("");
                return void 0 === e || n && n.has(e) ? n : void 0
              }
              observeActivations() {
                const t = this.breakpoints.items.map(t => t.mediaQuery);
                this.matchMedia.observe(this.hook.withPrintQuery(t))
                    .pipe(vh(this.hook.interceptEvents(this)),
                          zu(this.hook.blockPropagation()))
                    .subscribe(this.onMediaChange.bind(this))
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(Yf), Zt(Zf), Zt(em)) },
            t.\u0275prov = ht({
              factory : function() { return new t(Zt(Yf), Zt(Zf), Zt(em)) },
              token : t,
              providedIn : "root"
            }),
            t
          })();
          function cm(t, e, n, s) {
            if (void 0 !== s) {
              let i = t.get(e);
              i || (i = new Map, t.set(e, i)), i.set(n, s)
            }
          }
          const um = new Vt(
              "cdk-dir-doc",
              {providedIn : "root", factory : function() { return Yt(pc) }});
          let hm = (() => {
            class t {
              constructor(t) {
                if (this.value = "ltr", this.change = new tl, t) {
                  const e = t.documentElement ? t.documentElement.dir : null,
                        n = (t.body ? t.body.dir : null) || e;
                  this.value = "ltr" === n || "rtl" === n ? n : "ltr"
                }
              }
              ngOnDestroy() { this.change.complete() }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(um, 8)) },
            t.\u0275prov = ht({
              factory : function() { return new t(Zt(um, 8)) },
              token : t,
              providedIn : "root"
            }),
            t
          })(),
              dm = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj =
                    dt({factory : function(e) { return new (e || t) }}),
                t
              })();
          const pm = "inline",
                fm = [ "row", "column", "row-reverse", "column-reverse" ];
          function mm(t) {
            t = t ? t.toLowerCase() : "";
            let [e, n, s] = t.split(" ");
            return fm.find(t => t === e) || (e = fm[0]),
                   n === pm && (n = s !== pm ? s : "", s = pm),
                   [ e, ym(n), !!s ]
          }
          function gm(t) {
            let [e] = mm(t);
            return e.indexOf("row") > -1
          }
          function ym(t) {
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
                t = "wrap"
              }
            return t
          }
          let _m = (() => {
            class t extends rm {
              buildStyles(t) {
                return function(t) {
                  let [e, n, s] = mm(t);
                  return function(t, e = null, n = !1) {
                    return {
                      display: n ? "inline-flex" : "flex",
                          "box-sizing": "border-box", "flex-direction": t,
                          "flex-wrap": e || null
                    }
                  }(e, n, s)
                }(t)
              }
            }
            t.\u0275fac = function(n) { return e(n || t) },
            t.\u0275prov = ht({
              factory : function() { return new t },
              token : t,
              providedIn : "root"
            });
            const e = ds(t);
            return t
          })();
          const vm = [
            "fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md",
            "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md",
            "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs",
            "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"
          ];
          let bm = (() => {
            class t extends
                Nf {
                  constructor(t, e, n, s) {
                    super(t, n, e, s), this.DIRECTIVE_KEY = "layout",
                                       this.styleCache = xm, this.init()
                  }
                } return t
                    .\u0275fac = function(
                    e) { return new (e || t)(So(aa), So(im), So(_m), So(lm)) },
                t.\u0275dir = we({type : t, features : [ ao ]}),
                t
          })(),
              wm = (() => {
                class t extends bm {
                  constructor() { super(...arguments), this.inputs = vm }
                }
                t.\u0275fac = function(n) { return e(n || t) },
                t.\u0275dir = we({
                  type : t,
                  selectors : [
                    [ "", "fxLayout", "" ], [ "", "fxLayout.xs", "" ],
                    [ "", "fxLayout.sm", "" ], [ "", "fxLayout.md", "" ],
                    [ "", "fxLayout.lg", "" ], [ "", "fxLayout.xl", "" ],
                    [ "", "fxLayout.lt-sm", "" ], [ "", "fxLayout.lt-md", "" ],
                    [ "", "fxLayout.lt-lg", "" ], [ "", "fxLayout.lt-xl", "" ],
                    [ "", "fxLayout.gt-xs", "" ], [ "", "fxLayout.gt-sm", "" ],
                    [ "", "fxLayout.gt-md", "" ], [ "", "fxLayout.gt-lg", "" ]
                  ],
                  inputs : {
                    fxLayout : "fxLayout",
                    "fxLayout.xs" : "fxLayout.xs",
                    "fxLayout.sm" : "fxLayout.sm",
                    "fxLayout.md" : "fxLayout.md",
                    "fxLayout.lg" : "fxLayout.lg",
                    "fxLayout.xl" : "fxLayout.xl",
                    "fxLayout.lt-sm" : "fxLayout.lt-sm",
                    "fxLayout.lt-md" : "fxLayout.lt-md",
                    "fxLayout.lt-lg" : "fxLayout.lt-lg",
                    "fxLayout.lt-xl" : "fxLayout.lt-xl",
                    "fxLayout.gt-xs" : "fxLayout.gt-xs",
                    "fxLayout.gt-sm" : "fxLayout.gt-sm",
                    "fxLayout.gt-md" : "fxLayout.gt-md",
                    "fxLayout.gt-lg" : "fxLayout.gt-lg"
                  },
                  features : [ ao ]
                });
                const e = ds(t);
                return t
              })();
          const xm = new Map, Sm = {
            "margin-left" : null,
            "margin-right" : null,
            "margin-top" : null,
            "margin-bottom" : null
          };
          let Em = (() => {
            class t extends rm {
              constructor(t) { super(), this._styler = t }
              buildStyles(t, e) {
                return t.endsWith(Pm) ? function(t, e) {
                  const [n, s] = t.split(" "), i = t => "-" + t;
                  let r = "0px", o = i(s || n), a = "0px";
                  return "rtl" === e ? a = i(n) : r = i(n), {
                    margin: `0px ${r} ${o} ${a}`
                  }
                }(t = t.slice(0, t.indexOf(Pm)), e.directionality) : {}
              }
              sideEffect(t, e, n) {
                const s = n.items;
                if (t.endsWith(Pm)) {
                  const e = function(t, e) {
                    const [n, s] = t.split(" ");
                    let i = "0px", r = "0px";
                    return "rtl" === e ? r = n : i = n, {
                      padding: `0px ${i} ${s || n} ${r}`
                    }
                  }(t = t.slice(0, t.indexOf(Pm)), n.directionality);
                  this._styler.applyStyleToElements(e, n.items)
                } else {
                  const e = s.pop(), i = function(t, e) {
                    const n = Lm(e.directionality, e.layout),
                          s = Object.assign({}, Sm);
                    return s[n] = t, s
                  }(t, n);
                  this._styler.applyStyleToElements(i, s),
                      this._styler.applyStyleToElements(Sm, [ e ])
                }
              }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(im)) },
                            t.\u0275prov = ht({
                              factory : function() { return new t(Zt(im)) },
                              token : t,
                              providedIn : "root"
                            }),
                            t
          })();
          const Cm = [
            "fxLayoutGap", "fxLayoutGap.xs", "fxLayoutGap.sm", "fxLayoutGap.md",
            "fxLayoutGap.lg", "fxLayoutGap.xl", "fxLayoutGap.lt-sm",
            "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl",
            "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md",
            "fxLayoutGap.gt-lg"
          ];
          let km = (() => {
            class t extends Nf {
              constructor(t, e, n, s, i, r) {
                super(t, i, s, r), this.zone = e, this.directionality = n,
                                   this.styleUtils = s, this.layout = "row",
                                   this.DIRECTIVE_KEY = "layout-gap",
                                   this.observerSubject = new S;
                const o = [
                  this.directionality.change,
                  this.observerSubject.asObservable()
                ];
                this.init(o),
                    this.marshal.trackValue(this.nativeElement, "layout")
                        .pipe(vf(this.destroySubject))
                        .subscribe(this.onLayoutChange.bind(this))
              }
              get childrenNodes() {
                const t = this.nativeElement.children, e = [];
                for (let n = t.length; n--;)
                  e[n] = t[n];
                return e
              }
              ngAfterContentInit() {
                this.buildChildObservable(), this.triggerUpdate()
              }
              ngOnDestroy() {
                super.ngOnDestroy(), this.observer && this.observer.disconnect()
              }
              onLayoutChange(t) {
                const e = t.value.split(" ");
                this.layout = e[0],
                fm.find(t => t === this.layout) || (this.layout = "row"),
                this.triggerUpdate()
              }
              updateWithValue(t) {
                const e =
                    this.childrenNodes
                        .filter(t => 1 === t.nodeType && this.willDisplay(t))
                        .sort((t, e) => {
                          const n = +this.styler.lookupStyle(t, "order"),
                                s = +this.styler.lookupStyle(e, "order");
                          return isNaN(n) || isNaN(s) || n === s
                                     ? 0
                                     : n > s ? 1 : -1
                        });
                if (e.length > 0) {
                  const n = this.directionality.value, s = this.layout;
                  "row" === s && "rtl" === n
                      ? this.styleCache = Am
                      : "row" === s && "rtl" !== n
                            ? this.styleCache = Rm
                            : "column" === s && "rtl" === n
                                  ? this.styleCache = Im
                                  : "column" === s && "rtl" !== n &&
                                        (this.styleCache = Om),
                        this.addStyles(
                            t, {directionality : n, items : e, layout : s})
                }
              }
              clearStyles() {
                const t = Object.keys(this.mru).length > 0,
                      e = t ? "padding"
                            : Lm(this.directionality.value, this.layout);
                t && super.clearStyles(), this.styleUtils.applyStyleToElements(
                                              {[e] : ""}, this.childrenNodes)
              }
              willDisplay(t) {
                const e = this.marshal.getValue(t, "show-hide");
                return !0 === e ||
                       void 0 === e &&
                           "none" !== this.styleUtils.lookupStyle(t, "display")
              }
              buildChildObservable() {
                this.zone.runOutsideAngular(
                    () => {
                        "undefined" != typeof MutationObserver &&
                        (this.observer = new MutationObserver(
                             t => {t.some(t => t.addedNodes &&
                                                   t.addedNodes.length > 0 ||
                                               t.removedNodes &&
                                                   t.removedNodes.length > 0) &&
                                   this.observerSubject.next()}),
                         this.observer.observe(this.nativeElement,
                                               {childList : !0}))})
              }
            } return t.\u0275fac =
                                function(e) {
                                  return new (e || t)(So(aa), So(Fl), So(hm),
                                                      So(im), So(Em), So(lm))
                                },
                            t.\u0275dir = we({type : t, features : [ ao ]}),
                            t
          })(),
              Tm = (() => {
                class t extends km {
                  constructor() { super(...arguments), this.inputs = Cm }
                }
                t.\u0275fac = function(n) { return e(n || t) },
                t.\u0275dir = we({
                  type : t,
                  selectors : [
                    [ "", "fxLayoutGap", "" ], [ "", "fxLayoutGap.xs", "" ],
                    [ "", "fxLayoutGap.sm", "" ], [ "", "fxLayoutGap.md", "" ],
                    [ "", "fxLayoutGap.lg", "" ], [ "", "fxLayoutGap.xl", "" ],
                    [ "", "fxLayoutGap.lt-sm", "" ],
                    [ "", "fxLayoutGap.lt-md", "" ],
                    [ "", "fxLayoutGap.lt-lg", "" ],
                    [ "", "fxLayoutGap.lt-xl", "" ],
                    [ "", "fxLayoutGap.gt-xs", "" ],
                    [ "", "fxLayoutGap.gt-sm", "" ],
                    [ "", "fxLayoutGap.gt-md", "" ],
                    [ "", "fxLayoutGap.gt-lg", "" ]
                  ],
                  inputs : {
                    fxLayoutGap : "fxLayoutGap",
                    "fxLayoutGap.xs" : "fxLayoutGap.xs",
                    "fxLayoutGap.sm" : "fxLayoutGap.sm",
                    "fxLayoutGap.md" : "fxLayoutGap.md",
                    "fxLayoutGap.lg" : "fxLayoutGap.lg",
                    "fxLayoutGap.xl" : "fxLayoutGap.xl",
                    "fxLayoutGap.lt-sm" : "fxLayoutGap.lt-sm",
                    "fxLayoutGap.lt-md" : "fxLayoutGap.lt-md",
                    "fxLayoutGap.lt-lg" : "fxLayoutGap.lt-lg",
                    "fxLayoutGap.lt-xl" : "fxLayoutGap.lt-xl",
                    "fxLayoutGap.gt-xs" : "fxLayoutGap.gt-xs",
                    "fxLayoutGap.gt-sm" : "fxLayoutGap.gt-sm",
                    "fxLayoutGap.gt-md" : "fxLayoutGap.gt-md",
                    "fxLayoutGap.gt-lg" : "fxLayoutGap.gt-lg"
                  },
                  features : [ ao ]
                });
                const e = ds(t);
                return t
              })();
          const Am = new Map, Im = new Map, Rm = new Map, Om = new Map,
                Pm = " grid";
          function Lm(t, e) {
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
              return "rtl" === t ? "margin-left" : "margin-right"
            }
          }
          function Dm(t, ...e) {
            if (null == t)
              throw TypeError("Cannot convert undefined or null to object");
            for (let n of e)
              if (null != n)
                for (let e in n)
                  n.hasOwnProperty(e) && (t[e] = n[e]);
            return t
          }
          let Nm = (() => {
            class t extends rm {
              constructor(t) { super(), this.layoutConfig = t }
              buildStyles(t, e) {
                let [n, s, ...i] = t.split(" "), r = i.join(" ");
                const o = e.direction.indexOf("column") > -1 ? "column" : "row",
                      a = gm(o) ? "max-width" : "max-height",
                      l = gm(o) ? "min-width" : "min-height",
                      c = String(r).indexOf("calc") > -1, u = c || "auto" === r,
                      h = String(r).indexOf("%") > -1 && !c,
                      d = String(r).indexOf("px") > -1 ||
                          String(r).indexOf("rem") > -1 ||
                          String(r).indexOf("em") > -1 ||
                          String(r).indexOf("vw") > -1 ||
                          String(r).indexOf("vh") > -1;
                let p = c || d;
                n = "0" == n ? 0 : n, s = "0" == s ? 0 : s;
                const f = !n && !s;
                let m = {};
                const g = {
                  "max-width" : null,
                  "max-height" : null,
                  "min-width" : null,
                  "min-height" : null
                };
                switch (r || "") {
                case "":
                  const t = !1 !== this.layoutConfig.useColumnBasisZero;
                  r = "row" === o ? "0%" : t ? "0.000000001px" : "auto";
                  break;
                case "initial":
                case "nogrow":
                  n = 0, r = "auto";
                  break;
                case "grow":
                  r = "100%";
                  break;
                case "noshrink":
                  s = 0, r = "auto";
                  break;
                case "auto":
                  break;
                case "none":
                  n = 0, s = 0, r = "auto";
                  break;
                default:
                  p || h || isNaN(r) || (r += "%"), "0%" === r && (p = !0),
                      "0px" === r && (r = "0%"),
                      m = Dm(g, c ? {
                        "flex-grow" : n,
                        "flex-shrink" : s,
                        "flex-basis" : p ? r : "100%"
                      }
                                  : {flex : `${n} ${s} ${p ? r : "100%"}`})
                }
                return m.flex || m["flex-grow"] ||
                           (m = Dm(g, c ? {
                              "flex-grow" : n,
                              "flex-shrink" : s,
                              "flex-basis" : r
                            }
                                        : {flex : `${n} ${s} ${r}`})),
                       "0%" !== r && "0px" !== r && "0.000000001px" !== r &&
                           "auto" !== r &&
                           (m[l] = f || p && n ? r : null,
                            m[a] = f || !u && s ? r : null),
                       m[l] || m[a]
                           ? e.hasWrap &&
                                 (m[c ? "flex-basis" : "flex"] =
                                      m[a] ? c ? m[a] : `${n} ${s} ${m[a]}`
                                           : c ? m[l] : `${n} ${s} ${m[l]}`)
                           : m = Dm(g, c ? {
                               "flex-grow" : n,
                               "flex-shrink" : s,
                               "flex-basis" : r
                             }
                                         : {flex : `${n} ${s} ${r}`}),
                             Dm(m, {"box-sizing" : "border-box"})
              }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(Af)) },
                            t.\u0275prov = ht({
                              factory : function() { return new t(Zt(Af)) },
                              token : t,
                              providedIn : "root"
                            }),
                            t
          })();
          const Fm = [
            "fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg",
            "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg",
            "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md",
            "fxFlex.gt-lg"
          ];
          let Mm = (() => {
            class t extends Nf {
              constructor(t, e, n, s, i) {
                super(t, s, e, i), this.layoutConfig = n, this.marshal = i,
                                   this.DIRECTIVE_KEY = "flex",
                                   this.direction = void 0, this.wrap = void 0,
                                   this.flexGrow = "1", this.flexShrink = "1",
                                   this.init()
              }
              get shrink() { return this.flexShrink }
              set shrink(t) { this.flexShrink = t || "1", this.triggerReflow() }
              get grow() { return this.flexGrow }
              set grow(t) { this.flexGrow = t || "1", this.triggerReflow() }
              ngOnInit() {
                this.parentElement &&
                    (this.marshal.trackValue(this.parentElement, "layout")
                         .pipe(vf(this.destroySubject))
                         .subscribe(this.onLayoutChange.bind(this)),
                     this.marshal.trackValue(this.nativeElement, "layout-align")
                         .pipe(vf(this.destroySubject))
                         .subscribe(this.triggerReflow.bind(this)))
              }
              onLayoutChange(t) {
                const e = t.value.split(" ");
                this.direction = e[0],
                this.wrap = void 0 !== e[1] && "wrap" === e[1],
                this.triggerUpdate()
              }
              updateWithValue(t) {
                void 0 === this.direction &&
                    (this.direction = this.getFlexFlowDirection(
                         this.parentElement,
                         !1 !== this.layoutConfig.addFlexToParent)),
                    void 0 === this.wrap &&
                        (this.wrap = this.hasWrap(this.parentElement));
                const e = this.direction, n = e.startsWith("row"),
                      s = this.wrap;
                n &&s ? this.styleCache = Hm
                      : n &&!s ? this.styleCache = Vm
                               : !n &&s ? this.styleCache = Um
                                        : n || s || (this.styleCache = Bm);
                const i = om(String(t).replace(";", ""), this.flexGrow,
                             this.flexShrink);
                this.addStyles(i.join(" "), {direction : e, hasWrap : s})
              }
              triggerReflow() {
                const t = this.activatedValue;
                if (void 0 !== t) {
                  const e = om(t + "", this.flexGrow, this.flexShrink);
                  this.marshal.updateElement(this.nativeElement,
                                             this.DIRECTIVE_KEY, e.join(" "))
                }
              }
            } return t.\u0275fac =
                                function(e) {
                                  return new (e || t)(So(aa), So(im), So(Af),
                                                      So(Nm), So(lm))
                                },
                            t.\u0275dir = we({
                              type : t,
                              inputs : {
                                shrink : [ "fxShrink", "shrink" ],
                                grow : [ "fxGrow", "grow" ]
                              },
                              features : [ ao ]
                            }),
                            t
          })(),
              jm = (() => {
                class t extends Mm {
                  constructor() { super(...arguments), this.inputs = Fm }
                }
                t.\u0275fac = function(n) { return e(n || t) },
                t.\u0275dir = we({
                  type : t,
                  selectors : [
                    [ "", "fxFlex", "" ], [ "", "fxFlex.xs", "" ],
                    [ "", "fxFlex.sm", "" ], [ "", "fxFlex.md", "" ],
                    [ "", "fxFlex.lg", "" ], [ "", "fxFlex.xl", "" ],
                    [ "", "fxFlex.lt-sm", "" ], [ "", "fxFlex.lt-md", "" ],
                    [ "", "fxFlex.lt-lg", "" ], [ "", "fxFlex.lt-xl", "" ],
                    [ "", "fxFlex.gt-xs", "" ], [ "", "fxFlex.gt-sm", "" ],
                    [ "", "fxFlex.gt-md", "" ], [ "", "fxFlex.gt-lg", "" ]
                  ],
                  inputs : {
                    fxFlex : "fxFlex",
                    "fxFlex.xs" : "fxFlex.xs",
                    "fxFlex.sm" : "fxFlex.sm",
                    "fxFlex.md" : "fxFlex.md",
                    "fxFlex.lg" : "fxFlex.lg",
                    "fxFlex.xl" : "fxFlex.xl",
                    "fxFlex.lt-sm" : "fxFlex.lt-sm",
                    "fxFlex.lt-md" : "fxFlex.lt-md",
                    "fxFlex.lt-lg" : "fxFlex.lt-lg",
                    "fxFlex.lt-xl" : "fxFlex.lt-xl",
                    "fxFlex.gt-xs" : "fxFlex.gt-xs",
                    "fxFlex.gt-sm" : "fxFlex.gt-sm",
                    "fxFlex.gt-md" : "fxFlex.gt-md",
                    "fxFlex.gt-lg" : "fxFlex.gt-lg"
                  },
                  features : [ ao ]
                });
                const e = ds(t);
                return t
              })();
          const Vm = new Map, Bm = new Map, Hm = new Map, Um = new Map, zm = {
            margin : 0,
            width : "100%",
            height : "100%",
            "min-width" : "100%",
            "min-height" : "100%"
          };
          let $m = (() => {
            class t extends rm {
              buildStyles(t) { return zm }
            }
            t.\u0275fac = function(n) { return e(n || t) },
            t.\u0275prov = ht({
              factory : function() { return new t },
              token : t,
              providedIn : "root"
            });
            const e = ds(t);
            return t
          })(),
              qm = (() => {
                class t extends
                    Nf {
                      constructor(t, e, n, s) {
                        super(t, n, e, s), this.styleCache = Wm,
                                           this.addStyles("")
                      }
                    } return t.\u0275fac =
                        function(e) {
                          return new (e || t)(So(aa), So(im), So($m), So(lm))
                        },
                    t.\u0275dir = we({
                      type : t,
                      selectors :
                          [ [ "", "fxFill", "" ], [ "", "fxFlexFill", "" ] ],
                      features : [ ao ]
                    }),
                    t
              })();
          const Wm = new Map;
          let Gm = (() => {
            class t extends rm {
              buildStyles(t, e) {
                const n = {}, [ s, i ] = t.split(" ");
                switch (s) {
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
                  n["justify-content"] = "flex-start"
                }
                switch (i) {
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
                  n["align-content"] = "space-between",
                  n["align-items"] = "stretch";
                  break;
                case "space-around":
                  n["align-content"] = "space-around",
                  n["align-items"] = "stretch";
                  break;
                case "baseline":
                  n["align-content"] = "stretch", n["align-items"] = "baseline";
                  break;
                case "stretch":
                default:
                  n["align-items"] = n["align-content"] = "stretch"
                }
                return Dm(n, {
                  display : e.inline ? "inline-flex" : "flex",
                  "flex-direction" : e.layout,
                  "box-sizing" : "border-box",
                  "max-width" : "stretch" === i ? gm(e.layout) ? null : "100%"
                                                : null,
                  "max-height" : "stretch" === i && gm(e.layout) ? "100%" : null
                })
              }
            }
            t.\u0275fac = function(n) { return e(n || t) },
            t.\u0275prov = ht({
              factory : function() { return new t },
              token : t,
              providedIn : "root"
            });
            const e = ds(t);
            return t
          })();
          const Qm = [
            "fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm",
            "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl",
            "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg",
            "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm",
            "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"
          ];
          let Km = (() => {
            class t extends Nf {
              constructor(t, e, n, s) {
                super(t, n, e, s),
                    this.DIRECTIVE_KEY = "layout-align", this.layout = "row",
                    this.inline = !1, this.init(),
                    this.marshal.trackValue(this.nativeElement, "layout")
                        .pipe(vf(this.destroySubject))
                        .subscribe(this.onLayoutChange.bind(this))
              }
              updateWithValue(t) {
                const e = this.layout || "row", n = this.inline;
                "row" === e &&n
                    ? this.styleCache = eg
                    : "row" !== e || n
                          ? "row-reverse" === e &&n
                                ? this.styleCache = sg
                                : "row-reverse" !== e || n
                                      ? "column" === e &&n
                                            ? this.styleCache = ng
                                            : "column" !== e || n
                                                  ? "column-reverse" === e &&n
                                                        ? this.styleCache = ig
                                                        : "column-reverse" !==
                                                                  e ||
                                                              n ||
                                                              (this.styleCache =
                                                                   tg)
                                                  : this.styleCache = Xm
                                      : this.styleCache = Jm
                          : this.styleCache = Ym,
                      this.addStyles(t, {layout : e, inline : n})
              }
              onLayoutChange(t) {
                const e = t.value.split(" ");
                this.layout = e[0], this.inline = t.value.includes("inline"),
                fm.find(t => t === this.layout) || (this.layout = "row"),
                this.triggerUpdate()
              }
            } return t.\u0275fac =
                                function(e) {
                                  return new (e || t)(So(aa), So(im), So(Gm),
                                                      So(lm))
                                },
                            t.\u0275dir = we({type : t, features : [ ao ]}),
                            t
          })(),
              Zm = (() => {
                class t extends Km {
                  constructor() { super(...arguments), this.inputs = Qm }
                }
                t.\u0275fac = function(n) { return e(n || t) },
                t.\u0275dir = we({
                  type : t,
                  selectors : [
                    [ "", "fxLayoutAlign", "" ], [ "", "fxLayoutAlign.xs", "" ],
                    [ "", "fxLayoutAlign.sm", "" ],
                    [ "", "fxLayoutAlign.md", "" ],
                    [ "", "fxLayoutAlign.lg", "" ],
                    [ "", "fxLayoutAlign.xl", "" ],
                    [ "", "fxLayoutAlign.lt-sm", "" ],
                    [ "", "fxLayoutAlign.lt-md", "" ],
                    [ "", "fxLayoutAlign.lt-lg", "" ],
                    [ "", "fxLayoutAlign.lt-xl", "" ],
                    [ "", "fxLayoutAlign.gt-xs", "" ],
                    [ "", "fxLayoutAlign.gt-sm", "" ],
                    [ "", "fxLayoutAlign.gt-md", "" ],
                    [ "", "fxLayoutAlign.gt-lg", "" ]
                  ],
                  inputs : {
                    fxLayoutAlign : "fxLayoutAlign",
                    "fxLayoutAlign.xs" : "fxLayoutAlign.xs",
                    "fxLayoutAlign.sm" : "fxLayoutAlign.sm",
                    "fxLayoutAlign.md" : "fxLayoutAlign.md",
                    "fxLayoutAlign.lg" : "fxLayoutAlign.lg",
                    "fxLayoutAlign.xl" : "fxLayoutAlign.xl",
                    "fxLayoutAlign.lt-sm" : "fxLayoutAlign.lt-sm",
                    "fxLayoutAlign.lt-md" : "fxLayoutAlign.lt-md",
                    "fxLayoutAlign.lt-lg" : "fxLayoutAlign.lt-lg",
                    "fxLayoutAlign.lt-xl" : "fxLayoutAlign.lt-xl",
                    "fxLayoutAlign.gt-xs" : "fxLayoutAlign.gt-xs",
                    "fxLayoutAlign.gt-sm" : "fxLayoutAlign.gt-sm",
                    "fxLayoutAlign.gt-md" : "fxLayoutAlign.gt-md",
                    "fxLayoutAlign.gt-lg" : "fxLayoutAlign.gt-lg"
                  },
                  features : [ ao ]
                });
                const e = ds(t);
                return t
              })();
          const Ym = new Map, Xm = new Map, Jm = new Map, tg = new Map,
                eg = new Map, ng = new Map, sg = new Map, ig = new Map;
          let rg, og = (() => {
                    class t {} return t.\u0275mod = ve({type : t}),
                    t.\u0275inj = dt({
                      factory : function(e) { return new (e || t) },
                      imports : [ [ Ef, dm ] ]
                    }),
                    t
                  })();
          try {
            rg = "undefined" != typeof Intl && Intl.v8BreakIterator
          } catch (Qw) {
            rg = !1
          }
          let ag, lg,
              cg = (() => {
                class t {
                  constructor(t) {
                    this._platformId = t,
                    this.isBrowser =
                        this._platformId
                            ? Qc(this._platformId)
                            : "object" == typeof document && !!document,
                    this.EDGE =
                        this.isBrowser && /(edge)/i.test(navigator.userAgent),
                    this.TRIDENT = this.isBrowser &&
                                   /(msie|trident)/i.test(navigator.userAgent),
                    this.BLINK = this.isBrowser && !(!window.chrome && !rg) &&
                                 "undefined" != typeof CSS && !this.EDGE &&
                                 !this.TRIDENT,
                    this.WEBKIT = this.isBrowser &&
                                  /AppleWebKit/i.test(navigator.userAgent) &&
                                  !this.BLINK && !this.EDGE && !this.TRIDENT,
                    this.IOS = this.isBrowser &&
                               /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                               !("MSStream" in window),
                    this.FIREFOX =
                        this.isBrowser &&
                        /(firefox|minefield)/i.test(navigator.userAgent),
                    this.ANDROID = this.isBrowser &&
                                   /android/i.test(navigator.userAgent) &&
                                   !this.TRIDENT,
                    this.SAFARI = this.isBrowser &&
                                  /safari/i.test(navigator.userAgent) &&
                                  this.WEBKIT
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(wl)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(wl)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })(),
              ug = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj =
                    dt({factory : function(e) { return new (e || t) }}),
                t
              })();
          function hg(t) {
            return function() {
              if (null == ag && "undefined" != typeof window)
                try {
                  window.addEventListener(
                      "test", null,
                      Object.defineProperty({}, "passive",
                                            {get : () => ag = !0}))
                } finally {
                  ag = ag || !1
                }
              return ag
            }()
                       ? t
                       : !!t.capture
          }
          function dg(t, ...e) {
            return e.length ? e.some(e => t[e])
                            : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey
          }
          function pg(t) { return null != t && "" + t != "false" }
          function fg(t, e = 0) {
            return function(
                       t) { return !isNaN(parseFloat(t)) && !isNaN(Number(t)) }(
                       t)
                       ? Number(t)
                       : e
          }
          function mg(t) { return Array.isArray(t) ? t : [ t ] }
          function gg(t) {
            return null == t ? "" : "string" == typeof t ? t : t + "px"
          }
          function yg(t) { return t instanceof aa ? t.nativeElement : t }
          let _g = (() => {
            class t {
              create(t) {
                return "undefined" == typeof MutationObserver
                           ? null
                           : new MutationObserver(t)
              }
            } return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275prov = ht({
              factory : function() { return new t },
              token : t,
              providedIn : "root"
            }),
            t
          })(),
              vg = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  providers : [ _g ]
                }),
                t
              })();
          function bg(t, e) {
            return (t.getAttribute(e) || "").match(/\S+/g) || []
          }
          const wg = "cdk-describedby-message-container",
                xg = "cdk-describedby-host";
          let Sg = 0;
          const Eg = new Map;
          let Cg = null,
              kg = (() => {
                class t {
                  constructor(t, e) { this._platform = e, this._document = t }
                  describe(t, e) {
                    this._canBeDescribed(t, e) &&
                        ("string" != typeof e
                             ? (this._setMessageId(e),
                                Eg.set(
                                    e,
                                    {messageElement : e, referenceCount : 0}))
                             : Eg.has(e) || this._createMessageElement(e),
                         this._isElementDescribedByMessage(t, e) ||
                             this._addMessageReference(t, e))
                  }
                  removeDescription(t, e) {
                    if (e && this._isElementNode(t)) {
                      if (this._isElementDescribedByMessage(t, e) &&
                              this._removeMessageReference(t, e),
                          "string" == typeof e) {
                        const t = Eg.get(e);
                        t && 0 === t.referenceCount &&
                            this._deleteMessageElement(e)
                      }
                      Cg && 0 === Cg.childNodes.length &&
                          this._deleteMessagesContainer()
                    }
                  }
                  ngOnDestroy() {
                    const t = this._document.querySelectorAll(
                        "[cdk-describedby-host]");
                    for (let e = 0; e < t.length; e++)
                      this._removeCdkDescribedByReferenceIds(t[e]),
                          t[e].removeAttribute(xg);
                    Cg && this._deleteMessagesContainer(), Eg.clear()
                  }
                  _createMessageElement(t) {
                    const e = this._document.createElement("div");
                    this._setMessageId(e),
                        e.textContent = t, this._createMessagesContainer(),
                        Cg.appendChild(e),
                        Eg.set(t, {messageElement : e, referenceCount : 0})
                  }
                  _setMessageId(t) {
                    t.id || (t.id = "cdk-describedby-message-" + Sg++)
                  }
                  _deleteMessageElement(t) {
                    const e = Eg.get(t), n = e && e.messageElement;
                    Cg && n && Cg.removeChild(n), Eg.delete(t)
                  }
                  _createMessagesContainer() {
                    if (!Cg) {
                      const t = !this._platform ||
                                !this._platform.EDGE && !this._platform.TRIDENT,
                            e = this._document.getElementById(wg);
                      e && e.parentNode && e.parentNode.removeChild(e),
                          Cg = this._document.createElement("div"), Cg.id = wg,
                          Cg.classList.add("cdk-visually-hidden"),
                          Cg.setAttribute("aria-hidden", t + ""),
                          this._document.body.appendChild(Cg)
                    }
                  }
                  _deleteMessagesContainer() {
                    Cg && Cg.parentNode &&
                        (Cg.parentNode.removeChild(Cg), Cg = null)
                  }
                  _removeCdkDescribedByReferenceIds(t) {
                    const e =
                        bg(t, "aria-describedby")
                            .filter(t => 0 !=
                                         t.indexOf("cdk-describedby-message"));
                    t.setAttribute("aria-describedby", e.join(" "))
                  }
                  _addMessageReference(t, e) {
                    const n = Eg.get(e);
                    !function(t, e, n) {
                      const s = bg(t, e);
                      s.some(t => t.trim() == n.trim()) ||
                          (s.push(n.trim()), t.setAttribute(e, s.join(" ")))
                    }(t, "aria-describedby", n.messageElement.id),
                        t.setAttribute(xg, ""), n.referenceCount++
                  }
                  _removeMessageReference(t, e) {
                    const n = Eg.get(e);
                    n.referenceCount--,
                        function(t, e, n) {
                          const s = bg(t, e).filter(t => t != n.trim());
                          s.length ? t.setAttribute(e, s.join(" "))
                                   : t.removeAttribute(e)
                        }(t, "aria-describedby", n.messageElement.id),
                        t.removeAttribute(xg)
                  }
                  _isElementDescribedByMessage(t, e) {
                    const n = bg(t, "aria-describedby"), s = Eg.get(e),
                          i = s && s.messageElement.id;
                    return !!i && -1 != n.indexOf(i)
                  }
                  _canBeDescribed(t, e) {
                    if (!this._isElementNode(t))
                      return !1;
                    if (e && "object" == typeof e)
                      return !0;
                    const n = null == e ? "" : ("" + e).trim(),
                          s = t.getAttribute("aria-label");
                    return !(!n || s && s.trim() === n)
                  }
                  _isElementNode(t) {
                    return t.nodeType === this._document.ELEMENT_NODE
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(pc), Zt(cg)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(pc), Zt(cg)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
          function Tg(t) { return 0 === t.buttons }
          "undefined" != typeof Element && Element;
          const Ag = new Vt("cdk-focus-monitor-default-options"),
                Ig = hg({passive : !0, capture : !0});
          let Rg = (() => {
            class t {
              constructor(t, e, n, s) {
                this._ngZone = t, this._platform = e, this._origin = null,
                this._windowFocused = !1, this._elementInfo = new Map,
                this._monitoredElementCount = 0,
                this._rootNodeFocusListenerCount = new Map,
                this._documentKeydownListener =
                    () => {
                      this._lastTouchTarget = null,
                      this._setOriginForCurrentEventQueue("keyboard")
                    },
                this._documentMousedownListener =
                    t => {
                      if (!this._lastTouchTarget) {
                        const e = Tg(t) ? "keyboard" : "mouse";
                        this._setOriginForCurrentEventQueue(e)
                      }
                    },
                this._documentTouchstartListener =
                    t => {
                      null != this._touchTimeoutId &&
                          clearTimeout(this._touchTimeoutId),
                          this._lastTouchTarget = Og(t),
                          this._touchTimeoutId = setTimeout(
                              () => this._lastTouchTarget = null, 650)
                    },
                this._windowFocusListener =
                    () => {
                      this._windowFocused = !0,
                      this._windowFocusTimeoutId =
                          setTimeout(() => this._windowFocused = !1)
                    },
                this._rootNodeFocusAndBlurListener =
                    t => {
                      const e = Og(t), n = "focus" === t.type ? this._onFocus
                                                              : this._onBlur;
                      for (let s = e; s; s = s.parentElement)
                        n.call(this, t, s)
                    },
                this._document = n,
                this._detectionMode =
                    (null == s ? void 0 : s.detectionMode) || 0
              }
              monitor(t, e = !1) {
                if (!this._platform.isBrowser)
                  return Iu(null);
                const n = yg(t), s = function(t) {
                  if (function() {
                        if (null == lg) {
                          const t = "undefined" != typeof document
                                        ? document.head
                                        : null;
                          lg = !(!t || !t.createShadowRoot && !t.attachShadow)
                        }
                        return lg
                      }()) {
                    const e = t.getRootNode ? t.getRootNode() : null;
                    if ("undefined" != typeof ShadowRoot && ShadowRoot &&
                        e instanceof ShadowRoot)
                      return e
                  }
                  return null
                }(n) || this._getDocument(), i = this._elementInfo.get(n);
                if (i)
                  return e && (i.checkChildren = !0), i.subject;
                const r = {checkChildren : e, subject : new S, rootNode : s};
                return this._elementInfo.set(n, r),
                       this._registerGlobalListeners(r), r.subject
              }
              stopMonitoring(t) {
                const e = yg(t), n = this._elementInfo.get(e);
                n && (n.subject.complete(), this._setClasses(e),
                      this._elementInfo.delete(e),
                      this._removeGlobalListeners(n))
              }
              focusVia(t, e, n) {
                const s = yg(t);
                this._setOriginForCurrentEventQueue(e),
                    "function" == typeof s.focus && s.focus(n)
              }
              ngOnDestroy() {
                this._elementInfo.forEach((t, e) => this.stopMonitoring(e))
              }
              _getDocument() { return this._document || document }
              _getWindow() { return this._getDocument().defaultView || window }
              _toggleClass(t, e, n) {
                n ? t.classList.add(e) : t.classList.remove(e)
              }
              _getFocusOrigin(t) {
                return this._origin
                           ? this._origin
                           : this._windowFocused && this._lastFocusOrigin
                                 ? this._lastFocusOrigin
                                 : this._wasCausedByTouch(t) ? "touch"
                                                             : "program"
              }
              _setClasses(t, e) {
                this._toggleClass(t, "cdk-focused", !!e),
                    this._toggleClass(t, "cdk-touch-focused", "touch" === e),
                    this._toggleClass(t, "cdk-keyboard-focused",
                                      "keyboard" === e),
                    this._toggleClass(t, "cdk-mouse-focused", "mouse" === e),
                    this._toggleClass(t, "cdk-program-focused", "program" === e)
              }
              _setOriginForCurrentEventQueue(t) {
                this._ngZone.runOutsideAngular(() => {
                  this._origin = t,
                  0 === this._detectionMode &&
                      (this._originTimeoutId =
                           setTimeout(() => this._origin = null, 1))
                })
              }
              _wasCausedByTouch(t) {
                const e = Og(t);
                return this._lastTouchTarget instanceof Node &&
                       e instanceof Node &&
                       (e === this._lastTouchTarget ||
                        e.contains(this._lastTouchTarget))
              }
              _onFocus(t, e) {
                const n = this._elementInfo.get(e);
                if (!n || !n.checkChildren && e !== Og(t))
                  return;
                const s = this._getFocusOrigin(t);
                this._setClasses(e, s), this._emitOrigin(n.subject, s),
                    this._lastFocusOrigin = s
              }
              _onBlur(t, e) {
                const n = this._elementInfo.get(e);
                !n ||
                    n.checkChildren && t.relatedTarget instanceof Node &&
                        e.contains(t.relatedTarget) ||
                    (this._setClasses(e), this._emitOrigin(n.subject, null))
              }
              _emitOrigin(t, e) { this._ngZone.run(() => t.next(e)) }
              _registerGlobalListeners(t) {
                if (!this._platform.isBrowser)
                  return;
                const e = t.rootNode,
                      n = this._rootNodeFocusListenerCount.get(e) || 0;
                n || this._ngZone.runOutsideAngular(() => {
                  e.addEventListener("focus",
                                     this._rootNodeFocusAndBlurListener, Ig),
                  e.addEventListener("blur", this._rootNodeFocusAndBlurListener,
                                     Ig)
                }),
                    this._rootNodeFocusListenerCount.set(e, n + 1),
                    1 == ++this._monitoredElementCount &&
                        this._ngZone.runOutsideAngular(() => {
                          const t = this._getDocument(), e = this._getWindow();
                          t.addEventListener("keydown",
                                             this._documentKeydownListener, Ig),
                              t.addEventListener(
                                  "mousedown", this._documentMousedownListener,
                                  Ig),
                              t.addEventListener(
                                  "touchstart",
                                  this._documentTouchstartListener, Ig),
                              e.addEventListener("focus",
                                                 this._windowFocusListener)
                        })
              }
              _removeGlobalListeners(t) {
                const e = t.rootNode;
                if (this._rootNodeFocusListenerCount.has(e)) {
                  const t = this._rootNodeFocusListenerCount.get(e);
                  t > 1 ? this._rootNodeFocusListenerCount.set(e, t - 1)
                        : (e.removeEventListener(
                               "focus", this._rootNodeFocusAndBlurListener, Ig),
                           e.removeEventListener(
                               "blur", this._rootNodeFocusAndBlurListener, Ig),
                           this._rootNodeFocusListenerCount.delete(e))
                }
                if (!--this._monitoredElementCount) {
                  const t = this._getDocument(), e = this._getWindow();
                  t.removeEventListener("keydown",
                                        this._documentKeydownListener, Ig),
                      t.removeEventListener(
                          "mousedown", this._documentMousedownListener, Ig),
                      t.removeEventListener(
                          "touchstart", this._documentTouchstartListener, Ig),
                      e.removeEventListener("focus", this._windowFocusListener),
                      clearTimeout(this._windowFocusTimeoutId),
                      clearTimeout(this._touchTimeoutId),
                      clearTimeout(this._originTimeoutId)
                }
              }
            } return t.\u0275fac =
                function(e) {
                  return new (e || t)(Zt(Fl), Zt(cg), Zt(pc, 8), Zt(Ag, 8))
                },
            t.\u0275prov = ht({
              factory : function() {
                return new t(Zt(Fl), Zt(cg), Zt(pc, 8), Zt(Ag, 8))
              },
              token : t,
              providedIn : "root"
            }),
            t
          })();
          function Og(t) {
            return t.composedPath ? t.composedPath()[0] : t.target
          }
          const Pg = "cdk-high-contrast-black-on-white",
                Lg = "cdk-high-contrast-white-on-black",
                Dg = "cdk-high-contrast-active";
          let Ng = (() => {
            class t {
              constructor(t, e) { this._platform = t, this._document = e }
              getHighContrastMode() {
                if (!this._platform.isBrowser)
                  return 0;
                const t = this._document.createElement("div");
                t.style.backgroundColor = "rgb(1,2,3)",
                t.style.position = "absolute",
                this._document.body.appendChild(t);
                const e = this._document.defaultView || window,
                      n = e && e.getComputedStyle ? e.getComputedStyle(t)
                                                  : null,
                      s = (n && n.backgroundColor || "").replace(/ /g, "");
                switch (this._document.body.removeChild(t), s) {
                case "rgb(0,0,0)":
                  return 2;
                case "rgb(255,255,255)":
                  return 1
                }
                return 0
              }
              _applyBodyHighContrastModeCssClasses() {
                if (this._platform.isBrowser && this._document.body) {
                  const t = this._document.body.classList;
                  t.remove(Dg), t.remove(Pg), t.remove(Lg);
                  const e = this.getHighContrastMode();
                  1 === e ? (t.add(Dg), t.add(Pg))
                          : 2 === e && (t.add(Dg), t.add(Lg))
                }
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(cg), Zt(pc)) },
            t.\u0275prov = ht({
              factory : function() { return new t(Zt(cg), Zt(pc)) },
              token : t,
              providedIn : "root"
            }),
            t
          })(),
              Fg = (() => {
                class t {
                  constructor(t) { t._applyBodyHighContrastModeCssClasses() }
                } return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t)(Zt(Ng)) },
                  imports : [ [ ug, vg ] ]
                }),
                t
              })();
          const Mg = new fa("10.2.2");
          class jg {}
          const Vg = "*";
          function Bg(t, e) {
            return { type: 7, name: t, definitions: e, options: {} }
          }
          function Hg(t, e = null) {
            return { type: 4, styles: e, timings: t }
          }
          function Ug(t, e = null) {
            return { type: 2, steps: t, options: e }
          }
          function zg(t) {
            return { type: 6, styles: t, offset: null }
          }
          function $g(t, e, n) {
            return { type: 0, name: t, styles: e, options: n }
          }
          function qg(t) {
            return { type: 5, steps: t }
          }
          function Wg(t, e, n = null) {
            return { type: 1, expr: t, animation: e, options: n }
          }
          function Gg(t) { Promise.resolve(null).then(t) }
          class Qg {
            constructor(t = 0, e = 0) {
              this._onDoneFns = [], this._onStartFns = [],
              this._onDestroyFns = [], this._started = !1, this._destroyed = !1,
              this._finished = !1, this.parentPlayer = null,
              this.totalTime = t + e
            }
            _onFinish() {
              this._finished ||
                  (this._finished = !0, this._onDoneFns.forEach(t => t()),
                   this._onDoneFns = [])
            }
            onStart(t) { this._onStartFns.push(t) }
            onDone(t) { this._onDoneFns.push(t) }
            onDestroy(t) { this._onDestroyFns.push(t) }
            hasStarted() { return this._started }
            init() {}
            play() {
              this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
                  this._started = !0
            }
            triggerMicrotask() { Gg(() => this._onFinish()) }
            _onStart() {
              this._onStartFns.forEach(t => t()), this._onStartFns = []
            }
            pause() {}
            restart() {}
            finish() { this._onFinish() }
            destroy() {
              this._destroyed ||
                  (this._destroyed = !0, this.hasStarted() || this._onStart(),
                   this.finish(), this._onDestroyFns.forEach(t => t()),
                   this._onDestroyFns = [])
            }
            reset() {}
            setPosition(t) {}
            getPosition() { return 0 }
            triggerCallback(t) {
              const e = "start" == t ? this._onStartFns : this._onDoneFns;
              e.forEach(t => t()), e.length = 0
            }
          }
          class Kg {
            constructor(t) {
              this._onDoneFns = [], this._onStartFns = [], this._finished = !1,
              this._started = !1, this._destroyed = !1, this._onDestroyFns = [],
              this.parentPlayer = null, this.totalTime = 0, this.players = t;
              let e = 0, n = 0, s = 0;
              const i = this.players.length;
              0 == i ? Gg(() => this._onFinish()) : this.players.forEach(t => {
                t.onDone(() => {++e == i && this._onFinish()}),
                t.onDestroy(() => {++n == i && this._onDestroy()}),
                t.onStart(() => {++s == i && this._onStart()})
              }),
                  this.totalTime =
                      this.players.reduce((t, e) => Math.max(t, e.totalTime), 0)
            }
            _onFinish() {
              this._finished ||
                  (this._finished = !0, this._onDoneFns.forEach(t => t()),
                   this._onDoneFns = [])
            }
            init() { this.players.forEach(t => t.init()) }
            onStart(t) { this._onStartFns.push(t) }
            _onStart() {
              this.hasStarted() ||
                  (this._started = !0, this._onStartFns.forEach(t => t()),
                   this._onStartFns = [])
            }
            onDone(t) { this._onDoneFns.push(t) }
            onDestroy(t) { this._onDestroyFns.push(t) }
            hasStarted() { return this._started }
            play() {
              this.parentPlayer || this.init(), this._onStart(),
                  this.players.forEach(t => t.play())
            }
            pause() { this.players.forEach(t => t.pause()) }
            restart() { this.players.forEach(t => t.restart()) }
            finish() { this._onFinish(), this.players.forEach(t => t.finish()) }
            destroy() { this._onDestroy() }
            _onDestroy() {
              this._destroyed || (this._destroyed = !0, this._onFinish(),
                                  this.players.forEach(t => t.destroy()),
                                  this._onDestroyFns.forEach(t => t()),
                                  this._onDestroyFns = [])
            }
            reset() {
              this.players.forEach(t => t.reset()),
                  this._destroyed = !1, this._finished = !1, this._started = !1
            }
            setPosition(t) {
              const e = t * this.totalTime;
              this.players.forEach(t => {
                const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
                t.setPosition(n)
              })
            }
            getPosition() {
              let t = 0;
              return this.players.forEach(e => {
                const n = e.getPosition();
                t = Math.min(n, t)
              }),
                     t
            }
            beforeDestroy() {
              this.players.forEach(t => {t.beforeDestroy && t.beforeDestroy()})
            }
            triggerCallback(t) {
              const e = "start" == t ? this._onStartFns : this._onDoneFns;
              e.forEach(t => t()), e.length = 0
            }
          }
          function Zg() {
            return "undefined" != typeof process &&
                   "[object process]" === {}.toString.call(process)
          }
          function Yg(t) {
            switch (t.length) {
            case 0:
              return new Qg;
            case 1:
              return t[0];
            default:
              return new Kg(t)
            }
          }
          function Xg(t, e, n, s, i = {}, r = {}) {
            const o = [], a = [];
            let l = -1, c = null;
            if (s.forEach(t => {
                  const n = t.offset, s = n == l, u = s && c || {};
                  Object.keys(t).forEach(n => {
                    let s = n, a = t[n];
                    if ("offset" !== n)
                      switch (s = e.normalizePropertyName(s, o), a) {
                      case "!":
                        a = i[n];
                        break;
                      case Vg:
                        a = r[n];
                        break;
                      default:
                        a = e.normalizeStyleValue(n, s, a, o)
                      }
                    u[s] = a
                  }),
                      s || a.push(u), c = u, l = n
                }),
                o.length) {
              const t = "\n - ";
              throw new Error(`Unable to animate due to the following errors:${
                  t}${o.join(t)}`)
            }
            return a
          }
          function Jg(t, e, n, s) {
            switch (e) {
            case "start":
              t.onStart(() => s(n && ty(n, "start", t)));
              break;
            case "done":
              t.onDone(() => s(n && ty(n, "done", t)));
              break;
            case "destroy":
              t.onDestroy(() => s(n && ty(n, "destroy", t)))
            }
          }
          function ty(t, e, n) {
            const s = n.totalTime,
                  i = ey(t.element, t.triggerName, t.fromState, t.toState,
                         e || t.phaseName, null == s ? t.totalTime : s,
                         !!n.disabled),
                  r = t._data;
            return null != r && (i._data = r), i
          }
          function ey(t, e, n, s, i = "", r = 0, o) {
            return {
              element: t, triggerName: e, fromState: n, toState: s,
                  phaseName: i, totalTime: r, disabled: !!o
            }
          }
          function ny(t, e, n) {
            let s;
            return t instanceof Map ? (s = t.get(e), s || t.set(e, s = n))
                                    : (s = t[e], s || (s = t[e] = n)),
                   s
          }
          function sy(t) {
            const e = t.indexOf(":");
            return [ t.substring(1, e), t.substr(e + 1) ]
          }
          let iy = (t, e) => !1, ry = (t, e) => !1, oy = (t, e, n) => [];
          const ay = Zg();
          (ay || "undefined" != typeof Element) &&
              (iy = (t, e) => t.contains(e),
               ry = (() => {
                 if (ay || Element.prototype.matches)
                   return (t, e) => t.matches(e);
                 {
                   const t = Element.prototype,
                         e = t.matchesSelector || t.mozMatchesSelector ||
                             t.msMatchesSelector || t.oMatchesSelector ||
                             t.webkitMatchesSelector;
                   return e ? (t, n) => e.apply(t, [ n ]) : ry
                 }
               })(),
               oy = (t, e, n) => {
                 let s = [];
                 if (n)
                   s.push(...t.querySelectorAll(e));
                 else {
                   const n = t.querySelector(e);
                   n && s.push(n)
                 }
                 return s
               });
          let ly = null, cy = !1;
          function uy(t) {
            ly ||
                (ly = ("undefined" != typeof document ? document.body : null) ||
                      {},
                 cy = !!ly.style && "WebkitAppearance" in ly.style);
            let e = !0;
            return ly.style &&
                       !function(t) { return "ebkit" == t.substring(1, 6) }(
                           t) &&
                       (e = t in ly.style, !e && cy) &&
                       (e = "Webkit" + t.charAt(0).toUpperCase() +
                                t.substr(1) in ly.style),
                   e
          }
          const hy = ry, dy = iy, py = oy;
          function fy(t) {
            const e = {};
            return Object.keys(t).forEach(n => {
              const s = n.replace(/([a-z])([A-Z])/g, "$1-$2");
              e[s] = t[n]
            }),
                   e
          }
          let my = (() => {
            class t {
              validateStyleProperty(t) { return uy(t) }
              matchesElement(t, e) { return hy(t, e) }
              containsElement(t, e) { return dy(t, e) }
              query(t, e, n) { return py(t, e, n) }
              computeStyle(t, e, n) { return n || "" }
              animate(t, e, n, s, i, r = [], o) { return new Qg(n, s) }
            } return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })(),
              gy = (() => {class t {} return t.NOOP = new my, t})();
          const yy = "ng-enter", _y = "ng-leave", vy = "ng-trigger",
                by = ".ng-trigger", wy = "ng-animating", xy = ".ng-animating";
          function Sy(t) {
            if ("number" == typeof t)
              return t;
            const e = t.match(/^(-?[\.\d]+)(m?s)/);
            return !e || e.length < 2 ? 0 : Ey(parseFloat(e[1]), e[2])
          }
          function Ey(t, e) {
            switch (e) {
            case "s":
              return 1e3 * t;
            default:
              return t
            }
          }
          function Cy(t, e, n) {
            return t.hasOwnProperty("duration") ? t : function(t, e, n) {
              let s, i = 0, r = "";
              if ("string" == typeof t) {
                const n = t.match(
                    /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                if (null === n)
                  return e.push(`The provided timing value "${t}" is invalid.`),
                         {duration : 0, delay : 0, easing : ""};
                s = Ey(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (i = Ey(parseFloat(o), n[4]));
                const a = n[5];
                a && (r = a)
              } else
                s = t;
              if (!n) {
                let n = !1, r = e.length;
                s < 0 &&
                    (e.push(
                         "Duration values below 0 are not allowed for this animation step."),
                     n = !0),
                    i < 0 &&
                        (e.push(
                             "Delay values below 0 are not allowed for this animation step."),
                         n = !0),
                    n &&
                        e.splice(r, 0,
                                 `The provided timing value "${t}" is invalid.`)
              }
              return { duration: s, delay: i, easing: r }
            }(t, e, n)
          }
          function ky(t, e = {}) {
            return Object.keys(t).forEach(n => {e[n] = t[n]}), e
          }
          function Ty(t, e, n = {}) {
            if (e)
              for (let s in t)
                n[s] = t[s];
            else
              ky(t, n);
            return n
          }
          function Ay(t, e, n) { return n ? e + ":" + n + ";" : "" }
          function Iy(t) {
            let e = "";
            for (let n = 0; n < t.style.length; n++) {
              const s = t.style.item(n);
              e += Ay(0, s, t.style.getPropertyValue(s))
            }
            for (const n in t.style)
              t.style.hasOwnProperty(n) && !n.startsWith("_") &&
                  (e +=
                   Ay(0, n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
                      t.style[n]));
            t.setAttribute("style", e)
          }
          function Ry(t, e, n) {
            t.style && (Object.keys(e).forEach(s => {
              const i = jy(s);
              n && !n.hasOwnProperty(s) && (n[s] = t.style[i]),
                  t.style[i] = e[s]
            }),
                        Zg() && Iy(t))
          }
          function Oy(t, e) {
            t.style && (Object.keys(e).forEach(e => {
              const n = jy(e);
              t.style[n] = ""
            }),
                        Zg() && Iy(t))
          }
          function Py(t) {
            return Array.isArray(t) ? 1 == t.length ? t[0] : Ug(t) : t
          }
          const Ly = new RegExp("{{\\s*(.+?)\\s*}}", "g");
          function Dy(t) {
            let e = [];
            if ("string" == typeof t) {
              let n;
              for (; n = Ly.exec(t);)
                e.push(n[1]);
              Ly.lastIndex = 0
            }
            return e
          }
          function Ny(t, e, n) {
            const s = t.toString(), i = s.replace(Ly, (t, s) => {
              let i = e[s];
              return e.hasOwnProperty(s) ||
                         (n.push(
                              "Please provide a value for the animation param " +
                              s),
                          i = ""),
                     i.toString()
            });
            return i == s ? t : i
          }
          function Fy(t) {
            const e = [];
            let n = t.next();
            for (; !n.done;)
              e.push(n.value), n = t.next();
            return e
          }
          const My = /-+([a-z0-9])/g;
          function jy(t) { return t.replace(My, (...t) => t[1].toUpperCase()) }
          function Vy(t, e) { return 0 === t || 0 === e }
          function By(t, e, n) {
            const s = Object.keys(n);
            if (s.length && e.length) {
              let r = e[0], o = [];
              if (s.forEach(
                      t => {r.hasOwnProperty(t) || o.push(t), r[t] = n[t]}),
                  o.length)
                for (var i = 1; i < e.length; i++) {
                  let n = e[i];
                  o.forEach((function(e) { n[e] = Uy(t, e) }))
                }
            }
            return e
          }
          function Hy(t, e, n) {
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
              throw new Error("Unable to resolve animation metadata node #" +
                              e.type)
            }
          }
          function Uy(t, e) { return window.getComputedStyle(t)[e] }
          const zy = "*";
          function $y(t, e) {
            const n = [];
            return "string" == typeof t
                       ? t.split(/\s*,\s*/).forEach(t => function(t, e, n) {
                           if (":" == t[0]) {
                             const s = function(t, e) {
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
                                 return e.push(`The transition alias value "${
                                            t}" is not supported`),
                                        "* => *"
                               }
                             }(t, n);
                             if ("function" == typeof s)
                               return void e.push(s);
                             t = s
                           }
                           const s = t.match(
                               /^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                           if (null == s || s.length < 4)
                             return n.push(
                                        `The provided transition expression "${
                                            t}" is not supported`),
                                    e;
                           const i = s[1], r = s[2], o = s[3];
                           e.push(Gy(i, o)), "<" != r[0] ||
                                                 i == zy && o == zy ||
                                                 e.push(Gy(o, i))
                         }(t, n, e))
                       : n.push(t),
                   n
          }
          const qy = new Set([ "true", "1" ]), Wy = new Set([ "false", "0" ]);
          function Gy(t, e) {
            const n = qy.has(t) || Wy.has(t), s = qy.has(e) || Wy.has(e);
            return (i, r) => {
              let o = t == zy || t == i, a = e == zy || e == r;
              return !o && n && "boolean" == typeof i &&
                         (o = i ? qy.has(t) : Wy.has(t)),
                     !a && s && "boolean" == typeof r &&
                         (a = r ? qy.has(e) : Wy.has(e)),
                     o && a
            }
          }
          const Qy = new RegExp("s*:selfs*,?", "g");
          function Ky(t, e, n) { return new Zy(t).build(e, n) }
          class Zy {
            constructor(t) { this._driver = t }
            build(t, e) {
              const n = new Yy(e);
              return this._resetContextStyleTimingState(n), Hy(this, Py(t), n)
            }
            _resetContextStyleTimingState(t) {
              t.currentQuerySelector = "", t.collectedStyles = {},
              t.collectedStyles[""] = {}, t.currentTime = 0
            }
            visitTrigger(t, e) {
              let n = e.queryCount = 0, s = e.depCount = 0;
              const i = [], r = [];
              return "@" == t.name.charAt(0) &&
                         e.errors.push(
                             "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"),
                     t.definitions.forEach(t => {
                       if (this._resetContextStyleTimingState(e), 0 == t.type) {
                         const n = t, s = n.name;
                         s.toString().split(/\s*,\s*/).forEach(
                             t => {n.name = t, i.push(this.visitState(n, e))}),
                             n.name = s
                       } else if (1 == t.type) {
                         const i = this.visitTransition(t, e);
                         n += i.queryCount, s += i.depCount, r.push(i)
                       } else
                         e.errors.push(
                             "only state() and transition() definitions can sit inside of a trigger()")
                     }),
              {
                type: 7, name: t.name, states: i, transitions: r, queryCount: n,
                    depCount: s, options: null
              }
            }
            visitState(t, e) {
              const n = this.visitStyle(t.styles, e),
                    s = t.options && t.options.params || null;
              if (n.containsDynamicStyles) {
                const i = new Set, r = s || {};
                if (n.styles.forEach(t => {
                      if (Xy(t)) {
                        const e = t;
                        Object.keys(e).forEach(
                            t => {Dy(e[t]).forEach(
                                t => {r.hasOwnProperty(t) || i.add(t)})})
                      }
                    }),
                    i.size) {
                  const n = Fy(i.values());
                  e.errors.push(`state("${
                      t.name}", ...) must define default values for all the following style substitutions: ${
                      n.join(", ")}`)
                }
              }
              return {
                type: 0, name: t.name, style: n,
                    options: s ? {params : s} : null
              }
            }
            visitTransition(t, e) {
              e.queryCount = 0, e.depCount = 0;
              const n = Hy(this, Py(t.animation), e);
              return {
                type: 1, matchers: $y(t.expr, e.errors), animation: n,
                    queryCount: e.queryCount, depCount: e.depCount,
                    options: Jy(t.options)
              }
            }
            visitSequence(t, e) {
              return {
                type: 2, steps: t.steps.map(t => Hy(this, t, e)),
                    options: Jy(t.options)
              }
            }
            visitGroup(t, e) {
              const n = e.currentTime;
              let s = 0;
              const i = t.steps.map(t => {
                e.currentTime = n;
                const i = Hy(this, t, e);
                return s = Math.max(s, e.currentTime), i
              });
              return e.currentTime = s, {
                type: 3, steps: i, options: Jy(t.options)
              }
            }
            visitAnimate(t, e) {
              const n = function(t, e) {
                let n = null;
                if (t.hasOwnProperty("duration"))
                  n = t;
                else if ("number" == typeof t)
                  return t_(Cy(t, e).duration, 0, "");
                const s = t;
                if (s.split(/\s+/).some(t => "{" == t.charAt(0) &&
                                             "{" == t.charAt(1))) {
                  const t = t_(0, 0, "");
                  return t.dynamic = !0, t.strValue = s, t
                }
                return n = n || Cy(s, e), t_(n.duration, n.delay, n.easing)
              }(t.timings, e.errors);
              let s;
              e.currentAnimateTimings = n;
              let i = t.styles ? t.styles : zg({});
              if (5 == i.type)
                s = this.visitKeyframes(i, e);
              else {
                let i = t.styles, r = !1;
                if (!i) {
                  r = !0;
                  const t = {};
                  n.easing && (t.easing = n.easing), i = zg(t)
                }
                e.currentTime += n.duration + n.delay;
                const o = this.visitStyle(i, e);
                o.isEmptyStep = r, s = o
              }
              return e.currentAnimateTimings = null, {
                type: 4, timings: n, style: s, options: null
              }
            }
            visitStyle(t, e) {
              const n = this._makeStyleAst(t, e);
              return this._validateStyleAst(n, e), n
            }
            _makeStyleAst(t, e) {
              const n = [];
              Array.isArray(t.styles)
                  ? t.styles.forEach(
                        t => {
                            "string" == typeof t
                                ? t == Vg
                                      ? n.push(t)
                                      : e.errors.push(
                                            `The provided style string value ${
                                                t} is not allowed.`)
                                : n.push(t)})
                  : n.push(t.styles);
              let s = !1, i = null;
              return n.forEach(t => {
                if (Xy(t)) {
                  const e = t, n = e.easing;
                  if (n && (i = n, delete e.easing), !s)
                    for (let t in e)
                      if (e[t].toString().indexOf("{{") >= 0) {
                        s = !0;
                        break
                      }
                }
              }),
              {
                type: 6, styles: n, easing: i, offset: t.offset,
                    containsDynamicStyles: s, options: null
              }
            }
            _validateStyleAst(t, e) {
              const n = e.currentAnimateTimings;
              let s = e.currentTime, i = e.currentTime;
              n && i > 0 && (i -= n.duration + n.delay),
                  t.styles.forEach(
                      t => {"string" != typeof t && Object.keys(t).forEach(n => {
                        if (!this._driver.validateStyleProperty(n))
                          return void e.errors.push(`The provided animation property "${
                              n}" is not a supported CSS property for animations`);
                        const r = e.collectedStyles[e.currentQuerySelector],
                              o = r[n];
                        let a = !0;
                        o &&
                            (i != s && i >= o.startTime && s <= o.endTime &&
                                 (e.errors.push(`The CSS property "${
                                      n}" that exists between the times of "${
                                      o.startTime}ms" and "${
                                      o.endTime}ms" is also being animated in a parallel animation between the times of "${
                                      i}ms" and "${s}ms"`),
                                  a = !1),
                             i = o.startTime),
                            a && (r[n] = {startTime : i, endTime : s}),
                            e.options && function(t, e, n) {
                              const s = e.params || {}, i = Dy(t);
                              i.length &&
                                  i.forEach(
                                      t => {
                                          s.hasOwnProperty(t) ||
                                          n.push(`Unable to resolve the local animation param ${
                                              t} in the given list of values`)})
                            }(t[n], e.options, e.errors)
                      })})
            }
            visitKeyframes(t, e) {
              const n = {type : 5, styles : [], options : null};
              if (!e.currentAnimateTimings)
                return e.errors.push(
                           "keyframes() must be placed inside of a call to animate()"),
                       n;
              let s = 0;
              const i = [];
              let r = !1, o = !1, a = 0;
              const l = t.steps.map(t => {
                const n = this._makeStyleAst(t, e);
                let l = null != n.offset ? n.offset : function(t) {
                  if ("string" == typeof t)
                    return null;
                  let e = null;
                  if (Array.isArray(t))
                    t.forEach(t => {
                      if (Xy(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        e = parseFloat(n.offset), delete n.offset
                      }
                    });
                  else if (Xy(t) && t.hasOwnProperty("offset")) {
                    const n = t;
                    e = parseFloat(n.offset), delete n.offset
                  }
                  return e
                }(n.styles), c = 0;
                return null != l && (s++, c = n.offset = l),
                       o = o || c < 0 || c > 1, r = r || c < a, a = c,
                       i.push(c), n
              });
              o &&
                  e.errors.push(
                      "Please ensure that all keyframe offsets are between 0 and 1"),
                  r &&
                      e.errors.push(
                          "Please ensure that all keyframe offsets are in order");
              const c = t.steps.length;
              let u = 0;
              s > 0 && s < c
                  ? e.errors.push(
                        "Not all style() steps within the declared keyframes() contain offsets")
                  : 0 == s && (u = 1 / (c - 1));
              const h = c - 1, d = e.currentTime, p = e.currentAnimateTimings,
                    f = p.duration;
              return l.forEach((t, s) => {
                const r = u > 0 ? s == h ? 1 : u * s : i[s], o = r * f;
                e.currentTime = d + p.delay + o, p.duration = o,
                this._validateStyleAst(t, e), t.offset = r, n.styles.push(t)
              }),
                     n
            }
            visitReference(t, e) {
              return {
                type: 8, animation: Hy(this, Py(t.animation), e),
                    options: Jy(t.options)
              }
            }
            visitAnimateChild(t, e) {
              return e.depCount++, { type: 9, options: Jy(t.options) }
            }
            visitAnimateRef(t, e) {
              return {
                type: 10, animation: this.visitReference(t.animation, e),
                    options: Jy(t.options)
              }
            }
            visitQuery(t, e) {
              const n = e.currentQuerySelector, s = t.options || {};
              e.queryCount++, e.currentQuery = t;
              const [i, r] = function(t) {
                const e = !!t.split(/\s*,\s*/).find(t => ":self" == t);
                return e && (t = t.replace(Qy, "")), [
                  t = t.replace(/@\*/g, by)
                          .replace(/@\w+/g, t => ".ng-trigger-" + t.substr(1))
                          .replace(/:animating/g, xy),
                  e
                ]
              }(t.selector);
              e.currentQuerySelector = n.length ? n + " " + i : i,
              ny(e.collectedStyles, e.currentQuerySelector, {});
              const o = Hy(this, Py(t.animation), e);
              return e.currentQuery = null, e.currentQuerySelector = n, {
                type: 11, selector: i, limit: s.limit || 0,
                    optional: !!s.optional, includeSelf: r, animation: o,
                    originalSelector: t.selector, options: Jy(t.options)
              }
            }
            visitStagger(t, e) {
              e.currentQuery ||
                  e.errors.push("stagger() can only be used inside of query()");
              const n = "full" === t.timings
                            ? {duration : 0, delay : 0, easing : "full"}
                            : Cy(t.timings, e.errors, !0);
              return {
                type: 12, animation: Hy(this, Py(t.animation), e), timings: n,
                    options: null
              }
            }
          }
          class Yy {
            constructor(t) {
              this.errors = t, this.queryCount = 0, this.depCount = 0,
              this.currentTransition = null, this.currentQuery = null,
              this.currentQuerySelector = null,
              this.currentAnimateTimings = null, this.currentTime = 0,
              this.collectedStyles = {}, this.options = null
            }
          }
          function Xy(t) { return !Array.isArray(t) && "object" == typeof t }
          function Jy(t) {
            var e;
            return t ? (t = ky(t)).params &&
                           (t.params = (e = t.params) ? ky(e) : null)
                     : t = {},
                       t
          }
          function t_(t, e, n) {
            return { duration: t, delay: e, easing: n }
          }
          function e_(t, e, n, s, i, r, o = null, a = !1) {
            return {
              type: 1, element: t, keyframes: e, preStyleProps: n,
                  postStyleProps: s, duration: i, delay: r, totalTime: i + r,
                  easing: o, subTimeline: a
            }
          }
          class n_ {
            constructor() { this._map = new Map }
            consume(t) {
              let e = this._map.get(t);
              return e ? this._map.delete(t) : e = [], e
            }
            append(t, e) {
              let n = this._map.get(t);
              n || this._map.set(t, n = []), n.push(...e)
            }
            has(t) { return this._map.has(t) }
            clear() { this._map.clear() }
          }
          const s_ = new RegExp(":enter", "g"), i_ = new RegExp(":leave", "g");
          function r_(t, e, n, s, i, r = {}, o = {}, a, l, c = []) {
            return (new o_).buildKeyframes(t, e, n, s, i, r, o, a, l, c)
          }
          class o_ {
            buildKeyframes(t, e, n, s, i, r, o, a, l, c = []) {
              l = l || new n_;
              const u = new l_(t, e, l, s, i, c, []);
              u.options = a,
              u.currentTimeline.setStyles([ r ], null, u.errors, a),
              Hy(this, n, u);
              const h = u.timelines.filter(t => t.containsAnimation());
              if (h.length && Object.keys(o).length) {
                const t = h[h.length - 1];
                t.allowOnlyTimelineStyles() ||
                    t.setStyles([ o ], null, u.errors, a)
              }
              return h.length ? h.map(t => t.buildKeyframes())
                              : [ e_(e, [], [], [], 0, 0, "", !1) ]
            }
            visitTrigger(t, e) {}
            visitState(t, e) {}
            visitTransition(t, e) {}
            visitAnimateChild(t, e) {
              const n = e.subInstructions.consume(e.element);
              if (n) {
                const s = e.createSubContext(t.options),
                      i = e.currentTimeline.currentTime,
                      r = this._visitSubInstructions(n, s, s.options);
                i != r && e.transformIntoNewTimeline(r)
              }
              e.previousNode = t
            }
            visitAnimateRef(t, e) {
              const n = e.createSubContext(t.options);
              n.transformIntoNewTimeline(), this.visitReference(t.animation, n),
                  e.transformIntoNewTimeline(n.currentTimeline.currentTime),
                  e.previousNode = t
            }
            _visitSubInstructions(t, e, n) {
              let s = e.currentTimeline.currentTime;
              const i = null != n.duration ? Sy(n.duration) : null,
                    r = null != n.delay ? Sy(n.delay) : null;
              return 0 !== i && t.forEach(t => {
                const n = e.appendInstructionToTimeline(t, i, r);
                s = Math.max(s, n.duration + n.delay)
              }),
                     s
            }
            visitReference(t, e) {
              e.updateOptions(t.options, !0), Hy(this, t.animation, e),
                  e.previousNode = t
            }
            visitSequence(t, e) {
              const n = e.subContextCount;
              let s = e;
              const i = t.options;
              if (i && (i.params || i.delay) &&
                  (s = e.createSubContext(i), s.transformIntoNewTimeline(),
                   null != i.delay)) {
                6 == s.previousNode.type &&
                    (s.currentTimeline.snapshotCurrentStyles(),
                     s.previousNode = a_);
                const t = Sy(i.delay);
                s.delayNextStep(t)
              }
              t.steps.length &&
                  (t.steps.forEach(t => Hy(this, t, s)),
                   s.currentTimeline.applyStylesToKeyframe(),
                   s.subContextCount > n && s.transformIntoNewTimeline()),
                  e.previousNode = t
            }
            visitGroup(t, e) {
              const n = [];
              let s = e.currentTimeline.currentTime;
              const i = t.options && t.options.delay ? Sy(t.options.delay) : 0;
              t.steps.forEach(r => {
                const o = e.createSubContext(t.options);
                i && o.delayNextStep(i), Hy(this, r, o),
                    s = Math.max(s, o.currentTimeline.currentTime),
                    n.push(o.currentTimeline)
              }),
                  n.forEach(
                      t => e.currentTimeline.mergeTimelineCollectedStyles(t)),
                  e.transformIntoNewTimeline(s), e.previousNode = t
            }
            _visitTiming(t, e) {
              if (t.dynamic) {
                const n = t.strValue;
                return Cy(e.params ? Ny(n, e.params, e.errors) : n, e.errors)
              }
              return { duration: t.duration, delay: t.delay, easing: t.easing }
            }
            visitAnimate(t, e) {
              const n = e.currentAnimateTimings =
                  this._visitTiming(t.timings, e),
                    s = e.currentTimeline;
              n.delay && (e.incrementTime(n.delay), s.snapshotCurrentStyles());
              const i = t.style;
              5 == i.type ? this.visitKeyframes(i, e)
                          : (e.incrementTime(n.duration), this.visitStyle(i, e),
                             s.applyStylesToKeyframe()),
                  e.currentAnimateTimings = null, e.previousNode = t
            }
            visitStyle(t, e) {
              const n = e.currentTimeline, s = e.currentAnimateTimings;
              !s && n.getCurrentStyleProperties().length && n.forwardFrame();
              const i = s && s.easing || t.easing;
              t.isEmptyStep ? n.applyEmptyStep(i)
                            : n.setStyles(t.styles, i, e.errors, e.options),
                  e.previousNode = t
            }
            visitKeyframes(t, e) {
              const n = e.currentAnimateTimings, s = e.currentTimeline.duration,
                    i = n.duration, r = e.createSubContext().currentTimeline;
              r.easing = n.easing, t.styles.forEach(t => {
                r.forwardTime((t.offset || 0) * i),
                r.setStyles(t.styles, t.easing, e.errors, e.options),
                r.applyStylesToKeyframe()
              }),
              e.currentTimeline.mergeTimelineCollectedStyles(r),
              e.transformIntoNewTimeline(s + i), e.previousNode = t
            }
            visitQuery(t, e) {
              const n = e.currentTimeline.currentTime, s = t.options || {},
                    i = s.delay ? Sy(s.delay) : 0;
              i &&
                  (6 === e.previousNode.type ||
                   0 == n &&
                       e.currentTimeline.getCurrentStyleProperties().length) &&
                  (e.currentTimeline.snapshotCurrentStyles(),
                   e.previousNode = a_);
              let r = n;
              const o = e.invokeQuery(t.selector, t.originalSelector, t.limit,
                                      t.includeSelf, !!s.optional, e.errors);
              e.currentQueryTotal = o.length;
              let a = null;
              o.forEach((n, s) => {
                e.currentQueryIndex = s;
                const o = e.createSubContext(t.options, n);
                i && o.delayNextStep(i),
                    n === e.element && (a = o.currentTimeline),
                    Hy(this, t.animation, o),
                    o.currentTimeline.applyStylesToKeyframe(),
                    r = Math.max(r, o.currentTimeline.currentTime)
              }),
                  e.currentQueryIndex = 0, e.currentQueryTotal = 0,
                  e.transformIntoNewTimeline(r),
                  a && (e.currentTimeline.mergeTimelineCollectedStyles(a),
                        e.currentTimeline.snapshotCurrentStyles()),
                  e.previousNode = t
            }
            visitStagger(t, e) {
              const n = e.parentContext, s = e.currentTimeline, i = t.timings,
                    r = Math.abs(i.duration), o = r * (e.currentQueryTotal - 1);
              let a = r * e.currentQueryIndex;
              switch (i.duration < 0 ? "reverse" : i.easing) {
              case "reverse":
                a = o - a;
                break;
              case "full":
                a = n.currentStaggerTime
              }
              const l = e.currentTimeline;
              a && l.delayNextStep(a);
              const c = l.currentTime;
              Hy(this, t.animation, e),
                  e.previousNode = t,
                  n.currentStaggerTime =
                      s.currentTime - c +
                      (s.startTime - n.currentTimeline.startTime)
            }
          }
          const a_ = {};
          class l_ {
            constructor(t, e, n, s, i, r, o, a) {
              this._driver = t, this.element = e, this.subInstructions = n,
              this._enterClassName = s, this._leaveClassName = i,
              this.errors = r, this.timelines = o, this.parentContext = null,
              this.currentAnimateTimings = null, this.previousNode = a_,
              this.subContextCount = 0, this.options = {},
              this.currentQueryIndex = 0, this.currentQueryTotal = 0,
              this.currentStaggerTime = 0,
              this.currentTimeline = a || new c_(this._driver, e, 0),
              o.push(this.currentTimeline)
            }
            get params() { return this.options.params }
            updateOptions(t, e) {
              if (!t)
                return;
              const n = t;
              let s = this.options;
              null != n.duration && (s.duration = Sy(n.duration)),
                  null != n.delay && (s.delay = Sy(n.delay));
              const i = n.params;
              if (i) {
                let t = s.params;
                t || (t = this.options.params = {}),
                    Object.keys(i).forEach(
                        n => {e && t.hasOwnProperty(n) ||
                              (t[n] = Ny(i[n], t, this.errors))})
              }
            }
            _copyOptions() {
              const t = {};
              if (this.options) {
                const e = this.options.params;
                if (e) {
                  const n = t.params = {};
                  Object.keys(e).forEach(t => {n[t] = e[t]})
                }
              }
              return t
            }
            createSubContext(t = null, e, n) {
              const s = e || this.element,
                    i = new l_(this._driver, s, this.subInstructions,
                               this._enterClassName, this._leaveClassName,
                               this.errors, this.timelines,
                               this.currentTimeline.fork(s, n || 0));
              return i.previousNode = this.previousNode,
                     i.currentAnimateTimings = this.currentAnimateTimings,
                     i.options = this._copyOptions(), i.updateOptions(t),
                     i.currentQueryIndex = this.currentQueryIndex,
                     i.currentQueryTotal = this.currentQueryTotal,
                     i.parentContext = this, this.subContextCount++, i
            }
            transformIntoNewTimeline(t) {
              return this.previousNode = a_,
                     this.currentTimeline =
                         this.currentTimeline.fork(this.element, t),
                     this.timelines.push(this.currentTimeline),
                     this.currentTimeline
            }
            appendInstructionToTimeline(t, e, n) {
              const s = {
                duration : null != e ? e : t.duration,
                delay : this.currentTimeline.currentTime + (null != n ? n : 0) +
                            t.delay,
                easing : ""
              },
                    i = new u_(this._driver, t.element, t.keyframes,
                               t.preStyleProps, t.postStyleProps, s,
                               t.stretchStartingKeyframe);
              return this.timelines.push(i), s
            }
            incrementTime(t) {
              this.currentTimeline.forwardTime(this.currentTimeline.duration +
                                               t)
            }
            delayNextStep(t) { t > 0 && this.currentTimeline.delayNextStep(t) }
            invokeQuery(t, e, n, s, i, r) {
              let o = [];
              if (s && o.push(this.element), t.length > 0) {
                t = (t = t.replace(s_, "." + this._enterClassName))
                        .replace(i_, "." + this._leaveClassName);
                let e = this._driver.query(this.element, t, 1 != n);
                0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length)
                                      : e.slice(0, n)),
                    o.push(...e)
              }
              return i || 0 != o.length ||
                         r.push(`\`query("${
                             e}")\` returned zero elements. (Use \`query("${
                             e}", { optional: true })\` if you wish to allow this.)`),
                     o
            }
          }
          class c_ {
            constructor(t, e, n, s) {
              this._driver = t, this.element = e, this.startTime = n,
              this._elementTimelineStylesLookup = s, this.duration = 0,
              this._previousKeyframe = {}, this._currentKeyframe = {},
              this._keyframes = new Map, this._styleSummary = {},
              this._pendingStyles = {}, this._backFill = {},
              this._currentEmptyStepKeyframe = null,
              this._elementTimelineStylesLookup ||
                  (this._elementTimelineStylesLookup = new Map),
              this._localTimelineStyles = Object.create(this._backFill, {}),
              this._globalTimelineStyles =
                  this._elementTimelineStylesLookup.get(e),
              this._globalTimelineStyles ||
                  (this._globalTimelineStyles = this._localTimelineStyles,
                   this._elementTimelineStylesLookup.set(
                       e, this._localTimelineStyles)),
              this._loadKeyframe()
            }
            containsAnimation() {
              switch (this._keyframes.size) {
              case 0:
                return !1;
              case 1:
                return this.getCurrentStyleProperties().length > 0;
              default:
                return !0
              }
            }
            getCurrentStyleProperties() {
              return Object.keys(this._currentKeyframe)
            }
            get currentTime() { return this.startTime + this.duration }
            delayNextStep(t) {
              const e = 1 == this._keyframes.size &&
                        Object.keys(this._pendingStyles).length;
              this.duration || e ? (this.forwardTime(this.currentTime + t),
                                    e && this.snapshotCurrentStyles())
                                 : this.startTime += t
            }
            fork(t, e) {
              return this.applyStylesToKeyframe(),
                     new c_(this._driver, t, e || this.currentTime,
                            this._elementTimelineStylesLookup)
            }
            _loadKeyframe() {
              this._currentKeyframe &&
                  (this._previousKeyframe = this._currentKeyframe),
                  this._currentKeyframe = this._keyframes.get(this.duration),
                  this._currentKeyframe ||
                      (this._currentKeyframe =
                           Object.create(this._backFill, {}),
                       this._keyframes.set(this.duration,
                                           this._currentKeyframe))
            }
            forwardFrame() { this.duration += 1, this._loadKeyframe() }
            forwardTime(t) {
              this.applyStylesToKeyframe(), this.duration = t,
                                            this._loadKeyframe()
            }
            _updateStyle(t, e) {
              this._localTimelineStyles[t] = e,
              this._globalTimelineStyles[t] = e, this._styleSummary[t] = {
                time : this.currentTime,
                value : e
              }
            }
            allowOnlyTimelineStyles() {
              return this._currentEmptyStepKeyframe !== this._currentKeyframe
            }
            applyEmptyStep(t) {
              t && (this._previousKeyframe.easing = t),
                  Object.keys(this._globalTimelineStyles).forEach(t => {
                    this._backFill[t] = this._globalTimelineStyles[t] || Vg,
                    this._currentKeyframe[t] = Vg
                  }),
                  this._currentEmptyStepKeyframe = this._currentKeyframe
            }
            setStyles(t, e, n, s) {
              e && (this._previousKeyframe.easing = e);
              const i = s && s.params || {}, r = function(t, e) {
                const n = {};
                let s;
                return t.forEach(t => {"*" === t ? (s = s || Object.keys(e),
                                                    s.forEach(t => {n[t] = Vg}))
                                                 : Ty(t, !1, n)}),
                       n
              }(t, this._globalTimelineStyles);
              Object.keys(r).forEach(t => {
                const e = Ny(r[t], i, n);
                this._pendingStyles[t] = e,
                this._localTimelineStyles.hasOwnProperty(t) ||
                    (this._backFill[t] =
                         this._globalTimelineStyles.hasOwnProperty(t)
                             ? this._globalTimelineStyles[t]
                             : Vg),
                this._updateStyle(t, e)
              })
            }
            applyStylesToKeyframe() {
              const t = this._pendingStyles, e = Object.keys(t);
              0 != e.length &&
                  (this._pendingStyles = {},
                   e.forEach(e => {this._currentKeyframe[e] = t[e]}),
                   Object.keys(this._localTimelineStyles)
                       .forEach(t => {this._currentKeyframe.hasOwnProperty(t) ||
                                      (this._currentKeyframe[t] =
                                           this._localTimelineStyles[t])}))
            }
            snapshotCurrentStyles() {
              Object.keys(this._localTimelineStyles).forEach(t => {
                const e = this._localTimelineStyles[t];
                this._pendingStyles[t] = e, this._updateStyle(t, e)
              })
            }
            getFinalKeyframe() { return this._keyframes.get(this.duration) }
            get properties() {
              const t = [];
              for (let e in this._currentKeyframe)
                t.push(e);
              return t
            }
            mergeTimelineCollectedStyles(t) {
              Object.keys(t._styleSummary).forEach(e => {
                const n = this._styleSummary[e], s = t._styleSummary[e];
                (!n || s.time > n.time) && this._updateStyle(e, s.value)
              })
            }
            buildKeyframes() {
              this.applyStylesToKeyframe();
              const t = new Set, e = new Set,
                    n = 1 === this._keyframes.size && 0 === this.duration;
              let s = [];
              this._keyframes.forEach((i, r) => {
                const o = Ty(i, !0);
                Object.keys(o).forEach(n => {
                  const s = o[n];
                  "!" == s ? t.add(n) : s == Vg && e.add(n)
                }),
                    n || (o.offset = r / this.duration), s.push(o)
              });
              const i = t.size ? Fy(t.values()) : [],
                    r = e.size ? Fy(e.values()) : [];
              if (n) {
                const t = s[0], e = ky(t);
                t.offset = 0, e.offset = 1, s = [ t, e ]
              }
              return e_(this.element, s, i, r, this.duration, this.startTime,
                        this.easing, !1)
            }
          }
          class u_ extends c_ {
            constructor(t, e, n, s, i, r, o = !1) {
              super(t, e, r.delay),
                  this.element = e, this.keyframes = n, this.preStyleProps = s,
                  this.postStyleProps = i, this._stretchStartingKeyframe = o,
                  this.timings = {
                    duration : r.duration,
                    delay : r.delay,
                    easing : r.easing
                  }
            }
            containsAnimation() { return this.keyframes.length > 1 }
            buildKeyframes() {
              let t = this.keyframes,
                  {delay : e, duration : n, easing : s} = this.timings;
              if (this._stretchStartingKeyframe && e) {
                const i = [], r = n + e, o = e / r, a = Ty(t[0], !1);
                a.offset = 0, i.push(a);
                const l = Ty(t[0], !1);
                l.offset = h_(o), i.push(l);
                const c = t.length - 1;
                for (let s = 1; s <= c; s++) {
                  let o = Ty(t[s], !1);
                  o.offset = h_((e + o.offset * n) / r), i.push(o)
                }
                n = r, e = 0, s = "", t = i
              }
              return e_(this.element, t, this.preStyleProps,
                        this.postStyleProps, n, e, s, !0)
            }
          }
          function h_(t, e = 3) {
            const n = Math.pow(10, e - 1);
            return Math.round(t * n) / n
          }
          class d_ {}
          class p_ extends d_ {
            normalizePropertyName(t, e) { return jy(t) }
            normalizeStyleValue(t, e, n, s) {
              let i = "";
              const r = n.toString().trim();
              if (f_[e] && 0 !== n && "0" !== n)
                if ("number" == typeof n)
                  i = "px";
                else {
                  const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
                  e && 0 == e[1].length &&
                      s.push(`Please provide a CSS unit value for ${t}:${n}`)
                }
              return r + i
            }
          }
          const f_ = (() => function(t) {
            const e = {};
            return t.forEach(t => e[t] = !0), e
          }("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective"
                          .split(",")))();
          function m_(t, e, n, s, i, r, o, a, l, c, u, h, d) {
            return {
              type: 0, element: t, triggerName: e, isRemovalTransition: i,
                  fromState: n, fromStyles: r, toState: s, toStyles: o,
                  timelines: a, queriedElements: l, preStyleProps: c,
                  postStyleProps: u, totalTime: h, errors: d
            }
          }
          const g_ = {};
          class y_ {
            constructor(t, e, n) {
              this._triggerName = t, this.ast = e, this._stateStyles = n
            }
            match(t, e, n, s) {
              return function(t, e, n, s,
                              i) { return t.some(t => t(e, n, s, i)) }(
                  this.ast.matchers, t, e, n, s)
            }
            buildStyles(t, e, n) {
              const s = this._stateStyles["*"], i = this._stateStyles[t],
                    r = s ? s.buildStyles(e, n) : {};
              return i ? i.buildStyles(e, n) : r
            }
            build(t, e, n, s, i, r, o, a, l, c) {
              const u = [],
                    h = this.ast.options && this.ast.options.params || g_,
                    d = this.buildStyles(n, o && o.params || g_, u),
                    p = a && a.params || g_, f = this.buildStyles(s, p, u),
                    m = new Set, g = new Map, y = new Map, _ = "void" === s,
                    v = {params : Object.assign(Object.assign({}, h), p)},
                    b = c ? []
                          : r_(t, e, this.ast.animation, i, r, d, f, v, l, u);
              let w = 0;
              if (b.forEach(t => {w = Math.max(t.duration + t.delay, w)}),
                  u.length)
                return m_(e, this._triggerName, n, s, _, d, f, [], [], g, y, w,
                          u);
              b.forEach(t => {
                const n = t.element, s = ny(g, n, {});
                t.preStyleProps.forEach(t => s[t] = !0);
                const i = ny(y, n, {});
                t.postStyleProps.forEach(t => i[t] = !0), n !== e && m.add(n)
              });
              const x = Fy(m.values());
              return m_(e, this._triggerName, n, s, _, d, f, b, x, g, y, w)
            }
          }
          class __ {
            constructor(t, e) { this.styles = t, this.defaultParams = e }
            buildStyles(t, e) {
              const n = {}, s = ky(this.defaultParams);
              return Object.keys(t).forEach(e => {
                const n = t[e];
                null != n && (s[e] = n)
              }),
                     this.styles.styles.forEach(t => {
                       if ("string" != typeof t) {
                         const i = t;
                         Object.keys(i).forEach(t => {
                           let r = i[t];
                           r.length > 1 && (r = Ny(r, s, e)), n[t] = r
                         })
                       }
                     }),
                     n
            }
          }
          class v_ {
            constructor(t, e) {
              this.name = t, this.ast = e, this.transitionFactories = [],
              this.states = {},
              e.states.forEach(
                  t => {this.states[t.name] = new __(
                            t.style, t.options && t.options.params || {})}),
              b_(this.states, "true", "1"), b_(this.states, "false", "0"),
              e.transitions.forEach(e => {this.transitionFactories.push(
                                        new y_(t, e, this.states))}),
              this.fallbackTransition = new y_(t, {
                type : 1,
                animation : {type : 2, steps : [], options : null},
                matchers : [ (t, e) => !0 ],
                options : null,
                queryCount : 0,
                depCount : 0
              },
                                               this.states)
            }
            get containsQueries() { return this.ast.queryCount > 0 }
            matchTransition(t, e, n, s) {
              return this.transitionFactories.find(i => i.match(t, e, n, s)) ||
                     null
            }
            matchStyles(t, e, n) {
              return this.fallbackTransition.buildStyles(t, e, n)
            }
          }
          function b_(t, e, n) {
            t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e])
                                : t.hasOwnProperty(n) && (t[e] = t[n])
          }
          const w_ = new n_;
          class x_ {
            constructor(t, e, n) {
              this.bodyNode = t, this._driver = e, this._normalizer = n,
              this._animations = {}, this._playersById = {}, this.players = []
            }
            register(t, e) {
              const n = [], s = Ky(this._driver, e, n);
              if (n.length)
                throw new Error(
                    "Unable to build the animation due to the following errors: " +
                    n.join("\n"));
              this._animations[t] = s
            }
            _buildPlayer(t, e, n) {
              const s = t.element,
                    i = Xg(0, this._normalizer, 0, t.keyframes, e, n);
              return this._driver.animate(s, i, t.duration, t.delay, t.easing,
                                          [], !0)
            }
            create(t, e, n = {}) {
              const s = [], i = this._animations[t];
              let r;
              const o = new Map;
              if (i ? (r = r_(this._driver, e, i, yy, _y, {}, {}, n, w_, s),
                       r.forEach(t => {
                         const e = ny(o, t.element, {});
                         t.postStyleProps.forEach(t => e[t] = null)
                       }))
                    : (s.push(
                           "The requested animation doesn't exist or has already been destroyed"),
                       r = []),
                  s.length)
                throw new Error(
                    "Unable to create the animation due to the following errors: " +
                    s.join("\n"));
              o.forEach(
                  (t, e) => {Object.keys(t).forEach(
                      n => {t[n] = this._driver.computeStyle(e, n, Vg)})});
              const a = Yg(r.map(t => {
                const e = o.get(t.element);
                return this._buildPlayer(t, {}, e)
              }));
              return this._playersById[t] = a,
                     a.onDestroy(() => this.destroy(t)), this.players.push(a), a
            }
            destroy(t) {
              const e = this._getPlayer(t);
              e.destroy(), delete this._playersById[t];
              const n = this.players.indexOf(e);
              n >= 0 && this.players.splice(n, 1)
            }
            _getPlayer(t) {
              const e = this._playersById[t];
              if (!e)
                throw new Error(
                    "Unable to find the timeline player referenced by " + t);
              return e
            }
            listen(t, e, n, s) {
              const i = ey(e, "", "", "");
              return Jg(this._getPlayer(t), n, i, s), () => {}
            }
            command(t, e, n, s) {
              if ("register" == n)
                return void this.register(t, s[0]);
              if ("create" == n)
                return void this.create(t, e, s[0] || {});
              const i = this._getPlayer(t);
              switch (n) {
              case "play":
                i.play();
                break;
              case "pause":
                i.pause();
                break;
              case "reset":
                i.reset();
                break;
              case "restart":
                i.restart();
                break;
              case "finish":
                i.finish();
                break;
              case "init":
                i.init();
                break;
              case "setPosition":
                i.setPosition(parseFloat(s[0]));
                break;
              case "destroy":
                this.destroy(t)
              }
            }
          }
          const S_ = "ng-animate-queued", E_ = "ng-animate-disabled",
                C_ = ".ng-animate-disabled", k_ = [], T_ = {
                  namespaceId : "",
                  setForRemoval : !1,
                  setForMove : !1,
                  hasAnimation : !1,
                  removedBeforeQueried : !1
                },
                A_ = {
                  namespaceId : "",
                  setForMove : !1,
                  setForRemoval : !1,
                  hasAnimation : !1,
                  removedBeforeQueried : !0
                };
          class I_ {
            constructor(t, e = "") {
              this.namespaceId = e;
              const n = t && t.hasOwnProperty("value");
              if (this.value = null != (s = n ? t.value : t) ? s : null, n) {
                const e = ky(t);
                delete e.value, this.options = e
              } else
                this.options = {};
              var s;
              this.options.params || (this.options.params = {})
            }
            get params() { return this.options.params }
            absorbOptions(t) {
              const e = t.params;
              if (e) {
                const t = this.options.params;
                Object.keys(e).forEach(n => {null == t[n] && (t[n] = e[n])})
              }
            }
          }
          const R_ = "void", O_ = new I_(R_);
          class P_ {
            constructor(t, e, n) {
              this.id = t, this.hostElement = e, this._engine = n,
              this.players = [], this._triggers = {}, this._queue = [],
              this._elementListeners = new Map,
              this._hostClassName = "ng-tns-" + t, V_(e, this._hostClassName)
            }
            listen(t, e, n, s) {
              if (!this._triggers.hasOwnProperty(e))
                throw new Error(
                    `Unable to listen on the animation trigger event "${
                        n}" because the animation trigger "${
                        e}" doesn't exist!`);
              if (null == n || 0 == n.length)
                throw new Error(`Unable to listen on the animation trigger "${
                    e}" because the provided event is undefined!`);
              if ("start" != (i = n) && "done" != i)
                throw new Error(`The provided animation trigger event "${
                    n}" for the animation trigger "${e}" is not supported!`);
              var i;
              const r = ny(this._elementListeners, t, []),
                    o = {name : e, phase : n, callback : s};
              r.push(o);
              const a = ny(this._engine.statesByElement, t, {});
              return a.hasOwnProperty(e) ||
                         (V_(t, vy), V_(t, "ng-trigger-" + e), a[e] = O_),
                     () => {
                       this._engine.afterFlush(() => {
                         const t = r.indexOf(o);
                         t >= 0 && r.splice(t, 1),
                             this._triggers[e] || delete a[e]
                       })
                     }
            }
            register(t, e) {
              return !this._triggers[t] && (this._triggers[t] = e, !0)
            }
            _getTrigger(t) {
              const e = this._triggers[t];
              if (!e)
                throw new Error(`The provided animation trigger "${
                    t}" has not been registered!`);
              return e
            }
            trigger(t, e, n, s = !0) {
              const i = this._getTrigger(e), r = new D_(this.id, e, t);
              let o = this._engine.statesByElement.get(t);
              o || (V_(t, vy), V_(t, "ng-trigger-" + e),
                    this._engine.statesByElement.set(t, o = {}));
              let a = o[e];
              const l = new I_(n, this.id);
              if (!(n && n.hasOwnProperty("value")) && a &&
                      l.absorbOptions(a.options),
                  o[e] = l, a || (a = O_),
                  l.value !== R_ && a.value === l.value) {
                if (!function(t, e) {
                      const n = Object.keys(t), s = Object.keys(e);
                      if (n.length != s.length)
                        return !1;
                      for (let i = 0; i < n.length; i++) {
                        const s = n[i];
                        if (!e.hasOwnProperty(s) || t[s] !== e[s])
                          return !1
                      }
                      return !0
                    }(a.params, l.params)) {
                  const e = [], n = i.matchStyles(a.value, a.params, e),
                        s = i.matchStyles(l.value, l.params, e);
                  e.length ? this._engine.reportError(e)
                           : this._engine.afterFlush(() => {Oy(t, n), Ry(t, s)})
                }
                return
              }
              const c = ny(this._engine.playersByElement, t, []);
              c.forEach(t => {t.namespaceId == this.id && t.triggerName == e &&
                              t.queued && t.destroy()});
              let u = i.matchTransition(a.value, l.value, t, l.params), h = !1;
              if (!u) {
                if (!s)
                  return;
                u = i.fallbackTransition, h = !0
              }
              return this._engine.totalQueuedPlayers++, this._queue.push({
                element : t,
                triggerName : e,
                transition : u,
                fromState : a,
                toState : l,
                player : r,
                isFallbackTransition : h
              }),
                     h || (V_(t, S_), r.onStart(() => {B_(t, S_)})),
                     r.onDone(() => {
                       let e = this.players.indexOf(r);
                       e >= 0 && this.players.splice(e, 1);
                       const n = this._engine.playersByElement.get(t);
                       if (n) {
                         let t = n.indexOf(r);
                         t >= 0 && n.splice(t, 1)
                       }
                     }),
                     this.players.push(r), c.push(r), r
            }
            deregister(t) {
              delete this._triggers[t],
                  this._engine.statesByElement.forEach((e, n) => {delete e[t]}),
                  this._elementListeners.forEach(
                      (e, n) => {this._elementListeners.set(
                          n, e.filter(e => e.name != t))})
            }
            clearElementCache(t) {
              this._engine.statesByElement.delete(t),
                  this._elementListeners.delete(t);
              const e = this._engine.playersByElement.get(t);
              e && (e.forEach(t => t.destroy()),
                    this._engine.playersByElement.delete(t))
            }
            _signalRemovalForInnerTriggers(t, e) {
              const n = this._engine.driver.query(t, by, !0);
              n.forEach(t => {
                if (t.__ng_removed)
                  return;
                const n = this._engine.fetchNamespacesByElement(t);
                n.size ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0))
                       : this.clearElementCache(t)
              }),
                  this._engine.afterFlushAnimationsDone(
                      () => n.forEach(t => this.clearElementCache(t)))
            }
            triggerLeaveAnimation(t, e, n, s) {
              const i = this._engine.statesByElement.get(t);
              if (i) {
                const r = [];
                if (Object.keys(i).forEach(e => {
                      if (this._triggers[e]) {
                        const n = this.trigger(t, e, R_, s);
                        n && r.push(n)
                      }
                    }),
                    r.length)
                  return this._engine.markElementAsRemoved(this.id, t, !0, e),
                         n && Yg(r).onDone(
                                  () => this._engine.processLeaveNode(t)),
                         !0
              }
              return !1
            }
            prepareLeaveAnimationListeners(t) {
              const e = this._elementListeners.get(t);
              if (e) {
                const n = new Set;
                e.forEach(e => {
                  const s = e.name;
                  if (n.has(s))
                    return;
                  n.add(s);
                  const i = this._triggers[s].fallbackTransition,
                        r = this._engine.statesByElement.get(t)[s] || O_,
                        o = new I_(R_), a = new D_(this.id, s, t);
                  this._engine.totalQueuedPlayers++, this._queue.push({
                    element : t,
                    triggerName : s,
                    transition : i,
                    fromState : r,
                    toState : o,
                    player : a,
                    isFallbackTransition : !0
                  })
                })
              }
            }
            removeNode(t, e) {
              const n = this._engine;
              if (t.childElementCount &&
                      this._signalRemovalForInnerTriggers(t, e),
                  this.triggerLeaveAnimation(t, e, !0))
                return;
              let s = !1;
              if (n.totalAnimations) {
                const e =
                    n.players.length ? n.playersByQueriedElement.get(t) : [];
                if (e && e.length)
                  s = !0;
                else {
                  let e = t;
                  for (; e = e.parentNode;)
                    if (n.statesByElement.get(e)) {
                      s = !0;
                      break
                    }
                }
              }
              if (this.prepareLeaveAnimationListeners(t), s)
                n.markElementAsRemoved(this.id, t, !1, e);
              else {
                const s = t.__ng_removed;
                s && s !== T_ ||
                    (n.afterFlush(() => this.clearElementCache(t)),
                     n.destroyInnerAnimations(t), n._onRemovalComplete(t, e))
              }
            }
            insertNode(t, e) { V_(t, this._hostClassName) }
            drainQueuedTransitions(t) {
              const e = [];
              return this._queue.forEach(n => {
                const s = n.player;
                if (s.destroyed)
                  return;
                const i = n.element, r = this._elementListeners.get(i);
                r && r.forEach(e => {
                  if (e.name == n.triggerName) {
                    const s = ey(i, n.triggerName, n.fromState.value,
                                 n.toState.value);
                    s._data = t, Jg(n.player, e.phase, s, e.callback)
                  }
                }),
                    s.markedForDestroy
                        ? this._engine.afterFlush(() => {s.destroy()})
                        : e.push(n)
              }),
                     this._queue = [], e.sort((t, e) => {
                       const n = t.transition.ast.depCount,
                             s = e.transition.ast.depCount;
                       return 0 == n || 0 == s
                                  ? n - s
                                  : this._engine.driver.containsElement(
                                        t.element, e.element)
                                        ? 1
                                        : -1
                     })
            }
            destroy(t) {
              this.players.forEach(t => t.destroy()),
                  this._signalRemovalForInnerTriggers(this.hostElement, t)
            }
            elementContainsData(t) {
              let e = !1;
              return this._elementListeners.has(t) && (e = !0),
                     e = !!this._queue.find(e => e.element === t) || e, e
            }
          }
          class L_ {
            constructor(t, e, n) {
              this.bodyNode = t, this.driver = e, this._normalizer = n,
              this.players = [], this.newHostElements = new Map,
              this.playersByElement = new Map,
              this.playersByQueriedElement = new Map,
              this.statesByElement = new Map, this.disabledNodes = new Set,
              this.totalAnimations = 0, this.totalQueuedPlayers = 0,
              this._namespaceLookup = {}, this._namespaceList = [],
              this._flushFns = [], this._whenQuietFns = [],
              this.namespacesByHostElement = new Map,
              this.collectedEnterElements = [],
              this.collectedLeaveElements = [],
              this.onRemovalComplete = (t, e) => {}
            }
            _onRemovalComplete(t, e) { this.onRemovalComplete(t, e) }
            get queuedPlayers() {
              const t = [];
              return this._namespaceList.forEach(
                         e => {
                             e.players.forEach(e => {e.queued && t.push(e)})}),
                     t
            }
            createNamespace(t, e) {
              const n = new P_(t, e, this);
              return e.parentNode ? this._balanceNamespaceList(n, e)
                                  : (this.newHostElements.set(e, n),
                                     this.collectEnterElement(e)),
                     this._namespaceLookup[t] = n
            }
            _balanceNamespaceList(t, e) {
              const n = this._namespaceList.length - 1;
              if (n >= 0) {
                let s = !1;
                for (let i = n; i >= 0; i--)
                  if (this.driver.containsElement(
                          this._namespaceList[i].hostElement, e)) {
                    this._namespaceList.splice(i + 1, 0, t), s = !0;
                    break
                  }
                s || this._namespaceList.splice(0, 0, t)
              } else
                this._namespaceList.push(t);
              return this.namespacesByHostElement.set(e, t), t
            }
            register(t, e) {
              let n = this._namespaceLookup[t];
              return n || (n = this.createNamespace(t, e)), n
            }
            registerTrigger(t, e, n) {
              let s = this._namespaceLookup[t];
              s && s.register(e, n) && this.totalAnimations++
            }
            destroy(t, e) {
              if (!t)
                return;
              const n = this._fetchNamespace(t);
              this.afterFlush(() => {
                this.namespacesByHostElement.delete(n.hostElement),
                    delete this._namespaceLookup[t];
                const e = this._namespaceList.indexOf(n);
                e >= 0 && this._namespaceList.splice(e, 1)
              }),
                  this.afterFlushAnimationsDone(() => n.destroy(e))
            }
            _fetchNamespace(t) { return this._namespaceLookup[t] }
            fetchNamespacesByElement(t) {
              const e = new Set, n = this.statesByElement.get(t);
              if (n) {
                const t = Object.keys(n);
                for (let s = 0; s < t.length; s++) {
                  const i = n[t[s]].namespaceId;
                  if (i) {
                    const t = this._fetchNamespace(i);
                    t && e.add(t)
                  }
                }
              }
              return e
            }
            trigger(t, e, n, s) {
              if (N_(e)) {
                const i = this._fetchNamespace(t);
                if (i)
                  return i.trigger(e, n, s), !0
              }
              return !1
            }
            insertNode(t, e, n, s) {
              if (!N_(e))
                return;
              const i = e.__ng_removed;
              if (i && i.setForRemoval) {
                i.setForRemoval = !1, i.setForMove = !0;
                const t = this.collectedLeaveElements.indexOf(e);
                t >= 0 && this.collectedLeaveElements.splice(t, 1)
              }
              if (t) {
                const s = this._fetchNamespace(t);
                s && s.insertNode(e, n)
              }
              s && this.collectEnterElement(e)
            }
            collectEnterElement(t) { this.collectedEnterElements.push(t) }
            markElementAsDisabled(t, e) {
              e ? this.disabledNodes.has(t) ||
                      (this.disabledNodes.add(t), V_(t, E_))
                : this.disabledNodes.has(t) &&
                      (this.disabledNodes.delete(t), B_(t, E_))
            }
            removeNode(t, e, n, s) {
              if (N_(e)) {
                const i = t ? this._fetchNamespace(t) : null;
                if (i ? i.removeNode(e, s)
                      : this.markElementAsRemoved(t, e, !1, s),
                    n) {
                  const n = this.namespacesByHostElement.get(e);
                  n && n.id !== t && n.removeNode(e, s)
                }
              } else
                this._onRemovalComplete(e, s)
            }
            markElementAsRemoved(t, e, n, s) {
              this.collectedLeaveElements.push(e), e.__ng_removed = {
                namespaceId : t,
                setForRemoval : s,
                hasAnimation : n,
                removedBeforeQueried : !1
              }
            }
            listen(t, e, n, s, i) {
              return N_(e) ? this._fetchNamespace(t).listen(e, n, s, i)
                           : () => {}
            }
            _buildInstruction(t, e, n, s, i) {
              return t.transition.build(
                  this.driver, t.element, t.fromState.value, t.toState.value, n,
                  s, t.fromState.options, t.toState.options, e, i)
            }
            destroyInnerAnimations(t) {
              let e = this.driver.query(t, by, !0);
              e.forEach(t => this.destroyActiveAnimationsForElement(t)),
                  0 != this.playersByQueriedElement.size &&
                      (e = this.driver.query(t, xy, !0),
                       e.forEach(
                           t => this.finishActiveQueriedAnimationOnElement(t)))
            }
            destroyActiveAnimationsForElement(t) {
              const e = this.playersByElement.get(t);
              e && e.forEach(
                       t => {t.queued ? t.markedForDestroy = !0 : t.destroy()})
            }
            finishActiveQueriedAnimationOnElement(t) {
              const e = this.playersByQueriedElement.get(t);
              e && e.forEach(t => t.finish())
            }
            whenRenderingDone() {
              return new Promise(t => {
                if (this.players.length)
                  return Yg(this.players).onDone(() => t());
                t()
              })
            }
            processLeaveNode(t) {
              const e = t.__ng_removed;
              if (e && e.setForRemoval) {
                if (t.__ng_removed = T_, e.namespaceId) {
                  this.destroyInnerAnimations(t);
                  const n = this._fetchNamespace(e.namespaceId);
                  n && n.clearElementCache(t)
                }
                this._onRemovalComplete(t, e.setForRemoval)
              }
              this.driver.matchesElement(t, C_) &&
                  this.markElementAsDisabled(t, !1),
                  this.driver.query(t, C_, !0).forEach(
                      t => {this.markElementAsDisabled(t, !1)})
            }
            flush(t = -1) {
              let e = [];
              if (this.newHostElements.size &&
                      (this.newHostElements.forEach(
                           (t, e) => this._balanceNamespaceList(t, e)),
                       this.newHostElements.clear()),
                  this.totalAnimations && this.collectedEnterElements.length)
                for (let n = 0; n < this.collectedEnterElements.length; n++)
                  V_(this.collectedEnterElements[n], "ng-star-inserted");
              if (this._namespaceList.length &&
                  (this.totalQueuedPlayers ||
                   this.collectedLeaveElements.length)) {
                const n = [];
                try {
                  e = this._flushAnimations(n, t)
                } finally {
                  for (let t = 0; t < n.length; t++)
                    n[t]()
                }
              } else
                for (let n = 0; n < this.collectedLeaveElements.length; n++)
                  this.processLeaveNode(this.collectedLeaveElements[n]);
              if (this.totalQueuedPlayers = 0,
                  this.collectedEnterElements.length = 0,
                  this.collectedLeaveElements.length = 0,
                  this._flushFns.forEach(t => t()), this._flushFns = [],
                  this._whenQuietFns.length) {
                const t = this._whenQuietFns;
                this._whenQuietFns = [],
                e.length ? Yg(e).onDone(() => {t.forEach(t => t())})
                         : t.forEach(t => t())
              }
            }
            reportError(t) {
              throw new Error(
                  "Unable to process animations due to the following failed trigger transitions\n " +
                  t.join("\n"))
            }
            _flushAnimations(t, e) {
              const n = new n_, s = [], i = new Map, r = [], o = new Map,
                    a = new Map, l = new Map, c = new Set;
              this.disabledNodes.forEach(t => {
                c.add(t);
                const e = this.driver.query(t, ".ng-animate-queued", !0);
                for (let n = 0; n < e.length; n++)
                  c.add(e[n])
              });
              const u = this.bodyNode,
                    h = Array.from(this.statesByElement.keys()),
                    d = j_(h, this.collectedEnterElements), p = new Map;
              let f = 0;
              d.forEach((t, e) => {
                const n = yy + f++;
                p.set(e, n), t.forEach(t => V_(t, n))
              });
              const m = [], g = new Set, y = new Set;
              for (let R = 0; R < this.collectedLeaveElements.length; R++) {
                const t = this.collectedLeaveElements[R], e = t.__ng_removed;
                e && e.setForRemoval &&
                    (m.push(t), g.add(t),
                     e.hasAnimation
                         ? this.driver.query(t, ".ng-star-inserted", !0)
                               .forEach(t => g.add(t))
                         : y.add(t))
              }
              const _ = new Map, v = j_(h, Array.from(g));
              v.forEach((t, e) => {
                const n = _y + f++;
                _.set(e, n), t.forEach(t => V_(t, n))
              }),
                  t.push(() => {
                    d.forEach((t, e) => {
                      const n = p.get(e);
                      t.forEach(t => B_(t, n))
                    }),
                    v.forEach((t, e) => {
                      const n = _.get(e);
                      t.forEach(t => B_(t, n))
                    }),
                    m.forEach(t => {this.processLeaveNode(t)})
                  });
              const b = [], w = [];
              for (let R = this._namespaceList.length - 1; R >= 0; R--)
                this._namespaceList[R].drainQueuedTransitions(e).forEach(t => {
                  const e = t.player, i = t.element;
                  if (b.push(e), this.collectedEnterElements.length) {
                    const t = i.__ng_removed;
                    if (t && t.setForMove)
                      return void e.destroy()
                  }
                  const c = !u || !this.driver.containsElement(u, i),
                        h = _.get(i), d = p.get(i),
                        f = this._buildInstruction(t, n, d, h, c);
                  if (f.errors && f.errors.length)
                    w.push(f);
                  else {
                    if (c)
                      return e.onStart(() => Oy(i, f.fromStyles)),
                             e.onDestroy(() => Ry(i, f.toStyles)),
                             void s.push(e);
                    if (t.isFallbackTransition)
                      return e.onStart(() => Oy(i, f.fromStyles)),
                             e.onDestroy(() => Ry(i, f.toStyles)),
                             void s.push(e);
                    f.timelines.forEach(t => t.stretchStartingKeyframe = !0),
                        n.append(i, f.timelines),
                        r.push({instruction : f, player : e, element : i}),
                        f.queriedElements.forEach(t => ny(o, t, []).push(e)),
                        f.preStyleProps.forEach((t, e) => {
                          const n = Object.keys(t);
                          if (n.length) {
                            let t = a.get(e);
                            t || a.set(e, t = new Set), n.forEach(e => t.add(e))
                          }
                        }),
                        f.postStyleProps.forEach((t, e) => {
                          const n = Object.keys(t);
                          let s = l.get(e);
                          s || l.set(e, s = new Set), n.forEach(t => s.add(t))
                        })
                  }
                });
              if (w.length) {
                const t = [];
                w.forEach(e => {
                  t.push(`@${e.triggerName} has failed due to:\n`),
                  e.errors.forEach(e => t.push(`- ${e}\n`))
                }),
                    b.forEach(t => t.destroy()), this.reportError(t)
              }
              const x = new Map, S = new Map;
              r.forEach(t => {
                const e = t.element;
                n.has(e) && (S.set(e, e),
                             this._beforeAnimationBuild(t.player.namespaceId,
                                                        t.instruction, x))
              }),
                  s.forEach(t => {
                    const e = t.element;
                    this._getPreviousPlayers(e, !1, t.namespaceId,
                                             t.triggerName, null)
                        .forEach(t => {ny(x, e, []).push(t), t.destroy()})
                  });
              const E = m.filter(t => U_(t, a, l)), C = new Map;
              M_(C, this.driver, y, l, Vg)
                  .forEach(t => {U_(t, a, l) && E.push(t)});
              const k = new Map;
              d.forEach((t, e) => {M_(k, this.driver, new Set(t), a, "!")}),
                  E.forEach(t => {
                    const e = C.get(t), n = k.get(t);
                    C.set(t, Object.assign(Object.assign({}, e), n))
                  });
              const T = [], A = [], I = {};
              r.forEach(t => {
                const {element : e, player : r, instruction : o} = t;
                if (n.has(e)) {
                  if (c.has(e))
                    return r.onDestroy(() => Ry(e, o.toStyles)),
                           r.disabled = !0, r.overrideTotalTime(o.totalTime),
                           void s.push(r);
                  let t = I;
                  if (S.size > 1) {
                    let n = e;
                    const s = [];
                    for (; n = n.parentNode;) {
                      const e = S.get(n);
                      if (e) {
                        t = e;
                        break
                      }
                      s.push(n)
                    }
                    s.forEach(e => S.set(e, t))
                  }
                  const n = this._buildAnimation(r.namespaceId, o, x, i, k, C);
                  if (r.setRealPlayer(n), t === I)
                    T.push(r);
                  else {
                    const e = this.playersByElement.get(t);
                    e && e.length && (r.parentPlayer = Yg(e)), s.push(r)
                  }
                } else
                  Oy(e, o.fromStyles), r.onDestroy(() => Ry(e, o.toStyles)),
                      A.push(r), c.has(e) && s.push(r)
              }),
                  A.forEach(t => {
                    const e = i.get(t.element);
                    if (e && e.length) {
                      const n = Yg(e);
                      t.setRealPlayer(n)
                    }
                  }),
                  s.forEach(t => {t.parentPlayer
                                      ? t.syncPlayerEvents(t.parentPlayer)
                                      : t.destroy()});
              for (let R = 0; R < m.length; R++) {
                const t = m[R], e = t.__ng_removed;
                if (B_(t, _y), e && e.hasAnimation)
                  continue;
                let n = [];
                if (o.size) {
                  let e = o.get(t);
                  e && e.length && n.push(...e);
                  let s = this.driver.query(t, xy, !0);
                  for (let t = 0; t < s.length; t++) {
                    let e = o.get(s[t]);
                    e && e.length && n.push(...e)
                  }
                }
                const s = n.filter(t => !t.destroyed);
                s.length ? H_(this, t, s) : this.processLeaveNode(t)
              }
              return m.length = 0, T.forEach(t => {
                this.players.push(t),
                t.onDone(() => {
                  t.destroy();
                  const e = this.players.indexOf(t);
                  this.players.splice(e, 1)
                }),
                t.play()
              }),
                     T
            }
            elementContainsData(t, e) {
              let n = !1;
              const s = e.__ng_removed;
              return s && s.setForRemoval && (n = !0),
                     this.playersByElement.has(e) && (n = !0),
                     this.playersByQueriedElement.has(e) && (n = !0),
                     this.statesByElement.has(e) && (n = !0),
                     this._fetchNamespace(t).elementContainsData(e) || n
            }
            afterFlush(t) { this._flushFns.push(t) }
            afterFlushAnimationsDone(t) { this._whenQuietFns.push(t) }
            _getPreviousPlayers(t, e, n, s, i) {
              let r = [];
              if (e) {
                const e = this.playersByQueriedElement.get(t);
                e && (r = e)
              } else {
                const e = this.playersByElement.get(t);
                if (e) {
                  const t = !i || i == R_;
                  e.forEach(
                      e => {e.queued || (t || e.triggerName == s) && r.push(e)})
                }
              }
              return (n || s) &&
                         (r = r.filter(t => !(n && n != t.namespaceId ||
                                              s && s != t.triggerName))),
                     r
            }
            _beforeAnimationBuild(t, e, n) {
              const s = e.element, i = e.isRemovalTransition ? void 0 : t,
                    r = e.isRemovalTransition ? void 0 : e.triggerName;
              for (const o of e.timelines) {
                const t = o.element, a = t !== s, l = ny(n, t, []);
                this._getPreviousPlayers(t, a, i, r, e.toState).forEach(t => {
                  const e = t.getRealPlayer();
                  e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t)
                })
              }
              Oy(s, e.fromStyles)
            }
            _buildAnimation(t, e, n, s, i, r) {
              const o = e.triggerName, a = e.element, l = [], c = new Set,
                    u = new Set, h = e.timelines.map(e => {
                      const h = e.element;
                      c.add(h);
                      const d = h.__ng_removed;
                      if (d && d.removedBeforeQueried)
                        return new Qg(e.duration, e.delay);
                      const p = h !== a,
                            f =
                                function(t) {
                              const e = [];
                              return function t(e, n) {
                                for (let s = 0; s < e.length; s++) {
                                  const i = e[s];
                                  i instanceof Kg ? t(i.players, n) : n.push(i)
                                }
                              }(t, e),
                                     e
                            }((n.get(h) || k_).map(t => t.getRealPlayer()))
                                    .filter(t =>
                                                !!t.element && t.element === h),
                            m = i.get(h), g = r.get(h),
                            y = Xg(0, this._normalizer, 0, e.keyframes, m, g),
                            _ = this._buildPlayer(e, y, f);
                      if (e.subTimeline && s && u.add(h), p) {
                        const e = new D_(t, o, h);
                        e.setRealPlayer(_), l.push(e)
                      }
                      return _
                    });
              l.forEach(t => {
                ny(this.playersByQueriedElement, t.element, []).push(t),
                t.onDone(() => function(t, e, n) {
                  let s;
                  if (t instanceof Map) {
                    if (s = t.get(e), s) {
                      if (s.length) {
                        const t = s.indexOf(n);
                        s.splice(t, 1)
                      }
                      0 == s.length && t.delete(e)
                    }
                  } else if (s = t[e], s) {
                    if (s.length) {
                      const t = s.indexOf(n);
                      s.splice(t, 1)
                    }
                    0 == s.length && delete t[e]
                  }
                  return s
                }(this.playersByQueriedElement, t.element, t))
              }),
                  c.forEach(t => V_(t, wy));
              const d = Yg(h);
              return d.onDestroy(
                         () => {c.forEach(t => B_(t, wy)), Ry(a, e.toStyles)}),
                     u.forEach(t => {ny(s, t, []).push(d)}), d
            }
            _buildPlayer(t, e, n) {
              return e.length > 0
                         ? this.driver.animate(t.element, e, t.duration,
                                               t.delay, t.easing, n)
                         : new Qg(t.duration, t.delay)
            }
          }
          class D_ {
            constructor(t, e, n) {
              this.namespaceId = t, this.triggerName = e, this.element = n,
              this._player = new Qg, this._containsRealPlayer = !1,
              this._queuedCallbacks = {}, this.destroyed = !1,
              this.markedForDestroy = !1, this.disabled = !1, this.queued = !0,
              this.totalTime = 0
            }
            setRealPlayer(t) {
              this._containsRealPlayer ||
                  (this._player = t,
                   Object.keys(this._queuedCallbacks)
                       .forEach(e => {this._queuedCallbacks[e].forEach(
                                    n => Jg(t, e, void 0, n))}),
                   this._queuedCallbacks = {}, this._containsRealPlayer = !0,
                   this.overrideTotalTime(t.totalTime), this.queued = !1)
            }
            getRealPlayer() { return this._player }
            overrideTotalTime(t) { this.totalTime = t }
            syncPlayerEvents(t) {
              const e = this._player;
              e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
                  t.onDone(() => this.finish()),
                  t.onDestroy(() => this.destroy())
            }
            _queueEvent(t, e) { ny(this._queuedCallbacks, t, []).push(e) }
            onDone(t) {
              this.queued && this._queueEvent("done", t), this._player.onDone(t)
            }
            onStart(t) {
              this.queued && this._queueEvent("start", t),
                  this._player.onStart(t)
            }
            onDestroy(t) {
              this.queued && this._queueEvent("destroy", t),
                  this._player.onDestroy(t)
            }
            init() { this._player.init() }
            hasStarted() { return !this.queued && this._player.hasStarted() }
            play() { !this.queued && this._player.play() }
            pause() { !this.queued && this._player.pause() }
            restart() { !this.queued && this._player.restart() }
            finish() { this._player.finish() }
            destroy() { this.destroyed = !0, this._player.destroy() }
            reset() { !this.queued && this._player.reset() }
            setPosition(t) { this.queued || this._player.setPosition(t) }
            getPosition() {
              return this.queued ? 0 : this._player.getPosition()
            }
            triggerCallback(t) {
              const e = this._player;
              e.triggerCallback && e.triggerCallback(t)
            }
          }
          function N_(t) { return t && 1 === t.nodeType }
          function F_(t, e) {
            const n = t.style.display;
            return t.style.display = null != e ? e : "none", n
          }
          function M_(t, e, n, s, i) {
            const r = [];
            n.forEach(t => r.push(F_(t)));
            const o = [];
            s.forEach((n, s) => {
              const r = {};
              n.forEach(t => {
                const n = r[t] = e.computeStyle(s, t, i);
                n && 0 != n.length || (s.__ng_removed = A_, o.push(s))
              }),
                  t.set(s, r)
            });
            let a = 0;
            return n.forEach(t => F_(t, r[a++])), o
          }
          function j_(t, e) {
            const n = new Map;
            if (t.forEach(t => n.set(t, [])), 0 == e.length)
              return n;
            const s = new Set(e), i = new Map;
            return e.forEach(t => {
              const e = function t(e) {
                if (!e)
                  return 1;
                let r = i.get(e);
                if (r)
                  return r;
                const o = e.parentNode;
                return r = n.has(o) ? o : s.has(o) ? 1 : t(o), i.set(e, r), r
              }(t);
              1 !== e && n.get(e).push(t)
            }),
                   n
          }
          function V_(t, e) {
            if (t.classList)
              t.classList.add(e);
            else {
              let n = t.$$classes;
              n || (n = t.$$classes = {}), n[e] = !0
            }
          }
          function B_(t, e) {
            if (t.classList)
              t.classList.remove(e);
            else {
              let n = t.$$classes;
              n && delete n[e]
            }
          }
          function H_(t, e, n) { Yg(n).onDone(() => t.processLeaveNode(e)) }
          function U_(t, e, n) {
            const s = n.get(t);
            if (!s)
              return !1;
            let i = e.get(t);
            return i ? s.forEach(t => i.add(t)) : e.set(t, s), n.delete(t), !0
          }
          class z_ {
            constructor(t, e, n) {
              this.bodyNode = t, this._driver = e, this._triggerCache = {},
              this.onRemovalComplete = (t, e) => {},
              this._transitionEngine = new L_(t, e, n),
              this._timelineEngine = new x_(t, e, n),
              this._transitionEngine.onRemovalComplete = (t, e) =>
                  this.onRemovalComplete(t, e)
            }
            registerTrigger(t, e, n, s, i) {
              const r = t + "-" + s;
              let o = this._triggerCache[r];
              if (!o) {
                const t = [], e = Ky(this._driver, i, t);
                if (t.length)
                  throw new Error(`The animation trigger "${
                      s}" has failed to build due to the following errors:\n - ${
                      t.join("\n - ")}`);
                o = function(t, e) { return new v_(t, e) }(s, e),
                this._triggerCache[r] = o
              }
              this._transitionEngine.registerTrigger(e, s, o)
            }
            register(t, e) { this._transitionEngine.register(t, e) }
            destroy(t, e) { this._transitionEngine.destroy(t, e) }
            onInsert(t, e, n, s) {
              this._transitionEngine.insertNode(t, e, n, s)
            }
            onRemove(t, e, n, s) {
              this._transitionEngine.removeNode(t, e, s || !1, n)
            }
            disableAnimations(t, e) {
              this._transitionEngine.markElementAsDisabled(t, e)
            }
            process(t, e, n, s) {
              if ("@" == n.charAt(0)) {
                const [t, i] = sy(n);
                this._timelineEngine.command(t, e, i, s)
              } else
                this._transitionEngine.trigger(t, e, n, s)
            }
            listen(t, e, n, s, i) {
              if ("@" == n.charAt(0)) {
                const [t, s] = sy(n);
                return this._timelineEngine.listen(t, e, s, i)
              }
              return this._transitionEngine.listen(t, e, n, s, i)
            }
            flush(t = -1) { this._transitionEngine.flush(t) }
            get players() {
              return this._transitionEngine.players.concat(
                  this._timelineEngine.players)
            }
            whenRenderingDone() {
              return this._transitionEngine.whenRenderingDone()
            }
          }
          function $_(t, e) {
            let n = null, s = null;
            return Array.isArray(e) && e.length
                       ? (n = W_(e[0]),
                          e.length > 1 && (s = W_(e[e.length - 1])))
                       : e && (n = W_(e)),
                   n || s ? new q_(t, n, s) : null
          }
          let q_ = (() => {
            class t {
              constructor(e, n, s) {
                this._element = e, this._startStyles = n, this._endStyles = s,
                this._state = 0;
                let i = t.initialStylesByElement.get(e);
                i || t.initialStylesByElement.set(e, i = {}),
                    this._initialStyles = i
              }
              start() {
                this._state < 1 &&
                    (this._startStyles && Ry(this._element, this._startStyles,
                                             this._initialStyles),
                     this._state = 1)
              }
              finish() {
                this.start(),
                    this._state < 2 &&
                        (Ry(this._element, this._initialStyles),
                         this._endStyles && (Ry(this._element, this._endStyles),
                                             this._endStyles = null),
                         this._state = 1)
              }
              destroy() {
                this.finish(),
                    this._state < 3 &&
                        (t.initialStylesByElement.delete(this._element),
                         this._startStyles &&
                             (Oy(this._element, this._startStyles),
                              this._endStyles = null),
                         this._endStyles && (Oy(this._element, this._endStyles),
                                             this._endStyles = null),
                         Ry(this._element, this._initialStyles),
                         this._state = 3)
              }
            } return t.initialStylesByElement = new WeakMap,
            t
          })();
          function W_(t) {
            let e = null;
            const n = Object.keys(t);
            for (let s = 0; s < n.length; s++) {
              const i = n[s];
              G_(i) && (e = e || {}, e[i] = t[i])
            }
            return e
          }
          function G_(t) { return "display" === t || "position" === t }
          const Q_ = "animation", K_ = "animationend";
          class Z_ {
            constructor(t, e, n, s, i, r, o) {
              this._element = t, this._name = e, this._duration = n,
              this._delay = s, this._easing = i, this._fillMode = r,
              this._onDoneFn = o, this._finished = !1, this._destroyed = !1,
              this._startTime = 0, this._position = 0,
              this._eventFn = t => this._handleCallback(t)
            }
            apply() {
              !function(t, e) {
                const n = nv(t, "").trim();
                n.length && (function(t, e) {
                  let n = 0;
                  for (let s = 0; s < t.length; s++)
                    "," === t.charAt(s) && n++
                }(n), e = `${n}, ${e}`), ev(t, "", e)
              }(this._element,
                `${this._duration}ms ${this._easing} ${
                    this._delay}ms 1 normal ${this._fillMode} ${this._name}`),
                  tv(this._element, this._eventFn, !1),
                  this._startTime = Date.now()
            }
            pause() { Y_(this._element, this._name, "paused") }
            resume() { Y_(this._element, this._name, "running") }
            setPosition(t) {
              const e = X_(this._element, this._name);
              this._position = t * this._duration,
              ev(this._element, "Delay", `-${this._position}ms`, e)
            }
            getPosition() { return this._position }
            _handleCallback(t) {
              const e = t._ngTestManualTimestamp || Date.now(),
                    n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
              t.animationName == this._name &&
                  Math.max(e - this._startTime, 0) >= this._delay &&
                  n >= this._duration && this.finish()
            }
            finish() {
              this._finished || (this._finished = !0, this._onDoneFn(),
                                 tv(this._element, this._eventFn, !0))
            }
            destroy() {
              this._destroyed ||
                  (this._destroyed = !0, this.finish(), function(t, e) {
                    const n = nv(t, "").split(","), s = J_(n, e);
                    s >= 0 && (n.splice(s, 1), ev(t, "", n.join(",")))
                  }(this._element, this._name))
            }
          }
          function Y_(t, e, n) { ev(t, "PlayState", n, X_(t, e)) }
          function X_(t, e) {
            const n = nv(t, "");
            return n.indexOf(",") > 0 ? J_(n.split(","), e) : J_([ n ], e)
          }
          function J_(t, e) {
            for (let n = 0; n < t.length; n++)
              if (t[n].indexOf(e) >= 0)
                return n;
            return -1
          }
          function tv(t, e, n) {
            n ? t.removeEventListener(K_, e) : t.addEventListener(K_, e)
          }
          function ev(t, e, n, s) {
            const i = Q_ + e;
            if (null != s) {
              const e = t.style[i];
              if (e.length) {
                const t = e.split(",");
                t[s] = n, n = t.join(",")
              }
            }
            t.style[i] = n
          }
          function nv(t, e) { return t.style[Q_ + e] }
          class sv {
            constructor(t, e, n, s, i, r, o, a) {
              this.element = t, this.keyframes = e, this.animationName = n,
              this._duration = s, this._delay = i, this._finalStyles = o,
              this._specialStyles = a, this._onDoneFns = [],
              this._onStartFns = [], this._onDestroyFns = [],
              this._started = !1, this.currentSnapshot = {}, this._state = 0,
              this.easing = r || "linear", this.totalTime = s + i,
              this._buildStyler()
            }
            onStart(t) { this._onStartFns.push(t) }
            onDone(t) { this._onDoneFns.push(t) }
            onDestroy(t) { this._onDestroyFns.push(t) }
            destroy() {
              this.init(),
                  this._state >= 4 ||
                      (this._state = 4, this._styler.destroy(),
                       this._flushStartFns(), this._flushDoneFns(),
                       this._specialStyles && this._specialStyles.destroy(),
                       this._onDestroyFns.forEach(t => t()),
                       this._onDestroyFns = [])
            }
            _flushDoneFns() {
              this._onDoneFns.forEach(t => t()), this._onDoneFns = []
            }
            _flushStartFns() {
              this._onStartFns.forEach(t => t()), this._onStartFns = []
            }
            finish() {
              this.init(),
                  this._state >= 3 ||
                      (this._state = 3, this._styler.finish(),
                       this._flushStartFns(),
                       this._specialStyles && this._specialStyles.finish(),
                       this._flushDoneFns())
            }
            setPosition(t) { this._styler.setPosition(t) }
            getPosition() { return this._styler.getPosition() }
            hasStarted() { return this._state >= 2 }
            init() {
              this._state >= 1 || (this._state = 1, this._styler.apply(),
                                   this._delay && this._styler.pause())
            }
            play() {
              this.init(),
                  this.hasStarted() ||
                      (this._flushStartFns(), this._state = 2,
                       this._specialStyles && this._specialStyles.start()),
                  this._styler.resume()
            }
            pause() { this.init(), this._styler.pause() }
            restart() { this.reset(), this.play() }
            reset() {
              this._styler.destroy(), this._buildStyler(), this._styler.apply()
            }
            _buildStyler() {
              this._styler = new Z_(this.element, this.animationName,
                                    this._duration, this._delay, this.easing,
                                    "forwards", () => this.finish())
            }
            triggerCallback(t) {
              const e = "start" == t ? this._onStartFns : this._onDoneFns;
              e.forEach(t => t()), e.length = 0
            }
            beforeDestroy() {
              this.init();
              const t = {};
              if (this.hasStarted()) {
                const e = this._state >= 3;
                Object.keys(this._finalStyles)
                    .forEach(n => {"offset" != n &&
                                   (t[n] = e ? this._finalStyles[n]
                                             : Uy(this.element, n))})
              }
              this.currentSnapshot = t
            }
          }
          class iv extends Qg {
            constructor(t, e) {
              super(), this.element = t, this._startingStyles = {},
                       this.__initialized = !1, this._styles = fy(e)
            }
            init() {
              !this.__initialized && this._startingStyles &&
                  (this.__initialized = !0,
                   Object.keys(this._styles)
                       .forEach(t => {this._startingStyles[t] =
                                          this.element.style[t]}),
                   super.init())
            }
            play() {
              this._startingStyles &&
                  (this.init(),
                   Object.keys(this._styles)
                       .forEach(t => this.element.style.setProperty(
                                    t, this._styles[t])),
                   super.play())
            }
            destroy() {
              this._startingStyles &&
                  (Object.keys(this._startingStyles).forEach(t => {
                    const e = this._startingStyles[t];
                    e ? this.element.style.setProperty(t, e)
                      : this.element.style.removeProperty(t)
                  }),
                   this._startingStyles = null, super.destroy())
            }
          }
          class rv {
            constructor() {
              this._count = 0, this._head = document.querySelector("head"),
              this._warningIssued = !1
            }
            validateStyleProperty(t) { return uy(t) }
            matchesElement(t, e) { return hy(t, e) }
            containsElement(t, e) { return dy(t, e) }
            query(t, e, n) { return py(t, e, n) }
            computeStyle(t, e, n) { return window.getComputedStyle(t)[e] }
            buildKeyframeElement(t, e, n) {
              n = n.map(t => fy(t));
              let s = `@keyframes ${e} {\n`, i = "";
              n.forEach(t => {
                i = " ";
                const e = parseFloat(t.offset);
                s += `${i}${100 * e}% {\n`, i += " ",
                    Object.keys(t).forEach(e => {
                      const n = t[e];
                      switch (e) {
                      case "offset":
                        return;
                      case "easing":
                        return void (
                            n &&
                            (s += `${i}animation-timing-function: ${n};\n`));
                      default:
                        return void (s += `${i}${e}: ${n};\n`)
                      }
                    }),
                    s += i + "}\n"
              }),
                  s += "}\n";
              const r = document.createElement("style");
              return r.innerHTML = s, r
            }
            animate(t, e, n, s, i, r = [], o) {
              o && this._notifyFaultyScrubber();
              const a = r.filter(t => t instanceof sv), l = {};
              Vy(n, s) && a.forEach(t => {
                let e = t.currentSnapshot;
                Object.keys(e).forEach(t => l[t] = e[t])
              });
              const c = function(t) {
                let e = {};
                return t && (Array.isArray(t) ? t : [ t ])
                                .forEach(
                                    t => {Object.keys(t).forEach(
                                        n => {"offset" != n && "easing" != n &&
                                              (e[n] = t[n])})}),
                       e
              }(e = By(t, e, l));
              if (0 == n)
                return new iv(t, c);
              const u = "gen_css_kf_" + this._count++,
                    h = this.buildKeyframeElement(t, u, e);
              document.querySelector("head").appendChild(h);
              const d = $_(t, e), p = new sv(t, e, u, n, s, i, c, d);
              return p.onDestroy(() => {
                var t;
                (t = h).parentNode.removeChild(t)
              }),
                     p
            }
            _notifyFaultyScrubber() {
              this._warningIssued ||
                  (console.warn(
                       "@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n",
                       "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."),
                   this._warningIssued = !0)
            }
          }
          class ov {
            constructor(t, e, n, s) {
              this.element = t, this.keyframes = e, this.options = n,
              this._specialStyles = s, this._onDoneFns = [],
              this._onStartFns = [], this._onDestroyFns = [],
              this._initialized = !1, this._finished = !1, this._started = !1,
              this._destroyed = !1, this.time = 0, this.parentPlayer = null,
              this.currentSnapshot = {}, this._duration = n.duration,
              this._delay = n.delay || 0,
              this.time = this._duration + this._delay
            }
            _onFinish() {
              this._finished ||
                  (this._finished = !0, this._onDoneFns.forEach(t => t()),
                   this._onDoneFns = [])
            }
            init() { this._buildPlayer(), this._preparePlayerBeforeStart() }
            _buildPlayer() {
              if (this._initialized)
                return;
              this._initialized = !0;
              const t = this.keyframes;
              this.domPlayer =
                  this._triggerWebAnimation(this.element, t, this.options),
              this._finalKeyframe = t.length ? t[t.length - 1] : {},
              this.domPlayer.addEventListener("finish", () => this._onFinish())
            }
            _preparePlayerBeforeStart() {
              this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
            }
            _triggerWebAnimation(t, e, n) { return t.animate(e, n) }
            onStart(t) { this._onStartFns.push(t) }
            onDone(t) { this._onDoneFns.push(t) }
            onDestroy(t) { this._onDestroyFns.push(t) }
            play() {
              this._buildPlayer(),
                  this.hasStarted() ||
                      (this._onStartFns.forEach(t => t()),
                       this._onStartFns = [], this._started = !0,
                       this._specialStyles && this._specialStyles.start()),
                  this.domPlayer.play()
            }
            pause() { this.init(), this.domPlayer.pause() }
            finish() {
              this.init(), this._specialStyles && this._specialStyles.finish(),
                  this._onFinish(), this.domPlayer.finish()
            }
            reset() {
              this._resetDomPlayerState(),
                  this._destroyed = !1, this._finished = !1, this._started = !1
            }
            _resetDomPlayerState() { this.domPlayer && this.domPlayer.cancel() }
            restart() { this.reset(), this.play() }
            hasStarted() { return this._started }
            destroy() {
              this._destroyed ||
                  (this._destroyed = !0, this._resetDomPlayerState(),
                   this._onFinish(),
                   this._specialStyles && this._specialStyles.destroy(),
                   this._onDestroyFns.forEach(t => t()),
                   this._onDestroyFns = [])
            }
            setPosition(t) { this.domPlayer.currentTime = t * this.time }
            getPosition() { return this.domPlayer.currentTime / this.time }
            get totalTime() { return this._delay + this._duration }
            beforeDestroy() {
              const t = {};
              this.hasStarted() &&
                  Object.keys(this._finalKeyframe)
                      .forEach(
                          e => {"offset" != e &&
                                (t[e] = this._finished ? this._finalKeyframe[e]
                                                       : Uy(this.element, e))}),
                  this.currentSnapshot = t
            }
            triggerCallback(t) {
              const e = "start" == t ? this._onStartFns : this._onDoneFns;
              e.forEach(t => t()), e.length = 0
            }
          }
          class av {
            constructor() {
              this._isNativeImpl =
                  /\{\s*\[native\s+code\]\s*\}/.test(lv().toString()),
              this._cssKeyframesDriver = new rv
            }
            validateStyleProperty(t) { return uy(t) }
            matchesElement(t, e) { return hy(t, e) }
            containsElement(t, e) { return dy(t, e) }
            query(t, e, n) { return py(t, e, n) }
            computeStyle(t, e, n) { return window.getComputedStyle(t)[e] }
            overrideWebAnimationsSupport(t) { this._isNativeImpl = t }
            animate(t, e, n, s, i, r = [], o) {
              if (!o && !this._isNativeImpl)
                return this._cssKeyframesDriver.animate(t, e, n, s, i, r);
              const a = {
                duration : n,
                delay : s,
                fill : 0 == s ? "both" : "forwards"
              };
              i && (a.easing = i);
              const l = {}, c = r.filter(t => t instanceof ov);
              Vy(n, s) && c.forEach(t => {
                let e = t.currentSnapshot;
                Object.keys(e).forEach(t => l[t] = e[t])
              });
              const u = $_(t, e = By(t, e = e.map(t => Ty(t, !1)), l));
              return new ov(t, e, a, u)
            }
          }
          function lv() {
            return "undefined" != typeof window && void 0 !== window.document &&
                       Element.prototype.animate ||
            {}
          }
          let cv = (() => {
            class t extends
                jg {
                  constructor(t, e) {
                    super(), this._nextAnimationId = 0,
                             this._renderer = t.createRenderer(e.body, {
                               id : "0",
                               encapsulation : he.None,
                               styles : [],
                               data : {animation : []}
                             })
                  }
                  build(t) {
                    const e = this._nextAnimationId.toString();
                    this._nextAnimationId++;
                    const n = Array.isArray(t) ? Ug(t) : t;
                    return dv(this._renderer, null, e, "register", [ n ]),
                           new uv(e, this._renderer)
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(ca), Zt(pc)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
          })();
          class uv extends class {}
          {
            constructor(t, e) { super(), this._id = t, this._renderer = e }
            create(t, e) { return new hv(this._id, t, e || {}, this._renderer) }
          }
          class hv {
            constructor(t, e, n, s) {
              this.id = t, this.element = e, this._renderer = s,
              this.parentPlayer = null, this._started = !1, this.totalTime = 0,
              this._command("create", n)
            }
            _listen(t, e) {
              return this._renderer.listen(this.element, `@@${this.id}:${t}`, e)
            }
            _command(t, ...e) {
              return dv(this._renderer, this.element, this.id, t, e)
            }
            onDone(t) { this._listen("done", t) }
            onStart(t) { this._listen("start", t) }
            onDestroy(t) { this._listen("destroy", t) }
            init() { this._command("init") }
            hasStarted() { return this._started }
            play() { this._command("play"), this._started = !0 }
            pause() { this._command("pause") }
            restart() { this._command("restart") }
            finish() { this._command("finish") }
            destroy() { this._command("destroy") }
            reset() { this._command("reset") }
            setPosition(t) { this._command("setPosition", t) }
            getPosition() { return 0 }
          }
          function dv(t, e, n, s, i) {
            return t.setProperty(e, `@@${n}:${s}`, i)
          }
          const pv = "@", fv = "@.disabled";
          let mv = (() => {
            class t {
              constructor(t, e, n) {
                this.delegate = t, this.engine = e, this._zone = n,
                this._currentId = 0, this._microtaskId = 1,
                this._animationCallbacksBuffer = [],
                this._rendererCache = new Map, this._cdRecurDepth = 0,
                this.promise = Promise.resolve(0),
                e.onRemovalComplete = (t, e) => {
                  e && e.parentNode(t) && e.removeChild(t.parentNode, t)
                }
              }
              createRenderer(t, e) {
                const n = this.delegate.createRenderer(t, e);
                if (!(t && e && e.data && e.data.animation)) {
                  let t = this._rendererCache.get(n);
                  return t || (t = new gv("", n, this.engine),
                               this._rendererCache.set(n, t)),
                         t
                }
                const s = e.id, i = e.id + "-" + this._currentId;
                this._currentId++, this.engine.register(i, t);
                const r = e => {
                  Array.isArray(e)
                      ? e.forEach(r)
                      : this.engine.registerTrigger(s, i, t, e.name, e)
                };
                return e.data.animation.forEach(r),
                       new yv(this, i, n, this.engine)
              }
              begin() {
                this._cdRecurDepth++,
                    this.delegate.begin && this.delegate.begin()
              }
              _scheduleCountTask() {
                this.promise.then(() => {this._microtaskId++})
              }
              scheduleListenerCallback(t, e, n) {
                t >= 0 && t < this._microtaskId
                    ? this._zone.run(() => e(n))
                    : (0 == this._animationCallbacksBuffer.length &&
                           Promise.resolve(null).then(
                               () => {this._zone.run(() => {
                                 this._animationCallbacksBuffer.forEach(t => {
                                   const [e, n] = t;
                                   e(n)
                                 }),
                                 this._animationCallbacksBuffer = []
                               })}),
                       this._animationCallbacksBuffer.push([ e, n ]))
              }
              end() {
                this._cdRecurDepth--,
                    0 == this._cdRecurDepth &&
                        this._zone.runOutsideAngular(() => {
                          this._scheduleCountTask(),
                          this.engine.flush(this._microtaskId)
                        }),
                    this.delegate.end && this.delegate.end()
              }
              whenRenderingDone() { return this.engine.whenRenderingDone() }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(ca), Zt(z_), Zt(Fl)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })();
          class gv {
            constructor(t, e, n) {
              this.namespaceId = t, this.delegate = e, this.engine = n,
              this.destroyNode =
                  this.delegate.destroyNode ? t => e.destroyNode(t) : null
            }
            get data() { return this.delegate.data }
            destroy() {
              this.engine.destroy(this.namespaceId, this.delegate),
                  this.delegate.destroy()
            }
            createElement(t, e) { return this.delegate.createElement(t, e) }
            createComment(t) { return this.delegate.createComment(t) }
            createText(t) { return this.delegate.createText(t) }
            appendChild(t, e) {
              this.delegate.appendChild(t, e),
                  this.engine.onInsert(this.namespaceId, e, t, !1)
            }
            insertBefore(t, e, n) {
              this.delegate.insertBefore(t, e, n),
                  this.engine.onInsert(this.namespaceId, e, t, !0)
            }
            removeChild(t, e, n) {
              this.engine.onRemove(this.namespaceId, e, this.delegate, n)
            }
            selectRootElement(t, e) {
              return this.delegate.selectRootElement(t, e)
            }
            parentNode(t) { return this.delegate.parentNode(t) }
            nextSibling(t) { return this.delegate.nextSibling(t) }
            setAttribute(t, e, n, s) { this.delegate.setAttribute(t, e, n, s) }
            removeAttribute(t, e, n) { this.delegate.removeAttribute(t, e, n) }
            addClass(t, e) { this.delegate.addClass(t, e) }
            removeClass(t, e) { this.delegate.removeClass(t, e) }
            setStyle(t, e, n, s) { this.delegate.setStyle(t, e, n, s) }
            removeStyle(t, e, n) { this.delegate.removeStyle(t, e, n) }
            setProperty(t, e, n) {
              e.charAt(0) == pv && e == fv ? this.disableAnimations(t, !!n)
                                           : this.delegate.setProperty(t, e, n)
            }
            setValue(t, e) { this.delegate.setValue(t, e) }
            listen(t, e, n) { return this.delegate.listen(t, e, n) }
            disableAnimations(t, e) { this.engine.disableAnimations(t, e) }
          }
          class yv extends gv {
            constructor(t, e, n, s) {
              super(e, n, s), this.factory = t, this.namespaceId = e
            }
            setProperty(t, e, n) {
              e.charAt(0) == pv
                  ? "." == e.charAt(1) && e == fv
                        ? this.disableAnimations(t, n = void 0 === n || !!n)
                        : this.engine.process(this.namespaceId, t, e.substr(1),
                                              n)
                  : this.delegate.setProperty(t, e, n)
            }
            listen(t, e, n) {
              if (e.charAt(0) == pv) {
                const s = function(t) {
                  switch (t) {
                  case "body":
                    return document.body;
                  case "document":
                    return document;
                  case "window":
                    return window;
                  default:
                    return t
                  }
                }(t);
                let i = e.substr(1), r = "";
                return i.charAt(0) != pv &&
                           ([ i, r ] =
                                function(t) {
                                  const e = t.indexOf(".");
                                  return [ t.substring(0, e), t.substr(e + 1) ]
                                }(i)),
                       this.engine.listen(
                           this.namespaceId, s, i, r,
                           t => {this.factory.scheduleListenerCallback(
                               t._data || -1, n, t)})
              }
              return this.delegate.listen(t, e, n)
            }
          }
          let _v = (() => {
            class t extends
                z_ {
                  constructor(t, e, n) { super(t.body, e, n) }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(pc), Zt(gy), Zt(d_)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
          })();
          const vv = new Vt("AnimationModuleType"), bv = [
            {
              provide : gy,
              useFactory : function() {
                return "function" == typeof lv() ? new av : new rv
              }
            },
            {provide : vv, useValue : "BrowserAnimations"},
            {provide : jg, useClass : cv},
            {provide : d_, useFactory : function() { return new p_ }},
            {provide : z_, useClass : _v}, {
              provide : ca,
              useFactory : function(t, e, n) { return new mv(t, e, n) },
              deps : [ fu, z_, Fl ]
            }
          ];
          let wv = (() => {
            class t {} return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t) },
              providers : bv,
              imports : [ Au ]
            }),
            t
          })();
          const xv = new fa("10.2.2"),
                Sv = new Vt(
                    "mat-sanity-checks",
                    {providedIn : "root", factory : function() { return !0 }});
          let Ev,
              Cv = (() => {
                class t {
                  constructor(t, e, n) {
                    this._hasDoneGlobalChecks = !1, this._document = n,
                    t._applyBodyHighContrastModeCssClasses(),
                    this._sanityChecks = e,
                    this._hasDoneGlobalChecks ||
                        (this._checkDoctypeIsDefined(),
                         this._checkThemeIsPresent(),
                         this._checkCdkVersionMatch(),
                         this._hasDoneGlobalChecks = !0)
                  }
                  _getDocument() {
                    const t = this._document || document;
                    return "object" == typeof t && t ? t : null
                  }
                  _getWindow() {
                    const t = this._getDocument(),
                          e = (null == t ? void 0 : t.defaultView) || window;
                    return "object" == typeof e && e ? e : null
                  }
                  _checksAreEnabled() { return As() && !this._isTestEnv() }
                  _isTestEnv() {
                    const t = this._getWindow();
                    return t && (t.__karma__ || t.jasmine)
                  }
                  _checkDoctypeIsDefined() {
                    const t = this._checksAreEnabled() &&
                              (!0 === this._sanityChecks ||
                               this._sanityChecks.doctype),
                          e = this._getDocument();
                    t && e && !e.doctype &&
                        console.warn(
                            "Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.")
                  }
                  _checkThemeIsPresent() {
                    const t = !this._checksAreEnabled() ||
                              !1 === this._sanityChecks ||
                              !this._sanityChecks.theme,
                          e = this._getDocument();
                    if (t || !e || !e.body ||
                        "function" != typeof getComputedStyle)
                      return;
                    const n = e.createElement("div");
                    n.classList.add("mat-theme-loaded-marker"),
                        e.body.appendChild(n);
                    const s = getComputedStyle(n);
                    s && "none" !== s.display &&
                        console.warn(
                            "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"),
                        e.body.removeChild(n)
                  }
                  _checkCdkVersionMatch() {
                    this._checksAreEnabled() &&
                        (!0 === this._sanityChecks ||
                         this._sanityChecks.version) &&
                        xv.full !== Mg.full &&
                        console.warn(
                            "The Angular Material version (" + xv.full +
                            ") does not match the Angular CDK version (" +
                            Mg.full +
                            ").\nPlease ensure the versions of these two packages exactly match.")
                  }
                } return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(
                      e) { return new (e || t)(Zt(Ng), Zt(Sv, 8), Zt(pc, 8)) },
                  imports : [ [ dm ], dm ]
                }),
                t
              })();
          function kv(t) {
            return class extends t {
              constructor(...t) { super(...t), this._disabled = !1 }
              get disabled() { return this._disabled }
              set disabled(t) { this._disabled = pg(t) }
            }
          }
          function Tv(t, e) {
            return class extends t {
              constructor(...t) {
                super(...t), this.defaultColor = e, this.color = e
              }
              get color() { return this._color }
              set color(t) {
                const e = t || this.defaultColor;
                e !== this._color &&
                    (this._color &&
                         this._elementRef.nativeElement.classList.remove(
                             "mat-" + this._color),
                     e && this._elementRef.nativeElement.classList.add("mat-" +
                                                                       e),
                     this._color = e)
              }
            }
          }
          function Av(t) {
            return class extends t {
              constructor(...t) { super(...t), this._disableRipple = !1 }
              get disableRipple() { return this._disableRipple }
              set disableRipple(t) { this._disableRipple = pg(t) }
            }
          }
          function Iv(t, e = 0) {
            return class extends t {
              constructor(...t) {
                super(...t), this._tabIndex = e, this.defaultTabIndex = e
              }
              get tabIndex() { return this.disabled ? -1 : this._tabIndex }
              set tabIndex(t) {
                this._tabIndex = null != t ? fg(t) : this.defaultTabIndex
              }
            }
          }
          try {
            Ev = "undefined" != typeof Intl
          } catch (Qw) {
            Ev = !1
          }
          class Rv {
            constructor(t, e, n) {
              this._renderer = t, this.element = e, this.config = n,
              this.state = 3
            }
            fadeOut() { this._renderer.fadeOutRipple(this) }
          }
          const Ov = {enterDuration : 450, exitDuration : 400},
                Pv = hg({passive : !0}), Lv = [ "mousedown", "touchstart" ],
                Dv = [ "mouseup", "mouseleave", "touchend", "touchcancel" ];
          class Nv {
            constructor(t, e, n, s) {
              this._target = t, this._ngZone = e, this._isPointerDown = !1,
              this._activeRipples = new Set,
              this._pointerUpEventsRegistered = !1,
              s.isBrowser && (this._containerElement = yg(n))
            }
            fadeInRipple(t, e, n = {}) {
              const s = this._containerRect =
                  this._containerRect ||
                  this._containerElement.getBoundingClientRect(),
                    i = Object.assign(Object.assign({}, Ov), n.animation);
              n.centered &&
                  (t = s.left + s.width / 2, e = s.top + s.height / 2);
              const r = n.radius ||
                        function(t, e, n) {
                          const s = Math.max(Math.abs(t - n.left),
                                             Math.abs(t - n.right)),
                                i = Math.max(Math.abs(e - n.top),
                                             Math.abs(e - n.bottom));
                          return Math.sqrt(s * s + i * i)
                        }(t, e, s),
                    o = t - s.left, a = e - s.top, l = i.enterDuration,
                    c = document.createElement("div");
              c.classList.add("mat-ripple-element"),
                  c.style.left = o - r + "px", c.style.top = a - r + "px",
                  c.style.height = 2 * r + "px", c.style.width = 2 * r + "px",
                  null != n.color && (c.style.backgroundColor = n.color),
                  c.style.transitionDuration = l + "ms",
                  this._containerElement.appendChild(c),
                  window.getComputedStyle(c).getPropertyValue("opacity"),
                  c.style.transform = "scale(1)";
              const u = new Rv(this, c, n);
              return u.state = 0, this._activeRipples.add(u),
                     n.persistent || (this._mostRecentTransientRipple = u),
                     this._runTimeoutOutsideZone(() => {
                       const t = u === this._mostRecentTransientRipple;
                       u.state = 1,
                       n.persistent || t && this._isPointerDown || u.fadeOut()
                     }, l), u
            }
            fadeOutRipple(t) {
              const e = this._activeRipples.delete(t);
              if (t === this._mostRecentTransientRipple &&
                      (this._mostRecentTransientRipple = null),
                  this._activeRipples.size || (this._containerRect = null), !e)
                return;
              const n = t.element, s = Object.assign(Object.assign({}, Ov),
                                                     t.config.animation);
              n.style.transitionDuration = s.exitDuration + "ms",
              n.style.opacity = "0", t.state = 2,
              this._runTimeoutOutsideZone(
                  () => {t.state = 3, n.parentNode.removeChild(n)},
                  s.exitDuration)
            }
            fadeOutAll() { this._activeRipples.forEach(t => t.fadeOut()) }
            setupTriggerEvents(t) {
              const e = yg(t);
              e && e !== this._triggerElement &&
                  (this._removeTriggerEvents(), this._triggerElement = e,
                   this._registerEvents(Lv))
            }
            handleEvent(t) {
              "mousedown" === t.type ? this._onMousedown(t)
                                     : "touchstart" === t.type ? this._onTouchStart(
                                                                     t)
                                                               : this._onPointerUp(),
                  this._pointerUpEventsRegistered ||
                      (this._registerEvents(Dv),
                       this._pointerUpEventsRegistered = !0)
            }
            _onMousedown(t) {
              const e = Tg(t), n = this._lastTouchStartEvent &&
                                   Date.now() < this._lastTouchStartEvent + 800;
              this._target.rippleDisabled || e || n ||
                  (this._isPointerDown = !0,
                   this.fadeInRipple(t.clientX, t.clientY,
                                     this._target.rippleConfig))
            }
            _onTouchStart(t) {
              if (!this._target.rippleDisabled) {
                this._lastTouchStartEvent = Date.now(),
                this._isPointerDown = !0;
                const e = t.changedTouches;
                for (let t = 0; t < e.length; t++)
                  this.fadeInRipple(e[t].clientX, e[t].clientY,
                                    this._target.rippleConfig)
              }
            }
            _onPointerUp() {
              this._isPointerDown &&
                  (this._isPointerDown = !1,
                   this._activeRipples.forEach(
                       t => {!t.config.persistent &&
                             (1 === t.state ||
                              t.config.terminateOnPointerUp && 0 === t.state) &&
                             t.fadeOut()}))
            }
            _runTimeoutOutsideZone(t, e = 0) {
              this._ngZone.runOutsideAngular(() => setTimeout(t, e))
            }
            _registerEvents(t) {
              this._ngZone.runOutsideAngular(
                  () => {t.forEach(t => {this._triggerElement.addEventListener(
                                       t, this, Pv)})})
            }
            _removeTriggerEvents() {
              this._triggerElement &&
                  (Lv.forEach(t => {this._triggerElement.removeEventListener(
                                  t, this, Pv)}),
                   this._pointerUpEventsRegistered &&
                       Dv.forEach(
                           t => {this._triggerElement.removeEventListener(
                               t, this, Pv)}))
            }
          }
          const Fv = new Vt("mat-ripple-global-options");
          let Mv = (() => {
            class t {
              constructor(t, e, n, s, i) {
                this._elementRef = t, this._animationMode = i, this.radius = 0,
                this._disabled = !1, this._isInitialized = !1,
                this._globalOptions = s || {},
                this._rippleRenderer = new Nv(this, e, t, n)
              }
              get disabled() { return this._disabled }
              set disabled(t) {
                this._disabled = t, this._setupTriggerEventsIfEnabled()
              }
              get trigger() {
                return this._trigger || this._elementRef.nativeElement
              }
              set trigger(t) {
                this._trigger = t, this._setupTriggerEventsIfEnabled()
              }
              ngOnInit() {
                this._isInitialized = !0, this._setupTriggerEventsIfEnabled()
              }
              ngOnDestroy() { this._rippleRenderer._removeTriggerEvents() }
              fadeOutAll() { this._rippleRenderer.fadeOutAll() }
              get rippleConfig() {
                return {
                  centered: this.centered, radius: this.radius,
                      color: this.color,
                      animation: Object.assign(
                          Object.assign(
                              Object.assign({}, this._globalOptions.animation),
                              "NoopAnimations" === this._animationMode
                                  ? {enterDuration : 0, exitDuration : 0}
                                  : {}),
                          this.animation),
                      terminateOnPointerUp:
                          this._globalOptions.terminateOnPointerUp
                }
              }
              get rippleDisabled() {
                return this.disabled || !!this._globalOptions.disabled
              }
              _setupTriggerEventsIfEnabled() {
                !this.disabled && this._isInitialized &&
                    this._rippleRenderer.setupTriggerEvents(this.trigger)
              }
              launch(t, e = 0, n) {
                return "number" == typeof t
                           ? this._rippleRenderer.fadeInRipple(
                                 t, e,
                                 Object.assign(
                                     Object.assign({}, this.rippleConfig), n))
                           : this._rippleRenderer.fadeInRipple(
                                 0, 0,
                                 Object.assign(
                                     Object.assign({}, this.rippleConfig), t))
              }
            } return t.\u0275fac =
                function(e) {
                  return new (e || t)(So(aa), So(Fl), So(cg), So(Fv, 8),
                                      So(vv, 8))
                },
            t.\u0275dir = we({
              type : t,
              selectors : [ [ "", "mat-ripple", "" ], [ "", "matRipple", "" ] ],
              hostAttrs : [ 1, "mat-ripple" ],
              hostVars : 2,
              hostBindings : function(
                  t, e) { 2&t && Bo("mat-ripple-unbounded", e.unbounded) },
              inputs : {
                radius : [ "matRippleRadius", "radius" ],
                disabled : [ "matRippleDisabled", "disabled" ],
                trigger : [ "matRippleTrigger", "trigger" ],
                color : [ "matRippleColor", "color" ],
                unbounded : [ "matRippleUnbounded", "unbounded" ],
                centered : [ "matRippleCentered", "centered" ],
                animation : [ "matRippleAnimation", "animation" ]
              },
              exportAs : [ "matRipple" ]
            }),
            t
          })(),
              jv = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  imports : [ [ Cv, ug ], Cv ]
                }),
                t
              })();
          const Vv = [ "mat-button", "" ], Bv = [ "*" ], Hv = [
            "mat-button", "mat-flat-button", "mat-icon-button",
            "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab"
          ];
          class Uv {
            constructor(t) { this._elementRef = t }
          }
          const zv = Tv(kv(Av(Uv)));
          let $v = (() => {
            class t extends
                zv {
                  constructor(t, e, n) {
                    super(t),
                        this._focusMonitor = e, this._animationMode = n,
                        this.isRoundButton =
                            this._hasHostAttributes("mat-fab", "mat-mini-fab"),
                        this.isIconButton =
                            this._hasHostAttributes("mat-icon-button");
                    for (const s of Hv)
                      this._hasHostAttributes(s) &&
                          this._getHostElement().classList.add(s);
                    t.nativeElement.classList.add("mat-button-base"),
                        this.isRoundButton && (this.color = "accent")
                  }
                  ngAfterViewInit() {
                    this._focusMonitor.monitor(this._elementRef, !0)
                  }
                  ngOnDestroy() {
                    this._focusMonitor.stopMonitoring(this._elementRef)
                  }
                  focus(t = "program", e) {
                    this._focusMonitor.focusVia(this._getHostElement(), t, e)
                  }
                  _getHostElement() { return this._elementRef.nativeElement }
                  _isRippleDisabled() {
                    return this.disableRipple || this.disabled
                  }
                  _hasHostAttributes(...t) {
                    return t.some(t => this._getHostElement().hasAttribute(t))
                  }
                } return t.\u0275fac =
                    function(
                        e) { return new (e || t)(So(aa), So(Rg), So(vv, 8)) },
                t.\u0275cmp = me({
                  type : t,
                  selectors : [
                    [ "button", "mat-button", "" ],
                    [ "button", "mat-raised-button", "" ],
                    [ "button", "mat-icon-button", "" ],
                    [ "button", "mat-fab", "" ],
                    [ "button", "mat-mini-fab", "" ],
                    [ "button", "mat-stroked-button", "" ],
                    [ "button", "mat-flat-button", "" ]
                  ],
                  viewQuery : function(t, e) {
                    var n;
                    1&t && dl(Mv, !0),
                        2&t && hl(n = pl()) && (e.ripple = n.first)
                  },
                  hostAttrs : [ 1, "mat-focus-indicator" ],
                  hostVars : 5,
                  hostBindings : function(t, e) {
                    2&t && (wo("disabled", e.disabled || null),
                            Bo("_mat-animation-noopable",
                               "NoopAnimations" === e._animationMode)(
                                "mat-button-disabled", e.disabled))
                  },
                  inputs : {
                    disabled : "disabled",
                    disableRipple : "disableRipple",
                    color : "color"
                  },
                  exportAs : [ "matButton" ],
                  features : [ ao ],
                  attrs : Vv,
                  ngContentSelectors : Bv,
                  decls : 4,
                  vars : 5,
                  consts : [
                    [ 1, "mat-button-wrapper" ],
                    [
                      "matRipple", "", 1, "mat-button-ripple", 3,
                      "matRippleDisabled", "matRippleCentered",
                      "matRippleTrigger"
                    ],
                    [ 1, "mat-button-focus-overlay" ]
                  ],
                  template : function(t, e) {
                    1&t&&(function(t){const e=sn()[16][6];if(!e.projection){const t=e.projection=oe(1,null),n=t.slice();let s=e.child;for(;null!==s;){const e=0;null!==e&&(n[e]?n[e].projectionNext=s:t[e]=s,n[e]=s),s=s.next}}}(),To(0,"span",0),function(t,e=0,n){const s=sn(),i=rn(),r=ki(i,s[6],t,1,null,n||null);null===r.projection&&(r.projection=e),cn(),function(t,e,n){Ar(e[11],0,e,n,_r(t,n,e),Sr(n.parent||e[6],e))}(i,s,r)}(1),Ao(),Io(2,"span",1),Io(3,"span",2)),2&t&&(mi(2),Bo("mat-button-ripple-round",e.isRoundButton||e.isIconButton),Co("matRippleDisabled",e._isRippleDisabled())("matRippleCentered",e.isIconButton)("matRippleTrigger",e._getHostElement()))
                  },
                  directives : [ Mv ],
                  styles : [
                    ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.cdk-high-contrast-active .mat-button-focus-overlay{background-color:#fff}.cdk-high-contrast-black-on-white .mat-button-focus-overlay{background-color:#000}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}\n"
                  ],
                  encapsulation : 2,
                  changeDetection : 0
                }),
                t
          })(),
              qv = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  imports : [ [ jv, Cv ], Cv ]
                }),
                t
              })();
          class Wv {
            constructor(t) { this.durationSelector = t }
            call(t, e) { return e.subscribe(new Gv(t, this.durationSelector)) }
          }
          class Gv extends j {
            constructor(t, e) {
              super(t), this.durationSelector = e, this.hasValue = !1
            }
            _next(t) {
              if (this.value = t, this.hasValue = !0, !this.throttled) {
                let n;
                try {
                  const {durationSelector : e} = this;
                  n = e(t)
                } catch (e) {
                  return this.destination.error(e)
                }
                const s = V(n, new M(this));
                !s || s.closed ? this.clearThrottle()
                               : this.add(this.throttled = s)
              }
            }
            clearThrottle() {
              const {value : t, hasValue : e, throttled : n} = this;
              n && (this.remove(n), this.throttled = void 0, n.unsubscribe()),
                  e && (this.value = void 0, this.hasValue = !1,
                        this.destination.next(t))
            }
            notifyNext() { this.clearThrottle() }
            notifyComplete() { this.clearThrottle() }
          }
          function Qv(t) { return !l(t) && t - parseFloat(t) + 1 >= 0 }
          function Kv(t) {
            const {index : e, period : n, subscriber : s} = t;
            if (s.next(e), !s.closed) {
              if (-1 === n)
                return s.complete();
              t.index = e + 1, this.schedule(t, n)
            }
          }
          function Zv(t, e = mf) {
            return n = () => function(t = 0, e, n) {
              let s = -1;
              return Qv(e)
                         ? s = Number(e) < 1 ? 1 : Number(e)
                         : C(e) && (n = e),
                           C(n) || (n = mf), new _(e => {
                             const i = Qv(t) ? t : +t - n.now();
                             return n.schedule(
                                 Kv, i, {index : 0, period : s, subscriber : e})
                           })
            }(t, e), function(t) { return t.lift(new Wv(n)) };
            var n
          }
          function Yv(t, e) {
            return new _(e ? n => e.schedule(Xv, 0, {error : t, subscriber : n})
                           : e => e.error(t))
          }
          function Xv({error : t, subscriber : e}) { e.error(t) }
          let Jv = (() => {
            class t {
              constructor(t, e, n) {
                this.kind = t, this.value = e, this.error = n,
                this.hasValue = "N" === t
              }
              observe(t) {
                switch (this.kind) {
                case "N":
                  return t.next && t.next(this.value);
                case "E":
                  return t.error && t.error(this.error);
                case "C":
                  return t.complete && t.complete()
                }
              }
              do
                (t, e, n) {
                  switch (this.kind) {
                  case "N":
                    return t && t(this.value);
                  case "E":
                    return e && e(this.error);
                  case "C":
                    return n && n()
                  }
                }
              accept(t, e, n) {
                return t && "function" == typeof t.next ? this.observe(t)
                                                        : this.do(t, e, n)
              }
              toObservable() {
                switch (this.kind) {
                case "N":
                  return Iu(this.value);
                case "E":
                  return Yv(this.error);
                case "C":
                  return Bu()
                }
                throw new Error("unexpected notification kind value")
              }
              static createNext(e) {
                return void 0 !== e ? new t("N", e)
                                    : t.undefinedValueNotification
              }
              static createError(e) { return new t("E", void 0, e) }
              static createComplete() { return t.completeNotification }
            } return t.completeNotification = new t("C"),
            t.undefinedValueNotification = new t("N", void 0),
            t
          })(),
              tb = (() => {
                class t {
                  constructor(t, e, n) {
                    this._ngZone = t, this._platform = e,
                    this._scrolled = new S, this._globalSubscription = null,
                    this._scrolledCount = 0, this.scrollContainers = new Map,
                    this._document = n
                  }
                  register(t) {
                    this.scrollContainers.has(t) ||
                        this.scrollContainers.set(
                            t, t.elementScrolled().subscribe(
                                   () => this._scrolled.next(t)))
                  }
                  deregister(t) {
                    const e = this.scrollContainers.get(t);
                    e && (e.unsubscribe(), this.scrollContainers.delete(t))
                  }
                  scrolled(t = 20) {
                    return this._platform.isBrowser ? new _(e => {
                      this._globalSubscription || this._addGlobalListener();
                      const n = t > 0 ? this._scrolled.pipe(Zv(t)).subscribe(e)
                                      : this._scrolled.subscribe(e);
                      return this._scrolledCount++, () => {
                        n.unsubscribe(), this._scrolledCount--,
                            this._scrolledCount || this._removeGlobalListener()
                      }
                    })
                                                    : Iu()
                  }
                  ngOnDestroy() {
                    this._removeGlobalListener(),
                        this.scrollContainers.forEach((t, e) =>
                                                          this.deregister(e)),
                        this._scrolled.complete()
                  }
                  ancestorScrolled(t, e) {
                    const n = this.getAncestorScrollContainers(t);
                    return this.scrolled(e).pipe(
                        zu(t => !t || n.indexOf(t) > -1))
                  }
                  getAncestorScrollContainers(t) {
                    const e = [];
                    return this.scrollContainers.forEach(
                               (n,
                                s) => {this._scrollableContainsElement(s, t) &&
                                       e.push(s)}),
                           e
                  }
                  _getDocument() { return this._document || document }
                  _getWindow() {
                    return this._getDocument().defaultView || window
                  }
                  _scrollableContainsElement(t, e) {
                    let n = e.nativeElement,
                        s = t.getElementRef().nativeElement;
                    do {
                      if (n == s)
                        return !0
                    } while (n = n.parentElement);
                    return !1
                  }
                  _addGlobalListener() {
                    this._globalSubscription = this._ngZone.runOutsideAngular(
                        () => ff(this._getWindow().document, "scroll")
                                  .subscribe(() => this._scrolled.next()))
                  }
                  _removeGlobalListener() {
                    this._globalSubscription &&
                        (this._globalSubscription.unsubscribe(),
                         this._globalSubscription = null)
                  }
                } return t.\u0275fac =
                    function(
                        e) { return new (e || t)(Zt(Fl), Zt(cg), Zt(pc, 8)) },
                t.\u0275prov = ht({
                  factory :
                      function() { return new t(Zt(Fl), Zt(cg), Zt(pc, 8)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })(),
              eb = (() => {
                class t {
                  constructor(t, e, n) {
                    this._platform = t, this._change = new S,
                    this._changeListener = t => { this._change.next(t) },
                    this._document = n, e.runOutsideAngular(() => {
                      if (t.isBrowser) {
                        const t = this._getWindow();
                        t.addEventListener("resize", this._changeListener),
                            t.addEventListener("orientationchange",
                                               this._changeListener)
                      }
                      this.change().subscribe(() => this._updateViewportSize())
                    })
                  }
                  ngOnDestroy() {
                    if (this._platform.isBrowser) {
                      const t = this._getWindow();
                      t.removeEventListener("resize", this._changeListener),
                          t.removeEventListener("orientationchange",
                                                this._changeListener)
                    }
                    this._change.complete()
                  }
                  getViewportSize() {
                    this._viewportSize || this._updateViewportSize();
                    const t = {
                      width : this._viewportSize.width,
                      height : this._viewportSize.height
                    };
                    return this._platform.isBrowser ||
                               (this._viewportSize = null),
                           t
                  }
                  getViewportRect() {
                    const t = this.getViewportScrollPosition(),
                          {width : e, height : n} = this.getViewportSize();
                    return {
                      top: t.top, left: t.left, bottom: t.top + n,
                          right: t.left + e, height: n, width: e
                    }
                  }
                  getViewportScrollPosition() {
                    if (!this._platform.isBrowser)
                      return {top : 0, left : 0};
                    const t = this._getDocument(), e = this._getWindow(),
                          n = t.documentElement, s = n.getBoundingClientRect();
                    return {
                      top: -s.top || t.body.scrollTop || e.scrollY ||
                          n.scrollTop || 0,
                          left: -s.left || t.body.scrollLeft || e.scrollX ||
                              n.scrollLeft || 0
                    }
                  }
                  change(t = 20) {
                    return t > 0 ? this._change.pipe(Zv(t)) : this._change
                  }
                  _getDocument() { return this._document || document }
                  _getWindow() {
                    return this._getDocument().defaultView || window
                  }
                  _updateViewportSize() {
                    const t = this._getWindow();
                    this._viewportSize =
                        this._platform.isBrowser
                            ? {width : t.innerWidth, height : t.innerHeight}
                            : {width : 0, height : 0}
                  }
                } return t.\u0275fac =
                    function(
                        e) { return new (e || t)(Zt(cg), Zt(Fl), Zt(pc, 8)) },
                t.\u0275prov = ht({
                  factory :
                      function() { return new t(Zt(cg), Zt(Fl), Zt(pc, 8)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })(),
              nb = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj =
                    dt({factory : function(e) { return new (e || t) }}),
                t
              })(),
              sb = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  imports : [ [ dm, ug, nb ], dm, nb ]
                }),
                t
              })();
          class ib {
            attach(t) { return this._attachedHost = t, t.attach(this) }
            detach() {
              let t = this._attachedHost;
              null != t && (this._attachedHost = null, t.detach())
            }
            get isAttached() { return null != this._attachedHost }
            setAttachedHost(t) { this._attachedHost = t }
          }
          class rb extends ib {
            constructor(t, e, n, s) {
              super(), this.component = t, this.viewContainerRef = e,
                       this.injector = n, this.componentFactoryResolver = s
            }
          }
          class ob extends ib {
            constructor(t, e, n) {
              super(), this.templateRef = t, this.viewContainerRef = e,
                       this.context = n
            }
            get origin() { return this.templateRef.elementRef }
            attach(t, e = this.context) {
              return this.context = e, super.attach(t)
            }
            detach() { return this.context = void 0, super.detach() }
          }
          class ab extends ib {
            constructor(t) {
              super(), this.element = t instanceof aa ? t.nativeElement : t
            }
          }
          class lb extends class {
            constructor() { this._isDisposed = !1, this.attachDomPortal = null }
            hasAttached() { return !!this._attachedPortal }
            attach(t) {
              return t instanceof rb
                         ? (this._attachedPortal = t,
                            this.attachComponentPortal(t))
                         : t instanceof ob
                               ? (this._attachedPortal = t,
                                  this.attachTemplatePortal(t))
                               : this.attachDomPortal && t instanceof ab
                                     ? (this._attachedPortal = t,
                                        this.attachDomPortal(t))
                                     : void 0
            }
            detach() {
              this._attachedPortal &&
                  (this._attachedPortal.setAttachedHost(null),
                   this._attachedPortal = null),
                  this._invokeDisposeFn()
            }
            dispose() {
              this.hasAttached() && this.detach(), this._invokeDisposeFn(),
                  this._isDisposed = !0
            }
            setDisposeFn(t) { this._disposeFn = t }
            _invokeDisposeFn() {
              this._disposeFn && (this._disposeFn(), this._disposeFn = null)
            }
          }
          {
            constructor(t, e, n, s, i) {
              super(), this.outletElement = t,
                       this._componentFactoryResolver = e, this._appRef = n,
                       this._defaultInjector = s, this.attachDomPortal = t => {
                         const e = t.element,
                               n = this._document.createComment("dom-portal");
                         e.parentNode.insertBefore(n, e),
                             this.outletElement.appendChild(e),
                             super.setDisposeFn(
                                 () => {n.parentNode &&
                                        n.parentNode.replaceChild(e, n)})
                       }, this._document = i
            }
            attachComponentPortal(t) {
              const e =
                  (t.componentFactoryResolver || this._componentFactoryResolver)
                      .resolveComponentFactory(t.component);
              let n;
              return t.viewContainerRef
                         ? (n = t.viewContainerRef.createComponent(
                                e, t.viewContainerRef.length,
                                t.injector || t.viewContainerRef.injector),
                            this.setDisposeFn(() => n.destroy()))
                         : (n = e.create(t.injector || this._defaultInjector),
                            this._appRef.attachView(n.hostView),
                            this.setDisposeFn(() => {
                              this._appRef.detachView(n.hostView),
                              n.destroy()
                            })),
                     this.outletElement.appendChild(
                         this._getComponentRootNode(n)),
                     n
            }
            attachTemplatePortal(t) {
              let e = t.viewContainerRef,
                  n = e.createEmbeddedView(t.templateRef, t.context);
              return n.rootNodes.forEach(t =>
                                             this.outletElement.appendChild(t)),
                     n.detectChanges(), this.setDisposeFn(() => {
                       let t = e.indexOf(n);
                       -1 !== t && e.remove(t)
                     }),
                     n
            }
            dispose() {
              super.dispose(), null != this.outletElement.parentNode &&
                                   this.outletElement.parentNode.removeChild(
                                       this.outletElement)
            }
            _getComponentRootNode(t) { return t.hostView.rootNodes[0] }
          }
          let cb = (() => {
            class t {} return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({factory : function(e) { return new (e || t) }}),
            t
          })();
          class ub {
            constructor(t, e) {
              this._viewportRuler = t,
              this._previousHTMLStyles = {top : "", left : ""},
              this._isEnabled = !1, this._document = e
            }
            attach() {}
            enable() {
              if (this._canBeEnabled()) {
                const t = this._document.documentElement;
                this._previousScrollPosition =
                    this._viewportRuler.getViewportScrollPosition(),
                this._previousHTMLStyles.left = t.style.left || "",
                this._previousHTMLStyles.top = t.style.top || "",
                t.style.left = gg(-this._previousScrollPosition.left),
                t.style.top = gg(-this._previousScrollPosition.top),
                t.classList.add("cdk-global-scrollblock"), this._isEnabled = !0
              }
            }
            disable() {
              if (this._isEnabled) {
                const t = this._document.documentElement, e = t.style,
                      n = this._document.body.style, s = e.scrollBehavior || "",
                      i = n.scrollBehavior || "";
                this._isEnabled = !1, e.left = this._previousHTMLStyles.left,
                e.top = this._previousHTMLStyles.top,
                t.classList.remove("cdk-global-scrollblock"),
                e.scrollBehavior = n.scrollBehavior = "auto",
                window.scroll(this._previousScrollPosition.left,
                              this._previousScrollPosition.top),
                e.scrollBehavior = s, n.scrollBehavior = i
              }
            }
            _canBeEnabled() {
              if (this._document.documentElement.classList.contains(
                      "cdk-global-scrollblock") ||
                  this._isEnabled)
                return !1;
              const t = this._document.body,
                    e = this._viewportRuler.getViewportSize();
              return t.scrollHeight > e.height || t.scrollWidth > e.width
            }
          }
          class hb {
            constructor(t, e, n, s) {
              this._scrollDispatcher = t, this._ngZone = e,
              this._viewportRuler = n, this._config = s,
              this._scrollSubscription = null, this._detach = () => {
                this.disable(),
                    this._overlayRef.hasAttached() &&
                        this._ngZone.run(() => this._overlayRef.detach())
              }
            }
            attach(t) { this._overlayRef = t }
            enable() {
              if (this._scrollSubscription)
                return;
              const t = this._scrollDispatcher.scrolled(0);
              this._config && this._config.threshold &&
                      this._config.threshold > 1
                  ? (this._initialScrollPosition =
                         this._viewportRuler.getViewportScrollPosition().top,
                     this._scrollSubscription = t.subscribe(() => {
                       const t =
                           this._viewportRuler.getViewportScrollPosition().top;
                       Math.abs(t - this._initialScrollPosition) >
                               this._config.threshold
                           ? this._detach()
                           : this._overlayRef.updatePosition()
                     }))
                  : this._scrollSubscription = t.subscribe(this._detach)
            }
            disable() {
              this._scrollSubscription &&
                  (this._scrollSubscription.unsubscribe(),
                   this._scrollSubscription = null)
            }
            detach() { this.disable(), this._overlayRef = null }
          }
          class db {
            enable() {}
            disable() {}
            attach() {}
          }
          function pb(t, e) {
            return e.some(e => t.bottom < e.top || t.top > e.bottom ||
                               t.right < e.left || t.left > e.right)
          }
          function fb(t, e) {
            return e.some(e => t.top < e.top || t.bottom > e.bottom ||
                               t.left < e.left || t.right > e.right)
          }
          class mb {
            constructor(t, e, n, s) {
              this._scrollDispatcher = t, this._viewportRuler = e,
              this._ngZone = n, this._config = s,
              this._scrollSubscription = null
            }
            attach(t) { this._overlayRef = t }
            enable() {
              this._scrollSubscription ||
                  (this._scrollSubscription =
                       this._scrollDispatcher
                           .scrolled(this._config ? this._config.scrollThrottle
                                                  : 0)
                           .subscribe(() => {
                             if (this._overlayRef.updatePosition(),
                                 this._config && this._config.autoClose) {
                               const t = this._overlayRef.overlayElement
                                             .getBoundingClientRect(),
                                     {width : e, height : n} =
                                         this._viewportRuler.getViewportSize();
                               pb(t, [ {
                                    width : e,
                                    height : n,
                                    bottom : n,
                                    right : e,
                                    top : 0,
                                    left : 0
                                  } ]) &&
                                   (this.disable(),
                                    this._ngZone.run(
                                        () => this._overlayRef.detach()))
                             }
                           }))
            }
            disable() {
              this._scrollSubscription &&
                  (this._scrollSubscription.unsubscribe(),
                   this._scrollSubscription = null)
            }
            detach() { this.disable(), this._overlayRef = null }
          }
          let gb = (() => {
            class t {
              constructor(t, e, n, s) {
                this._scrollDispatcher = t, this._viewportRuler = e,
                this._ngZone = n, this.noop = () => new db,
                this.close = t => new hb(this._scrollDispatcher, this._ngZone,
                                         this._viewportRuler, t),
                this.block = () => new ub(this._viewportRuler, this._document),
                this.reposition = t =>
                    new mb(this._scrollDispatcher, this._viewportRuler,
                           this._ngZone, t),
                this._document = s
              }
            } return t.\u0275fac =
                function(
                    e) { return new (e || t)(Zt(tb), Zt(eb), Zt(Fl), Zt(pc)) },
            t.\u0275prov = ht({
              factory :
                  function() { return new t(Zt(tb), Zt(eb), Zt(Fl), Zt(pc)) },
              token : t,
              providedIn : "root"
            }),
            t
          })();
          class yb {
            constructor(t) {
              if (this.scrollStrategy = new db, this.panelClass = "",
                  this.hasBackdrop = !1,
                  this.backdropClass = "cdk-overlay-dark-backdrop",
                  this.disposeOnNavigation = !1, t) {
                const e = Object.keys(t);
                for (const n of e)
                  void 0 !== t[n] && (this[n] = t[n])
              }
            }
          }
          class _b {
            constructor(t, e, n, s, i) {
              this.offsetX = n, this.offsetY = s, this.panelClass = i,
              this.originX = t.originX, this.originY = t.originY,
              this.overlayX = e.overlayX, this.overlayY = e.overlayY
            }
          }
          class vb {
            constructor(t, e) {
              this.connectionPair = t, this.scrollableViewProperties = e
            }
          }
          let bb = (() => {
            class t {
              constructor(t) { this._attachedOverlays = [], this._document = t }
              ngOnDestroy() { this.detach() }
              add(t) { this.remove(t), this._attachedOverlays.push(t) }
              remove(t) {
                const e = this._attachedOverlays.indexOf(t);
                e > -1 && this._attachedOverlays.splice(e, 1),
                    0 === this._attachedOverlays.length && this.detach()
              }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(pc)) },
            t.\u0275prov = ht({
              factory : function() { return new t(Zt(pc)) },
              token : t,
              providedIn : "root"
            }),
            t
          })(),
              wb = (() => {
                class t extends bb {
                  constructor(t) {
                    super(t), this._keydownListener = t => {
                      const e = this._attachedOverlays;
                      for (let n = e.length - 1; n > -1; n--)
                        if (e[n]._keydownEvents.observers.length > 0) {
                          e[n]._keydownEvents.next(t);
                          break
                        }
                    }
                  }
                  add(t) {
                    super.add(t), this._isAttached ||
                                      (this._document.body.addEventListener(
                                           "keydown", this._keydownListener),
                                       this._isAttached = !0)
                  }
                  detach() {
                    this._isAttached &&
                        (this._document.body.removeEventListener(
                             "keydown", this._keydownListener),
                         this._isAttached = !1)
                  }
                } return t.\u0275fac =
                                    function(e) { return new (e || t)(Zt(pc)) },
                                t.\u0275prov = ht({
                                  factory : function() { return new t(Zt(pc)) },
                                  token : t,
                                  providedIn : "root"
                                }),
                                t
              })(),
              xb = (() => {
                class t extends
                    bb {
                      constructor(t, e) {
                        super(t),
                            this._platform = e, this._cursorStyleIsSet = !1,
                            this._clickListener = t => {
                              const e = t.composedPath ? t.composedPath()[0]
                                                       : t.target,
                                    n = this._attachedOverlays.slice();
                              for (let s = n.length - 1; s > -1; s--) {
                                const i = n[s];
                                if (!(i._outsidePointerEvents.observers.length <
                                      1) &&
                                    i.hasAttached()) {
                                  if (i.overlayElement.contains(e))
                                    break;
                                  i._outsidePointerEvents.next(t)
                                }
                              }
                            }
                      }
                      add(t) {
                        super.add(t),
                            this._isAttached ||
                                (this._document.body.addEventListener(
                                     "click", this._clickListener, !0),
                                 this._document.body.addEventListener(
                                     "contextmenu", this._clickListener, !0),
                                 this._platform.IOS &&
                                     !this._cursorStyleIsSet &&
                                     (this._cursorOriginalValue =
                                          this._document.body.style.cursor,
                                      this._document.body.style.cursor =
                                          "pointer",
                                      this._cursorStyleIsSet = !0),
                                 this._isAttached = !0)
                      }
                      detach() {
                        this._isAttached &&
                            (this._document.body.removeEventListener(
                                 "click", this._clickListener, !0),
                             this._document.body.removeEventListener(
                                 "contextmenu", this._clickListener, !0),
                             this._platform.IOS && this._cursorStyleIsSet &&
                                 (this._document.body.style.cursor =
                                      this._cursorOriginalValue,
                                  this._cursorStyleIsSet = !1),
                             this._isAttached = !1)
                      }
                    } return t.\u0275fac =
                        function(e) { return new (e || t)(Zt(pc), Zt(cg)) },
                    t.\u0275prov = ht({
                      factory : function() { return new t(Zt(pc), Zt(cg)) },
                      token : t,
                      providedIn : "root"
                    }),
                    t
              })();
          const Sb = !("undefined" == typeof window || !window ||
                       !window.__karma__ && !window.jasmine);
          let Eb = (() => {
            class t {
              constructor(t, e) { this._platform = e, this._document = t }
              ngOnDestroy() {
                const t = this._containerElement;
                t && t.parentNode && t.parentNode.removeChild(t)
              }
              getContainerElement() {
                return this._containerElement || this._createContainer(),
                       this._containerElement
              }
              _createContainer() {
                const t = this._platform ? this._platform.isBrowser
                                         : "undefined" != typeof window,
                      e = "cdk-overlay-container";
                if (t || Sb) {
                  const t = this._document.querySelectorAll(
                      `.${e}[platform="server"], .${e}[platform="test"]`);
                  for (let e = 0; e < t.length; e++)
                    t[e].parentNode.removeChild(t[e])
                }
                const n = this._document.createElement("div");
                n.classList.add(e),
                    Sb ? n.setAttribute("platform", "test")
                       : t || n.setAttribute("platform", "server"),
                    this._document.body.appendChild(n),
                    this._containerElement = n
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(pc), Zt(cg)) },
            t.\u0275prov = ht({
              factory : function() { return new t(Zt(pc), Zt(cg)) },
              token : t,
              providedIn : "root"
            }),
            t
          })();
          class Cb {
            constructor(t, e, n, s, i, r, o, a, l) {
              this._portalOutlet = t, this._host = e, this._pane = n,
              this._config = s, this._ngZone = i, this._keyboardDispatcher = r,
              this._document = o, this._location = a,
              this._outsideClickDispatcher = l, this._backdropElement = null,
              this._backdropClick = new S, this._attachments = new S,
              this._detachments = new S, this._locationChanges = h.EMPTY,
              this._backdropClickHandler = t => this._backdropClick.next(t),
              this._keydownEvents = new S, this._outsidePointerEvents = new S,
              s.scrollStrategy && (this._scrollStrategy = s.scrollStrategy,
                                   this._scrollStrategy.attach(this)),
              this._positionStrategy = s.positionStrategy
            }
            get overlayElement() { return this._pane }
            get backdropElement() { return this._backdropElement }
            get hostElement() { return this._host }
            attach(t) {
              let e = this._portalOutlet.attach(t);
              return !this._host.parentElement && this._previousHostParent &&
                         this._previousHostParent.appendChild(this._host),
                     this._positionStrategy &&
                         this._positionStrategy.attach(this),
                     this._updateStackingOrder(), this._updateElementSize(),
                     this._updateElementDirection(),
                     this._scrollStrategy && this._scrollStrategy.enable(),
                     this._ngZone.onStable.pipe(oh(1)).subscribe(
                         () => {this.hasAttached() && this.updatePosition()}),
                     this._togglePointerEvents(!0),
                     this._config.hasBackdrop && this._attachBackdrop(),
                     this._config.panelClass &&
                         this._toggleClasses(this._pane,
                                             this._config.panelClass, !0),
                     this._attachments.next(),
                     this._keyboardDispatcher.add(this),
                     this._config.disposeOnNavigation && this._location &&
                         (this._locationChanges =
                              this._location.subscribe(() => this.dispose())),
                     this._outsideClickDispatcher &&
                         this._outsideClickDispatcher.add(this),
                     e
            }
            detach() {
              if (!this.hasAttached())
                return;
              this.detachBackdrop(), this._togglePointerEvents(!1),
                  this._positionStrategy && this._positionStrategy.detach &&
                      this._positionStrategy.detach(),
                  this._scrollStrategy && this._scrollStrategy.disable();
              const t = this._portalOutlet.detach();
              return this._detachments.next(),
                     this._keyboardDispatcher.remove(this),
                     this._detachContentWhenStable(),
                     this._locationChanges.unsubscribe(),
                     this._outsideClickDispatcher &&
                         this._outsideClickDispatcher.remove(this),
                     t
            }
            dispose() {
              const t = this.hasAttached();
              this._positionStrategy && this._positionStrategy.dispose(),
                  this._disposeScrollStrategy(), this.detachBackdrop(),
                  this._locationChanges.unsubscribe(),
                  this._keyboardDispatcher.remove(this),
                  this._portalOutlet.dispose(), this._attachments.complete(),
                  this._backdropClick.complete(),
                  this._keydownEvents.complete(),
                  this._outsidePointerEvents.complete(),
                  this._outsideClickDispatcher &&
                      this._outsideClickDispatcher.remove(this),
                  this._host && this._host.parentNode &&
                      (this._host.parentNode.removeChild(this._host),
                       this._host = null),
                  this._previousHostParent = this._pane = null,
                  t && this._detachments.next(), this._detachments.complete()
            }
            hasAttached() { return this._portalOutlet.hasAttached() }
            backdropClick() { return this._backdropClick }
            attachments() { return this._attachments }
            detachments() { return this._detachments }
            keydownEvents() { return this._keydownEvents }
            outsidePointerEvents() { return this._outsidePointerEvents }
            getConfig() { return this._config }
            updatePosition() {
              this._positionStrategy && this._positionStrategy.apply()
            }
            updatePositionStrategy(t) {
              t !== this._positionStrategy &&
                  (this._positionStrategy && this._positionStrategy.dispose(),
                   this._positionStrategy = t,
                   this.hasAttached() &&
                       (t.attach(this), this.updatePosition()))
            }
            updateSize(t) {
              this._config = Object.assign(Object.assign({}, this._config), t),
              this._updateElementSize()
            }
            setDirection(t) {
              this._config = Object.assign(Object.assign({}, this._config),
                                           {direction : t}),
              this._updateElementDirection()
            }
            addPanelClass(t) {
              this._pane && this._toggleClasses(this._pane, t, !0)
            }
            removePanelClass(t) {
              this._pane && this._toggleClasses(this._pane, t, !1)
            }
            getDirection() {
              const t = this._config.direction;
              return t ? "string" == typeof t ? t : t.value : "ltr"
            }
            updateScrollStrategy(t) {
              t !== this._scrollStrategy &&
                  (this._disposeScrollStrategy(), this._scrollStrategy = t,
                   this.hasAttached() && (t.attach(this), t.enable()))
            }
            _updateElementDirection() {
              this._host.setAttribute("dir", this.getDirection())
            }
            _updateElementSize() {
              if (!this._pane)
                return;
              const t = this._pane.style;
              t.width = gg(this._config.width),
              t.height = gg(this._config.height),
              t.minWidth = gg(this._config.minWidth),
              t.minHeight = gg(this._config.minHeight),
              t.maxWidth = gg(this._config.maxWidth),
              t.maxHeight = gg(this._config.maxHeight)
            }
            _togglePointerEvents(t) {
              this._pane.style.pointerEvents = t ? "auto" : "none"
            }
            _attachBackdrop() {
              const t = "cdk-overlay-backdrop-showing";
              this._backdropElement = this._document.createElement("div"),
              this._backdropElement.classList.add("cdk-overlay-backdrop"),
              this._config.backdropClass &&
                  this._toggleClasses(this._backdropElement,
                                      this._config.backdropClass, !0),
              this._host.parentElement.insertBefore(this._backdropElement,
                                                    this._host),
              this._backdropElement.addEventListener(
                  "click", this._backdropClickHandler),
              "undefined" != typeof requestAnimationFrame
                  ? this._ngZone.runOutsideAngular(
                        () => {requestAnimationFrame(
                            () => {this._backdropElement &&
                                   this._backdropElement.classList.add(t)})})
                  : this._backdropElement.classList.add(t)
            }
            _updateStackingOrder() {
              this._host.nextSibling &&
                  this._host.parentNode.appendChild(this._host)
            }
            detachBackdrop() {
              let t, e = this._backdropElement;
              if (!e)
                return;
              let n = () => {
                e &&
                    (e.removeEventListener("click", this._backdropClickHandler),
                     e.removeEventListener("transitionend", n),
                     e.parentNode && e.parentNode.removeChild(e)),
                    this._backdropElement == e &&
                        (this._backdropElement = null),
                    this._config.backdropClass &&
                        this._toggleClasses(e, this._config.backdropClass, !1),
                    clearTimeout(t)
              };
              e.classList.remove("cdk-overlay-backdrop-showing"),
                  this._ngZone.runOutsideAngular(
                      () => {e.addEventListener("transitionend", n)}),
                  e.style.pointerEvents = "none",
                  t = this._ngZone.runOutsideAngular(() => setTimeout(n, 500))
            }
            _toggleClasses(t, e, n) {
              const s = t.classList;
              mg(e).forEach(t => {t && (n ? s.add(t) : s.remove(t))})
            }
            _detachContentWhenStable() {
              this._ngZone.runOutsideAngular(
                  () => {
                      const t =
                          this._ngZone.onStable
                              .pipe(vf(q(this._attachments, this._detachments)))
                              .subscribe(
                                  () => {
                                      this._pane && this._host &&
                                          0 !== this._pane.children.length ||
                                      (this._pane && this._config.panelClass &&
                                           this._toggleClasses(
                                               this._pane,
                                               this._config.panelClass, !1),
                                       this._host && this._host.parentElement &&
                                           (this._previousHostParent =
                                                this._host.parentElement,
                                            this._previousHostParent
                                                .removeChild(this._host)),
                                       t.unsubscribe())})})
            }
            _disposeScrollStrategy() {
              const t = this._scrollStrategy;
              t && (t.disable(), t.detach && t.detach())
            }
          }
          const kb = "cdk-overlay-connected-position-bounding-box",
                Tb = /([A-Za-z%]+)$/;
          class Ab {
            constructor(t, e, n, s, i) {
              this._viewportRuler = e, this._document = n, this._platform = s,
              this._overlayContainer = i,
              this._lastBoundingBoxSize = {width : 0, height : 0},
              this._isPushed = !1, this._canPush = !0, this._growAfterOpen = !1,
              this._hasFlexibleDimensions = !0, this._positionLocked = !1,
              this._viewportMargin = 0, this._scrollables = [],
              this._preferredPositions = [], this._positionChanges = new S,
              this._resizeSubscription = h.EMPTY, this._offsetX = 0,
              this._offsetY = 0, this._appliedPanelClasses = [],
              this.positionChanges = this._positionChanges, this.setOrigin(t)
            }
            get positions() { return this._preferredPositions }
            attach(t) {
              this._validatePositions(), t.hostElement.classList.add(kb),
                  this._overlayRef = t, this._boundingBox = t.hostElement,
                  this._pane = t.overlayElement, this._isDisposed = !1,
                  this._isInitialRender = !0, this._lastPosition = null,
                  this._resizeSubscription.unsubscribe(),
                  this._resizeSubscription =
                      this._viewportRuler.change().subscribe(
                          () => {this._isInitialRender = !0, this.apply()})
            }
            apply() {
              if (this._isDisposed || !this._platform.isBrowser)
                return;
              if (!this._isInitialRender && this._positionLocked &&
                  this._lastPosition)
                return void this.reapplyLastPosition();
              this._clearPanelClasses(), this._resetOverlayElementStyles(),
                  this._resetBoundingBoxStyles(),
                  this._viewportRect = this._getNarrowedViewportRect(),
                  this._originRect = this._getOriginRect(),
                  this._overlayRect = this._pane.getBoundingClientRect();
              const t = this._originRect, e = this._overlayRect,
                    n = this._viewportRect, s = [];
              let i;
              for (let r of this._preferredPositions) {
                let o = this._getOriginPoint(t, r),
                    a = this._getOverlayPoint(o, e, r),
                    l = this._getOverlayFit(a, e, n, r);
                if (l.isCompletelyWithinViewport)
                  return this._isPushed = !1, void this._applyPosition(r, o);
                this._canFitWithFlexibleDimensions(l, a, n)
                    ? s.push({
                        position : r,
                        origin : o,
                        overlayRect : e,
                        boundingBoxRect : this._calculateBoundingBoxRect(o, r)
                      })
                    : (!i || i.overlayFit.visibleArea < l.visibleArea) && (i = {
                        overlayFit : l,
                        overlayPoint : a,
                        originPoint : o,
                        position : r,
                        overlayRect : e
                      })
              }
              if (s.length) {
                let t = null, e = -1;
                for (const n of s) {
                  const s = n.boundingBoxRect.width * n.boundingBoxRect.height *
                            (n.position.weight || 1);
                  s > e && (e = s, t = n)
                }
                return this._isPushed = !1,
                       void this._applyPosition(t.position, t.origin)
              }
              if (this._canPush)
                return this._isPushed = !0,
                       void this._applyPosition(i.position, i.originPoint);
              this._applyPosition(i.position, i.originPoint)
            }
            detach() {
              this._clearPanelClasses(), this._lastPosition = null,
                                         this._previousPushAmount = null,
                                         this._resizeSubscription.unsubscribe()
            }
            dispose() {
              this._isDisposed ||
                  (this._boundingBox && Ib(this._boundingBox.style, {
                     top : "",
                     left : "",
                     right : "",
                     bottom : "",
                     height : "",
                     width : "",
                     alignItems : "",
                     justifyContent : ""
                   }),
                   this._pane && this._resetOverlayElementStyles(),
                   this._overlayRef &&
                       this._overlayRef.hostElement.classList.remove(kb),
                   this.detach(), this._positionChanges.complete(),
                   this._overlayRef = this._boundingBox = null,
                   this._isDisposed = !0)
            }
            reapplyLastPosition() {
              if (!this._isDisposed &&
                  (!this._platform || this._platform.isBrowser)) {
                this._originRect = this._getOriginRect(),
                this._overlayRect = this._pane.getBoundingClientRect(),
                this._viewportRect = this._getNarrowedViewportRect();
                const t = this._lastPosition || this._preferredPositions[0],
                      e = this._getOriginPoint(this._originRect, t);
                this._applyPosition(t, e)
              }
            }
            withScrollableContainers(t) { return this._scrollables = t, this }
            withPositions(t) {
              return this._preferredPositions = t,
                     -1 === t.indexOf(this._lastPosition) &&
                         (this._lastPosition = null),
                     this._validatePositions(), this
            }
            withViewportMargin(t) { return this._viewportMargin = t, this }
            withFlexibleDimensions(t = !0) {
              return this._hasFlexibleDimensions = t, this
            }
            withGrowAfterOpen(t = !0) { return this._growAfterOpen = t, this }
            withPush(t = !0) { return this._canPush = t, this }
            withLockedPosition(t = !0) { return this._positionLocked = t, this }
            setOrigin(t) { return this._origin = t, this }
            withDefaultOffsetX(t) { return this._offsetX = t, this }
            withDefaultOffsetY(t) { return this._offsetY = t, this }
            withTransformOriginOn(t) {
              return this._transformOriginSelector = t, this
            }
            _getOriginPoint(t, e) {
              let n, s;
              if ("center" == e.originX)
                n = t.left + t.width / 2;
              else {
                const s = this._isRtl() ? t.right : t.left,
                      i = this._isRtl() ? t.left : t.right;
                n = "start" == e.originX ? s : i
              }
              return s = "center" == e.originY
                             ? t.top + t.height / 2
                             : "top" == e.originY ? t.top : t.bottom,
              {
                x: n, y: s
              }
            }
            _getOverlayPoint(t, e, n) {
              let s, i;
              return s = "center" == n.overlayX
                             ? -e.width / 2
                             : "start" === n.overlayX
                                   ? this._isRtl() ? -e.width : 0
                                   : this._isRtl() ? 0 : -e.width,
                     i = "center" == n.overlayY
                             ? -e.height / 2
                             : "top" == n.overlayY ? 0 : -e.height,
              {
                x: t.x + s, y: t.y + i
              }
            }
            _getOverlayFit(t, e, n, s) {
              let {x : i, y : r} = t, o = this._getOffset(s, "x"),
                              a = this._getOffset(s, "y");
              o && (i += o), a && (r += a);
              let l = 0 - r, c = r + e.height - n.height,
                  u = this._subtractOverflows(e.width, 0 - i,
                                              i + e.width - n.width),
                  h = this._subtractOverflows(e.height, l, c), d = u * h;
              return {
                visibleArea: d,
                    isCompletelyWithinViewport: e.width * e.height === d,
                    fitsInViewportVertically: h === e.height,
                    fitsInViewportHorizontally: u == e.width
              }
            }
            _canFitWithFlexibleDimensions(t, e, n) {
              if (this._hasFlexibleDimensions) {
                const s = n.bottom - e.y, i = n.right - e.x,
                      r = Rb(this._overlayRef.getConfig().minHeight),
                      o = Rb(this._overlayRef.getConfig().minWidth),
                      a = t.fitsInViewportHorizontally || null != o && o <= i;
                return (t.fitsInViewportVertically || null != r && r <= s) && a
              }
              return !1
            }
            _pushOverlayOnScreen(t, e, n) {
              if (this._previousPushAmount && this._positionLocked)
                return {
                  x : t.x + this._previousPushAmount.x,
                  y : t.y + this._previousPushAmount.y
                };
              const s = this._viewportRect,
                    i = Math.max(t.x + e.width - s.width, 0),
                    r = Math.max(t.y + e.height - s.height, 0),
                    o = Math.max(s.top - n.top - t.y, 0),
                    a = Math.max(s.left - n.left - t.x, 0);
              let l = 0, c = 0;
              return l = e.width <= s.width ? a || -i
                                            : t.x < this._viewportMargin
                                                  ? s.left - n.left - t.x
                                                  : 0,
                     c = e.height <= s.height
                             ? o || -r
                             : t.y < this._viewportMargin ? s.top - n.top - t.y
                                                          : 0,
                     this._previousPushAmount = {x : l, y : c}, {
                x: t.x + l, y: t.y + c
              }
            }
            _applyPosition(t, e) {
              if (this._setTransformOrigin(t),
                  this._setOverlayElementStyles(e, t),
                  this._setBoundingBoxStyles(e, t),
                  t.panelClass && this._addPanelClasses(t.panelClass),
                  this._lastPosition = t,
                  this._positionChanges.observers.length) {
                const e = this._getScrollVisibility(), n = new vb(t, e);
                this._positionChanges.next(n)
              }
              this._isInitialRender = !1
            }
            _setTransformOrigin(t) {
              if (!this._transformOriginSelector)
                return;
              const e = this._boundingBox.querySelectorAll(
                  this._transformOriginSelector);
              let n, s = t.overlayY;
              n = "center" === t.overlayX
                      ? "center"
                      : this._isRtl()
                            ? "start" === t.overlayX ? "right" : "left"
                            : "start" === t.overlayX ? "left" : "right";
              for (let i = 0; i < e.length; i++)
                e[i].style.transformOrigin = `${n} ${s}`
            }
            _calculateBoundingBoxRect(t, e) {
              const n = this._viewportRect, s = this._isRtl();
              let i, r, o, a, l, c;
              if ("top" === e.overlayY)
                r = t.y, i = n.height - r + this._viewportMargin;
              else if ("bottom" === e.overlayY)
                o = n.height - t.y + 2 * this._viewportMargin,
                i = n.height - o + this._viewportMargin;
              else {
                const e = Math.min(n.bottom - t.y + n.top, t.y),
                      s = this._lastBoundingBoxSize.height;
                i = 2 * e, r = t.y - e,
                i > s && !this._isInitialRender && !this._growAfterOpen &&
                    (r = t.y - s / 2)
              }
              if ("end" === e.overlayX && !s || "start" === e.overlayX && s)
                c = n.width - t.x + this._viewportMargin,
                a = t.x - this._viewportMargin;
              else if ("start" === e.overlayX && !s ||
                       "end" === e.overlayX && s)
                l = t.x, a = n.right - t.x;
              else {
                const e = Math.min(n.right - t.x + n.left, t.x),
                      s = this._lastBoundingBoxSize.width;
                a = 2 * e, l = t.x - e,
                a > s && !this._isInitialRender && !this._growAfterOpen &&
                    (l = t.x - s / 2)
              }
              return {
                top: r, left: l, bottom: o, right: c, width: a, height: i
              }
            }
            _setBoundingBoxStyles(t, e) {
              const n = this._calculateBoundingBoxRect(t, e);
              this._isInitialRender || this._growAfterOpen ||
                  (n.height =
                       Math.min(n.height, this._lastBoundingBoxSize.height),
                   n.width =
                       Math.min(n.width, this._lastBoundingBoxSize.width));
              const s = {};
              if (this._hasExactPosition())
                s.top = s.left = "0",
                s.bottom = s.right = s.maxHeight = s.maxWidth = "",
                s.width = s.height = "100%";
              else {
                const t = this._overlayRef.getConfig().maxHeight,
                      i = this._overlayRef.getConfig().maxWidth;
                s.height = gg(n.height), s.top = gg(n.top),
                s.bottom = gg(n.bottom), s.width = gg(n.width),
                s.left = gg(n.left), s.right = gg(n.right),
                s.alignItems =
                    "center" === e.overlayX
                        ? "center"
                        : "end" === e.overlayX ? "flex-end" : "flex-start",
                s.justifyContent =
                    "center" === e.overlayY
                        ? "center"
                        : "bottom" === e.overlayY ? "flex-end" : "flex-start",
                t && (s.maxHeight = gg(t)), i && (s.maxWidth = gg(i))
              }
              this._lastBoundingBoxSize = n, Ib(this._boundingBox.style, s)
            }
            _resetBoundingBoxStyles() {
              Ib(this._boundingBox.style, {
                top : "0",
                left : "0",
                right : "0",
                bottom : "0",
                height : "",
                width : "",
                alignItems : "",
                justifyContent : ""
              })
            }
            _resetOverlayElementStyles() {
              Ib(this._pane.style, {
                top : "",
                left : "",
                bottom : "",
                right : "",
                position : "",
                transform : ""
              })
            }
            _setOverlayElementStyles(t, e) {
              const n = {}, s = this._hasExactPosition(),
                    i = this._hasFlexibleDimensions,
                    r = this._overlayRef.getConfig();
              if (s) {
                const s = this._viewportRuler.getViewportScrollPosition();
                Ib(n, this._getExactOverlayY(e, t, s)),
                    Ib(n, this._getExactOverlayX(e, t, s))
              } else
                n.position = "static";
              let o = "", a = this._getOffset(e, "x"),
                  l = this._getOffset(e, "y");
              a && (o += `translateX(${a}px) `),
                  l && (o += `translateY(${l}px)`),
                  n.transform = o.trim(),
                  r.maxHeight && (s ? n.maxHeight = gg(r.maxHeight)
                                    : i && (n.maxHeight = "")),
                  r.maxWidth && (s ? n.maxWidth = gg(r.maxWidth)
                                   : i && (n.maxWidth = "")),
                  Ib(this._pane.style, n)
            }
            _getExactOverlayY(t, e, n) {
              let s = {top : "", bottom : ""},
                  i = this._getOverlayPoint(e, this._overlayRect, t);
              this._isPushed &&
                  (i = this._pushOverlayOnScreen(i, this._overlayRect, n));
              let r = this._overlayContainer.getContainerElement()
                          .getBoundingClientRect()
                          .top;
              return i.y -= r,
                     "bottom" === t.overlayY
                         ? s.bottom =
                               this._document.documentElement.clientHeight -
                               (i.y + this._overlayRect.height) + "px"
                         : s.top = gg(i.y),
                           s
            }
            _getExactOverlayX(t, e, n) {
              let s, i = {left : "", right : ""},
                     r = this._getOverlayPoint(e, this._overlayRect, t);
              return this._isPushed && (r = this._pushOverlayOnScreen(
                                            r, this._overlayRect, n)),
                     s = this._isRtl()
                             ? "end" === t.overlayX ? "left" : "right"
                             : "end" === t.overlayX ? "right" : "left",
                     "right" === s
                         ? i.right =
                               this._document.documentElement.clientWidth -
                               (r.x + this._overlayRect.width) + "px"
                         : i.left = gg(r.x),
                     i
            }
            _getScrollVisibility() {
              const t = this._getOriginRect(),
                    e = this._pane.getBoundingClientRect(),
                    n = this._scrollables.map(
                        t => t.getElementRef()
                                 .nativeElement.getBoundingClientRect());
              return {
                isOriginClipped: fb(t, n), isOriginOutsideView: pb(t, n),
                    isOverlayClipped: fb(e, n), isOverlayOutsideView: pb(e, n)
              }
            }
            _subtractOverflows(t, ...e) {
              return e.reduce((t, e) => t - Math.max(e, 0), t)
            }
            _getNarrowedViewportRect() {
              const t = this._document.documentElement.clientWidth,
                    e = this._document.documentElement.clientHeight,
                    n = this._viewportRuler.getViewportScrollPosition();
              return {
                top: n.top + this._viewportMargin,
                    left: n.left + this._viewportMargin,
                    right: n.left + t - this._viewportMargin,
                    bottom: n.top + e - this._viewportMargin,
                    width: t - 2 * this._viewportMargin,
                    height: e - 2 * this._viewportMargin
              }
            }
            _isRtl() { return "rtl" === this._overlayRef.getDirection() }
            _hasExactPosition() {
              return !this._hasFlexibleDimensions || this._isPushed
            }
            _getOffset(t, e) {
              return "x" === e ? null == t.offsetX ? this._offsetX : t.offsetX
                               : null == t.offsetY ? this._offsetY : t.offsetY
            }
            _validatePositions() {}
            _addPanelClasses(t) {
              this._pane &&
                  mg(t).forEach(
                      t => {"" !== t &&
                            -1 === this._appliedPanelClasses.indexOf(t) &&
                            (this._appliedPanelClasses.push(t),
                             this._pane.classList.add(t))})
            }
            _clearPanelClasses() {
              this._pane && (this._appliedPanelClasses.forEach(
                                 t => {this._pane.classList.remove(t)}),
                             this._appliedPanelClasses = [])
            }
            _getOriginRect() {
              const t = this._origin;
              if (t instanceof aa)
                return t.nativeElement.getBoundingClientRect();
              if (t instanceof Element)
                return t.getBoundingClientRect();
              const e = t.width || 0, n = t.height || 0;
              return {
                top: t.y, bottom: t.y + n, left: t.x, right: t.x + e, height: n,
                    width: e
              }
            }
          }
          function Ib(t, e) {
            for (let n in e)
              e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
          }
          function Rb(t) {
            if ("number" != typeof t && null != t) {
              const [e, n] = t.split(Tb);
              return n && "px" !== n ? null : parseFloat(e)
            }
            return t || null
          }
          class Ob {
            constructor(t, e, n, s, i, r, o) {
              this._preferredPositions = [],
              this._positionStrategy = new Ab(n, s, i, r, o)
                                           .withFlexibleDimensions(!1)
                                           .withPush(!1)
                                           .withViewportMargin(0),
              this.withFallbackPosition(t, e),
              this.onPositionChange = this._positionStrategy.positionChanges
            }
            get positions() { return this._preferredPositions }
            attach(t) {
              this._overlayRef = t, this._positionStrategy.attach(t),
              this._direction &&
                  (t.setDirection(this._direction), this._direction = null)
            }
            dispose() { this._positionStrategy.dispose() }
            detach() { this._positionStrategy.detach() }
            apply() { this._positionStrategy.apply() }
            recalculateLastPosition() {
              this._positionStrategy.reapplyLastPosition()
            }
            withScrollableContainers(t) {
              this._positionStrategy.withScrollableContainers(t)
            }
            withFallbackPosition(t, e, n, s) {
              const i = new _b(t, e, n, s);
              return this._preferredPositions.push(i),
                     this._positionStrategy.withPositions(
                         this._preferredPositions),
                     this
            }
            withDirection(t) {
              return this._overlayRef ? this._overlayRef.setDirection(t)
                                      : this._direction = t,
                                        this
            }
            withOffsetX(t) {
              return this._positionStrategy.withDefaultOffsetX(t), this
            }
            withOffsetY(t) {
              return this._positionStrategy.withDefaultOffsetY(t), this
            }
            withLockedPosition(t) {
              return this._positionStrategy.withLockedPosition(t), this
            }
            withPositions(t) {
              return this._preferredPositions = t.slice(),
                     this._positionStrategy.withPositions(
                         this._preferredPositions),
                     this
            }
            setOrigin(t) { return this._positionStrategy.setOrigin(t), this }
          }
          const Pb = "cdk-global-overlay-wrapper";
          class Lb {
            constructor() {
              this._cssPosition = "static", this._topOffset = "",
              this._bottomOffset = "", this._leftOffset = "",
              this._rightOffset = "", this._alignItems = "",
              this._justifyContent = "", this._width = "", this._height = ""
            }
            attach(t) {
              const e = t.getConfig();
              this._overlayRef = t,
              this._width && !e.width && t.updateSize({width : this._width}),
              this._height && !e.height &&
                  t.updateSize({height : this._height}),
              t.hostElement.classList.add(Pb), this._isDisposed = !1
            }
            top(t = "") {
              return this._bottomOffset = "", this._topOffset = t,
                     this._alignItems = "flex-start", this
            }
            left(t = "") {
              return this._rightOffset = "", this._leftOffset = t,
                     this._justifyContent = "flex-start", this
            }
            bottom(t = "") {
              return this._topOffset = "", this._bottomOffset = t,
                     this._alignItems = "flex-end", this
            }
            right(t = "") {
              return this._leftOffset = "", this._rightOffset = t,
                     this._justifyContent = "flex-end", this
            }
            width(t = "") {
              return this._overlayRef ? this._overlayRef.updateSize({width : t})
                                      : this._width = t,
                                        this
            }
            height(t = "") {
              return this._overlayRef
                         ? this._overlayRef.updateSize({height : t})
                         : this._height = t,
                           this
            }
            centerHorizontally(t = "") {
              return this.left(t), this._justifyContent = "center", this
            }
            centerVertically(t = "") {
              return this.top(t), this._alignItems = "center", this
            }
            apply() {
              if (!this._overlayRef || !this._overlayRef.hasAttached())
                return;
              const t = this._overlayRef.overlayElement.style,
                    e = this._overlayRef.hostElement.style,
                    n = this._overlayRef.getConfig(),
                    {width : s, height : i, maxWidth : r, maxHeight : o} = n,
                    a = !("100%" !== s && "100vw" !== s ||
                          r && "100%" !== r && "100vw" !== r),
                    l = !("100%" !== i && "100vh" !== i ||
                          o && "100%" !== o && "100vh" !== o);
              t.position = this._cssPosition,
              t.marginLeft = a ? "0" : this._leftOffset,
              t.marginTop = l ? "0" : this._topOffset,
              t.marginBottom = this._bottomOffset,
              t.marginRight = this._rightOffset,
              a ? e.justifyContent = "flex-start"
                : "center" === this._justifyContent
                      ? e.justifyContent = "center"
                      : "rtl" === this._overlayRef.getConfig().direction
                            ? "flex-start" === this._justifyContent
                                  ? e.justifyContent = "flex-end"
                                  : "flex-end" === this._justifyContent &&
                                        (e.justifyContent = "flex-start")
                            : e.justifyContent = this._justifyContent,
              e.alignItems = l ? "flex-start" : this._alignItems
            }
            dispose() {
              if (this._isDisposed || !this._overlayRef)
                return;
              const t = this._overlayRef.overlayElement.style,
                    e = this._overlayRef.hostElement, n = e.style;
              e.classList.remove(Pb),
                  n.justifyContent = n.alignItems = t.marginTop =
                      t.marginBottom = t.marginLeft = t.marginRight =
                          t.position = "",
                  this._overlayRef = null, this._isDisposed = !0
            }
          }
          let Db = (() => {
            class t {
              constructor(t, e, n, s) {
                this._viewportRuler = t, this._document = e, this._platform = n,
                this._overlayContainer = s
              }
              global() { return new Lb }
              connectedTo(t, e, n) {
                return new Ob(e, n, t, this._viewportRuler, this._document,
                              this._platform, this._overlayContainer)
              }
              flexibleConnectedTo(t) {
                return new Ab(t, this._viewportRuler, this._document,
                              this._platform, this._overlayContainer)
              }
            } return t.\u0275fac =
                function(
                    e) { return new (e || t)(Zt(eb), Zt(pc), Zt(cg), Zt(Eb)) },
            t.\u0275prov = ht({
              factory :
                  function() { return new t(Zt(eb), Zt(pc), Zt(cg), Zt(Eb)) },
              token : t,
              providedIn : "root"
            }),
            t
          })(),
              Nb = 0,
              Fb = (() => {
                class t {
                  constructor(t, e, n, s, i, r, o, a, l, c, u) {
                    this.scrollStrategies = t, this._overlayContainer = e,
                    this._componentFactoryResolver = n,
                    this._positionBuilder = s, this._keyboardDispatcher = i,
                    this._injector = r, this._ngZone = o, this._document = a,
                    this._directionality = l, this._location = c,
                    this._outsideClickDispatcher = u
                  }
                  create(t) {
                    const e = this._createHostElement(),
                          n = this._createPaneElement(e),
                          s = this._createPortalOutlet(n), i = new yb(t);
                    return i.direction =
                               i.direction || this._directionality.value,
                           new Cb(s, e, n, i, this._ngZone,
                                  this._keyboardDispatcher, this._document,
                                  this._location, this._outsideClickDispatcher)
                  }
                  position() { return this._positionBuilder }
                  _createPaneElement(t) {
                    const e = this._document.createElement("div");
                    return e.id = "cdk-overlay-" + Nb++,
                           e.classList.add("cdk-overlay-pane"),
                           t.appendChild(e), e
                  }
                  _createHostElement() {
                    const t = this._document.createElement("div");
                    return this._overlayContainer.getContainerElement()
                               .appendChild(t),
                           t
                  }
                  _createPortalOutlet(t) {
                    return this._appRef ||
                               (this._appRef = this._injector.get(ec)),
                           new lb(t, this._componentFactoryResolver,
                                  this._appRef, this._injector, this._document)
                  }
                } return t.\u0275fac =
                    function(e) {
                      return new (e || t)(Zt(gb), Zt(Eb), Zt(oa), Zt(Db),
                                          Zt(wb), Zt(so), Zt(Fl), Zt(pc),
                                          Zt(hm), Zt(Ac), Zt(xb))
                    },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
          const Mb = {
            provide : new Vt("cdk-connected-overlay-scroll-strategy"),
            deps : [ Fb ],
            useFactory : function(
                t) { return () => t.scrollStrategies.reposition() }
          };
          let jb = (() => {
            class t {} return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t) },
              providers : [ Fb, Mb ],
              imports : [ [ dm, cb, sb ], sb ]
            }),
            t
          })();
          class Vb {
            constructor(t) { this.total = t }
            call(t, e) { return e.subscribe(new Bb(t, this.total)) }
          }
          class Bb extends f {
            constructor(t, e) { super(t), this.total = e, this.count = 0 }
            _next(t) { ++this.count > this.total && this.destination.next(t) }
          }
          const Hb = new Set;
          let Ub,
              zb = (() => {
                class t {
                  constructor(t) {
                    this._platform = t,
                    this._matchMedia =
                        this._platform.isBrowser && window.matchMedia
                            ? window.matchMedia.bind(window)
                            : $b
                  }
                  matchMedia(t) {
                    return this._platform.WEBKIT && function(t) {
                      if (!Hb.has(t))
                        try {
                          Ub || (Ub = document.createElement("style"),
                                 Ub.setAttribute("type", "text/css"),
                                 document.head.appendChild(Ub)),
                              Ub.sheet &&
                                  (Ub.sheet.insertRule(
                                       `@media ${t} {.fx-query-test{ }}`, 0),
                                   Hb.add(t))
                        } catch (e) {
                          console.error(e)
                        }
                    }(t), this._matchMedia(t)
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(cg)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(cg)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
          function $b(t) {
            return {
              matches: "all" === t || "" === t, media: t,
                  addListener: () => {}, removeListener: () => {}
            }
          }
          let qb = (() => {
            class t {
              constructor(t, e) {
                this._mediaMatcher = t, this._zone = e, this._queries = new Map,
                this._destroySubject = new S
              }
              ngOnDestroy() {
                this._destroySubject.next(), this._destroySubject.complete()
              }
              isMatched(t) {
                return Wb(mg(t)).some(t => this._registerQuery(t).mql.matches)
              }
              observe(t) {
                let e =
                    Nu(Wb(mg(t)).map(t => this._registerQuery(t).observable));
                return e = ch(e.pipe(oh(1)),
                              e.pipe(t => t.lift(new Vb(1)),
                                     function(t, e = mf) {
                                       return n => n.lift(new gf(t, e))
                                     }(0))),
                       e.pipe(k(t => {
                         const e = {matches : !1, breakpoints : {}};
                         return t.forEach(({matches : t, query : n}) => {
                           e.matches = e.matches || t,
                           e.breakpoints[n] = t
                         }),
                                e
                       }))
              }
              _registerQuery(t) {
                if (this._queries.has(t))
                  return this._queries.get(t);
                const e = this._mediaMatcher.matchMedia(t), n = {
                  observable : new _(t => {
                                 const n = e => this._zone.run(() => t.next(e));
                                 return e.addListener(n),
                                        () => { e.removeListener(n) }
                               })
                                   .pipe(uh(e),
                                         k(({matches : e}) =>
                                               ({query : t, matches : e})),
                                         vf(this._destroySubject)),
                  mql : e
                };
                return this._queries.set(t, n), n
              }
            } return t.\u0275fac =
                function(e) { return new (e || t)(Zt(zb), Zt(Fl)) },
            t.\u0275prov = ht({
              factory : function() { return new t(Zt(zb), Zt(Fl)) },
              token : t,
              providedIn : "root"
            }),
            t
          })();
          function Wb(t) {
            return t.map(t => t.split(","))
                .reduce((t, e) => t.concat(e))
                .map(t => t.trim())
          }
          const Gb = {
            tooltipState : Bg(
                "state",
                [
                  $g("initial, void, hidden",
                     zg({opacity : 0, transform : "scale(0)"})),
                  $g("visible", zg({transform : "scale(1)"})),
                  Wg("* => visible",
                     Hg("200ms cubic-bezier(0, 0, 0.2, 1)", qg([
                          zg({opacity : 0, transform : "scale(0)", offset : 0}),
                          zg({
                            opacity : .5,
                            transform : "scale(0.99)",
                            offset : .5
                          }),
                          zg({opacity : 1, transform : "scale(1)", offset : 1})
                        ]))),
                  Wg("* => hidden",
                     Hg("100ms cubic-bezier(0, 0, 0.2, 1)", zg({opacity : 0})))
                ])
          },
                Qb = hg({passive : !0}),
                Kb = new Vt("mat-tooltip-scroll-strategy"), Zb = {
                  provide : Kb,
                  deps : [ Fb ],
                  useFactory : function(t) {
                    return () => t.scrollStrategies.reposition(
                               {scrollThrottle : 20})
                  }
                },
                Yb = new Vt("mat-tooltip-default-options", {
                  providedIn : "root",
                  factory : function() {
                    return {
                      showDelay: 0, hideDelay: 0, touchendHideDelay: 1500
                    }
                  }
                });
          let Xb = (() => {
            class t {
              constructor(t, e, n, s, i, r, o, a, l, c, u) {
                this._overlay = t, this._elementRef = e,
                this._scrollDispatcher = n, this._viewContainerRef = s,
                this._ngZone = i, this._platform = r, this._ariaDescriber = o,
                this._focusMonitor = a, this._dir = c, this._defaultOptions = u,
                this._position = "below", this._disabled = !1,
                this._viewInitialized = !1,
                this._pointerExitEventsInitialized = !1,
                this.showDelay = this._defaultOptions.showDelay,
                this.hideDelay = this._defaultOptions.hideDelay,
                this.touchGestures = "auto", this._message = "",
                this._passiveListeners = [], this._destroyed = new S,
                this._handleKeydown =
                    t => {
                      this._isTooltipVisible() && 27 === t.keyCode && !dg(t) &&
                          (t.preventDefault(), t.stopPropagation(),
                           this._ngZone.run(() => this.hide(0)))
                    },
                this._scrollStrategy = l,
                u &&
                    (u.position && (this.position = u.position),
                     u.touchGestures && (this.touchGestures = u.touchGestures)),
                i.runOutsideAngular(() => {e.nativeElement.addEventListener(
                                        "keydown", this._handleKeydown)})
              }
              get position() { return this._position }
              set position(t) {
                t !== this._position &&
                    (this._position = t,
                     this._overlayRef && (this._updatePosition(),
                                          this._tooltipInstance &&
                                              this._tooltipInstance.show(0),
                                          this._overlayRef.updatePosition()))
              }
              get disabled() { return this._disabled }
              set disabled(t) {
                this._disabled = pg(t),
                this._disabled ? this.hide(0)
                               : this._setupPointerEnterEventsIfNeeded()
              }
              get message() { return this._message }
              set message(t) {
                this._ariaDescriber.removeDescription(
                    this._elementRef.nativeElement, this._message),
                    this._message = null != t ? ("" + t).trim() : "",
                    !this._message && this._isTooltipVisible()
                        ? this.hide(0)
                        : (this._setupPointerEnterEventsIfNeeded(),
                           this._updateTooltipMessage(),
                           this._ngZone.runOutsideAngular(
                               () => {Promise.resolve().then(
                                   () => {this._ariaDescriber.describe(
                                       this._elementRef.nativeElement,
                                       this.message)})}))
              }
              get tooltipClass() { return this._tooltipClass }
              set tooltipClass(t) {
                this._tooltipClass = t,
                this._tooltipInstance &&
                    this._setTooltipClass(this._tooltipClass)
              }
              ngAfterViewInit() {
                this._viewInitialized = !0,
                this._setupPointerEnterEventsIfNeeded(),
                this._focusMonitor.monitor(this._elementRef)
                    .pipe(vf(this._destroyed))
                    .subscribe(t => {t ? "keyboard" === t &&
                                             this._ngZone.run(() => this.show())
                                       : this._ngZone.run(() => this.hide(0))})
              }
              ngOnDestroy() {
                const t = this._elementRef.nativeElement;
                clearTimeout(this._touchstartTimeout),
                    this._overlayRef && (this._overlayRef.dispose(),
                                         this._tooltipInstance = null),
                    t.removeEventListener("keydown", this._handleKeydown),
                    this._passiveListeners.forEach(
                        ([ e, n ]) => {t.removeEventListener(e, n, Qb)}),
                    this._passiveListeners.length = 0, this._destroyed.next(),
                    this._destroyed.complete(),
                    this._ariaDescriber.removeDescription(t, this.message),
                    this._focusMonitor.stopMonitoring(t)
              }
              show(t = this.showDelay) {
                if (this.disabled || !this.message ||
                    this._isTooltipVisible() &&
                        !this._tooltipInstance._showTimeoutId &&
                        !this._tooltipInstance._hideTimeoutId)
                  return;
                const e = this._createOverlay();
                this._detach(),
                    this._portal =
                        this._portal || new rb(Jb, this._viewContainerRef),
                    this._tooltipInstance = e.attach(this._portal).instance,
                    this._tooltipInstance.afterHidden()
                        .pipe(vf(this._destroyed))
                        .subscribe(() => this._detach()),
                    this._setTooltipClass(this._tooltipClass),
                    this._updateTooltipMessage(), this._tooltipInstance.show(t)
              }
              hide(t = this.hideDelay) {
                this._tooltipInstance && this._tooltipInstance.hide(t)
              }
              toggle() { this._isTooltipVisible() ? this.hide() : this.show() }
              _isTooltipVisible() {
                return !!this._tooltipInstance &&
                       this._tooltipInstance.isVisible()
              }
              _createOverlay() {
                if (this._overlayRef)
                  return this._overlayRef;
                const t = this._scrollDispatcher.getAncestorScrollContainers(
                    this._elementRef),
                      e = this._overlay.position()
                              .flexibleConnectedTo(this._elementRef)
                              .withTransformOriginOn(".mat-tooltip")
                              .withFlexibleDimensions(!1)
                              .withViewportMargin(8)
                              .withScrollableContainers(t);
                return e.positionChanges.pipe(vf(this._destroyed))
                           .subscribe(
                               t => {this._tooltipInstance &&
                                     t.scrollableViewProperties
                                         .isOverlayClipped &&
                                     this._tooltipInstance.isVisible() &&
                                     this._ngZone.run(() => this.hide(0))}),
                       this._overlayRef = this._overlay.create({
                         direction : this._dir,
                         positionStrategy : e,
                         panelClass : "mat-tooltip-panel",
                         scrollStrategy : this._scrollStrategy()
                       }),
                       this._updatePosition(),
                       this._overlayRef.detachments()
                           .pipe(vf(this._destroyed))
                           .subscribe(() => this._detach()),
                       this._overlayRef
              }
              _detach() {
                this._overlayRef && this._overlayRef.hasAttached() &&
                    this._overlayRef.detach(),
                    this._tooltipInstance = null
              }
              _updatePosition() {
                const t = this._overlayRef.getConfig().positionStrategy,
                      e = this._getOrigin(), n = this._getOverlayPosition();
                t.withPositions([
                  Object.assign(Object.assign({}, e.main), n.main),
                  Object.assign(Object.assign({}, e.fallback), n.fallback)
                ])
              }
              _getOrigin() {
                const t = !this._dir || "ltr" == this._dir.value,
                      e = this.position;
                let n;
                "above" == e || "below" == e
                    ? n = {
                        originX : "center",
                        originY : "above" == e ? "top" : "bottom"
                      }
                    : "before" == e || "left" == e &&t || "right" == e &&!t
                          ? n = {originX : "start", originY : "center"}
                          : ("after" == e || "right" == e && t ||
                             "left" == e && !t) &&
                                (n = {originX : "end", originY : "center"});
                const {x : s, y : i} =
                    this._invertPosition(n.originX, n.originY);
                return { main: n, fallback: {originX: s, originY: i} }
              }
              _getOverlayPosition() {
                const t = !this._dir || "ltr" == this._dir.value,
                      e = this.position;
                let n;
                "above" == e
                    ? n = {overlayX : "center", overlayY : "bottom"}
                    : "below" == e
                          ? n = {overlayX : "center", overlayY : "top"}
                          : "before" == e || "left" == e &&t ||
                                    "right" == e &&!t
                                ? n = {overlayX : "end", overlayY : "center"}
                                : ("after" == e || "right" == e && t ||
                                   "left" == e && !t) &&
                                      (n = {
                                        overlayX : "start",
                                        overlayY : "center"
                                      });
                const {x : s, y : i} =
                    this._invertPosition(n.overlayX, n.overlayY);
                return { main: n, fallback: {overlayX: s, overlayY: i} }
              }
              _updateTooltipMessage() {
                this._tooltipInstance &&
                    (this._tooltipInstance.message = this.message,
                     this._tooltipInstance._markForCheck(),
                     this._ngZone.onMicrotaskEmpty
                         .pipe(oh(1), vf(this._destroyed))
                         .subscribe(() => {this._tooltipInstance &&
                                           this._overlayRef.updatePosition()}))
              }
              _setTooltipClass(t) {
                this._tooltipInstance &&
                    (this._tooltipInstance.tooltipClass = t,
                     this._tooltipInstance._markForCheck())
              }
              _invertPosition(t, e) {
                return "above" === this.position || "below" === this.position
                           ? "top" === e ? e = "bottom"
                                         : "bottom" === e && (e = "top")
                           : "end" === t ? t = "start"
                                         : "start" === t && (t = "end"),
                {
                  x: t, y: e
                }
              }
              _setupPointerEnterEventsIfNeeded() {
                !this._disabled && this.message && this._viewInitialized &&
                    !this._passiveListeners.length &&
                    (this._platformSupportsMouseEvents()
                         ? this._passiveListeners.push([
                             "mouseenter", () => {
                               this._setupPointerExitEventsIfNeeded(),
                               this.show()
                             }
                           ])
                         : "off" !== this.touchGestures &&
                               (this._disableNativeGesturesIfNecessary(),
                                this._passiveListeners.push([
                                  "touchstart", () => {
                                    this._setupPointerExitEventsIfNeeded(),
                                    clearTimeout(this._touchstartTimeout),
                                    this._touchstartTimeout =
                                        setTimeout(() => this.show(), 500)
                                  }
                                ])),
                     this._addListeners(this._passiveListeners))
              }
              _setupPointerExitEventsIfNeeded() {
                if (this._pointerExitEventsInitialized)
                  return;
                this._pointerExitEventsInitialized = !0;
                const t = [];
                if (this._platformSupportsMouseEvents())
                  t.push([ "mouseleave", () => this.hide() ]);
                else if ("off" !== this.touchGestures) {
                  this._disableNativeGesturesIfNecessary();
                  const e = () => {
                    clearTimeout(this._touchstartTimeout),
                        this.hide(this._defaultOptions.touchendHideDelay)
                  };
                  t.push([ "touchend", e ], [ "touchcancel", e ])
                }
                this._addListeners(t), this._passiveListeners.push(...t)
              }
              _addListeners(t) {
                t.forEach(([ t, e ]) => {
                              this._elementRef.nativeElement.addEventListener(
                                  t, e, Qb)})
              }
              _platformSupportsMouseEvents() {
                return !this._platform.IOS && !this._platform.ANDROID
              }
              _disableNativeGesturesIfNecessary() {
                const t = this.touchGestures;
                if ("off" !== t) {
                  const e = this._elementRef.nativeElement, n = e.style;
                  ("on" === t ||
                   "INPUT" !== e.nodeName && "TEXTAREA" !== e.nodeName) &&
                      (n.userSelect = n.msUserSelect = n.webkitUserSelect =
                           n.MozUserSelect = "none"),
                      "on" !== t && e.draggable || (n.webkitUserDrag = "none"),
                      n.touchAction = "none",
                      n.webkitTapHighlightColor = "transparent"
                }
              }
            } return t.\u0275fac =
                function(e) {
                  return new (e || t)(So(Fb), So(aa), So(tb), So(La), So(Fl),
                                      So(cg), So(kg), So(Rg), So(Kb), So(hm, 8),
                                      So(Yb, 8))
                },
            t.\u0275dir = we({
              type : t,
              selectors : [ [ "", "matTooltip", "" ] ],
              hostAttrs : [ 1, "mat-tooltip-trigger" ],
              inputs : {
                showDelay : [ "matTooltipShowDelay", "showDelay" ],
                hideDelay : [ "matTooltipHideDelay", "hideDelay" ],
                touchGestures : [ "matTooltipTouchGestures", "touchGestures" ],
                position : [ "matTooltipPosition", "position" ],
                disabled : [ "matTooltipDisabled", "disabled" ],
                message : [ "matTooltip", "message" ],
                tooltipClass : [ "matTooltipClass", "tooltipClass" ]
              },
              exportAs : [ "matTooltip" ]
            }),
            t
          })(),
              Jb = (() => {
                class t {
                  constructor(t, e) {
                    this._changeDetectorRef = t, this._breakpointObserver = e,
                    this._visibility = "initial", this._closeOnInteraction = !1,
                    this._onHide = new S,
                    this._isHandset = this._breakpointObserver.observe(
                        "(max-width: 599.99px) and (orientation: portrait), (max-width: 959.99px) and (orientation: landscape)")
                  }
                  show(t) {
                    this._hideTimeoutId && (clearTimeout(this._hideTimeoutId),
                                            this._hideTimeoutId = null),
                        this._closeOnInteraction = !0,
                        this._showTimeoutId = setTimeout(() => {
                          this._visibility = "visible",
                          this._showTimeoutId = null,
                          this._markForCheck()
                        },
                                                         t)
                  }
                  hide(t) {
                    this._showTimeoutId && (clearTimeout(this._showTimeoutId),
                                            this._showTimeoutId = null),
                        this._hideTimeoutId = setTimeout(() => {
                          this._visibility = "hidden",
                          this._hideTimeoutId = null,
                          this._markForCheck()
                        },
                                                         t)
                  }
                  afterHidden() { return this._onHide }
                  isVisible() { return "visible" === this._visibility }
                  ngOnDestroy() { this._onHide.complete() }
                  _animationStart() { this._closeOnInteraction = !1 }
                  _animationDone(t) {
                    const e = t.toState;
                    "hidden" !== e || this.isVisible() || this._onHide.next(),
                        "visible" !== e && "hidden" !== e ||
                            (this._closeOnInteraction = !0)
                  }
                  _handleBodyInteraction() {
                    this._closeOnInteraction && this.hide(0)
                  }
                  _markForCheck() { this._changeDetectorRef.markForCheck() }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(So(Br), So(qb)) },
                t.\u0275cmp = me({
                  type : t,
                  selectors : [ [ "mat-tooltip-component" ] ],
                  hostAttrs : [ "aria-hidden", "true" ],
                  hostVars : 2,
                  hostBindings : function(t, e) {
                    1&t &&
                        Po("click",
                           (function() { return e._handleBodyInteraction() }),
                           !1, Gn),
                        2&t &&
                            Vo("zoom", "visible" === e._visibility ? 1 : null)
                  },
                  decls : 3,
                  vars : 7,
                  consts : [ [ 1, "mat-tooltip", 3, "ngClass" ] ],
                  template : function(t, e) {
                    var n;
                    1&t &&
                        (To(0, "div", 0),
                         Po("@state.start",
                            (function() { return e._animationStart() }))(
                             "@state.done",
                             (function(t) { return e._animationDone(t) })),
                         function(t, e) {
                           const n = rn();
                           let s;
                           n.firstCreatePass
                               ? (s =
                                      function(t, e) {
                                        if (e)
                                          for (let n = e.length - 1; n >= 0;
                                               n--) {
                                            const s = e[n];
                                            if (t === s.name)
                                              return s
                                          }
                                        throw new Error(
                                            "The pipe 'async' could not be found!")
                                      }("async", n.pipeRegistry),
                                  n.data[21] = s,
                                  s.onDestroy &&
                                      (n.destroyHooks || (n.destroyHooks = []))
                                          .push(21, s.onDestroy))
                               : s = n.data[21];
                           const i = s.factory || (s.factory = Ee(s.type)),
                                 r = Qt(So), o = Zn(!1), a = i();
                           Zn(o), Qt(r), function(t, e, n, s) {
                             21 >= t.data.length &&
                                 (t.data[21] = null, t.blueprint[21] = null),
                                 e[21] = s
                           }(n, sn(), 0, a)
                         }(),
                         Wo(2), Ao()),
                        2&t && (Bo("mat-tooltip-handset",
                                   null == (n =
                                                function(t, e, n) {
                                                  const s = sn(),
                                                        i = function(t, e) {
                                                          return t[e + ke]
                                                        }(s, t);
                                                  return function(t,e){return mo.isWrapped(e)&&(e=mo.unwrap(e),t[en.lFrame.bindingIndex]=ui),e}(s,function(t,e){return t[1].data[e+ke].pure}(s,t)?function(t,e,n,s,i,r){const o=e+n;return vo(t,o,i)?_o(t,o+1,r?s.call(r,i):s(i)):Ja(t,o+1)}(s,dn(),e,i.transform,n,i):i.transform(n))
                                                }(1, 5, e._isHandset))
                                       ? null
                                       : n.matches),
                                Co("ngClass", e.tooltipClass)("@state",
                                                              e._visibility),
                                mi(2), Go(e.message))
                  },
                  directives : [ Dc ],
                  pipes : [ Wc ],
                  styles : [
                    ".mat-tooltip-panel{pointer-events:none !important}.mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}\n"
                  ],
                  encapsulation : 2,
                  data : {animation : [ Gb.tooltipState ]},
                  changeDetection : 0
                }),
                t
              })(),
              tw = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  providers : [ Zb ],
                  imports : [ [ Fg, Gc, jb, Cv ], Cv, nb ]
                }),
                t
              })();
          const ew = new Vt("NgValueAccessor"), nw = [ "sliderWrapper" ],
                sw = hg({passive : !1}),
                iw = {provide : ew, useExisting : Et(() => lw), multi : !0};
          class rw {}
          class ow {
            constructor(t) { this._elementRef = t }
          }
          const aw = Iv(Tv(kv(ow), "accent"));
          let lw = (() => {
            class t extends
                aw {
                  constructor(t, e, n, s, i, r, o, a) {
                    super(t),
                        this._focusMonitor = e, this._changeDetectorRef = n,
                        this._dir = s, this._ngZone = r,
                        this._animationMode = a, this._invert = !1,
                        this._max = 100, this._min = 0, this._step = 1,
                        this._thumbLabel = !1, this._tickInterval = 0,
                        this._value = null, this._vertical = !1,
                        this.change = new tl, this.input = new tl,
                        this.valueChange = new tl, this.onTouched = () => {},
                        this._percent = 0, this._isSliding = !1,
                        this._isActive = !1, this._tickIntervalPercent = 0,
                        this._sliderDimensions = null,
                        this._controlValueAccessorChangeFn = () => {},
                        this._dirChangeSubscription = h.EMPTY,
                        this._pointerDown =
                            t => {
                              this.disabled || this._isSliding ||
                                  !cw(t) && 0 !== t.button ||
                                  this._ngZone.run(() => {
                                    const e = this.value, n = uw(t);
                                    this._isSliding = !0,
                                    this._lastPointerEvent = t,
                                    t.preventDefault(),
                                    this._focusHostElement(),
                                    this._onMouseenter(),
                                    this._bindGlobalEvents(t),
                                    this._focusHostElement(),
                                    this._updateValueFromPosition(n),
                                    this._valueOnSlideStart = e,
                                    e != this.value && this._emitInputEvent()
                                  })
                            },
                        this._pointerMove =
                            t => {
                              if (this._isSliding) {
                                t.preventDefault();
                                const e = this.value;
                                this._lastPointerEvent = t,
                                this._updateValueFromPosition(uw(t)),
                                e != this.value && this._emitInputEvent()
                              }
                            },
                        this._pointerUp =
                            t => {
                              this._isSliding &&
                                  (t.preventDefault(),
                                   this._removeGlobalEvents(),
                                   this._isSliding = !1,
                                   this._valueOnSlideStart == this.value ||
                                       this.disabled || this._emitChangeEvent(),
                                   this._valueOnSlideStart =
                                       this._lastPointerEvent = null)
                            },
                        this._windowBlur =
                            () => {
                              this._lastPointerEvent &&
                                  this._pointerUp(this._lastPointerEvent)
                            },
                        this._document = o, this.tabIndex = parseInt(i) || 0,
                        r.runOutsideAngular(() => {
                          const e = t.nativeElement;
                          e.addEventListener("mousedown", this._pointerDown,
                                             sw),
                              e.addEventListener("touchstart",
                                                 this._pointerDown, sw)
                        })
                  }
                  get invert() { return this._invert }
                  set invert(t) { this._invert = pg(t) }
                  get max() { return this._max }
                  set max(t) {
                    this._max = fg(t, this._max),
                    this._percent = this._calculatePercentage(this._value),
                    this._changeDetectorRef.markForCheck()
                  }
                  get min() { return this._min }
                  set min(t) {
                    this._min = fg(t, this._min),
                    null === this._value && (this.value = this._min),
                    this._percent = this._calculatePercentage(this._value),
                    this._changeDetectorRef.markForCheck()
                  }
                  get step() { return this._step }
                  set step(t) {
                    this._step = fg(t, this._step),
                    this._step % 1 != 0 &&
                        (this._roundToDecimal =
                             this._step.toString().split(".").pop().length),
                    this._changeDetectorRef.markForCheck()
                  }
                  get thumbLabel() { return this._thumbLabel }
                  set thumbLabel(t) { this._thumbLabel = pg(t) }
                  get tickInterval() { return this._tickInterval }
                  set tickInterval(t) {
                    this._tickInterval =
                        "auto" === t
                            ? "auto"
                            : "number" == typeof t || "string" == typeof t
                                  ? fg(t, this._tickInterval)
                                  : 0
                  }
                  get value() {
                    return null === this._value && (this.value = this._min),
                           this._value
                  }
                  set value(t) {
                    if (t !== this._value) {
                      let e = fg(t);
                      this._roundToDecimal &&
                          (e = parseFloat(e.toFixed(this._roundToDecimal))),
                          this._value = e,
                          this._percent =
                              this._calculatePercentage(this._value),
                          this._changeDetectorRef.markForCheck()
                    }
                  }
                  get vertical() { return this._vertical }
                  set vertical(t) { this._vertical = pg(t) }
                  get displayValue() {
                    return this.displayWith
                               ? this.displayWith(this.value)
                               : this._roundToDecimal && this.value &&
                                         this.value % 1 != 0
                                     ? this.value.toFixed(this._roundToDecimal)
                                     : this.value || 0
                  }
                  focus(t) { this._focusHostElement(t) }
                  blur() { this._blurHostElement() }
                  get percent() { return this._clamp(this._percent) }
                  _shouldInvertAxis() {
                    return this.vertical ? !this.invert : this.invert
                  }
                  _isMinValue() { return 0 === this.percent }
                  _getThumbGap() {
                    return this.disabled
                               ? 7
                               : this._isMinValue() && !this.thumbLabel
                                     ? this._isActive ? 10 : 7
                                     : 0
                  }
                  _getTrackBackgroundStyles() {
                    const t = this.vertical ? `1, ${1 - this.percent}, 1`
                                            : 1 - this.percent + ", 1, 1";
                    return {
                      transform: `translate${this.vertical ? "Y" : "X"}(${
                          this._shouldInvertMouseCoords()
                              ? "-"
                              : ""}${this._getThumbGap()}px) scale3d(${t})`
                    }
                  }
                  _getTrackFillStyles() {
                    const t = this.percent,
                          e = this.vertical ? `1, ${t}, 1` : t + ", 1, 1";
                    return {
                      transform: `translate${this.vertical ? "Y" : "X"}(${
                          this._shouldInvertMouseCoords()
                              ? ""
                              : "-"}${this._getThumbGap()}px) scale3d(${e})`,
                          display: 0 === t ? "none" : ""
                    }
                  }
                  _getTicksContainerStyles() {
                    return {
                      transform: `translate${this.vertical ? "Y" : "X"}(${
                          this.vertical || "rtl" != this._getDirection()
                              ? "-"
                              : ""}${this._tickIntervalPercent / 2 * 100}%)`
                    }
                  }
                  _getTicksStyles() {
                    let t = 100 * this._tickIntervalPercent, e = {
                      backgroundSize : this.vertical ? `2px ${t}%`
                                                     : t + "% 2px",
                      transform : `translateZ(0) translate${
                          this.vertical ? "Y" : "X"}(${
                          this.vertical || "rtl" != this._getDirection()
                              ? ""
                              : "-"}${t / 2}%)${
                          this.vertical || "rtl" != this._getDirection()
                              ? ""
                              : " rotate(180deg)"}`
                    };
                    if (this._isMinValue() && this._getThumbGap()) {
                      const t = this._shouldInvertAxis();
                      let n;
                      n = this.vertical ? t ? "Bottom" : "Top"
                                        : t ? "Right" : "Left",
                      e["padding" + n] = this._getThumbGap() + "px"
                    }
                    return e
                  }
                  _getThumbContainerStyles() {
                    const t = this._shouldInvertAxis();
                    return {
                      transform: `translate${this.vertical ? "Y" : "X"}(-${
                          100 *
                          (("rtl" != this._getDirection() || this.vertical ? t
                                                                           : !t)
                               ? this.percent
                               : 1 - this.percent)}%)`
                    }
                  }
                  _shouldInvertMouseCoords() {
                    const t = this._shouldInvertAxis();
                    return "rtl" != this._getDirection() || this.vertical ? t
                                                                          : !t
                  }
                  _getDirection() {
                    return this._dir && "rtl" == this._dir.value ? "rtl" : "ltr"
                  }
                  ngAfterViewInit() {
                    this._focusMonitor.monitor(this._elementRef, !0)
                        .subscribe(t => {
                          this._isActive = !!t && "keyboard" !== t,
                          this._changeDetectorRef.detectChanges()
                        }),
                        this._dir && (this._dirChangeSubscription =
                                          this._dir.change.subscribe(
                                              () => {this._changeDetectorRef
                                                         .markForCheck()}))
                  }
                  ngOnDestroy() {
                    const t = this._elementRef.nativeElement;
                    t.removeEventListener("mousedown", this._pointerDown, sw),
                        t.removeEventListener("touchstart", this._pointerDown,
                                              sw),
                        this._lastPointerEvent = null,
                        this._removeGlobalEvents(),
                        this._focusMonitor.stopMonitoring(this._elementRef),
                        this._dirChangeSubscription.unsubscribe()
                  }
                  _onMouseenter() {
                    this.disabled ||
                        (this._sliderDimensions = this._getSliderDimensions(),
                         this._updateTickIntervalPercent())
                  }
                  _onFocus() {
                    this._sliderDimensions = this._getSliderDimensions(),
                    this._updateTickIntervalPercent()
                  }
                  _onBlur() { this.onTouched() }
                  _onKeydown(t) {
                    if (this.disabled || dg(t))
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
                      return
                    }
                    e != this.value &&
                        (this._emitInputEvent(), this._emitChangeEvent()),
                        this._isSliding = !0, t.preventDefault()
                  }
                  _onKeyup() { this._isSliding = !1 }
                  _getWindow() { return this._document.defaultView || window }
                  _bindGlobalEvents(t) {
                    const e = this._document, n = cw(t),
                          s = n ? "touchend" : "mouseup";
                    e.addEventListener(n ? "touchmove" : "mousemove",
                                       this._pointerMove, sw),
                        e.addEventListener(s, this._pointerUp, sw),
                        n && e.addEventListener("touchcancel", this._pointerUp,
                                                sw);
                    const i = this._getWindow();
                    void 0 !== i && i &&
                        i.addEventListener("blur", this._windowBlur)
                  }
                  _removeGlobalEvents() {
                    const t = this._document;
                    t.removeEventListener("mousemove", this._pointerMove, sw),
                        t.removeEventListener("mouseup", this._pointerUp, sw),
                        t.removeEventListener("touchmove", this._pointerMove,
                                              sw),
                        t.removeEventListener("touchend", this._pointerUp, sw),
                        t.removeEventListener("touchcancel", this._pointerUp,
                                              sw);
                    const e = this._getWindow();
                    void 0 !== e && e &&
                        e.removeEventListener("blur", this._windowBlur)
                  }
                  _increment(t) {
                    this.value = this._clamp((this.value || 0) + this.step * t,
                                             this.min, this.max)
                  }
                  _updateValueFromPosition(t) {
                    if (!this._sliderDimensions)
                      return;
                    let e = this._clamp(
                        ((this.vertical ? t.y : t.x) -
                         (this.vertical ? this._sliderDimensions.top
                                        : this._sliderDimensions.left)) /
                        (this.vertical ? this._sliderDimensions.height
                                       : this._sliderDimensions.width));
                    if (this._shouldInvertMouseCoords() && (e = 1 - e), 0 === e)
                      this.value = this.min;
                    else if (1 === e)
                      this.value = this.max;
                    else {
                      const t = this._calculateValue(e),
                            n = Math.round((t - this.min) / this.step) *
                                    this.step +
                                this.min;
                      this.value = this._clamp(n, this.min, this.max)
                    }
                  }
                  _emitChangeEvent() {
                    this._controlValueAccessorChangeFn(this.value),
                        this.valueChange.emit(this.value),
                        this.change.emit(this._createChangeEvent())
                  }
                  _emitInputEvent() {
                    this.input.emit(this._createChangeEvent())
                  }
                  _updateTickIntervalPercent() {
                    if (this.tickInterval && this._sliderDimensions)
                      if ("auto" == this.tickInterval) {
                        let t = this.vertical ? this._sliderDimensions.height
                                              : this._sliderDimensions.width,
                            e = Math.ceil(
                                30 / (t * this.step / (this.max - this.min)));
                        this._tickIntervalPercent = e * this.step / t
                      } else
                        this._tickIntervalPercent = this.tickInterval *
                                                    this.step /
                                                    (this.max - this.min)
                  }
                  _createChangeEvent(t = this.value) {
                    let e = new rw;
                    return e.source = this, e.value = t, e
                  }
                  _calculatePercentage(t) {
                    return ((t || 0) - this.min) / (this.max - this.min)
                  }
                  _calculateValue(t) {
                    return this.min + t * (this.max - this.min)
                  }
                  _clamp(t, e = 0, n = 1) { return Math.max(e, Math.min(t, n)) }
                  _getSliderDimensions() {
                    return this._sliderWrapper
                               ? this._sliderWrapper.nativeElement
                                     .getBoundingClientRect()
                               : null
                  }
                  _focusHostElement(t) {
                    this._elementRef.nativeElement.focus(t)
                  }
                  _blurHostElement() { this._elementRef.nativeElement.blur() }
                  writeValue(t) { this.value = t }
                  registerOnChange(t) { this._controlValueAccessorChangeFn = t }
                  registerOnTouched(t) { this.onTouched = t }
                  setDisabledState(t) { this.disabled = t }
                } return t.\u0275fac =
                    function(e) {
                      return new (e || t)(So(aa), So(Rg), So(Br), So(hm, 8),
                                          Eo("tabindex"), So(Fl), So(pc),
                                          So(vv, 8))
                    },
                t.\u0275cmp = me({
                  type : t,
                  selectors : [ [ "mat-slider" ] ],
                  viewQuery : function(t, e) {
                    var n;
                    1&t && dl(nw, !0),
                        2&t && hl(n = pl()) && (e._sliderWrapper = n.first)
                  },
                  hostAttrs : [
                    "role", "slider", 1, "mat-slider", "mat-focus-indicator"
                  ],
                  hostVars : 28,
                  hostBindings : function(t, e) {
                    1&t && Po("focus", (function() { return e._onFocus() }))(
                               "blur", (function() { return e._onBlur() }))(
                               "keydown",
                               (function(t) { return e._onKeydown(t) }))(
                               "keyup", (function() { return e._onKeyup() }))(
                               "mouseenter",
                               (function() { return e._onMouseenter() }))(
                               "selectstart",
                               (function(t) { return t.preventDefault() })),
                        2&t && (Ko("tabIndex", e.tabIndex),
                                wo("aria-disabled", e.disabled)("aria-valuemax",
                                                                e.max)(
                                    "aria-valuemin", e.min)("aria-valuenow",
                                                            e.value)(
                                    "aria-orientation",
                                    e.vertical ? "vertical" : "horizontal"),
                                Bo("mat-slider-disabled", e.disabled)(
                                    "mat-slider-has-ticks", e.tickInterval)(
                                    "mat-slider-horizontal",
                                    !e.vertical)("mat-slider-axis-inverted",
                                                 e._shouldInvertAxis())(
                                    "mat-slider-invert-mouse-coords",
                                    e._shouldInvertMouseCoords())(
                                    "mat-slider-sliding", e._isSliding)(
                                    "mat-slider-thumb-label-showing",
                                    e.thumbLabel)("mat-slider-vertical",
                                                  e.vertical)(
                                    "mat-slider-min-value", e._isMinValue())(
                                    "mat-slider-hide-last-tick",
                                    e.disabled || e._isMinValue() &&
                                                      e._getThumbGap() &&
                                                      e._shouldInvertAxis())(
                                    "_mat-animation-noopable",
                                    "NoopAnimations" === e._animationMode))
                  },
                  inputs : {
                    disabled : "disabled",
                    color : "color",
                    tabIndex : "tabIndex",
                    invert : "invert",
                    max : "max",
                    min : "min",
                    value : "value",
                    step : "step",
                    thumbLabel : "thumbLabel",
                    tickInterval : "tickInterval",
                    vertical : "vertical",
                    displayWith : "displayWith"
                  },
                  outputs : {
                    change : "change",
                    input : "input",
                    valueChange : "valueChange"
                  },
                  exportAs : [ "matSlider" ],
                  features : [ sa([ iw ]), ao ],
                  decls : 13,
                  vars : 6,
                  consts : [
                    [ 1, "mat-slider-wrapper" ], [ "sliderWrapper", "" ],
                    [ 1, "mat-slider-track-wrapper" ],
                    [ 1, "mat-slider-track-background", 3, "ngStyle" ],
                    [ 1, "mat-slider-track-fill", 3, "ngStyle" ],
                    [ 1, "mat-slider-ticks-container", 3, "ngStyle" ],
                    [ 1, "mat-slider-ticks", 3, "ngStyle" ],
                    [ 1, "mat-slider-thumb-container", 3, "ngStyle" ],
                    [ 1, "mat-slider-focus-ring" ], [ 1, "mat-slider-thumb" ],
                    [ 1, "mat-slider-thumb-label" ],
                    [ 1, "mat-slider-thumb-label-text" ]
                  ],
                  template : function(t, e) {
                    1&t &&
                        (To(0, "div", 0, 1), To(2, "div", 2), Io(3, "div", 3),
                         Io(4, "div", 4), Ao(), To(5, "div", 5),
                         Io(6, "div", 6), Ao(), To(7, "div", 7),
                         Io(8, "div", 8), Io(9, "div", 9), To(10, "div", 10),
                         To(11, "span", 11), Wo(12), Ao(), Ao(), Ao(), Ao()),
                        2&t &&
                            (mi(3),
                             Co("ngStyle", e._getTrackBackgroundStyles()),
                             mi(1), Co("ngStyle", e._getTrackFillStyles()),
                             mi(1), Co("ngStyle", e._getTicksContainerStyles()),
                             mi(1), Co("ngStyle", e._getTicksStyles()), mi(1),
                             Co("ngStyle", e._getThumbContainerStyles()), mi(5),
                             Go(e.displayValue))
                  },
                  directives : [ Hc ],
                  styles : [
                    '.mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:none;vertical-align:middle}.mat-slider:not(.mat-slider-disabled):active,.mat-slider.mat-slider-sliding:not(.mat-slider-disabled){cursor:-webkit-grabbing;cursor:grabbing}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-track-background{position:absolute;transform-origin:100% 100%;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{background-repeat:repeat;background-clip:content-box;box-sizing:border-box;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-focus-ring{position:absolute;width:30px;height:30px;border-radius:50%;transform:scale(0);opacity:0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider.cdk-keyboard-focused .mat-slider-focus-ring,.mat-slider.cdk-program-focused .mat-slider-focus-ring{transform:scale(1);opacity:1}.mat-slider:not(.mat-slider-disabled):not(.mat-slider-sliding) .mat-slider-thumb-label,.mat-slider:not(.mat-slider-disabled):not(.mat-slider-sliding) .mat-slider-thumb{cursor:-webkit-grab;cursor:grab}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(0.7);transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),border-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),border-radius 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.cdk-high-contrast-active .mat-slider-thumb-label{outline:solid 1px}.mat-slider-thumb-label-text{z-index:1;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-sliding .mat-slider-track-fill,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-thumb-container{transition-duration:0ms}.mat-slider-has-ticks .mat-slider-wrapper::after{content:"";position:absolute;border-width:0;border-style:solid;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-disabled) .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-disabled) .mat-slider-ticks{opacity:1}.mat-slider-thumb-label-showing .mat-slider-focus-ring{display:none}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.mat-slider:not(.mat-slider-disabled).cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.mat-slider:not(.mat-slider-disabled).cdk-focused .mat-slider-thumb-label{border-radius:50% 50% 0}.mat-slider:not(.mat-slider-disabled).cdk-focused .mat-slider-thumb-label-text{opacity:1}.mat-slider:not(.mat-slider-disabled).cdk-mouse-focused .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled).cdk-touch-focused .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled).cdk-program-focused .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-disabled .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(0.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}.cdk-high-contrast-active .mat-slider-horizontal .mat-slider-ticks-container{height:0;outline:solid 2px;top:1px}.mat-slider-horizontal .mat-slider-ticks{height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-focus-ring{top:-15px;right:-15px}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(0.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.cdk-focused .mat-slider-thumb-label{transform:rotate(45deg)}.cdk-high-contrast-active .mat-slider-horizontal.cdk-focused .mat-slider-thumb-label,.cdk-high-contrast-active .mat-slider-horizontal.cdk-focused .mat-slider-thumb-label-text{transform:none}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}.cdk-high-contrast-active .mat-slider-vertical .mat-slider-ticks-container{width:0;outline:solid 2px;left:1px}.mat-slider-vertical .mat-slider-focus-ring{bottom:-15px;left:-15px}.mat-slider-vertical .mat-slider-ticks{width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb{-webkit-backface-visibility:hidden;backface-visibility:hidden}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(0.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.cdk-focused .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%}.mat-slider._mat-animation-noopable .mat-slider-track-fill,.mat-slider._mat-animation-noopable .mat-slider-track-background,.mat-slider._mat-animation-noopable .mat-slider-ticks,.mat-slider._mat-animation-noopable .mat-slider-thumb-container,.mat-slider._mat-animation-noopable .mat-slider-focus-ring,.mat-slider._mat-animation-noopable .mat-slider-thumb,.mat-slider._mat-animation-noopable .mat-slider-thumb-label,.mat-slider._mat-animation-noopable .mat-slider-thumb-label-text,.mat-slider._mat-animation-noopable .mat-slider-has-ticks .mat-slider-wrapper::after{transition:none}\n'
                  ],
                  encapsulation : 2,
                  changeDetection : 0
                }),
                t
          })();
          function cw(t) { return "t" === t.type[0] }
          function uw(t) {
            const e = cw(t) ? t.touches[0] || t.changedTouches[0] : t;
            return { x: e.clientX, y: e.clientY }
          }
          let hw = (() => {
            class t {} return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t) },
              imports : [ [ Gc, Cv ], Cv ]
            }),
            t
          })();
          function dw(t, e, n, s) {
            return new (n || (n = Promise))((function(i, r) {
              function o(t) {
                try {
                  l(s.next(t))
                } catch (e) {
                  r(e)
                }
              }
              function a(t) {
                try {
                  l(s.throw(t))
                } catch (e) {
                  r(e)
                }
              }
              function l(t) {
                var e;
                t.done ? i(t.value)
                       : (e = t.value,
                          e instanceof n ? e : new n((function(t) { t(e) })))
                             .then(o, a)
              }
              l((s = s.apply(t, e || [])).next())
            }))
          }
          class pw {
            constructor(t, e, n = !0) {
              this.key = t, this.value = e,
              this.key = n ? t.replace(/['"]/g, "").trim() : t.trim(),
              this.value = n ? e.replace(/['"]/g, "").trim() : e.trim(),
              this.value = this.value.replace(/;/, "")
            }
          }
          function fw(t) {
            let e = typeof t;
            return "object" === e
                       ? t.constructor === Array
                             ? "array"
                             : t.constructor === Set ? "set" : "object"
                       : e
          }
          function mw(t) {
            const [e, ...n] = t.split(":");
            return new pw(e, n.join(":"))
          }
          function gw(t, e) { return e.key && (t[e.key] = e.value), t }
          let yw = (() => {
            class t extends Nf {
              constructor(t, e, n, s, i, r, o, a, l) {
                super(t, null, e, n),
                    this.sanitizer = s, this.ngStyleInstance = o,
                    this.DIRECTIVE_KEY = "ngStyle",
                    this.ngStyleInstance ||
                        (this.ngStyleInstance = new Hc(t, i, r)),
                    this.init();
                const c = this.nativeElement.getAttribute("style") || "";
                this.fallbackStyles = this.buildStyleMap(c),
                this.isServer = a && Kc(l)
              }
              updateWithValue(t) {
                const e = this.buildStyleMap(t);
                this.ngStyleInstance.ngStyle =
                    Object.assign(Object.assign({}, this.fallbackStyles), e),
                this.isServer && this.applyStyleToElement(e),
                this.ngStyleInstance.ngDoCheck()
              }
              clearStyles() {
                this.ngStyleInstance.ngStyle = this.fallbackStyles,
                this.ngStyleInstance.ngDoCheck()
              }
              buildStyleMap(t) {
                const e = t => this.sanitizer.sanitize(Ys.STYLE, t) || "";
                if (t)
                  switch (fw(t)) {
                  case "string":
                    return bw(function(t, e = ";") {
                      return String(t)
                          .trim()
                          .split(e)
                          .map(t => t.trim())
                          .filter(t => "" !== t)
                    }(t), e);
                  case "array":
                    return bw(t, e);
                  case "set":
                  default:
                    return function(t, e) {
                      let n = [];
                      return "set" === fw(t)
                                 ? t.forEach(t => n.push(t))
                                 : Object.keys(t).forEach(
                                       e => {n.push(`${e}:${t[e]}`)}),
                             function(t, e) {
                               return t.map(mw)
                                   .filter(t => !!t)
                                   .map(t => (e && (t.value = e(t.value)), t))
                                   .reduce(gw, {})
                             }(n, e)
                    }(t, e)
                  }
                return {}
              }
              ngDoCheck() { this.ngStyleInstance.ngDoCheck() }
            } return t.\u0275fac =
                                function(e) {
                                  return new (e || t)(
                                      So(aa), So(im), So(lm), So(Eu), So(Ta),
                                      So(ha), So(Hc, 10), So(If), So(wl))
                                },
                            t.\u0275dir = we({type : t, features : [ ao ]}),
                            t
          })();
          const _w = [
            "ngStyle", "ngStyle.xs", "ngStyle.sm", "ngStyle.md", "ngStyle.lg",
            "ngStyle.xl", "ngStyle.lt-sm", "ngStyle.lt-md", "ngStyle.lt-lg",
            "ngStyle.lt-xl", "ngStyle.gt-xs", "ngStyle.gt-sm", "ngStyle.gt-md",
            "ngStyle.gt-lg"
          ];
          let vw = (() => {
            class t extends yw {
              constructor() { super(...arguments), this.inputs = _w }
            }
            t.\u0275fac = function(n) { return e(n || t) },
            t.\u0275dir = we({
              type : t,
              selectors : [
                [ "", "ngStyle", "" ], [ "", "ngStyle.xs", "" ],
                [ "", "ngStyle.sm", "" ], [ "", "ngStyle.md", "" ],
                [ "", "ngStyle.lg", "" ], [ "", "ngStyle.xl", "" ],
                [ "", "ngStyle.lt-sm", "" ], [ "", "ngStyle.lt-md", "" ],
                [ "", "ngStyle.lt-lg", "" ], [ "", "ngStyle.lt-xl", "" ],
                [ "", "ngStyle.gt-xs", "" ], [ "", "ngStyle.gt-sm", "" ],
                [ "", "ngStyle.gt-md", "" ], [ "", "ngStyle.gt-lg", "" ]
              ],
              inputs : {
                ngStyle : "ngStyle",
                "ngStyle.xs" : "ngStyle.xs",
                "ngStyle.sm" : "ngStyle.sm",
                "ngStyle.md" : "ngStyle.md",
                "ngStyle.lg" : "ngStyle.lg",
                "ngStyle.xl" : "ngStyle.xl",
                "ngStyle.lt-sm" : "ngStyle.lt-sm",
                "ngStyle.lt-md" : "ngStyle.lt-md",
                "ngStyle.lt-lg" : "ngStyle.lt-lg",
                "ngStyle.lt-xl" : "ngStyle.lt-xl",
                "ngStyle.gt-xs" : "ngStyle.gt-xs",
                "ngStyle.gt-sm" : "ngStyle.gt-sm",
                "ngStyle.gt-md" : "ngStyle.gt-md",
                "ngStyle.gt-lg" : "ngStyle.gt-lg"
              },
              features : [ ao ]
            });
            const e = ds(t);
            return t
          })();
          function bw(t, e) {
            return t.map(mw)
                .filter(t => !!t)
                .map(t => (e && (t.value = e(t.value)), t))
                .reduce(gw, {})
          }
          let ww = (() => {
            class t {} return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t) },
              imports : [ [ Ef ] ]
            }),
            t
          })();
          const xw = function() {
            return { visibility: "hidden" }
          };
          function Sw(t, e) {
            if (1 & t && (To(0, "p", 4), Wo(1), Ao()), 2 & t) {
              const t = No().$implicit;
              Co("ngStyle.lt-md", function(t, e, n) {
                const s = dn() + 2, i = sn();
                return i[s] === ui ? _o(i, s, e())
                                   : function(t, e) { return t[e] }(i, s)
              }(0, xw)), mi(1), Go(t.value)
            }
          }
          const Ew = function(t, e, n) {
            return { "width.vh": t, "height.vh": e, "background-color": n }
          };
          function Cw(t, e) {
            if (1 & t && (To(0, "div", 2), xo(1, Sw, 2, 3, "p", 3), Ao()),
                2 & t) {
              const t = e.$implicit, n = No();
              Co("ngStyle.gt-md", Xa(4, Ew, 15 - n.width / n.num.length * 14,
                                     (t.value + 5) / 2, t.color))(
                  "ngStyle.lt-md", Xa(8, Ew, 3 - n.width / n.num.length * 2,
                                      (t.value + 5) / 3, t.color))(
                  "ngStyle.md", Xa(12, Ew, 15 - n.width / n.num.length * 14,
                                   (t.value + 5) / 2, t.color)),
                  mi(1), Co("ngIf", n.num.length < 50)
            }
          }
          let kw = (() => {
            class t {
              constructor() {
                this.num = [], this.nums = [], this.width = 5,
                this.sortStatus = new tl
              }
              ngOnInit() {}
              ngOnChanges(t) {
                t.sort && t.sort.currentValue.status &&
                    new Promise(
                        e => {"bubbleSort" === t.sort.currentValue.sortType &&
                              e(this.bubbleSort())})
                        .finally(() => {
                          this.sortStatus.emit({status : !1}),
                          setTimeout(
                              () => {
                                for (let t = 0; t < this.num.length; t++)
                                  this.changeColor(t, "rgba(78, 216, 96, 0.8)",
                                                   7, !1)
                                      .then()
                              },
                              10)
                        }),
                    t.nums && (this.num = t.nums.currentValue),
                    t.width && (this.width = t.width.currentValue)
              }
              bubbleSort() {
                this.sortStatus.emit({status : !0});
                let t = 0, e = 0;
                for (let n = 1; n < this.num.length; n++)
                  e += n;
                return new Promise(
                    n =>
                        dw(this, void 0, void 0, (function*() {
                             for (let s = 0; s < this.num.length - 1; s++) {
                               for (let i = 0; i < this.num.length - 1 - s; i++)
                                 yield this.time(i).then(
                                     () => {t++, t === e && n()});
                               yield this.changeColor(this.num.length - s - 1,
                                                      "rgba(169, 92, 232, 0.8)",
                                                      5, !1)
                             }
                             yield this.changeColor(
                                 0, "rgba(169, 92, 232, 0.8)", 5, !1)
                           })))
              }
              numberSwap(t, e) {
                return dw(this, void 0, void 0, (function*() {
                            return new Promise(
                                n => {n(setTimeout(() => {
                                  const e = this.num[t + 1];
                                  this.num[t + 1] = this.num[t], this.num[t] = e
                                }, 5 * e * (75 - this.num.length)))})
                          }))
              }
              changeColor(t, e, n, s = !0) {
                return dw(
                    this, void 0, void 0, (function*() {
                      return new Promise(
                          i => {i(setTimeout(() => {
                            this.num[t].color = e,
                            s && (this.num[t + 1].color = e)
                          },
                                             5 * n * (75 - this.num.length)))})
                    }))
              }
              time(t) {
                return dw(
                    this, void 0, void 0, (function*() {
                      return new Promise(
                          e => {setTimeout(
                              () => {e(
                                  this.changeColor(t, "rgba(78, 216, 96, 0.8)",
                                                   1)
                                      .then(
                                          () => {
                                              this.num[t].value >
                                                      this.num[t + 1].value
                                                  ? this.changeColor(
                                                            t,
                                                            "rgba(219, 57, 57, 0.8)",
                                                            2)
                                                        .then(
                                                            () => {
                                                                this.numberSwap(
                                                                        t, 3)
                                                                    .then(
                                                                        () => {
                                                                            this.changeColor(
                                                                                    t,
                                                                                    "rgba(78, 216, 96, 0.8)",
                                                                                    4)
                                                                                .then(
                                                                                    () => {this.changeColor(
                                                                                        t,
                                                                                        "#0097A7",
                                                                                        5)})})})
                                                  : this.changeColor(
                                                        t, "#0097A7", 2)}))},
                              24 * (75 - this.num.length))})
                    }))
              }
            } return t.\u0275fac = function(e) { return new (e || t) },
            t.\u0275cmp = me({
              type : t,
              selectors : [ [ "app-sorting" ] ],
              inputs : {sort : "sort", nums : "nums", width : "width"},
              outputs : {sortStatus : "sortStatus"},
              features : [ Fe ],
              decls : 2,
              vars : 1,
              consts : [
                [
                  "fxLayout", "row", "fxLayoutAlign", "center end",
                  "fxLayoutGap", ".5%"
                ],
                [
                  "style",
                  "text-align: center; color: white; font-size: smaller; border-radius: 1vh",
                  3, "ngStyle.gt-md", "ngStyle.lt-md", "ngStyle.md", 4, "ngFor",
                  "ngForOf"
                ],
                [
                  2, "text-align", "center", "color", "white", "font-size",
                  "smaller", "border-radius", "1vh", 3, "ngStyle.gt-md",
                  "ngStyle.lt-md", "ngStyle.md"
                ],
                [ 3, "ngStyle.lt-md", 4, "ngIf" ], [ 3, "ngStyle.lt-md" ]
              ],
              template : function(t, e) {
                1&t && (To(0, "div", 0), xo(1, Cw, 2, 16, "div", 1), Ao()),
                    2&t && (mi(1), Co("ngForOf", e.num))
              },
              directives : [ wm, Zm, Tm, Fc, vw, jc ],
              styles : [ "" ]
            }),
            t
          })();
          const Tw = function(t, e) {
            return { status: t, sortType: e }
          };
          let Aw = (() => {
            class t {
              constructor(t) {
                this.cdRef = t, this.trigger = !1, this.nums = [],
                this.range = 20, this.disable = !1, this.sortType = "",
                this.sortDisable = !0, this.generateDisable = !1
              }
              ngOnInit() { this.rand(), this.disable = !1 }
              sortTrigger() { this.trigger = !0 }
              sortTypeChange(t) {
                this.sortType = t, this.sortDisable = !1, this.disable = !0
              }
              change(t) { this.range = Number(t.value), this.rand() }
              rand() {
                this.nums = [];
                for (let t = 0; t <= this.range + 4; t++) {
                  const t = 149 * Math.random() + 1;
                  this.nums.push({value : Math.round(t), color : "#0097A7"})
                }
              }
              buttonDisable(t) {
                this.trigger = !1,
                this.disable = this.sortDisable = this.generateDisable =
                    t.status,
                this.cdRef.detectChanges()
              }
            } return t.\u0275fac = function(e) { return new (e || t)(So(Br)) },
            t.\u0275cmp = me({
              type : t,
              selectors : [ [ "app-main" ] ],
              decls : 16,
              vars : 15,
              consts : [
                [ "fxFill", "", "fxLayout", "column" ],
                [
                  "fxLayout", "row", "fxLayoutAlign", "start center", 2,
                  "background-color", "#757575", 3, "fxFlex.gt-md",
                  "fxFlex.lt-sm"
                ],
                [
                  "fxFlex", "50%", "fxLayout.gt-sm", "row", "fxLayout.lt-sm",
                  "column", "fxLayout.sm", "column", "fxLayoutAlign",
                  "space-evenly center", "fxLayoutGap.gt-sm", ".5%",
                  "fxLayoutGap.lt-sm", ".1%", "fxLayoutGap.sm", ".1%"
                ],
                [
                  "color", "accent", "mat-stroked-button", "", "name",
                  "generate", 3, "disabled", "click"
                ],
                [
                  "matTooltip", "Select one sorting method", 3,
                  "matTooltipDisabled"
                ],
                [
                  "color", "accent", "mat-stroked-button", "", "name", "sort",
                  3, "disabled", "click"
                ],
                [ 2, "color", "#69f0ae" ],
                [
                  "max", "100", "min", "1", "value", "20", 3, "disabled",
                  "input"
                ],
                [ "fxFlex", "50%" ],
                [
                  "fxFlex", "100%", "fxLayoutAlign", "center center", 3,
                  "fxFlex.gt-md", "fxFlex.lt-sm"
                ],
                [ 3, "nums", "sort", "width", "sortStatus" ]
              ],
              template : function(t, e) {
                var n, s, i, r, o;
                1&t &&
                    (To(0, "div", 0), To(1, "div", 1), To(2, "div", 2),
                     To(3, "button", 3),
                     Po("click", (function() { return e.rand() })),
                     Wo(4, " Generate new array "), Ao(), To(5, "div", 4),
                     To(6, "button", 5),
                     Po("click", (function() { return e.sortTrigger() })),
                     Wo(7, " Sort "), Ao(), Ao(), To(8, "div", 6),
                     Wo(9, "Array size"), Ao(), To(10, "mat-slider", 7),
                     Po("input", (function(t) { return e.change(t) })), Ao(),
                     Ao(), To(11, "div", 8), To(12, "button", 5),
                     Po("click",
                        (function() { return e.sortTypeChange("bubbleSort") })),
                     Wo(13, "Bubble Sort "), Ao(), Ao(), Ao(), To(14, "div", 9),
                     To(15, "app-sorting", 10),
                     Po("sortStatus",
                        (function(t) { return e.buttonDisable(t) })),
                     Ao(), Ao(), Ao()),
                    2&t &&
                        (mi(1), Co("fxFlex.gt-md", 8)("fxFlex.lt-sm", 18),
                         mi(2), Co("disabled", e.generateDisable), mi(2),
                         Co("matTooltipDisabled", !e.sortDisable), mi(1),
                         Co("disabled", e.sortDisable), mi(4),
                         Co("disabled", e.generateDisable), mi(2),
                         Co("disabled", e.disable), mi(2),
                         Co("fxFlex.gt-md", 92)("fxFlex.lt-sm", 82), mi(1),
                         Co("nums", e.nums)(
                             "sort",
                             (n = 12, s = Tw, i = e.trigger, r = e.sortType,
                              function(t, e, n, s, i, r, o) {
                                const a = e + n;
                                return bo(t, a, i, r)
                                           ? _o(t, a + 2,
                                                o ? s.call(o, i, r) : s(i, r))
                                           : Ja(t, a + 2)
                              }(sn(), dn(), n, s, i, r, o)))("width", e.range))
              },
              directives : [ qm, wm, Zm, jm, Tm, $v, Xb, lw, kw ],
              styles : [ "" ]
            }),
            t
          })(),
              Iw = (() => {
                class t {
                  constructor() { this.title = "sorting-visualizer" }
                } return t.\u0275fac = function(e) { return new (e || t) },
                t.\u0275cmp = me({
                  type : t,
                  selectors : [ [ "app-root" ] ],
                  decls : 1,
                  vars : 0,
                  template : function(t, e) { 1&t && Io(0, "app-main") },
                  directives : [ Aw ],
                  styles : [ "" ]
                }),
                t
              })(),
              Rw = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  imports : [ [ Ef ] ]
                }),
                t
              })(),
              Ow = (() => {
                class t {
                  constructor(t, e) {
                    Kc(e) && !t &&
                        console.warn(
                            "Warning: Flex Layout loaded on the server without FlexLayoutServerModule")
                  }
                  static withConfig(e, n = []) {
                    return {
                      ngModule:t,providers:e.serverLoaded?[{provide:Af,useValue:Object.assign(Object.assign({},Tf),e)},{provide:Rf,useValue:n,multi:!0},{provide:If,useValue:!0}]:[{provide:Af,useValue:Object.assign(Object.assign({},Tf),e)},{provide:Rf,useValue:n,multi:!0}]
                    }
                  }
                } return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t)(Zt(If), Zt(wl)) },
                  imports : [ [ og, ww, Rw ], og, ww, Rw ]
                }),
                t
              })();
          const Pw = new _(_h);
          class Lw {
            constructor(t, e) { this.delay = t, this.scheduler = e }
            call(t, e) {
              return e.subscribe(new Dw(t, this.delay, this.scheduler))
            }
          }
          class Dw extends f {
            constructor(t, e, n) {
              super(t), this.delay = e, this.scheduler = n, this.queue = [],
                        this.active = !1, this.errored = !1
            }
            static dispatch(t) {
              const e = t.source, n = e.queue, s = t.scheduler,
                    i = t.destination;
              for (; n.length > 0 && n[0].time - s.now() <= 0;)
                n.shift().notification.observe(i);
              if (n.length > 0) {
                const e = Math.max(0, n[0].time - s.now());
                this.schedule(t, e)
              } else
                this.unsubscribe(), e.active = !1
            }
            _schedule(t) {
              this.active = !0,
              this.destination.add(t.schedule(Dw.dispatch, this.delay, {
                source : this,
                destination : this.destination,
                scheduler : t
              }))
            }
            scheduleNotification(t) {
              if (!0 === this.errored)
                return;
              const e = this.scheduler, n = new Nw(e.now() + this.delay, t);
              this.queue.push(n), !1 === this.active && this._schedule(e)
            }
            _next(t) { this.scheduleNotification(Jv.createNext(t)) }
            _error(t) {
              this.errored = !0, this.queue = [], this.destination.error(t),
              this.unsubscribe()
            }
            _complete() {
              this.scheduleNotification(Jv.createComplete()), this.unsubscribe()
            }
          }
          class Nw {
            constructor(t, e) { this.time = t, this.notification = e }
          }
          const Fw =
              "Service workers are disabled or not supported by this browser";
          class Mw {
            constructor(t) {
              if (this.serviceWorker = t, t) {
                const e = ff(t, "controllerchange").pipe(k(() => t.controller)),
                      n = ch(Hu(() => Iu(t.controller)), e);
                this.worker = n.pipe(zu(t => !!t)),
                this.registration =
                    this.worker.pipe(sh(() => t.getRegistration()));
                const s = ff(t, "message")
                              .pipe(k(t => t.data))
                              .pipe(zu(t => t && t.type))
                              .pipe(X(new S));
                s.connect(), this.events = s
              } else
                this.worker = this.events = this.registration = Hu(
                    () => Yv(new Error(
                        "Service workers are disabled or not supported by this browser")))
            }
            postMessage(t, e) {
              return this.worker
                  .pipe(
                      oh(1),
                      vh(n => {n.postMessage(Object.assign({action : t}, e))}))
                  .toPromise()
                  .then(() => {})
            }
            postMessageWithStatus(t, e, n) {
              const s = this.waitForStatus(n), i = this.postMessage(t, e);
              return Promise.all([ s, i ]).then(() => {})
            }
            generateNonce() { return Math.round(1e7 * Math.random()) }
            eventsOfType(t) { return this.events.pipe(zu(e => e.type === t)) }
            nextEventOfType(t) { return this.eventsOfType(t).pipe(oh(1)) }
            waitForStatus(t) {
              return this.eventsOfType("STATUS")
                  .pipe(zu(e => e.nonce === t), oh(1), k(t => {
                          if (!t.status)
                            throw new Error(t.error)
                        }))
                  .toPromise()
            }
            get isEnabled() { return !!this.serviceWorker }
          }
          let jw = (() => {
            class t {
              constructor(t) {
                if (this.sw = t, this.subscriptionChanges = new S, !t.isEnabled)
                  return this.messages = Pw, this.notificationClicks = Pw,
                         void (this.subscription = Pw);
                this.messages =
                    this.sw.eventsOfType("PUSH").pipe(k(t => t.data)),
                this.notificationClicks =
                    this.sw.eventsOfType("NOTIFICATION_CLICK")
                        .pipe(k(t => t.data)),
                this.pushManager =
                    this.sw.registration.pipe(k(t => t.pushManager));
                const e = this.pushManager.pipe(sh(t => t.getSubscription()));
                this.subscription = q(e, this.subscriptionChanges)
              }
              get isEnabled() { return this.sw.isEnabled }
              requestSubscription(t) {
                if (!this.sw.isEnabled)
                  return Promise.reject(new Error(Fw));
                const e = {userVisibleOnly : !0};
                let n = this.decodeBase64(
                        t.serverPublicKey.replace(/_/g, "/").replace(/-/g,
                                                                     "+")),
                    s = new Uint8Array(new ArrayBuffer(n.length));
                for (let i = 0; i < n.length; i++)
                  s[i] = n.charCodeAt(i);
                return e.applicationServerKey = s,
                       this.pushManager.pipe(sh(t => t.subscribe(e)), oh(1))
                           .toPromise()
                           .then(t => (this.subscriptionChanges.next(t), t))
              }
              unsubscribe() {
                return this.sw.isEnabled
                           ? this.subscription
                                 .pipe(
                                     oh(1), sh(t => {
                                       if (null === t)
                                         throw new Error(
                                             "Not subscribed to push notifications.");
                                       return t.unsubscribe().then(t => {
                                         if (!t)
                                           throw new Error(
                                               "Unsubscribe failed!");
                                         this.subscriptionChanges.next(null)
                                       })
                                     }))
                                 .toPromise()
                           : Promise.reject(new Error(Fw))
              }
              decodeBase64(t) { return atob(t) }
            } return t.\u0275fac = function(e) { return new (e || t)(Zt(Mw)) },
            t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
            t
          })(),
              Vw = (() => {
                class t {
                  constructor(t) {
                    if (this.sw = t, !t.isEnabled)
                      return this.available = Pw, void (this.activated = Pw);
                    this.available = this.sw.eventsOfType("UPDATE_AVAILABLE"),
                    this.activated = this.sw.eventsOfType("UPDATE_ACTIVATED")
                  }
                  get isEnabled() { return this.sw.isEnabled }
                  checkForUpdate() {
                    if (!this.sw.isEnabled)
                      return Promise.reject(new Error(Fw));
                    const t = this.sw.generateNonce();
                    return this.sw.postMessageWithStatus("CHECK_FOR_UPDATES",
                                                         {statusNonce : t}, t)
                  }
                  activateUpdate() {
                    if (!this.sw.isEnabled)
                      return Promise.reject(new Error(Fw));
                    const t = this.sw.generateNonce();
                    return this.sw.postMessageWithStatus("ACTIVATE_UPDATE",
                                                         {statusNonce : t}, t)
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Mw)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
          class Bw {}
          const Hw = new Vt("NGSW_REGISTER_SCRIPT");
          function Uw(t, e, n, s) {
            return () => {
              if (!Qc(s) || !("serviceWorker" in navigator) || !1 === n.enabled)
                return;
              let i;
              if (navigator.serviceWorker.addEventListener(
                      "controllerchange",
                      () => {null !== navigator.serviceWorker.controller &&
                             navigator.serviceWorker.controller.postMessage(
                                 {action : "INITIALIZE"})}),
                  "function" == typeof n.registrationStrategy)
                i = n.registrationStrategy();
              else {
                const [e, ...s] =
                    (n.registrationStrategy || "registerWhenStable:30000")
                        .split(":");
                switch (e) {
                case "registerImmediately":
                  i = Iu(null);
                  break;
                case "registerWithDelay":
                  i = zw(+s[0] || 0);
                  break;
                case "registerWhenStable":
                  i = s[0] ? q($w(t), zw(+s[0])) : $w(t);
                  break;
                default:
                  throw new Error(
                      "Unknown ServiceWorker registration strategy: " +
                      n.registrationStrategy)
                }
              }
              t.get(Fl).runOutsideAngular(
                  () => i.pipe(oh(1)).subscribe(
                      () =>
                          navigator.serviceWorker.register(e, {scope : n.scope})
                              .catch(
                                  t => console.error(
                                      "Service worker registration failed with:",
                                      t))))
            }
          }
          function zw(t) {
            return Iu(null).pipe(function(t, e = mf) {
              var n;
              const s = (n = t) instanceof Date && !isNaN(+n) ? +t - e.now()
                                                              : Math.abs(t);
              return t => t.lift(new Lw(s, e))
            }(t))
          }
          function $w(t) { return t.get(ec).isStable.pipe(zu(t => t)) }
          function qw(t, e) {
            return new Mw(Qc(e) && !1 !== t.enabled ? navigator.serviceWorker
                                                    : void 0)
          }
          let Ww = (() => {
            class t {
              static register(e, n = {}) {
                return {
                  ngModule: t, providers: [
                    {provide : Hw, useValue : e}, {provide : Bw, useValue : n},
                    {provide : Mw, useFactory : qw, deps : [ Bw, wl ]}, {
                      provide : ml,
                      useFactory : Uw,
                      deps : [ so, Hw, Bw, wl ],
                      multi : !0
                    }
                  ]
                }
              }
            } return t.\u0275mod = ve({type : t}),
            t.\u0275inj = dt({
              factory : function(e) { return new (e || t) },
              providers : [ jw, Vw ]
            }),
            t
          })(),
              Gw = (() => {
                class t {} return t.\u0275mod =
                    ve({type : t, bootstrap : [ Iw ]}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  providers : [],
                  imports : [ [
                    Au, cf, wv, Ow, qv, hw, tw,
                    Ww.register("ngsw-worker.js", {enabled : !0})
                  ] ]
                }),
                t
              })();
          (function() {
            if (Ts)
              throw new Error("Cannot enable prod mode after platform setup.");
            ks = !1
          })(),
              ku().bootstrapModule(Gw).catch(t => console.error(t))
        },
        zn8P : function(t, e) {
          function n(t) {
            return Promise.resolve().then((function() {
              var e = new Error("Cannot find module '" + t + "'");
              throw e.code = "MODULE_NOT_FOUND", e
            }))
          }
          n.keys = function() { return [] }, n.resolve = n, t.exports = n,
          n.id = "zn8P"
        }
      },
      [ [ 0, 0 ] ]
    ]);