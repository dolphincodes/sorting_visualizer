(window.webpackJsonp = window.webpackJsonp || [])
    .push(
        [
          [ 1 ], {
            0 : function(t, e, n) { t.exports = n("zUnb") },
            zUnb : function(t, e, n) {
              "use strict";
              function r(t) { return "function" == typeof t }
              n.r(e);
              let s = !1;
              const i = {
                Promise : void 0,
                set useDeprecatedSynchronousErrorHandling(t) {
                  if (t) {
                    const t = new Error;
                    console.warn(
                        "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                        t.stack)
                  } else
                    s &&
                        console.log(
                            "RxJS: Back to a better error behavior. Thank you. <3");
                  s = t
                },
                get useDeprecatedSynchronousErrorHandling() { return s }
              };
              function o(t) { setTimeout(() => {throw t}, 0) }
              const a = {
                closed : !0,
                next(t) {},
                error(t) {
                  if (i.useDeprecatedSynchronousErrorHandling)
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
                                     t.map((t, e) =>
                                               `${e + 1}) ${t.toString()}`)
                                         .join("\n  ")}`
                               : "",
                         this.name = "UnsubscriptionError", this.errors = t,
                         this
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
                      _ctorUnsubscribe : s,
                      _unsubscribe : i,
                      _subscriptions : o
                    } = this;
                    if (this.closed = !0, this._parentOrParents = null,
                        this._subscriptions = null, n instanceof t)
                      n.remove(this);
                    else if (null !== n)
                      for (let t = 0; t < n.length; ++t)
                        n[t].remove(this);
                    if (r(i)) {
                      s && (this._unsubscribe = void 0);
                      try {
                        i.call(this)
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
                            e = e || [], a instanceof u
                                             ? e = e.concat(d(a.errors))
                                             : e.push(a)
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
                    let {_parentOrParents : r} = n;
                    if (null === r)
                      n._parentOrParents = this;
                    else if (r instanceof t) {
                      if (r === this)
                        return n;
                      n._parentOrParents = [ r, this ]
                    } else {
                      if (-1 !== r.indexOf(this))
                        return n;
                      r.push(this)
                    }
                    const s = this._subscriptions;
                    return null === s ? this._subscriptions = [ n ] : s.push(n),
                                        n
                  }
                  remove(t) {
                    const e = this._subscriptions;
                    if (e) {
                      const n = e.indexOf(t);
                      -1 !== n && e.splice(n, 1)
                    }
                  }
                } return t.EMPTY =
                    function(t) { return t.closed = !0, t }(new t),
                t
              })();
              function d(t) {
                return t.reduce(
                    (t, e) => t.concat(e instanceof u ? e.errors : e), [])
              }
              const p = (() => "function" == typeof Symbol
                                   ? Symbol("rxSubscriber")
                                   : "@@rxSubscriber_" + Math.random())();
              class f extends h {
                constructor(t, e, n) {
                  switch (super(), this.syncErrorValue = null,
                          this.syncErrorThrown = !1,
                          this.syncErrorThrowable = !1, this.isStopped = !1,
                          arguments.length) {
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
                  const r = new f(t, e, n);
                  return r.syncErrorThrowable = !1, r
                }
                next(t) { this.isStopped || this._next(t) }
                error(t) {
                  this.isStopped || (this.isStopped = !0, this._error(t))
                }
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
                constructor(t, e, n, s) {
                  let i;
                  super(), this._parentSubscriber = t;
                  let o = this;
                  r(e) ? i = e
                       : e && (i = e.next, n = e.error, s = e.complete,
                               e !== a && (o = Object.create(e),
                                           r(o.unsubscribe) &&
                                               this.add(o.unsubscribe.bind(o)),
                                           o.unsubscribe =
                                               this.unsubscribe.bind(this))),
                         this._context = o, this._next = i, this._error = n,
                         this._complete = s
                }
                next(t) {
                  if (!this.isStopped && this._next) {
                    const {_parentSubscriber : e} = this;
                    i.useDeprecatedSynchronousErrorHandling &&
                            e.syncErrorThrowable
                        ? this.__tryOrSetError(e, this._next, t) &&
                              this.unsubscribe()
                        : this.__tryOrUnsub(this._next, t)
                  }
                }
                error(t) {
                  if (!this.isStopped) {
                    const {_parentSubscriber :
                               e} = this,
                               {useDeprecatedSynchronousErrorHandling : n} = i;
                    if (this._error)
                      n && e.syncErrorThrowable
                          ? (this.__tryOrSetError(e, this._error, t),
                             this.unsubscribe())
                          : (this.__tryOrUnsub(this._error, t),
                             this.unsubscribe());
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
                      i.useDeprecatedSynchronousErrorHandling &&
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
                    if (this.unsubscribe(),
                        i.useDeprecatedSynchronousErrorHandling)
                      throw n;
                    o(n)
                  }
                }
                __tryOrSetError(t, e, n) {
                  if (!i.useDeprecatedSynchronousErrorHandling)
                    throw new Error("bad call");
                  try {
                    e.call(this._context, n)
                  } catch (r) {
                    return i.useDeprecatedSynchronousErrorHandling
                               ? (t.syncErrorValue = r, t.syncErrorThrown = !0,
                                  !0)
                               : (o(r), !0)
                  }
                  return !1
                }
                _unsubscribe() {
                  const {_parentSubscriber : t} = this;
                  this._context = null, this._parentSubscriber = null,
                  t.unsubscribe()
                }
              }
              const g =
                  (() => "function" == typeof Symbol && Symbol.observable ||
                         "@@observable")();
              function y(t) { return t }
              let _ = (() => {
                class t {
                  constructor(t) {
                    this._isScalar = !1, t && (this._subscribe = t)
                  }
                  lift(e) {
                    const n = new t;
                    return n.source = this, n.operator = e, n
                  }
                  subscribe(t, e, n) {
                    const {operator : r} = this, s = function(t, e, n) {
                      if (t) {
                        if (t instanceof f)
                          return t;
                        if (t[p])
                          return t[p]()
                      }
                      return t || e || n ? new f(t, e, n) : new f(a)
                    }(t, e, n);
                    if (s.add(
                            r ? r.call(s, this.source)
                              : this.source ||
                                        i.useDeprecatedSynchronousErrorHandling &&
                                            !s.syncErrorThrowable
                                    ? this._subscribe(s)
                                    : this._trySubscribe(s)),
                        i.useDeprecatedSynchronousErrorHandling &&
                            s.syncErrorThrowable &&
                            (s.syncErrorThrowable = !1, s.syncErrorThrown))
                      throw s.syncErrorValue;
                    return s
                  }
                  _trySubscribe(t) {
                    try {
                      return this._subscribe(t)
                    } catch (e) {
                      i.useDeprecatedSynchronousErrorHandling &&
                          (t.syncErrorThrown = !0, t.syncErrorValue = e),
                          function(t) {
                            for (; t;) {
                              const {
                                closed : e,
                                destination : n,
                                isStopped : r
                              } = t;
                              if (e || r)
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
                      let r;
                      r = this.subscribe(e => {
                        try {
                          t(e)
                        } catch (s) {
                          n(s), r && r.unsubscribe()
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
                if (t || (t = i.Promise || Promise), !t)
                  throw new Error("no Promise impl found");
                return t
              }
              const b = (() => {
                function t() {
                  return Error.call(this),
                         this.message = "object unsubscribed",
                         this.name = "ObjectUnsubscribedError", this
                } return t.prototype = Object.create(Error.prototype),
                t
              })();
              class w extends h {
                constructor(t, e) {
                  super(), this.subject = t, this.subscriber = e,
                           this.closed = !1
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
                      const {observers : e} = this, n = e.length, r = e.slice();
                      for (let s = 0; s < n; s++)
                        r[s].next(t)
                    }
                  }
                  error(t) {
                    if (this.closed)
                      throw new b;
                    this.hasError = !0, this.thrownError = t,
                    this.isStopped = !0;
                    const {observers : e} = this, n = e.length, r = e.slice();
                    for (let s = 0; s < n; s++)
                      r[s].error(t);
                    this.observers.length = 0
                  }
                  complete() {
                    if (this.closed)
                      throw new b;
                    this.isStopped = !0;
                    const {observers : t} = this, e = t.length, n = t.slice();
                    for (let r = 0; r < e; r++)
                      n[r].complete();
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
                constructor(t, e) {
                  super(), this.destination = t, this.source = e
                }
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
                for (let n = 0, r = t.length; n < r && !e.closed; n++)
                  e.next(t[n]);
                e.complete()
              };
              function O() {
                return "function" == typeof Symbol && Symbol.iterator
                           ? Symbol.iterator
                           : "@@iterator"
              }
              const P = O(), R = t => t && "number" == typeof t.length &&
                                      "function" != typeof t;
              function L(t) {
                return !!t && "function" != typeof t.subscribe &&
                       "function" == typeof t.then
              }
              const N = t => {
                if (t && "function" == typeof t[g])
                  return r = t, t => {
                    const e = r[g]();
                    if ("function" != typeof e.subscribe)
                      throw new TypeError(
                          "Provided object does not correctly implement Symbol.observable");
                    return e.subscribe(t)
                  };
                if (R(t))
                  return I(t);
                if (L(t))
                  return n = t, t => (n.then(e => {t.closed ||
                                                   (t.next(e), t.complete())},
                                             e => t.error(e))
                                          .then(null, o),
                                      t);
                if (t && "function" == typeof t[P])
                  return e = t, t => {
                    const n = e[P]();
                    for (;;) {
                      let e;
                      try {
                        e = n.next()
                      } catch (r) {
                        return t.error(r), t
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
                var e, n, r
              };
              function D(t, e) {
                return new _(n => {
                  const r = new h;
                  let s = 0;
                  return r.add(e.schedule((function() {
                    s !== t.length
                        ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                        : n.complete()
                  }))),
                         r
                })
              }
              function M(t, e) {
                return e ? function(t, e) {
                  if (null != t) {
                    if (function(t) { return t && "function" == typeof t[g] }(
                            t))
                      return function(t, e) {
                        return new _(n => {
                          const r = new h;
                          return r.add(e.schedule(() => {
                            const s = t[g]();
                            r.add(s.subscribe({
                              next(t) { r.add(e.schedule(() => n.next(t))) },
                              error(t) { r.add(e.schedule(() => n.error(t))) },
                              complete() {
                                r.add(e.schedule(() => n.complete()))
                              }
                            }))
                          })),
                                 r
                        })
                      }(t, e);
                    if (L(t))
                      return function(t, e) {
                        return new _(n => {
                          const r = new h;
                          return r.add(e.schedule(
                                     () => t.then(
                                         t => {r.add(e.schedule(() => {
                                           n.next(t),
                                           r.add(e.schedule(() => n.complete()))
                                         }))},
                                         t => {r.add(
                                             e.schedule(() => n.error(t)))}))),
                                 r
                        })
                      }(t, e);
                    if (R(t))
                      return D(t, e);
                    if (function(t) { return t && "function" == typeof t[P] }(
                            t) ||
                        "string" == typeof t)
                      return function(t, e) {
                        if (!t)
                          throw new Error("Iterable cannot be null");
                        return new _(n => {
                          const r = new h;
                          let s;
                          return r.add(() => {s &&
                                              "function" == typeof s.return &&
                                              s.return()}),
                                 r.add(e.schedule(() => {
                                   s = t[P](),
                                   r.add(e.schedule((function() {
                                     if (n.closed)
                                       return;
                                     let t, e;
                                     try {
                                       const n = s.next();
                                       t = n.value, e = n.done
                                     } catch (r) {
                                       return void n.error(r)
                                     }
                                     e ? n.complete()
                                       : (n.next(t), this.schedule())
                                   })))
                                 })),
                                 r
                        })
                      }(t, e)
                  }
                  throw new TypeError((null !== t && typeof t || t) +
                                      " is not observable")
                }(t, e) : t instanceof _ ? t : new _(N(t))
              }
              class j extends f {
                constructor(t) { super(), this.parent = t }
                _next(t) { this.parent.notifyNext(t) }
                _error(t) { this.parent.notifyError(t), this.unsubscribe() }
                _complete() { this.parent.notifyComplete(), this.unsubscribe() }
              }
              class F extends f {
                notifyNext(t) { this.destination.next(t) }
                notifyError(t) { this.destination.error(t) }
                notifyComplete() { this.destination.complete() }
              }
              function U(t, e) {
                if (!e.closed)
                  return t instanceof _ ? t.subscribe(e) : N(t)(e)
              }
              function V(t, e, n = Number.POSITIVE_INFINITY) {
                return "function" == typeof e
                           ? r => r.pipe(V((n, r) => M(t(n, r)).pipe(
                                               k((t, s) => e(n, t, r, s))),
                                           n))
                           : ("number" == typeof e && (n = e),
                              e => e.lift(new B(t, n)))
              }
              class B {
                constructor(t, e = Number.POSITIVE_INFINITY) {
                  this.project = t, this.concurrent = e
                }
                call(t, e) {
                  return e.subscribe(new $(t, this.project, this.concurrent))
                }
              }
              class $ extends F {
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
                  } catch (r) {
                    return void this.destination.error(r)
                  }
                  this.active++, this._innerSub(e)
                }
                _innerSub(t) {
                  const e = new j(this), n = this.destination;
                  n.add(e);
                  const r = U(t, e);
                  r !== e && n.add(r)
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
              function H(t = Number.POSITIVE_INFINITY) { return V(y, t) }
              function z(t, e) { return e ? D(t, e) : new _(I(t)) }
              function q(...t) {
                let e = Number.POSITIVE_INFINITY, n = null, r = t[t.length - 1];
                return C(r) ? (n = t.pop(),
                               t.length > 1 &&
                                   "number" == typeof t[t.length - 1] &&
                                   (e = t.pop()))
                            : "number" == typeof r && (e = t.pop()),
                       null === n && 1 === t.length && t[0] instanceof _
                           ? t[0]
                           : H(e)(z(t, n))
              }
              function Q() {
                return function(t) { return t.lift(new W(t)) }
              }
              class W {
                constructor(t) { this.connectable = t }
                call(t, e) {
                  const {connectable : n} = this;
                  n._refCount++;
                  const r = new G(t, n), s = e.subscribe(r);
                  return r.closed || (r.connection = n.connect()), s
                }
              }
              class G extends f {
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
                  const {connection : n} = this, r = t._connection;
                  this.connection = null, !r || n && r !== n || r.unsubscribe()
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
                  return t || (this._isComplete = !1,
                               t = this._connection = new h,
                               t.add(this.source.subscribe(
                                   new Y(this.getSubject(), this))),
                               t.closed &&
                                   (this._connection = null, t = h.EMPTY)),
                         t
                }
                refCount() { return Q()(this) }
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
              function J(t, e) {
                return function(n) {
                  let r;
                  if (r = "function" == typeof t ? t : function() { return t },
                      "function" == typeof e)
                    return n.lift(new X(r, e));
                  const s = Object.create(n, Z);
                  return s.source = n, s.subjectFactory = r, s
                }
              }
              class X {
                constructor(t, e) { this.subjectFactory = t, this.selector = e }
                call(t, e) {
                  const {selector : n} = this, r = this.subjectFactory(),
                                    s = n(r).subscribe(t);
                  return s.add(e.subscribe(r)), s
                }
              }
              function tt() { return new S }
              function et(t) { return {toString : t}.toString() }
              const nt = "__parameters__";
              function rt(t, e, n) {
                return et(() => {
                  const r = function(t) {
                    return function(...e) {
                      if (t) {
                        const n = t(...e);
                        for (const t in n)
                          this[t] = n[t]
                      }
                    }
                  }(e);
                  function s(...t) {
                    if (this instanceof s)
                      return r.apply(this, t), this;
                    const e = new s(...t);
                    return n.annotation = e, n;
                    function n(t, n, r) {
                      const s =
                          t.hasOwnProperty(nt)
                              ? t[nt]
                              : Object.defineProperty(t, nt, {value : []})[nt];
                      for (; s.length <= r;)
                        s.push(null);
                      return (s[r] = s[r] || []).push(e), t
                    }
                  }
                  return n && (s.prototype = Object.create(n.prototype)),
                         s.prototype.ngMetadataName = t, s.annotationCls = s, s
                })
              }
              const st = rt("Inject", t => ({token : t})), it = rt("Optional"),
                    ot = rt("Self"), at = rt("SkipSelf");
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
                return t && (t.hasOwnProperty(yt) || t.hasOwnProperty(bt))
                           ? t[yt]
                           : null
              }
              const gt = ct({"\u0275prov" : ct}), yt = ct({"\u0275inj" : ct}),
                    _t = ct({"\u0275provFallback" : ct}),
                    vt = ct({ngInjectableDef : ct}),
                    bt = ct({ngInjectorDef : ct});
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
                    Ot = "undefined" != typeof global && global,
                    Pt = Tt || Ot || At || It, Rt = ct({"\u0275cmp" : ct}),
                    Lt = ct({"\u0275dir" : ct}), Nt = ct({"\u0275pipe" : ct}),
                    Dt = ct({"\u0275mod" : ct}), Mt = ct({"\u0275loc" : ct}),
                    jt = ct({"\u0275fac" : ct}),
                    Ft = ct({__NG_ELEMENT_ID__ : ct});
              class Ut {
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
              const Vt = new Ut("INJECTOR", -1), Bt = {}, $t = /\n/gm,
                    Ht = "__source", zt = ct({provide : String, useValue : ct});
              let qt, Qt = void 0;
              function Wt(t) {
                const e = Qt;
                return Qt = t, e
              }
              function Gt(t) {
                const e = qt;
                return qt = t, e
              }
              function Kt(t, e = lt.Default) {
                if (void 0 === Qt)
                  throw new Error(
                      "inject() must be called from an injection context");
                return null === Qt
                           ? Jt(t, void 0, e)
                           : Qt.get(t, e & lt.Optional ? null : void 0, e)
              }
              function Zt(t, e = lt.Default) { return (qt || Kt)(Ct(t), e) }
              const Yt = Zt;
              function Jt(t, e, n) {
                const r = pt(t);
                if (r && "root" == r.providedIn)
                  return void 0 === r.value ? r.value = r.factory() : r.value;
                if (n & lt.Optional)
                  return null;
                if (void 0 !== e)
                  return e;
                throw new Error(`Injector: NOT_FOUND [${wt(t)}]`)
              }
              function Xt(t) {
                const e = [];
                for (let n = 0; n < t.length; n++) {
                  const r = Ct(t[n]);
                  if (Array.isArray(r)) {
                    if (0 === r.length)
                      throw new Error("Arguments array must have arguments.");
                    let t = void 0, n = lt.Default;
                    for (let e = 0; e < r.length; e++) {
                      const s = r[e];
                      s instanceof it || "Optional" === s.ngMetadataName ||
                              s === it
                          ? n |= lt.Optional
                          : s instanceof at ||
                                    "SkipSelf" === s.ngMetadataName || s === at
                                ? n |= lt.SkipSelf
                                : s instanceof ot ||
                                          "Self" === s.ngMetadataName ||
                                          s === ot
                                      ? n |= lt.Self
                                      : t = s instanceof st || s === st
                                                ? s.token
                                                : s
                    }
                    e.push(Zt(t, n))
                  } else
                    e.push(Zt(r))
                }
                return e
              }
              class te {
                get(t, e = Bt) {
                  if (e === Bt) {
                    const e = new Error(
                        `NullInjectorError: No provider for ${wt(t)}!`);
                    throw e.name = "NullInjectorError", e
                  }
                  return e
                }
              }
              class ee {}
              class ne {}
              function re(t, e) {
                t.forEach(t => Array.isArray(t) ? re(t, e) : e(t))
              }
              function se(t, e, n) {
                e >= t.length ? t.push(n) : t.splice(e, 0, n)
              }
              function ie(t, e) {
                return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
              }
              function oe(t, e) {
                const n = [];
                for (let r = 0; r < t; r++)
                  n.push(e);
                return n
              }
              function ae(t, e, n) {
                let r = ce(t, e);
                return r >= 0 ? t[1 | r] = n : (r = ~r, function(t, e, n, r) {
                         let s = t.length;
                         if (s == e)
                           t.push(n, r);
                         else if (1 === s)
                           t.push(r, t[0]), t[0] = n;
                         else {
                           for (s--, t.push(t[s - 1], t[s]); s > e;)
                             t[s] = t[s - 2], s--;
                           t[e] = n, t[e + 1] = r
                         }
                       }(t, r, e, n)), r
              }
              function le(t, e) {
                const n = ce(t, e);
                if (n >= 0)
                  return t[1 | n]
              }
              function ce(t, e) {
                return function(t, e, n) {
                  let r = 0, s = t.length >> 1;
                  for (; s !== r;) {
                    const n = r + (s - r >> 1), i = t[n << 1];
                    if (e === i)
                      return n << 1;
                    i > e ? s = n : r = n + 1
                  }
                  return ~(s << 1)
                }(t, e)
              }
              var ue = function(t) {
                return t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default",
                                    t
              }({}), he = function(t) {
                return t[t.Emulated = 0] = "Emulated",
                                      t[t.Native = 1] = "Native",
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
                        r = t.directives, s = t.features, i = t.pipes;
                  return n.id += fe++,
                         n.inputs = be(t.inputs, e), n.outputs = be(t.outputs),
                         s && s.forEach(t => t(n)),
                         n.directiveDefs =
                             r ? () =>
                                     ("function" == typeof r ? r() : r).map(ge)
                               : null,
                         n.pipeDefs =
                             i ? () =>
                                     ("function" == typeof i ? i() : i).map(ye)
                               : null,
                         n
                })
              }
              function ge(t) {
                return xe(t) || function(t) { return t[Lt] || null }(t)
              }
              function ye(t) {
                return function(t) { return t[Nt] || null }(t)
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
                for (const r in t)
                  if (t.hasOwnProperty(r)) {
                    let s = t[r], i = s;
                    Array.isArray(s) && (i = s[1], s = s[0]), n[s] = r,
                                                              e && (e[s] = i)
                  }
                return n
              }
              const we = me;
              function xe(t) { return t[Rt] || null }
              function Se(t, e) { return t.hasOwnProperty(jt) ? t[jt] : null }
              function Ee(t, e) {
                const n = t[Dt] || null;
                if (!n && !0 === e)
                  throw new Error(
                      `Type ${wt(t)} does not have '\u0275mod' property.`);
                return n
              }
              const Ce = 20, ke = 10;
              function Te(t) {
                return Array.isArray(t) && "object" == typeof t[1]
              }
              function Ae(t) { return Array.isArray(t) && !0 === t[1] }
              function Ie(t) { return 0 != (8 & t.flags) }
              function Oe(t) { return 2 == (2 & t.flags) }
              function Pe(t) { return 1 == (1 & t.flags) }
              function Re(t) { return null !== t.template }
              function Le(t) { return 0 != (512 & t[2]) }
              class Ne {
                constructor(t, e, n) {
                  this.previousValue = t, this.currentValue = e,
                  this.firstChange = n
                }
                isFirstChange() { return this.firstChange }
              }
              function De() { return Me }
              function Me(t) {
                return t.type.prototype.ngOnChanges && (t.setInput = Fe), je
              }
              function je() {
                const t = Ue(this), e = null == t ? void 0 : t.current;
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
              function Fe(t, e, n, r) {
                const s =
                    Ue(t) || function(t,
                                      e) { return t.__ngSimpleChanges__ = e }(
                                 t, {previous : de, current : null}),
                      i = s.current || (s.current = {}), o = s.previous,
                      a = this.declaredInputs[n], l = o[a];
                i[a] = new Ne(l && l.currentValue, e, o === de), t[r] = e
              }
              function Ue(t) { return t.__ngSimpleChanges__ || null }
              De.ngInherit = !0;
              let Ve = void 0;
              function Be(t) { return !!t.listen }
              const $e = {
                createRenderer : (t, e) =>
                    void 0 !== Ve
                        ? Ve
                        : "undefined" != typeof document ? document : void 0
              };
              function He(t) {
                for (; Array.isArray(t);)
                  t = t[0];
                return t
              }
              function ze(t, e) { return He(e[t + Ce]) }
              function qe(t, e) { return He(e[t.index]) }
              function Qe(t, e) { return t.data[e + Ce] }
              function We(t, e) {
                const n = e[t];
                return Te(n) ? n : n[0]
              }
              function Ge(t) {
                const e = function(t) { return t.__ngContext__ || null }(t);
                return e ? Array.isArray(e) ? e : e.lView : null
              }
              function Ke(t) { return 4 == (4 & t[2]) }
              function Ze(t) { return 128 == (128 & t[2]) }
              function Ye(t, e) { return null === t || null == e ? null : t[e] }
              function Je(t) { t[18] = 0 }
              function Xe(t, e) {
                t[5] += e;
                let n = t, r = t[3];
                for (; null !== r &&
                       (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);)
                  r[5] += e, n = r, r = r[3]
              }
              const tn = {
                lFrame : vn(null),
                bindingsEnabled : !0,
                checkNoChangesMode : !1
              };
              function en() { return tn.bindingsEnabled }
              function nn() { return tn.lFrame.lView }
              function rn() { return tn.lFrame.tView }
              function sn() { return tn.lFrame.previousOrParentTNode }
              function on(t, e) {
                tn.lFrame.previousOrParentTNode = t, tn.lFrame.isParent = e
              }
              function an() { return tn.lFrame.isParent }
              function ln() { tn.lFrame.isParent = !1 }
              function cn() { return tn.checkNoChangesMode }
              function un(t) { tn.checkNoChangesMode = t }
              function hn() { return tn.lFrame.bindingIndex++ }
              function dn(t, e) {
                const n = tn.lFrame;
                n.bindingIndex = n.bindingRootIndex = t, pn(e)
              }
              function pn(t) { tn.lFrame.currentDirectiveIndex = t }
              function fn() { return tn.lFrame.currentQueryIndex }
              function mn(t) { tn.lFrame.currentQueryIndex = t }
              function gn(t, e) {
                const n = _n();
                tn.lFrame = n, n.previousOrParentTNode = e, n.lView = t
              }
              function yn(t, e) {
                const n = _n(), r = t[1];
                tn.lFrame = n, n.previousOrParentTNode = e, n.lView = t,
                n.tView = r, n.contextLView = t,
                n.bindingIndex = r.bindingStartIndex
              }
              function _n() {
                const t = tn.lFrame, e = null === t ? null : t.child;
                return null === e ? vn(t) : e
              }
              function vn(t) {
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
              function bn() {
                const t = tn.lFrame;
                return tn.lFrame = t.parent, t.previousOrParentTNode = null,
                       t.lView = null, t
              }
              const wn = bn;
              function xn() {
                const t = bn();
                t.isParent = !0, t.tView = null, t.selectedIndex = 0,
                t.contextLView = null, t.elementDepthCount = 0,
                t.currentDirectiveIndex = -1, t.currentNamespace = null,
                t.bindingRootIndex = -1, t.bindingIndex = -1,
                t.currentQueryIndex = 0
              }
              function Sn() { return tn.lFrame.selectedIndex }
              function En(t) { tn.lFrame.selectedIndex = t }
              function Cn() {
                const t = tn.lFrame;
                return Qe(t.tView, t.selectedIndex)
              }
              function kn(t, e) {
                for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
                  const e = t.data[n].type.prototype, {
                    ngAfterContentInit : r,
                    ngAfterContentChecked : s,
                    ngAfterViewInit : i,
                    ngAfterViewChecked : o,
                    ngOnDestroy : a
                  } = e;
                  r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
                      s &&
                          ((t.contentHooks || (t.contentHooks = [])).push(n, s),
                           (t.contentCheckHooks || (t.contentCheckHooks = []))
                               .push(n, s)),
                      i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
                      o && ((t.viewHooks || (t.viewHooks = [])).push(n, o),
                            (t.viewCheckHooks || (t.viewCheckHooks = []))
                                .push(n, o)),
                      null != a &&
                          (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
                }
              }
              function Tn(t, e, n) { On(t, e, 3, n) }
              function An(t, e, n, r) { (3 & t[2]) === n && On(t, e, n, r) }
              function In(t, e) {
                let n = t[2];
                (3 & n) === e && (n &= 2047, n += 1, t[2] = n)
              }
              function On(t, e, n, r) {
                const s = null != r ? r : -1;
                let i = 0;
                for (let o = void 0 !== r ? 65535 & t[18] : 0; o < e.length;
                     o++)
                  if ("number" == typeof e[o + 1]) {
                    if (i = e[o], null != r && i >= r)
                      break
                  } else
                    e[o] < 0 && (t[18] += 65536),
                        (i < s || -1 == s) &&
                            (Pn(t, n, e, o),
                             t[18] = (4294901760 & t[18]) + o + 2),
                        o++
              }
              function Pn(t, e, n, r) {
                const s = n[r] < 0, i = n[r + 1], o = t[s ? -n[r] : n[r]];
                s ? t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e &&
                        (t[2] += 2048, i.call(o))
                  : i.call(o)
              }
              class Rn {
                constructor(t, e, n) {
                  this.factory = t, this.resolving = !1,
                  this.canSeeViewProviders = e, this.injectImpl = n
                }
              }
              function Ln(t, e, n) {
                const r = Be(t);
                let s = 0;
                for (; s < n.length;) {
                  const i = n[s];
                  if ("number" == typeof i) {
                    if (0 !== i)
                      break;
                    s++;
                    const o = n[s++], a = n[s++], l = n[s++];
                    r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
                  } else {
                    const o = i, a = n[++s];
                    Dn(o) ? r && t.setProperty(e, o, a)
                          : r ? t.setAttribute(e, o, a) : e.setAttribute(o, a),
                        s++
                  }
                }
                return s
              }
              function Nn(t) { return 3 === t || 4 === t || 6 === t }
              function Dn(t) { return 64 === t.charCodeAt(0) }
              function Mn(t, e) {
                if (null === e || 0 === e.length)
                  ;
                else if (null === t || 0 === t.length)
                  t = e.slice();
                else {
                  let n = -1;
                  for (let r = 0; r < e.length; r++) {
                    const s = e[r];
                    "number" == typeof s
                        ? n = s
                        : 0 === n || jn(t, n, s, null,
                                        -1 === n || 2 === n ? e[++r] : null)
                  }
                }
                return t
              }
              function jn(t, e, n, r, s) {
                let i = 0, o = t.length;
                if (-1 === e)
                  o = -1;
                else
                  for (; i < t.length;) {
                    const n = t[i++];
                    if ("number" == typeof n) {
                      if (n === e) {
                        o = -1;
                        break
                      }
                      if (n > e) {
                        o = i - 1;
                        break
                      }
                    }
                  }
                for (; i < t.length;) {
                  const e = t[i];
                  if ("number" == typeof e)
                    break;
                  if (e === n) {
                    if (null === r)
                      return void (null !== s && (t[i + 1] = s));
                    if (r === t[i + 1])
                      return void (t[i + 2] = s)
                  }
                  i++, null !== r && i++, null !== s && i++
                }
                -1 !== o && (t.splice(o, 0, e), i = o + 1), t.splice(i++, 0, n),
                    null !== r && t.splice(i++, 0, r),
                    null !== s && t.splice(i++, 0, s)
              }
              function Fn(t) { return -1 !== t }
              function Un(t) { return 32767 & t }
              function Vn(t) { return t >> 16 }
              function Bn(t, e) {
                let n = Vn(t), r = e;
                for (; n > 0;)
                  r = r[15], n--;
                return r
              }
              function $n(t) {
                return "string" == typeof t ? t : null == t ? "" : "" + t
              }
              function Hn(t) {
                return"function"==typeof t?t.name||t.toString():"object"==typeof t&&null!=t&&"function"==typeof t.type?t.type.name||t.type.toString():$n(t)
              }
              const zn = (() => ("undefined" != typeof requestAnimationFrame &&
                                     requestAnimationFrame ||
                                 setTimeout)
                                    .bind(Pt))();
              function qn(t) { return t instanceof Function ? t() : t }
              let Qn = !0;
              function Wn(t) {
                const e = Qn;
                return Qn = t, e
              }
              let Gn = 0;
              function Kn(t, e) {
                const n = Yn(t, e);
                if (-1 !== n)
                  return n;
                const r = e[1];
                r.firstCreatePass && (t.injectorIndex = e.length, Zn(r.data, t),
                                      Zn(e, null), Zn(r.blueprint, null));
                const s = Jn(t, e), i = t.injectorIndex;
                if (Fn(s)) {
                  const t = Un(s), n = Bn(s, e), r = n[1].data;
                  for (let s = 0; s < 8; s++)
                    e[i + s] = n[t + s] | r[t + s]
                }
                return e[i + 8] = s, i
              }
              function Zn(t, e) { t.push(0, 0, 0, 0, 0, 0, 0, 0, e) }
              function Yn(t, e) {
                return -1 === t.injectorIndex ||
                               t.parent &&
                                   t.parent.injectorIndex === t.injectorIndex ||
                               null == e[t.injectorIndex + 8]
                           ? -1
                           : t.injectorIndex
              }
              function Jn(t, e) {
                if (t.parent && -1 !== t.parent.injectorIndex)
                  return t.parent.injectorIndex;
                let n = e[6], r = 1;
                for (; n && -1 === n.injectorIndex;)
                  n = (e = e[15]) ? e[6] : null, r++;
                return n ? n.injectorIndex | r << 16 : -1
              }
              function Xn(t, e, n) {
                !function(t, e, n) {
                  let r;
                  "string" == typeof n ? r = n.charCodeAt(0) || 0
                                       : n.hasOwnProperty(Ft) && (r = n[Ft]),
                                         null == r && (r = n[Ft] = Gn++);
                  const s = 255 & r, i = 1 << s, o = 64 & s, a = 32 & s,
                        l = e.data;
                  128&s ? o ? a ? l[t + 7] |= i : l[t + 6] |= i
                            : a ? l[t + 5] |= i : l[t + 4] |= i
                        : o ? a ? l[t + 3] |= i : l[t + 2] |= i
                            : a ? l[t + 1] |= i : l[t] |= i
                }(t, e, n)
              }
              function tr(t, e, n, r = lt.Default, s) {
                if (null !== t) {
                  const s = function(t) {
                    if ("string" == typeof t)
                      return t.charCodeAt(0) || 0;
                    const e = t.hasOwnProperty(Ft) ? t[Ft] : void 0;
                    return "number" == typeof e && e > 0 ? 255 & e : e
                  }(n);
                  if ("function" == typeof s) {
                    gn(e, t);
                    try {
                      const t = s();
                      if (null != t || r & lt.Optional)
                        return t;
                      throw new Error(`No provider for ${Hn(n)}!`)
                    } finally {
                      wn()
                    }
                  } else if ("number" == typeof s) {
                    if (-1 === s)
                      return new ar(t, e);
                    let i = null, o = Yn(t, e), a = -1,
                        l = r & lt.Host ? e[16][6] : null;
                    for ((-1 === o || r & lt.SkipSelf) &&
                             (a = -1 === o ? Jn(t, e) : e[o + 8],
                             or(r, !1) ? (i = e[1], o = Un(a), e = Bn(a, e))
                                       : o = -1);
                         - 1 !== o;) {
                      a = e[o + 8];
                      const t = e[1];
                      if (ir(s, o, t.data)) {
                        const t = nr(o, e, n, i, r, l);
                        if (t !== er)
                          return t
                      }
                      or(r, e[1].data[o + 8] === l) && ir(s, o, e)
                          ? (i = t, o = Un(a), e = Bn(a, e))
                          : o = -1
                    }
                  }
                }
                if (r & lt.Optional && void 0 === s && (s = null),
                    0 == (r & (lt.Self | lt.Host))) {
                  const t = e[9], i = Gt(void 0);
                  try {
                    return t ? t.get(n, s, r & lt.Optional)
                             : Jt(n, s, r & lt.Optional)
                  } finally {
                    Gt(i)
                  }
                }
                if (r & lt.Optional)
                  return s;
                throw new Error(`NodeInjector: NOT_FOUND [${Hn(n)}]`)
              }
              const er = {};
              function nr(t, e, n, r, s, i) {
                const o = e[1], a = o.data[t + 8],
                      l = rr(a, o, n,
                             null == r ? Oe(a) && Qn : r != o && 3 === a.type,
                             s & lt.Host && i === a);
                return null !== l ? sr(e, o, l, a) : er
              }
              function rr(t, e, n, r, s) {
                const i = t.providerIndexes, o = e.data, a = 1048575 & i,
                      l = t.directiveStart, c = i >> 20,
                      u = s ? a + c : t.directiveEnd;
                for (let h = r ? a : a + c; h < u; h++) {
                  const t = o[h];
                  if (h < l && n === t || h >= l && t.type === n)
                    return h
                }
                if (s) {
                  const t = o[l];
                  if (t && Re(t) && t.type === n)
                    return l
                }
                return null
              }
              function sr(t, e, n, r) {
                let s = t[n];
                const i = e.data;
                if (s instanceof Rn) {
                  const o = s;
                  if (o.resolving)
                    throw new Error("Circular dep for " + Hn(i[n]));
                  const a = Wn(o.canSeeViewProviders);
                  let l;
                  o.resolving = !0, o.injectImpl && (l = Gt(o.injectImpl)),
                  gn(t, r);
                  try {
                    s = t[n] = o.factory(void 0, i, t, r),
                    e.firstCreatePass &&
                        n >= r.directiveStart && function(t, e, n) {
                          const {ngOnChanges : r, ngOnInit : s, ngDoCheck : i} =
                              e.type.prototype;
                          if (r) {
                            const r = Me(e);
                            (n.preOrderHooks || (n.preOrderHooks = []))
                                .push(t, r),
                                (n.preOrderCheckHooks ||
                                 (n.preOrderCheckHooks = []))
                                    .push(t, r)
                          }
                          s && (n.preOrderHooks || (n.preOrderHooks = []))
                                   .push(0 - t, s),
                              i && ((n.preOrderHooks || (n.preOrderHooks = []))
                                        .push(t, i),
                                    (n.preOrderCheckHooks ||
                                     (n.preOrderCheckHooks = []))
                                        .push(t, i))
                        }(n, i[n], e)
                  } finally {
                    o.injectImpl && Gt(l), Wn(a), o.resolving = !1, wn()
                  }
                }
                return s
              }
              function ir(t, e, n) {
                const r = 64 & t, s = 32 & t;
                let i;
                return i = 128 & t ? r ? s ? n[e + 7] : n[e + 6]
                                       : s ? n[e + 5] : n[e + 4]
                                   : r ? s ? n[e + 3] : n[e + 2]
                                       : s ? n[e + 1] : n[e],
                       !!(i & 1 << t)
              }
              function or(t, e) { return !(t & lt.Self || t & lt.Host && e) }
              class ar {
                constructor(t, e) { this._tNode = t, this._lView = e }
                get(t, e) { return tr(this._tNode, this._lView, t, void 0, e) }
              }
              function lr(t) {
                const e = t;
                if (kt(t))
                  return () => {
                    const t = lr(Ct(e));
                    return t ? t() : null
                  };
                let n = Se(e);
                if (null === n) {
                  const t = mt(e);
                  n = t && t.factory
                }
                return n || null
              }
              function cr(t) {
                return et(() => {
                  const e = t.prototype.constructor, n = e[jt] || lr(e),
                        r = Object.prototype;
                  let s = Object.getPrototypeOf(t.prototype).constructor;
                  for (; s && s !== r;) {
                    const t = s[jt] || lr(s);
                    if (t && t !== n)
                      return t;
                    s = Object.getPrototypeOf(s)
                  }
                  return t => new t
                })
              }
              function ur(t) { return t.ngDebugContext }
              function hr(t) { return t.ngOriginalError }
              function dr(t, ...e) { t.error(...e) }
              class pr {
                constructor() { this._console = console }
                handleError(t) {
                  const e = this._findOriginalError(t),
                        n = this._findContext(t),
                        r = function(t) { return t.ngErrorLogger || dr }(t);
                  r(this._console, "ERROR", t),
                      e && r(this._console, "ORIGINAL ERROR", e),
                      n && r(this._console, "ERROR CONTEXT", n)
                }
                _findContext(t) {
                  return t ? ur(t) ? ur(t) : this._findContext(hr(t)) : null
                }
                _findOriginalError(t) {
                  let e = hr(t);
                  for (; e && hr(e);)
                    e = hr(e);
                  return e
                }
              }
              class fr {
                constructor(t) {
                  this.changingThisBreaksApplicationSecurity = t
                }
                toString() {
                  return "SafeValue must use [property]=binding: " +
                         this.changingThisBreaksApplicationSecurity +
                         " (see http://g.co/ng/security#xss)"
                }
              }
              class mr extends fr {
                getTypeName() { return "HTML" }
              }
              class gr extends fr {
                getTypeName() { return "Style" }
              }
              class yr extends fr {
                getTypeName() { return "Script" }
              }
              class _r extends fr {
                getTypeName() { return "URL" }
              }
              class vr extends fr {
                getTypeName() { return "ResourceURL" }
              }
              function br(t) {
                return t instanceof fr ? t.changingThisBreaksApplicationSecurity
                                       : t
              }
              function wr(t, e) {
                const n = xr(t);
                if (null != n && n !== e) {
                  if ("ResourceURL" === n && "URL" === e)
                    return !0;
                  throw new Error(`Required a safe ${e}, got a ${
                      n} (see http://g.co/ng/security#xss)`)
                }
                return n === e
              }
              function xr(t) {
                return t instanceof fr && t.getTypeName() || null
              }
              let Sr = !0, Er = !1;
              function Cr() { return Er = !0, Sr }
              class kr {
                getInertBodyElement(t) {
                  t = "<body><remove></remove>" + t;
                  try {
                    const e = (new window.DOMParser)
                                  .parseFromString(t, "text/html")
                                  .body;
                    return e.removeChild(e.firstChild), e
                  } catch (e) {
                    return null
                  }
                }
              }
              class Tr {
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
                         this.defaultDoc.documentMode &&
                             this.stripCustomNsAttrs(n),
                         n
                }
                stripCustomNsAttrs(t) {
                  const e = t.attributes;
                  for (let r = e.length - 1; 0 < r; r--) {
                    const n = e.item(r).name;
                    "xmlns:ns1" !== n && 0 !== n.indexOf("ns1:") ||
                        t.removeAttribute(n)
                  }
                  let n = t.firstChild;
                  for (; n;)
                    n.nodeType === Node.ELEMENT_NODE &&
                        this.stripCustomNsAttrs(n),
                        n = n.nextSibling
                }
              }
              const Ar =
                  /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
                    Ir =
                        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
              function Or(t) {
                return (t = String(t)).match(Ar) || t.match(Ir)
                           ? t
                           : (Cr() &&
                                  console.warn(
                                      `WARNING: sanitizing unsafe URL value ${
                                          t} (see http://g.co/ng/security#xss)`),
                              "unsafe:" + t)
              }
              function Pr(t) {
                const e = {};
                for (const n of t.split(","))
                  e[n] = !0;
                return e
              }
              function Rr(...t) {
                const e = {};
                for (const n of t)
                  for (const t in n)
                    n.hasOwnProperty(t) && (e[t] = !0);
                return e
              }
              const Lr = Pr("area,br,col,hr,img,wbr"),
                    Nr = Pr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                    Dr = Pr("rp,rt"), Mr = Rr(Dr, Nr),
                    jr = Rr(
                        Lr,
                        Rr(Nr,
                           Pr("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),
                        Rr(Dr,
                           Pr("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),
                        Mr),
                    Fr = Pr(
                        "background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
                    Ur = Pr("srcset"),
                    Vr = Rr(
                        Fr, Ur,
                        Pr("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), Pr("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
                    Br = Pr("script,style,template");
              class $r {
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
                  if (!jr.hasOwnProperty(e))
                    return this.sanitizedSomething = !0, !Br.hasOwnProperty(e);
                  this.buf.push("<"), this.buf.push(e);
                  const n = t.attributes;
                  for (let s = 0; s < n.length; s++) {
                    const t = n.item(s), e = t.name, i = e.toLowerCase();
                    if (!Vr.hasOwnProperty(i)) {
                      this.sanitizedSomething = !0;
                      continue
                    }
                    let o = t.value;
                    Fr[i] && (o = Or(o)),
                        Ur[i] && (r = o, o = (r = String(r))
                                                 .split(",")
                                                 .map(t => Or(t.trim()))
                                                 .join(", ")),
                        this.buf.push(" ", e, '="', qr(o), '"')
                  }
                  var r;
                  return this.buf.push(">"), !0
                }
                endElement(t) {
                  const e = t.nodeName.toLowerCase();
                  jr.hasOwnProperty(e) && !Lr.hasOwnProperty(e) &&
                      (this.buf.push("</"), this.buf.push(e),
                       this.buf.push(">"))
                }
                chars(t) { this.buf.push(qr(t)) }
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
              const Hr = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                    zr = /([^\#-~ |!])/g;
              function qr(t) {
                return t.replace(/&/g, "&amp;")
                    .replace(Hr, (function(t) {
                               return "&#" +
                                      (1024 * (t.charCodeAt(0) - 55296) +
                                       (t.charCodeAt(1) - 56320) + 65536) +
                                      ";"
                             }))
                    .replace(
                        zr,
                        (function(t) { return "&#" + t.charCodeAt(0) + ";" }))
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
              }
              let Qr;
              function Wr(t) {
                return "content" in t && function(t) {
                  return t.nodeType === Node.ELEMENT_NODE &&
                         "TEMPLATE" === t.nodeName
                }(t) ? t.content : null
              }
              var Gr = function(t) {
                return t[t.NONE = 0] = "NONE", t[t.HTML = 1] = "HTML",
                                  t[t.STYLE = 2] = "STYLE",
                                  t[t.SCRIPT = 3] = "SCRIPT",
                                  t[t.URL = 4] = "URL",
                                  t[t.RESOURCE_URL = 5] = "RESOURCE_URL", t
              }({});
              function Kr(t, e) { t.__ngContext__ = e }
              function Zr(t, e, n) {
                let r = t.length;
                for (;;) {
                  const s = t.indexOf(e, n);
                  if (-1 === s)
                    return s;
                  if (0 === s || t.charCodeAt(s - 1) <= 32) {
                    const n = e.length;
                    if (s + n === r || t.charCodeAt(s + n) <= 32)
                      return s
                  }
                  n = s + 1
                }
              }
              const Yr = "ng-template";
              function Jr(t, e, n) {
                let r = 0;
                for (; r < t.length;) {
                  let s = t[r++];
                  if (n && "class" === s) {
                    if (s = t[r], -1 !== Zr(s.toLowerCase(), e, 0))
                      return !0
                  } else if (1 === s) {
                    for (; r < t.length && "string" == typeof (s = t[r++]);)
                      if (s.toLowerCase() === e)
                        return !0;
                    return !1
                  }
                }
                return !1
              }
              function Xr(t) { return 0 === t.type && t.tagName !== Yr }
              function ts(t, e, n) {
                return e === (0 !== t.type || n ? t.tagName : Yr)
              }
              function es(t, e, n) {
                let r = 4;
                const s = t.attrs || [], i = function(t) {
                  for (let e = 0; e < t.length; e++)
                    if (Nn(t[e]))
                      return e;
                  return t.length
                }(s);
                let o = !1;
                for (let a = 0; a < e.length; a++) {
                  const l = e[a];
                  if ("number" != typeof l) {
                    if (!o)
                      if (4 & r) {
                        if (r = 2 | 1 & r, "" !== l && !ts(t, l, n) ||
                                               "" === l && 1 === e.length) {
                          if (ns(r))
                            return !1;
                          o = !0
                        }
                      } else {
                        const c = 8 & r ? l : e[++a];
                        if (8 & r && null !== t.attrs) {
                          if (!Jr(t.attrs, c, n)) {
                            if (ns(r))
                              return !1;
                            o = !0
                          }
                          continue
                        }
                        const u = rs(8 & r ? "class" : l, s, Xr(t), n);
                        if (-1 === u) {
                          if (ns(r))
                            return !1;
                          o = !0;
                          continue
                        }
                        if ("" !== c) {
                          let t;
                          t = u > i ? "" : s[u + 1].toLowerCase();
                          const e = 8 & r ? t : null;
                          if (e && -1 !== Zr(e, c, 0) || 2 & r && c !== t) {
                            if (ns(r))
                              return !1;
                            o = !0
                          }
                        }
                      }
                  } else {
                    if (!o && !ns(r) && !ns(l))
                      return !1;
                    if (o && ns(l))
                      continue;
                    o = !1, r = l | 1 & r
                  }
                }
                return ns(r) || o
              }
              function ns(t) { return 0 == (1 & t) }
              function rs(t, e, n, r) {
                if (null === e)
                  return -1;
                let s = 0;
                if (r || !n) {
                  let n = !1;
                  for (; s < e.length;) {
                    const r = e[s];
                    if (r === t)
                      return s;
                    if (3 === r || 6 === r)
                      n = !0;
                    else {
                      if (1 === r || 2 === r) {
                        let t = e[++s];
                        for (; "string" == typeof t;)
                          t = e[++s];
                        continue
                      }
                      if (4 === r)
                        break;
                      if (0 === r) {
                        s += 4;
                        continue
                      }
                    }
                    s += n ? 1 : 2
                  }
                  return -1
                }
                return function(t, e) {
                  let n = t.indexOf(4);
                  if (n > -1)
                    for (n++; n < t.length;) {
                      const r = t[n];
                      if ("number" == typeof r)
                        return -1;
                      if (r === e)
                        return n;
                      n++
                    }
                  return -1
                }(e, t)
              }
              function ss(t, e, n = !1) {
                for (let r = 0; r < e.length; r++)
                  if (es(t, e[r], n))
                    return !0;
                return !1
              }
              function is(t, e) { return t ? ":not(" + e.trim() + ")" : e }
              function os(t) {
                let e = t[0], n = 1, r = 2, s = "", i = !1;
                for (; n < t.length;) {
                  let o = t[n];
                  if ("string" == typeof o)
                    if (2 & r) {
                      const e = t[++n];
                      s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
                    } else
                      8&r ? s += "." + o : 4 & r && (s += " " + o);
                  else
                    "" === s || ns(o) || (e += is(i, s), s = ""),
                        r = o, i = i || !ns(r);
                  n++
                }
                return "" !== s && (e += is(i, s)), e
              }
              const as = {};
              function ls(t) {
                const e = t[3];
                return Ae(e) ? e[3] : e
              }
              function cs(t) { return hs(t[13]) }
              function us(t) { return hs(t[4]) }
              function hs(t) {
                for (; null !== t && !Ae(t);)
                  t = t[4];
                return t
              }
              function ds(t) { ps(rn(), nn(), Sn() + t, cn()) }
              function ps(t, e, n, r) {
                if (!r)
                  if (3 == (3 & e[2])) {
                    const r = t.preOrderCheckHooks;
                    null !== r && Tn(e, r, n)
                  } else {
                    const r = t.preOrderHooks;
                    null !== r && An(e, r, 0, n)
                  }
                En(n)
              }
              function fs(t, e) { return t << 17 | e << 2 }
              function ms(t) { return t >> 17 & 32767 }
              function gs(t) { return 2 | t }
              function ys(t) { return (131068 & t) >> 2 }
              function _s(t, e) { return -131069 & t | e << 2 }
              function vs(t) { return 1 | t }
              function bs(t, e) {
                const n = t.contentQueries;
                if (null !== n)
                  for (let r = 0; r < n.length; r += 2) {
                    const s = n[r], i = n[r + 1];
                    if (-1 !== i) {
                      const n = t.data[i];
                      mn(s), n.contentQueries(2, e[i], i)
                    }
                  }
              }
              function ws(t, e, n) {
                return Be(e) ? e.createElement(t, n)
                             : null === n ? e.createElement(t)
                                          : e.createElementNS(n, t)
              }
              function xs(t, e, n, r, s, i, o, a, l, c) {
                const u = e.blueprint.slice();
                return u[0] = s, u[2] = 140 | r, Je(u), u[3] = u[15] = t,
                       u[8] = n, u[10] = o || t && t[10],
                       u[11] = a || t && t[11], u[12] = l || t && t[12] || null,
                       u[9] = c || t && t[9] || null, u[6] = i,
                       u[16] = 2 == e.type ? t[16] : u, u
              }
              function Ss(t, e, n, r, s, i) {
                const o = n + Ce, a = t.data[o] || function(t, e, n, r, s, i) {
                  const o = sn(), a = an(), l = a ? o : o && o.parent,
                        c = t.data[n] =
                            Ls(0, l && l !== e ? l : null, r, n, s, i);
                  return null === t.firstChild && (t.firstChild = c),
                         o &&
                             (!a || null != o.child || null === c.parent && 2 !== o.type ? a ||
                                                                                               (o.next =
                                                                                                    c)
                                                                                         : o.child =
                                                                                               c),
                         c
                }(t, e, o, r, s, i);
                return on(a, !0), a
              }
              function Es(t, e, n) {
                yn(e, e[6]);
                try {
                  const r = t.viewQuery;
                  null !== r && ei(1, r, n);
                  const s = t.template;
                  null !== s && Ts(t, e, s, 1, n),
                      t.firstCreatePass && (t.firstCreatePass = !1),
                      t.staticContentQueries && bs(t, e),
                      t.staticViewQueries && ei(2, t.viewQuery, n);
                  const i = t.components;
                  null !== i && function(t, e) {
                    for (let n = 0; n < e.length; n++)
                      Zs(t, e[n])
                  }(e, i)
                } catch (r) {
                  throw t.firstCreatePass && (t.incompleteFirstPass = !0), r
                } finally {
                  e[2] &= -5, xn()
                }
              }
              function Cs(t, e, n, r) {
                const s = e[2];
                if (256 == (256 & s))
                  return;
                yn(e, e[6]);
                const i = cn();
                try {
                  Je(e), tn.lFrame.bindingIndex = t.bindingStartIndex,
                         null !== n && Ts(t, e, n, 2, r);
                  const o = 3 == (3 & s);
                  if (!i)
                    if (o) {
                      const n = t.preOrderCheckHooks;
                      null !== n && Tn(e, n, null)
                    } else {
                      const n = t.preOrderHooks;
                      null !== n && An(e, n, 0, null), In(e, 0)
                    }
                  if (
                      function(t) {
                        for (let e = cs(t); null !== e; e = us(e)) {
                          if (!e[2])
                            continue;
                          const t = e[9];
                          for (let e = 0; e < t.length; e++) {
                            const n = t[e], r = n[3];
                            0 == (1024 & n[2]) && Xe(r, 1), n[2] |= 1024
                          }
                        }
                      }(e),
                      function(t) {
                        for (let e = cs(t); null !== e; e = us(e))
                          for (let t = ke; t < e.length; t++) {
                            const n = e[t], r = n[1];
                            Ze(n) && Cs(r, n, r.template, n[8])
                          }
                      }(e),
                      null !== t.contentQueries && bs(t, e), !i)
                    if (o) {
                      const n = t.contentCheckHooks;
                      null !== n && Tn(e, n)
                    } else {
                      const n = t.contentHooks;
                      null !== n && An(e, n, 1), In(e, 1)
                    }
                  !function(t, e) {
                    try {
                      const n = t.expandoInstructions;
                      if (null !== n) {
                        let r = t.expandoStartIndex, s = -1, i = -1;
                        for (let t = 0; t < n.length; t++) {
                          const o = n[t];
                          "number" == typeof o
                              ? o <= 0
                                    ? (i = 0 - o, En(i), r += 9 + n[++t], s = r)
                                    : r += o
                              : (null !== o && (dn(r, s), o(2, e[s])), s++)
                        }
                      }
                    } finally {
                      En(-1)
                    }
                  }(t, e);
                  const a = t.components;
                  null !== a && function(t, e) {
                    for (let n = 0; n < e.length; n++)
                      Ks(t, e[n])
                  }(e, a);
                  const l = t.viewQuery;
                  if (null !== l && ei(2, l, r), !i)
                    if (o) {
                      const n = t.viewCheckHooks;
                      null !== n && Tn(e, n)
                    } else {
                      const n = t.viewHooks;
                      null !== n && An(e, n, 2), In(e, 2)
                    }
                  !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
                      i || (e[2] &= -73),
                      1024&e[2] && (e[2] &= -1025, Xe(e[3], -1))
                } finally {
                  xn()
                }
              }
              function ks(t, e, n, r) {
                const s = e[10], i = !cn(), o = Ke(e);
                try {
                  i && !o && s.begin && s.begin(), o && Es(t, e, r),
                      Cs(t, e, n, r)
                } finally {
                  i && !o && s.end && s.end()
                }
              }
              function Ts(t, e, n, r, s) {
                const i = Sn();
                try {
                  En(-1), 2&r && e.length > Ce && ps(t, e, 0, cn()), n(r, s)
                } finally {
                  En(i)
                }
              }
              function As(t, e, n) {
                en()&&(function(t,e,n,r){const s=n.directiveStart,i=n.directiveEnd;t.firstCreatePass||Kn(n,e),Kr(r,e);const o=n.initialInputs;for(let a=s;a<i;a++){const r=t.data[a],i=Re(r);i&&qs(e,n,r);const l=sr(e,t,a,n);Kr(l,e),null!==o&&Qs(0,a-s,l,r,0,o),i&&(We(n.index,e)[8]=l)}}(t,e,n,qe(n,e)),128==(128&n.flags)&&function(t,e,n){const r=n.directiveStart,s=n.directiveEnd,i=t.expandoInstructions,o=t.firstCreatePass,a=n.index-Ce,l=tn.lFrame.currentDirectiveIndex;try{En(a);for(let n=r;n<s;n++){const r=t.data[n],s=e[n];pn(n),null!==r.hostBindings||0!==r.hostVars||null!==r.hostAttrs?Us(r,s):o&&i.push(null)}}finally{En(-1),pn(l)}}(t,e,n))
              }
              function Is(t, e, n = qe) {
                const r = e.localNames;
                if (null !== r) {
                  let s = e.index + 1;
                  for (let i = 0; i < r.length; i += 2) {
                    const o = r[i + 1], a = -1 === o ? n(e, t) : t[o];
                    t[s++] = a
                  }
                }
              }
              function Os(t) {
                const e = t.tView;
                return null === e || e.incompleteFirstPass
                           ? t.tView = Ps(1, -1, t.template, t.decls, t.vars,
                                          t.directiveDefs, t.pipeDefs,
                                          t.viewQuery, t.schemas, t.consts)
                           : e
              }
              function Ps(t, e, n, r, s, i, o, a, l, c) {
                const u = Ce + r, h = u + s, d = function(t, e) {
                  const n = [];
                  for (let r = 0; r < e; r++)
                    n.push(r < t ? null : as);
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
                  directiveRegistry : "function" == typeof i ? i() : i,
                  pipeRegistry : "function" == typeof o ? o() : o,
                  firstChild : null,
                  schemas : l,
                  consts : p,
                  incompleteFirstPass : !1
                }
              }
              function Rs(t, e, n, r) {
                const s = ri(e);
                s.push(n), t.firstCreatePass && function(t) {
                  return t.cleanup || (t.cleanup = [])
                }(t).push(r, s.length - 1)
              }
              function Ls(t, e, n, r, s, i) {
                return {
                  type: n, index: r, injectorIndex: e ? e.injectorIndex : -1,
                      directiveStart: -1, directiveEnd: -1,
                      directiveStylingLast: -1, propertyBindings: null,
                      flags: 0, providerIndexes: 0, tagName: s, attrs: i,
                      mergedAttrs: null, localNames: null,
                      initialInputs: void 0, inputs: null, outputs: null,
                      tViews: null, next: null, projectionNext: null,
                      child: null, parent: e, projection: null, styles: null,
                      stylesWithoutHost: null, residualStyles: void 0,
                      classes: null, classesWithoutHost: null,
                      residualClasses: void 0, classBindings: 0,
                      styleBindings: 0
                }
              }
              function Ns(t, e, n) {
                for (let r in t)
                  if (t.hasOwnProperty(r)) {
                    const s = t[r];
                    (n = null === n ? {} : n).hasOwnProperty(r)
                        ? n[r].push(e, s)
                        : n[r] = [ e, s ]
                  }
                return n
              }
              function Ds(t, e, n, r, s, i, o, a) {
                const l = qe(e, n);
                let c, u = e.inputs;
                var h;
                !a && null != u && (c = u[r])
                    ? (ii(t, n, c, r, s), Oe(e) &&
                                              function(t, e) {
                                                const n = We(e, t);
                                                16&n[2] || (n[2] |= 64)
                                              }(n, e.index))
                    : 3 === e.type &&
                          (r = "class" === (h = r)
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
                           s = null != o ? o(s, e.tagName || "", r) : s,
                           Be(i) ? i.setProperty(l, r, s)
                                 : Dn(r) || (l.setProperty ? l.setProperty(r, s)
                                                           : l[r] = s))
              }
              function Ms(t, e, n, r) {
                let s = !1;
                if (en()) {
                  const i = function(t, e, n) {
                    const r = t.directiveRegistry;
                    let s = null;
                    if (r)
                      for (let i = 0; i < r.length; i++) {
                        const o = r[i];
                        ss(n, o.selectors, !1) &&
                            (s || (s = []), Xn(Kn(n, e), t, o.type),
                             Re(o) ? (Bs(t, n), s.unshift(o)) : s.push(o))
                      }
                    return s
                  }(t, e, n), o = null === r ? null : {"" : -1};
                  if (null !== i) {
                    let r = 0;
                    s = !0, Hs(n, t.data.length, i.length);
                    for (let t = 0; t < i.length; t++) {
                      const e = i[t];
                      e.providersResolver && e.providersResolver(e)
                    }
                    Vs(t, n, i.length);
                    let a = !1, l = !1;
                    for (let s = 0; s < i.length; s++) {
                      const c = i[s];
                      n.mergedAttrs = Mn(n.mergedAttrs, c.hostAttrs),
                      zs(t, e, c), $s(t.data.length - 1, c, o),
                      null !== c.contentQueries && (n.flags |= 8),
                      null === c.hostBindings && null === c.hostAttrs &&
                              0 === c.hostVars ||
                          (n.flags |= 128);
                      const u = c.type.prototype;
                      !a && (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                          ((t.preOrderHooks || (t.preOrderHooks = []))
                               .push(n.index - Ce),
                           a = !0),
                          l || !u.ngOnChanges && !u.ngDoCheck ||
                              ((t.preOrderCheckHooks ||
                                (t.preOrderCheckHooks = []))
                                   .push(n.index - Ce),
                               l = !0),
                          js(t, c), r += c.hostVars
                    }
                    !function(t, e) {
                      const n = e.directiveEnd, r = t.data, s = e.attrs, i = [];
                      let o = null, a = null;
                      for (let l = e.directiveStart; l < n; l++) {
                        const t = r[l], n = t.inputs,
                              c = null === s || Xr(e) ? null : Ws(n, s);
                        i.push(c), o = Ns(n, l, o), a = Ns(t.outputs, l, a)
                      }
                      null !== o &&
                          (o.hasOwnProperty("class") && (e.flags |= 16),
                           o.hasOwnProperty("style") && (e.flags |= 32)),
                          e.initialInputs = i, e.inputs = o, e.outputs = a
                    }(t, n),
                        Fs(t, e, r)
                  }
                  o && function(t, e, n) {
                    if (e) {
                      const r = t.localNames = [];
                      for (let t = 0; t < e.length; t += 2) {
                        const s = n[e[t + 1]];
                        if (null == s)
                          throw new Error(
                              `Export of name '${e[t + 1]}' not found!`);
                        r.push(e[t], s)
                      }
                    }
                  }(n, r, o)
                }
                return n.mergedAttrs = Mn(n.mergedAttrs, n.attrs), s
              }
              function js(t, e) {
                const n = t.expandoInstructions;
                n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars)
              }
              function Fs(t, e, n) {
                for (let r = 0; r < n; r++)
                  e.push(as), t.blueprint.push(as), t.data.push(null)
              }
              function Us(t, e) {
                null !== t.hostBindings && t.hostBindings(1, e)
              }
              function Vs(t, e, n) {
                const r = Ce - e.index,
                      s = t.data.length - (1048575 & e.providerIndexes);
                (t.expandoInstructions || (t.expandoInstructions = []))
                    .push(r, s, n)
              }
              function Bs(t, e) {
                e.flags |= 2,
                    (t.components || (t.components = [])).push(e.index)
              }
              function $s(t, e, n) {
                if (n) {
                  if (e.exportAs)
                    for (let r = 0; r < e.exportAs.length; r++)
                      n[e.exportAs[r]] = t;
                  Re(e) && (n[""] = t)
                }
              }
              function Hs(t, e, n) {
                t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n,
                              t.providerIndexes = e
              }
              function zs(t, e, n) {
                t.data.push(n);
                const r = n.factory || (n.factory = Se(n.type)),
                      s = new Rn(r, Re(n), null);
                t.blueprint.push(s), e.push(s)
              }
              function qs(t, e, n) {
                const r = qe(e, t), s = Os(n), i = t[10],
                      o = Ys(t, xs(t, s, null, n.onPush ? 64 : 16, r, e, i,
                                   i.createRenderer(r, n)));
                t[e.index] = o
              }
              function Qs(t, e, n, r, s, i) {
                const o = i[e];
                if (null !== o) {
                  const t = r.setInput;
                  for (let e = 0; e < o.length;) {
                    const s = o[e++], i = o[e++], a = o[e++];
                    null !== t ? r.setInput(n, a, s, i) : n[i] = a
                  }
                }
              }
              function Ws(t, e) {
                let n = null, r = 0;
                for (; r < e.length;) {
                  const s = e[r];
                  if (0 !== s)
                    if (5 !== s) {
                      if ("number" == typeof s)
                        break;
                      t.hasOwnProperty(s) &&
                          (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                          r += 2
                    } else
                      r += 2;
                  else
                    r += 4
                }
                return n
              }
              function Gs(t, e, n, r) {
                return new Array(t, !0, !1, e, null, 0, r, n, null, null)
              }
              function Ks(t, e) {
                const n = We(e, t);
                if (Ze(n)) {
                  const t = n[1];
                  80&n[2] ? Cs(t, n, t.template, n[8])
                          : n[5] > 0 && function t(e) {
                              for (let r = cs(e); null !== r; r = us(r))
                                for (let e = ke; e < r.length; e++) {
                                  const n = r[e];
                                  if (1024 & n[2]) {
                                    const t = n[1];
                                    Cs(t, n, t.template, n[8])
                                  } else
                                    n[5] > 0 && t(n)
                                }
                              const n = e[1].components;
                              if (null !== n)
                                for (let r = 0; r < n.length; r++) {
                                  const s = We(n[r], e);
                                  Ze(s) && s[5] > 0 && t(s)
                                }
                            }(n)
                }
              }
              function Zs(t, e) {
                const n = We(e, t), r = n[1];
                !function(t, e) {
                  for (let n = e.length; n < t.blueprint.length; n++)
                    e.push(t.blueprint[n])
                }(r, n),
                    Es(r, n, n[8])
              }
              function Ys(t, e) {
                return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e
              }
              function Js(t) {
                for (; t;) {
                  t[2] |= 64;
                  const e = ls(t);
                  if (Le(t) && !e)
                    return t;
                  t = e
                }
                return null
              }
              function Xs(t, e, n) {
                const r = e[10];
                r.begin && r.begin();
                try {
                  Cs(t, e, t.template, n)
                } catch (s) {
                  throw si(e, s), s
                } finally {
                  r.end && r.end()
                }
              }
              function ti(t) {
                !function(t) {
                  for (let e = 0; e < t.components.length; e++) {
                    const n = t.components[e], r = Ge(n), s = r[1];
                    ks(s, r, s.template, n)
                  }
                }(t[8])
              }
              function ei(t, e, n) { mn(0), e(t, n) }
              const ni = (() => Promise.resolve(null))();
              function ri(t) { return t[7] || (t[7] = []) }
              function si(t, e) {
                const n = t[9], r = n ? n.get(pr, null) : null;
                r && r.handleError(e)
              }
              function ii(t, e, n, r, s) {
                for (let i = 0; i < n.length;) {
                  const o = n[i++], a = n[i++], l = e[o], c = t.data[o];
                  null !== c.setInput ? c.setInput(l, s, r, a) : l[a] = s
                }
              }
              function oi(t, e) {
                const n = e[3];
                return -1 === t.index ? Ae(n) ? n : null : n
              }
              function ai(t, e) {
                const n = oi(t, e);
                return n ? vi(e[11], n[7]) : null
              }
              function li(t, e, n, r, s) {
                if (null != r) {
                  let i, o = !1;
                  Ae(r) ? i = r : Te(r) && (o = !0, r = r[0]);
                  const a = He(r);
                  0 === t && null !== n ? null == s ? yi(e, n, a) : gi(e, n, a, s || null) : 1 === t && null !== n ? gi(e, n, a, s || null) : 2 === t ? function(t, e, n) {
                    const r = vi(t, e);
                    r && function(t, e, n, r) {
                      Be(t) ? t.removeChild(e, n, r) : e.removeChild(n)
                    }(t, r, e, n)
                  }(e, a, o) : 3 === t && e.destroyNode(a), null != i && function(t, e, n, r, s) {
                    const i = n[7];
                    i !== He(n) && li(e, t, r, i, s);
                    for (let o = ke; o < n.length; o++) {
                      const s = n[o];
                      Ei(s[1], s, t, e, r, i)
                    }
                  }(e, t, i, n, s)
                }
              }
              function ci(t, e, n, r) {
                const s = ai(t.node, e);
                s && Ei(t, e, e[11], n ? 1 : 2, s, r)
              }
              function ui(t, e) {
                const n = t[9], r = n.indexOf(e), s = e[3];
                1024&e[2] && (e[2] &= -1025, Xe(s, -1)), n.splice(r, 1)
              }
              function hi(t, e) {
                if (t.length <= ke)
                  return;
                const n = ke + e, r = t[n];
                if (r) {
                  const s = r[17];
                  null !== s && s !== t && ui(s, r),
                      e > 0 && (t[n - 1][4] = r[4]);
                  const i = ie(t, ke + e);
                  ci(r[1], r, !1, null);
                  const o = i[19];
                  null !== o && o.detachView(i[1]), r[3] = null, r[4] = null,
                                                    r[2] &= -129
                }
                return r
              }
              function di(t, e) {
                if (!(256 & e[2])) {
                  const n = e[11];
                  Be(n) && n.destroyNode && Ei(t, e, n, 3, null, null),
                      function(t) {
                        let e = t[13];
                        if (!e)
                          return fi(t[1], t);
                        for (; e;) {
                          let n = null;
                          if (Te(e))
                            n = e[13];
                          else {
                            const t = e[10];
                            t && (n = t)
                          }
                          if (!n) {
                            for (; e && !e[4] && e !== t;)
                              Te(e) && fi(e[1], e), e = pi(e, t);
                            null === e && (e = t), Te(e) && fi(e[1], e),
                                n = e && e[4]
                          }
                          e = n
                        }
                      }(e)
                }
              }
              function pi(t, e) {
                let n;
                return Te(t) && (n = t[6]) && 2 === n.type ? oi(n, t)
                                                           : t[3] === e ? null
                                                                        : t[3]
              }
              function fi(t, e) {
                if (!(256 & e[2])) {
                  e[2] &= -129, e[2] |= 256, function(t, e) {
                    let n;
                    if (null != t && null != (n = t.destroyHooks))
                      for (let r = 0; r < n.length; r += 2) {
                        const t = e[n[r]];
                        if (!(t instanceof Rn)) {
                          const e = n[r + 1];
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
                      for (let r = 0; r < n.length - 1; r += 2)
                        if ("string" == typeof n[r]) {
                          const s = n[r + 1],
                                i = "function" == typeof s ? s(e) : He(e[s]),
                                o = t[n[r + 2]], a = n[r + 3];
                          "boolean" == typeof a
                              ? i.removeEventListener(n[r], o, a)
                              : a >= 0 ? t[a]() : t[-a].unsubscribe(),
                              r += 2
                        } else
                          n[r].call(t[n[r + 1]]);
                      e[7] = null
                    }
                  }(t, e);
                  const n = e[6];
                  n && 3 === n.type && Be(e[11]) && e[11].destroy();
                  const r = e[17];
                  if (null !== r && Ae(e[3])) {
                    r !== e[3] && ui(r, e);
                    const n = e[19];
                    null !== n && n.detachView(t)
                  }
                }
              }
              function mi(t, e, n) {
                let r = e.parent;
                for (; null != r && (4 === r.type || 5 === r.type);)
                  r = (e = r).parent;
                if (null == r) {
                  const t = n[6];
                  return 2 === t.type ? ai(t, n) : n[0]
                }
                if (e && 5 === e.type && 4 & e.flags)
                  return qe(e, n).parentNode;
                if (2 & r.flags) {
                  const e = t.data,
                        n = e[e[r.index].directiveStart].encapsulation;
                  if (n !== he.ShadowDom && n !== he.Native)
                    return null
                }
                return qe(r, n)
              }
              function gi(t, e, n, r) {
                Be(t) ? t.insertBefore(e, n, r) : e.insertBefore(n, r, !0)
              }
              function yi(t, e, n) {
                Be(t) ? t.appendChild(e, n) : e.appendChild(n)
              }
              function _i(t, e, n, r) {
                null !== r ? gi(t, e, n, r) : yi(t, e, n)
              }
              function vi(t, e) {
                return Be(t) ? t.parentNode(e) : e.parentNode
              }
              function bi(t, e) {
                if (2 === t.type) {
                  const n = oi(t, e);
                  return null === n ? null : xi(n.indexOf(e, ke) - ke, n)
                }
                return 4 === t.type || 5 === t.type ? qe(t, e) : null
              }
              function wi(t, e, n, r) {
                const s = mi(t, r, e);
                if (null != s) {
                  const t = e[11], i = bi(r.parent || e[6], e);
                  if (Array.isArray(n))
                    for (let e = 0; e < n.length; e++)
                      _i(t, s, n[e], i);
                  else
                    _i(t, s, n, i)
                }
              }
              function xi(t, e) {
                const n = ke + t + 1;
                if (n < e.length) {
                  const t = e[n], r = t[1].firstChild;
                  if (null !== r)
                    return function t(e, n) {
                      if (null !== n) {
                        const r = n.type;
                        if (3 === r)
                          return qe(n, e);
                        if (0 === r)
                          return xi(-1, e[n.index]);
                        if (4 === r || 5 === r) {
                          const r = n.child;
                          if (null !== r)
                            return t(e, r);
                          {
                            const t = e[n.index];
                            return Ae(t) ? xi(-1, t) : He(t)
                          }
                        }
                        {
                          const r = e[16], s = r[6], i = ls(r),
                                o = s.projection[n.projection];
                          return null != o ? t(i, o) : t(e, n.next)
                        }
                      }
                      return null
                    }(t, r)
                }
                return e[7]
              }
              function Si(t, e, n, r, s, i, o) {
                for (; null != n;) {
                  const a = r[n.index], l = n.type;
                  o && 0 === e && (a && Kr(He(a), r), n.flags |= 4),
                      64 != (64 & n.flags) &&
                          (4 === l || 5 === l ? (Si(t, e, n.child, r, s, i, !1),
                                                 li(e, t, s, a, i))
                                              : 1 === l ? Ci(t, e, r, n, s, i)
                                                        : li(e, t, s, a, i)),
                      n = o ? n.projectionNext : n.next
                }
              }
              function Ei(t, e, n, r, s, i) {
                Si(n, r, t.node.child, e, s, i, !1)
              }
              function Ci(t, e, n, r, s, i) {
                const o = n[16], a = o[6].projection[r.projection];
                if (Array.isArray(a))
                  for (let l = 0; l < a.length; l++)
                    li(e, t, s, a[l], i);
                else
                  Si(t, e, a, o[3], s, i, !0)
              }
              function ki(t, e, n) {
                Be(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n
              }
              function Ti(t, e, n) {
                Be(t) ? "" === n ? t.removeAttribute(e, "class")
                                 : t.setAttribute(e, "class", n)
                      : e.className = n
              }
              class Ai {
                constructor(t, e) {
                  this._lView = t, this._cdRefInjectingView = e,
                  this._appRef = null, this._viewContainerRef = null
                }
                get rootNodes() {
                  const t = this._lView;
                  return null == t[0] ? function t(e, n, r, s, i = !1) {
                    for (; null !== r;) {
                      const o = n[r.index];
                      if (null !== o && s.push(He(o)), Ae(o))
                        for (let e = ke; e < o.length; e++) {
                          const n = o[e], r = n[1].firstChild;
                          null !== r && t(n[1], n, r, s)
                        }
                      const a = r.type;
                      if (4 === a || 5 === a)
                        t(e, n, r.child, s);
                      else if (1 === a) {
                        const e = n[16], i = e[6].projection[r.projection];
                        if (Array.isArray(i))
                          s.push(...i);
                        else {
                          const n = ls(e);
                          t(n[1], n, i, s, !0)
                        }
                      }
                      r = i ? r.projectionNext : r.next
                    }
                    return s
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
                  di(this._lView[1], this._lView)
                }
                onDestroy(t) { Rs(this._lView[1], this._lView, null, t) }
                markForCheck() { Js(this._cdRefInjectingView || this._lView) }
                detach() { this._lView[2] &= -129 }
                reattach() { this._lView[2] |= 128 }
                detectChanges() {
                  Xs(this._lView[1], this._lView, this.context)
                }
                checkNoChanges() {
                  !function(t, e, n) {
                    un(!0);
                    try {
                      Xs(t, e, n)
                    } finally {
                      un(!1)
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
                  Ei(this._lView[1], t = this._lView, t[11], 2, null, null)
                }
                attachToAppRef(t) {
                  if (this._viewContainerRef)
                    throw new Error(
                        "This view is already attached to a ViewContainer!");
                  this._appRef = t
                }
              }
              class Ii extends Ai {
                constructor(t) { super(t), this._view = t }
                detectChanges() { ti(this._view) }
                checkNoChanges() {
                  !function(t) {
                    un(!0);
                    try {
                      ti(t)
                    } finally {
                      un(!1)
                    }
                  }(this._view)
                }
                get context() { return null }
              }
              let Oi, Pi, Ri;
              function Li(t, e, n) {
                return Oi || (Oi = class extends t {}), new Oi(qe(e, n))
              }
              function Ni(t, e, n, r) {
                return Pi || (Pi = class extends t {
                         constructor(t, e, n) {
                           super(), this._declarationView = t,
                                    this._declarationTContainer = e,
                                    this.elementRef = n
                         }
                         createEmbeddedView(t) {
                           const e = this._declarationTContainer.tViews,
                                 n = xs(this._declarationView, e, t, 16, null,
                                        e.node);
                           n[17] =
                               this._declarationView[this._declarationTContainer
                                                         .index];
                           const r = this._declarationView[19];
                           return null !== r &&
                                      (n[19] = r.createEmbeddedView(e)),
                                  Es(e, n, t), new Ai(n)
                         }
                       }),
                       0 === n.type ? new Pi(r, n, Li(e, n, r)) : null
              }
              function Di(t, e, n, r) {
                let s;
                Ri || (Ri = class extends t {
                  constructor(t, e, n) {
                    super(), this._lContainer = t, this._hostTNode = e,
                             this._hostView = n
                  }
                  get element() {
                    return Li(e, this._hostTNode, this._hostView)
                  }
                  get injector() {
                    return new ar(this._hostTNode, this._hostView)
                  }
                  get parentInjector() {
                    const t = Jn(this._hostTNode, this._hostView),
                          e = Bn(t, this._hostView), n = function(t, e, n) {
                            if (n.parent && -1 !== n.parent.injectorIndex) {
                              const t = n.parent.injectorIndex;
                              let e = n.parent;
                              for (; null != e.parent &&
                                     t == e.parent.injectorIndex;)
                                e = e.parent;
                              return e
                            }
                            let r = Vn(t), s = e, i = e[6];
                            for (; r > 1;)
                              s = s[15], i = s[6], r--;
                            return i
                          }(t, this._hostView, this._hostTNode);
                    return Fn(t) && null != n ? new ar(n, e)
                                              : new ar(null, this._hostView)
                  }
                  clear() {
                    for (; this.length > 0;)
                      this.remove(this.length - 1)
                  }
                  get(t) {
                    return null !== this._lContainer[8] &&
                               this._lContainer[8][t] ||
                           null
                  }
                  get length() { return this._lContainer.length - ke }
                  createEmbeddedView(t, e, n) {
                    const r = t.createEmbeddedView(e || {});
                    return this.insert(r, n), r
                  }
                  createComponent(t, e, n, r, s) {
                    const i = n || this.parentInjector;
                    if (!s && null == t.ngModule && i) {
                      const t = i.get(ee, null);
                      t && (s = t)
                    }
                    const o = t.create(i, r, void 0, s);
                    return this.insert(o.hostView, e), o
                  }
                  insert(t, e) {
                    const n = t._lView, r = n[1];
                    if (t.destroyed)
                      throw new Error(
                          "Cannot insert a destroyed View in a ViewContainer!");
                    if (this.allocateContainerIfNeeded(), Ae(n[3])) {
                      const e = this.indexOf(t);
                      if (-1 !== e)
                        this.detach(e);
                      else {
                        const e = n[3], r = new Ri(e, e[6], e[3]);
                        r.detach(r.indexOf(t))
                      }
                    }
                    const s = this._adjustIndex(e);
                    return function(t, e, n, r) {
                      const s = ke + r, i = n.length;
                      r > 0 && (n[s - 1][4] = e),
                          r < i - ke ? (e[4] = n[s], se(n, ke + r, e))
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
                    }(r, n, this._lContainer, s),
                           ci(r, n, !0, xi(s, this._lContainer)),
                           t.attachToViewContainerRef(this),
                           se(this._lContainer[8], s, t), t
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
                    const e = this._adjustIndex(t, -1),
                          n = hi(this._lContainer, e);
                    n && (ie(this._lContainer[8], e), di(n[1], n))
                  }
                  detach(t) {
                    this.allocateContainerIfNeeded();
                    const e = this._adjustIndex(t, -1),
                          n = hi(this._lContainer, e);
                    return n && null != ie(this._lContainer[8], e) ? new Ai(n)
                                                                   : null
                  }
                  _adjustIndex(t, e = 0) {
                    return null == t ? this.length + e : t
                  }
                  allocateContainerIfNeeded() {
                    null === this._lContainer[8] && (this._lContainer[8] = [])
                  }
                });
                const i = r[n.index];
                if (Ae(i))
                  s = i;
                else {
                  let t;
                  if (4 === n.type)
                    t = He(i);
                  else if (t = r[11].createComment(""), Le(r)) {
                    const e = r[11], s = qe(n, r);
                    gi(e, vi(e, s), t, function(t, e) {
                      return Be(t) ? t.nextSibling(e) : e.nextSibling
                    }(e, s))
                  } else
                    wi(r[1], r, t, n);
                  r[n.index] = s = Gs(i, r, t, n), Ys(r, s)
                }
                return new Ri(s, n, r)
              }
              let Mi = (() => {
                class t {} return t.__NG_ELEMENT_ID__ = () => ji(),
                t
              })();
              const ji =
                  function(t = !1) {
                return function(t, e, n) {
                  if (!n && Oe(t)) {
                    const n = We(t.index, e);
                    return new Ai(n, n)
                  }
                  return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type ? new Ai(
                                                                                            e[16],
                                                                                            e)
                                                                                      : null
                }(sn(), nn(), t)
              },
                    Fi = Function, Ui = new Ut("Set Injector scope."), Vi = {},
                    Bi = {}, $i = [];
              let Hi = void 0;
              function zi() { return void 0 === Hi && (Hi = new te), Hi }
              function qi(t, e = null, n = null, r) {
                return new Qi(t, n, e || zi(), r)
              }
              class Qi {
                constructor(t, e, n, r = null) {
                  this.parent = n, this.records = new Map,
                  this.injectorDefTypes = new Set, this.onDestroy = new Set,
                  this._destroyed = !1;
                  const s = [];
                  e && re(e, n => this.processProvider(n, t, e)),
                      re([ t ], t => this.processInjectorType(t, [], s)),
                      this.records.set(Vt, Ki(void 0, this));
                  const i = this.records.get(Ui);
                  this.scope = null != i ? i.value : null,
                  this.source = r || ("object" == typeof t ? null : wt(t))
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
                get(t, e = Bt, n = lt.Default) {
                  this.assertNotDestroyed();
                  const r = Wt(this);
                  try {
                    if (!(n & lt.SkipSelf)) {
                      let e = this.records.get(t);
                      if (void 0 === e) {
                        const n = ("function" == typeof (s = t) ||
                                   "object" == typeof s && s instanceof Ut) &&
                                  pt(t);
                        e = n && this.injectableDefInScope(n) ? Ki(Wi(t), Vi)
                                                              : null,
                        this.records.set(t, e)
                      }
                      if (null != e)
                        return this.hydrate(t, e)
                    }
                    return (n & lt.Self ? zi() : this.parent)
                        .get(t, e = n & lt.Optional && e === Bt ? null : e)
                  } catch (i) {
                    if ("NullInjectorError" === i.name) {
                      if ((i.ngTempTokenPath = i.ngTempTokenPath || [])
                              .unshift(wt(t)),
                          r)
                        throw i;
                      return function(t, e, n, r) {
                        const s = t.ngTempTokenPath;
                        throw e[Ht] && s.unshift(e[Ht]),
                            t.message =
                                function(t, e, n, r = null) {
                              t = t && "\n" === t.charAt(0) &&
                                          "\u0275" == t.charAt(1)
                                      ? t.substr(2)
                                      : t;
                              let s = wt(e);
                              if (Array.isArray(e))
                                s = e.map(wt).join(" -> ");
                              else if ("object" == typeof e) {
                                let t = [];
                                for (let n in e)
                                  if (e.hasOwnProperty(n)) {
                                    let r = e[n];
                                    t.push(n + ":" +
                                           ("string" == typeof r
                                                ? JSON.stringify(r)
                                                : wt(r)))
                                  }
                                s = `{${t.join(", ")}}`
                              }
                              return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${
                                  t.replace($t, "\n  ")}`
                            }("\n" + t.message, s, n, r),
                            t.ngTokenPath = s, t.ngTempTokenPath = null, t
                      }(i, t, "R3InjectorError", this.source)
                    }
                    throw i
                  } finally {
                    Wt(r)
                  }
                  var s
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
                  let r = mt(t);
                  const s = null == r && t.ngModule || void 0,
                        i = void 0 === s ? t : s, o = -1 !== n.indexOf(i);
                  if (void 0 !== s && (r = mt(s)), null == r)
                    return !1;
                  if (null != r.imports && !o) {
                    let t;
                    n.push(i);
                    try {
                      re(r.imports,
                         r => {this.processInjectorType(r, e, n) &&
                               (void 0 === t && (t = []), t.push(r))})
                    } finally {
                    }
                    if (void 0 !== t)
                      for (let e = 0; e < t.length; e++) {
                        const {ngModule : n, providers : r} = t[e];
                        re(r, t => this.processProvider(t, n, r || $i))
                      }
                  }
                  this.injectorDefTypes.add(i),
                      this.records.set(i, Ki(r.factory, Vi));
                  const a = r.providers;
                  if (null != a && !o) {
                    const e = t;
                    re(a, t => this.processProvider(t, e, a))
                  }
                  return void 0 !== s && void 0 !== t.providers
                }
                processProvider(t, e, n) {
                  let r = Yi(t = Ct(t)) ? t : Ct(t && t.provide);
                  const s = function(t, e, n) {
                    return Zi(t) ? Ki(void 0, t.useValue) : Ki(Gi(t), Vi)
                  }(t);
                  if (Yi(t) || !0 !== t.multi)
                    this.records.get(r);
                  else {
                    let e = this.records.get(r);
                    e || (e = Ki(void 0, Vi, !0), e.factory = () => Xt(e.multi),
                          this.records.set(r, e)),
                        r = t, e.multi.push(t)
                  }
                  this.records.set(r, s)
                }
                hydrate(t, e) {
                  var n;
                  return e.value === Vi &&
                             (e.value = Bi, e.value = e.factory()),
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
              function Wi(t) {
                const e = pt(t), n = null !== e ? e.factory : Se(t);
                if (null !== n)
                  return n;
                const r = mt(t);
                if (null !== r)
                  return r.factory;
                if (t instanceof Ut)
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
                        return console.warn(
                                   `DEPRECATED: DI is instantiating a token "${
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
              function Gi(t, e, n) {
                let r = void 0;
                if (Yi(t)) {
                  const e = Ct(t);
                  return Se(e) || Wi(e)
                }
                if (Zi(t))
                  r = () => Ct(t.useValue);
                else if ((s = t) && s.useFactory)
                  r = () => t.useFactory(...Xt(t.deps || []));
                else if (function(t) { return !(!t || !t.useExisting) }(t))
                  r = () => Zt(Ct(t.useExisting));
                else {
                  const e = Ct(t && (t.useClass || t.provide));
                  if (!function(t) { return !!t.deps }(t))
                    return Se(e) || Wi(e);
                  r = () => new e(...Xt(t.deps))
                }
                var s;
                return r
              }
              function Ki(t, e, n = !1) {
                return { factory: t, value: e, multi: n ? [] : void 0 }
              }
              function Zi(t) {
                return null !== t && "object" == typeof t && zt in t
              }
              function Yi(t) { return "function" == typeof t }
              const Ji = function(t, e, n) {
                return function(t, e = null, n = null, r) {
                  const s = qi(t, e, n, r);
                  return s._resolveInjectorDefTypes(), s
                }({name : n}, e, t, n)
              };
              let Xi = (() => {
                class t {
                  static create(t, e) {
                    return Array.isArray(t)
                               ? Ji(t, e, "")
                               : Ji(t.providers, t.parent, t.name || "")
                  }
                } return t.THROW_IF_NOT_FOUND = Bt,
                t.NULL = new te,
                t.\u0275prov =
                    ht({token : t, providedIn : "any", factory : () => Zt(Vt)}),
                t.__NG_ELEMENT_ID__ = -1,
                t
              })();
              const to = new Ut("AnalyzeForEntryComponents");
              function eo(t, e, n) {
                let r = n ? t.styles : null, s = n ? t.classes : null, i = 0;
                if (null !== e)
                  for (let o = 0; o < e.length; o++) {
                    const t = e[o];
                    "number" == typeof t
                        ? i = t
                        : 1 == i
                              ? s = xt(s, t)
                              : 2 == i && (r = xt(r, t + ": " + e[++o] + ";"))
                  }
                n ? t.styles = r : t.stylesWithoutHost = r,
                    n ? t.classes = s : t.classesWithoutHost = s
              }
              function no(t, e) {
                const n = Ge(t)[1], r = n.data.length - 1;
                kn(n, {directiveStart : r, directiveEnd : r + 1})
              }
              function ro(t) {
                let e = Object.getPrototypeOf(t.type.prototype).constructor,
                    n = !0;
                const r = [ t ];
                for (; e;) {
                  let s = void 0;
                  if (Re(t))
                    s = e.\u0275cmp || e.\u0275dir;
                  else {
                    if (e.\u0275cmp)
                      throw new Error("Directives cannot inherit Components");
                    s = e.\u0275dir
                  }
                  if (s) {
                    if (n) {
                      r.push(s);
                      const e = t;
                      e.inputs = so(t.inputs),
                      e.declaredInputs = so(t.declaredInputs),
                      e.outputs = so(t.outputs);
                      const n = s.hostBindings;
                      n && ao(t, n);
                      const i = s.viewQuery, o = s.contentQueries;
                      if (i && io(t, i), o && oo(t, o), ut(t.inputs, s.inputs),
                          ut(t.declaredInputs, s.declaredInputs),
                          ut(t.outputs, s.outputs), Re(s) && s.data.animation) {
                        const e = t.data;
                        e.animation =
                            (e.animation || []).concat(s.data.animation)
                      }
                    }
                    const e = s.features;
                    if (e)
                      for (let r = 0; r < e.length; r++) {
                        const s = e[r];
                        s && s.ngInherit && s(t), s === ro && (n = !1)
                      }
                  }
                  e = Object.getPrototypeOf(e)
                }
                !function(t) {
                  let e = 0, n = null;
                  for (let r = t.length - 1; r >= 0; r--) {
                    const s = t[r];
                    s.hostVars = e += s.hostVars,
                    s.hostAttrs = Mn(s.hostAttrs, n = Mn(n, s.hostAttrs))
                  }
                }(r)
              }
              function so(t) { return t === de ? {} : t === pe ? [] : t }
              function io(t, e) {
                const n = t.viewQuery;
                t.viewQuery = n ? (t, r) => { e(t, r), n(t, r) } : e
              }
              function oo(t, e) {
                const n = t.contentQueries;
                t.contentQueries =
                    n ? (t, r, s) => { e(t, r, s), n(t, r, s) } : e
              }
              function ao(t, e) {
                const n = t.hostBindings;
                t.hostBindings = n ? (t, r) => { e(t, r), n(t, r) } : e
              }
              let lo = null;
              function co() {
                if (!lo) {
                  const t = Pt.Symbol;
                  if (t && t.iterator)
                    lo = t.iterator;
                  else {
                    const t = Object.getOwnPropertyNames(Map.prototype);
                    for (let e = 0; e < t.length; ++e) {
                      const n = t[e];
                      "entries" !== n && "size" !== n &&
                          Map.prototype[n] === Map.prototype.entries && (lo = n)
                    }
                  }
                }
                return lo
              }
              function uo(t) {
                return !!ho(t) &&
                       (Array.isArray(t) || !(t instanceof Map) && co() in t)
              }
              function ho(t) {
                return null !== t &&
                       ("function" == typeof t || "object" == typeof t)
              }
              function po(t, e, n) {
                return !Object.is(t[e], n) && (t[e] = n, !0)
              }
              function fo(t, e, n, r) {
                const s = nn();
                return po(s, hn(), e) && (rn(), function(t, e, n, r, s, i) {
                         const o = qe(t, e), a = e[11];
                         if (null == r)
                           Be(a) ? a.removeAttribute(o, n, i)
                                 : o.removeAttribute(n);
                         else {
                           const e =
                               null == s ? $n(r) : s(r, t.tagName || "", n);
                           Be(a) ? a.setAttribute(o, n, e, i)
                                 : i ? o.setAttributeNS(i, n, e)
                                     : o.setAttribute(n, e)
                         }
                       }(Cn(), s, t, e, n, r)), fo
              }
              function mo(t, e, n, r, s, i, o, a) {
                const l = nn(), c = rn(), u = t + Ce,
                      h = c.firstCreatePass ? function(t, e, n, r, s, i, o, a, l) {
                        const c = e.consts,
                              u = Ss(e, n[6], t, 0, o || null, Ye(c, a));
                        Ms(e, n, u, Ye(c, l)), kn(e, u);
                        const h = u.tViews =
                            Ps(2, -1, r, s, i, e.directiveRegistry,
                               e.pipeRegistry, null, e.schemas, c),
                              d = Ls(0, null, 2, -1, null, null);
                        return d.injectorIndex = u.injectorIndex, h.node = d,
                               null !== e.queries &&
                                   (e.queries.template(e, u),
                                    h.queries = e.queries.embeddedTView(u)),
                               u
                      }(t, c, l, e, n, r, s, i, o) : c.data[u];
                on(h, !1);
                const d = l[11].createComment("");
                wi(c, l, d, h), Kr(d, l), Ys(l, l[u] = Gs(d, l, d, h)),
                    Pe(h) && As(c, l, h), null != o && Is(l, h, a)
              }
              function go(t, e = lt.Default) {
                const n = nn();
                return null == n ? Zt(t, e) : tr(sn(), n, Ct(t), e)
              }
              function yo(t) {
                return function(t, e) {
                  if ("class" === e)
                    return t.classes;
                  if ("style" === e)
                    return t.styles;
                  const n = t.attrs;
                  if (n) {
                    const t = n.length;
                    let r = 0;
                    for (; r < t;) {
                      const s = n[r];
                      if (Nn(s))
                        break;
                      if (0 === s)
                        r += 2;
                      else if ("number" == typeof s)
                        for (r++; r < t && "string" == typeof n[r];)
                          r++;
                      else {
                        if (s === e)
                          return n[r + 1];
                        r += 2
                      }
                    }
                  }
                  return null
                }(sn(), t)
              }
              function _o(t, e, n) {
                const r = nn();
                return po(r, hn(), e) && Ds(rn(), Cn(), r, t, e, r[11], n, !1),
                       _o
              }
              function vo(t, e, n, r, s) {
                const i = s ? "class" : "style";
                ii(t, n, e.inputs[i], i, r)
              }
              function bo(t, e, n, r) {
                const s = nn(), i = rn(), o = Ce + t, a = s[11],
                      l = s[o] = ws(e, a, tn.lFrame.currentNamespace),
                      c = i.firstCreatePass ? function(t, e, n, r, s, i, o) {
                        const a = e.consts, l = Ye(a, i),
                              c = Ss(e, n[6], t, 3, s, l);
                        return Ms(e, n, c, Ye(a, o)),
                               null !== c.attrs && eo(c, c.attrs, !1),
                               null !== c.mergedAttrs &&
                                   eo(c, c.mergedAttrs, !0),
                               null !== e.queries &&
                                   e.queries.elementStart(e, c),
                               c
                      }(t, i, s, 0, e, n, r) : i.data[o];
                on(c, !0);
                const u = c.mergedAttrs;
                null !== u && Ln(a, l, u);
                const h = c.classes;
                null !== h && Ti(a, l, h);
                const d = c.styles;
                null !== d && ki(a, l, d), wi(i, s, l, c),
                    0 === tn.lFrame.elementDepthCount && Kr(l, s),
                    tn.lFrame.elementDepthCount++,
                    Pe(c) && (As(i, s, c), function(t, e, n) {
                      if (Ie(e)) {
                        const r = e.directiveEnd;
                        for (let s = e.directiveStart; s < r; s++) {
                          const e = t.data[s];
                          e.contentQueries && e.contentQueries(1, n[s], s)
                        }
                      }
                    }(i, c, s)), null !== r && Is(s, c)
              }
              function wo() {
                let t = sn();
                an() ? ln() : (t = t.parent, on(t, !1));
                const e = t;
                tn.lFrame.elementDepthCount--;
                const n = rn();
                n.firstCreatePass &&
                    (kn(n, t), Ie(t) && n.queries.elementEnd(t)),
                    null != e.classesWithoutHost &&
                        function(t) { return 0 != (16 & t.flags) }(e) &&
                        vo(n, e, nn(), e.classesWithoutHost, !0),
                    null != e.stylesWithoutHost &&
                        function(t) { return 0 != (32 & t.flags) }(e) &&
                        vo(n, e, nn(), e.stylesWithoutHost, !1)
              }
              function xo(t, e, n, r) { bo(t, e, n, r), wo() }
              function So(t) { return !!t && "function" == typeof t.then }
              function Eo(t, e, n = !1, r) {
                const s = nn(), i = rn(), o = sn();
                return function(t, e, n, r, s, i, o = !1, a) {
                  const l = Pe(r),
                        c = t.firstCreatePass &&
                            (t.cleanup || (t.cleanup = [])),
                        u = ri(e);
                  let h = !0;
                  if (3 === r.type) {
                    const d = qe(r, e), p = a ? a(d) : de, f = p.target || d,
                          m = u.length,
                          g = a ? t => a(He(t[r.index])).target : r.index;
                    if (Be(n)) {
                      let o = null;
                      if (!a && l && (o = function(t, e, n, r) {
                            const s = t.cleanup;
                            if (null != s)
                              for (let i = 0; i < s.length - 1; i += 2) {
                                const t = s[i];
                                if (t === n && s[i + 1] === r) {
                                  const t = e[7], n = s[i + 2];
                                  return t.length > n ? t[n] : null
                                }
                                "string" == typeof t && (i += 2)
                              }
                            return null
                          }(t, e, s, r.index)), null !== o)
                        (o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i,
                                                   o.__ngLastListenerFn__ = i,
                                                   h = !1;
                      else {
                        i = ko(r, e, i, !1);
                        const t = n.listen(p.name || f, s, i);
                        u.push(i, t), c && c.push(s, g, m, m + 1)
                      }
                    } else
                      i = ko(r, e, i, !0), f.addEventListener(s, i, o),
                      u.push(i), c && c.push(s, g, m, o)
                  }
                  const d = r.outputs;
                  let p;
                  if (h && null !== d && (p = d[s])) {
                    const t = p.length;
                    if (t)
                      for (let n = 0; n < t; n += 2) {
                        const t = e[p[n]][p[n + 1]].subscribe(i), o = u.length;
                        u.push(i, t), c && c.push(s, r.index, o, -(o + 1))
                      }
                  }
                }(i, s, s[11], o, t, e, n, r),
                       Eo
              }
              function Co(t, e, n) {
                try {
                  return !1 !== e(n)
                } catch (r) {
                  return si(t, r), !1
                }
              }
              function ko(t, e, n, r) {
                return function s(i) {
                  if (i === Function)
                    return n;
                  const o = 2 & t.flags ? We(t.index, e) : e;
                  0 == (32 & e[2]) && Js(o);
                  let a = Co(e, n, i), l = s.__ngNextListenerFn__;
                  for (; l;)
                    a = Co(e, l, i) && a, l = l.__ngNextListenerFn__;
                  return r && !1 === a &&
                             (i.preventDefault(), i.returnValue = !1),
                         a
                }
              }
              function To(t = 1) {
                return function(t) {
                  return (tn.lFrame.contextLView = function(t, e) {
                    for (; t > 0;)
                      e = e[15], t--;
                    return e
                  }(t, tn.lFrame.contextLView))[8]
                }(t)
              }
              const Ao = [];
              function Io(t, e, n, r, s) {
                const i = t[n + 1], o = null === e;
                let a = r ? ms(i) : ys(i), l = !1;
                for (; 0 !== a && (!1 === l || o);) {
                  const n = t[a + 1];
                  Oo(t[a], e) && (l = !0, t[a + 1] = r ? vs(n) : gs(n)),
                      a = r ? ms(n) : ys(n)
                }
                l && (t[n + 1] = r ? gs(i) : vs(i))
              }
              function Oo(t, e) {
                return null === t || null == e ||
                       (Array.isArray(t) ? t[1] : t) === e ||
                       !(!Array.isArray(t) || "string" != typeof e) &&
                           ce(t, e) >= 0
              }
              function Po(t, e) {
                return function(t, e, n, r) {
                  const s = nn(), i = rn(), o = function(t) {
                    const e = tn.lFrame, n = e.bindingIndex;
                    return e.bindingIndex = e.bindingIndex + 2, n
                  }();
                  i.firstUpdatePass &&
                      function(t, e, n, r) {
                        const s = t.data;
                        if (null === s[n + 1]) {
                          const i = s[Sn() + Ce],
                                o = function(
                                    t, e) { return e >= t.expandoStartIndex }(
                                    t, n);
                          (function(t, e) { return 0 != (16 & t.flags) })(i) &&
                              null === e && !o && (e = !1),
                              e = function(t, e, n, r) {
                                const s = function(t) {
                                  const e = tn.lFrame.currentDirectiveIndex;
                                  return -1 === e ? null : t[e]
                                }(t);
                                let i = e.residualClasses;
                                if (null === s)
                                  0 === e.classBindings &&
                                      (n = Lo(n = Ro(null, t, e, n, r), e.attrs,
                                              r),
                                       i = null);
                                else {
                                  const o = e.directiveStylingLast;
                                  if (-1 === o || t[o] !== s)
                                    if (n = Ro(s, t, e, n, r), null === i) {
                                      let n = function(t, e, n) {
                                        const r = e.classBindings;
                                        if (0 !== ys(r))
                                          return t[ms(r)]
                                      }(t, e);
                                      void 0 !== n && Array.isArray(n) &&
                                          (n = Ro(null, t, e, n[1], r),
                                           n = Lo(n, e.attrs, r),
                                           function(t, e, n, r) {
                                             t[ms(e.classBindings)] = r
                                           }(t, e, 0, n))
                                    } else
                                      i = function(t, e, n) {
                                        let r = void 0;
                                        const s = e.directiveEnd;
                                        for (let i = 1 + e.directiveStylingLast;
                                             i < s; i++)
                                          r = Lo(r, t[i].hostAttrs, true);
                                        return Lo(r, e.attrs, true)
                                      }(t, e)
                                }
                                return void 0 !== i && (e.residualClasses = i),
                                       n
                              }(s, i, e, r), function(t, e, n, r, s, i) {
                                let o = e.classBindings, a = ms(o), l = ys(o);
                                t[r] = n;
                                let c, u = !1;
                                if (Array.isArray(n)) {
                                  const t = n;
                                  c = t[1],
                                  (null === c || ce(t, c) > 0) && (u = !0)
                                } else
                                  c = n;
                                if (s)
                                  if (0 !== l) {
                                    const e = ms(t[a + 1]);
                                    t[r + 1] = fs(e, a),
                                          0 !== e &&
                                              (t[e + 1] = _s(t[e + 1], r)),
                                          t[a + 1] = 131071 & t[a + 1] | r << 17
                                  } else
                                    t[r + 1] = fs(a, 0),
                                          0 !== a &&
                                              (t[a + 1] = _s(t[a + 1], r)),
                                          a = r;
                                else
                                  t[r + 1] = fs(l, 0),
                                        0 === a ? a = r
                                                : t[l + 1] = _s(t[l + 1], r),
                                        l = r;
                                u && (t[r + 1] = gs(t[r + 1])), Io(t, c, r, !0),
                                    Io(t, c, r, !1),
                                    function(t, e, n, r, s) {
                                      const i = t.residualClasses;
                                      null != i && "string" == typeof e &&
                                          ce(i, e) >= 0 &&
                                          (n[r + 1] = vs(n[r + 1]))
                                    }(e, c, t, r),
                                    o = fs(a, l), e.classBindings = o
                              }(s, i, e, n, o)
                        }
                      }(i, t, o, true),
                      e !== as && po(s, o, e) &&
                          function(t, e, n, r, s, i, o, a) {
                            if (3 !== e.type)
                              return;
                            const l = t.data, c = l[a + 1];
                            Do(1 == (1 & c) ? No(l, e, n, s, ys(c), o)
                                            : void 0) ||
                                (Do(i) || function(t) { return 2 == (2 & t) }(
                                              c) &&
                                              (i = No(l, null, n, s, a, o)),
                                 function(t, e, n, r, s) {
                                   const i = Be(t);
                                   s ? i ? t.addClass(n, r) : n.classList.add(r)
                                     : i ? t.removeClass(n, r)
                                         : n.classList.remove(r)
                                 }(r, 0, ze(Sn(), n), s, i))
                          }(i, i.data[Sn() + Ce], s, s[11], t,
                            s[o + 1] = function(t, e) {
                              return null == t || "object" == typeof t &&
                                                      (t = wt(br(t))),
                                     t
                            }(e), true, o)
                }(t, e),
                       Po
              }
              function Ro(t, e, n, r, s) {
                let i = null;
                const o = n.directiveEnd;
                let a = n.directiveStylingLast;
                for (-1 === a ? a = n.directiveStart : a++;
                     a < o && (i = e[a], r = Lo(r, i.hostAttrs, s), i !== t);)
                  a++;
                return null !== t && (n.directiveStylingLast = a), r
              }
              function Lo(t, e, n) {
                const r = n ? 1 : 2;
                let s = -1;
                if (null !== e)
                  for (let i = 0; i < e.length; i++) {
                    const o = e[i];
                    "number" == typeof o
                        ? s = o
                        : s === r && (Array.isArray(t) ||
                                          (t = void 0 === t ? [] : [ "", t ]),
                                      ae(t, o, !!n || e[++i]))
                  }
                return void 0 === t ? null : t
              }
              function No(t, e, n, r, s, i) {
                const o = null === e;
                let a = void 0;
                for (; s > 0;) {
                  const e = t[s], i = Array.isArray(e), l = i ? e[1] : e,
                        c = null === l;
                  let u = n[s + 1];
                  u === as && (u = c ? Ao : void 0);
                  let h = c ? le(u, r) : l === r ? u : void 0;
                  if (i && !Do(h) && (h = le(e, r)), Do(h) && (a = h, o))
                    return a;
                  const d = t[s + 1];
                  s = o ? ms(d) : ys(d)
                }
                if (null !== e) {
                  let t = i ? e.residualClasses : e.residualStyles;
                  null != t && (a = le(t, r))
                }
                return a
              }
              function Do(t) { return void 0 !== t }
              function Mo(t, e = "") {
                const n = nn(), r = rn(), s = t + Ce,
                      i = r.firstCreatePass ? Ss(r, n[6], t, 3, null, null)
                                            : r.data[s],
                      o = n[s] = function(t, e) {
                        return Be(e) ? e.createText(t) : e.createTextNode(t)
                      }(e, n[11]);
                wi(r, n, o, i), on(i, !1)
              }
              function jo(t) { return Fo("", t, ""), jo }
              function Fo(t, e, n) {
                const r = nn(),
                      s = function(
                          t, e, n,
                          r) { return po(t, hn(), n) ? e + $n(n) + r : as }(
                          r, t, e, n);
                return s !== as && function(t, e, n) {
                  const r = ze(e, t), s = t[11];
                  Be(s) ? s.setValue(r, n) : r.textContent = n
                }(r, Sn(), s), Fo
              }
              function Uo(t, e, n) {
                const r = nn();
                return po(r, hn(), e) && Ds(rn(), Cn(), r, t, e, r[11], n, !0),
                       Uo
              }
              function Vo(t, e, n, r, s) {
                if (t = Ct(t), Array.isArray(t))
                  for (let i = 0; i < t.length; i++)
                    Vo(t[i], e, n, r, s);
                else {
                  const i = rn(), o = nn();
                  let a = Yi(t) ? t : Ct(t.provide), l = Gi(t);
                  const c = sn(), u = 1048575 & c.providerIndexes,
                        h = c.directiveStart, d = c.providerIndexes >> 20;
                  if (Yi(t) || !t.multi) {
                    const r = new Rn(l, s, go), p = Ho(a, e, s ? u : u + d, h);
                    -1 === p ? (Xn(Kn(c, o), i, a), Bo(i, t, e.length),
                                e.push(a), c.directiveStart++, c.directiveEnd++,
                                s && (c.providerIndexes += 1048576), n.push(r),
                                o.push(r))
                             : (n[p] = r, o[p] = r)
                  } else {
                    const p = Ho(a, e, u + d, h), f = Ho(a, e, u, u + d),
                          m = p >= 0 && n[p], g = f >= 0 && n[f];
                    if (s && !g || !s && !m) {
                      Xn(Kn(c, o), i, a);
                      const u = function(t, e, n, r, s) {
                        const i = new Rn(t, n, go);
                        return i.multi = [], i.index = e,
                               i.componentProviders = 0, $o(i, s, r && !n), i
                      }(s ? qo : zo, n.length, s, r, l);
                      !s && g && (n[f].providerFactory = u),
                          Bo(i, t, e.length, 0), e.push(a), c.directiveStart++,
                          c.directiveEnd++, s && (c.providerIndexes += 1048576),
                          n.push(u), o.push(u)
                    } else
                      Bo(i, t, p > -1 ? p : f, $o(n[s ? f : p], l, !s && r));
                    !s && r && g && n[f].componentProviders++
                  }
                }
              }
              function Bo(t, e, n, r) {
                const s = Yi(e);
                if (s || e.useClass) {
                  const i = (e.useClass || e).prototype.ngOnDestroy;
                  if (i) {
                    const o = t.destroyHooks || (t.destroyHooks = []);
                    if (!s && e.multi) {
                      const t = o.indexOf(n);
                      -1 === t ? o.push(n, [ r, i ]) : o[t + 1].push(r, i)
                    } else
                      o.push(n, i)
                  }
                }
              }
              function $o(t, e, n) {
                return n && t.componentProviders++, t.multi.push(e) - 1
              }
              function Ho(t, e, n, r) {
                for (let s = n; s < r; s++)
                  if (e[s] === t)
                    return s;
                return -1
              }
              function zo(t, e, n, r) { return Qo(this.multi, []) }
              function qo(t, e, n, r) {
                const s = this.multi;
                let i;
                if (this.providerFactory) {
                  const t = this.providerFactory.componentProviders,
                        e = sr(n, n[1], this.providerFactory.index, r);
                  i = e.slice(0, t), Qo(s, i);
                  for (let n = t; n < e.length; n++)
                    i.push(e[n])
                } else
                  i = [], Qo(s, i);
                return i
              }
              function Qo(t, e) {
                for (let n = 0; n < t.length; n++)
                  e.push((0, t[n])());
                return e
              }
              function Wo(t, e = []) {
                return n => {
                  n.providersResolver = (n, r) => function(t, e, n) {
                    const r = rn();
                    if (r.firstCreatePass) {
                      const s = Re(t);
                      Vo(n, r.data, r.blueprint, s, !0),
                          Vo(e, r.data, r.blueprint, s, !1)
                    }
                  }(n, r ? r(t) : t, e)
                }
              }
              class Go {}
              class Ko {
                resolveComponentFactory(t) {
                  throw function(t) {
                    const e = Error(`No component factory found for ${
                        wt(t)}. Did you add it to @NgModule.entryComponents?`);
                    return e.ngComponent = t, e
                  }(t)
                }
              }
              let Zo = (() => {class t {} return t.NULL = new Ko, t})(),
                  Yo = (() => {
                    class t {
                      constructor(t) { this.nativeElement = t }
                    } return t.__NG_ELEMENT_ID__ = () => Jo(t),
                    t
                  })();
              const Jo = function(t) { return Li(t, sn(), nn()) };
              class Xo {}
              var ta = function(t) {
                return t[t.Important = 1] = "Important",
                                       t[t.DashCase = 2] = "DashCase", t
              }({});
              let ea = (() => {
                class t {} return t.__NG_ELEMENT_ID__ = () => na(),
                t
              })();
              const na = function() {
                const t = nn(), e = We(sn().index, t);
                return function(t) {
                  const e = t[11];
                  if (Be(e))
                    return e;
                  throw new Error(
                      "Cannot inject Renderer2 when the application uses Renderer3!")
                }(Te(e) ? e : t)
              };
              let ra = (() => {
                class t {} return t.\u0275prov =
                    ht({token : t, providedIn : "root", factory : () => null}),
                t
              })();
              class sa {
                constructor(t) {
                  this.full = t, this.major = t.split(".")[0],
                  this.minor = t.split(".")[1],
                  this.patch = t.split(".").slice(2).join(".")
                }
              }
              const ia = new sa("10.1.3");
              class oa {
                constructor() {}
                supports(t) { return uo(t) }
                create(t) { return new la(t) }
              }
              const aa = (t, e) => e;
              class la {
                constructor(t) {
                  this.length = 0, this._linkedRecords = null,
                  this._unlinkedRecords = null, this._previousItHead = null,
                  this._itHead = null, this._itTail = null,
                  this._additionsHead = null, this._additionsTail = null,
                  this._movesHead = null, this._movesTail = null,
                  this._removalsHead = null, this._removalsTail = null,
                  this._identityChangesHead = null,
                  this._identityChangesTail = null, this._trackByFn = t || aa
                }
                forEachItem(t) {
                  let e;
                  for (e = this._itHead; null !== e; e = e._next)
                    t(e)
                }
                forEachOperation(t) {
                  let e = this._itHead, n = this._removalsHead, r = 0, s = null;
                  for (; e || n;) {
                    const i = !n || e && e.currentIndex < da(n, r, s) ? e : n,
                          o = da(i, r, s), a = i.currentIndex;
                    if (i === n)
                      r--, n = n._nextRemoved;
                    else if (e = e._next, null == i.previousIndex)
                      r++;
                    else {
                      s || (s = []);
                      const t = o - r, e = a - r;
                      if (t != e) {
                        for (let n = 0; n < t; n++) {
                          const r = n < s.length ? s[n] : s[n] = 0, i = r + n;
                          e <= i && i < t && (s[n] = r + 1)
                        }
                        s[i.previousIndex] = e - t
                      }
                    }
                    o !== a && t(i, o, a)
                  }
                }
                forEachPreviousItem(t) {
                  let e;
                  for (e = this._previousItHead; null !== e;
                       e = e._nextPrevious)
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
                  if (null == t && (t = []), !uo(t))
                    throw new Error(`Error trying to diff '${
                        wt(t)}'. Only arrays and iterables are allowed`);
                  return this.check(t) ? this : null
                }
                onDestroy() {}
                check(t) {
                  this._reset();
                  let e, n, r, s = this._itHead, i = !1;
                  if (Array.isArray(t)) {
                    this.length = t.length;
                    for (let e = 0; e < this.length; e++)
                      n = t[e], r = this._trackByFn(e, n),
                      null !== s && Object.is(s.trackById, r)
                          ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                             Object.is(s.item, n) ||
                                 this._addIdentityChange(s, n))
                          : (s = this._mismatch(s, n, r, e), i = !0),
                      s = s._next
                  } else
                    e = 0,
                    function(t, e) {
                      if (Array.isArray(t))
                        for (let n = 0; n < t.length; n++)
                          e(t[n]);
                      else {
                        const n = t[co()]();
                        let r;
                        for (; !(r = n.next()).done;)
                          e(r.value)
                      }
                    }(t, t => {
                      r = this._trackByFn(e, t),
                      null !== s && Object.is(s.trackById, r)
                          ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                             Object.is(s.item, t) ||
                                 this._addIdentityChange(s, t))
                          : (s = this._mismatch(s, t, r, e), i = !0),
                      s = s._next,
                      e++
                    }),
                    this.length = e;
                  return this._truncate(s), this.collection = t, this.isDirty
                }
                get isDirty() {
                  return null !== this._additionsHead ||
                         null !== this._movesHead ||
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
                _mismatch(t, e, n, r) {
                  let s;
                  return null === t
                             ? s = this._itTail
                             : (s = t._prev, this._remove(t)),
                               null !==
                                       (t = null === this._linkedRecords
                                                ? null
                                                : this._linkedRecords.get(n, r))
                                   ? (Object.is(t.item, e) ||
                                          this._addIdentityChange(t, e),
                                      this._moveAfter(t, s, r))
                                   : null !==
                                             (t = null === this._unlinkedRecords
                                                      ? null
                                                      : this._unlinkedRecords
                                                            .get(n, null))
                                         ? (Object.is(t.item, e) ||
                                                this._addIdentityChange(t, e),
                                            this._reinsertAfter(t, s, r))
                                         : t = this._addAfter(new ca(e, n), s,
                                                              r),
                               t
                }
                _verifyReinsertion(t, e, n, r) {
                  let s = null === this._unlinkedRecords
                              ? null
                              : this._unlinkedRecords.get(n, null);
                  return null !== s
                             ? t = this._reinsertAfter(s, t._prev, r)
                             : t.currentIndex != r &&
                                   (t.currentIndex = r, this._addToMoves(t, r)),
                               t
                }
                _truncate(t) {
                  for (; null !== t;) {
                    const e = t._next;
                    this._addToRemovals(this._unlink(t)), t = e
                  }
                  null !== this._unlinkedRecords &&
                      this._unlinkedRecords.clear(),
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
                  null !== this._unlinkedRecords &&
                      this._unlinkedRecords.remove(t);
                  const r = t._prevRemoved, s = t._nextRemoved;
                  return null === r ? this._removalsHead = s
                                    : r._nextRemoved = s,
                                      null === s ? this._removalsTail = r
                                                 : s._prevRemoved = r,
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
                  const r = null === e ? this._itHead : e._next;
                  return t._next = r, t._prev = e,
                         null === r ? this._itTail = t : r._prev = t,
                         null === e ? this._itHead = t : e._next = t,
                         null === this._linkedRecords &&
                             (this._linkedRecords = new ha),
                         this._linkedRecords.put(t), t.currentIndex = n, t
                }
                _remove(t) { return this._addToRemovals(this._unlink(t)) }
                _unlink(t) {
                  null !== this._linkedRecords && this._linkedRecords.remove(t);
                  const e = t._prev, n = t._next;
                  return null === e ? this._itHead = n : e._next = n,
                                      null === n ? this._itTail = e
                                                 : n._prev = e,
                                      t
                }
                _addToMoves(t, e) {
                  return t.previousIndex === e ||
                             (this._movesTail =
                                  null === this._movesTail
                                      ? this._movesHead = t
                                      : this._movesTail._nextMoved = t),
                         t
                }
                _addToRemovals(t) {
                  return null === this._unlinkedRecords &&
                             (this._unlinkedRecords = new ha),
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
                                 : this._identityChangesTail
                                       ._nextIdentityChange = t,
                         t
                }
              }
              class ca {
                constructor(t, e) {
                  this.item = t, this.trackById = e, this.currentIndex = null,
                  this.previousIndex = null, this._nextPrevious = null,
                  this._prev = null, this._next = null, this._prevDup = null,
                  this._nextDup = null, this._prevRemoved = null,
                  this._nextRemoved = null, this._nextAdded = null,
                  this._nextMoved = null, this._nextIdentityChange = null
                }
              }
              class ua {
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
                                      null === n ? this._tail = e
                                                 : n._prevDup = e,
                                      null === this._head
                }
              }
              class ha {
                constructor() { this.map = new Map }
                put(t) {
                  const e = t.trackById;
                  let n = this.map.get(e);
                  n || (n = new ua, this.map.set(e, n)), n.add(t)
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
              function da(t, e, n) {
                const r = t.previousIndex;
                if (null === r)
                  return r;
                let s = 0;
                return n && r < n.length && (s = n[r]), r + e + s
              }
              class pa {
                constructor() {}
                supports(t) { return t instanceof Map || ho(t) }
                create() { return new fa }
              }
              class fa {
                constructor() {
                  this._records = new Map, this._mapHead = null,
                  this._appendAfter = null, this._previousMapHead = null,
                  this._changesHead = null, this._changesTail = null,
                  this._additionsHead = null, this._additionsTail = null,
                  this._removalsHead = null, this._removalsTail = null
                }
                get isDirty() {
                  return null !== this._additionsHead ||
                         null !== this._changesHead ||
                         null !== this._removalsHead
                }
                forEachItem(t) {
                  let e;
                  for (e = this._mapHead; null !== e; e = e._next)
                    t(e)
                }
                forEachPreviousItem(t) {
                  let e;
                  for (e = this._previousMapHead; null !== e;
                       e = e._nextPrevious)
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
                    if (!(t instanceof Map || ho(t)))
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
                          const r = this._getOrCreateRecordForKey(n, t);
                          e = this._insertBeforeOrAppend(e, r)
                        }
                      }), e) {
                    e._prev && (e._prev._next = null), this._removalsHead = e;
                    for (let t = e; null !== t; t = t._nextRemoved)
                      t === this._mapHead && (this._mapHead = null),
                          this._records.delete(t.key),
                          t._nextRemoved = t._next,
                          t.previousValue = t.currentValue,
                          t.currentValue = null, t._prev = null, t._next = null
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
                    const r = n._prev, s = n._next;
                    return r && (r._next = s), s && (s._prev = r),
                           n._next = null, n._prev = null, n
                  }
                  const n = new ma(t);
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
                      : (this._changesTail._nextChanged = t,
                         this._changesTail = t)
                }
                _forEach(t, e) {
                  t instanceof Map ? t.forEach(e)
                                   : Object.keys(t).forEach(n => e(t[n], n))
                }
              }
              class ma {
                constructor(t) {
                  this.key = t, this.previousValue = null,
                  this.currentValue = null, this._nextPrevious = null,
                  this._next = null, this._prev = null, this._nextAdded = null,
                  this._nextRemoved = null, this._nextChanged = null
                }
              }
              let ga = (() => {
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
                      }, deps: [ [ t, new at, new it ] ]
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
                  factory : () => new t([ new oa ])
                }),
                t
              })(),
                  ya = (() => {
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
                          }, deps: [ [ t, new at, new it ] ]
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
                      factory : () => new t([ new pa ])
                    }),
                    t
                  })();
              const _a = [ new pa ], va = new ga([ new oa ]), ba = new ya(_a);
              let wa = (() => {
                class t {} return t.__NG_ELEMENT_ID__ = () => xa(t, Yo),
                t
              })();
              const xa = function(t, e) { return Ni(t, e, sn(), nn()) };
              let Sa = (() => {
                class t {} return t.__NG_ELEMENT_ID__ = () => Ea(t, Yo),
                t
              })();
              const Ea = function(t, e) { return Di(t, e, sn(), nn()) },
                    Ca = {};
              class ka extends Zo {
                constructor(t) { super(), this.ngModule = t }
                resolveComponentFactory(t) {
                  const e = xe(t);
                  return new Ia(e, this.ngModule)
                }
              }
              function Ta(t) {
                const e = [];
                for (let n in t)
                  t.hasOwnProperty(n) &&
                      e.push({propName : t[n], templateName : n});
                return e
              }
              const Aa = new Ut("SCHEDULER_TOKEN",
                                {providedIn : "root", factory : () => zn});
              class Ia extends Go {
                constructor(t, e) {
                  super(), this.componentDef = t, this.ngModule = e,
                           this.componentType = t.type,
                           this.selector = t.selectors.map(os).join(","),
                           this.ngContentSelectors =
                               t.ngContentSelectors ? t.ngContentSelectors : [],
                           this.isBoundToModule = !!e
                }
                get inputs() { return Ta(this.componentDef.inputs) }
                get outputs() { return Ta(this.componentDef.outputs) }
                create(t, e, n, r) {
                  const s=(r=r||this.ngModule)?function(t,e){return{get:(n,r,s)=>{const i=t.get(n,Ca,s);return i!==Ca||r===Ca?i:e.get(n,r,s)}}}(t,r.injector):t,i=s.get(Xo,$e),o=s.get(ra,null),a=i.createRenderer(null,this.componentDef),l=this.componentDef.selectors[0][0]||"div",c=n?function(t,e,n){if(Be(t))return t.selectRootElement(e,n===he.ShadowDom);let r="string"==typeof e?t.querySelector(e):e;return r.textContent="",r}(a,n,this.componentDef.encapsulation):ws(l,i.createRenderer(null,this.componentDef),function(t){const e=t.toLowerCase();return"svg"===e?"http://www.w3.org/2000/svg":"math"===e?"http://www.w3.org/1998/MathML/":null}(l)),u=this.componentDef.onPush?576:528,h={components:[],scheduler:zn,clean:ni,playerHandler:null,flags:0},d=Ps(0,-1,null,1,0,null,null,null,null,null),p=xs(null,d,h,u,null,null,i,a,o,s);
                  let f, m;
                  yn(p, null);
                  try {
                    const t = function(t, e, n, r, s, i) {
                      const o = n[1];
                      n[20] = t;
                      const a = Ss(o, null, 0, 3, null, null),
                            l = a.mergedAttrs = e.hostAttrs;
                      null !== l &&
                          (eo(a, l, !0),
                           null !== t &&
                               (Ln(s, t, l),
                                null !== a.classes && Ti(s, t, a.classes),
                                null !== a.styles && ki(s, t, a.styles)));
                      const c = r.createRenderer(t, e),
                            u = xs(n, Os(e), null, e.onPush ? 64 : 16, n[20], a,
                                   r, c, void 0);
                      return o.firstCreatePass &&
                                 (Xn(Kn(a, n), o, e.type), Bs(o, a),
                                  Hs(a, n.length, 1)),
                             Ys(n, u), n[20] = u
                    }(c, this.componentDef, p, i, a);
                    if (c)
                      if (n)
                        Ln(a, c, [ "ng-version", ia.full ]);
                      else {
                        const {attrs : t, classes : e} = function(t) {
                          const e = [], n = [];
                          let r = 1, s = 2;
                          for (; r < t.length;) {
                            let i = t[r];
                            if ("string" == typeof i)
                              2 === s ? "" !== i && e.push(i, t[++r])
                                      : 8 === s && n.push(i);
                            else {
                              if (!ns(s))
                                break;
                              s = i
                            }
                            r++
                          }
                          return { attrs: e, classes: n }
                        }(this.componentDef.selectors[0]);
                        t && Ln(a, c, t),
                            e && e.length > 0 && Ti(a, c, e.join(" "))
                      }
                    if (m = Qe(d, 0), void 0 !== e) {
                      const t = m.projection = [];
                      for (let n = 0; n < this.ngContentSelectors.length; n++) {
                        const r = e[n];
                        t.push(null != r ? Array.from(r) : null)
                      }
                    }
                    f = function(t, e, n, r, s) {
                      const i = n[1], o = function(t, e, n) {
                        const r = sn();
                        t.firstCreatePass &&
                            (n.providersResolver && n.providersResolver(n),
                             Vs(t, r, 1), zs(t, e, n));
                        const s = sr(e, t, e.length - 1, r);
                        Kr(s, e);
                        const i = qe(r, e);
                        return i && Kr(i, e), s
                      }(i, n, e);
                      r.components.push(o),
                          t[8] = o, s && s.forEach(t => t(o, e)),
                          e.contentQueries &&
                              e.contentQueries(1, o, n.length - 1);
                      const a = sn();
                      if (i.firstCreatePass &&
                          (null !== e.hostBindings || null !== e.hostAttrs)) {
                        En(a.index - Ce);
                        const t = n[1];
                        js(t, e), Fs(t, n, e.hostVars), Us(e, o)
                      }
                      return o
                    }(t, this.componentDef, p, h, [ no ]), Es(d, p, null)
                  } finally {
                    xn()
                  }
                  const g = new Oa(this.componentType, f, Li(Yo, m, p), p, m);
                  return d.node.child = m, g
                }
              }
              class Oa extends class {}
              {
                constructor(t, e, n, r, s) {
                  super(), this.location = n, this._rootLView = r,
                           this._tNode = s, this.destroyCbs = [],
                           this.instance = e,
                           this.hostView = this.changeDetectorRef = new Ii(r),
                           function(t, e, n, r) {
                             let s = t.node;
                             null == s &&
                                 (t.node = s = Ls(0, null, 2, -1, null, null)),
                                 r[6] = s
                           }(r[1], 0, 0, r),
                           this.componentType = t
                }
                get injector() { return new ar(this._tNode, this._rootLView) }
                destroy() {
                  this.destroyCbs &&
                      (this.destroyCbs.forEach(t => t()),
                       this.destroyCbs = null,
                       !this.hostView.destroyed && this.hostView.destroy())
                }
                onDestroy(t) { this.destroyCbs && this.destroyCbs.push(t) }
              }
              const Pa = void 0;
              var Ra = [
                "en",
                [ [ "a", "p" ], [ "AM", "PM" ], Pa ],
                [ [ "AM", "PM" ], Pa, Pa ],
                [
                  [ "S", "M", "T", "W", "T", "F", "S" ],
                  [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                  [
                    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                    "Friday", "Saturday"
                  ],
                  [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
                ],
                Pa,
                [
                  [
                    "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"
                  ],
                  [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"
                  ],
                  [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November",
                    "December"
                  ]
                ],
                Pa,
                [
                  [ "B", "A" ], [ "BC", "AD" ],
                  [ "Before Christ", "Anno Domini" ]
                ],
                0,
                [ 6, 0 ],
                [ "M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y" ],
                [ "h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz" ],
                [ "{1}, {0}", Pa, "{1} 'at' {0}", Pa ],
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
              let La = {};
              function Na(t) {
                return t in La || (La[t] = Pt.ng && Pt.ng.common &&
                                           Pt.ng.common.locales &&
                                           Pt.ng.common.locales[t]),
                       La[t]
              }
              var Da = function(t) {
                return t[t.LocaleId =
                             0] = "LocaleId",
                             t[t.DayPeriodsFormat = 1] = "DayPeriodsFormat",
                             t[t.DayPeriodsStandalone = 2] =
                                 "DayPeriodsStandalone",
                             t[t.DaysFormat = 3] = "DaysFormat",
                             t[t.DaysStandalone = 4] = "DaysStandalone",
                             t[t.MonthsFormat = 5] = "MonthsFormat",
                             t[t.MonthsStandalone = 6] = "MonthsStandalone",
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
              const Ma = "en-US";
              let ja = Ma;
              function Fa(t) {
                var e, n;
                n = "Expected localeId to be defined",
                null == (e = t) &&
                    function(t, e, n, r) {
                      throw new Error("ASSERTION ERROR: " + t +
                                      ` [Expected=> null != ${e} <=Actual]`)
                    }(n, e),
                "string" == typeof t &&
                    (ja = t.toLowerCase().replace(/_/g, "-"))
              }
              const Ua = new Map;
              class Va extends ee {
                constructor(t, e) {
                  super(), this._parent = e, this._bootstrapComponents = [],
                           this.injector = this, this.destroyCbs = [],
                           this.componentFactoryResolver = new ka(this);
                  const n = Ee(t), r = t[Mt] || null;
                  r && Fa(r),
                      this._bootstrapComponents = qn(n.bootstrap),
                      this._r3Injector =
                          qi(t, e,
                             [
                               {provide : ee, useValue : this}, {
                                 provide : Zo,
                                 useValue : this.componentFactoryResolver
                               }
                             ],
                             wt(t)),
                      this._r3Injector._resolveInjectorDefTypes(),
                      this.instance = this.get(t)
                }
                get(t, e = Xi.THROW_IF_NOT_FOUND, n = lt.Default) {
                  return t === Xi || t === ee || t === Vt
                             ? this
                             : this._r3Injector.get(t, e, n)
                }
                destroy() {
                  const t = this._r3Injector;
                  !t.destroyed && t.destroy(),
                      this.destroyCbs.forEach(t => t()), this.destroyCbs = null
                }
                onDestroy(t) { this.destroyCbs.push(t) }
              }
              class Ba extends ne {
                constructor(t) {
                  super(), this.moduleType = t,
                           null !== Ee(t) && function t(e) {
                             if (null !== e.\u0275mod.id) {
                               const t = e.\u0275mod.id;
                               (function(t, e, n) {
                                 if (e && e !== n)
                                   throw new Error(
                                       `Duplicate module registered for ${
                                           t} - ${wt(e)} vs ${wt(e.name)}`)
                               })(t, Ua.get(t), e),
                                   Ua.set(t, e)
                             }
                             let n = e.\u0275mod.imports;
                             n instanceof Function && (n = n()),
                                 n && n.forEach(e => t(e))
                           }(t)
                }
                create(t) { return new Va(this.moduleType, t) }
              }
              function $a(t, e, n, r, s, i) {
                return function(t, e, n, r, s, i, o, a) {
                  const l = e + n;
                  return function(t, e, n, r, s) {
                    const i = function(t, e, n, r) {
                      const s = po(t, e, n);
                      return po(t, e + 1, r) || s
                    }(t, e, n, r);
                    return po(t, e + 2, s) || i
                  }(t, l, s, i, o)
                             ? function(t, e, n) { return t[e] = n }(
                                   t, l + 3,
                                   a ? r.call(a, s, i, o) : r(s, i, o))
                             : function(t, e) {
                                 const n = t[e];
                                 return n === as ? void 0 : n
                               }(t, l + 3)
                }(nn(), function() {
                  const t = tn.lFrame;
                  let e = t.bindingRootIndex;
                  return -1 === e && (e = t.bindingRootIndex =
                                          t.tView.bindingStartIndex),
                         e
                }(), t, e, n, r, s, i)
              }
              const Ha = class extends S {
                constructor(t = !1) { super(), this.__isAsync = t }
                emit(t) { super.next(t) }
                subscribe(t, e, n) {
                  let r, s = t => null, i = () => null;
                  t && "object" == typeof t
                      ? (r = this.__isAsync ? e => {setTimeout(() => t.next(e))}
                                            : e => {t.next(e)},
                         t.error &&
                             (s = this.__isAsync
                                      ? e => {setTimeout(() => t.error(e))}
                                      : e => {t.error(e)}),
                         t.complete &&
                             (i = this.__isAsync
                                      ? () => {setTimeout(() => t.complete())}
                                      : () => {t.complete()}))
                      : (r = this.__isAsync ? e => {setTimeout(() => t(e))}
                                            : e => {t(e)},
                         e &&
                             (s = this.__isAsync ? t => {setTimeout(() => e(t))}
                                                 : t => {e(t)}),
                         n &&
                             (i = this.__isAsync ? () => {setTimeout(() => n())}
                                                 : () => {n()}));
                  const o = super.subscribe(r, s, i);
                  return t instanceof h && t.add(o), o
                }
              };
              function za() { return this._results[co()]() }
              class qa {
                constructor() {
                  this.dirty = !0, this._results = [], this.changes = new Ha,
                  this.length = 0;
                  const t = co(), e = qa.prototype;
                  e[t] || (e[t] = za)
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
                    for (let r = 0; r < e.length; r++) {
                      let s = e[r];
                      Array.isArray(s)
                          ? (n === e && (n = e.slice(0, r)), t(s, n))
                          : n !== e && n.push(s)
                    }
                    return n
                  }(t),
                  this.dirty = !1, this.length = this._results.length,
                  this.last = this._results[this.length - 1],
                  this.first = this._results[0]
                }
                notifyOnChanges() { this.changes.emit(this) }
                setDirty() { this.dirty = !0 }
                destroy() {
                  this.changes.complete(), this.changes.unsubscribe()
                }
              }
              class Qa {
                constructor(t) { this.queryList = t, this.matches = null }
                clone() { return new Qa(this.queryList) }
                setDirty() { this.queryList.setDirty() }
              }
              class Wa {
                constructor(t = []) { this.queries = t }
                createEmbeddedView(t) {
                  const e = t.queries;
                  if (null !== e) {
                    const n = null !== t.contentQueries ? t.contentQueries[0]
                                                        : e.length,
                          r = [];
                    for (let t = 0; t < n; t++) {
                      const n = e.getByIndex(t);
                      r.push(this.queries[n.indexInDeclarationView].clone())
                    }
                    return new Wa(r)
                  }
                  return null
                }
                insertView(t) { this.dirtyQueriesWithMatches(t) }
                detachView(t) { this.dirtyQueriesWithMatches(t) }
                dirtyQueriesWithMatches(t) {
                  for (let e = 0; e < this.queries.length; e++)
                    null !== rl(t, e).matches && this.queries[e].setDirty()
                }
              }
              class Ga {
                constructor(t, e, n, r = null) {
                  this.predicate = t, this.descendants = e, this.isStatic = n,
                  this.read = r
                }
              }
              class Ka {
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
                    const r = null !== e ? e.length : 0,
                          s = this.getByIndex(n).embeddedTView(t, r);
                    s && (s.indexInDeclarationView = n,
                          null !== e ? e.push(s) : e = [ s ])
                  }
                  return null !== e ? new Ka(e) : null
                }
                template(t, e) {
                  for (let n = 0; n < this.queries.length; n++)
                    this.queries[n].template(t, e)
                }
                getByIndex(t) { return this.queries[t] }
                get length() { return this.queries.length }
                track(t) { this.queries.push(t) }
              }
              class Za {
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
                                this.addMatch(-t.index, e),
                                new Za(this.metadata))
                             : null
                }
                isApplyingToNode(t) {
                  if (this._appliesToNextNode &&
                      !1 === this.metadata.descendants) {
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
                    for (let r = 0; r < n.length; r++) {
                      const s = n[r];
                      this.matchTNodeWithReadOption(t, e, Ya(e, s)),
                          this.matchTNodeWithReadOption(t, e,
                                                        rr(e, t, s, !1, !1))
                    }
                  else
                    n === wa ? 0 === e.type &&
                                   this.matchTNodeWithReadOption(t, e, -1)
                             : this.matchTNodeWithReadOption(
                                   t, e, rr(e, t, n, !1, !1))
                }
                matchTNodeWithReadOption(t, e, n) {
                  if (null !== n) {
                    const r = this.metadata.read;
                    if (null !== r)
                      if (r === Yo || r === Sa || r === wa && 0 === e.type)
                        this.addMatch(e.index, -2);
                      else {
                        const n = rr(e, t, r, !1, !1);
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
              function Ya(t, e) {
                const n = t.localNames;
                if (null !== n)
                  for (let r = 0; r < n.length; r += 2)
                    if (n[r] === e)
                      return n[r + 1];
                return null
              }
              function Ja(t, e, n, r) {
                return -1 === n ? function(t, e) {
                  return 3 === t.type || 4 === t.type ? Li(Yo, t, e)
                                                      : 0 === t.type ? Ni(wa,
                                                                          Yo, t,
                                                                          e)
                                                                     : null
                }(e, t) : -2 === n ? function(t, e, n) {
                  return n === Yo
                             ? Li(Yo, e, t)
                             : n === wa ? Ni(wa, Yo, e, t)
                                        : n === Sa ? Di(Sa, Yo, e, t) : void 0
                }(t, e, r) : sr(t, t[1], n, e)
              }
              function Xa(t, e, n, r) {
                const s = e[19].queries[r];
                if (null === s.matches) {
                  const r = t.data, i = n.matches, o = [];
                  for (let t = 0; t < i.length; t += 2) {
                    const s = i[t];
                    o.push(s < 0 ? null
                                 : Ja(e, r[s], i[t + 1], n.metadata.read))
                  }
                  s.matches = o
                }
                return s.matches
              }
              function tl(t) {
                const e = nn(), n = rn(), r = fn();
                mn(r + 1);
                const s = rl(n, r);
                if (t.dirty && Ke(e) === s.metadata.isStatic) {
                  if (null === s.matches)
                    t.reset([]);
                  else {
                    const i = s.crossesNgTemplate ? function t(e, n, r, s) {
                      const i = e.queries.getByIndex(r), o = i.matches;
                      if (null !== o) {
                        const a = Xa(e, n, i, r);
                        for (let e = 0; e < o.length; e += 2) {
                          const r = o[e];
                          if (r > 0)
                            s.push(a[e / 2]);
                          else {
                            const i = o[e + 1], a = n[-r];
                            for (let e = ke; e < a.length; e++) {
                              const n = a[e];
                              n[17] === n[3] && t(n[1], n, i, s)
                            }
                            if (null !== a[9]) {
                              const e = a[9];
                              for (let n = 0; n < e.length; n++) {
                                const r = e[n];
                                t(r[1], r, i, s)
                              }
                            }
                          }
                        }
                      }
                      return s
                    }(n, e, r, []) : Xa(n, e, s, r);
                    t.reset(i), t.notifyOnChanges()
                  }
                  return !0
                }
                return !1
              }
              function el(t, e, n) {
                !function(t, e, n, r, s, i) {
                  t.firstCreatePass && function(t, e, n) {
                    null === t.queries && (t.queries = new Ka),
                        t.queries.track(new Za(e, -1))
                  }(t, new Ga(n, r, false, s)), function(t, e) {
                    const n = new qa;
                    Rs(t, e, n, n.destroy), null === e[19] && (e[19] = new Wa),
                        e[19].queries.push(new Qa(n))
                  }(t, e)
                }(rn(), nn(), t, e, n)
              }
              function nl() {
                return t = nn(), e = fn(), t[19].queries[e].queryList;
                var t, e
              }
              function rl(t, e) { return t.queries.getByIndex(e) }
              const sl = new Ut("Application Initializer");
              let il = (() => {
                class t {
                  constructor(t) {
                    this.appInits = t, this.initialized = !1, this.done = !1,
                    this.donePromise = new Promise(
                        (t, e) => {this.resolve = t, this.reject = e})
                  }
                  runInitializers() {
                    if (this.initialized)
                      return;
                    const t = [], e = () => { this.done = !0, this.resolve() };
                    if (this.appInits)
                      for (let n = 0; n < this.appInits.length; n++) {
                        const e = this.appInits[n]();
                        So(e) && t.push(e)
                      }
                    Promise.all(t)
                        .then(() => {e()})
                        .catch(t => {this.reject(t)}),
                        0 === t.length && e(), this.initialized = !0
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(sl, 8)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              const ol = new Ut("AppId"), al = {
                provide : ol,
                useFactory : function() { return `${ll()}${ll()}${ll()}` },
                deps : []
              };
              function ll() {
                return String.fromCharCode(97 + Math.floor(25 * Math.random()))
              }
              const cl = new Ut("Platform Initializer"),
                    ul = new Ut("Platform ID"),
                    hl = new Ut("appBootstrapListener");
              let dl = (() => {
                class t {
                  log(t) { console.log(t) }
                  warn(t) { console.warn(t) }
                } return t.\u0275fac = function(e) { return new (e || t) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              const pl = new Ut("LocaleId"), fl = new Ut("DefaultCurrencyCode");
              class ml {
                constructor(t, e) {
                  this.ngModuleFactory = t, this.componentFactories = e
                }
              }
              const gl = function(t) { return new Ba(t) }, yl = gl,
                    _l = function(t) { return Promise.resolve(gl(t)) },
                    vl =
                        function(t) {
                      const e = gl(t),
                            n = qn(Ee(t).declarations).reduce((t, e) => {
                              const n = xe(e);
                              return n && t.push(new Ia(n)), t
                            }, []);
                      return new ml(e, n)
                    },
                    bl = vl, wl = function(t) { return Promise.resolve(vl(t)) };
              let xl = (() => {
                class t {
                  constructor() {
                    this.compileModuleSync = yl, this.compileModuleAsync = _l,
                    this.compileModuleAndAllComponentsSync = bl,
                    this.compileModuleAndAllComponentsAsync = wl
                  }
                  clearCache() {}
                  clearCacheFor(t) {}
                  getModuleId(t) {}
                } return t.\u0275fac = function(e) { return new (e || t) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              const Sl = (() => Promise.resolve(0))();
              function El(t) {
                "undefined" == typeof Zone
                    ? Sl.then(() => {t && t.apply(null, null)})
                    : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
              }
              class Cl {
                constructor({
                  enableLongStackTrace : t = !1,
                  shouldCoalesceEventChangeDetection: e = !1
                }) {
                  if (this.hasPendingMacrotasks = !1,
                      this.hasPendingMicrotasks = !1, this.isStable = !0,
                      this.onUnstable = new Ha(!1),
                      this.onMicrotaskEmpty = new Ha(!1),
                      this.onStable = new Ha(!1), this.onError = new Ha(!1),
                      "undefined" == typeof Zone)
                    throw new Error(
                        "In this configuration Angular requires Zone.js");
                  Zone.assertZonePatched();
                  const n = this;
                  n._nesting = 0, n._outer = n._inner = Zone.current,
                  Zone.wtfZoneSpec &&
                      (n._inner = n._inner.fork(Zone.wtfZoneSpec)),
                  Zone.TaskTrackingZoneSpec &&
                      (n._inner = n._inner.fork(new Zone.TaskTrackingZoneSpec)),
                  t && Zone.longStackTraceZoneSpec &&
                      (n._inner = n._inner.fork(Zone.longStackTraceZoneSpec)),
                  n.shouldCoalesceEventChangeDetection = e,
                  n.lastRequestAnimationFrameId = -1,
                  n.nativeRequestAnimationFrame = function() {
                    let t = Pt.requestAnimationFrame,
                        e = Pt.cancelAnimationFrame;
                    if ("undefined" != typeof Zone && t && e) {
                      const n = t[Zone.__symbol__("OriginalDelegate")];
                      n && (t = n);
                      const r = e[Zone.__symbol__("OriginalDelegate")];
                      r && (e = r)
                    }
                    return {
                      nativeRequestAnimationFrame: t,
                          nativeCancelAnimationFrame: e
                    }
                  }().nativeRequestAnimationFrame, function(t) {
                    const e =
                        !!t.shouldCoalesceEventChangeDetection &&
                        t.nativeRequestAnimationFrame && (() => {
                          !function(t) {
                            -1 === t.lastRequestAnimationFrameId &&
                                (t.lastRequestAnimationFrameId =
                                     t.nativeRequestAnimationFrame.call(Pt, () => {
                                       t.fakeTopEventTask ||
                                           (t.fakeTopEventTask =
                                                Zone.root.scheduleEventTask(
                                                    "fakeTopEventTask", () => {
                                                      t.lastRequestAnimationFrameId =
                                                          -1,
                                                      Il(t),
                                                      Al(t)
                                                    },
                                                    void 0, () => {},
                                                    () => {})),
                                       t.fakeTopEventTask.invoke()
                                     }),
                                 Il(t))
                          }(t)
                        });
                    t._inner = t._inner.fork({
                      name : "angular",
                      properties :
                          {isAngularZone : !0, maybeDelayChangeDetection : e},
                      onInvokeTask : (n, r, s, i, o, a) => {
                        try {
                          return Ol(t), n.invokeTask(s, i, o, a)
                        } finally {
                          e && "eventTask" === i.type && e(), Pl(t)
                        }
                      },
                      onInvoke : (e, n, r, s, i, o, a) => {
                        try {
                          return Ol(t), e.invoke(r, s, i, o, a)
                        } finally {
                          Pl(t)
                        }
                      },
                      onHasTask : (e, n, r, s) => {
                        e.hasTask(r, s),
                            n === r &&
                                ("microTask" == s.change
                                     ? (t._hasPendingMicrotasks = s.microTask,
                                        Il(t), Al(t))
                                     : "macroTask" == s.change &&
                                           (t.hasPendingMacrotasks =
                                                s.macroTask))
                      },
                      onHandleError : (e, n, r, s) =>
                          (e.handleError(r, s),
                           t.runOutsideAngular(() => t.onError.emit(s)), !1)
                    })
                  }(n)
                }
                static isInAngularZone() {
                  return !0 === Zone.current.get("isAngularZone")
                }
                static assertInAngularZone() {
                  if (!Cl.isInAngularZone())
                    throw new Error(
                        "Expected to be in Angular Zone, but it is not!")
                }
                static assertNotInAngularZone() {
                  if (Cl.isInAngularZone())
                    throw new Error(
                        "Expected to not be in Angular Zone, but it is!")
                }
                run(t, e, n) { return this._inner.run(t, e, n) }
                runTask(t, e, n, r) {
                  const s = this._inner,
                        i = s.scheduleEventTask("NgZoneEvent: " + r, t, Tl, kl,
                                                kl);
                  try {
                    return s.runTask(i, e, n)
                  } finally {
                    s.cancelTask(i)
                  }
                }
                runGuarded(t, e, n) { return this._inner.runGuarded(t, e, n) }
                runOutsideAngular(t) { return this._outer.run(t) }
              }
              function kl() {}
              const Tl = {};
              function Al(t) {
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
              function Il(t) {
                t.hasPendingMicrotasks =
                    !!(t._hasPendingMicrotasks ||
                       t.shouldCoalesceEventChangeDetection &&
                           -1 !== t.lastRequestAnimationFrameId)
              }
              function Ol(t) {
                t._nesting++,
                    t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
              }
              function Pl(t) { t._nesting--, Al(t) }
              class Rl {
                constructor() {
                  this.hasPendingMicrotasks = !1,
                  this.hasPendingMacrotasks = !1, this.isStable = !0,
                  this.onUnstable = new Ha, this.onMicrotaskEmpty = new Ha,
                  this.onStable = new Ha, this.onError = new Ha
                }
                run(t, e, n) { return t.apply(e, n) }
                runGuarded(t, e, n) { return t.apply(e, n) }
                runOutsideAngular(t) { return t() }
                runTask(t, e, n, r) { return t.apply(e, n) }
              }
              let Ll = (() => {
                class t {
                  constructor(t) {
                    this._ngZone = t, this._pendingCount = 0,
                    this._isZoneStable = !0, this._didWork = !1,
                    this._callbacks = [], this.taskTrackingZone = null,
                    this._watchAngularEvents(),
                    t.run(
                        () => {this.taskTrackingZone =
                                   "undefined" == typeof Zone
                                       ? null
                                       : Zone.current.get("TaskTrackingZone")})
                  }
                  _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                      next :
                          () => { this._didWork = !0, this._isZoneStable = !1 }
                    }),
                        this._ngZone.runOutsideAngular(
                            () => {this._ngZone.onStable.subscribe({
                              next : () => {
                                Cl.assertNotInAngularZone(), El(() => {
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
                      El(() => {
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
                    let r = -1;
                    e && e > 0 &&
                        (r = setTimeout(() => {
                           this._callbacks =
                               this._callbacks.filter(t => t.timeoutId !== r),
                           t(this._didWork, this.getPendingTasks())
                         },
                                        e)),
                        this._callbacks.push(
                            {doneCb : t, timeoutId : r, updateCb : n})
                  }
                  whenStable(t, e, n) {
                    if (n && !this.taskTrackingZone)
                      throw new Error(
                          'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                    this.addCallback(t, e, n), this._runCallbacksIfReady()
                  }
                  getPendingRequestCount() { return this._pendingCount }
                  findProviders(t, e, n) { return [] }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Cl)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })(),
                  Nl = (() => {
                    class t {
                      constructor() {
                        this._applications = new Map, jl.addToWindow(this)
                      }
                      registerApplication(t, e) { this._applications.set(t, e) }
                      unregisterApplication(t) { this._applications.delete(t) }
                      unregisterAllApplications() { this._applications.clear() }
                      getTestability(t) {
                        return this._applications.get(t) || null
                      }
                      getAllTestabilities() {
                        return Array.from(this._applications.values())
                      }
                      getAllRootElements() {
                        return Array.from(this._applications.keys())
                      }
                      findTestabilityInTree(t, e = !0) {
                        return jl.findTestabilityInTree(this, t, e)
                      }
                    } return t.\u0275fac = function(e) { return new (e || t) },
                    t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                    t
                  })();
              class Dl {
                addToWindow(t) {}
                findTestabilityInTree(t, e, n) { return null }
              }
              let Ml, jl = new Dl;
              const Fl = new Ut("AllowMultipleToken");
              class Ul {
                constructor(t, e) { this.name = t, this.token = e }
              }
              function Vl(t, e, n = []) {
                const r = "Platform: " + e, s = new Ut(r);
                return (e = []) => {
                  let i = Bl();
                  if (!i || i.injector.get(Fl, !1))
                    if (t)
                      t(n.concat(e).concat({provide : s, useValue : !0}));
                    else {
                      const t = n.concat(e).concat(
                          {provide : s, useValue : !0},
                          {provide : Ui, useValue : "platform"});
                      !function(t) {
                        if (Ml && !Ml.destroyed && !Ml.injector.get(Fl, !1))
                          throw new Error(
                              "There can be only one platform. Destroy the previous one to create a new one.");
                        Ml = t.get($l);
                        const e = t.get(cl, null);
                        e && e.forEach(t => t())
                      }(Xi.create({providers : t, name : r}))
                    }
                  return function(t) {
                    const e = Bl();
                    if (!e)
                      throw new Error("No platform exists!");
                    if (!e.injector.get(t, null))
                      throw new Error(
                          "A platform with a different configuration has been created. Please destroy it first.");
                    return e
                  }(s)
                }
              }
              function Bl() { return Ml && !Ml.destroyed ? Ml : null }
              let $l = (() => {
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
                                     ? new Rl
                                     : ("zone.js" === t ? void 0 : t) || new Cl({
                                         enableLongStackTrace : Cr(),
                                         shouldCoalesceEventChangeDetection : e
                                       }),
                             n
                    }(e ? e.ngZone : void 0,
                        e && e.ngZoneEventCoalescing || !1),
                          r = [ {provide : Cl, useValue : n} ];
                    return n.run(() => {
                      const e = Xi.create({
                        providers : r,
                        parent : this.injector,
                        name : t.moduleType.name
                      }),
                            s = t.create(e), i = s.injector.get(pr, null);
                      if (!i)
                        throw new Error(
                            "No ErrorHandler. Is platform module (BrowserModule) included?");
                      return s.onDestroy(() => ql(this._modules, s)),
                             n.runOutsideAngular(
                                 () => n.onError.subscribe(
                                     {next : t => { i.handleError(t) }})),
                             function(t, e, n) {
                               try {
                                 const r = n();
                                 return So(r) ? r.catch(n => {
                                   throw e.runOutsideAngular(
                                       () => t.handleError(n)),
                                   n
                                 })
                                              : r
                               } catch (r) {
                                 throw e.runOutsideAngular(
                                     () => t.handleError(r)),
                                     r
                               }
                             }(i, n, () => {
                               const t = s.injector.get(il);
                               return t.runInitializers(),
                                      t.donePromise.then(
                                          () =>
                                              (Fa(s.injector.get(pl, Ma) || Ma),
                                               this._moduleDoBootstrap(s), s))
                             })
                    })
                  }
                  bootstrapModule(t, e = []) {
                    const n = Hl({}, e);
                    return function(t, e, n) {
                      const r = new Ba(n);
                      return Promise.resolve(r)
                    }(0, 0,
                      t).then(t => this.bootstrapModuleFactory(t, n))
                  }
                  _moduleDoBootstrap(t) {
                    const e = t.injector.get(zl);
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
                      throw new Error(
                          "The platform has already been destroyed!");
                    this._modules.slice().forEach(t => t.destroy()),
                        this._destroyListeners.forEach(t => t()),
                        this._destroyed = !0
                  }
                  get destroyed() { return this._destroyed }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Xi)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              function Hl(t, e) {
                return Array.isArray(e) ? e.reduce(Hl, t)
                                        : Object.assign(Object.assign({}, t), e)
              }
              let zl = (() => {
                class t {
                  constructor(t, e, n, r, s, i) {
                    this._zone = t, this._console = e, this._injector = n,
                    this._exceptionHandler = r,
                    this._componentFactoryResolver = s, this._initStatus = i,
                    this._bootstrapListeners = [], this._views = [],
                    this._runningTick = !1, this._enforceNoNewChanges = !1,
                    this._stable = !0, this.componentTypes = [],
                    this.components = [], this._enforceNoNewChanges = Cr(),
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
                                  Cl.assertNotInAngularZone(),
                                  El(() => {this._stable ||
                                            this._zone.hasPendingMacrotasks ||
                                            this._zone.hasPendingMicrotasks ||
                                            (this._stable = !0, t.next(!0))})
                                })});
                            const n = this._zone.onUnstable.subscribe(() => {
                              Cl.assertInAngularZone(),
                              this._stable && (this._stable = !1,
                                               this._zone.runOutsideAngular(
                                                   () => {t.next(!1)}))
                            });
                            return () => { e.unsubscribe(), n.unsubscribe() }
                          });
                    this.isStable = q(o, a.pipe(t => Q()(J(tt)(t))))
                  }
                  bootstrap(t, e) {
                    if (!this._initStatus.done)
                      throw new Error(
                          "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                    let n;
                    n = t instanceof Go ? t
                                        : this._componentFactoryResolver
                                              .resolveComponentFactory(t),
                    this.componentTypes.push(n.componentType);
                    const r =
                        n.isBoundToModule ? void 0 : this._injector.get(ee),
                          s = n.create(Xi.NULL, [], e || n.selector, r);
                    s.onDestroy(() => {this._unloadComponent(s)});
                    const i = s.injector.get(Ll, null);
                    return i && s.injector.get(Nl).registerApplication(
                                    s.location.nativeElement, i),
                           this._loadComponent(s),
                           Cr() &&
                               this._console.log(
                                   "Angular is running in development mode. Call enableProdMode() to enable production mode."),
                           s
                  }
                  tick() {
                    if (this._runningTick)
                      throw new Error(
                          "ApplicationRef.tick is called recursively");
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
                    ql(this._views, e), e.detachFromAppRef()
                  }
                  _loadComponent(t) {
                    this.attachView(t.hostView), this.tick(),
                        this.components.push(t),
                        this._injector.get(hl, [])
                            .concat(this._bootstrapListeners)
                            .forEach(e => e(t))
                  }
                  _unloadComponent(t) {
                    this.detachView(t.hostView), ql(this.components, t)
                  }
                  ngOnDestroy() {
                    this._views.slice().forEach(t => t.destroy())
                  }
                  get viewCount() { return this._views.length }
                } return t.\u0275fac =
                    function(e) {
                      return new (e || t)(Zt(Cl), Zt(dl), Zt(Xi), Zt(pr),
                                          Zt(Zo), Zt(il))
                    },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              function ql(t, e) {
                const n = t.indexOf(e);
                n > -1 && t.splice(n, 1)
              }
              class Ql {}
              class Wl {}
              const Gl = {
                factoryPathPrefix : "",
                factoryPathSuffix : ".ngfactory"
              };
              let Kl = (() => {
                class t {
                  constructor(t, e) {
                    this._compiler = t, this._config = e || Gl
                  }
                  load(t) { return this.loadAndCompile(t) }
                  loadAndCompile(t) {
                    let [e, r] = t.split("#");
                    return void 0 === r && (r = "default"),
                           n("zn8P")(e)
                               .then(t => t[r])
                               .then(t => Zl(t, e, r))
                               .then(t => this._compiler.compileModuleAsync(t))
                  }
                  loadFactory(t) {
                    let [e, r] = t.split("#"), s = "NgFactory";
                    return void 0 === r && (r = "default", s = ""),
                           n("zn8P")(this._config.factoryPathPrefix + e +
                                     this._config.factoryPathSuffix)
                               .then(t => t[r + s])
                               .then(t => Zl(t, e, r))
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(xl), Zt(Wl, 8)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              function Zl(t, e, n) {
                if (!t)
                  throw new Error(`Cannot find '${n}' in '${e}'`);
                return t
              }
              const Yl =
                  Vl(null, "core",
                     [
                       {provide : ul, useValue : "unknown"},
                       {provide : $l, deps : [ Xi ]}, {provide : Nl, deps : []},
                       {provide : dl, deps : []}
                     ]),
                    Jl = [
                      {
                        provide : zl,
                        useClass : zl,
                        deps : [ Cl, dl, Xi, pr, Zo, il ]
                      },
                      {
                        provide : Aa,
                        deps : [ Cl ],
                        useFactory : function(t) {
                          let e = [];
                          return t.onStable.subscribe(() => {
                            for (; e.length;)
                              e.pop()()
                          }),
                                 function(t) { e.push(t) }
                        }
                      },
                      {provide : il, useClass : il, deps : [ [ new it, sl ] ]},
                      {provide : xl, useClass : xl, deps : []}, al, {
                        provide : ga,
                        useFactory : function() { return va },
                        deps : []
                      },
                      {
                        provide : ya,
                        useFactory : function() { return ba },
                        deps : []
                      },
                      {
                        provide : pl,
                        useFactory : function(t) {
                          return Fa(t = t ||
                                        "undefined" != typeof $localize &&
                                            $localize.locale ||
                                        Ma),
                                 t
                        },
                        deps : [ [ new st(pl), new it, new at ] ]
                      },
                      {provide : fl, useValue : "USD"}
                    ];
              let Xl = (() => {
                class t {
                  constructor(t) {}
                } return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t)(Zt(zl)) },
                  providers : Jl
                }),
                t
              })(),
                  tc = null;
              function ec() { return tc }
              const nc = new Ut("DocumentToken");
              let rc = (() => {
                class t {} return t.\u0275fac = function(
                    e) { return new (e || t) },
                t.\u0275prov =
                    ht({factory : sc, token : t, providedIn : "platform"}),
                t
              })();
              function sc() { return Zt(oc) }
              const ic = new Ut("Location Initialized");
              let oc = (() => {
                class t extends
                    rc {
                      constructor(t) { super(), this._doc = t, this._init() }
                      _init() {
                        this.location = ec().getLocation(),
                        this._history = ec().getHistory()
                      }
                      getBaseHrefFromDOM() {
                        return ec().getBaseHref(this._doc)
                      }
                      onPopState(t) {
                        ec().getGlobalEventTarget(this._doc, "window")
                            .addEventListener("popstate", t, !1)
                      }
                      onHashChange(t) {
                        ec().getGlobalEventTarget(this._doc, "window")
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
                        ac() ? this._history.pushState(t, e, n)
                             : this.location.hash = n
                      }
                      replaceState(t, e, n) {
                        ac() ? this._history.replaceState(t, e, n)
                             : this.location.hash = n
                      }
                      forward() { this._history.forward() }
                      back() { this._history.back() }
                      getState() { return this._history.state }
                    } return t.\u0275fac =
                        function(e) { return new (e || t)(Zt(nc)) },
                    t.\u0275prov =
                        ht({factory : lc, token : t, providedIn : "platform"}),
                    t
              })();
              function ac() { return !!window.history.pushState }
              function lc() { return new oc(Zt(nc)) }
              function cc(t, e) {
                if (0 == t.length)
                  return e;
                if (0 == e.length)
                  return t;
                let n = 0;
                return t.endsWith("/") && n++, e.startsWith("/") && n++,
                       2 == n ? t + e.substring(1)
                              : 1 == n ? t + e : t + "/" + e
              }
              function uc(t) {
                const e = t.match(/#|\?|$/), n = e && e.index || t.length;
                return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
              }
              function hc(t) { return t && "?" !== t[0] ? "?" + t : t }
              let dc = (() => {
                class t {} return t.\u0275fac = function(
                    e) { return new (e || t) },
                t.\u0275prov =
                    ht({factory : pc, token : t, providedIn : "root"}),
                t
              })();
              function pc(t) {
                const e = Zt(nc).location;
                return new mc(Zt(rc), e && e.origin || "")
              }
              const fc = new Ut("appBaseHref");
              let mc = (() => {
                class t extends dc {
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
                  prepareExternalUrl(t) { return cc(this._baseHref, t) }
                  path(t = !1) {
                    const e = this._platformLocation.pathname +
                              hc(this._platformLocation.search),
                          n = this._platformLocation.hash;
                    return n && t ? `${e}${n}` : e
                  }
                  pushState(t, e, n, r) {
                    const s = this.prepareExternalUrl(n + hc(r));
                    this._platformLocation.pushState(t, e, s)
                  }
                  replaceState(t, e, n, r) {
                    const s = this.prepareExternalUrl(n + hc(r));
                    this._platformLocation.replaceState(t, e, s)
                  }
                  forward() { this._platformLocation.forward() }
                  back() { this._platformLocation.back() }
                } return t.\u0275fac =
                                    function(e) {
                                      return new (e || t)(Zt(rc), Zt(fc, 8))
                                    },
                                t.\u0275prov =
                                    ht({token : t, factory : t.\u0275fac}),
                                t
              })(),
                  gc = (() => {
                    class t extends dc {
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
                        const e = cc(this._baseHref, t);
                        return e.length > 0 ? "#" + e : e
                      }
                      pushState(t, e, n, r) {
                        let s = this.prepareExternalUrl(n + hc(r));
                        0 == s.length && (s = this._platformLocation.pathname),
                            this._platformLocation.pushState(t, e, s)
                      }
                      replaceState(t, e, n, r) {
                        let s = this.prepareExternalUrl(n + hc(r));
                        0 == s.length && (s = this._platformLocation.pathname),
                            this._platformLocation.replaceState(t, e, s)
                      }
                      forward() { this._platformLocation.forward() }
                      back() { this._platformLocation.back() }
                    } return t.\u0275fac =
                                        function(e) {
                                          return new (e || t)(Zt(rc), Zt(fc, 8))
                                        },
                                    t.\u0275prov =
                                        ht({token : t, factory : t.\u0275fac}),
                                    t
                  })(),
                  yc = (() => {
                    class t {
                      constructor(t, e) {
                        this._subject = new Ha, this._urlChangeListeners = [],
                        this._platformStrategy = t;
                        const n = this._platformStrategy.getBaseHref();
                        this._platformLocation = e, this._baseHref = uc(vc(n)),
                        this._platformStrategy.onPopState(
                            t => {this._subject.emit({
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
                        return this.path() == this.normalize(t + hc(e))
                      }
                      normalize(e) {
                        return t.stripTrailingSlash(function(t, e) {
                          return t && e.startsWith(t) ? e.substring(t.length)
                                                      : e
                        }(this._baseHref, vc(e)))
                      }
                      prepareExternalUrl(t) {
                        return t && "/" !== t[0] && (t = "/" + t),
                               this._platformStrategy.prepareExternalUrl(t)
                      }
                      go(t, e = "", n = null) {
                        this._platformStrategy.pushState(n, "", t, e),
                            this._notifyUrlChangeListeners(
                                this.prepareExternalUrl(t + hc(e)), n)
                      }
                      replaceState(t, e = "", n = null) {
                        this._platformStrategy.replaceState(n, "", t, e),
                            this._notifyUrlChangeListeners(
                                this.prepareExternalUrl(t + hc(e)), n)
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
                        function(e) { return new (e || t)(Zt(dc), Zt(rc)) },
                    t.normalizeQueryParams = hc,
                    t.joinWithSlash = cc,
                    t.stripTrailingSlash = uc,
                    t.\u0275prov =
                        ht({factory : _c, token : t, providedIn : "root"}),
                    t
                  })();
              function _c() { return new yc(Zt(dc), Zt(rc)) }
              function vc(t) { return t.replace(/\/index.html$/, "") }
              var bc = function(t) {
                return t[t.Zero = 0] = "Zero", t[t.One = 1] = "One",
                                  t[t.Two = 2] = "Two", t[t.Few = 3] = "Few",
                                  t[t.Many = 4] = "Many",
                                  t[t.Other = 5] = "Other", t
              }({});
              class wc {}
              let xc = (() => {
                class t extends wc {
                  constructor(t) { super(), this.locale = t }
                  getPluralCategory(t, e) {
                    switch (function(t) {
                      return function(t) {
                        const e = function(
                            t) { return t.toLowerCase().replace(/_/g, "-") }(t);
                        let n = Na(e);
                        if (n)
                          return n;
                        const r = e.split("-")[0];
                        if (n = Na(r), n)
                          return n;
                        if ("en" === r)
                          return Ra;
                        throw new Error(
                            `Missing locale data for the locale "${t}".`)
                      }(t)[Da.PluralCase]
                    }(e || this.locale)(t)) {
                    case bc.Zero:
                      return "zero";
                    case bc.One:
                      return "one";
                    case bc.Two:
                      return "two";
                    case bc.Few:
                      return "few";
                    case bc.Many:
                      return "many";
                    default:
                      return "other"
                    }
                  }
                } return t.\u0275fac =
                                    function(e) { return new (e || t)(Zt(pl)) },
                                t.\u0275prov =
                                    ht({token : t, factory : t.\u0275fac}),
                                t
              })();
              class Sc {
                constructor(t, e, n, r) {
                  this.$implicit = t, this.ngForOf = e, this.index = n,
                  this.count = r
                }
                get first() { return 0 === this.index }
                get last() { return this.index === this.count - 1 }
                get even() { return this.index % 2 == 0 }
                get odd() { return !this.even }
              }
              let Ec = (() => {
                class t {
                  constructor(t, e, n) {
                    this._viewContainer = t, this._template = e,
                    this._differs = n, this._ngForOf = null,
                    this._ngForOfDirty = !0, this._differ = null
                  }
                  set ngForOf(t) { this._ngForOf = t, this._ngForOfDirty = !0 }
                  set ngForTrackBy(t) {
                    Cr() && null != t && "function" != typeof t && console &&
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
                    t.forEachOperation((t, n, r) => {
                      if (null == t.previousIndex) {
                        const n = this._viewContainer.createEmbeddedView(
                            this._template, new Sc(null, this._ngForOf, -1, -1),
                            null === r ? void 0 : r),
                              s = new Cc(t, n);
                        e.push(s)
                      } else if (null == r)
                        this._viewContainer.remove(null === n ? void 0 : n);
                      else if (null !== n) {
                        const s = this._viewContainer.get(n);
                        this._viewContainer.move(s, r);
                        const i = new Cc(t, s);
                        e.push(i)
                      }
                    });
                    for (let n = 0; n < e.length; n++)
                      this._perViewChange(e[n].view, e[n].record);
                    for (let n = 0, r = this._viewContainer.length; n < r;
                         n++) {
                      const t = this._viewContainer.get(n);
                      t.context.index = n, t.context.count = r,
                      t.context.ngForOf = this._ngForOf
                    }
                    t.forEachIdentityChange(
                        t => {this._viewContainer.get(t.currentIndex)
                                  .context.$implicit = t.item})
                  }
                  _perViewChange(t, e) { t.context.$implicit = e.item }
                  static ngTemplateContextGuard(t, e) { return !0 }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(go(Sa), go(wa), go(ga)) },
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
              class Cc {
                constructor(t, e) { this.record = t, this.view = e }
              }
              let kc = (() => {
                class t {
                  constructor(t, e) {
                    this._viewContainer = t, this._context = new Tc,
                    this._thenTemplateRef = null, this._elseTemplateRef = null,
                    this._thenViewRef = null, this._elseViewRef = null,
                    this._thenTemplateRef = e
                  }
                  set ngIf(t) {
                    this._context.$implicit = this._context.ngIf = t,
                    this._updateView()
                  }
                  set ngIfThen(t) {
                    Ac("ngIfThen", t), this._thenTemplateRef = t,
                                       this._thenViewRef = null,
                                       this._updateView()
                  }
                  set ngIfElse(t) {
                    Ac("ngIfElse", t), this._elseTemplateRef = t,
                                       this._elseViewRef = null,
                                       this._updateView()
                  }
                  _updateView() {
                    this._context.$implicit
                        ? this._thenViewRef ||
                              (this._viewContainer.clear(),
                               this._elseViewRef = null,
                               this._thenTemplateRef &&
                                   (this._thenViewRef =
                                        this._viewContainer.createEmbeddedView(
                                            this._thenTemplateRef,
                                            this._context)))
                        : this._elseViewRef ||
                              (this._viewContainer.clear(),
                               this._thenViewRef = null,
                               this._elseTemplateRef &&
                                   (this._elseViewRef =
                                        this._viewContainer.createEmbeddedView(
                                            this._elseTemplateRef,
                                            this._context)))
                  }
                  static ngTemplateContextGuard(t, e) { return !0 }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(go(Sa), go(wa)) },
                t.\u0275dir = we({
                  type : t,
                  selectors : [ [ "", "ngIf", "" ] ],
                  inputs : {
                    ngIf : "ngIf",
                    ngIfThen : "ngIfThen",
                    ngIfElse : "ngIfElse"
                  }
                }),
                t
              })();
              class Tc {
                constructor() { this.$implicit = null, this.ngIf = null }
              }
              function Ac(t, e) {
                if (e && !e.createEmbeddedView)
                  throw new Error(
                      `${t} must be a TemplateRef, but received '${wt(e)}'.`)
              }
              let Ic = (() => {
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
                    const [n, r] = t.split(".");
                    null != (e = null != e && r ? `${e}${r}` : e)
                        ? this._renderer.setStyle(this._ngEl.nativeElement, n,
                                                  e)
                        : this._renderer.removeStyle(this._ngEl.nativeElement,
                                                     n)
                  }
                  _applyChanges(t) {
                    t.forEachRemovedItem(t => this._setStyle(t.key, null)),
                        t.forEachAddedItem(
                            t => this._setStyle(t.key, t.currentValue)),
                        t.forEachChangedItem(
                            t => this._setStyle(t.key, t.currentValue))
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(go(Yo), go(ya), go(ea)) },
                t.\u0275dir = we({
                  type : t,
                  selectors : [ [ "", "ngStyle", "" ] ],
                  inputs : {ngStyle : "ngStyle"}
                }),
                t
              })(),
                  Oc = (() => {
                    class t {} return t.\u0275mod = ve({type : t}),
                    t.\u0275inj = dt({
                      factory : function(e) { return new (e || t) },
                      providers : [ {provide : wc, useClass : xc} ]
                    }),
                    t
                  })();
              function Pc(t) { return "browser" === t }
              function Rc(t) { return "server" === t }
              let Lc = (() => {
                class t {} return t.\u0275prov = ht({
                  token : t,
                  providedIn : "root",
                  factory : () => new Nc(Zt(nc), window, Zt(pr))
                }),
                t
              })();
              class Nc {
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
                        r = e.top + this.window.pageYOffset, s = this.offset();
                  this.window.scrollTo(n - s[0], r - s[1])
                }
                supportScrollRestoration() {
                  try {
                    if (!this.window || !this.window.scrollTo)
                      return !1;
                    const t = Dc(this.window.history) ||
                              Dc(Object.getPrototypeOf(this.window.history));
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
              function Dc(t) {
                return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
              }
              class Mc extends class extends class {}
              {constructor() { super() } supportsDOMEvents() { return !0 }} {
                static makeCurrent() {
                  var t;
                  t = new Mc, tc || (tc = t)
                }
                getProperty(t, e) { return t[e] }
                log(t) {
                  window.console && window.console.log && window.console.log(t)
                }
                logGroup(t) {
                  window.console && window.console.group &&
                      window.console.group(t)
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
                remove(t) {
                  return t.parentNode && t.parentNode.removeChild(t), t
                }
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
                             : "document" === e ? t
                                                : "body" === e ? t.body : null
                }
                getHistory() { return window.history }
                getLocation() { return window.location }
                getBaseHref(t) {
                  const e = Fc || (Fc = document.querySelector("base"), Fc)
                                ? Fc.getAttribute("href")
                                : null;
                  return null == e
                             ? null
                             : (n = e, jc || (jc = document.createElement("a")),
                                jc.setAttribute("href", n),
                                "/" === jc.pathname.charAt(0)
                                    ? jc.pathname
                                    : "/" + jc.pathname);
                  var n
                }
                resetBaseElement() { Fc = null }
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
                            [ r, s ] = -1 == t
                                           ? [ n, "" ]
                                           : [ n.slice(0, t), n.slice(t + 1) ];
                      if (r.trim() === e)
                        return decodeURIComponent(s)
                    }
                    return null
                  }(document.cookie, t)
                }
              }
              let jc, Fc = null;
              const Uc = new Ut("TRANSITION_ID"), Vc = [
                {
                  provide : sl,
                  useFactory : function(t, e, n) {
                    return () => {
                      n.get(il).donePromise.then(() => {
                        const n = ec();
                        Array.prototype.slice
                            .apply(e.querySelectorAll("style[ng-transition]"))
                            .filter(e => e.getAttribute("ng-transition") === t)
                            .forEach(t => n.remove(t))
                      })
                    }
                  },
                  deps : [ Uc, nc, Xi ],
                  multi : !0
                }
              ];
              class Bc {
                static init() {
                  var t;
                  t = new Bc, jl = t
                }
                addToWindow(t) {
                  Pt.getAngularTestability =
                      (e, n = !0) => {
                        const r = t.findTestabilityInTree(e, n);
                        if (null == r)
                          throw new Error(
                              "Could not find testability for element.");
                        return r
                      },
                  Pt.getAllAngularTestabilities = () => t.getAllTestabilities(),
                  Pt.getAllAngularRootElements = () => t.getAllRootElements(),
                  Pt.frameworkStabilizers || (Pt.frameworkStabilizers = []),
                  Pt.frameworkStabilizers.push(t => {
                    const e = Pt.getAllAngularTestabilities();
                    let n = e.length, r = !1;
                    const s = function(e) { r = r || e, n--, 0 == n && t(r) };
                    e.forEach((function(t) { t.whenStable(s) }))
                  })
                }
                findTestabilityInTree(t, e, n) {
                  if (null == e)
                    return null;
                  const r = t.getTestability(e);
                  return null != r ? r
                                   : n ? ec().isShadowRoot(e)
                                             ? this.findTestabilityInTree(
                                                   t, e.host, !0)
                                             : this.findTestabilityInTree(
                                                   t, e.parentElement, !0)
                                       : null
                }
              }
              const $c = new Ut("EventManagerPlugins");
              let Hc = (() => {
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
                    return this._findPluginFor(e).addGlobalEventListener(t, e,
                                                                         n)
                  }
                  getZone() { return this._zone }
                  _findPluginFor(t) {
                    const e = this._eventNameToPlugin.get(t);
                    if (e)
                      return e;
                    const n = this._plugins;
                    for (let r = 0; r < n.length; r++) {
                      const e = n[r];
                      if (e.supports(t))
                        return this._eventNameToPlugin.set(t, e), e
                    }
                    throw new Error("No event manager plugin found for event " +
                                    t)
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt($c), Zt(Cl)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              class zc {
                constructor(t) { this._doc = t }
                addGlobalEventListener(t, e, n) {
                  const r = ec().getGlobalEventTarget(this._doc, t);
                  if (!r)
                    throw new Error(
                        `Unsupported event target ${r} for event ${e}`);
                  return this.addEventListener(r, e, n)
                }
              }
              let qc = (() => {
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
                  Qc = (() => {
                    class t extends qc {
                      constructor(t) {
                        super(), this._doc = t, this._hostNodes = new Set,
                                 this._styleNodes = new Set,
                                 this._hostNodes.add(t.head)
                      }
                      _addStylesToHost(t, e) {
                        t.forEach(t => {
                          const n = this._doc.createElement("style");
                          n.textContent = t,
                          this._styleNodes.add(e.appendChild(n))
                        })
                      }
                      addHost(t) {
                        this._addStylesToHost(this._stylesSet, t),
                            this._hostNodes.add(t)
                      }
                      removeHost(t) { this._hostNodes.delete(t) }
                      onStylesAdded(t) {
                        this._hostNodes.forEach(e =>
                                                    this._addStylesToHost(t, e))
                      }
                      ngOnDestroy() {
                        this._styleNodes.forEach(t => ec().remove(t))
                      }
                    } return t.\u0275fac =
                                        function(
                                            e) { return new (e || t)(Zt(nc)) },
                                    t.\u0275prov =
                                        ht({token : t, factory : t.\u0275fac}),
                                    t
                  })();
              const Wc = {
                svg : "http://www.w3.org/2000/svg",
                xhtml : "http://www.w3.org/1999/xhtml",
                xlink : "http://www.w3.org/1999/xlink",
                xml : "http://www.w3.org/XML/1998/namespace",
                xmlns : "http://www.w3.org/2000/xmlns/"
              },
                    Gc = /%COMP%/g;
              function Kc(t, e, n) {
                for (let r = 0; r < e.length; r++) {
                  let s = e[r];
                  Array.isArray(s) ? Kc(t, s, n)
                                   : (s = s.replace(Gc, t), n.push(s))
                }
                return n
              }
              function Zc(t) {
                return e => {
                  if ("__ngUnwrap__" === e)
                    return t;
                  !1 === t(e) && (e.preventDefault(), e.returnValue = !1)
                }
              }
              let Yc = (() => {
                class t {
                  constructor(t, e, n) {
                    this.eventManager = t, this.sharedStylesHost = e,
                    this.appId = n, this.rendererByCompId = new Map,
                    this.defaultRenderer = new Jc(t)
                  }
                  createRenderer(t, e) {
                    if (!t || !e)
                      return this.defaultRenderer;
                    switch (e.encapsulation) {
                    case he.Emulated: {
                      let n = this.rendererByCompId.get(e.id);
                      return n || (n = new Xc(this.eventManager,
                                              this.sharedStylesHost, e,
                                              this.appId),
                                   this.rendererByCompId.set(e.id, n)),
                             n.applyToHost(t), n
                    }
                    case he.Native:
                    case he.ShadowDom:
                      return new tu(this.eventManager, this.sharedStylesHost, t,
                                    e);
                    default:
                      if (!this.rendererByCompId.has(e.id)) {
                        const t = Kc(e.id, e.styles, []);
                        this.sharedStylesHost.addStyles(t),
                            this.rendererByCompId.set(e.id,
                                                      this.defaultRenderer)
                      }
                      return this.defaultRenderer
                    }
                  }
                  begin() {}
                  end() {}
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Hc), Zt(Qc), Zt(ol)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              class Jc {
                constructor(t) {
                  this.eventManager = t, this.data = Object.create(null)
                }
                destroy() {}
                createElement(t, e) {
                  return e ? document.createElementNS(Wc[e] || e, t)
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
                setAttribute(t, e, n, r) {
                  if (r) {
                    e = r + ":" + e;
                    const s = Wc[r];
                    s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n)
                  } else
                    t.setAttribute(e, n)
                }
                removeAttribute(t, e, n) {
                  if (n) {
                    const r = Wc[n];
                    r ? t.removeAttributeNS(r, e)
                      : t.removeAttribute(`${n}:${e}`)
                  } else
                    t.removeAttribute(e)
                }
                addClass(t, e) { t.classList.add(e) }
                removeClass(t, e) { t.classList.remove(e) }
                setStyle(t, e, n, r) {
                  r&ta.DashCase ? t.style.setProperty(
                                      e, n, r & ta.Important ? "important" : "")
                                : t.style[e] = n
                }
                removeStyle(t, e, n) {
                  n&ta.DashCase ? t.style.removeProperty(e) : t.style[e] = ""
                }
                setProperty(t, e, n) { t[e] = n }
                setValue(t, e) { t.nodeValue = e }
                listen(t, e, n) {
                  return "string" == typeof t
                             ? this.eventManager.addGlobalEventListener(t, e,
                                                                        Zc(n))
                             : this.eventManager.addEventListener(t, e, Zc(n))
                }
              }
              class Xc extends Jc {
                constructor(t, e, n, r) {
                  super(t), this.component = n;
                  const s = Kc(r + "-" + n.id, n.styles, []);
                  e.addStyles(s),
                      this.contentAttr =
                          "_ngcontent-%COMP%".replace(Gc, r + "-" + n.id),
                      this.hostAttr =
                          "_nghost-%COMP%".replace(Gc, r + "-" + n.id)
                }
                applyToHost(t) { super.setAttribute(t, this.hostAttr, "") }
                createElement(t, e) {
                  const n = super.createElement(t, e);
                  return super.setAttribute(n, this.contentAttr, ""), n
                }
              }
              class tu extends Jc {
                constructor(t, e, n, r) {
                  super(t),
                      this.sharedStylesHost = e, this.hostEl = n,
                      this.component = r,
                      this.shadowRoot = r.encapsulation === he.ShadowDom
                                            ? n.attachShadow({mode : "open"})
                                            : n.createShadowRoot(),
                      this.sharedStylesHost.addHost(this.shadowRoot);
                  const s = Kc(r.id, r.styles, []);
                  for (let i = 0; i < s.length; i++) {
                    const t = document.createElement("style");
                    t.textContent = s[i], this.shadowRoot.appendChild(t)
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
              let eu = (() => {
                class t extends zc {
                  constructor(t) { super(t) }
                  supports(t) { return !0 }
                  addEventListener(t, e, n) {
                    return t.addEventListener(e, n, !1),
                           () => this.removeEventListener(t, e, n)
                  }
                  removeEventListener(t, e, n) {
                    return t.removeEventListener(e, n)
                  }
                } return t.\u0275fac =
                                    function(e) { return new (e || t)(Zt(nc)) },
                                t.\u0275prov =
                                    ht({token : t, factory : t.\u0275fac}),
                                t
              })();
              const nu = [ "alt", "control", "meta", "shift" ], ru = {
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
                    su = {
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
                    iu = {
                      alt : t => t.altKey,
                      control : t => t.ctrlKey,
                      meta : t => t.metaKey,
                      shift : t => t.shiftKey
                    };
              let ou = (() => {
                class t extends zc {
                  constructor(t) { super(t) }
                  supports(e) { return null != t.parseEventName(e) }
                  addEventListener(e, n, r) {
                    const s = t.parseEventName(n),
                          i = t.eventCallback(s.fullKey, r,
                                              this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(
                        () => ec().onAndCancel(e, s.domEventName, i))
                  }
                  static parseEventName(e) {
                    const n = e.toLowerCase().split("."), r = n.shift();
                    if (0 === n.length || "keydown" !== r && "keyup" !== r)
                      return null;
                    const s = t._normalizeKey(n.pop());
                    let i = "";
                    if (nu.forEach(t => {
                          const e = n.indexOf(t);
                          e > -1 && (n.splice(e, 1), i += t + ".")
                        }),
                        i += s, 0 != n.length || 0 === s.length)
                      return null;
                    const o = {};
                    return o.domEventName = r, o.fullKey = i, o
                  }
                  static getEventFullKey(t) {
                    let e = "", n = function(t) {
                      let e = t.key;
                      if (null == e) {
                        if (e = t.keyIdentifier, null == e)
                          return "Unidentified";
                        e.startsWith("U+") &&
                            (e = String.fromCharCode(
                                 parseInt(e.substring(2), 16)),
                             3 === t.location && su.hasOwnProperty(e) &&
                                 (e = su[e]))
                      }
                      return ru[e] || e
                    }(t);
                    return n = n.toLowerCase(),
                           " " === n ? n = "space" : "." === n && (n = "dot"),
                           nu.forEach(r => {r != n && (0, iu[r])(t) &&
                                            (e += r + ".")}),
                           e += n, e
                  }
                  static eventCallback(e, n, r) {
                    return s => {
                      t.getEventFullKey(s) === e && r.runGuarded(() => n(s))
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
                } return t.\u0275fac =
                                    function(e) { return new (e || t)(Zt(nc)) },
                                t.\u0275prov =
                                    ht({token : t, factory : t.\u0275fac}),
                                t
              })(),
                  au = (() => {
                    class t {} return t.\u0275fac = function(
                        e) { return new (e || t) },
                    t.\u0275prov = ht({
                      factory : function() { return Zt(lu) },
                      token : t,
                      providedIn : "root"
                    }),
                    t
                  })(),
                  lu = (() => {
                    class t extends au {
                      constructor(t) { super(), this._doc = t }
                      sanitize(t, e) {
                        if (null == e)
                          return null;
                        switch (t) {
                        case Gr.NONE:
                          return e;
                        case Gr.HTML:
                          return wr(e, "HTML") ? br(e) : function(t, e) {
                            let n = null;
                            try {
                              Qr = Qr || function(t) {
                                return function() {
                                  try {
                                    return !!(new window.DOMParser)
                                                 .parseFromString("",
                                                                  "text/html")
                                  } catch (t) {
                                    return !1
                                  }
                                }()
                                           ? new kr
                                           : new Tr(t)
                              }(t);
                              let r = e ? String(e) : "";
                              n = Qr.getInertBodyElement(r);
                              let s = 5, i = r;
                              do {
                                if (0 === s)
                                  throw new Error(
                                      "Failed to sanitize html because the input is unstable");
                                s--, r = i, i = n.innerHTML,
                                     n = Qr.getInertBodyElement(r)
                              } while (r !== i);
                              const o = new $r,
                                    a = o.sanitizeChildren(Wr(n) || n);
                              return Cr() && o.sanitizedSomething &&
                                         console.warn(
                                             "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"),
                                     a
                            } finally {
                              if (n) {
                                const t = Wr(n) || n;
                                for (; t.firstChild;)
                                  t.removeChild(t.firstChild)
                              }
                            }
                          }(this._doc, String(e));
                        case Gr.STYLE:
                          return wr(e, "Style") ? br(e) : e;
                        case Gr.SCRIPT:
                          if (wr(e, "Script"))
                            return br(e);
                          throw new Error(
                              "unsafe value used in a script context");
                        case Gr.URL:
                          return xr(e), wr(e, "URL") ? br(e) : Or(String(e));
                        case Gr.RESOURCE_URL:
                          if (wr(e, "ResourceURL"))
                            return br(e);
                          throw new Error(
                              "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");
                        default:
                          throw new Error(`Unexpected SecurityContext ${
                              t} (see http://g.co/ng/security#xss)`)
                        }
                      }
                      bypassSecurityTrustHtml(t) { return new mr(t) }
                      bypassSecurityTrustStyle(t) { return new gr(t) }
                      bypassSecurityTrustScript(t) { return new yr(t) }
                      bypassSecurityTrustUrl(t) { return new _r(t) }
                      bypassSecurityTrustResourceUrl(t) { return new vr(t) }
                    } return t.\u0275fac =
                                        function(
                                            e) { return new (e || t)(Zt(nc)) },
                                    t.\u0275prov = ht({
                                      factory : function() {
                                        return t = Zt(Vt), new lu(t.get(nc));
                                        var t
                                      },
                                      token : t,
                                      providedIn : "root"
                                    }),
                                    t
                  })();
              const cu =
                  Vl(Yl, "browser",
                     [
                       {provide : ul, useValue : "browser"}, {
                         provide : cl,
                         useValue : function() { Mc.makeCurrent(), Bc.init() },
                         multi : !0
                       },
                       {
                         provide : nc,
                         useFactory : function() {
                           return function(t) { Ve = t }(document), document
                         },
                         deps : []
                       }
                     ]),
                    uu = [
                      [], {provide : Ui, useValue : "root"}, {
                        provide : pr,
                        useFactory : function() { return new pr },
                        deps : []
                      },
                      {
                        provide : $c,
                        useClass : eu,
                        multi : !0,
                        deps : [ nc, Cl, ul ]
                      },
                      {provide : $c, useClass : ou, multi : !0, deps : [ nc ]},
                      [], {provide : Yc, useClass : Yc, deps : [ Hc, Qc, ol ]},
                      {provide : Xo, useExisting : Yc},
                      {provide : qc, useExisting : Qc},
                      {provide : Qc, useClass : Qc, deps : [ nc ]},
                      {provide : Ll, useClass : Ll, deps : [ Cl ]},
                      {provide : Hc, useClass : Hc, deps : [ $c, Cl ]}, []
                    ];
              let hu = (() => {
                class t {
                  constructor(t) {
                    if (t)
                      throw new Error(
                          "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                  }
                  static withServerTransition(e) {
                    return {
                      ngModule: t, providers: [
                        {provide : ol, useValue : e.appId},
                        {provide : Uc, useExisting : ol}, Vc
                      ]
                    }
                  }
                } return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t)(Zt(t, 12)) },
                  providers : uu,
                  imports : [ Oc, Xl ]
                }),
                t
              })();
              function du(...t) {
                let e = t[t.length - 1];
                return C(e) ? (t.pop(), D(t, e)) : z(t)
              }
              "undefined" != typeof window && window;
              class pu extends S {
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
              class fu extends f {
                notifyNext(t, e, n, r, s) { this.destination.next(e) }
                notifyError(t, e) { this.destination.error(t) }
                notifyComplete(t) { this.destination.complete() }
              }
              class mu extends f {
                constructor(t, e, n) {
                  super(), this.parent = t, this.outerValue = e,
                           this.outerIndex = n, this.index = 0
                }
                _next(t) {
                  this.parent.notifyNext(this.outerValue, t, this.outerIndex,
                                         this.index++, this)
                }
                _error(t) {
                  this.parent.notifyError(t, this), this.unsubscribe()
                }
                _complete() {
                  this.parent.notifyComplete(this), this.unsubscribe()
                }
              }
              function gu(t, e, n, r, s = new mu(t, n, r)) {
                if (!s.closed)
                  return e instanceof _ ? e.subscribe(s) : N(e)(s)
              }
              const yu = {};
              class _u {
                constructor(t) { this.resultSelector = t }
                call(t, e) {
                  return e.subscribe(new vu(t, this.resultSelector))
                }
              }
              class vu extends fu {
                constructor(t, e) {
                  super(t), this.resultSelector = e, this.active = 0,
                            this.values = [], this.observables = []
                }
                _next(t) { this.values.push(yu), this.observables.push(t) }
                _complete() {
                  const t = this.observables, e = t.length;
                  if (0 === e)
                    this.destination.complete();
                  else {
                    this.active = e, this.toRespond = e;
                    for (let n = 0; n < e; n++)
                      this.add(gu(this, t[n], void 0, n))
                  }
                }
                notifyComplete(t) {
                  0 == (this.active -= 1) && this.destination.complete()
                }
                notifyNext(t, e, n) {
                  const r = this.values,
                        s = this.toRespond ? r[n] === yu ? --this.toRespond
                                                         : this.toRespond
                                           : 0;
                  r[n] = e, 0 === s && (this.resultSelector
                                            ? this._tryResultSelector(r)
                                            : this.destination.next(r.slice()))
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
              const bu = (() => {
                function t() {
                  return Error.call(this),
                         this.message = "no elements in sequence",
                         this.name = "EmptyError", this
                } return t.prototype = Object.create(Error.prototype),
                t
              })(),
                    wu = new _(t => t.complete());
              function xu(t) {
                return t ? function(t) {
                  return new _(e => t.schedule(() => e.complete()))
                }(t) : wu
              }
              function Su(t) {
                return new _(e => {
                  let n;
                  try {
                    n = t()
                  } catch (r) {
                    return void e.error(r)
                  }
                  return (n ? M(n) : xu()).subscribe(e)
                })
              }
              function Eu() { return H(1) }
              function Cu(t, e) {
                return function(n) { return n.lift(new ku(t, e)) }
              }
              class ku {
                constructor(t, e) { this.predicate = t, this.thisArg = e }
                call(t, e) {
                  return e.subscribe(new Tu(t, this.predicate, this.thisArg))
                }
              }
              class Tu extends f {
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
              const Au = (() => {
                function t() {
                  return Error.call(this),
                         this.message = "argument out of range",
                         this.name = "ArgumentOutOfRangeError", this
                } return t.prototype = Object.create(Error.prototype),
                t
              })();
              function Iu(t) {
                return function(e) { return 0 === t ? xu() : e.lift(new Ou(t)) }
              }
              class Ou {
                constructor(t) {
                  if (this.total = t, this.total < 0)
                    throw new Au
                }
                call(t, e) { return e.subscribe(new Pu(t, this.total)) }
              }
              class Pu extends f {
                constructor(t, e) {
                  super(t), this.total = e, this.ring = new Array,
                            this.count = 0
                }
                _next(t) {
                  const e = this.ring, n = this.total, r = this.count++;
                  e.length < n ? e.push(t) : e[r % n] = t
                }
                _complete() {
                  const t = this.destination;
                  let e = this.count;
                  if (e > 0) {
                    const n =
                        this.count >= this.total ? this.total : this.count,
                          r = this.ring;
                    for (let s = 0; s < n; s++) {
                      const s = e++ % n;
                      t.next(r[s])
                    }
                  }
                  t.complete()
                }
              }
              function Ru(t = Du) { return e => e.lift(new Lu(t)) }
              class Lu {
                constructor(t) { this.errorFactory = t }
                call(t, e) { return e.subscribe(new Nu(t, this.errorFactory)) }
              }
              class Nu extends f {
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
              function Du() { return new bu }
              function Mu(t = null) { return e => e.lift(new ju(t)) }
              class ju {
                constructor(t) { this.defaultValue = t }
                call(t, e) { return e.subscribe(new Fu(t, this.defaultValue)) }
              }
              class Fu extends f {
                constructor(t, e) {
                  super(t), this.defaultValue = e, this.isEmpty = !0
                }
                _next(t) { this.isEmpty = !1, this.destination.next(t) }
                _complete() {
                  this.isEmpty && this.destination.next(this.defaultValue),
                      this.destination.complete()
                }
              }
              function Uu(t, e) {
                return "function" == typeof e
                           ? n => n.pipe(Uu((n, r) => M(t(n, r)).pipe(
                                                k((t, s) => e(n, t, r, s)))))
                           : e => e.lift(new Vu(t))
              }
              class Vu {
                constructor(t) { this.project = t }
                call(t, e) { return e.subscribe(new Bu(t, this.project)) }
              }
              class Bu extends F {
                constructor(t, e) { super(t), this.project = e, this.index = 0 }
                _next(t) {
                  let e;
                  const n = this.index++;
                  try {
                    e = this.project(t, n)
                  } catch (r) {
                    return void this.destination.error(r)
                  }
                  this._innerSub(e)
                }
                _innerSub(t) {
                  const e = this.innerSubscription;
                  e && e.unsubscribe();
                  const n = new j(this), r = this.destination;
                  r.add(n), this.innerSubscription = U(t, n),
                            this.innerSubscription !== n &&
                                r.add(this.innerSubscription)
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
              function $u(t) { return e => 0 === t ? xu() : e.lift(new Hu(t)) }
              class Hu {
                constructor(t) {
                  if (this.total = t, this.total < 0)
                    throw new Au
                }
                call(t, e) { return e.subscribe(new zu(t, this.total)) }
              }
              class zu extends f {
                constructor(t, e) { super(t), this.total = e, this.count = 0 }
                _next(t) {
                  const e = this.total, n = ++this.count;
                  n <= e && (this.destination.next(t),
                             n === e && (this.destination.complete(),
                                         this.unsubscribe()))
                }
              }
              function qu(...t) { return Eu()(du(...t)) }
              class Qu {
                constructor(t, e, n = !1) {
                  this.accumulator = t, this.seed = e, this.hasSeed = n
                }
                call(t, e) {
                  return e.subscribe(
                      new Wu(t, this.accumulator, this.seed, this.hasSeed))
                }
              }
              class Wu extends f {
                constructor(t, e, n, r) {
                  super(t), this.accumulator = e, this._seed = n,
                            this.hasSeed = r, this.index = 0
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
                  } catch (r) {
                    this.destination.error(r)
                  }
                  this.seed = n, this.destination.next(n)
                }
              }
              function Gu(t) {
                return function(e) {
                  const n = new Ku(t), r = e.lift(n);
                  return n.caught = r
                }
              }
              class Ku {
                constructor(t) { this.selector = t }
                call(t, e) {
                  return e.subscribe(new Zu(t, this.selector, this.caught))
                }
              }
              class Zu extends F {
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
                    const r = new j(this);
                    this.add(r);
                    const s = U(n, r);
                    s !== r && this.add(s)
                  }
                }
              }
              function Yu(t, e) { return V(t, e, 1) }
              function Ju(t, e) {
                const n = arguments.length >= 2;
                return r => r.pipe(t ? Cu((e, n) => t(e, n, r)) : y, $u(1),
                                   n ? Mu(e) : Ru(() => new bu))
              }
              function Xu() {}
              function th(t, e, n) {
                return function(r) { return r.lift(new eh(t, e, n)) }
              }
              class eh {
                constructor(t, e, n) {
                  this.nextOrObserver = t, this.error = e, this.complete = n
                }
                call(t, e) {
                  return e.subscribe(
                      new nh(t, this.nextOrObserver, this.error, this.complete))
                }
              }
              class nh extends f {
                constructor(t, e, n, s) {
                  super(t), this._tapNext = Xu, this._tapError = Xu,
                            this._tapComplete = Xu, this._tapError = n || Xu,
                            this._tapComplete = s || Xu,
                            r(e) ? (this._context = this, this._tapNext = e)
                                 : e && (this._context = e,
                                         this._tapNext = e.next || Xu,
                                         this._tapError = e.error || Xu,
                                         this._tapComplete = e.complete || Xu)
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
              class rh {
                constructor(t) { this.callback = t }
                call(t, e) { return e.subscribe(new sh(t, this.callback)) }
              }
              class sh extends f {
                constructor(t, e) { super(t), this.add(new h(e)) }
              }
              class ih {
                constructor(t, e) { this.id = t, this.url = e }
              }
              class oh extends ih {
                constructor(t, e, n = "imperative", r = null) {
                  super(t, e), this.navigationTrigger = n,
                               this.restoredState = r
                }
                toString() {
                  return `NavigationStart(id: ${this.id}, url: '${this.url}')`
                }
              }
              class ah extends ih {
                constructor(t, e, n) { super(t, e), this.urlAfterRedirects = n }
                toString() {
                  return `NavigationEnd(id: ${this.id}, url: '${
                      this.url}', urlAfterRedirects: '${
                      this.urlAfterRedirects}')`
                }
              }
              class lh extends ih {
                constructor(t, e, n) { super(t, e), this.reason = n }
                toString() {
                  return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
                }
              }
              class ch extends ih {
                constructor(t, e, n) { super(t, e), this.error = n }
                toString() {
                  return `NavigationError(id: ${this.id}, url: '${
                      this.url}', error: ${this.error})`
                }
              }
              class uh extends ih {
                constructor(t, e, n, r) {
                  super(t, e), this.urlAfterRedirects = n, this.state = r
                }
                toString() {
                  return `RoutesRecognized(id: ${this.id}, url: '${
                      this.url}', urlAfterRedirects: '${
                      this.urlAfterRedirects}', state: ${this.state})`
                }
              }
              class hh extends ih {
                constructor(t, e, n, r) {
                  super(t, e), this.urlAfterRedirects = n, this.state = r
                }
                toString() {
                  return `GuardsCheckStart(id: ${this.id}, url: '${
                      this.url}', urlAfterRedirects: '${
                      this.urlAfterRedirects}', state: ${this.state})`
                }
              }
              class dh extends ih {
                constructor(t, e, n, r, s) {
                  super(t, e), this.urlAfterRedirects = n, this.state = r,
                               this.shouldActivate = s
                }
                toString() {
                  return `GuardsCheckEnd(id: ${this.id}, url: '${
                      this.url}', urlAfterRedirects: '${
                      this.urlAfterRedirects}', state: ${
                      this.state}, shouldActivate: ${this.shouldActivate})`
                }
              }
              class ph extends ih {
                constructor(t, e, n, r) {
                  super(t, e), this.urlAfterRedirects = n, this.state = r
                }
                toString() {
                  return `ResolveStart(id: ${this.id}, url: '${
                      this.url}', urlAfterRedirects: '${
                      this.urlAfterRedirects}', state: ${this.state})`
                }
              }
              class fh extends ih {
                constructor(t, e, n, r) {
                  super(t, e), this.urlAfterRedirects = n, this.state = r
                }
                toString() {
                  return `ResolveEnd(id: ${this.id}, url: '${
                      this.url}', urlAfterRedirects: '${
                      this.urlAfterRedirects}', state: ${this.state})`
                }
              }
              class mh {
                constructor(t) { this.route = t }
                toString() {
                  return `RouteConfigLoadStart(path: ${this.route.path})`
                }
              }
              class gh {
                constructor(t) { this.route = t }
                toString() {
                  return `RouteConfigLoadEnd(path: ${this.route.path})`
                }
              }
              class yh {
                constructor(t) { this.snapshot = t }
                toString() {
                  return `ChildActivationStart(path: '${
                      this.snapshot.routeConfig &&
                          this.snapshot.routeConfig.path ||
                      ""}')`
                }
              }
              class _h {
                constructor(t) { this.snapshot = t }
                toString() {
                  return `ChildActivationEnd(path: '${
                      this.snapshot.routeConfig &&
                          this.snapshot.routeConfig.path ||
                      ""}')`
                }
              }
              class vh {
                constructor(t) { this.snapshot = t }
                toString() {
                  return `ActivationStart(path: '${
                      this.snapshot.routeConfig &&
                          this.snapshot.routeConfig.path ||
                      ""}')`
                }
              }
              class bh {
                constructor(t) { this.snapshot = t }
                toString() {
                  return `ActivationEnd(path: '${
                      this.snapshot.routeConfig &&
                          this.snapshot.routeConfig.path ||
                      ""}')`
                }
              }
              class wh {
                constructor(t, e, n) {
                  this.routerEvent = t, this.position = e, this.anchor = n
                }
                toString() {
                  return `Scroll(anchor: '${this.anchor}', position: '${
                      this.position ? `${this.position[0]}, ${this.position[1]}`
                                    : null}')`
                }
              }
              const xh = "primary";
              class Sh {
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
              function Eh(t) { return new Sh(t) }
              function Ch(t) {
                const e = Error("NavigationCancelingError: " + t);
                return e.ngNavigationCancelingError = !0, e
              }
              function kh(t, e, n) {
                const r = n.path.split("/");
                if (r.length > t.length)
                  return null;
                if ("full" === n.pathMatch &&
                    (e.hasChildren() || r.length < t.length))
                  return null;
                const s = {};
                for (let i = 0; i < r.length; i++) {
                  const e = r[i], n = t[i];
                  if (e.startsWith(":"))
                    s[e.substring(1)] = n;
                  else if (e !== n.path)
                    return null
                }
                return { consumed: t.slice(0, r.length), posParams: s }
              }
              function Th(t, e) {
                const n = Object.keys(t), r = Object.keys(e);
                if (!n || !r || n.length != r.length)
                  return !1;
                let s;
                for (let i = 0; i < n.length; i++)
                  if (s = n[i], !Ah(t[s], e[s]))
                    return !1;
                return !0
              }
              function Ah(t, e) {
                if (Array.isArray(t) && Array.isArray(e)) {
                  if (t.length !== e.length)
                    return !1;
                  const n = [...t ].sort(), r = [...e ].sort();
                  return n.every((t, e) => r[e] === t)
                }
                return t === e
              }
              function Ih(t) { return Array.prototype.concat.apply([], t) }
              function Oh(t) { return t.length > 0 ? t[t.length - 1] : null }
              function Ph(t, e) {
                for (const n in t)
                  t.hasOwnProperty(n) && e(t[n], n)
              }
              function Rh(t) {
                return (e = t) && "function" == typeof e.subscribe
                           ? t
                           : So(t) ? M(Promise.resolve(t)) : du(t);
                var e
              }
              function Lh(t, e, n) {
                return n ? function(t, e) {
                  return Th(t, e)
                }(t.queryParams, e.queryParams) && function t(e, n) {
                  if (!jh(e.segments, n.segments))
                    return !1;
                  if (e.numberOfChildren !== n.numberOfChildren)
                    return !1;
                  for (const r in n.children) {
                    if (!e.children[r])
                      return !1;
                    if (!t(e.children[r], n.children[r]))
                      return !1
                  }
                  return !0
                }(t.root, e.root) : function(t, e) {
                  return Object.keys(e).length <= Object.keys(t).length &&
                         Object.keys(e).every(n => Ah(t[n], e[n]))
                }(t.queryParams, e.queryParams) && function t(e, n) {
                  return function e(n, r, s) {
                    if (n.segments.length > s.length)
                      return !!jh(n.segments.slice(0, s.length), s) &&
                             !r.hasChildren();
                    if (n.segments.length === s.length) {
                      if (!jh(n.segments, s))
                        return !1;
                      for (const e in r.children) {
                        if (!n.children[e])
                          return !1;
                        if (!t(n.children[e], r.children[e]))
                          return !1
                      }
                      return !0
                    }
                    {
                      const t = s.slice(0, n.segments.length),
                            i = s.slice(n.segments.length);
                      return !!jh(n.segments, t) && !!n.children.primary &&
                             e(n.children.primary, r, i)
                    }
                  }(e, n, n.segments)
                }(t.root, e.root)
              }
              class Nh {
                constructor(t, e, n) {
                  this.root = t, this.queryParams = e, this.fragment = n
                }
                get queryParamMap() {
                  return this._queryParamMap ||
                             (this._queryParamMap = Eh(this.queryParams)),
                         this._queryParamMap
                }
                toString() { return Bh.serialize(this) }
              }
              class Dh {
                constructor(t, e) {
                  this.segments = t, this.children = e, this.parent = null,
                  Ph(e, (t, e) => t.parent = this)
                }
                hasChildren() { return this.numberOfChildren > 0 }
                get numberOfChildren() {
                  return Object.keys(this.children).length
                }
                toString() { return $h(this) }
              }
              class Mh {
                constructor(t, e) { this.path = t, this.parameters = e }
                get parameterMap() {
                  return this._parameterMap ||
                             (this._parameterMap = Eh(this.parameters)),
                         this._parameterMap
                }
                toString() { return Gh(this) }
              }
              function jh(t, e) {
                return t.length === e.length &&
                       t.every((t, n) => t.path === e[n].path)
              }
              function Fh(t, e) {
                let n = [];
                return Ph(t.children,
                          (t, r) => {r === xh && (n = n.concat(e(t, r)))}),
                       Ph(t.children,
                          (t, r) => {r !== xh && (n = n.concat(e(t, r)))}),
                       n
              }
              class Uh {}
              class Vh {
                parse(t) {
                  const e = new Xh(t);
                  return new Nh(e.parseRootSegment(), e.parseQueryParams(),
                                e.parseFragment())
                }
                serialize(t) {
                  return `${
                         "/" +
                         function t(e, n) {
                           if (!e.hasChildren())
                             return $h(e);
                           if (n) {
                             const n = e.children.primary
                                           ? t(e.children.primary, !1)
                                           : "",
                                   r = [];
                             return Ph(e.children,
                                       (e, n) => {n !== xh &&
                                                  r.push(`${n}:${t(e, !1)}`)}),
                                    r.length > 0 ? `${n}(${r.join("//")})` : n
                           }
                           {
                             const n = Fh(
                                 e, (n, r) =>
                                        r === xh ? [ t(e.children.primary, !1) ]
                                                 : [ `${r}:${t(n, !1)}` ]);
                             return 1 === Object.keys(e.children).length &&
                                            null != e.children.primary
                                        ? `${$h(e)}/${n[0]}`
                                        : `${$h(e)}/(${n.join("//")})`
                           }
                         }(t.root, !0)}${function(t) {
                    const e = Object.keys(t).map(e => {
                      const n = t[e];
                      return Array.isArray(n)
                                 ? n.map(t => `${zh(e)}=${zh(t)}`).join("&")
                                 : `${zh(e)}=${zh(n)}`
                    });
                    return e.length ? "?" + e.join("&") : ""
                  }(t.queryParams)}${
                                  "string" == typeof t.fragment
                                      ? "#" + encodeURI(t.fragment)
                                      : ""}`
                }
              }
              const Bh = new Vh;
              function $h(t) { return t.segments.map(t => Gh(t)).join("/") }
              function Hh(t) {
                return encodeURIComponent(t)
                    .replace(/%40/g, "@")
                    .replace(/%3A/gi, ":")
                    .replace(/%24/g, "$")
                    .replace(/%2C/gi, ",")
              }
              function zh(t) { return Hh(t).replace(/%3B/gi, ";") }
              function qh(t) {
                return Hh(t)
                    .replace(/\(/g, "%28")
                    .replace(/\)/g, "%29")
                    .replace(/%26/gi, "&")
              }
              function Qh(t) { return decodeURIComponent(t) }
              function Wh(t) { return Qh(t.replace(/\+/g, "%20")) }
              function Gh(t) {
                return `${qh(t.path)}${
                    e = t.parameters,
    Object.keys(e).map(t => `;${qh(t)}=${qh(e[t])}`).join("")}`;
                var e
              }
              const Kh = /^[^\/()?;=#]+/;
              function Zh(t) {
                const e = t.match(Kh);
                return e ? e[0] : ""
              }
              const Yh = /^[^=?&#]+/, Jh = /^[^?&#]+/;
              class Xh {
                constructor(t) { this.url = t, this.remaining = t }
                parseRootSegment() {
                  return this.consumeOptional("/"),
                         "" === this.remaining || this.peekStartsWith("?") ||
                                 this.peekStartsWith("#")
                             ? new Dh([], {})
                             : new Dh([], this.parseChildren())
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
                             (n.primary = new Dh(t, e)),
                         n
                }
                parseSegment() {
                  const t = Zh(this.remaining);
                  if ("" === t && this.peekStartsWith(";"))
                    throw new Error(
                        `Empty path url segment cannot have parameters: '${
                            this.remaining}'.`);
                  return this.capture(t),
                         new Mh(Qh(t), this.parseMatrixParams())
                }
                parseMatrixParams() {
                  const t = {};
                  for (; this.consumeOptional(";");)
                    this.parseParam(t);
                  return t
                }
                parseParam(t) {
                  const e = Zh(this.remaining);
                  if (!e)
                    return;
                  this.capture(e);
                  let n = "";
                  if (this.consumeOptional("=")) {
                    const t = Zh(this.remaining);
                    t && (n = t, this.capture(n))
                  }
                  t[Qh(e)] = Qh(n)
                }
                parseQueryParam(t) {
                  const e = function(t) {
                    const e = t.match(Yh);
                    return e ? e[0] : ""
                  }(this.remaining);
                  if (!e)
                    return;
                  this.capture(e);
                  let n = "";
                  if (this.consumeOptional("=")) {
                    const t = function(t) {
                      const e = t.match(Jh);
                      return e ? e[0] : ""
                    }(this.remaining);
                    t && (n = t, this.capture(n))
                  }
                  const r = Wh(e), s = Wh(n);
                  if (t.hasOwnProperty(r)) {
                    let e = t[r];
                    Array.isArray(e) || (e = [ e ], t[r] = e), e.push(s)
                  } else
                    t[r] = s
                }
                parseParens(t) {
                  const e = {};
                  for (this.capture("("); !this.consumeOptional(")") &&
                                          this.remaining.length > 0;) {
                    const n = Zh(this.remaining), r = this.remaining[n.length];
                    if ("/" !== r && ")" !== r && ";" !== r)
                      throw new Error(`Cannot parse url '${this.url}'`);
                    let s = void 0;
                    n.indexOf(":") > -1 ? (s = n.substr(0, n.indexOf(":")),
                                           this.capture(s), this.capture(":"))
                                        : t && (s = xh);
                    const i = this.parseChildren();
                    e[s] =
                        1 === Object.keys(i).length ? i.primary : new Dh([], i),
                    this.consumeOptional("//")
                  }
                  return e
                }
                peekStartsWith(t) { return this.remaining.startsWith(t) }
                consumeOptional(t) {
                  return !!this.peekStartsWith(t) &&
                         (this.remaining = this.remaining.substring(t.length),
                          !0)
                }
                capture(t) {
                  if (!this.consumeOptional(t))
                    throw new Error(`Expected "${t}".`)
                }
              }
              class td {
                constructor(t) { this._root = t }
                get root() { return this._root.value }
                parent(t) {
                  const e = this.pathFromRoot(t);
                  return e.length > 1 ? e[e.length - 2] : null
                }
                children(t) {
                  const e = ed(t, this._root);
                  return e ? e.children.map(t => t.value) : []
                }
                firstChild(t) {
                  const e = ed(t, this._root);
                  return e && e.children.length > 0 ? e.children[0].value : null
                }
                siblings(t) {
                  const e = nd(t, this._root);
                  return e.length < 2 ? []
                                      : e[e.length - 2]
                                            .children.map(t => t.value)
                                            .filter(e => e !== t)
                }
                pathFromRoot(t) { return nd(t, this._root).map(t => t.value) }
              }
              function ed(t, e) {
                if (t === e.value)
                  return e;
                for (const n of e.children) {
                  const e = ed(t, n);
                  if (e)
                    return e
                }
                return null
              }
              function nd(t, e) {
                if (t === e.value)
                  return [ e ];
                for (const n of e.children) {
                  const r = nd(t, n);
                  if (r.length)
                    return r.unshift(e), r
                }
                return []
              }
              class rd {
                constructor(t, e) { this.value = t, this.children = e }
                toString() { return `TreeNode(${this.value})` }
              }
              function sd(t) {
                const e = {};
                return t && t.children.forEach(t => e[t.value.outlet] = t), e
              }
              class id extends td {
                constructor(t, e) { super(t), this.snapshot = e, hd(this, t) }
                toString() { return this.snapshot.toString() }
              }
              function od(t, e) {
                const n =
                    function(t, e) {
                  const n =
                      new cd([], {}, {}, "", {}, xh, e, null, t.root, -1, {});
                  return new ud("", new rd(n, []))
                }(t, e),
                      r = new pu([ new Mh("", {}) ]), s = new pu({}),
                      i = new pu({}), o = new pu({}), a = new pu(""),
                      l = new ad(r, s, o, a, i, xh, e, n.root);
                return l.snapshot = n.root, new id(new rd(l, []), n)
              }
              class ad {
                constructor(t, e, n, r, s, i, o, a) {
                  this.url = t, this.params = e, this.queryParams = n,
                  this.fragment = r, this.data = s, this.outlet = i,
                  this.component = o, this._futureSnapshot = a
                }
                get routeConfig() { return this._futureSnapshot.routeConfig }
                get root() { return this._routerState.root }
                get parent() { return this._routerState.parent(this) }
                get firstChild() { return this._routerState.firstChild(this) }
                get children() { return this._routerState.children(this) }
                get pathFromRoot() {
                  return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                  return this._paramMap ||
                             (this._paramMap = this.params.pipe(k(t => Eh(t)))),
                         this._paramMap
                }
                get queryParamMap() {
                  return this._queryParamMap ||
                             (this._queryParamMap =
                                  this.queryParams.pipe(k(t => Eh(t)))),
                         this._queryParamMap
                }
                toString() {
                  return this.snapshot ? this.snapshot.toString()
                                       : `Future(${this._futureSnapshot})`
                }
              }
              function ld(t, e = "emptyOnly") {
                const n = t.pathFromRoot;
                let r = 0;
                if ("always" !== e)
                  for (r = n.length - 1; r >= 1;) {
                    const t = n[r], e = n[r - 1];
                    if (t.routeConfig && "" === t.routeConfig.path)
                      r--;
                    else {
                      if (e.component)
                        break;
                      r--
                    }
                  }
                return function(t) {
                  return t.reduce(
                      (t, e) => ({
                        params : Object.assign(Object.assign({}, t.params),
                                               e.params),
                        data : Object.assign(Object.assign({}, t.data), e.data),
                        resolve : Object.assign(Object.assign({}, t.resolve),
                                                e._resolvedData)
                      }),
                      {params : {}, data : {}, resolve : {}})
                }(n.slice(r))
              }
              class cd {
                constructor(t, e, n, r, s, i, o, a, l, c, u) {
                  this.url = t, this.params = e, this.queryParams = n,
                  this.fragment = r, this.data = s, this.outlet = i,
                  this.component = o, this.routeConfig = a,
                  this._urlSegment = l, this._lastPathIndex = c,
                  this._resolve = u
                }
                get root() { return this._routerState.root }
                get parent() { return this._routerState.parent(this) }
                get firstChild() { return this._routerState.firstChild(this) }
                get children() { return this._routerState.children(this) }
                get pathFromRoot() {
                  return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                  return this._paramMap || (this._paramMap = Eh(this.params)),
                         this._paramMap
                }
                get queryParamMap() {
                  return this._queryParamMap ||
                             (this._queryParamMap = Eh(this.queryParams)),
                         this._queryParamMap
                }
                toString() {
                  return `Route(url:'${
                      this.url.map(t => t.toString()).join("/")}', path:'${
                      this.routeConfig ? this.routeConfig.path : ""}')`
                }
              }
              class ud extends td {
                constructor(t, e) { super(e), this.url = t, hd(this, e) }
                toString() { return dd(this._root) }
              }
              function hd(t, e) {
                e.value._routerState = t, e.children.forEach(e => hd(t, e))
              }
              function dd(t) {
                const e = t.children.length > 0
                              ? ` { ${t.children.map(dd).join(", ")} } `
                              : "";
                return `${t.value}${e}`
              }
              function pd(t) {
                if (t.snapshot) {
                  const e = t.snapshot, n = t._futureSnapshot;
                  t.snapshot = n,
                  Th(e.queryParams, n.queryParams) ||
                      t.queryParams.next(n.queryParams),
                  e.fragment !== n.fragment && t.fragment.next(n.fragment),
                  Th(e.params, n.params) || t.params.next(n.params),
                  function(t, e) {
                    if (t.length !== e.length)
                      return !1;
                    for (let n = 0; n < t.length; ++n)
                      if (!Th(t[n], e[n]))
                        return !1;
                    return !0
                  }(e.url, n.url) ||
                      t.url.next(n.url),
                  Th(e.data, n.data) || t.data.next(n.data)
                } else
                  t.snapshot = t._futureSnapshot,
                  t.data.next(t._futureSnapshot.data)
              }
              function fd(t, e) {
                var n, r;
                return Th(t.params, e.params) && jh(n = t.url, r = e.url) &&
                       n.every((t, e) => Th(t.parameters, r[e].parameters)) &&
                       !(!t.parent != !e.parent) &&
                       (!t.parent || fd(t.parent, e.parent))
              }
              function md(t) {
                return "object" == typeof t && null != t && !t.outlets &&
                       !t.segmentPath
              }
              function gd(t, e, n, r, s) {
                let i = {};
                return r && Ph(r, (t, e) => {i[e] = Array.isArray(t)
                                                        ? t.map(t => "" + t)
                                                        : "" + t}),
                       new Nh(n.root === t ? e : function t(e, n, r) {
                         const s = {};
                         return Ph(e.children,
                                   (e, i) => {s[i] = e === n ? r : t(e, n, r)}),
                                new Dh(e.segments, s)
                       }(n.root, t, e), i, s)
              }
              class yd {
                constructor(t, e, n) {
                  if (this.isAbsolute = t, this.numberOfDoubleDots = e,
                      this.commands = n, t && n.length > 0 && md(n[0]))
                    throw new Error(
                        "Root segment cannot have matrix parameters");
                  const r = n.find(t => "object" == typeof t && null != t &&
                                        t.outlets);
                  if (r && r !== Oh(n))
                    throw new Error("{outlets:{}} has to be the last command")
                }
                toRoot() {
                  return this.isAbsolute && 1 === this.commands.length &&
                         "/" == this.commands[0]
                }
              }
              class _d {
                constructor(t, e, n) {
                  this.segmentGroup = t, this.processChildren = e,
                  this.index = n
                }
              }
              function vd(t) {
                return "object" == typeof t && null != t && t.outlets
                           ? t.outlets.primary
                           : "" + t
              }
              function bd(t, e, n) {
                if (t || (t = new Dh([], {})),
                    0 === t.segments.length && t.hasChildren())
                  return wd(t, e, n);
                const r = function(t, e, n) {
                  let r = 0, s = e;
                  const i = {match : !1, pathIndex : 0, commandIndex : 0};
                  for (; s < t.segments.length;) {
                    if (r >= n.length)
                      return i;
                    const e = t.segments[s], o = vd(n[r]),
                          a = r < n.length - 1 ? n[r + 1] : null;
                    if (s > 0 && void 0 === o)
                      break;
                    if (o && a && "object" == typeof a &&
                        void 0 === a.outlets) {
                      if (!Cd(o, a, e))
                        return i;
                      r += 2
                    } else {
                      if (!Cd(o, {}, e))
                        return i;
                      r++
                    }
                    s++
                  }
                  return { match: !0, pathIndex: s, commandIndex: r }
                }(t, e, n), s = n.slice(r.commandIndex);
                if (r.match && r.pathIndex < t.segments.length) {
                  const e = new Dh(t.segments.slice(0, r.pathIndex), {});
                  return e.children.primary =
                             new Dh(t.segments.slice(r.pathIndex), t.children),
                         wd(e, 0, s)
                }
                return r.match && 0 === s.length
                           ? new Dh(t.segments, {})
                           : r.match && !t.hasChildren()
                                 ? xd(t, e, n)
                                 : r.match ? wd(t, 0, s) : xd(t, e, n)
              }
              function wd(t, e, n) {
                if (0 === n.length)
                  return new Dh(t.segments, {});
                {
                  const r = function(t) {
                    return "object" == typeof t[0] && null !== t[0] &&
                                   t[0].outlets
                               ? t[0].outlets
                               : {[xh] : t}
                  }(n), s = {};
                  return Ph(r, (n, r) => {null !== n &&
                                          (s[r] = bd(t.children[r], e, n))}),
                         Ph(t.children,
                            (t, e) => {void 0 === r[e] && (s[e] = t)}),
                         new Dh(t.segments, s)
                }
              }
              function xd(t, e, n) {
                const r = t.segments.slice(0, e);
                let s = 0;
                for (; s < n.length;) {
                  if ("object" == typeof n[s] && null !== n[s] &&
                      void 0 !== n[s].outlets) {
                    const t = Sd(n[s].outlets);
                    return new Dh(r, t)
                  }
                  if (0 === s && md(n[0])) {
                    r.push(new Mh(t.segments[e].path, n[0])), s++;
                    continue
                  }
                  const i = vd(n[s]), o = s < n.length - 1 ? n[s + 1] : null;
                  i && o && md(o) ? (r.push(new Mh(i, Ed(o))), s += 2)
                                  : (r.push(new Mh(i, {})), s++)
                }
                return new Dh(r, {})
              }
              function Sd(t) {
                const e = {};
                return Ph(t, (t, n) => {null !== t &&
                                        (e[n] = xd(new Dh([], {}), 0, t))}),
                       e
              }
              function Ed(t) {
                const e = {};
                return Ph(t, (t, n) => e[n] = "" + t), e
              }
              function Cd(t, e, n) { return t == n.path && Th(e, n.parameters) }
              class kd {
                constructor(t, e, n, r) {
                  this.routeReuseStrategy = t, this.futureState = e,
                  this.currState = n, this.forwardEvent = r
                }
                activate(t) {
                  const e = this.futureState._root,
                        n = this.currState ? this.currState._root : null;
                  this.deactivateChildRoutes(e, n, t),
                      pd(this.futureState.root),
                      this.activateChildRoutes(e, n, t)
                }
                deactivateChildRoutes(t, e, n) {
                  const r = sd(e);
                  t.children.forEach(t => {
                    const e = t.value.outlet;
                    this.deactivateRoutes(t, r[e], n), delete r[e]
                  }),
                      Ph(r,
                         (t, e) => {this.deactivateRouteAndItsChildren(t, n)})
                }
                deactivateRoutes(t, e, n) {
                  const r = t.value, s = e ? e.value : null;
                  if (r === s)
                    if (r.component) {
                      const s = n.getContext(r.outlet);
                      s && this.deactivateChildRoutes(t, e, s.children)
                    } else
                      this.deactivateChildRoutes(t, e, n);
                  else
                    s && this.deactivateRouteAndItsChildren(e, n)
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
                          r = n.children.onOutletDeactivated();
                    this.routeReuseStrategy.store(
                        t.value.snapshot,
                        {componentRef : e, route : t, contexts : r})
                  }
                }
                deactivateRouteAndOutlet(t, e) {
                  const n = e.getContext(t.value.outlet);
                  if (n) {
                    const r = sd(t), s = t.value.component ? n.children : e;
                    Ph(r, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
                        n.outlet && (n.outlet.deactivate(),
                                     n.children.onOutletDeactivated())
                  }
                }
                activateChildRoutes(t, e, n) {
                  const r = sd(e);
                  t.children.forEach(t => {
                    this.activateRoutes(t, r[t.value.outlet], n),
                    this.forwardEvent(new bh(t.value.snapshot))
                  }),
                      t.children.length &&
                          this.forwardEvent(new _h(t.value.snapshot))
                }
                activateRoutes(t, e, n) {
                  const r = t.value, s = e ? e.value : null;
                  if (pd(r), r === s)
                    if (r.component) {
                      const s = n.getOrCreateContext(r.outlet);
                      this.activateChildRoutes(t, e, s.children)
                    } else
                      this.activateChildRoutes(t, e, n);
                  else if (r.component) {
                    const e = n.getOrCreateContext(r.outlet);
                    if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
                      const t = this.routeReuseStrategy.retrieve(r.snapshot);
                      this.routeReuseStrategy.store(r.snapshot, null),
                          e.children.onOutletReAttached(t.contexts),
                          e.attachRef = t.componentRef, e.route = t.route.value,
                          e.outlet &&
                              e.outlet.attach(t.componentRef, t.route.value),
                          Td(t.route)
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
                      }(r.snapshot),
                            s = n ? n.module.componentFactoryResolver : null;
                      e.attachRef = null, e.route = r, e.resolver = s,
                      e.outlet && e.outlet.activateWith(r, s),
                      this.activateChildRoutes(t, null, e.children)
                    }
                  } else
                    this.activateChildRoutes(t, null, n)
                }
              }
              function Td(t) { pd(t.value), t.children.forEach(Td) }
              class Ad {
                constructor(t, e) { this.routes = t, this.module = e }
              }
              function Id(t) { return "function" == typeof t }
              function Od(t) { return t instanceof Nh }
              const Pd = Symbol("INITIAL_VALUE");
              function Rd() {
                return Uu(t => function(...t) {
                  let e = void 0, n = void 0;
                  return C(t[t.length - 1]) && (n = t.pop()),
                         "function" == typeof t[t.length - 1] && (e = t.pop()),
                         1 === t.length && l(t[0]) && (t = t[0]),
                         z(t, n).lift(new _u(e))
                }(...t.map(t => t.pipe($u(1),
                                       function(...t) {
                                         const e = t[t.length - 1];
                                         return C(e) ? (t.pop(),
                                                        n => qu(t, n, e))
                                                     : e => qu(t, e)
                                       }(Pd))))
                                   .pipe(
                                       function(t, e) {
                                         let n = !1;
                                         return arguments.length >= 2 &&
                                                    (n = !0),
                                                function(r) {
                                                  return r.lift(new Qu(t, e, n))
                                                }
                                       }(
                                           (t, e) => {
                                             let n = !1;
                                             return e.reduce((t, r, s) => {
                                               if (t !== Pd)
                                                 return t;
                                               if (r === Pd && (n = !0), !n) {
                                                 if (!1 === r)
                                                   return r;
                                                 if (s === e.length - 1 ||
                                                     Od(r))
                                                   return r
                                               }
                                               return t
                                             }, t)
                                           },
                                           Pd),
                                       Cu(t => t !== Pd),
                                       k(t => Od(t) ? t : !0 === t), $u(1)))
              }
              class Ld {
                constructor(t) { this.segmentGroup = t || null }
              }
              class Nd {
                constructor(t) { this.urlTree = t }
              }
              function Dd(t) { return new _(e => e.error(new Ld(t))) }
              function Md(t) { return new _(e => e.error(new Nd(t))) }
              function jd(t) {
                return new _(
                    e => e.error(new Error(
                        `Only absolute redirects can have named outlets. redirectTo: '${
                            t}'`)))
              }
              class Fd {
                constructor(t, e, n, r, s) {
                  this.configLoader = e, this.urlSerializer = n,
                  this.urlTree = r, this.config = s, this.allowRedirects = !0,
                  this.ngModule = t.get(ee)
                }
                apply() {
                  return this
                      .expandSegmentGroup(this.ngModule, this.config,
                                          this.urlTree.root, xh)
                      .pipe(
                          k(t => this.createUrlTree(t, this.urlTree.queryParams,
                                                    this.urlTree.fragment)))
                      .pipe(Gu(t => {
                        if (t instanceof Nd)
                          return this.allowRedirects = !1,
                                 this.match(t.urlTree);
                        if (t instanceof Ld)
                          throw this.noMatchError(t);
                        throw t
                      }))
                }
                match(t) {
                  return this
                      .expandSegmentGroup(this.ngModule, this.config, t.root,
                                          xh)
                      .pipe(k(e => this.createUrlTree(e, t.queryParams,
                                                      t.fragment)))
                      .pipe(Gu(t => {
                        if (t instanceof Ld)
                          throw this.noMatchError(t);
                        throw t
                      }))
                }
                noMatchError(t) {
                  return new Error(`Cannot match any routes. URL Segment: '${
                      t.segmentGroup}'`)
                }
                createUrlTree(t, e, n) {
                  const r = t.segments.length > 0 ? new Dh([], {[xh] : t}) : t;
                  return new Nh(r, e, n)
                }
                expandSegmentGroup(t, e, n, r) {
                  return 0 === n.segments.length && n.hasChildren()
                             ? this.expandChildren(t, e, n).pipe(
                                   k(t => new Dh([], t)))
                             : this.expandSegment(t, n, e, n.segments, r, !0)
                }
                expandChildren(t, e, n) {
                  return function(t, e) {
                    if (0 === Object.keys(t).length)
                      return du({});
                    const n = [], r = [], s = {};
                    return Ph(t,
                              (t, i) => {
                                const o = e(i, t).pipe(k(t => s[i] = t));
                                i === xh ? n.push(o) : r.push(o)
                              }),
                           du.apply(null, n.concat(r))
                               .pipe(Eu(), function(t, e) {
                                 const n = arguments.length >= 2;
                                 return r => r.pipe(
                                            t ? Cu((e, n) => t(e, n, r)) : y,
                                            Iu(1), n ? Mu(e) : Ru(() => new bu))
                               }(), k(() => s))
                  }(n.children, (n, r) => this.expandSegmentGroup(t, e, r, n))
                }
                expandSegment(t, e, n, r, s, i) {
                  return du(...n).pipe(
                      Yu(o =>
                             this.expandSegmentAgainstRoute(t, e, n, o, r, s, i)
                                 .pipe(Gu(t => {
                                   if (t instanceof Ld)
                                     return du(null);
                                   throw t
                                 }))),
                      Ju(t => !!t), Gu((t, n) => {
                        if (t instanceof bu || "EmptyError" === t.name) {
                          if (this.noLeftoversInUrl(e, r, s))
                            return du(new Dh([], {}));
                          throw new Ld(e)
                        }
                        throw t
                      }))
                }
                noLeftoversInUrl(t, e, n) {
                  return 0 === e.length && !t.children[n]
                }
                expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
                  return $d(r) !== i
                             ? Dd(e)
                             : void 0 === r.redirectTo
                                   ? this.matchSegmentAgainstRoute(t, e, r, s)
                                   : o && this.allowRedirects
                                         ? this.expandSegmentAgainstRouteUsingRedirect(
                                               t, e, n, r, s, i)
                                         : Dd(e)
                }
                expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
                  return "**" === r.path
                             ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(
                                   t, n, r, i)
                             : this.expandRegularSegmentAgainstRouteUsingRedirect(
                                   t, e, n, r, s, i)
                }
                expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
                  const s = this.applyRedirectCommands([], n.redirectTo, {});
                  return n.redirectTo.startsWith("/")
                             ? Md(s)
                             : this.lineralizeSegments(n, s).pipe(V(n => {
                                 const s = new Dh(n, {});
                                 return this.expandSegment(t, s, e, n, r, !1)
                               }))
                }
                expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s,
                                                              i) {
                  const {
                    matched : o,
                    consumedSegments : a,
                    lastChild : l,
                    positionalParamSegments : c
                  } = Ud(e, r, s);
                  if (!o)
                    return Dd(e);
                  const u = this.applyRedirectCommands(a, r.redirectTo, c);
                  return r.redirectTo.startsWith("/")
                             ? Md(u)
                             : this.lineralizeSegments(r, u).pipe(
                                   V(r => this.expandSegment(
                                         t, e, n, r.concat(s.slice(l)), i, !1)))
                }
                matchSegmentAgainstRoute(t, e, n, r) {
                  if ("**" === n.path)
                    return n.loadChildren
                               ? this.configLoader.load(t.injector, n)
                                     .pipe(k(t => (n._loadedConfig = t,
                                                   new Dh(r, {}))))
                               : du(new Dh(r, {}));
                  const {matched : s, consumedSegments : i, lastChild : o} =
                      Ud(e, n, r);
                  if (!s)
                    return Dd(e);
                  const a = r.slice(o);
                  return this.getChildConfig(t, n, r).pipe(V(t => {
                    const n = t.module, r = t.routes, {
                      segmentGroup : s,
                      slicedSegments : o
                    } = function(t, e, n, r) {
                      return n.length > 0 &&
                                     function(t, e, n) {
                                       return n.some(n => Bd(t, e, n) &&
                                                          $d(n) !== xh)
                                     }(t, n, r)
                                 ? {
                                     segmentGroup : Vd(new Dh(
                                         e,
                                         function(t, e) {
                                           const n = {};
                                           n.primary = e;
                                           for (const r of t)
                                             "" === r.path && $d(r) !== xh &&
                                                 (n[$d(r)] = new Dh([], {}));
                                           return n
                                         }(r, new Dh(n, t.children)))),
                                     slicedSegments : []
                                   }
                                 : 0 === n.length &&
                                           function(t, e, n) {
                                             return n.some(n => Bd(t, e, n))
                                           }(t, n, r)
                                       ? {
                                           segmentGroup : Vd(new Dh(
                                               t.segments,
                                               function(t, e, n, r) {
                                                 const s = {};
                                                 for (const i of n)
                                                   Bd(t, e, i) && !r[$d(i)] &&
                                                       (s[$d(i)] =
                                                            new Dh([], {}));
                                                 return Object.assign(
                                                     Object.assign({}, r), s)
                                               }(t, n, r, t.children))),
                                           slicedSegments : n
                                         }
                                       : {segmentGroup : t, slicedSegments : n}
                    }(e, i, a, r);
                    return 0 === o.length && s.hasChildren()
                               ? this.expandChildren(n, r, s).pipe(
                                     k(t => new Dh(i, t)))
                               : 0 === r.length && 0 === o.length
                                     ? du(new Dh(i, {}))
                                     : this.expandSegment(n, s, r, o, xh, !0)
                                           .pipe(k(
                                               t => new Dh(i.concat(t.segments),
                                                           t.children)))
                  }))
                }
                getChildConfig(t, e, n) {
                  return e.children?du(new Ad(e.children,t)):e.loadChildren?void 0!==e._loadedConfig?du(e._loadedConfig):this.runCanLoadGuards(t.injector,e,n).pipe(V(n=>n?this.configLoader.load(t.injector,e).pipe(k(t=>(e._loadedConfig=t,t))):function(t){return new _(e=>e.error(Ch(`Cannot load children because the guard of the route "path: '${t.path}'" returned false`)))}(e))):du(new Ad([],t))
                }
                runCanLoadGuards(t, e, n) {
                  const r = e.canLoad;
                  return r && 0 !== r.length
                             ? du(r.map(r => {
                                 const s = t.get(r);
                                 let i;
                                 if (function(t) { return t && Id(t.canLoad) }(
                                         s))
                                   i = s.canLoad(e, n);
                                 else {
                                   if (!Id(s))
                                     throw new Error("Invalid CanLoad guard");
                                   i = s(e, n)
                                 }
                                 return Rh(i)
                               }))
                                   .pipe(Rd(), th(t => {
                                           if (!Od(t))
                                             return;
                                           const e = Ch(`Redirecting to "${
                                               this.urlSerializer.serialize(
                                                   t)}"`);
                                           throw e.url = t, e
                                         }),
                                         k(t => !0 === t))
                             : du(!0)
                }
                lineralizeSegments(t, e) {
                  let n = [], r = e.root;
                  for (;;) {
                    if (n = n.concat(r.segments), 0 === r.numberOfChildren)
                      return du(n);
                    if (r.numberOfChildren > 1 || !r.children.primary)
                      return jd(t.redirectTo);
                    r = r.children.primary
                  }
                }
                applyRedirectCommands(t, e, n) {
                  return this.applyRedirectCreatreUrlTree(
                      e, this.urlSerializer.parse(e), t, n)
                }
                applyRedirectCreatreUrlTree(t, e, n, r) {
                  const s = this.createSegmentGroup(t, e.root, n, r);
                  return new Nh(s,
                                this.createQueryParams(
                                    e.queryParams, this.urlTree.queryParams),
                                e.fragment)
                }
                createQueryParams(t, e) {
                  const n = {};
                  return Ph(t, (t, r) => {
                           if ("string" == typeof t && t.startsWith(":")) {
                             const s = t.substring(1);
                             n[r] = e[s]
                           } else
                             n[r] = t
                         }), n
                }
                createSegmentGroup(t, e, n, r) {
                  const s = this.createSegments(t, e.segments, n, r);
                  let i = {};
                  return Ph(e.children,
                            (e, s) => {
                                i[s] = this.createSegmentGroup(t, e, n, r)}),
                         new Dh(s, i)
                }
                createSegments(t, e, n, r) {
                  return e.map(e => e.path.startsWith(":")
                                        ? this.findPosParam(t, e, r)
                                        : this.findOrReturn(e, n))
                }
                findPosParam(t, e, n) {
                  const r = n[e.path.substring(1)];
                  if (!r)
                    throw new Error(
                        `Cannot redirect to '${t}'. Cannot find '${e.path}'.`);
                  return r
                }
                findOrReturn(t, e) {
                  let n = 0;
                  for (const r of e) {
                    if (r.path === t.path)
                      return e.splice(n), r;
                    n++
                  }
                  return t
                }
              }
              function Ud(t, e, n) {
                if ("" === e.path)
                  return "full" === e.pathMatch &&
                                 (t.hasChildren() || n.length > 0)
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
                const r = (e.matcher || kh)(n, t, e);
                return r ? {
                  matched : !0,
                  consumedSegments : r.consumed,
                  lastChild : r.consumed.length,
                  positionalParamSegments : r.posParams
                }
                         : {
                             matched : !1,
                             consumedSegments : [],
                             lastChild : 0,
                             positionalParamSegments : {}
                           }
              }
              function Vd(t) {
                if (1 === t.numberOfChildren && t.children.primary) {
                  const e = t.children.primary;
                  return new Dh(t.segments.concat(e.segments), e.children)
                }
                return t
              }
              function Bd(t, e, n) {
                return (!(t.hasChildren() || e.length > 0) ||
                        "full" !== n.pathMatch) &&
                       "" === n.path && void 0 !== n.redirectTo
              }
              function $d(t) { return t.outlet || xh }
              class Hd {
                constructor(t) {
                  this.path = t, this.route = this.path[this.path.length - 1]
                }
              }
              class zd {
                constructor(t, e) { this.component = t, this.route = e }
              }
              function qd(t, e, n) {
                const r = t._root;
                return function t(
                    e, n, r, s,
                    i = {canDeactivateChecks : [], canActivateChecks : []}) {
                  const o = sd(n);
                  return e.children.forEach(e => {
                    !function(e, n, r, s, i = {
                      canDeactivateChecks : [],
                      canActivateChecks : []
                    }) {
                      const o = e.value, a = n ? n.value : null,
                            l = r ? r.getContext(e.value.outlet) : null;
                      if (a && o.routeConfig === a.routeConfig) {
                        const c = function(t, e, n) {
                          if ("function" == typeof n)
                            return n(t, e);
                          switch (n) {
                          case "pathParamsChange":
                            return !jh(t.url, e.url);
                          case "pathParamsOrQueryParamsChange":
                            return !jh(t.url, e.url) ||
                                   !Th(t.queryParams, e.queryParams);
                          case "always":
                            return !0;
                          case "paramsOrQueryParamsChange":
                            return !fd(t, e) ||
                                   !Th(t.queryParams, e.queryParams);
                          case "paramsChange":
                          default:
                            return !fd(t, e)
                          }
                        }(a, o, o.routeConfig.runGuardsAndResolvers);
                        c ? i.canActivateChecks.push(new Hd(s))
                          : (o.data = a.data,
                             o._resolvedData = a._resolvedData),
                            t(e, n, o.component ? l ? l.children : null : r, s,
                              i),
                            c &&
                                i.canDeactivateChecks.push(new zd(
                                    l && l.outlet && l.outlet.component || null,
                                    a))
                      } else
                        a && Wd(n, l, i), i.canActivateChecks.push(new Hd(s)),
                            t(e, null, o.component ? l ? l.children : null : r,
                              s, i)
                    }(e, o[e.value.outlet], r, s.concat([ e.value ]), i),
                    delete o[e.value.outlet]
                  }),
                         Ph(o, (t, e) => Wd(t, r.getContext(e), i)), i
                }(r, e ? e._root : null, n, [ r.value ])
              }
              function Qd(t, e, n) {
                const r = function(t) {
                  if (!t)
                    return null;
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig)
                      return t._loadedConfig
                  }
                  return null
                }(e);
                return (r ? r.module.injector : n).get(t)
              }
              function Wd(t, e, n) {
                const r = sd(t), s = t.value;
                Ph(r,
                   (t, r) => {Wd(
                       t, s.component ? e ? e.children.getContext(r) : null : e,
                       n)}),
                    n.canDeactivateChecks.push(new zd(
                        s.component && e && e.outlet && e.outlet.isActivated
                            ? e.outlet.component
                            : null,
                        s))
              }
              function Gd(t, e) {
                return null !== t && e && e(new vh(t)), du(!0)
              }
              function Kd(t, e) {
                return null !== t && e && e(new yh(t)), du(!0)
              }
              function Zd(t, e, n) {
                const r = e.routeConfig ? e.routeConfig.canActivate : null;
                return r && 0 !== r.length
                           ? du(r.map(r => Su(() => {
                                        const s = Qd(r, e, n);
                                        let i;
                                        if (function(t) {
                                              return t && Id(t.canActivate)
                                            }(s))
                                          i = Rh(s.canActivate(e, t));
                                        else {
                                          if (!Id(s))
                                            throw new Error(
                                                "Invalid CanActivate guard");
                                          i = Rh(s(e, t))
                                        }
                                        return i.pipe(Ju())
                                      })))
                                 .pipe(Rd())
                           : du(!0)
              }
              function Yd(t, e, n) {
                const r = e[e.length - 1],
                      s = e.slice(0, e.length - 1)
                              .reverse()
                              .map(t => function(t) {
                                const e = t.routeConfig
                                              ? t.routeConfig.canActivateChild
                                              : null;
                                return e && 0 !== e.length
                                           ? {node : t, guards : e}
                                           : null
                              }(t))
                              .filter(t => null !== t)
                              .map(
                                  e => Su(
                                      () =>
                                          du(e.guards.map(s => {
                                            const i = Qd(s, e.node, n);
                                            let o;
                                            if (function(t) {
                                                  return t &&
                                                         Id(t.canActivateChild)
                                                }(i))
                                              o = Rh(i.canActivateChild(r, t));
                                            else {
                                              if (!Id(i))
                                                throw new Error(
                                                    "Invalid CanActivateChild guard");
                                              o = Rh(i(r, t))
                                            }
                                            return o.pipe(Ju())
                                          })).pipe(Rd())));
                return du(s).pipe(Rd())
              }
              class Jd {}
              class Xd {
                constructor(t, e, n, r, s, i) {
                  this.rootComponentType = t, this.config = e, this.urlTree = n,
                  this.url = r, this.paramsInheritanceStrategy = s,
                  this.relativeLinkResolution = i
                }
                recognize() {
                  try {
                    const t = np(this.urlTree.root, [], [], this.config,
                                 this.relativeLinkResolution)
                                  .segmentGroup,
                          e = this.processSegmentGroup(this.config, t, xh),
                          n = new cd([], Object.freeze({}),
                                     Object.freeze(Object.assign(
                                         {}, this.urlTree.queryParams)),
                                     this.urlTree.fragment, {}, xh,
                                     this.rootComponentType, null,
                                     this.urlTree.root, -1, {}),
                          r = new rd(n, e), s = new ud(this.url, r);
                    return this.inheritParamsAndData(s._root), du(s)
                  } catch (t) {
                    return new _(e => e.error(t))
                  }
                }
                inheritParamsAndData(t) {
                  const e = t.value, n = ld(e, this.paramsInheritanceStrategy);
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
                  const n = Fh(e, (e, n) => this.processSegmentGroup(t, e, n));
                  return function(t) {
                    const e = {};
                    t.forEach(t => {
                      const n = e[t.value.outlet];
                      if (n) {
                        const e = n.url.map(t => t.toString()).join("/"),
                              r = t.value.url.map(t => t.toString()).join("/");
                        throw new Error(
                            `Two segments cannot have the same outlet name: '${
                                e}' and '${r}'.`)
                      }
                      e[t.value.outlet] = t.value
                    })
                  }(n),
                         n.sort((t, e) =>
                                    t.value.outlet === xh
                                        ? -1
                                        : e.value.outlet === xh
                                              ? 1
                                              : t.value.outlet.localeCompare(
                                                    e.value.outlet)),
                         n
                }
                processSegment(t, e, n, r) {
                  for (const i of t)
                    try {
                      return this.processSegmentAgainstRoute(i, e, n, r)
                    } catch (s) {
                      if (!(s instanceof Jd))
                        throw s
                    }
                  if (this.noLeftoversInUrl(e, n, r))
                    return [];
                  throw new Jd
                }
                noLeftoversInUrl(t, e, n) {
                  return 0 === e.length && !t.children[n]
                }
                processSegmentAgainstRoute(t, e, n, r) {
                  if (t.redirectTo)
                    throw new Jd;
                  if ((t.outlet || xh) !== r)
                    throw new Jd;
                  let s, i = [], o = [];
                  if ("**" === t.path) {
                    const i = n.length > 0 ? Oh(n).parameters : {};
                    s = new cd(n, i,
                               Object.freeze(
                                   Object.assign({}, this.urlTree.queryParams)),
                               this.urlTree.fragment, ip(t), r, t.component, t,
                               tp(e), ep(e) + n.length, op(t))
                  } else {
                    const a = function(t, e, n) {
                      if ("" === e.path) {
                        if ("full" === e.pathMatch &&
                            (t.hasChildren() || n.length > 0))
                          throw new Jd;
                        return {
                          consumedSegments: [], lastChild: 0, parameters: {}
                        }
                      }
                      const r = (e.matcher || kh)(n, t, e);
                      if (!r)
                        throw new Jd;
                      const s = {};
                      Ph(r.posParams, (t, e) => {s[e] = t.path});
                      const i =
                          r.consumed.length > 0
                              ? Object.assign(Object.assign({}, s),
                                              r.consumed[r.consumed.length - 1]
                                                  .parameters)
                              : s;
                      return {
                        consumedSegments: r.consumed,
                            lastChild: r.consumed.length, parameters: i
                      }
                    }(e, t, n);
                    i = a.consumedSegments, o = n.slice(a.lastChild),
                    s = new cd(i, a.parameters,
                               Object.freeze(
                                   Object.assign({}, this.urlTree.queryParams)),
                               this.urlTree.fragment, ip(t), r, t.component, t,
                               tp(e), ep(e) + i.length, op(t))
                  }
                  const a = function(t) {
                    return t.children
                               ? t.children
                               : t.loadChildren ? t._loadedConfig.routes : []
                  }(t), {segmentGroup : l,
                         slicedSegments :
                             c} = np(e, i, o, a, this.relativeLinkResolution);
                  if (0 === c.length && l.hasChildren()) {
                    const t = this.processChildren(a, l);
                    return [ new rd(s, t) ]
                  }
                  if (0 === a.length && 0 === c.length)
                    return [ new rd(s, []) ];
                  const u = this.processSegment(a, l, c, xh);
                  return [ new rd(s, u) ]
                }
              }
              function tp(t) {
                let e = t;
                for (; e._sourceSegment;)
                  e = e._sourceSegment;
                return e
              }
              function ep(t) {
                let e = t, n = e._segmentIndexShift ? e._segmentIndexShift : 0;
                for (; e._sourceSegment;)
                  e = e._sourceSegment,
                  n += e._segmentIndexShift ? e._segmentIndexShift : 0;
                return n - 1
              }
              function np(t, e, n, r, s) {
                if (n.length > 0 && function(t, e, n) {
                      return n.some(n => rp(t, e, n) && sp(n) !== xh)
                    }(t, n, r)) {
                  const s = new Dh(e, function(t, e, n, r) {
                    const s = {};
                    s.primary = r, r._sourceSegment = t,
                    r._segmentIndexShift = e.length;
                    for (const i of n)
                      if ("" === i.path && sp(i) !== xh) {
                        const n = new Dh([], {});
                        n._sourceSegment = t, n._segmentIndexShift = e.length,
                        s[sp(i)] = n
                      }
                    return s
                  }(t, e, r, new Dh(n, t.children)));
                  return s._sourceSegment = t, s._segmentIndexShift = e.length,
                  {
                    segmentGroup: s, slicedSegments: []
                  }
                }
                if (0 === n.length &&
                    function(t, e, n) { return n.some(n => rp(t, e, n)) }(t, n,
                                                                          r)) {
                  const i = new Dh(t.segments, function(t, e, n, r, s, i) {
                    const o = {};
                    for (const a of r)
                      if (rp(t, n, a) && !s[sp(a)]) {
                        const n = new Dh([], {});
                        n._sourceSegment = t,
                        n._segmentIndexShift =
                            "legacy" === i ? t.segments.length : e.length,
                        o[sp(a)] = n
                      }
                    return Object.assign(Object.assign({}, s), o)
                  }(t, e, n, r, t.children, s));
                  return i._sourceSegment = t, i._segmentIndexShift = e.length,
                  {
                    segmentGroup: i, slicedSegments: n
                  }
                }
                const i = new Dh(t.segments, t.children);
                return i._sourceSegment = t, i._segmentIndexShift = e.length, {
                  segmentGroup: i, slicedSegments: n
                }
              }
              function rp(t, e, n) {
                return (!(t.hasChildren() || e.length > 0) ||
                        "full" !== n.pathMatch) &&
                       "" === n.path && void 0 === n.redirectTo
              }
              function sp(t) { return t.outlet || xh }
              function ip(t) {
                return t.data || {}
              }
              function op(t) {
                return t.resolve || {}
              }
              function ap(t) {
                return function(e) {
                  return e.pipe(Uu(e => {
                    const n = t(e);
                    return n ? M(n).pipe(k(() => e)) : M([ e ])
                  }))
                }
              }
              class lp extends class {
                shouldDetach(t) { return !1 }
                store(t, e) {}
                shouldAttach(t) { return !1 }
                retrieve(t) { return null }
                shouldReuseRoute(t, e) {
                  return t.routeConfig === e.routeConfig
                }
              }
              {}
              let cp = (() => {
                class t {} return t.\u0275fac = function(
                    e) { return new (e || t) },
                t.\u0275cmp = me({
                  type : t,
                  selectors : [ [ "ng-component" ] ],
                  decls : 1,
                  vars : 0,
                  template : function(t, e) { 1&t && xo(0, "router-outlet") },
                  directives : function() { return [ Sp ] },
                  encapsulation : 2
                }),
                t
              })();
              function up(t, e = "") {
                for (let n = 0; n < t.length; n++) {
                  const r = t[n];
                  hp(r, dp(e, r))
                }
              }
              function hp(t, e) {
                if (!t)
                  throw new Error(`\n      Invalid configuration of route '${
                      e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `);
                if (Array.isArray(t))
                  throw new Error(`Invalid configuration of route '${
                      e}': Array cannot be specified`);
                if (!t.component && !t.children && !t.loadChildren &&
                    t.outlet && t.outlet !== xh)
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
                t.children && up(t.children, e)
              }
              function dp(t, e) {
                return e ? t || e.path
                               ? t && !e.path
                                     ? t + "/"
                                     : !t && e.path ? e.path : `${t}/${e.path}`
                               : ""
                         : t
              }
              function pp(t) {
                const e = t.children && t.children.map(pp),
                      n = e ? Object.assign(Object.assign({}, t),
                                            {children : e})
                            : Object.assign({}, t);
                return !n.component && (e || n.loadChildren) && n.outlet &&
                           n.outlet !== xh && (n.component = cp),
                       n
              }
              const fp = new Ut("ROUTES");
              class mp {
                constructor(t, e, n, r) {
                  this.loader = t, this.compiler = e,
                  this.onLoadStartListener = n, this.onLoadEndListener = r
                }
                load(t, e) {
                  return this.onLoadStartListener &&
                             this.onLoadStartListener(e),
                         this.loadModuleFactory(e.loadChildren).pipe(k(n => {
                           this.onLoadEndListener && this.onLoadEndListener(e);
                           const r = n.create(t);
                           return new Ad(Ih(r.injector.get(fp)).map(pp), r)
                         }))
                }
                loadModuleFactory(t) {
                  return "string" == typeof t
                             ? M(this.loader.load(t))
                             : Rh(t()).pipe(V(
                                   t =>
                                       t instanceof ne
                                           ? du(t)
                                           : M(this.compiler.compileModuleAsync(
                                                 t))))
                }
              }
              class gp {
                constructor() {
                  this.outlet = null, this.route = null, this.resolver = null,
                  this.children = new yp, this.attachRef = null
                }
              }
              class yp {
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
                  return e || (e = new gp, this.contexts.set(t, e)), e
                }
                getContext(t) { return this.contexts.get(t) || null }
              }
              class _p {
                shouldProcessUrl(t) { return !0 }
                extract(t) { return t }
                merge(t, e) { return t }
              }
              function vp(t) { throw t }
              function bp(t, e, n) { return e.parse("/") }
              function wp(t, e) { return du(null) }
              let xp = (() => {
                class t {
                  constructor(t, e, n, r, s, i, o, a) {
                    this.rootComponentType = t, this.urlSerializer = e,
                    this.rootContexts = n, this.location = r, this.config = a,
                    this.lastSuccessfulNavigation = null,
                    this.currentNavigation = null,
                    this.lastLocationChangeInfo = null, this.navigationId = 0,
                    this.isNgZoneEnabled = !1, this.events = new S,
                    this.errorHandler = vp, this.malformedUriErrorHandler = bp,
                    this.navigated = !1, this.lastSuccessfulId = -1,
                    this.hooks = {
                      beforePreactivation : wp,
                      afterPreactivation : wp
                    },
                    this.urlHandlingStrategy = new _p,
                    this.routeReuseStrategy = new lp,
                    this.onSameUrlNavigation = "ignore",
                    this.paramsInheritanceStrategy = "emptyOnly",
                    this.urlUpdateStrategy = "deferred",
                    this.relativeLinkResolution = "legacy",
                    this.ngModule = s.get(ee), this.console = s.get(dl);
                    const l = s.get(Cl);
                    this.isNgZoneEnabled = l instanceof Cl, this.resetConfig(a),
                    this.currentUrlTree = new Nh(new Dh([], {}), {}, null),
                    this.rawUrlTree = this.currentUrlTree,
                    this.browserUrlTree = this.currentUrlTree,
                    this.configLoader =
                        new mp(i, o, t => this.triggerEvent(new mh(t)),
                               t => this.triggerEvent(new gh(t))),
                    this.routerState =
                        od(this.currentUrlTree, this.rootComponentType),
                    this.transitions = new pu({
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
                      guards :
                          {canActivateChecks : [], canDeactivateChecks : []},
                      guardsResult : null
                    }),
                    this.navigations = this.setupNavigations(this.transitions),
                    this.processNavigations()
                  }
                  setupNavigations(t) {
                    const e = this.events;
                    return t.pipe(
                        Cu(t => 0 !== t.id),
                        k(t => Object.assign(Object.assign({}, t), {
                          extractedUrl :
                              this.urlHandlingStrategy.extract(t.rawUrl)
                        })),
                        Uu(t => {
                          let n = !1, r = !1;
                          return du(t).pipe(
                              th(t => {
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
                              Uu(t => {
                                const n = !this.navigated ||
                                          t.extractedUrl.toString() !==
                                              this.browserUrlTree.toString();
                                if (("reload" === this.onSameUrlNavigation ||
                                     n) &&
                                    this.urlHandlingStrategy.shouldProcessUrl(
                                        t.rawUrl))
                                  return du(t).pipe(
                                      Uu(t => {
                                        const n = this.transitions.getValue();
                                        return e.next(new oh(
                                                   t.id,
                                                   this.serializeUrl(
                                                       t.extractedUrl),
                                                   t.source, t.restoredState)),
                                               n !== this.transitions.getValue()
                                                   ? wu
                                                   : [ t ]
                                      }),
                                      Uu(t => Promise.resolve(t)),
                                      (r = this.ngModule.injector,
                                       s = this.configLoader,
                                       i = this.urlSerializer, o = this.config,
                                       function(t) {
                                         return t.pipe(Uu(
                                             t =>
                                                 function(t, e, n, r, s) {
                                                   return new Fd(t, e, n, r, s)
                                                       .apply()
                                                 }(r, s, i, t.extractedUrl, o)
                                                     .pipe(k(
                                                         e => Object.assign(
                                                             Object.assign({},
                                                                           t),
                                                             {
                                                               urlAfterRedirects :
                                                                   e
                                                             })))))
                                       }),
                                      th(t => {
                                             this.currentNavigation =
                                                 Object.assign(
                                                     Object.assign(
                                                         {},
                                                         this.currentNavigation),
                                                     {
                                                       finalUrl :
                                                           t.urlAfterRedirects
                                                     })}),
                                      function(t, e, n, r, s) {
                                        return function(i) {
                                          return i.pipe(V(
                                              i =>
                                                  function(t, e, n, r,
                                                           s = "emptyOnly",
                                                           i = "legacy") {
                                                    return new Xd(t, e, n, r, s,
                                                                  i)
                                                        .recognize()
                                                  }(t, e, i.urlAfterRedirects,
                                                    n(i.urlAfterRedirects), r,
                                                    s)
                                                      .pipe(k(
                                                          t => Object.assign(
                                                              Object.assign({},
                                                                            i),
                                                              {
                                                                targetSnapshot :
                                                                    t
                                                              })))))
                                        }
                                      }(this.rootComponentType, this.config,
                                        t => this.serializeUrl(t),
                                        this.paramsInheritanceStrategy,
                                        this.relativeLinkResolution),
                                      th(t => {"eager" ===
                                                   this.urlUpdateStrategy &&
                                               (t.extras.skipLocationChange ||
                                                    this.setBrowserUrl(
                                                        t.urlAfterRedirects,
                                                        !!t.extras.replaceUrl,
                                                        t.id, t.extras.state),
                                                this.browserUrlTree =
                                                    t.urlAfterRedirects)}),
                                      th(t => {
                                        const n = new uh(
                                            t.id,
                                            this.serializeUrl(t.extractedUrl),
                                            this.serializeUrl(
                                                t.urlAfterRedirects),
                                            t.targetSnapshot);
                                        e.next(n)
                                      }));
                                var r, s, i, o;
                                if (n && this.rawUrlTree &&
                                    this.urlHandlingStrategy.shouldProcessUrl(
                                        this.rawUrlTree)) {
                                  const {
                                    id : n,
                                    extractedUrl : r,
                                    source : s,
                                    restoredState : i,
                                    extras : o
                                  } = t,
                                 a = new oh(n, this.serializeUrl(r), s, i);
                                  e.next(a);
                                  const l =
                                      od(r, this.rootComponentType).snapshot;
                                  return du(
                                      Object.assign(Object.assign({}, t), {
                                        targetSnapshot : l,
                                        urlAfterRedirects : r,
                                        extras : Object.assign(
                                            Object.assign({}, o), {
                                              skipLocationChange : !1,
                                              replaceUrl : !1
                                            })
                                      }))
                                }
                                return this.rawUrlTree = t.rawUrl,
                                       this.browserUrlTree =
                                           t.urlAfterRedirects,
                                       t.resolve(null), wu
                              }),
                              ap(t => {
                                const {
                                  targetSnapshot : e,
                                  id : n,
                                  extractedUrl : r,
                                  rawUrl : s,
                                  extras :
                                      {skipLocationChange : i, replaceUrl : o}
                                } = t;
                                return this.hooks.beforePreactivation(e, {
                                  navigationId : n,
                                  appliedUrlTree : r,
                                  rawUrlTree : s,
                                  skipLocationChange : !!i,
                                  replaceUrl : !!o
                                })
                              }),
                              th(t => {
                                const e = new hh(
                                    t.id, this.serializeUrl(t.extractedUrl),
                                    this.serializeUrl(t.urlAfterRedirects),
                                    t.targetSnapshot);
                                this.triggerEvent(e)
                              }),
                              k(t => Object.assign(Object.assign({}, t), {
                                guards : qd(t.targetSnapshot, t.currentSnapshot,
                                            this.rootContexts)
                              })),
                              function(t, e) {
                                return function(n) {
                                  return n.pipe(V(n => {
                                    const {
                                      targetSnapshot : r,
                                      currentSnapshot : s,
                                      guards : {
                                        canActivateChecks : i,
                                        canDeactivateChecks : o
                                      }
                                    } = n;
                                    return 0===o.length&&0===i.length?du(Object.assign(Object.assign({},n),{guardsResult:!0})):function(t,e,n,r){return M(t).pipe(V(t=>function(t,e,n,r,s){const i=e&&e.routeConfig?e.routeConfig.canDeactivate:null;return i&&0!==i.length?du(i.map(i=>{const o=Qd(i,e,s);let a;if(function(t){return t&&Id(t.canDeactivate)}(o))a=Rh(o.canDeactivate(t,e,n,r));else{if(!Id(o))throw new Error("Invalid CanDeactivate guard");a=Rh(o(t,e,n,r))}return a.pipe(Ju())})).pipe(Rd()):du(!0)}(t.component,t.route,n,e,r)),Ju(t=>!0!==t,!0))}(o,r,s,t).pipe(V(n=>n&&"boolean"==typeof n?function(t,e,n,r){return M(e).pipe(Yu(e=>M([Kd(e.route.parent,r),Gd(e.route,r),Yd(t,e.path,n),Zd(t,e.route,n)]).pipe(Eu(),Ju(t=>!0!==t,!0))),Ju(t=>!0!==t,!0))}(r,i,t,e):du(n)),k(t=>Object.assign(Object.assign({},n),{guardsResult:t})))
                                  }))
                                }
                              }(this.ngModule.injector,
                                t => this.triggerEvent(t)),
                              th(t => {
                                if (Od(t.guardsResult)) {
                                  const e = Ch(`Redirecting to "${
                                      this.serializeUrl(t.guardsResult)}"`);
                                  throw e.url = t.guardsResult, e
                                }
                              }),
                              th(t => {
                                const e = new dh(
                                    t.id, this.serializeUrl(t.extractedUrl),
                                    this.serializeUrl(t.urlAfterRedirects),
                                    t.targetSnapshot, !!t.guardsResult);
                                this.triggerEvent(e)
                              }),
                              Cu(t => {
                                if (!t.guardsResult) {
                                  this.resetUrlToCurrentUrlTree();
                                  const n = new lh(
                                      t.id, this.serializeUrl(t.extractedUrl),
                                      "");
                                  return e.next(n), t.resolve(!1), !1
                                }
                                return !0
                              }),
                              ap(t => {
                                if (t.guards.canActivateChecks.length)
                                  return du(t).pipe(
                                      th(t => {
                                        const e = new ph(
                                            t.id,
                                            this.serializeUrl(t.extractedUrl),
                                            this.serializeUrl(
                                                t.urlAfterRedirects),
                                            t.targetSnapshot);
                                        this.triggerEvent(e)
                                      }),
                                      Uu(t => {
                                        let n = !1;
                                        return du(t).pipe(
                                            (r = this.paramsInheritanceStrategy,
                                             s = this.ngModule.injector,
                                             function(t) {
                                               return t.pipe(V(t => {
                                                 const {
                                                   targetSnapshot : e,
                                                   guards :
                                                       {canActivateChecks : n}
                                                 } = t;
                                                 if (!n.length)
                                                   return du(t);
                                                 let i = 0;
                                                 return M(n).pipe(
                                                     Yu(t => function(t, e, n,
                                                                      r) {
                                                       return function(t, e, n,
                                                                       r) {
                                                         const s =
                                                             Object.keys(t);
                                                         if (0 === s.length)
                                                           return du({});
                                                         const i = {};
                                                         return M(s).pipe(
                                                             V(s => function(
                                                                        t, e, n,
                                                                        r) {
                                                               const s =
                                                                   Qd(t, e, r);
                                                               return Rh(
                                                                   s.resolve
                                                                       ? s.resolve(
                                                                             e,
                                                                             n)
                                                                       : s(e,
                                                                           n))
                                                             }(t[s], e, n, r)
                                                                        .pipe(th(
                                                                            t => {
                                                                                i[s] =
                                                                                    t}))),
                                                             Iu(1),
                                                             V(() =>
                                                                   Object.keys(
                                                                             i).length ===
                                                                           s.length
                                                                       ? du(i)
                                                                       : wu))
                                                       }(t._resolve, t, e, r)
                                                           .pipe(k(
                                                               e => (
                                                                   t._resolvedData =
                                                                       e,
                                                                   t.data =
                                                                       Object.assign(
                                                                           Object
                                                                               .assign(
                                                                                   {},
                                                                                   t.data),
                                                                           ld(t,
                                                                              n)
                                                                               .resolve),
                                                                   null)))
                                                     }(t.route, e, r, s)),
                                                     th(() => i++), Iu(1),
                                                     V(e => i === n.length
                                                                ? du(t)
                                                                : wu))
                                               }))
                                             }),
                                            th({
                                              next : () => n = !0,
                                              complete : () => {
                                                if (!n) {
                                                  const n = new lh(
                                                      t.id,
                                                      this.serializeUrl(
                                                          t.extractedUrl),
                                                      "At least one route resolver didn't emit any value.");
                                                  e.next(n), t.resolve(!1)
                                                }
                                              }
                                            }));
                                        var r, s
                                      }),
                                      th(t => {
                                        const e = new fh(
                                            t.id,
                                            this.serializeUrl(t.extractedUrl),
                                            this.serializeUrl(
                                                t.urlAfterRedirects),
                                            t.targetSnapshot);
                                        this.triggerEvent(e)
                                      }))
                              }),
                              ap(t => {
                                const {
                                  targetSnapshot : e,
                                  id : n,
                                  extractedUrl : r,
                                  rawUrl : s,
                                  extras :
                                      {skipLocationChange : i, replaceUrl : o}
                                } = t;
                                return this.hooks.afterPreactivation(e, {
                                  navigationId : n,
                                  appliedUrlTree : r,
                                  rawUrlTree : s,
                                  skipLocationChange : !!i,
                                  replaceUrl : !!o
                                })
                              }),
                              k(t => {
                                const e =
                                    function(t, e, n) {
                                  const r = function t(e, n, r) {
                                    if (r && e.shouldReuseRoute(
                                                 n.value, r.value.snapshot)) {
                                      const s = r.value;
                                      s._futureSnapshot = n.value;
                                      const i = function(e, n, r) {
                                        return n.children.map(n => {
                                          for (const s of r.children)
                                            if (e.shouldReuseRoute(
                                                    s.value.snapshot, n.value))
                                              return t(e, n, s);
                                          return t(e, n)
                                        })
                                      }(e, n, r);
                                      return new rd(s, i)
                                    }
                                    {
                                      const r = e.retrieve(n.value);
                                      if (r) {
                                        const t = r.route;
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
                                          for (let r = 0; r < e.children.length;
                                               ++r)
                                            t(e.children[r], n.children[r])
                                        }(n, t),
                                               t
                                      }
                                      {
                                        const r = new ad(
                                            new pu((s = n.value).url),
                                            new pu(s.params),
                                            new pu(s.queryParams),
                                            new pu(s.fragment), new pu(s.data),
                                            s.outlet, s.component, s),
                                              i = n.children.map(n => t(e, n));
                                        return new rd(r, i)
                                      }
                                    }
                                    var s
                                  }(t, e._root, n ? n._root : void 0);
                                  return new id(r, e)
                                }(this.routeReuseStrategy, t.targetSnapshot,
                                    t.currentRouterState);
                                return Object.assign(Object.assign({}, t),
                                                     {targetRouterState : e})
                              }),
                              th(t => {
                                this.currentUrlTree = t.urlAfterRedirects,
                                this.rawUrlTree =
                                    this.urlHandlingStrategy.merge(
                                        this.currentUrlTree, t.rawUrl),
                                this.routerState = t.targetRouterState,
                                "deferred" === this.urlUpdateStrategy &&
                                    (t.extras.skipLocationChange ||
                                         this.setBrowserUrl(
                                             this.rawUrlTree,
                                             !!t.extras.replaceUrl, t.id,
                                             t.extras.state),
                                     this.browserUrlTree = t.urlAfterRedirects)
                              }),
                              (i = this.rootContexts,
                               o = this.routeReuseStrategy,
                               a = t => this.triggerEvent(t),
                               k(t => (new kd(o, t.targetRouterState,
                                              t.currentRouterState, a)
                                           .activate(i),
                                       t))),
                              th({next() { n = !0 }, complete() { n = !0 }}),
                              (s = () => {
                                if (!n && !r) {
                                  this.resetUrlToCurrentUrlTree();
                                  const n = new lh(
                                      t.id, this.serializeUrl(t.extractedUrl),
                                      `Navigation ID ${
                                          t.id} is not equal to the current navigation id ${
                                          this.navigationId}`);
                                  e.next(n), t.resolve(!1)
                                }
                                this.currentNavigation = null
                              }, t => t.lift(new rh(s))), Gu(n => {
                                if (r = !0,
                                    (s = n) && s.ngNavigationCancelingError) {
                                  const r = Od(n.url);
                                  r || (this.navigated = !0,
                                        this.resetStateAndUrl(
                                            t.currentRouterState,
                                            t.currentUrlTree, t.rawUrl));
                                  const s = new lh(
                                      t.id, this.serializeUrl(t.extractedUrl),
                                      n.message);
                                  e.next(s), r ? setTimeout(() => {
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
                                                        t.currentUrlTree,
                                                        t.rawUrl);
                                  const r = new ch(
                                      t.id, this.serializeUrl(t.extractedUrl),
                                      n);
                                  e.next(r);
                                  try {
                                    t.resolve(this.errorHandler(n))
                                  } catch (i) {
                                    t.reject(i)
                                  }
                                }
                                var s;
                                return wu
                              }));
                          var s, i, o, a
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
                    this.transitions.next(Object.assign(
                        Object.assign({}, this.getTransition()), t))
                  }
                  initialNavigation() {
                    this.setUpLocationChangeListener(),
                        0 === this.navigationId &&
                            this.navigateByUrl(this.location.path(!0),
                                               {replaceUrl : !0})
                  }
                  setUpLocationChangeListener() {
                    this.locationSubscription ||
                        (this.locationSubscription =
                             this.location.subscribe(t => {
                               const e =
                                   this.extractLocationChangeInfoFromEvent(t);
                               this.shouldScheduleNavigation(
                                   this.lastLocationChangeInfo, e) &&
                                   setTimeout(
                                       () => {
                                         const {
                                           source : t,
                                           state : n,
                                           urlTree : r
                                         } = e,
                                        s = {replaceUrl : !0};
                                         if (n) {
                                           const t = Object.assign({}, n);
                                           delete t.navigationId,
                                               0 !== Object.keys(t).length &&
                                                   (s.state = t)
                                         }
                                         this.scheduleNavigation(r, t, n, s)
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
                    up(t), this.config = t.map(pp), this.navigated = !1,
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
                      queryParams : r,
                      fragment : s,
                      preserveQueryParams : i,
                      queryParamsHandling : o,
                      preserveFragment : a
                    } = e;
                    Cr() && i && console && console.warn &&
                        console.warn(
                            "preserveQueryParams is deprecated, use queryParamsHandling instead.");
                    const l = n || this.routerState.root,
                          c = a ? this.currentUrlTree.fragment : s;
                    let u = null;
                    if (o)
                      switch (o) {
                      case "merge":
                        u = Object.assign(
                            Object.assign({}, this.currentUrlTree.queryParams),
                            r);
                        break;
                      case "preserve":
                        u = this.currentUrlTree.queryParams;
                        break;
                      default:
                        u = r || null
                      }
                    else
                      u = i ? this.currentUrlTree.queryParams : r || null;
                    return null !== u && (u = this.removeEmptyProps(u)), function(
                                                                             t,
                                                                             e,
                                                                             n,
                                                                             r,
                                                                             s) {
                      if (0 === n.length)
                        return gd(e.root, e.root, e, r, s);
                      const i = function(t) {
                        if ("string" == typeof t[0] && 1 === t.length &&
                            "/" === t[0])
                          return new yd(!0, 0, t);
                        let e = 0, n = !1;
                        const r = t.reduce((t, r, s) => {
                          if ("object" == typeof r && null != r) {
                            if (r.outlets) {
                              const e = {};
                              return Ph(r.outlets,
                                        (t, n) => {e[n] = "string" == typeof t
                                                              ? t.split("/")
                                                              : t}),
                                     [...t, {outlets : e} ]
                            }
                            if (r.segmentPath)
                              return [...t, r.segmentPath ]
                          }
                          return "string" != typeof r
                                     ? [...t, r ]
                                     : 0 === s
                                           ? (r.split("/").forEach(
                                                  (r, s) => {
                                                      0 == s && "." === r ||
                                                      (0 == s && "" === r
                                                           ? n = !0
                                                           : ".." === r
                                                                 ? e++
                                                                 : "" != r &&
                                                                       t.push(
                                                                           r))}),
                                              t)
                                           : [...t, r ]
                        }, []);
                        return new yd(n, e, r)
                      }(n);
                      if (i.toRoot())
                        return gd(e.root, new Dh([], {}), e, r, s);
                      const o =
                          function(t, e, n) {
                        if (t.isAbsolute)
                          return new _d(e.root, !0, 0);
                        if (-1 === n.snapshot._lastPathIndex) {
                          const t = n.snapshot._urlSegment;
                          return new _d(t, t === e.root, 0)
                        }
                        const r = md(t.commands[0]) ? 0 : 1;
                        return function(t, e, n) {
                          let r = t, s = e, i = n;
                          for (; i > s;) {
                            if (i -= s, r = r.parent, !r)
                              throw new Error("Invalid number of '../'");
                            s = r.segments.length
                          }
                          return new _d(r, !1, s - i)
                        }(n.snapshot._urlSegment, n.snapshot._lastPathIndex + r,
                          t.numberOfDoubleDots)
                      }(i, e, t),
                            a = o.processChildren
                                    ? wd(o.segmentGroup, o.index, i.commands)
                                    : bd(o.segmentGroup, o.index, i.commands);
                      return gd(o.segmentGroup, a, e, r, s)
                    }(l, this.currentUrlTree, t, u, c)
                  }
                  navigateByUrl(t, e = {skipLocationChange : !1}) {
                    Cr() && this.isNgZoneEnabled && !Cl.isInAngularZone() &&
                        this.console.warn(
                            "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?");
                    const n = Od(t) ? t : this.parseUrl(t),
                          r = this.urlHandlingStrategy.merge(n,
                                                             this.rawUrlTree);
                    return this.scheduleNavigation(r, "imperative", null, e)
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
                      e = this.malformedUriErrorHandler(n, this.urlSerializer,
                                                        t)
                    }
                    return e
                  }
                  isActive(t, e) {
                    if (Od(t))
                      return Lh(this.currentUrlTree, t, e);
                    const n = this.parseUrl(t);
                    return Lh(this.currentUrlTree, n, e)
                  }
                  removeEmptyProps(t) {
                    return Object.keys(t).reduce((e, n) => {
                      const r = t[n];
                      return null != r && (e[n] = r), e
                    }, {})
                  }
                  processNavigations() {
                    this.navigations.subscribe(
                        t => {
                          this.navigated = !0,
                          this.lastSuccessfulId = t.id,
                          this.events.next(
                              new ah(t.id, this.serializeUrl(t.extractedUrl),
                                     this.serializeUrl(this.currentUrlTree))),
                          this.lastSuccessfulNavigation =
                              this.currentNavigation,
                          this.currentNavigation = null,
                          t.resolve(!0)
                        },
                        t => {
                            this.console.warn("Unhandled Navigation Error: ")})
                  }
                  scheduleNavigation(t, e, n, r, s) {
                    const i = this.getTransition(),
                          o = "imperative" !== e &&
                              "imperative" === (null == i ? void 0 : i.source),
                          a = (this.lastSuccessfulId === i.id ||
                                       this.currentNavigation
                                   ? i.rawUrl
                                   : i.urlAfterRedirects)
                                  .toString() === t.toString();
                    if (o && a)
                      return Promise.resolve(!0);
                    let l, c, u;
                    s ? (l = s.resolve, c = s.reject, u = s.promise)
                      : u = new Promise((t, e) => {l = t, c = e});
                    const h = ++this.navigationId;
                    return this.setTransition({
                      id : h,
                      source : e,
                      restoredState : n,
                      currentUrlTree : this.currentUrlTree,
                      currentRawUrl : this.rawUrlTree,
                      rawUrl : t,
                      extras : r,
                      resolve : l,
                      reject : c,
                      promise : u,
                      currentSnapshot : this.routerState.snapshot,
                      currentRouterState : this.routerState
                    }),
                           u.catch(t => Promise.reject(t))
                  }
                  setBrowserUrl(t, e, n, r) {
                    const s = this.urlSerializer.serialize(t);
                    r = r || {},
                    this.location.isCurrentPathEqualTo(s) || e
                        ? this.location.replaceState(
                              s, "",
                              Object.assign(Object.assign({}, r),
                                            {navigationId : n}))
                        : this.location.go(s, "",
                                           Object.assign(Object.assign({}, r),
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
                      return new (e || t)(Zt(Fi), Zt(Uh), Zt(yp), Zt(yc),
                                          Zt(Xi), Zt(Ql), Zt(xl), Zt(void 0))
                    },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })(),
                  Sp = (() => {
                    class t {
                      constructor(t, e, n, r, s) {
                        this.parentContexts = t, this.location = e,
                        this.resolver = n, this.changeDetector = s,
                        this.activated = null, this._activatedRoute = null,
                        this.activateEvents = new Ha,
                        this.deactivateEvents = new Ha, this.name = r || xh,
                        t.onChildOutletCreated(this.name, this)
                      }
                      ngOnDestroy() {
                        this.parentContexts.onChildOutletDestroyed(this.name)
                      }
                      ngOnInit() {
                        if (!this.activated) {
                          const t = this.parentContexts.getContext(this.name);
                          t && t.route &&
                              (t.attachRef ? this.attach(t.attachRef, t.route)
                                           : this.activateWith(
                                                 t.route, t.resolver || null))
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
                        return this.activated = null,
                               this._activatedRoute = null, t
                      }
                      attach(t, e) {
                        this.activated = t, this._activatedRoute = e,
                        this.location.insert(t.hostView)
                      }
                      deactivate() {
                        if (this.activated) {
                          const t = this.component;
                          this.activated.destroy(),
                              this.activated = null,
                              this._activatedRoute = null,
                              this.deactivateEvents.emit(t)
                        }
                      }
                      activateWith(t, e) {
                        if (this.isActivated)
                          throw new Error(
                              "Cannot activate an already activated outlet");
                        this._activatedRoute = t;
                        const n =
                            (e = e || this.resolver)
                                .resolveComponentFactory(
                                    t._futureSnapshot.routeConfig.component),
                              r = this.parentContexts
                                      .getOrCreateContext(this.name)
                                      .children,
                              s = new Ep(t, r, this.location.injector);
                        this.activated = this.location.createComponent(
                            n, this.location.length, s),
                        this.changeDetector.markForCheck(),
                        this.activateEvents.emit(this.activated.instance)
                      }
                    } return t.\u0275fac =
                        function(e) {
                          return new (e || t)(go(yp), go(Sa), go(Zo),
                                              yo("name"), go(Mi))
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
              class Ep {
                constructor(t, e, n) {
                  this.route = t, this.childContexts = e, this.parent = n
                }
                get(t, e) {
                  return t === ad ? this.route
                                  : t === yp ? this.childContexts
                                             : this.parent.get(t, e)
                }
              }
              class Cp {}
              class kp {
                preload(t, e) { return du(null) }
              }
              let Tp = (() => {
                class t {
                  constructor(t, e, n, r, s) {
                    this.router = t, this.injector = r,
                    this.preloadingStrategy = s,
                    this.loader = new mp(e, n, e => t.triggerEvent(new mh(e)),
                                         e => t.triggerEvent(new gh(e)))
                  }
                  setUpPreloading() {
                    this.subscription = this.router.events
                                            .pipe(Cu(t => t instanceof ah),
                                                  Yu(() => this.preload()))
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
                    for (const r of e)
                      if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                        const t = r._loadedConfig;
                        n.push(this.processRoutes(t.module, t.routes))
                      } else
                        r.loadChildren && !r.canLoad
                            ? n.push(this.preloadConfig(t, r))
                            : r.children &&
                                  n.push(this.processRoutes(t, r.children));
                    return M(n).pipe(H(), k(t => {}))
                  }
                  preloadConfig(t, e) {
                    return this.preloadingStrategy.preload(
                        e, () => this.loader.load(t.injector, e)
                                     .pipe(V(t => (e._loadedConfig = t,
                                                   this.processRoutes(
                                                       t.module, t.routes)))))
                  }
                } return t.\u0275fac =
                    function(e) {
                      return new (e || t)(Zt(xp), Zt(Ql), Zt(xl), Zt(Xi),
                                          Zt(Cp))
                    },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })(),
                  Ap = (() => {
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
                            t => {t instanceof oh
                                      ? (this.store[this.lastId] =
                                             this.viewportScroller
                                                 .getScrollPosition(),
                                         this.lastSource = t.navigationTrigger,
                                         this.restoredId =
                                             t.restoredState
                                                 ? t.restoredState.navigationId
                                                 : 0)
                                      : t instanceof ah &&
                                            (this.lastId = t.id,
                                             this.scheduleScrollEvent(
                                                 t, this.router
                                                        .parseUrl(
                                                            t.urlAfterRedirects)
                                                        .fragment))})
                      }
                      consumeScrollEvents() {
                        return this.router.events.subscribe(
                            t => {
                                t instanceof wh &&
                                (t.position
                                     ? "top" === this.options
                                                     .scrollPositionRestoration
                                           ? this.viewportScroller
                                                 .scrollToPosition([ 0, 0 ])
                                           : "enabled" ===
                                                     this.options
                                                         .scrollPositionRestoration &&
                                                 this.viewportScroller
                                                     .scrollToPosition(
                                                         t.position)
                                     : t.anchor &&
                                               "enabled" ===
                                                   this.options.anchorScrolling
                                           ? this.viewportScroller
                                                 .scrollToAnchor(t.anchor)
                                           : "disabled" !==
                                                     this.options
                                                         .scrollPositionRestoration &&
                                                 this.viewportScroller
                                                     .scrollToPosition(
                                                         [ 0, 0 ]))})
                      }
                      scheduleScrollEvent(t, e) {
                        this.router.triggerEvent(
                            new wh(t,
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
                    } return t
                        .\u0275fac = function(
                        e) { return new (e || t)(Zt(xp), Zt(Lc), Zt(void 0)) },
                    t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                    t
                  })();
              const Ip = new Ut("ROUTER_CONFIGURATION"),
                    Op = new Ut("ROUTER_FORROOT_GUARD"), Pp = [
                      yc, {provide : Uh, useClass : Vh}, {
                        provide : xp,
                        useFactory : function(t, e, n, r, s, i, o, a = {}, l,
                                              c) {
                          const u = new xp(null, t, e, n, r, s, i, Ih(o));
                          if (l && (u.urlHandlingStrategy = l),
                              c && (u.routeReuseStrategy = c),
                              a.errorHandler &&
                                  (u.errorHandler = a.errorHandler),
                              a.malformedUriErrorHandler &&
                                  (u.malformedUriErrorHandler =
                                       a.malformedUriErrorHandler),
                              a.enableTracing) {
                            const t = ec();
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
                                     (u.urlUpdateStrategy =
                                          a.urlUpdateStrategy),
                                 a.relativeLinkResolution &&
                                     (u.relativeLinkResolution =
                                          a.relativeLinkResolution),
                                 u
                        },
                        deps : [
                          Uh, yp, yc, Xi, Ql, xl, fp, Ip, [ class {}, new it ],
                          [ class {}, new it ]
                        ]
                      },
                      yp, {
                        provide : ad,
                        useFactory : function(t) { return t.routerState.root },
                        deps : [ xp ]
                      },
                      {provide : Ql, useClass : Kl}, Tp, kp, class {
                        preload(t, e) { return e().pipe(Gu(() => du(null))) }
                      },
                      {provide : Ip, useValue : {enableTracing : !1}}
                    ];
              function Rp() { return new Ul("Router", xp) }
              let Lp = (() => {
                class t {
                  constructor(t, e) {}
                  static forRoot(e, n) {
                    return {
                      ngModule: t, providers: [
                        Pp, jp(e), {
                          provide : Op,
                          useFactory : Mp,
                          deps : [ [ xp, new it, new at ] ]
                        },
                        {provide : Ip, useValue : n || {}}, {
                          provide : dc,
                          useFactory : Dp,
                          deps : [ rc, [ new st(fc), new it ], Ip ]
                        },
                        {provide : Ap, useFactory : Np, deps : [ xp, Lc, Ip ]},
                        {
                          provide : Cp,
                          useExisting : n && n.preloadingStrategy
                                            ? n.preloadingStrategy
                                            : kp
                        },
                        {provide : Ul, multi : !0, useFactory : Rp},
                        [
                          Fp, {
                            provide : sl,
                            multi : !0,
                            useFactory : Up,
                            deps : [ Fp ]
                          },
                          {provide : Bp, useFactory : Vp, deps : [ Fp ]},
                          {provide : hl, multi : !0, useExisting : Bp}
                        ]
                      ]
                    }
                  }
                  static forChild(e) {
                    return { ngModule: t, providers: [ jp(e) ] }
                  }
                } return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(
                      e) { return new (e || t)(Zt(Op, 8), Zt(xp, 8)) }
                }),
                t
              })();
              function Np(t, e, n) {
                return n.scrollOffset && e.setOffset(n.scrollOffset),
                       new Ap(t, e, n)
              }
              function Dp(t, e, n = {}) {
                return n.useHash ? new gc(t, e) : new mc(t, e)
              }
              function Mp(t) {
                if (t)
                  throw new Error(
                      "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
                return "guarded"
              }
              function jp(t) {
                return [
                  {provide : to, multi : !0, useValue : t},
                  {provide : fp, multi : !0, useValue : t}
                ]
              }
              let Fp = (() => {
                class t {
                  constructor(t) {
                    this.injector = t, this.initNavigation = !1,
                    this.resultOfPreactivationDone = new S
                  }
                  appInitializer() {
                    return this.injector.get(ic, Promise.resolve(null))
                        .then(() => {
                          let t = null;
                          const e = new Promise(e => t = e),
                                n = this.injector.get(xp),
                                r = this.injector.get(Ip);
                          if (this.isLegacyDisabled(r) ||
                              this.isLegacyEnabled(r))
                            t(!0);
                          else if ("disabled" === r.initialNavigation)
                            n.setUpLocationChangeListener(), t(!0);
                          else {
                            if ("enabled" !== r.initialNavigation)
                              throw new Error(
                                  `Invalid initialNavigation options: '${
                                      r.initialNavigation}'`);
                            n.hooks.afterPreactivation = () =>
                                this.initNavigation
                                    ? du(null)
                                    : (this.initNavigation = !0, t(!0),
                                       this.resultOfPreactivationDone),
                            n.initialNavigation()
                          }
                          return e
                        })
                  }
                  bootstrapListener(t) {
                    const e = this.injector.get(Ip), n = this.injector.get(Tp),
                          r = this.injector.get(Ap), s = this.injector.get(xp),
                          i = this.injector.get(zl);
                    t === i.components[0] &&
                        (this.isLegacyEnabled(e)
                             ? s.initialNavigation()
                             : this.isLegacyDisabled(e) &&
                                   s.setUpLocationChangeListener(),
                         n.setUpPreloading(), r.init(),
                         s.resetRootComponentType(i.componentTypes[0]),
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
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Xi)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              function Up(t) { return t.appInitializer.bind(t) }
              function Vp(t) { return t.bootstrapListener.bind(t) }
              const Bp = new Ut("Router Initializer"), $p = [];
              let Hp, zp = (() => {
                        class t {} return t.\u0275mod = ve({type : t}),
                        t.\u0275inj = dt({
                          factory : function(e) { return new (e || t) },
                          imports : [ [ Lp.forRoot($p) ], Lp ]
                        }),
                        t
                      })();
              try {
                Hp = "undefined" != typeof Intl && Intl.v8BreakIterator
              } catch (Uv) {
                Hp = !1
              }
              let qp, Qp,
                  Wp = (() => {
                    class t {
                      constructor(t) {
                        this._platformId = t,
                        this.isBrowser =
                            this._platformId
                                ? Pc(this._platformId)
                                : "object" == typeof document && !!document,
                        this.EDGE = this.isBrowser &&
                                    /(edge)/i.test(navigator.userAgent),
                        this.TRIDENT =
                            this.isBrowser &&
                            /(msie|trident)/i.test(navigator.userAgent),
                        this.BLINK = this.isBrowser &&
                                     !(!window.chrome && !Hp) &&
                                     "undefined" != typeof CSS && !this.EDGE &&
                                     !this.TRIDENT,
                        this.WEBKIT =
                            this.isBrowser &&
                            /AppleWebKit/i.test(navigator.userAgent) &&
                            !this.BLINK && !this.EDGE && !this.TRIDENT,
                        this.IOS =
                            this.isBrowser &&
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
                        function(e) { return new (e || t)(Zt(ul)) },
                    t.\u0275prov = ht({
                      factory : function() { return new t(Zt(ul)) },
                      token : t,
                      providedIn : "root"
                    }),
                    t
                  })(),
                  Gp = (() => {
                    class t {} return t.\u0275mod = ve({type : t}),
                    t.\u0275inj =
                        dt({factory : function(e) { return new (e || t) }}),
                    t
                  })();
              function Kp(t) {
                return function() {
                  if (null == qp && "undefined" != typeof window)
                    try {
                      window.addEventListener(
                          "test", null,
                          Object.defineProperty({}, "passive",
                                                {get : () => qp = !0}))
                    } finally {
                      qp = qp || !1
                    }
                  return qp
                }()
                           ? t
                           : !!t.capture
              }
              class Zp extends h {
                constructor(t, e) { super() }
                schedule(t, e = 0) { return this }
              }
              class Yp extends Zp {
                constructor(t, e) {
                  super(t, e), this.scheduler = t, this.work = e,
                               this.pending = !1
                }
                schedule(t, e = 0) {
                  if (this.closed)
                    return this;
                  this.state = t;
                  const n = this.id, r = this.scheduler;
                  return null != n && (this.id = this.recycleAsyncId(r, n, e)),
                         this.pending = !0, this.delay = e,
                         this.id =
                             this.id || this.requestAsyncId(r, this.id, e),
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
                      (this.id =
                           this.recycleAsyncId(this.scheduler, this.id, null))
                }
                _execute(t, e) {
                  let n = !1, r = void 0;
                  try {
                    this.work(t)
                  } catch (s) {
                    n = !0, r = !!s && s || new Error(s)
                  }
                  if (n)
                    return this.unsubscribe(), r
                }
                _unsubscribe() {
                  const t = this.id, e = this.scheduler, n = e.actions,
                        r = n.indexOf(this);
                  this.work = null, this.state = null, this.pending = !1,
                  this.scheduler = null, -1 !== r && n.splice(r, 1),
                  null != t && (this.id = this.recycleAsyncId(e, t, null)),
                  this.delay = null
                }
              }
              let Jp = (() => {
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
              class Xp extends Jp {
                constructor(t, e = Jp.now) {
                  super(t, () => Xp.delegate && Xp.delegate !== this
                                     ? Xp.delegate.now()
                                     : e()),
                      this.actions = [], this.active = !1,
                      this.scheduled = void 0
                }
                schedule(t, e = 0, n) {
                  return Xp.delegate && Xp.delegate !== this
                             ? Xp.delegate.schedule(t, e, n)
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
              const tf = new Xp(Yp);
              function ef(t) { return null != t && "" + t != "false" }
              function nf(t, e = 0) {
                return function(t) {
                  return !isNaN(parseFloat(t)) && !isNaN(Number(t))
                }(t)
                           ? Number(t)
                           : e
              }
              function rf(t) { return t instanceof Yo ? t.nativeElement : t }
              function sf(t) { return 0 === t.buttons }
              "undefined" != typeof Element && Element;
              const of = new Ut("cdk-focus-monitor-default-options"),
                    af = Kp({passive : !0, capture : !0});
              let lf = (() => {
                class t {
                  constructor(t, e, n, r) {
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
                            const e = sf(t) ? "keyboard" : "mouse";
                            this._setOriginForCurrentEventQueue(e)
                          }
                        },
                    this._documentTouchstartListener =
                        t => {
                          null != this._touchTimeoutId &&
                              clearTimeout(this._touchTimeoutId),
                              this._lastTouchTarget = cf(t),
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
                          const e = cf(t),
                                n = "focus" === t.type ? this._onFocus
                                                       : this._onBlur;
                          for (let r = e; r; r = r.parentElement)
                            n.call(this, t, r)
                        },
                    this._document = n,
                    this._detectionMode =
                        (null == r ? void 0 : r.detectionMode) || 0
                  }
                  monitor(t, e = !1) {
                    if (!this._platform.isBrowser)
                      return du(null);
                    const n = rf(t), r = function(t) {
                      if (function() {
                            if (null == Qp) {
                              const t = "undefined" != typeof document
                                            ? document.head
                                            : null;
                              Qp = !(!t ||
                                     !t.createShadowRoot && !t.attachShadow)
                            }
                            return Qp
                          }()) {
                        const e = t.getRootNode ? t.getRootNode() : null;
                        if ("undefined" != typeof ShadowRoot && ShadowRoot &&
                            e instanceof ShadowRoot)
                          return e
                      }
                      return null
                    }(n) || this._getDocument(), s = this._elementInfo.get(n);
                    if (s)
                      return e && (s.checkChildren = !0), s.subject;
                    const i = {
                      checkChildren : e,
                      subject : new S,
                      rootNode : r
                    };
                    return this._elementInfo.set(n, i),
                           this._registerGlobalListeners(i), i.subject
                  }
                  stopMonitoring(t) {
                    const e = rf(t), n = this._elementInfo.get(e);
                    n && (n.subject.complete(), this._setClasses(e),
                          this._elementInfo.delete(e),
                          this._removeGlobalListeners(n))
                  }
                  focusVia(t, e, n) {
                    const r = rf(t);
                    this._setOriginForCurrentEventQueue(e),
                        "function" == typeof r.focus && r.focus(n)
                  }
                  ngOnDestroy() {
                    this._elementInfo.forEach((t, e) => this.stopMonitoring(e))
                  }
                  _getDocument() { return this._document || document }
                  _getWindow() {
                    return this._getDocument().defaultView || window
                  }
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
                        this._toggleClass(t, "cdk-touch-focused",
                                          "touch" === e),
                        this._toggleClass(t, "cdk-keyboard-focused",
                                          "keyboard" === e),
                        this._toggleClass(t, "cdk-mouse-focused",
                                          "mouse" === e),
                        this._toggleClass(t, "cdk-program-focused",
                                          "program" === e)
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
                    const e = cf(t);
                    return this._lastTouchTarget instanceof Node &&
                           e instanceof Node &&
                           (e === this._lastTouchTarget ||
                            e.contains(this._lastTouchTarget))
                  }
                  _onFocus(t, e) {
                    const n = this._elementInfo.get(e);
                    if (!n || !n.checkChildren && e !== cf(t))
                      return;
                    const r = this._getFocusOrigin(t);
                    this._setClasses(e, r), this._emitOrigin(n.subject, r),
                        this._lastFocusOrigin = r
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
                      e.addEventListener(
                          "focus", this._rootNodeFocusAndBlurListener, af),
                      e.addEventListener("blur",
                                         this._rootNodeFocusAndBlurListener, af)
                    }),
                        this._rootNodeFocusListenerCount.set(e, n + 1),
                        1 == ++this._monitoredElementCount &&
                            this._ngZone.runOutsideAngular(() => {
                              const t = this._getDocument(),
                                    e = this._getWindow();
                              t.addEventListener(
                                  "keydown", this._documentKeydownListener, af),
                                  t.addEventListener(
                                      "mousedown",
                                      this._documentMousedownListener, af),
                                  t.addEventListener(
                                      "touchstart",
                                      this._documentTouchstartListener, af),
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
                                   "focus", this._rootNodeFocusAndBlurListener,
                                   af),
                               e.removeEventListener(
                                   "blur", this._rootNodeFocusAndBlurListener,
                                   af),
                               this._rootNodeFocusListenerCount.delete(e))
                    }
                    if (!--this._monitoredElementCount) {
                      const t = this._getDocument(), e = this._getWindow();
                      t.removeEventListener("keydown",
                                            this._documentKeydownListener, af),
                          t.removeEventListener(
                              "mousedown", this._documentMousedownListener, af),
                          t.removeEventListener(
                              "touchstart", this._documentTouchstartListener,
                              af),
                          e.removeEventListener("focus",
                                                this._windowFocusListener),
                          clearTimeout(this._windowFocusTimeoutId),
                          clearTimeout(this._touchTimeoutId),
                          clearTimeout(this._originTimeoutId)
                    }
                  }
                } return t.\u0275fac =
                    function(e) {
                      return new (e || t)(Zt(Cl), Zt(Wp), Zt(nc, 8), Zt(of, 8))
                    },
                t.\u0275prov = ht({
                  factory : function() {
                    return new t(Zt(Cl), Zt(Wp), Zt(nc, 8), Zt(of, 8))
                  },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
              function cf(t) {
                return t.composedPath ? t.composedPath()[0] : t.target
              }
              const uf = "cdk-high-contrast-black-on-white",
                    hf = "cdk-high-contrast-white-on-black",
                    df = "cdk-high-contrast-active";
              let pf = (() => {
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
                          r = (n && n.backgroundColor || "").replace(/ /g, "");
                    switch (this._document.body.removeChild(t), r) {
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
                      t.remove(df), t.remove(uf), t.remove(hf);
                      const e = this.getHighContrastMode();
                      1 === e ? (t.add(df), t.add(uf))
                              : 2 === e && (t.add(df), t.add(hf))
                    }
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Wp), Zt(nc)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(Wp), Zt(nc)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
              const ff = new Ut("cdk-dir-doc", {
                providedIn : "root",
                factory : function() { return Yt(nc) }
              });
              let mf = (() => {
                class t {
                  constructor(t) {
                    if (this.value = "ltr", this.change = new Ha, t) {
                      const e =
                          t.documentElement ? t.documentElement.dir : null,
                            n = (t.body ? t.body.dir : null) || e;
                      this.value = "ltr" === n || "rtl" === n ? n : "ltr"
                    }
                  }
                  ngOnDestroy() { this.change.complete() }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(ff, 8)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(ff, 8)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })(),
                  gf = (() => {
                    class t {} return t.\u0275mod = ve({type : t}),
                    t.\u0275inj =
                        dt({factory : function(e) { return new (e || t) }}),
                    t
                  })();
              const yf = new sa("10.2.2");
              class _f {}
              const vf = "*";
              function bf(t, e = null) {
                return { type: 2, steps: t, options: e }
              }
              function wf(t) {
                return { type: 6, styles: t, offset: null }
              }
              function xf(t) { Promise.resolve(null).then(t) }
              class Sf {
                constructor(t = 0, e = 0) {
                  this._onDoneFns = [], this._onStartFns = [],
                  this._onDestroyFns = [], this._started = !1,
                  this._destroyed = !1, this._finished = !1,
                  this.parentPlayer = null, this.totalTime = t + e
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
                  this.hasStarted() ||
                      (this._onStart(), this.triggerMicrotask()),
                      this._started = !0
                }
                triggerMicrotask() { xf(() => this._onFinish()) }
                _onStart() {
                  this._onStartFns.forEach(t => t()), this._onStartFns = []
                }
                pause() {}
                restart() {}
                finish() { this._onFinish() }
                destroy() {
                  this._destroyed ||
                      (this._destroyed = !0,
                       this.hasStarted() || this._onStart(), this.finish(),
                       this._onDestroyFns.forEach(t => t()),
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
              class Ef {
                constructor(t) {
                  this._onDoneFns = [], this._onStartFns = [],
                  this._finished = !1, this._started = !1, this._destroyed = !1,
                  this._onDestroyFns = [], this.parentPlayer = null,
                  this.totalTime = 0, this.players = t;
                  let e = 0, n = 0, r = 0;
                  const s = this.players.length;
                  0 == s ? xf(() => this._onFinish())
                         : this.players.forEach(t => {
                             t.onDone(() => {++e == s && this._onFinish()}),
                             t.onDestroy(() => {++n == s && this._onDestroy()}),
                             t.onStart(() => {++r == s && this._onStart()})
                           }),
                      this.totalTime = this.players.reduce(
                          (t, e) => Math.max(t, e.totalTime), 0)
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
                finish() {
                  this._onFinish(), this.players.forEach(t => t.finish())
                }
                destroy() { this._onDestroy() }
                _onDestroy() {
                  this._destroyed || (this._destroyed = !0, this._onFinish(),
                                      this.players.forEach(t => t.destroy()),
                                      this._onDestroyFns.forEach(t => t()),
                                      this._onDestroyFns = [])
                }
                reset() {
                  this.players.forEach(t => t.reset()), this._destroyed = !1,
                                                        this._finished = !1,
                                                        this._started = !1
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
                  this.players.forEach(
                      t => {t.beforeDestroy && t.beforeDestroy()})
                }
                triggerCallback(t) {
                  const e = "start" == t ? this._onStartFns : this._onDoneFns;
                  e.forEach(t => t()), e.length = 0
                }
              }
              function Cf() {
                return "undefined" != typeof process &&
                       "[object process]" === {}.toString.call(process)
              }
              function kf(t) {
                switch (t.length) {
                case 0:
                  return new Sf;
                case 1:
                  return t[0];
                default:
                  return new Ef(t)
                }
              }
              function Tf(t, e, n, r, s = {}, i = {}) {
                const o = [], a = [];
                let l = -1, c = null;
                if (r.forEach(t => {
                      const n = t.offset, r = n == l, u = r && c || {};
                      Object.keys(t).forEach(n => {
                        let r = n, a = t[n];
                        if ("offset" !== n)
                          switch (r = e.normalizePropertyName(r, o), a) {
                          case "!":
                            a = s[n];
                            break;
                          case vf:
                            a = i[n];
                            break;
                          default:
                            a = e.normalizeStyleValue(n, r, a, o)
                          }
                        u[r] = a
                      }),
                          r || a.push(u), c = u, l = n
                    }),
                    o.length) {
                  const t = "\n - ";
                  throw new Error(
                      `Unable to animate due to the following errors:${t}${
                          o.join(t)}`)
                }
                return a
              }
              function Af(t, e, n, r) {
                switch (e) {
                case "start":
                  t.onStart(() => r(n && If(n, "start", t)));
                  break;
                case "done":
                  t.onDone(() => r(n && If(n, "done", t)));
                  break;
                case "destroy":
                  t.onDestroy(() => r(n && If(n, "destroy", t)))
                }
              }
              function If(t, e, n) {
                const r = n.totalTime,
                      s = Of(t.element, t.triggerName, t.fromState, t.toState,
                             e || t.phaseName, null == r ? t.totalTime : r,
                             !!n.disabled),
                      i = t._data;
                return null != i && (s._data = i), s
              }
              function Of(t, e, n, r, s = "", i = 0, o) {
                return {
                  element: t, triggerName: e, fromState: n, toState: r,
                      phaseName: s, totalTime: i, disabled: !!o
                }
              }
              function Pf(t, e, n) {
                let r;
                return t instanceof Map ? (r = t.get(e), r || t.set(e, r = n))
                                        : (r = t[e], r || (r = t[e] = n)),
                       r
              }
              function Rf(t) {
                const e = t.indexOf(":");
                return [ t.substring(1, e), t.substr(e + 1) ]
              }
              let Lf = (t, e) => !1, Nf = (t, e) => !1, Df = (t, e, n) => [];
              const Mf = Cf();
              (Mf || "undefined" != typeof Element) &&
                  (Lf = (t, e) => t.contains(e),
                   Nf = (() => {
                     if (Mf || Element.prototype.matches)
                       return (t, e) => t.matches(e);
                     {
                       const t = Element.prototype,
                             e = t.matchesSelector || t.mozMatchesSelector ||
                                 t.msMatchesSelector || t.oMatchesSelector ||
                                 t.webkitMatchesSelector;
                       return e ? (t, n) => e.apply(t, [ n ]) : Nf
                     }
                   })(),
                   Df = (t, e, n) => {
                     let r = [];
                     if (n)
                       r.push(...t.querySelectorAll(e));
                     else {
                       const n = t.querySelector(e);
                       n && r.push(n)
                     }
                     return r
                   });
              let jf = null, Ff = !1;
              function Uf(t) {
                jf || (jf = ("undefined" != typeof document ? document.body
                                                            : null) ||
                            {},
                       Ff = !!jf.style && "WebkitAppearance" in jf.style);
                let e = !0;
                return jf.style &&
                           !function(t) { return "ebkit" == t.substring(1, 6) }(
                               t) &&
                           (e = t in jf.style, !e && Ff) &&
                           (e = "Webkit" + t.charAt(0).toUpperCase() +
                                    t.substr(1) in jf.style),
                       e
              }
              const Vf = Nf, Bf = Lf, $f = Df;
              function Hf(t) {
                const e = {};
                return Object.keys(t).forEach(n => {
                  const r = n.replace(/([a-z])([A-Z])/g, "$1-$2");
                  e[r] = t[n]
                }),
                       e
              }
              let zf = (() => {
                class t {
                  validateStyleProperty(t) { return Uf(t) }
                  matchesElement(t, e) { return Vf(t, e) }
                  containsElement(t, e) { return Bf(t, e) }
                  query(t, e, n) { return $f(t, e, n) }
                  computeStyle(t, e, n) { return n || "" }
                  animate(t, e, n, r, s, i = [], o) { return new Sf(n, r) }
                } return t.\u0275fac = function(e) { return new (e || t) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })(),
                  qf = (() => {class t {} return t.NOOP = new zf, t})();
              const Qf = "ng-enter", Wf = "ng-leave", Gf = "ng-trigger",
                    Kf = ".ng-trigger", Zf = "ng-animating",
                    Yf = ".ng-animating";
              function Jf(t) {
                if ("number" == typeof t)
                  return t;
                const e = t.match(/^(-?[\.\d]+)(m?s)/);
                return !e || e.length < 2 ? 0 : Xf(parseFloat(e[1]), e[2])
              }
              function Xf(t, e) {
                switch (e) {
                case "s":
                  return 1e3 * t;
                default:
                  return t
                }
              }
              function tm(t, e, n) {
                return t.hasOwnProperty("duration") ? t : function(t, e, n) {
                  let r, s = 0, i = "";
                  if ("string" == typeof t) {
                    const n = t.match(
                        /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                    if (null === n)
                      return e.push(`The provided timing value "${
                                 t}" is invalid.`),
                             {duration : 0, delay : 0, easing : ""};
                    r = Xf(parseFloat(n[1]), n[2]);
                    const o = n[3];
                    null != o && (s = Xf(parseFloat(o), n[4]));
                    const a = n[5];
                    a && (i = a)
                  } else
                    r = t;
                  if (!n) {
                    let n = !1, i = e.length;
                    r < 0 &&
                        (e.push(
                             "Duration values below 0 are not allowed for this animation step."),
                         n = !0),
                        s < 0 &&
                            (e.push(
                                 "Delay values below 0 are not allowed for this animation step."),
                             n = !0),
                        n && e.splice(
                                 i, 0,
                                 `The provided timing value "${t}" is invalid.`)
                  }
                  return { duration: r, delay: s, easing: i }
                }(t, e, n)
              }
              function em(t, e = {}) {
                return Object.keys(t).forEach(n => {e[n] = t[n]}), e
              }
              function nm(t, e, n = {}) {
                if (e)
                  for (let r in t)
                    n[r] = t[r];
                else
                  em(t, n);
                return n
              }
              function rm(t, e, n) { return n ? e + ":" + n + ";" : "" }
              function sm(t) {
                let e = "";
                for (let n = 0; n < t.style.length; n++) {
                  const r = t.style.item(n);
                  e += rm(0, r, t.style.getPropertyValue(r))
                }
                for (const n in t.style)
                  t.style.hasOwnProperty(n) && !n.startsWith("_") &&
                      (e +=
                       rm(0,
                          n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
                          t.style[n]));
                t.setAttribute("style", e)
              }
              function im(t, e, n) {
                t.style && (Object.keys(e).forEach(r => {
                  const s = pm(r);
                  n && !n.hasOwnProperty(r) && (n[r] = t.style[s]),
                      t.style[s] = e[r]
                }),
                            Cf() && sm(t))
              }
              function om(t, e) {
                t.style && (Object.keys(e).forEach(e => {
                  const n = pm(e);
                  t.style[n] = ""
                }),
                            Cf() && sm(t))
              }
              function am(t) {
                return Array.isArray(t) ? 1 == t.length ? t[0] : bf(t) : t
              }
              const lm = new RegExp("{{\\s*(.+?)\\s*}}", "g");
              function cm(t) {
                let e = [];
                if ("string" == typeof t) {
                  let n;
                  for (; n = lm.exec(t);)
                    e.push(n[1]);
                  lm.lastIndex = 0
                }
                return e
              }
              function um(t, e, n) {
                const r = t.toString(), s = r.replace(lm, (t, r) => {
                  let s = e[r];
                  return e.hasOwnProperty(r) ||
                             (n.push(
                                  "Please provide a value for the animation param " +
                                  r),
                              s = ""),
                         s.toString()
                });
                return s == r ? t : s
              }
              function hm(t) {
                const e = [];
                let n = t.next();
                for (; !n.done;)
                  e.push(n.value), n = t.next();
                return e
              }
              const dm = /-+([a-z0-9])/g;
              function pm(t) {
                return t.replace(dm, (...t) => t[1].toUpperCase())
              }
              function fm(t, e) { return 0 === t || 0 === e }
              function mm(t, e, n) {
                const r = Object.keys(n);
                if (r.length && e.length) {
                  let i = e[0], o = [];
                  if (r.forEach(
                          t => {i.hasOwnProperty(t) || o.push(t), i[t] = n[t]}),
                      o.length)
                    for (var s = 1; s < e.length; s++) {
                      let n = e[s];
                      o.forEach((function(e) { n[e] = ym(t, e) }))
                    }
                }
                return e
              }
              function gm(t, e, n) {
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
                      "Unable to resolve animation metadata node #" + e.type)
                }
              }
              function ym(t, e) { return window.getComputedStyle(t)[e] }
              const _m = "*";
              function vm(t, e) {
                const n = [];
                return "string" == typeof t
                           ? t.split(/\s*,\s*/).forEach(t => function(t, e, n) {
                               if (":" == t[0]) {
                                 const r = function(t, e) {
                                   switch (t) {
                                   case ":enter":
                                     return "void => *";
                                   case ":leave":
                                     return "* => void";
                                   case ":increment":
                                     return (t, e) =>
                                                parseFloat(e) > parseFloat(t);
                                   case ":decrement":
                                     return (t, e) =>
                                                parseFloat(e) < parseFloat(t);
                                   default:
                                     return e.push(
                                                `The transition alias value "${
                                                    t}" is not supported`),
                                            "* => *"
                                   }
                                 }(t, n);
                                 if ("function" == typeof r)
                                   return void e.push(r);
                                 t = r
                               }
                               const r = t.match(
                                   /^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                               if (null == r || r.length < 4)
                                 return n.push(
                                            `The provided transition expression "${
                                                t}" is not supported`),
                                        e;
                               const s = r[1], i = r[2], o = r[3];
                               e.push(xm(s, o)), "<" != i[0] ||
                                                     s == _m && o == _m ||
                                                     e.push(xm(o, s))
                             }(t, n, e))
                           : n.push(t),
                       n
              }
              const bm = new Set([ "true", "1" ]),
                    wm = new Set([ "false", "0" ]);
              function xm(t, e) {
                const n = bm.has(t) || wm.has(t), r = bm.has(e) || wm.has(e);
                return (s, i) => {
                  let o = t == _m || t == s, a = e == _m || e == i;
                  return !o && n && "boolean" == typeof s &&
                             (o = s ? bm.has(t) : wm.has(t)),
                         !a && r && "boolean" == typeof i &&
                             (a = i ? bm.has(e) : wm.has(e)),
                         o && a
                }
              }
              const Sm = new RegExp("s*:selfs*,?", "g");
              function Em(t, e, n) { return new Cm(t).build(e, n) }
              class Cm {
                constructor(t) { this._driver = t }
                build(t, e) {
                  const n = new km(e);
                  return this._resetContextStyleTimingState(n),
                         gm(this, am(t), n)
                }
                _resetContextStyleTimingState(t) {
                  t.currentQuerySelector = "", t.collectedStyles = {},
                  t.collectedStyles[""] = {}, t.currentTime = 0
                }
                visitTrigger(t, e) {
                  let n = e.queryCount = 0, r = e.depCount = 0;
                  const s = [], i = [];
                  return "@" == t.name.charAt(0) &&
                             e.errors.push(
                                 "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"),
                         t.definitions.forEach(t => {
                           if (this._resetContextStyleTimingState(e),
                               0 == t.type) {
                             const n = t, r = n.name;
                             r.toString().split(/\s*,\s*/).forEach(t => {
                               n.name = t,
                               s.push(this.visitState(n, e))
                             }),
                                 n.name = r
                           } else if (1 == t.type) {
                             const s = this.visitTransition(t, e);
                             n += s.queryCount, r += s.depCount, i.push(s)
                           } else
                             e.errors.push(
                                 "only state() and transition() definitions can sit inside of a trigger()")
                         }),
                  {
                    type: 7, name: t.name, states: s, transitions: i,
                        queryCount: n, depCount: r, options: null
                  }
                }
                visitState(t, e) {
                  const n = this.visitStyle(t.styles, e),
                        r = t.options && t.options.params || null;
                  if (n.containsDynamicStyles) {
                    const s = new Set, i = r || {};
                    if (n.styles.forEach(t => {
                          if (Tm(t)) {
                            const e = t;
                            Object.keys(e).forEach(
                                t => {cm(e[t]).forEach(
                                    t => {i.hasOwnProperty(t) || s.add(t)})})
                          }
                        }),
                        s.size) {
                      const n = hm(s.values());
                      e.errors.push(`state("${
                          t.name}", ...) must define default values for all the following style substitutions: ${
                          n.join(", ")}`)
                    }
                  }
                  return {
                    type: 0, name: t.name, style: n,
                        options: r ? {params : r} : null
                  }
                }
                visitTransition(t, e) {
                  e.queryCount = 0, e.depCount = 0;
                  const n = gm(this, am(t.animation), e);
                  return {
                    type: 1, matchers: vm(t.expr, e.errors), animation: n,
                        queryCount: e.queryCount, depCount: e.depCount,
                        options: Am(t.options)
                  }
                }
                visitSequence(t, e) {
                  return {
                    type: 2, steps: t.steps.map(t => gm(this, t, e)),
                        options: Am(t.options)
                  }
                }
                visitGroup(t, e) {
                  const n = e.currentTime;
                  let r = 0;
                  const s = t.steps.map(t => {
                    e.currentTime = n;
                    const s = gm(this, t, e);
                    return r = Math.max(r, e.currentTime), s
                  });
                  return e.currentTime = r, {
                    type: 3, steps: s, options: Am(t.options)
                  }
                }
                visitAnimate(t, e) {
                  const n = function(t, e) {
                    let n = null;
                    if (t.hasOwnProperty("duration"))
                      n = t;
                    else if ("number" == typeof t)
                      return Im(tm(t, e).duration, 0, "");
                    const r = t;
                    if (r.split(/\s+/).some(t => "{" == t.charAt(0) &&
                                                 "{" == t.charAt(1))) {
                      const t = Im(0, 0, "");
                      return t.dynamic = !0, t.strValue = r, t
                    }
                    return n = n || tm(r, e), Im(n.duration, n.delay, n.easing)
                  }(t.timings, e.errors);
                  let r;
                  e.currentAnimateTimings = n;
                  let s = t.styles ? t.styles : wf({});
                  if (5 == s.type)
                    r = this.visitKeyframes(s, e);
                  else {
                    let s = t.styles, i = !1;
                    if (!s) {
                      i = !0;
                      const t = {};
                      n.easing && (t.easing = n.easing), s = wf(t)
                    }
                    e.currentTime += n.duration + n.delay;
                    const o = this.visitStyle(s, e);
                    o.isEmptyStep = i, r = o
                  }
                  return e.currentAnimateTimings = null, {
                    type: 4, timings: n, style: r, options: null
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
                                    ? t == vf
                                          ? n.push(t)
                                          : e.errors.push(
                                                `The provided style string value ${
                                                    t} is not allowed.`)
                                    : n.push(t)})
                      : n.push(t.styles);
                  let r = !1, s = null;
                  return n.forEach(t => {
                    if (Tm(t)) {
                      const e = t, n = e.easing;
                      if (n && (s = n, delete e.easing), !r)
                        for (let t in e)
                          if (e[t].toString().indexOf("{{") >= 0) {
                            r = !0;
                            break
                          }
                    }
                  }),
                  {
                    type: 6, styles: n, easing: s, offset: t.offset,
                        containsDynamicStyles: r, options: null
                  }
                }
                _validateStyleAst(t, e) {
                  const n = e.currentAnimateTimings;
                  let r = e.currentTime, s = e.currentTime;
                  n && s > 0 && (s -= n.duration + n.delay),
                      t.styles.forEach(
                          t => {"string" != typeof t && Object.keys(t).forEach(n => {
                            if (!this._driver.validateStyleProperty(n))
                              return void e.errors.push(`The provided animation property "${
                                  n}" is not a supported CSS property for animations`);
                            const i = e.collectedStyles[e.currentQuerySelector],
                                  o = i[n];
                            let a = !0;
                            o &&
                                (s != r && s >= o.startTime && r <= o.endTime &&
                                     (e.errors.push(`The CSS property "${
                                          n}" that exists between the times of "${
                                          o.startTime}ms" and "${
                                          o.endTime}ms" is also being animated in a parallel animation between the times of "${
                                          s}ms" and "${r}ms"`),
                                      a = !1),
                                 s = o.startTime),
                                a && (i[n] = {startTime : s, endTime : r}),
                                e.options && function(t, e, n) {
                                  const r = e.params || {}, s = cm(t);
                                  s.length &&
                                      s.forEach(
                                          t => {
                                              r.hasOwnProperty(t) ||
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
                  let r = 0;
                  const s = [];
                  let i = !1, o = !1, a = 0;
                  const l = t.steps.map(t => {
                    const n = this._makeStyleAst(t, e);
                    let l = null != n.offset ? n.offset : function(t) {
                      if ("string" == typeof t)
                        return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach(t => {
                          if (Tm(t) && t.hasOwnProperty("offset")) {
                            const n = t;
                            e = parseFloat(n.offset), delete n.offset
                          }
                        });
                      else if (Tm(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        e = parseFloat(n.offset), delete n.offset
                      }
                      return e
                    }(n.styles), c = 0;
                    return null != l && (r++, c = n.offset = l),
                           o = o || c < 0 || c > 1, i = i || c < a, a = c,
                           s.push(c), n
                  });
                  o &&
                      e.errors.push(
                          "Please ensure that all keyframe offsets are between 0 and 1"),
                      i &&
                          e.errors.push(
                              "Please ensure that all keyframe offsets are in order");
                  const c = t.steps.length;
                  let u = 0;
                  r > 0 && r < c
                      ? e.errors.push(
                            "Not all style() steps within the declared keyframes() contain offsets")
                      : 0 == r && (u = 1 / (c - 1));
                  const h = c - 1, d = e.currentTime,
                        p = e.currentAnimateTimings, f = p.duration;
                  return l.forEach((t, r) => {
                    const i = u > 0 ? r == h ? 1 : u * r : s[r], o = i * f;
                    e.currentTime = d + p.delay + o, p.duration = o,
                    this._validateStyleAst(t, e), t.offset = i, n.styles.push(t)
                  }),
                         n
                }
                visitReference(t, e) {
                  return {
                    type: 8, animation: gm(this, am(t.animation), e),
                        options: Am(t.options)
                  }
                }
                visitAnimateChild(t, e) {
                  return e.depCount++, { type: 9, options: Am(t.options) }
                }
                visitAnimateRef(t, e) {
                  return {
                    type: 10, animation: this.visitReference(t.animation, e),
                        options: Am(t.options)
                  }
                }
                visitQuery(t, e) {
                  const n = e.currentQuerySelector, r = t.options || {};
                  e.queryCount++, e.currentQuery = t;
                  const [s, i] = function(t) {
                    const e = !!t.split(/\s*,\s*/).find(t => ":self" == t);
                    return e && (t = t.replace(Sm, "")), [
                      t = t.replace(/@\*/g, Kf)
                              .replace(/@\w+/g,
                                       t => ".ng-trigger-" + t.substr(1))
                              .replace(/:animating/g, Yf),
                      e
                    ]
                  }(t.selector);
                  e.currentQuerySelector = n.length ? n + " " + s : s,
                  Pf(e.collectedStyles, e.currentQuerySelector, {});
                  const o = gm(this, am(t.animation), e);
                  return e.currentQuery = null, e.currentQuerySelector = n, {
                    type: 11, selector: s, limit: r.limit || 0,
                        optional: !!r.optional, includeSelf: i, animation: o,
                        originalSelector: t.selector, options: Am(t.options)
                  }
                }
                visitStagger(t, e) {
                  e.currentQuery ||
                      e.errors.push(
                          "stagger() can only be used inside of query()");
                  const n = "full" === t.timings
                                ? {duration : 0, delay : 0, easing : "full"}
                                : tm(t.timings, e.errors, !0);
                  return {
                    type: 12, animation: gm(this, am(t.animation), e),
                        timings: n, options: null
                  }
                }
              }
              class km {
                constructor(t) {
                  this.errors = t, this.queryCount = 0, this.depCount = 0,
                  this.currentTransition = null, this.currentQuery = null,
                  this.currentQuerySelector = null,
                  this.currentAnimateTimings = null, this.currentTime = 0,
                  this.collectedStyles = {}, this.options = null
                }
              }
              function Tm(t) {
                return !Array.isArray(t) && "object" == typeof t
              }
              function Am(t) {
                var e;
                return t ? (t = em(t)).params &&
                               (t.params = (e = t.params) ? em(e) : null)
                         : t = {},
                           t
              }
              function Im(t, e, n) {
                return { duration: t, delay: e, easing: n }
              }
              function Om(t, e, n, r, s, i, o = null, a = !1) {
                return {
                  type: 1, element: t, keyframes: e, preStyleProps: n,
                      postStyleProps: r, duration: s, delay: i,
                      totalTime: s + i, easing: o, subTimeline: a
                }
              }
              class Pm {
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
              const Rm = new RegExp(":enter", "g"),
                    Lm = new RegExp(":leave", "g");
              function Nm(t, e, n, r, s, i = {}, o = {}, a, l, c = []) {
                return (new Dm).buildKeyframes(t, e, n, r, s, i, o, a, l, c)
              }
              class Dm {
                buildKeyframes(t, e, n, r, s, i, o, a, l, c = []) {
                  l = l || new Pm;
                  const u = new jm(t, e, l, r, s, c, []);
                  u.options = a,
                  u.currentTimeline.setStyles([ i ], null, u.errors, a),
                  gm(this, n, u);
                  const h = u.timelines.filter(t => t.containsAnimation());
                  if (h.length && Object.keys(o).length) {
                    const t = h[h.length - 1];
                    t.allowOnlyTimelineStyles() ||
                        t.setStyles([ o ], null, u.errors, a)
                  }
                  return h.length ? h.map(t => t.buildKeyframes())
                                  : [ Om(e, [], [], [], 0, 0, "", !1) ]
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
                    s != i && e.transformIntoNewTimeline(i)
                  }
                  e.previousNode = t
                }
                visitAnimateRef(t, e) {
                  const n = e.createSubContext(t.options);
                  n.transformIntoNewTimeline(),
                      this.visitReference(t.animation, n),
                      e.transformIntoNewTimeline(n.currentTimeline.currentTime),
                      e.previousNode = t
                }
                _visitSubInstructions(t, e, n) {
                  let r = e.currentTimeline.currentTime;
                  const s = null != n.duration ? Jf(n.duration) : null,
                        i = null != n.delay ? Jf(n.delay) : null;
                  return 0 !== s && t.forEach(t => {
                    const n = e.appendInstructionToTimeline(t, s, i);
                    r = Math.max(r, n.duration + n.delay)
                  }),
                         r
                }
                visitReference(t, e) {
                  e.updateOptions(t.options, !0), gm(this, t.animation, e),
                      e.previousNode = t
                }
                visitSequence(t, e) {
                  const n = e.subContextCount;
                  let r = e;
                  const s = t.options;
                  if (s && (s.params || s.delay) &&
                      (r = e.createSubContext(s), r.transformIntoNewTimeline(),
                       null != s.delay)) {
                    6 == r.previousNode.type &&
                        (r.currentTimeline.snapshotCurrentStyles(),
                         r.previousNode = Mm);
                    const t = Jf(s.delay);
                    r.delayNextStep(t)
                  }
                  t.steps.length &&
                      (t.steps.forEach(t => gm(this, t, r)),
                       r.currentTimeline.applyStylesToKeyframe(),
                       r.subContextCount > n && r.transformIntoNewTimeline()),
                      e.previousNode = t
                }
                visitGroup(t, e) {
                  const n = [];
                  let r = e.currentTimeline.currentTime;
                  const s =
                      t.options && t.options.delay ? Jf(t.options.delay) : 0;
                  t.steps.forEach(i => {
                    const o = e.createSubContext(t.options);
                    s && o.delayNextStep(s), gm(this, i, o),
                        r = Math.max(r, o.currentTimeline.currentTime),
                        n.push(o.currentTimeline)
                  }),
                      n.forEach(
                          t => e.currentTimeline.mergeTimelineCollectedStyles(
                              t)),
                      e.transformIntoNewTimeline(r), e.previousNode = t
                }
                _visitTiming(t, e) {
                  if (t.dynamic) {
                    const n = t.strValue;
                    return tm(e.params ? um(n, e.params, e.errors) : n,
                              e.errors)
                  }
                  return {
                    duration: t.duration, delay: t.delay, easing: t.easing
                  }
                }
                visitAnimate(t, e) {
                  const n = e.currentAnimateTimings =
                      this._visitTiming(t.timings, e),
                        r = e.currentTimeline;
                  n.delay &&
                      (e.incrementTime(n.delay), r.snapshotCurrentStyles());
                  const s = t.style;
                  5 == s.type ? this.visitKeyframes(s, e)
                              : (e.incrementTime(n.duration),
                                 this.visitStyle(s, e),
                                 r.applyStylesToKeyframe()),
                      e.currentAnimateTimings = null, e.previousNode = t
                }
                visitStyle(t, e) {
                  const n = e.currentTimeline, r = e.currentAnimateTimings;
                  !r && n.getCurrentStyleProperties().length &&
                      n.forwardFrame();
                  const s = r && r.easing || t.easing;
                  t.isEmptyStep ? n.applyEmptyStep(s)
                                : n.setStyles(t.styles, s, e.errors, e.options),
                      e.previousNode = t
                }
                visitKeyframes(t, e) {
                  const n = e.currentAnimateTimings,
                        r = e.currentTimeline.duration, s = n.duration,
                        i = e.createSubContext().currentTimeline;
                  i.easing = n.easing, t.styles.forEach(t => {
                    i.forwardTime((t.offset || 0) * s),
                    i.setStyles(t.styles, t.easing, e.errors, e.options),
                    i.applyStylesToKeyframe()
                  }),
                  e.currentTimeline.mergeTimelineCollectedStyles(i),
                  e.transformIntoNewTimeline(r + s), e.previousNode = t
                }
                visitQuery(t, e) {
                  const n = e.currentTimeline.currentTime, r = t.options || {},
                        s = r.delay ? Jf(r.delay) : 0;
                  s &&
                      (6 === e.previousNode.type ||
                       0 == n && e.currentTimeline.getCurrentStyleProperties()
                                     .length) &&
                      (e.currentTimeline.snapshotCurrentStyles(),
                       e.previousNode = Mm);
                  let i = n;
                  const o =
                      e.invokeQuery(t.selector, t.originalSelector, t.limit,
                                    t.includeSelf, !!r.optional, e.errors);
                  e.currentQueryTotal = o.length;
                  let a = null;
                  o.forEach((n, r) => {
                    e.currentQueryIndex = r;
                    const o = e.createSubContext(t.options, n);
                    s && o.delayNextStep(s),
                        n === e.element && (a = o.currentTimeline),
                        gm(this, t.animation, o),
                        o.currentTimeline.applyStylesToKeyframe(),
                        i = Math.max(i, o.currentTimeline.currentTime)
                  }),
                      e.currentQueryIndex = 0, e.currentQueryTotal = 0,
                      e.transformIntoNewTimeline(i),
                      a && (e.currentTimeline.mergeTimelineCollectedStyles(a),
                            e.currentTimeline.snapshotCurrentStyles()),
                      e.previousNode = t
                }
                visitStagger(t, e) {
                  const n = e.parentContext, r = e.currentTimeline,
                        s = t.timings, i = Math.abs(s.duration),
                        o = i * (e.currentQueryTotal - 1);
                  let a = i * e.currentQueryIndex;
                  switch (s.duration < 0 ? "reverse" : s.easing) {
                  case "reverse":
                    a = o - a;
                    break;
                  case "full":
                    a = n.currentStaggerTime
                  }
                  const l = e.currentTimeline;
                  a && l.delayNextStep(a);
                  const c = l.currentTime;
                  gm(this, t.animation, e),
                      e.previousNode = t,
                      n.currentStaggerTime =
                          r.currentTime - c +
                          (r.startTime - n.currentTimeline.startTime)
                }
              }
              const Mm = {};
              class jm {
                constructor(t, e, n, r, s, i, o, a) {
                  this._driver = t, this.element = e, this.subInstructions = n,
                  this._enterClassName = r, this._leaveClassName = s,
                  this.errors = i, this.timelines = o,
                  this.parentContext = null, this.currentAnimateTimings = null,
                  this.previousNode = Mm, this.subContextCount = 0,
                  this.options = {}, this.currentQueryIndex = 0,
                  this.currentQueryTotal = 0, this.currentStaggerTime = 0,
                  this.currentTimeline = a || new Fm(this._driver, e, 0),
                  o.push(this.currentTimeline)
                }
                get params() { return this.options.params }
                updateOptions(t, e) {
                  if (!t)
                    return;
                  const n = t;
                  let r = this.options;
                  null != n.duration && (r.duration = Jf(n.duration)),
                      null != n.delay && (r.delay = Jf(n.delay));
                  const s = n.params;
                  if (s) {
                    let t = r.params;
                    t || (t = this.options.params = {}),
                        Object.keys(s).forEach(
                            n => {e && t.hasOwnProperty(n) ||
                                  (t[n] = um(s[n], t, this.errors))})
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
                  const r = e || this.element,
                        s = new jm(this._driver, r, this.subInstructions,
                                   this._enterClassName, this._leaveClassName,
                                   this.errors, this.timelines,
                                   this.currentTimeline.fork(r, n || 0));
                  return s.previousNode = this.previousNode,
                         s.currentAnimateTimings = this.currentAnimateTimings,
                         s.options = this._copyOptions(), s.updateOptions(t),
                         s.currentQueryIndex = this.currentQueryIndex,
                         s.currentQueryTotal = this.currentQueryTotal,
                         s.parentContext = this, this.subContextCount++, s
                }
                transformIntoNewTimeline(t) {
                  return this.previousNode = Mm,
                         this.currentTimeline =
                             this.currentTimeline.fork(this.element, t),
                         this.timelines.push(this.currentTimeline),
                         this.currentTimeline
                }
                appendInstructionToTimeline(t, e, n) {
                  const r = {
                    duration : null != e ? e : t.duration,
                    delay : this.currentTimeline.currentTime +
                                (null != n ? n : 0) + t.delay,
                    easing : ""
                  },
                        s = new Um(this._driver, t.element, t.keyframes,
                                   t.preStyleProps, t.postStyleProps, r,
                                   t.stretchStartingKeyframe);
                  return this.timelines.push(s), r
                }
                incrementTime(t) {
                  this.currentTimeline.forwardTime(
                      this.currentTimeline.duration + t)
                }
                delayNextStep(t) {
                  t > 0 && this.currentTimeline.delayNextStep(t)
                }
                invokeQuery(t, e, n, r, s, i) {
                  let o = [];
                  if (r && o.push(this.element), t.length > 0) {
                    t = (t = t.replace(Rm, "." + this._enterClassName))
                            .replace(Lm, "." + this._leaveClassName);
                    let e = this._driver.query(this.element, t, 1 != n);
                    0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length)
                                          : e.slice(0, n)),
                        o.push(...e)
                  }
                  return s || 0 != o.length ||
                             i.push(`\`query("${
                                 e}")\` returned zero elements. (Use \`query("${
                                 e}", { optional: true })\` if you wish to allow this.)`),
                         o
                }
              }
              class Fm {
                constructor(t, e, n, r) {
                  this._driver = t, this.element = e, this.startTime = n,
                  this._elementTimelineStylesLookup = r, this.duration = 0,
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
                         new Fm(this._driver, t, e || this.currentTime,
                                this._elementTimelineStylesLookup)
                }
                _loadKeyframe() {
                  this._currentKeyframe &&
                      (this._previousKeyframe = this._currentKeyframe),
                      this._currentKeyframe =
                          this._keyframes.get(this.duration),
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
                  return this._currentEmptyStepKeyframe !==
                         this._currentKeyframe
                }
                applyEmptyStep(t) {
                  t && (this._previousKeyframe.easing = t),
                      Object.keys(this._globalTimelineStyles).forEach(t => {
                        this._backFill[t] = this._globalTimelineStyles[t] || vf,
                        this._currentKeyframe[t] = vf
                      }),
                      this._currentEmptyStepKeyframe = this._currentKeyframe
                }
                setStyles(t, e, n, r) {
                  e && (this._previousKeyframe.easing = e);
                  const s = r && r.params || {}, i = function(t, e) {
                    const n = {};
                    let r;
                    return t.forEach(t => {"*" === t
                                               ? (r = r || Object.keys(e),
                                                  r.forEach(t => {n[t] = vf}))
                                               : nm(t, !1, n)}),
                           n
                  }(t, this._globalTimelineStyles);
                  Object.keys(i).forEach(t => {
                    const e = um(i[t], s, n);
                    this._pendingStyles[t] = e,
                    this._localTimelineStyles.hasOwnProperty(t) ||
                        (this._backFill[t] =
                             this._globalTimelineStyles.hasOwnProperty(t)
                                 ? this._globalTimelineStyles[t]
                                 : vf),
                    this._updateStyle(t, e)
                  })
                }
                applyStylesToKeyframe() {
                  const t = this._pendingStyles, e = Object.keys(t);
                  0 != e.length &&
                      (this._pendingStyles = {},
                       e.forEach(e => {this._currentKeyframe[e] = t[e]}),
                       Object.keys(this._localTimelineStyles)
                           .forEach(
                               t => {this._currentKeyframe.hasOwnProperty(t) ||
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
                    const n = this._styleSummary[e], r = t._styleSummary[e];
                    (!n || r.time > n.time) && this._updateStyle(e, r.value)
                  })
                }
                buildKeyframes() {
                  this.applyStylesToKeyframe();
                  const t = new Set, e = new Set,
                        n = 1 === this._keyframes.size && 0 === this.duration;
                  let r = [];
                  this._keyframes.forEach((s, i) => {
                    const o = nm(s, !0);
                    Object.keys(o).forEach(n => {
                      const r = o[n];
                      "!" == r ? t.add(n) : r == vf && e.add(n)
                    }),
                        n || (o.offset = i / this.duration), r.push(o)
                  });
                  const s = t.size ? hm(t.values()) : [],
                        i = e.size ? hm(e.values()) : [];
                  if (n) {
                    const t = r[0], e = em(t);
                    t.offset = 0, e.offset = 1, r = [ t, e ]
                  }
                  return Om(this.element, r, s, i, this.duration,
                            this.startTime, this.easing, !1)
                }
              }
              class Um extends Fm {
                constructor(t, e, n, r, s, i, o = !1) {
                  super(t, e, i.delay),
                      this.element = e, this.keyframes = n,
                      this.preStyleProps = r, this.postStyleProps = s,
                      this._stretchStartingKeyframe = o, this.timings = {
                        duration : i.duration,
                        delay : i.delay,
                        easing : i.easing
                      }
                }
                containsAnimation() { return this.keyframes.length > 1 }
                buildKeyframes() {
                  let t = this.keyframes,
                      {delay : e, duration : n, easing : r} = this.timings;
                  if (this._stretchStartingKeyframe && e) {
                    const s = [], i = n + e, o = e / i, a = nm(t[0], !1);
                    a.offset = 0, s.push(a);
                    const l = nm(t[0], !1);
                    l.offset = Vm(o), s.push(l);
                    const c = t.length - 1;
                    for (let r = 1; r <= c; r++) {
                      let o = nm(t[r], !1);
                      o.offset = Vm((e + o.offset * n) / i), s.push(o)
                    }
                    n = i, e = 0, r = "", t = s
                  }
                  return Om(this.element, t, this.preStyleProps,
                            this.postStyleProps, n, e, r, !0)
                }
              }
              function Vm(t, e = 3) {
                const n = Math.pow(10, e - 1);
                return Math.round(t * n) / n
              }
              class Bm {}
              class $m extends Bm {
                normalizePropertyName(t, e) { return pm(t) }
                normalizeStyleValue(t, e, n, r) {
                  let s = "";
                  const i = n.toString().trim();
                  if (Hm[e] && 0 !== n && "0" !== n)
                    if ("number" == typeof n)
                      s = "px";
                    else {
                      const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
                      e && 0 == e[1].length &&
                          r.push(
                              `Please provide a CSS unit value for ${t}:${n}`)
                    }
                  return i + s
                }
              }
              const Hm = (() => function(t) {
                const e = {};
                return t.forEach(t => e[t] = !0), e
              }("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective"
                              .split(",")))();
              function zm(t, e, n, r, s, i, o, a, l, c, u, h, d) {
                return {
                  type: 0, element: t, triggerName: e, isRemovalTransition: s,
                      fromState: n, fromStyles: i, toState: r, toStyles: o,
                      timelines: a, queriedElements: l, preStyleProps: c,
                      postStyleProps: u, totalTime: h, errors: d
                }
              }
              const qm = {};
              class Qm {
                constructor(t, e, n) {
                  this._triggerName = t, this.ast = e, this._stateStyles = n
                }
                match(t, e, n, r) {
                  return function(t, e, n, r,
                                  s) { return t.some(t => t(e, n, r, s)) }(
                      this.ast.matchers, t, e, n, r)
                }
                buildStyles(t, e, n) {
                  const r = this._stateStyles["*"], s = this._stateStyles[t],
                        i = r ? r.buildStyles(e, n) : {};
                  return s ? s.buildStyles(e, n) : i
                }
                build(t, e, n, r, s, i, o, a, l, c) {
                  const u = [],
                        h = this.ast.options && this.ast.options.params || qm,
                        d = this.buildStyles(n, o && o.params || qm, u),
                        p = a && a.params || qm, f = this.buildStyles(r, p, u),
                        m = new Set, g = new Map, y = new Map, _ = "void" === r,
                        v = {params : Object.assign(Object.assign({}, h), p)},
                        b = c ? []
                              : Nm(t, e, this.ast.animation, s, i, d, f, v, l,
                                   u);
                  let w = 0;
                  if (b.forEach(t => {w = Math.max(t.duration + t.delay, w)}),
                      u.length)
                    return zm(e, this._triggerName, n, r, _, d, f, [], [], g, y,
                              w, u);
                  b.forEach(t => {
                    const n = t.element, r = Pf(g, n, {});
                    t.preStyleProps.forEach(t => r[t] = !0);
                    const s = Pf(y, n, {});
                    t.postStyleProps.forEach(t => s[t] = !0),
                        n !== e && m.add(n)
                  });
                  const x = hm(m.values());
                  return zm(e, this._triggerName, n, r, _, d, f, b, x, g, y, w)
                }
              }
              class Wm {
                constructor(t, e) { this.styles = t, this.defaultParams = e }
                buildStyles(t, e) {
                  const n = {}, r = em(this.defaultParams);
                  return Object.keys(t).forEach(e => {
                    const n = t[e];
                    null != n && (r[e] = n)
                  }),
                         this.styles.styles.forEach(t => {
                           if ("string" != typeof t) {
                             const s = t;
                             Object.keys(s).forEach(t => {
                               let i = s[t];
                               i.length > 1 && (i = um(i, r, e)), n[t] = i
                             })
                           }
                         }),
                         n
                }
              }
              class Gm {
                constructor(t, e) {
                  this.name = t, this.ast = e, this.transitionFactories = [],
                  this.states = {},
                  e.states.forEach(
                      t => {this.states[t.name] = new Wm(
                                t.style, t.options && t.options.params || {})}),
                  Km(this.states, "true", "1"), Km(this.states, "false", "0"),
                  e.transitions.forEach(e => {this.transitionFactories.push(
                                            new Qm(t, e, this.states))}),
                  this.fallbackTransition = new Qm(t, {
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
                matchTransition(t, e, n, r) {
                  return this.transitionFactories.find(
                             s => s.match(t, e, n, r)) ||
                         null
                }
                matchStyles(t, e, n) {
                  return this.fallbackTransition.buildStyles(t, e, n)
                }
              }
              function Km(t, e, n) {
                t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e])
                                    : t.hasOwnProperty(n) && (t[e] = t[n])
              }
              const Zm = new Pm;
              class Ym {
                constructor(t, e, n) {
                  this.bodyNode = t, this._driver = e, this._normalizer = n,
                  this._animations = {}, this._playersById = {},
                  this.players = []
                }
                register(t, e) {
                  const n = [], r = Em(this._driver, e, n);
                  if (n.length)
                    throw new Error(
                        "Unable to build the animation due to the following errors: " +
                        n.join("\n"));
                  this._animations[t] = r
                }
                _buildPlayer(t, e, n) {
                  const r = t.element,
                        s = Tf(0, this._normalizer, 0, t.keyframes, e, n);
                  return this._driver.animate(r, s, t.duration, t.delay,
                                              t.easing, [], !0)
                }
                create(t, e, n = {}) {
                  const r = [], s = this._animations[t];
                  let i;
                  const o = new Map;
                  if (s ? (i = Nm(this._driver, e, s, Qf, Wf, {}, {}, n, Zm, r),
                           i.forEach(t => {
                             const e = Pf(o, t.element, {});
                             t.postStyleProps.forEach(t => e[t] = null)
                           }))
                        : (r.push(
                               "The requested animation doesn't exist or has already been destroyed"),
                           i = []),
                      r.length)
                    throw new Error(
                        "Unable to create the animation due to the following errors: " +
                        r.join("\n"));
                  o.forEach(
                      (t, e) => {Object.keys(t).forEach(
                          n => {t[n] = this._driver.computeStyle(e, n, vf)})});
                  const a = kf(i.map(t => {
                    const e = o.get(t.element);
                    return this._buildPlayer(t, {}, e)
                  }));
                  return this._playersById[t] = a,
                         a.onDestroy(() => this.destroy(t)),
                         this.players.push(a), a
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
                        "Unable to find the timeline player referenced by " +
                        t);
                  return e
                }
                listen(t, e, n, r) {
                  const s = Of(e, "", "", "");
                  return Af(this._getPlayer(t), n, s, r), () => {}
                }
                command(t, e, n, r) {
                  if ("register" == n)
                    return void this.register(t, r[0]);
                  if ("create" == n)
                    return void this.create(t, e, r[0] || {});
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
                    this.destroy(t)
                  }
                }
              }
              const Jm = "ng-animate-queued", Xm = "ng-animate-disabled",
                    tg = ".ng-animate-disabled", eg = [], ng = {
                      namespaceId : "",
                      setForRemoval : !1,
                      setForMove : !1,
                      hasAnimation : !1,
                      removedBeforeQueried : !1
                    },
                    rg = {
                      namespaceId : "",
                      setForMove : !1,
                      setForRemoval : !1,
                      hasAnimation : !1,
                      removedBeforeQueried : !0
                    };
              class sg {
                constructor(t, e = "") {
                  this.namespaceId = e;
                  const n = t && t.hasOwnProperty("value");
                  if (this.value = null != (r = n ? t.value : t) ? r : null,
                      n) {
                    const e = em(t);
                    delete e.value, this.options = e
                  } else
                    this.options = {};
                  var r;
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
              const ig = "void", og = new sg(ig);
              class ag {
                constructor(t, e, n) {
                  this.id = t, this.hostElement = e, this._engine = n,
                  this.players = [], this._triggers = {}, this._queue = [],
                  this._elementListeners = new Map,
                  this._hostClassName = "ng-tns-" + t,
                  fg(e, this._hostClassName)
                }
                listen(t, e, n, r) {
                  if (!this._triggers.hasOwnProperty(e))
                    throw new Error(
                        `Unable to listen on the animation trigger event "${
                            n}" because the animation trigger "${
                            e}" doesn't exist!`);
                  if (null == n || 0 == n.length)
                    throw new Error(
                        `Unable to listen on the animation trigger "${
                            e}" because the provided event is undefined!`);
                  if ("start" != (s = n) && "done" != s)
                    throw new Error(`The provided animation trigger event "${
                        n}" for the animation trigger "${
                        e}" is not supported!`);
                  var s;
                  const i = Pf(this._elementListeners, t, []),
                        o = {name : e, phase : n, callback : r};
                  i.push(o);
                  const a = Pf(this._engine.statesByElement, t, {});
                  return a.hasOwnProperty(e) ||
                             (fg(t, Gf), fg(t, "ng-trigger-" + e), a[e] = og),
                         () => {
                           this._engine.afterFlush(() => {
                             const t = i.indexOf(o);
                             t >= 0 && i.splice(t, 1),
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
                trigger(t, e, n, r = !0) {
                  const s = this._getTrigger(e), i = new cg(this.id, e, t);
                  let o = this._engine.statesByElement.get(t);
                  o || (fg(t, Gf), fg(t, "ng-trigger-" + e),
                        this._engine.statesByElement.set(t, o = {}));
                  let a = o[e];
                  const l = new sg(n, this.id);
                  if (!(n && n.hasOwnProperty("value")) && a &&
                          l.absorbOptions(a.options),
                      o[e] = l, a || (a = og),
                      l.value !== ig && a.value === l.value) {
                    if (!function(t, e) {
                          const n = Object.keys(t), r = Object.keys(e);
                          if (n.length != r.length)
                            return !1;
                          for (let s = 0; s < n.length; s++) {
                            const r = n[s];
                            if (!e.hasOwnProperty(r) || t[r] !== e[r])
                              return !1
                          }
                          return !0
                        }(a.params, l.params)) {
                      const e = [], n = s.matchStyles(a.value, a.params, e),
                            r = s.matchStyles(l.value, l.params, e);
                      e.length
                          ? this._engine.reportError(e)
                          : this._engine.afterFlush(() => {om(t, n), im(t, r)})
                    }
                    return
                  }
                  const c = Pf(this._engine.playersByElement, t, []);
                  c.forEach(t => {t.namespaceId == this.id &&
                                  t.triggerName == e && t.queued &&
                                  t.destroy()});
                  let u = s.matchTransition(a.value, l.value, t, l.params),
                      h = !1;
                  if (!u) {
                    if (!r)
                      return;
                    u = s.fallbackTransition, h = !0
                  }
                  return this._engine.totalQueuedPlayers++, this._queue.push({
                    element : t,
                    triggerName : e,
                    transition : u,
                    fromState : a,
                    toState : l,
                    player : i,
                    isFallbackTransition : h
                  }),
                         h || (fg(t, Jm), i.onStart(() => {mg(t, Jm)})),
                         i.onDone(() => {
                           let e = this.players.indexOf(i);
                           e >= 0 && this.players.splice(e, 1);
                           const n = this._engine.playersByElement.get(t);
                           if (n) {
                             let t = n.indexOf(i);
                             t >= 0 && n.splice(t, 1)
                           }
                         }),
                         this.players.push(i), c.push(i), i
                }
                deregister(t) {
                  delete this._triggers[t],
                      this._engine.statesByElement.forEach(
                          (e, n) => {delete e[t]}),
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
                  const n = this._engine.driver.query(t, Kf, !0);
                  n.forEach(t => {
                    if (t.__ng_removed)
                      return;
                    const n = this._engine.fetchNamespacesByElement(t);
                    n.size
                        ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0))
                        : this.clearElementCache(t)
                  }),
                      this._engine.afterFlushAnimationsDone(
                          () => n.forEach(t => this.clearElementCache(t)))
                }
                triggerLeaveAnimation(t, e, n, r) {
                  const s = this._engine.statesByElement.get(t);
                  if (s) {
                    const i = [];
                    if (Object.keys(s).forEach(e => {
                          if (this._triggers[e]) {
                            const n = this.trigger(t, e, ig, r);
                            n && i.push(n)
                          }
                        }),
                        i.length)
                      return this._engine.markElementAsRemoved(this.id, t, !0,
                                                               e),
                             n && kf(i).onDone(
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
                      const r = e.name;
                      if (n.has(r))
                        return;
                      n.add(r);
                      const s = this._triggers[r].fallbackTransition,
                            i = this._engine.statesByElement.get(t)[r] || og,
                            o = new sg(ig), a = new cg(this.id, r, t);
                      this._engine.totalQueuedPlayers++, this._queue.push({
                        element : t,
                        triggerName : r,
                        transition : s,
                        fromState : i,
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
                  let r = !1;
                  if (n.totalAnimations) {
                    const e = n.players.length
                                  ? n.playersByQueriedElement.get(t)
                                  : [];
                    if (e && e.length)
                      r = !0;
                    else {
                      let e = t;
                      for (; e = e.parentNode;)
                        if (n.statesByElement.get(e)) {
                          r = !0;
                          break
                        }
                    }
                  }
                  if (this.prepareLeaveAnimationListeners(t), r)
                    n.markElementAsRemoved(this.id, t, !1, e);
                  else {
                    const r = t.__ng_removed;
                    r && r !== ng ||
                        (n.afterFlush(() => this.clearElementCache(t)),
                         n.destroyInnerAnimations(t),
                         n._onRemovalComplete(t, e))
                  }
                }
                insertNode(t, e) { fg(t, this._hostClassName) }
                drainQueuedTransitions(t) {
                  const e = [];
                  return this._queue.forEach(n => {
                    const r = n.player;
                    if (r.destroyed)
                      return;
                    const s = n.element, i = this._elementListeners.get(s);
                    i && i.forEach(e => {
                      if (e.name == n.triggerName) {
                        const r = Of(s, n.triggerName, n.fromState.value,
                                     n.toState.value);
                        r._data = t, Af(n.player, e.phase, r, e.callback)
                      }
                    }),
                        r.markedForDestroy
                            ? this._engine.afterFlush(() => {r.destroy()})
                            : e.push(n)
                  }),
                         this._queue = [], e.sort((t, e) => {
                           const n = t.transition.ast.depCount,
                                 r = e.transition.ast.depCount;
                           return 0 == n || 0 == r
                                      ? n - r
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
              class lg {
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
                             e => {e.players.forEach(
                                 e => {e.queued && t.push(e)})}),
                         t
                }
                createNamespace(t, e) {
                  const n = new ag(t, e, this);
                  return e.parentNode ? this._balanceNamespaceList(n, e)
                                      : (this.newHostElements.set(e, n),
                                         this.collectEnterElement(e)),
                         this._namespaceLookup[t] = n
                }
                _balanceNamespaceList(t, e) {
                  const n = this._namespaceList.length - 1;
                  if (n >= 0) {
                    let r = !1;
                    for (let s = n; s >= 0; s--)
                      if (this.driver.containsElement(
                              this._namespaceList[s].hostElement, e)) {
                        this._namespaceList.splice(s + 1, 0, t), r = !0;
                        break
                      }
                    r || this._namespaceList.splice(0, 0, t)
                  } else
                    this._namespaceList.push(t);
                  return this.namespacesByHostElement.set(e, t), t
                }
                register(t, e) {
                  let n = this._namespaceLookup[t];
                  return n || (n = this.createNamespace(t, e)), n
                }
                registerTrigger(t, e, n) {
                  let r = this._namespaceLookup[t];
                  r && r.register(e, n) && this.totalAnimations++
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
                    for (let r = 0; r < t.length; r++) {
                      const s = n[t[r]].namespaceId;
                      if (s) {
                        const t = this._fetchNamespace(s);
                        t && e.add(t)
                      }
                    }
                  }
                  return e
                }
                trigger(t, e, n, r) {
                  if (ug(e)) {
                    const s = this._fetchNamespace(t);
                    if (s)
                      return s.trigger(e, n, r), !0
                  }
                  return !1
                }
                insertNode(t, e, n, r) {
                  if (!ug(e))
                    return;
                  const s = e.__ng_removed;
                  if (s && s.setForRemoval) {
                    s.setForRemoval = !1, s.setForMove = !0;
                    const t = this.collectedLeaveElements.indexOf(e);
                    t >= 0 && this.collectedLeaveElements.splice(t, 1)
                  }
                  if (t) {
                    const r = this._fetchNamespace(t);
                    r && r.insertNode(e, n)
                  }
                  r && this.collectEnterElement(e)
                }
                collectEnterElement(t) { this.collectedEnterElements.push(t) }
                markElementAsDisabled(t, e) {
                  e ? this.disabledNodes.has(t) ||
                          (this.disabledNodes.add(t), fg(t, Xm))
                    : this.disabledNodes.has(t) &&
                          (this.disabledNodes.delete(t), mg(t, Xm))
                }
                removeNode(t, e, n, r) {
                  if (ug(e)) {
                    const s = t ? this._fetchNamespace(t) : null;
                    if (s ? s.removeNode(e, r)
                          : this.markElementAsRemoved(t, e, !1, r),
                        n) {
                      const n = this.namespacesByHostElement.get(e);
                      n && n.id !== t && n.removeNode(e, r)
                    }
                  } else
                    this._onRemovalComplete(e, r)
                }
                markElementAsRemoved(t, e, n, r) {
                  this.collectedLeaveElements.push(e), e.__ng_removed = {
                    namespaceId : t,
                    setForRemoval : r,
                    hasAnimation : n,
                    removedBeforeQueried : !1
                  }
                }
                listen(t, e, n, r, s) {
                  return ug(e) ? this._fetchNamespace(t).listen(e, n, r, s)
                               : () => {}
                }
                _buildInstruction(t, e, n, r, s) {
                  return t.transition.build(this.driver, t.element,
                                            t.fromState.value, t.toState.value,
                                            n, r, t.fromState.options,
                                            t.toState.options, e, s)
                }
                destroyInnerAnimations(t) {
                  let e = this.driver.query(t, Kf, !0);
                  e.forEach(t => this.destroyActiveAnimationsForElement(t)),
                      0 != this.playersByQueriedElement.size &&
                          (e = this.driver.query(t, Yf, !0),
                           e.forEach(
                               t => this.finishActiveQueriedAnimationOnElement(
                                   t)))
                }
                destroyActiveAnimationsForElement(t) {
                  const e = this.playersByElement.get(t);
                  e && e.forEach(t => {t.queued ? t.markedForDestroy = !0
                                                : t.destroy()})
                }
                finishActiveQueriedAnimationOnElement(t) {
                  const e = this.playersByQueriedElement.get(t);
                  e && e.forEach(t => t.finish())
                }
                whenRenderingDone() {
                  return new Promise(t => {
                    if (this.players.length)
                      return kf(this.players).onDone(() => t());
                    t()
                  })
                }
                processLeaveNode(t) {
                  const e = t.__ng_removed;
                  if (e && e.setForRemoval) {
                    if (t.__ng_removed = ng, e.namespaceId) {
                      this.destroyInnerAnimations(t);
                      const n = this._fetchNamespace(e.namespaceId);
                      n && n.clearElementCache(t)
                    }
                    this._onRemovalComplete(t, e.setForRemoval)
                  }
                  this.driver.matchesElement(t, tg) &&
                      this.markElementAsDisabled(t, !1),
                      this.driver.query(t, tg, !0).forEach(
                          t => {this.markElementAsDisabled(t, !1)})
                }
                flush(t = -1) {
                  let e = [];
                  if (this.newHostElements.size &&
                          (this.newHostElements.forEach(
                               (t, e) => this._balanceNamespaceList(t, e)),
                           this.newHostElements.clear()),
                      this.totalAnimations &&
                          this.collectedEnterElements.length)
                    for (let n = 0; n < this.collectedEnterElements.length; n++)
                      fg(this.collectedEnterElements[n], "ng-star-inserted");
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
                    e.length ? kf(e).onDone(() => {t.forEach(t => t())})
                             : t.forEach(t => t())
                  }
                }
                reportError(t) {
                  throw new Error(
                      "Unable to process animations due to the following failed trigger transitions\n " +
                      t.join("\n"))
                }
                _flushAnimations(t, e) {
                  const n = new Pm, r = [], s = new Map, i = [], o = new Map,
                        a = new Map, l = new Map, c = new Set;
                  this.disabledNodes.forEach(t => {
                    c.add(t);
                    const e = this.driver.query(t, ".ng-animate-queued", !0);
                    for (let n = 0; n < e.length; n++)
                      c.add(e[n])
                  });
                  const u = this.bodyNode,
                        h = Array.from(this.statesByElement.keys()),
                        d = pg(h, this.collectedEnterElements), p = new Map;
                  let f = 0;
                  d.forEach((t, e) => {
                    const n = Qf + f++;
                    p.set(e, n), t.forEach(t => fg(t, n))
                  });
                  const m = [], g = new Set, y = new Set;
                  for (let O = 0; O < this.collectedLeaveElements.length; O++) {
                    const t = this.collectedLeaveElements[O],
                          e = t.__ng_removed;
                    e && e.setForRemoval &&
                        (m.push(t), g.add(t),
                         e.hasAnimation
                             ? this.driver.query(t, ".ng-star-inserted", !0)
                                   .forEach(t => g.add(t))
                             : y.add(t))
                  }
                  const _ = new Map, v = pg(h, Array.from(g));
                  v.forEach((t, e) => {
                    const n = Wf + f++;
                    _.set(e, n), t.forEach(t => fg(t, n))
                  }),
                      t.push(() => {
                        d.forEach((t, e) => {
                          const n = p.get(e);
                          t.forEach(t => mg(t, n))
                        }),
                        v.forEach((t, e) => {
                          const n = _.get(e);
                          t.forEach(t => mg(t, n))
                        }),
                        m.forEach(t => {this.processLeaveNode(t)})
                      });
                  const b = [], w = [];
                  for (let O = this._namespaceList.length - 1; O >= 0; O--)
                    this._namespaceList[O].drainQueuedTransitions(e).forEach(
                        t => {
                          const e = t.player, s = t.element;
                          if (b.push(e), this.collectedEnterElements.length) {
                            const t = s.__ng_removed;
                            if (t && t.setForMove)
                              return void e.destroy()
                          }
                          const c = !u || !this.driver.containsElement(u, s),
                                h = _.get(s), d = p.get(s),
                                f = this._buildInstruction(t, n, d, h, c);
                          if (f.errors && f.errors.length)
                            w.push(f);
                          else {
                            if (c)
                              return e.onStart(() => om(s, f.fromStyles)),
                                     e.onDestroy(() => im(s, f.toStyles)),
                                     void r.push(e);
                            if (t.isFallbackTransition)
                              return e.onStart(() => om(s, f.fromStyles)),
                                     e.onDestroy(() => im(s, f.toStyles)),
                                     void r.push(e);
                            f.timelines.forEach(t => t.stretchStartingKeyframe =
                                                    !0),
                                n.append(s, f.timelines),
                                i.push(
                                    {instruction : f, player : e, element : s}),
                                f.queriedElements.forEach(
                                    t => Pf(o, t, []).push(e)),
                                f.preStyleProps.forEach((t, e) => {
                                  const n = Object.keys(t);
                                  if (n.length) {
                                    let t = a.get(e);
                                    t || a.set(e, t = new Set),
                                        n.forEach(e => t.add(e))
                                  }
                                }),
                                f.postStyleProps.forEach((t, e) => {
                                  const n = Object.keys(t);
                                  let r = l.get(e);
                                  r || l.set(e, r = new Set),
                                      n.forEach(t => r.add(t))
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
                  i.forEach(t => {
                    const e = t.element;
                    n.has(e) && (S.set(e, e),
                                 this._beforeAnimationBuild(
                                     t.player.namespaceId, t.instruction, x))
                  }),
                      r.forEach(t => {
                        const e = t.element;
                        this._getPreviousPlayers(e, !1, t.namespaceId,
                                                 t.triggerName, null)
                            .forEach(t => {Pf(x, e, []).push(t), t.destroy()})
                      });
                  const E = m.filter(t => yg(t, a, l)), C = new Map;
                  dg(C, this.driver, y, l, vf)
                      .forEach(t => {yg(t, a, l) && E.push(t)});
                  const k = new Map;
                  d.forEach((t, e) => {dg(k, this.driver, new Set(t), a, "!")}),
                      E.forEach(t => {
                        const e = C.get(t), n = k.get(t);
                        C.set(t, Object.assign(Object.assign({}, e), n))
                      });
                  const T = [], A = [], I = {};
                  i.forEach(t => {
                    const {element : e, player : i, instruction : o} = t;
                    if (n.has(e)) {
                      if (c.has(e))
                        return i.onDestroy(() => im(e, o.toStyles)),
                               i.disabled = !0,
                               i.overrideTotalTime(o.totalTime), void r.push(i);
                      let t = I;
                      if (S.size > 1) {
                        let n = e;
                        const r = [];
                        for (; n = n.parentNode;) {
                          const e = S.get(n);
                          if (e) {
                            t = e;
                            break
                          }
                          r.push(n)
                        }
                        r.forEach(e => S.set(e, t))
                      }
                      const n =
                          this._buildAnimation(i.namespaceId, o, x, s, k, C);
                      if (i.setRealPlayer(n), t === I)
                        T.push(i);
                      else {
                        const e = this.playersByElement.get(t);
                        e && e.length && (i.parentPlayer = kf(e)), r.push(i)
                      }
                    } else
                      om(e, o.fromStyles), i.onDestroy(() => im(e, o.toStyles)),
                          A.push(i), c.has(e) && r.push(i)
                  }),
                      A.forEach(t => {
                        const e = s.get(t.element);
                        if (e && e.length) {
                          const n = kf(e);
                          t.setRealPlayer(n)
                        }
                      }),
                      r.forEach(t => {t.parentPlayer
                                          ? t.syncPlayerEvents(t.parentPlayer)
                                          : t.destroy()});
                  for (let O = 0; O < m.length; O++) {
                    const t = m[O], e = t.__ng_removed;
                    if (mg(t, Wf), e && e.hasAnimation)
                      continue;
                    let n = [];
                    if (o.size) {
                      let e = o.get(t);
                      e && e.length && n.push(...e);
                      let r = this.driver.query(t, Yf, !0);
                      for (let t = 0; t < r.length; t++) {
                        let e = o.get(r[t]);
                        e && e.length && n.push(...e)
                      }
                    }
                    const r = n.filter(t => !t.destroyed);
                    r.length ? gg(this, t, r) : this.processLeaveNode(t)
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
                  const r = e.__ng_removed;
                  return r && r.setForRemoval && (n = !0),
                         this.playersByElement.has(e) && (n = !0),
                         this.playersByQueriedElement.has(e) && (n = !0),
                         this.statesByElement.has(e) && (n = !0),
                         this._fetchNamespace(t).elementContainsData(e) || n
                }
                afterFlush(t) { this._flushFns.push(t) }
                afterFlushAnimationsDone(t) { this._whenQuietFns.push(t) }
                _getPreviousPlayers(t, e, n, r, s) {
                  let i = [];
                  if (e) {
                    const e = this.playersByQueriedElement.get(t);
                    e && (i = e)
                  } else {
                    const e = this.playersByElement.get(t);
                    if (e) {
                      const t = !s || s == ig;
                      e.forEach(e => {e.queued ||
                                      (t || e.triggerName == r) && i.push(e)})
                    }
                  }
                  return (n || r) &&
                             (i = i.filter(t => !(n && n != t.namespaceId ||
                                                  r && r != t.triggerName))),
                         i
                }
                _beforeAnimationBuild(t, e, n) {
                  const r = e.element, s = e.isRemovalTransition ? void 0 : t,
                        i = e.isRemovalTransition ? void 0 : e.triggerName;
                  for (const o of e.timelines) {
                    const t = o.element, a = t !== r, l = Pf(n, t, []);
                    this._getPreviousPlayers(t, a, s, i, e.toState)
                        .forEach(t => {
                          const e = t.getRealPlayer();
                          e.beforeDestroy && e.beforeDestroy(), t.destroy(),
                              l.push(t)
                        })
                  }
                  om(r, e.fromStyles)
                }
                _buildAnimation(t, e, n, r, s, i) {
                  const o = e.triggerName, a = e.element, l = [], c = new Set,
                        u = new Set, h = e.timelines.map(e => {
                          const h = e.element;
                          c.add(h);
                          const d = h.__ng_removed;
                          if (d && d.removedBeforeQueried)
                            return new Sf(e.duration, e.delay);
                          const p = h !== a,
                                f =
                                    function(t) {
                                  const e = [];
                                  return function t(e, n) {
                                    for (let r = 0; r < e.length; r++) {
                                      const s = e[r];
                                      s instanceof Ef ? t(s.players, n)
                                                      : n.push(s)
                                    }
                                  }(t, e),
                                         e
                                }((n.get(h) || eg).map(t => t.getRealPlayer()))
                                        .filter(t => !!t.element &&
                                                     t.element === h),
                                m = s.get(h), g = i.get(h),
                                y = Tf(0, this._normalizer, 0, e.keyframes, m,
                                       g),
                                _ = this._buildPlayer(e, y, f);
                          if (e.subTimeline && r && u.add(h), p) {
                            const e = new cg(t, o, h);
                            e.setRealPlayer(_), l.push(e)
                          }
                          return _
                        });
                  l.forEach(t => {
                    Pf(this.playersByQueriedElement, t.element, []).push(t),
                    t.onDone(() => function(t, e, n) {
                      let r;
                      if (t instanceof Map) {
                        if (r = t.get(e), r) {
                          if (r.length) {
                            const t = r.indexOf(n);
                            r.splice(t, 1)
                          }
                          0 == r.length && t.delete(e)
                        }
                      } else if (r = t[e], r) {
                        if (r.length) {
                          const t = r.indexOf(n);
                          r.splice(t, 1)
                        }
                        0 == r.length && delete t[e]
                      }
                      return r
                    }(this.playersByQueriedElement, t.element, t))
                  }),
                      c.forEach(t => fg(t, Zf));
                  const d = kf(h);
                  return d.onDestroy(() => {
                    c.forEach(t => mg(t, Zf)),
                    im(a, e.toStyles)
                  }),
                         u.forEach(t => {Pf(r, t, []).push(d)}), d
                }
                _buildPlayer(t, e, n) {
                  return e.length > 0
                             ? this.driver.animate(t.element, e, t.duration,
                                                   t.delay, t.easing, n)
                             : new Sf(t.duration, t.delay)
                }
              }
              class cg {
                constructor(t, e, n) {
                  this.namespaceId = t, this.triggerName = e, this.element = n,
                  this._player = new Sf, this._containsRealPlayer = !1,
                  this._queuedCallbacks = {}, this.destroyed = !1,
                  this.markedForDestroy = !1, this.disabled = !1,
                  this.queued = !0, this.totalTime = 0
                }
                setRealPlayer(t) {
                  this._containsRealPlayer ||
                      (this._player = t,
                       Object.keys(this._queuedCallbacks)
                           .forEach(e => {this._queuedCallbacks[e].forEach(
                                        n => Af(t, e, void 0, n))}),
                       this._queuedCallbacks = {},
                       this._containsRealPlayer = !0,
                       this.overrideTotalTime(t.totalTime), this.queued = !1)
                }
                getRealPlayer() { return this._player }
                overrideTotalTime(t) { this.totalTime = t }
                syncPlayerEvents(t) {
                  const e = this._player;
                  e.triggerCallback &&
                      t.onStart(() => e.triggerCallback("start")),
                      t.onDone(() => this.finish()),
                      t.onDestroy(() => this.destroy())
                }
                _queueEvent(t, e) { Pf(this._queuedCallbacks, t, []).push(e) }
                onDone(t) {
                  this.queued && this._queueEvent("done", t),
                      this._player.onDone(t)
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
                hasStarted() {
                  return !this.queued && this._player.hasStarted()
                }
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
              function ug(t) { return t && 1 === t.nodeType }
              function hg(t, e) {
                const n = t.style.display;
                return t.style.display = null != e ? e : "none", n
              }
              function dg(t, e, n, r, s) {
                const i = [];
                n.forEach(t => i.push(hg(t)));
                const o = [];
                r.forEach((n, r) => {
                  const i = {};
                  n.forEach(t => {
                    const n = i[t] = e.computeStyle(r, t, s);
                    n && 0 != n.length || (r.__ng_removed = rg, o.push(r))
                  }),
                      t.set(r, i)
                });
                let a = 0;
                return n.forEach(t => hg(t, i[a++])), o
              }
              function pg(t, e) {
                const n = new Map;
                if (t.forEach(t => n.set(t, [])), 0 == e.length)
                  return n;
                const r = new Set(e), s = new Map;
                return e.forEach(t => {
                  const e = function t(e) {
                    if (!e)
                      return 1;
                    let i = s.get(e);
                    if (i)
                      return i;
                    const o = e.parentNode;
                    return i = n.has(o) ? o : r.has(o) ? 1 : t(o), s.set(e, i),
                           i
                  }(t);
                  1 !== e && n.get(e).push(t)
                }),
                       n
              }
              function fg(t, e) {
                if (t.classList)
                  t.classList.add(e);
                else {
                  let n = t.$$classes;
                  n || (n = t.$$classes = {}), n[e] = !0
                }
              }
              function mg(t, e) {
                if (t.classList)
                  t.classList.remove(e);
                else {
                  let n = t.$$classes;
                  n && delete n[e]
                }
              }
              function gg(t, e, n) { kf(n).onDone(() => t.processLeaveNode(e)) }
              function yg(t, e, n) {
                const r = n.get(t);
                if (!r)
                  return !1;
                let s = e.get(t);
                return s ? r.forEach(t => s.add(t)) : e.set(t, r), n.delete(t),
                       !0
              }
              class _g {
                constructor(t, e, n) {
                  this.bodyNode = t, this._driver = e, this._triggerCache = {},
                  this.onRemovalComplete = (t, e) => {},
                  this._transitionEngine = new lg(t, e, n),
                  this._timelineEngine = new Ym(t, e, n),
                  this._transitionEngine.onRemovalComplete = (t, e) =>
                      this.onRemovalComplete(t, e)
                }
                registerTrigger(t, e, n, r, s) {
                  const i = t + "-" + r;
                  let o = this._triggerCache[i];
                  if (!o) {
                    const t = [], e = Em(this._driver, s, t);
                    if (t.length)
                      throw new Error(`The animation trigger "${
                          r}" has failed to build due to the following errors:\n - ${
                          t.join("\n - ")}`);
                    o = function(t, e) { return new Gm(t, e) }(r, e),
                    this._triggerCache[i] = o
                  }
                  this._transitionEngine.registerTrigger(e, r, o)
                }
                register(t, e) { this._transitionEngine.register(t, e) }
                destroy(t, e) { this._transitionEngine.destroy(t, e) }
                onInsert(t, e, n, r) {
                  this._transitionEngine.insertNode(t, e, n, r)
                }
                onRemove(t, e, n, r) {
                  this._transitionEngine.removeNode(t, e, r || !1, n)
                }
                disableAnimations(t, e) {
                  this._transitionEngine.markElementAsDisabled(t, e)
                }
                process(t, e, n, r) {
                  if ("@" == n.charAt(0)) {
                    const [t, s] = Rf(n);
                    this._timelineEngine.command(t, e, s, r)
                  } else
                    this._transitionEngine.trigger(t, e, n, r)
                }
                listen(t, e, n, r, s) {
                  if ("@" == n.charAt(0)) {
                    const [t, r] = Rf(n);
                    return this._timelineEngine.listen(t, e, r, s)
                  }
                  return this._transitionEngine.listen(t, e, n, r, s)
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
              function vg(t, e) {
                let n = null, r = null;
                return Array.isArray(e) && e.length
                           ? (n = wg(e[0]),
                              e.length > 1 && (r = wg(e[e.length - 1])))
                           : e && (n = wg(e)),
                       n || r ? new bg(t, n, r) : null
              }
              let bg = (() => {
                class t {
                  constructor(e, n, r) {
                    this._element = e, this._startStyles = n,
                    this._endStyles = r, this._state = 0;
                    let s = t.initialStylesByElement.get(e);
                    s || t.initialStylesByElement.set(e, s = {}),
                        this._initialStyles = s
                  }
                  start() {
                    this._state < 1 && (this._startStyles &&
                                            im(this._element, this._startStyles,
                                               this._initialStyles),
                                        this._state = 1)
                  }
                  finish() {
                    this.start(), this._state < 2 &&
                                      (im(this._element, this._initialStyles),
                                       this._endStyles &&
                                           (im(this._element, this._endStyles),
                                            this._endStyles = null),
                                       this._state = 1)
                  }
                  destroy() {
                    this.finish(),
                        this._state < 3 &&
                            (t.initialStylesByElement.delete(this._element),
                             this._startStyles &&
                                 (om(this._element, this._startStyles),
                                  this._endStyles = null),
                             this._endStyles &&
                                 (om(this._element, this._endStyles),
                                  this._endStyles = null),
                             im(this._element, this._initialStyles),
                             this._state = 3)
                  }
                } return t.initialStylesByElement = new WeakMap,
                t
              })();
              function wg(t) {
                let e = null;
                const n = Object.keys(t);
                for (let r = 0; r < n.length; r++) {
                  const s = n[r];
                  xg(s) && (e = e || {}, e[s] = t[s])
                }
                return e
              }
              function xg(t) { return "display" === t || "position" === t }
              const Sg = "animation", Eg = "animationend";
              class Cg {
                constructor(t, e, n, r, s, i, o) {
                  this._element = t, this._name = e, this._duration = n,
                  this._delay = r, this._easing = s, this._fillMode = i,
                  this._onDoneFn = o, this._finished = !1, this._destroyed = !1,
                  this._startTime = 0, this._position = 0,
                  this._eventFn = t => this._handleCallback(t)
                }
                apply() {
                  !function(t, e) {
                    const n = Pg(t, "").trim();
                    n.length && (function(t, e) {
                      let n = 0;
                      for (let r = 0; r < t.length; r++)
                        "," === t.charAt(r) && n++
                    }(n), e = `${n}, ${e}`), Og(t, "", e)
                  }(this._element, `${this._duration}ms ${this._easing} ${
                                       this._delay}ms 1 normal ${
                                       this._fillMode} ${this._name}`),
                      Ig(this._element, this._eventFn, !1),
                      this._startTime = Date.now()
                }
                pause() { kg(this._element, this._name, "paused") }
                resume() { kg(this._element, this._name, "running") }
                setPosition(t) {
                  const e = Tg(this._element, this._name);
                  this._position = t * this._duration,
                  Og(this._element, "Delay", `-${this._position}ms`, e)
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
                                     Ig(this._element, this._eventFn, !0))
                }
                destroy() {
                  this._destroyed ||
                      (this._destroyed = !0, this.finish(), function(t, e) {
                        const n = Pg(t, "").split(","), r = Ag(n, e);
                        r >= 0 && (n.splice(r, 1), Og(t, "", n.join(",")))
                      }(this._element, this._name))
                }
              }
              function kg(t, e, n) { Og(t, "PlayState", n, Tg(t, e)) }
              function Tg(t, e) {
                const n = Pg(t, "");
                return n.indexOf(",") > 0 ? Ag(n.split(","), e) : Ag([ n ], e)
              }
              function Ag(t, e) {
                for (let n = 0; n < t.length; n++)
                  if (t[n].indexOf(e) >= 0)
                    return n;
                return -1
              }
              function Ig(t, e, n) {
                n ? t.removeEventListener(Eg, e) : t.addEventListener(Eg, e)
              }
              function Og(t, e, n, r) {
                const s = Sg + e;
                if (null != r) {
                  const e = t.style[s];
                  if (e.length) {
                    const t = e.split(",");
                    t[r] = n, n = t.join(",")
                  }
                }
                t.style[s] = n
              }
              function Pg(t, e) { return t.style[Sg + e] }
              class Rg {
                constructor(t, e, n, r, s, i, o, a) {
                  this.element = t, this.keyframes = e, this.animationName = n,
                  this._duration = r, this._delay = s, this._finalStyles = o,
                  this._specialStyles = a, this._onDoneFns = [],
                  this._onStartFns = [], this._onDestroyFns = [],
                  this._started = !1, this.currentSnapshot = {},
                  this._state = 0, this.easing = i || "linear",
                  this.totalTime = r + s, this._buildStyler()
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
                  this._styler.destroy(), this._buildStyler(),
                      this._styler.apply()
                }
                _buildStyler() {
                  this._styler = new Cg(
                      this.element, this.animationName, this._duration,
                      this._delay, this.easing, "forwards", () => this.finish())
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
                                                 : ym(this.element, n))})
                  }
                  this.currentSnapshot = t
                }
              }
              class Lg extends Sf {
                constructor(t, e) {
                  super(), this.element = t, this._startingStyles = {},
                           this.__initialized = !1, this._styles = Hf(e)
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
              class Ng {
                constructor() {
                  this._count = 0, this._head = document.querySelector("head"),
                  this._warningIssued = !1
                }
                validateStyleProperty(t) { return Uf(t) }
                matchesElement(t, e) { return Vf(t, e) }
                containsElement(t, e) { return Bf(t, e) }
                query(t, e, n) { return $f(t, e, n) }
                computeStyle(t, e, n) { return window.getComputedStyle(t)[e] }
                buildKeyframeElement(t, e, n) {
                  n = n.map(t => Hf(t));
                  let r = `@keyframes ${e} {\n`, s = "";
                  n.forEach(t => {
                    s = " ";
                    const e = parseFloat(t.offset);
                    r += `${s}${100 * e}% {\n`, s += " ",
                        Object.keys(t).forEach(e => {
                          const n = t[e];
                          switch (e) {
                          case "offset":
                            return;
                          case "easing":
                            return void (
                                n &&
                                (r +=
                                 `${s}animation-timing-function: ${n};\n`));
                          default:
                            return void (r += `${s}${e}: ${n};\n`)
                          }
                        }),
                        r += s + "}\n"
                  }),
                      r += "}\n";
                  const i = document.createElement("style");
                  return i.innerHTML = r, i
                }
                animate(t, e, n, r, s, i = [], o) {
                  o && this._notifyFaultyScrubber();
                  const a = i.filter(t => t instanceof Rg), l = {};
                  fm(n, r) && a.forEach(t => {
                    let e = t.currentSnapshot;
                    Object.keys(e).forEach(t => l[t] = e[t])
                  });
                  const c = function(t) {
                    let e = {};
                    return t && (Array.isArray(t) ? t : [ t ])
                                    .forEach(t => {Object.keys(t).forEach(
                                                 n => {"offset" != n &&
                                                       "easing" != n &&
                                                       (e[n] = t[n])})}),
                           e
                  }(e = mm(t, e, l));
                  if (0 == n)
                    return new Lg(t, c);
                  const u = "gen_css_kf_" + this._count++,
                        h = this.buildKeyframeElement(t, u, e);
                  document.querySelector("head").appendChild(h);
                  const d = vg(t, e), p = new Rg(t, e, u, n, r, s, c, d);
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
              class Dg {
                constructor(t, e, n, r) {
                  this.element = t, this.keyframes = e, this.options = n,
                  this._specialStyles = r, this._onDoneFns = [],
                  this._onStartFns = [], this._onDestroyFns = [],
                  this._initialized = !1, this._finished = !1,
                  this._started = !1, this._destroyed = !1, this.time = 0,
                  this.parentPlayer = null, this.currentSnapshot = {},
                  this._duration = n.duration, this._delay = n.delay || 0,
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
                  this.domPlayer.addEventListener("finish",
                                                  () => this._onFinish())
                }
                _preparePlayerBeforeStart() {
                  this._delay ? this._resetDomPlayerState()
                              : this.domPlayer.pause()
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
                  this.init(),
                      this._specialStyles && this._specialStyles.finish(),
                      this._onFinish(), this.domPlayer.finish()
                }
                reset() {
                  this._resetDomPlayerState(), this._destroyed = !1,
                                               this._finished = !1,
                                               this._started = !1
                }
                _resetDomPlayerState() {
                  this.domPlayer && this.domPlayer.cancel()
                }
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
                          .forEach(e => {"offset" != e &&
                                         (t[e] = this._finished
                                                     ? this._finalKeyframe[e]
                                                     : ym(this.element, e))}),
                      this.currentSnapshot = t
                }
                triggerCallback(t) {
                  const e = "start" == t ? this._onStartFns : this._onDoneFns;
                  e.forEach(t => t()), e.length = 0
                }
              }
              class Mg {
                constructor() {
                  this._isNativeImpl =
                      /\{\s*\[native\s+code\]\s*\}/.test(jg().toString()),
                  this._cssKeyframesDriver = new Ng
                }
                validateStyleProperty(t) { return Uf(t) }
                matchesElement(t, e) { return Vf(t, e) }
                containsElement(t, e) { return Bf(t, e) }
                query(t, e, n) { return $f(t, e, n) }
                computeStyle(t, e, n) { return window.getComputedStyle(t)[e] }
                overrideWebAnimationsSupport(t) { this._isNativeImpl = t }
                animate(t, e, n, r, s, i = [], o) {
                  if (!o && !this._isNativeImpl)
                    return this._cssKeyframesDriver.animate(t, e, n, r, s, i);
                  const a = {
                    duration : n,
                    delay : r,
                    fill : 0 == r ? "both" : "forwards"
                  };
                  s && (a.easing = s);
                  const l = {}, c = i.filter(t => t instanceof Dg);
                  fm(n, r) && c.forEach(t => {
                    let e = t.currentSnapshot;
                    Object.keys(e).forEach(t => l[t] = e[t])
                  });
                  const u = vg(t, e = mm(t, e = e.map(t => nm(t, !1)), l));
                  return new Dg(t, e, a, u)
                }
              }
              function jg() {
                return "undefined" != typeof window &&
                           void 0 !== window.document &&
                           Element.prototype.animate ||
                {}
              }
              let Fg = (() => {
                class t extends
                    _f {
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
                        const n = Array.isArray(t) ? bf(t) : t;
                        return Bg(this._renderer, null, e, "register", [ n ]),
                               new Ug(e, this._renderer)
                      }
                    } return t.\u0275fac =
                        function(e) { return new (e || t)(Zt(Xo), Zt(nc)) },
                    t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                    t
              })();
              class Ug extends class {}
              {
                constructor(t, e) { super(), this._id = t, this._renderer = e }
                create(t, e) {
                  return new Vg(this._id, t, e || {}, this._renderer)
                }
              }
              class Vg {
                constructor(t, e, n, r) {
                  this.id = t, this.element = e, this._renderer = r,
                  this.parentPlayer = null, this._started = !1,
                  this.totalTime = 0, this._command("create", n)
                }
                _listen(t, e) {
                  return this._renderer.listen(this.element,
                                               `@@${this.id}:${t}`, e)
                }
                _command(t, ...e) {
                  return Bg(this._renderer, this.element, this.id, t, e)
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
              function Bg(t, e, n, r, s) {
                return t.setProperty(e, `@@${n}:${r}`, s)
              }
              const $g = "@", Hg = "@.disabled";
              let zg = (() => {
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
                      return t || (t = new qg("", n, this.engine),
                                   this._rendererCache.set(n, t)),
                             t
                    }
                    const r = e.id, s = e.id + "-" + this._currentId;
                    this._currentId++, this.engine.register(s, t);
                    const i = e => {
                      Array.isArray(e)
                          ? e.forEach(i)
                          : this.engine.registerTrigger(r, s, t, e.name, e)
                    };
                    return e.data.animation.forEach(i),
                           new Qg(this, s, n, this.engine)
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
                                     this._animationCallbacksBuffer.forEach(
                                         t => {
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
                    function(e) { return new (e || t)(Zt(Xo), Zt(_g), Zt(Cl)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })();
              class qg {
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
                setAttribute(t, e, n, r) {
                  this.delegate.setAttribute(t, e, n, r)
                }
                removeAttribute(t, e, n) {
                  this.delegate.removeAttribute(t, e, n)
                }
                addClass(t, e) { this.delegate.addClass(t, e) }
                removeClass(t, e) { this.delegate.removeClass(t, e) }
                setStyle(t, e, n, r) { this.delegate.setStyle(t, e, n, r) }
                removeStyle(t, e, n) { this.delegate.removeStyle(t, e, n) }
                setProperty(t, e, n) {
                  e.charAt(0) == $g && e == Hg
                      ? this.disableAnimations(t, !!n)
                      : this.delegate.setProperty(t, e, n)
                }
                setValue(t, e) { this.delegate.setValue(t, e) }
                listen(t, e, n) { return this.delegate.listen(t, e, n) }
                disableAnimations(t, e) { this.engine.disableAnimations(t, e) }
              }
              class Qg extends qg {
                constructor(t, e, n, r) {
                  super(e, n, r), this.factory = t, this.namespaceId = e
                }
                setProperty(t, e, n) {
                  e.charAt(0) == $g
                      ? "." == e.charAt(1) && e == Hg
                            ? this.disableAnimations(t, n = void 0 === n || !!n)
                            : this.engine.process(this.namespaceId, t,
                                                  e.substr(1), n)
                      : this.delegate.setProperty(t, e, n)
                }
                listen(t, e, n) {
                  if (e.charAt(0) == $g) {
                    const r = function(t) {
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
                    let s = e.substr(1), i = "";
                    return s.charAt(0) != $g &&
                               ([ s, i ] =
                                    function(t) {
                                      const e = t.indexOf(".");
                                      return [
                                        t.substring(0, e), t.substr(e + 1)
                                      ]
                                    }(s)),
                           this.engine.listen(
                               this.namespaceId, r, s, i,
                               t => {this.factory.scheduleListenerCallback(
                                   t._data || -1, n, t)})
                  }
                  return this.delegate.listen(t, e, n)
                }
              }
              let Wg = (() => {
                class t extends
                    _g {
                      constructor(t, e, n) { super(t.body, e, n) }
                    } return t.\u0275fac =
                        function(
                            e) { return new (e || t)(Zt(nc), Zt(qf), Zt(Bm)) },
                    t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                    t
              })();
              const Gg = new Ut("AnimationModuleType"), Kg = [
                {
                  provide : qf,
                  useFactory : function() {
                    return "function" == typeof jg() ? new Mg : new Ng
                  }
                },
                {provide : Gg, useValue : "BrowserAnimations"},
                {provide : _f, useClass : Fg},
                {provide : Bm, useFactory : function() { return new $m }},
                {provide : _g, useClass : Wg}, {
                  provide : Xo,
                  useFactory : function(t, e, n) { return new zg(t, e, n) },
                  deps : [ Yc, _g, Cl ]
                }
              ];
              let Zg = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  providers : Kg,
                  imports : [ hu ]
                }),
                t
              })();
              const Yg = new sa("10.2.2"), Jg = new Ut("mat-sanity-checks", {
                                             providedIn : "root",
                                             factory : function() { return !0 }
                                           });
              let Xg,
                  ty = (() => {
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
                              e = (null == t ? void 0 : t.defaultView) ||
                                  window;
                        return "object" == typeof e && e ? e : null
                      }
                      _checksAreEnabled() { return Cr() && !this._isTestEnv() }
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
                        const r = getComputedStyle(n);
                        r && "none" !== r.display &&
                            console.warn(
                                "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"),
                            e.body.removeChild(n)
                      }
                      _checkCdkVersionMatch() {
                        this._checksAreEnabled() &&
                            (!0 === this._sanityChecks ||
                             this._sanityChecks.version) &&
                            Yg.full !== yf.full &&
                            console.warn(
                                "The Angular Material version (" + Yg.full +
                                ") does not match the Angular CDK version (" +
                                yf.full +
                                ").\nPlease ensure the versions of these two packages exactly match.")
                      }
                    } return t.\u0275mod = ve({type : t}),
                    t.\u0275inj = dt({
                      factory : function(e) {
                        return new (e || t)(Zt(pf), Zt(Jg, 8), Zt(nc, 8))
                      },
                      imports : [ [ gf ], gf ]
                    }),
                    t
                  })();
              function ey(t) {
                return class extends t {
                  constructor(...t) { super(...t), this._disabled = !1 }
                  get disabled() { return this._disabled }
                  set disabled(t) { this._disabled = ef(t) }
                }
              }
              function ny(t, e) {
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
                         e && this._elementRef.nativeElement.classList.add(
                                  "mat-" + e),
                         this._color = e)
                  }
                }
              }
              function ry(t) {
                return class extends t {
                  constructor(...t) { super(...t), this._disableRipple = !1 }
                  get disableRipple() { return this._disableRipple }
                  set disableRipple(t) { this._disableRipple = ef(t) }
                }
              }
              function sy(t, e = 0) {
                return class extends t {
                  constructor(...t) {
                    super(...t), this._tabIndex = e, this.defaultTabIndex = e
                  }
                  get tabIndex() { return this.disabled ? -1 : this._tabIndex }
                  set tabIndex(t) {
                    this._tabIndex = null != t ? nf(t) : this.defaultTabIndex
                  }
                }
              }
              try {
                Xg = "undefined" != typeof Intl
              } catch (Uv) {
                Xg = !1
              }
              class iy {
                constructor(t, e, n) {
                  this._renderer = t, this.element = e, this.config = n,
                  this.state = 3
                }
                fadeOut() { this._renderer.fadeOutRipple(this) }
              }
              const oy = {enterDuration : 450, exitDuration : 400},
                    ay = Kp({passive : !0}), ly = [ "mousedown", "touchstart" ],
                    cy = [ "mouseup", "mouseleave", "touchend", "touchcancel" ];
              class uy {
                constructor(t, e, n, r) {
                  this._target = t, this._ngZone = e, this._isPointerDown = !1,
                  this._activeRipples = new Set,
                  this._pointerUpEventsRegistered = !1,
                  r.isBrowser && (this._containerElement = rf(n))
                }
                fadeInRipple(t, e, n = {}) {
                  const r = this._containerRect =
                      this._containerRect ||
                      this._containerElement.getBoundingClientRect(),
                        s = Object.assign(Object.assign({}, oy), n.animation);
                  n.centered &&
                      (t = r.left + r.width / 2, e = r.top + r.height / 2);
                  const i = n.radius ||
                            function(t, e, n) {
                              const r = Math.max(Math.abs(t - n.left),
                                                 Math.abs(t - n.right)),
                                    s = Math.max(Math.abs(e - n.top),
                                                 Math.abs(e - n.bottom));
                              return Math.sqrt(r * r + s * s)
                            }(t, e, r),
                        o = t - r.left, a = e - r.top, l = s.enterDuration,
                        c = document.createElement("div");
                  c.classList.add("mat-ripple-element"),
                      c.style.left = o - i + "px", c.style.top = a - i + "px",
                      c.style.height = 2 * i + "px",
                      c.style.width = 2 * i + "px",
                      null != n.color && (c.style.backgroundColor = n.color),
                      c.style.transitionDuration = l + "ms",
                      this._containerElement.appendChild(c),
                      window.getComputedStyle(c).getPropertyValue("opacity"),
                      c.style.transform = "scale(1)";
                  const u = new iy(this, c, n);
                  return u.state = 0, this._activeRipples.add(u),
                         n.persistent || (this._mostRecentTransientRipple = u),
                         this._runTimeoutOutsideZone(() => {
                           const t = u === this._mostRecentTransientRipple;
                           u.state = 1, n.persistent ||
                                            t && this._isPointerDown ||
                                            u.fadeOut()
                         }, l), u
                }
                fadeOutRipple(t) {
                  const e = this._activeRipples.delete(t);
                  if (t === this._mostRecentTransientRipple &&
                          (this._mostRecentTransientRipple = null),
                      this._activeRipples.size || (this._containerRect = null),
                      !e)
                    return;
                  const n = t.element, r = Object.assign(Object.assign({}, oy),
                                                         t.config.animation);
                  n.style.transitionDuration = r.exitDuration + "ms",
                  n.style.opacity = "0", t.state = 2,
                  this._runTimeoutOutsideZone(
                      () => {t.state = 3, n.parentNode.removeChild(n)},
                      r.exitDuration)
                }
                fadeOutAll() { this._activeRipples.forEach(t => t.fadeOut()) }
                setupTriggerEvents(t) {
                  const e = rf(t);
                  e && e !== this._triggerElement &&
                      (this._removeTriggerEvents(), this._triggerElement = e,
                       this._registerEvents(ly))
                }
                handleEvent(t) {
                  "mousedown" === t.type ? this._onMousedown(t)
                                         : "touchstart" === t.type ? this._onTouchStart(
                                                                         t)
                                                                   : this._onPointerUp(),
                      this._pointerUpEventsRegistered ||
                          (this._registerEvents(cy),
                           this._pointerUpEventsRegistered = !0)
                }
                _onMousedown(t) {
                  const e = sf(t),
                        n = this._lastTouchStartEvent &&
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
                                  t.config.terminateOnPointerUp &&
                                      0 === t.state) &&
                                 t.fadeOut()}))
                }
                _runTimeoutOutsideZone(t, e = 0) {
                  this._ngZone.runOutsideAngular(() => setTimeout(t, e))
                }
                _registerEvents(t) {
                  this._ngZone.runOutsideAngular(
                      () => {
                          t.forEach(t => {this._triggerElement.addEventListener(
                                        t, this, ay)})})
                }
                _removeTriggerEvents() {
                  this._triggerElement &&
                      (ly.forEach(
                           t => {this._triggerElement.removeEventListener(
                               t, this, ay)}),
                       this._pointerUpEventsRegistered &&
                           cy.forEach(
                               t => {this._triggerElement.removeEventListener(
                                   t, this, ay)}))
                }
              }
              const hy = new Ut("mat-ripple-global-options");
              let dy = (() => {
                class t {
                  constructor(t, e, n, r, s) {
                    this._elementRef = t, this._animationMode = s,
                    this.radius = 0, this._disabled = !1,
                    this._isInitialized = !1, this._globalOptions = r || {},
                    this._rippleRenderer = new uy(this, e, t, n)
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
                    this._isInitialized = !0,
                    this._setupTriggerEventsIfEnabled()
                  }
                  ngOnDestroy() { this._rippleRenderer._removeTriggerEvents() }
                  fadeOutAll() { this._rippleRenderer.fadeOutAll() }
                  get rippleConfig() {
                    return {
                      centered: this.centered, radius: this.radius,
                          color: this.color,
                          animation: Object.assign(
                              Object.assign(
                                  Object.assign({},
                                                this._globalOptions.animation),
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
                                         Object.assign({}, this.rippleConfig),
                                         n))
                               : this._rippleRenderer.fadeInRipple(
                                     0, 0,
                                     Object.assign(
                                         Object.assign({}, this.rippleConfig),
                                         t))
                  }
                } return t.\u0275fac =
                    function(e) {
                      return new (e || t)(go(Yo), go(Cl), go(Wp), go(hy, 8),
                                          go(Gg, 8))
                    },
                t.\u0275dir = we({
                  type : t,
                  selectors :
                      [ [ "", "mat-ripple", "" ], [ "", "matRipple", "" ] ],
                  hostAttrs : [ 1, "mat-ripple" ],
                  hostVars : 2,
                  hostBindings : function(
                      t, e) { 2&t && Po("mat-ripple-unbounded", e.unbounded) },
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
                  py = (() => {
                    class t {} return t.\u0275mod = ve({type : t}),
                    t.\u0275inj = dt({
                      factory : function(e) { return new (e || t) },
                      imports : [ [ ty, Gp ], ty ]
                    }),
                    t
                  })();
              const fy = [ "mat-button", "" ], my = [ "*" ], gy = [
                "mat-button", "mat-flat-button", "mat-icon-button",
                "mat-raised-button", "mat-stroked-button", "mat-mini-fab",
                "mat-fab"
              ];
              class yy {
                constructor(t) { this._elementRef = t }
              }
              const _y = ny(ey(ry(yy)));
              let vy = (() => {
                class t extends
                    _y {
                      constructor(t, e, n) {
                        super(t),
                            this._focusMonitor = e, this._animationMode = n,
                            this.isRoundButton = this._hasHostAttributes(
                                "mat-fab", "mat-mini-fab"),
                            this.isIconButton =
                                this._hasHostAttributes("mat-icon-button");
                        for (const r of gy)
                          this._hasHostAttributes(r) &&
                              this._getHostElement().classList.add(r);
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
                        this._focusMonitor.focusVia(this._getHostElement(), t,
                                                    e)
                      }
                      _getHostElement() {
                        return this._elementRef.nativeElement
                      }
                      _isRippleDisabled() {
                        return this.disableRipple || this.disabled
                      }
                      _hasHostAttributes(...t) {
                        return t.some(
                            t => this._getHostElement().hasAttribute(t))
                      }
                    } return t
                        .\u0275fac = function(
                        e) { return new (e || t)(go(Yo), go(lf), go(Gg, 8)) },
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
                        1&t && el(dy, !0),
                            2&t && tl(n = nl()) && (e.ripple = n.first)
                      },
                      hostAttrs : [ 1, "mat-focus-indicator" ],
                      hostVars : 5,
                      hostBindings : function(t, e) {
                        2&t && (fo("disabled", e.disabled || null),
                                Po("_mat-animation-noopable",
                                   "NoopAnimations" === e._animationMode)(
                                    "mat-button-disabled", e.disabled))
                      },
                      inputs : {
                        disabled : "disabled",
                        disableRipple : "disableRipple",
                        color : "color"
                      },
                      exportAs : [ "matButton" ],
                      features : [ ro ],
                      attrs : fy,
                      ngContentSelectors : my,
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
                        1&t&&(function(t){const e=nn()[16][6];if(!e.projection){const t=e.projection=oe(1,null),n=t.slice();let r=e.child;for(;null!==r;){const e=0;null!==e&&(n[e]?n[e].projectionNext=r:t[e]=r,n[e]=r),r=r.next}}}(),bo(0,"span",0),function(t,e=0,n){const r=nn(),s=rn(),i=Ss(s,r[6],t,1,null,n||null);null===i.projection&&(i.projection=e),ln(),function(t,e,n){Ci(e[11],0,e,n,mi(t,n,e),bi(n.parent||e[6],e))}(s,r,i)}(1),wo(),xo(2,"span",1),xo(3,"span",2)),2&t&&(ds(2),Po("mat-button-ripple-round",e.isRoundButton||e.isIconButton),_o("matRippleDisabled",e._isRippleDisabled())("matRippleCentered",e.isIconButton)("matRippleTrigger",e._getHostElement()))
                      },
                      directives : [ dy ],
                      styles : [
                        ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.cdk-high-contrast-active .mat-button-focus-overlay{background-color:#fff}.cdk-high-contrast-black-on-white .mat-button-focus-overlay{background-color:#000}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}\n"
                      ],
                      encapsulation : 2,
                      changeDetection : 0
                    }),
                    t
              })(),
                  by = (() => {
                    class t {} return t.\u0275mod = ve({type : t}),
                    t.\u0275inj = dt({
                      factory : function(e) { return new (e || t) },
                      imports : [ [ py, ty ], ty ]
                    }),
                    t
                  })();
              const wy = new Ut("NgValueAccessor"), xy = [ "sliderWrapper" ],
                    Sy = Kp({passive : !1}),
                    Ey = {provide : wy, useExisting : Et(() => Ay), multi : !0};
              class Cy {}
              class ky {
                constructor(t) { this._elementRef = t }
              }
              const Ty = sy(ny(ey(ky), "accent"));
              let Ay = (() => {
                class t extends
                    Ty {
                      constructor(t, e, n, r, s, i, o, a) {
                        super(t),
                            this._focusMonitor = e, this._changeDetectorRef = n,
                            this._dir = r, this._ngZone = i,
                            this._animationMode = a, this._invert = !1,
                            this._max = 100, this._min = 0, this._step = 1,
                            this._thumbLabel = !1, this._tickInterval = 0,
                            this._value = null, this._vertical = !1,
                            this.change = new Ha, this.input = new Ha,
                            this.valueChange = new Ha,
                            this.onTouched = () => {}, this._percent = 0,
                            this._isSliding = !1, this._isActive = !1,
                            this._tickIntervalPercent = 0,
                            this._sliderDimensions = null,
                            this._controlValueAccessorChangeFn = () => {},
                            this._dirChangeSubscription = h.EMPTY,
                            this._pointerDown =
                                t => {
                                  this.disabled || this._isSliding ||
                                      !Iy(t) && 0 !== t.button ||
                                      this._ngZone.run(() => {
                                        const e = this.value, n = Oy(t);
                                        this._isSliding = !0,
                                        this._lastPointerEvent = t,
                                        t.preventDefault(),
                                        this._focusHostElement(),
                                        this._onMouseenter(),
                                        this._bindGlobalEvents(t),
                                        this._focusHostElement(),
                                        this._updateValueFromPosition(n),
                                        this._valueOnSlideStart = e,
                                        e != this.value &&
                                            this._emitInputEvent()
                                      })
                                },
                            this._pointerMove =
                                t => {
                                  if (this._isSliding) {
                                    t.preventDefault();
                                    const e = this.value;
                                    this._lastPointerEvent = t,
                                    this._updateValueFromPosition(Oy(t)),
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
                                           this.disabled ||
                                           this._emitChangeEvent(),
                                       this._valueOnSlideStart =
                                           this._lastPointerEvent = null)
                                },
                            this._windowBlur =
                                () => {
                                  this._lastPointerEvent &&
                                      this._pointerUp(this._lastPointerEvent)
                                },
                            this._document = o,
                            this.tabIndex = parseInt(s) || 0,
                            i.runOutsideAngular(() => {
                              const e = t.nativeElement;
                              e.addEventListener("mousedown", this._pointerDown,
                                                 Sy),
                                  e.addEventListener("touchstart",
                                                     this._pointerDown, Sy)
                            })
                      }
                      get invert() { return this._invert }
                      set invert(t) { this._invert = ef(t) }
                      get max() { return this._max }
                      set max(t) {
                        this._max = nf(t, this._max),
                        this._percent = this._calculatePercentage(this._value),
                        this._changeDetectorRef.markForCheck()
                      }
                      get min() { return this._min }
                      set min(t) {
                        this._min = nf(t, this._min),
                        null === this._value && (this.value = this._min),
                        this._percent = this._calculatePercentage(this._value),
                        this._changeDetectorRef.markForCheck()
                      }
                      get step() { return this._step }
                      set step(t) {
                        this._step = nf(t, this._step),
                        this._step % 1 != 0 &&
                            (this._roundToDecimal =
                                 this._step.toString().split(".").pop().length),
                        this._changeDetectorRef.markForCheck()
                      }
                      get thumbLabel() { return this._thumbLabel }
                      set thumbLabel(t) { this._thumbLabel = ef(t) }
                      get tickInterval() { return this._tickInterval }
                      set tickInterval(t) {
                        this._tickInterval =
                            "auto" === t
                                ? "auto"
                                : "number" == typeof t || "string" == typeof t
                                      ? nf(t, this._tickInterval)
                                      : 0
                      }
                      get value() {
                        return null === this._value && (this.value = this._min),
                               this._value
                      }
                      set value(t) {
                        if (t !== this._value) {
                          let e = nf(t);
                          this._roundToDecimal &&
                              (e = parseFloat(e.toFixed(this._roundToDecimal))),
                              this._value = e,
                              this._percent =
                                  this._calculatePercentage(this._value),
                              this._changeDetectorRef.markForCheck()
                        }
                      }
                      get vertical() { return this._vertical }
                      set vertical(t) { this._vertical = ef(t) }
                      get displayValue() {
                        return this.displayWith
                                   ? this.displayWith(this.value)
                                   : this._roundToDecimal && this.value &&
                                             this.value % 1 != 0
                                         ? this.value.toFixed(
                                               this._roundToDecimal)
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
                              this._shouldInvertMouseCoords() ? "" : "-"}${
                              this._getThumbGap()}px) scale3d(${e})`,
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
                              (("rtl" != this._getDirection() || this.vertical
                                    ? t
                                    : !t)
                                   ? this.percent
                                   : 1 - this.percent)}%)`
                        }
                      }
                      _shouldInvertMouseCoords() {
                        const t = this._shouldInvertAxis();
                        return "rtl" != this._getDirection() || this.vertical
                                   ? t
                                   : !t
                      }
                      _getDirection() {
                        return this._dir && "rtl" == this._dir.value ? "rtl"
                                                                     : "ltr"
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
                        t.removeEventListener("mousedown", this._pointerDown,
                                              Sy),
                            t.removeEventListener("touchstart",
                                                  this._pointerDown, Sy),
                            this._lastPointerEvent = null,
                            this._removeGlobalEvents(),
                            this._focusMonitor.stopMonitoring(this._elementRef),
                            this._dirChangeSubscription.unsubscribe()
                      }
                      _onMouseenter() {
                        this.disabled || (this._sliderDimensions =
                                              this._getSliderDimensions(),
                                          this._updateTickIntervalPercent())
                      }
                      _onFocus() {
                        this._sliderDimensions = this._getSliderDimensions(),
                        this._updateTickIntervalPercent()
                      }
                      _onBlur() { this.onTouched() }
                      _onKeydown(t) {
                        if (this.disabled || function(t, ...e) {
                              return e.length ? e.some(e => t[e])
                                              : t.altKey || t.shiftKey ||
                                                    t.ctrlKey || t.metaKey
                            }(t))
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
                          this._increment("rtl" == this._getDirection() ? 1
                                                                        : -1);
                          break;
                        case 38:
                          this._increment(1);
                          break;
                        case 39:
                          this._increment("rtl" == this._getDirection() ? -1
                                                                        : 1);
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
                      _getWindow() {
                        return this._document.defaultView || window
                      }
                      _bindGlobalEvents(t) {
                        const e = this._document, n = Iy(t),
                              r = n ? "touchend" : "mouseup";
                        e.addEventListener(n ? "touchmove" : "mousemove",
                                           this._pointerMove, Sy),
                            e.addEventListener(r, this._pointerUp, Sy),
                            n && e.addEventListener("touchcancel",
                                                    this._pointerUp, Sy);
                        const s = this._getWindow();
                        void 0 !== s && s &&
                            s.addEventListener("blur", this._windowBlur)
                      }
                      _removeGlobalEvents() {
                        const t = this._document;
                        t.removeEventListener("mousemove", this._pointerMove,
                                              Sy),
                            t.removeEventListener("mouseup", this._pointerUp,
                                                  Sy),
                            t.removeEventListener("touchmove",
                                                  this._pointerMove, Sy),
                            t.removeEventListener("touchend", this._pointerUp,
                                                  Sy),
                            t.removeEventListener("touchcancel",
                                                  this._pointerUp, Sy);
                        const e = this._getWindow();
                        void 0 !== e && e &&
                            e.removeEventListener("blur", this._windowBlur)
                      }
                      _increment(t) {
                        this.value =
                            this._clamp((this.value || 0) + this.step * t,
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
                        if (this._shouldInvertMouseCoords() && (e = 1 - e),
                            0 === e)
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
                            let t = this.vertical
                                        ? this._sliderDimensions.height
                                        : this._sliderDimensions.width,
                                e = Math.ceil(30 / (t * this.step /
                                                    (this.max - this.min)));
                            this._tickIntervalPercent = e * this.step / t
                          } else
                            this._tickIntervalPercent = this.tickInterval *
                                                        this.step /
                                                        (this.max - this.min)
                      }
                      _createChangeEvent(t = this.value) {
                        let e = new Cy;
                        return e.source = this, e.value = t, e
                      }
                      _calculatePercentage(t) {
                        return ((t || 0) - this.min) / (this.max - this.min)
                      }
                      _calculateValue(t) {
                        return this.min + t * (this.max - this.min)
                      }
                      _clamp(t, e = 0, n = 1) {
                        return Math.max(e, Math.min(t, n))
                      }
                      _getSliderDimensions() {
                        return this._sliderWrapper
                                   ? this._sliderWrapper.nativeElement
                                         .getBoundingClientRect()
                                   : null
                      }
                      _focusHostElement(t) {
                        this._elementRef.nativeElement.focus(t)
                      }
                      _blurHostElement() {
                        this._elementRef.nativeElement.blur()
                      }
                      writeValue(t) { this.value = t }
                      registerOnChange(t) {
                        this._controlValueAccessorChangeFn = t
                      }
                      registerOnTouched(t) { this.onTouched = t }
                      setDisabledState(t) { this.disabled = t }
                    } return t.\u0275fac =
                        function(e) {
                          return new (e || t)(go(Yo), go(lf), go(Mi), go(mf, 8),
                                              yo("tabindex"), go(Cl), go(nc),
                                              go(Gg, 8))
                        },
                    t.\u0275cmp = me({
                      type : t,
                      selectors : [ [ "mat-slider" ] ],
                      viewQuery : function(t, e) {
                        var n;
                        1&t && el(xy, !0),
                            2&t && tl(n = nl()) && (e._sliderWrapper = n.first)
                      },
                      hostAttrs : [
                        "role", "slider", 1, "mat-slider", "mat-focus-indicator"
                      ],
                      hostVars : 28,
                      hostBindings : function(t, e) {
                        1&t &&
                            Eo("focus", (function() { return e._onFocus() }))(
                                "blur", (function() { return e._onBlur() }))(
                                "keydown",
                                (function(t) { return e._onKeydown(t) }))(
                                "keyup", (function() { return e._onKeyup() }))(
                                "mouseenter",
                                (function() { return e._onMouseenter() }))(
                                "selectstart",
                                (function(t) { return t.preventDefault() })),
                            2&t &&
                                (Uo("tabIndex", e.tabIndex),
                                 fo("aria-disabled",
                                    e.disabled)("aria-valuemax", e.max)(
                                     "aria-valuemin", e.min)("aria-valuenow",
                                                             e.value)(
                                     "aria-orientation",
                                     e.vertical ? "vertical" : "horizontal"),
                                 Po("mat-slider-disabled", e.disabled)(
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
                      features : [ Wo([ Ey ]), ro ],
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
                        [ 1, "mat-slider-focus-ring" ],
                        [ 1, "mat-slider-thumb" ],
                        [ 1, "mat-slider-thumb-label" ],
                        [ 1, "mat-slider-thumb-label-text" ]
                      ],
                      template : function(t, e) {
                        1&t &&
                            (bo(0, "div", 0, 1), bo(2, "div", 2),
                             xo(3, "div", 3), xo(4, "div", 4), wo(),
                             bo(5, "div", 5), xo(6, "div", 6), wo(),
                             bo(7, "div", 7), xo(8, "div", 8), xo(9, "div", 9),
                             bo(10, "div", 10), bo(11, "span", 11), Mo(12),
                             wo(), wo(), wo(), wo()),
                            2&t &&
                                (ds(3),
                                 _o("ngStyle", e._getTrackBackgroundStyles()),
                                 ds(1), _o("ngStyle", e._getTrackFillStyles()),
                                 ds(1),
                                 _o("ngStyle", e._getTicksContainerStyles()),
                                 ds(1), _o("ngStyle", e._getTicksStyles()),
                                 ds(1),
                                 _o("ngStyle", e._getThumbContainerStyles()),
                                 ds(5), jo(e.displayValue))
                      },
                      directives : [ Ic ],
                      styles : [
                        '.mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:none;vertical-align:middle}.mat-slider:not(.mat-slider-disabled):active,.mat-slider.mat-slider-sliding:not(.mat-slider-disabled){cursor:-webkit-grabbing;cursor:grabbing}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-track-background{position:absolute;transform-origin:100% 100%;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{background-repeat:repeat;background-clip:content-box;box-sizing:border-box;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-focus-ring{position:absolute;width:30px;height:30px;border-radius:50%;transform:scale(0);opacity:0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider.cdk-keyboard-focused .mat-slider-focus-ring,.mat-slider.cdk-program-focused .mat-slider-focus-ring{transform:scale(1);opacity:1}.mat-slider:not(.mat-slider-disabled):not(.mat-slider-sliding) .mat-slider-thumb-label,.mat-slider:not(.mat-slider-disabled):not(.mat-slider-sliding) .mat-slider-thumb{cursor:-webkit-grab;cursor:grab}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(0.7);transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),border-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),border-radius 400ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.cdk-high-contrast-active .mat-slider-thumb-label{outline:solid 1px}.mat-slider-thumb-label-text{z-index:1;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-sliding .mat-slider-track-fill,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-thumb-container{transition-duration:0ms}.mat-slider-has-ticks .mat-slider-wrapper::after{content:"";position:absolute;border-width:0;border-style:solid;opacity:0;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-disabled) .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-disabled) .mat-slider-ticks{opacity:1}.mat-slider-thumb-label-showing .mat-slider-focus-ring{display:none}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.mat-slider:not(.mat-slider-disabled).cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.mat-slider:not(.mat-slider-disabled).cdk-focused .mat-slider-thumb-label{border-radius:50% 50% 0}.mat-slider:not(.mat-slider-disabled).cdk-focused .mat-slider-thumb-label-text{opacity:1}.mat-slider:not(.mat-slider-disabled).cdk-mouse-focused .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled).cdk-touch-focused .mat-slider-thumb,.mat-slider:not(.mat-slider-disabled).cdk-program-focused .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-disabled .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(0.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}.cdk-high-contrast-active .mat-slider-horizontal .mat-slider-ticks-container{height:0;outline:solid 2px;top:1px}.mat-slider-horizontal .mat-slider-ticks{height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-focus-ring{top:-15px;right:-15px}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(0.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.cdk-focused .mat-slider-thumb-label{transform:rotate(45deg)}.cdk-high-contrast-active .mat-slider-horizontal.cdk-focused .mat-slider-thumb-label,.cdk-high-contrast-active .mat-slider-horizontal.cdk-focused .mat-slider-thumb-label-text{transform:none}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}.cdk-high-contrast-active .mat-slider-vertical .mat-slider-ticks-container{width:0;outline:solid 2px;left:1px}.mat-slider-vertical .mat-slider-focus-ring{bottom:-15px;left:-15px}.mat-slider-vertical .mat-slider-ticks{width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb{-webkit-backface-visibility:hidden;backface-visibility:hidden}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(0.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.cdk-focused .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%}.mat-slider._mat-animation-noopable .mat-slider-track-fill,.mat-slider._mat-animation-noopable .mat-slider-track-background,.mat-slider._mat-animation-noopable .mat-slider-ticks,.mat-slider._mat-animation-noopable .mat-slider-thumb-container,.mat-slider._mat-animation-noopable .mat-slider-focus-ring,.mat-slider._mat-animation-noopable .mat-slider-thumb,.mat-slider._mat-animation-noopable .mat-slider-thumb-label,.mat-slider._mat-animation-noopable .mat-slider-thumb-label-text,.mat-slider._mat-animation-noopable .mat-slider-has-ticks .mat-slider-wrapper::after{transition:none}\n'
                      ],
                      encapsulation : 2,
                      changeDetection : 0
                    }),
                    t
              })();
              function Iy(t) { return "t" === t.type[0] }
              function Oy(t) {
                const e = Iy(t) ? t.touches[0] || t.changedTouches[0] : t;
                return { x: e.clientX, y: e.clientY }
              }
              let Py = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  imports : [ [ Oc, ty ], ty ]
                }),
                t
              })();
              function Ry(t, e, n, r) {
                return new (n || (n = Promise))((function(s, i) {
                  function o(t) {
                    try {
                      l(r.next(t))
                    } catch (e) {
                      i(e)
                    }
                  }
                  function a(t) {
                    try {
                      l(r.throw(t))
                    } catch (e) {
                      i(e)
                    }
                  }
                  function l(t) {
                    var e;
                    t.done
                        ? s(t.value)
                        : (e = t.value,
                           e instanceof n ? e : new n((function(t) { t(e) })))
                              .then(o, a)
                  }
                  l((r = r.apply(t, e || [])).next())
                }))
              }
              function Ly(t, e, n, s) {
                return r(n) && (s = n, n = void 0),
                       s ? Ly(t, e, n).pipe(k(t => l(t) ? s(...t) : s(t)))
                         : new _(r => {
                             !function t(e, n, r, s, i) {
                               let o;
                               if (function(t) {
                                     return t &&
                                            "function" ==
                                                typeof t.addEventListener &&
                                            "function" ==
                                                typeof t.removeEventListener
                                   }(e)) {
                                 const t = e;
                                 e.addEventListener(n, r, i),
                                     o = () => t.removeEventListener(n, r, i)
                               } else if (function(t) {
                                            return t &&
                                                   "function" == typeof t.on &&
                                                   "function" == typeof t.off
                                          }(e)) {
                                 const t = e;
                                 e.on(n, r), o = () => t.off(n, r)
                               } else if (function(t) {
                                            return t &&
                                                   "function" ==
                                                       typeof t.addListener &&
                                                   "function" ==
                                                       typeof t.removeListener
                                          }(e)) {
                                 const t = e;
                                 e.addListener(n, r),
                                     o = () => t.removeListener(n, r)
                               } else {
                                 if (!e || !e.length)
                                   throw new TypeError("Invalid event target");
                                 for (let o = 0, a = e.length; o < a; o++)
                                   t(e[o], n, r, s, i)
                               }
                               s.add(o)
                             }(t, e, (function(t) {
                                 r.next(
                                     arguments.length > 1
                                         ? Array.prototype.slice.call(arguments)
                                         : t)
                               }),
                               r, n)
                           })
              }
              function Ny(t) { return e => e.lift(new Dy(t)) }
              class Dy {
                constructor(t) { this.notifier = t }
                call(t, e) {
                  const n = new My(t), r = U(this.notifier, new j(n));
                  return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n
                }
              }
              class My extends F {
                constructor(t) { super(t), this.seenValue = !1 }
                notifyNext() { this.seenValue = !0, this.complete() }
                notifyComplete() {}
              }
              const jy = {
                provide : hl,
                useFactory : function(t, e) {
                  return () => {
                    if (Pc(e)) {
                      const e =
                          Array.from(t.querySelectorAll(`[class*=${Fy}]`)),
                            n = /\bflex-layout-.+?\b/g;
                      e.forEach(
                          t => {t.classList.contains(Fy + "ssr") && t.parentNode
                                    ? t.parentNode.removeChild(t)
                                    : t.className.replace(n, "")})
                    }
                  }
                },
                deps : [ nc, ul ],
                multi : !0
              },
                    Fy = "flex-layout-";
              let Uy = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  providers : [ jy ]
                }),
                t
              })();
              class Vy {
                constructor(t = !1, e = "all", n = "", r = "", s = 0) {
                  this.matches = t, this.mediaQuery = e, this.mqAlias = n,
                  this.suffix = r, this.priority = s, this.property = ""
                }
                clone() {
                  return new Vy(this.matches, this.mediaQuery, this.mqAlias,
                                this.suffix)
                }
              }
              let By = (() => {
                class t {
                  constructor() { this.stylesheet = new Map }
                  addStyleToElement(t, e, n) {
                    const r = this.stylesheet.get(t);
                    r ? r.set(e, n)
                      : this.stylesheet.set(t, new Map([ [ e, n ] ]))
                  }
                  clearStyles() { this.stylesheet.clear() }
                  getStyleForElement(t, e) {
                    const n = this.stylesheet.get(t);
                    let r = "";
                    if (n) {
                      const t = n.get(e);
                      "number" != typeof t && "string" != typeof t ||
                          (r = t + "")
                    }
                    return r
                  }
                } return t.\u0275fac = function(e) { return new (e || t) },
                t.\u0275prov = ht({
                  factory : function() { return new t },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
              const $y = {
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
                    Hy = new Ut(
                        "Flex Layout token, config options for the library",
                        {providedIn : "root", factory : () => $y}),
                    zy = new Ut("FlexLayoutServerLoaded",
                                {providedIn : "root", factory : () => !1}),
                    qy = new Ut(
                        "Flex Layout token, collect all breakpoints into one provider",
                        {providedIn : "root", factory : () => null});
              function Qy(t, e) {
                return t = t ? t.clone() : new Vy,
                       e && (t.mqAlias = e.alias, t.mediaQuery = e.mediaQuery,
                             t.suffix = e.suffix, t.priority = e.priority),
                       t
              }
              const Wy = "inline",
                    Gy = [ "row", "column", "row-reverse", "column-reverse" ];
              function Ky(t) {
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
              let Zy = (() => {
                class t {
                  constructor(t, e, n, r) {
                    this.elementRef = t, this.styleBuilder = e, this.styler = n,
                    this.marshal = r, this.DIRECTIVE_KEY = "", this.inputs = [],
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
                    this.marshal.setValue(this.nativeElement,
                                          this.DIRECTIVE_KEY, t,
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
                    const n = this.styleBuilder, r = n.shouldCache;
                    let s = this.styleCache.get(t);
                    s && r || (s = n.buildStyles(t, e),
                               r && this.styleCache.set(t, s)),
                        this.mru = Object.assign({}, s),
                        this.applyStyleToElement(s), n.sideEffect(t, s, e)
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
                      const [n, r] = this.styler.getFlowDirection(t);
                      if (!r && e) {
                        const e = function(t) {
                          let [e, n, r] = function(t) {
                            t = t ? t.toLowerCase() : "";
                            let [e, n, r] = t.split(" ");
                            return Gy.find(t => t === e) || (e = Gy[0]),
                                   n === Wy && (n = r !== Wy ? r : "", r = Wy),
                                   [ e, Ky(n), !!r ]
                          }(t);
                          return function(t, e = null, n = !1) {
                            return {
                              display: n ? "inline-flex" : "flex",
                                  "box-sizing": "border-box",
                                  "flex-direction": t, "flex-wrap": e || null
                            }
                          }(e, n, r)
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
                    this.marshal.setValue(this.nativeElement,
                                          this.DIRECTIVE_KEY, t, e)
                  }
                  updateWithValue(t) {
                    this.currentValue !== t &&
                        (this.addStyles(t), this.currentValue = t)
                  }
                } return t.\u0275fac =
                    function(
                        t) { !function() { throw new Error("invalid") }() },
                t.\u0275dir = we({type : t, features : [ De ]}),
                t
              })();
              const Yy =
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
                    Jy = "(orientation: portrait) and (max-width: 599.9px)",
                    Xy = "(orientation: landscape) and (max-width: 959.9px)",
                    t_ =
                        "(orientation: portrait) and (min-width: 600px) and (max-width: 839.9px)",
                    e_ =
                        "(orientation: landscape) and (min-width: 960px) and (max-width: 1279.9px)",
                    n_ = "(orientation: portrait) and (min-width: 840px)",
                    r_ = "(orientation: landscape) and (min-width: 1280px)",
                    s_ = {
                      HANDSET : `${Jy}, ${Xy}`,
                      TABLET : `${t_} , ${e_}`,
                      WEB : `${n_}, ${r_} `,
                      HANDSET_PORTRAIT : "" + Jy,
                      TABLET_PORTRAIT : t_ + " ",
                      WEB_PORTRAIT : "" + n_,
                      HANDSET_LANDSCAPE : "" + Xy,
                      TABLET_LANDSCAPE : "" + e_,
                      WEB_LANDSCAPE : "" + r_
                    },
                    i_ =
                        [
                          {
                            alias : "handset",
                            priority : 2e3,
                            mediaQuery : s_.HANDSET
                          },
                          {
                            alias : "handset.landscape",
                            priority : 2e3,
                            mediaQuery : s_.HANDSET_LANDSCAPE
                          },
                          {
                            alias : "handset.portrait",
                            priority : 2e3,
                            mediaQuery : s_.HANDSET_PORTRAIT
                          },
                          {
                            alias : "tablet",
                            priority : 2100,
                            mediaQuery : s_.TABLET
                          },
                          {
                            alias : "tablet.landscape",
                            priority : 2100,
                            mediaQuery : s_.TABLET_LANDSCAPE
                          },
                          {
                            alias : "tablet.portrait",
                            priority : 2100,
                            mediaQuery : s_.TABLET_PORTRAIT
                          },
                          {
                            alias : "web",
                            priority : 2200,
                            mediaQuery : s_.WEB,
                            overlapping : !0
                          },
                          {
                            alias : "web.landscape",
                            priority : 2200,
                            mediaQuery : s_.WEB_LANDSCAPE,
                            overlapping : !0
                          },
                          {
                            alias : "web.portrait",
                            priority : 2200,
                            mediaQuery : s_.WEB_PORTRAIT,
                            overlapping : !0
                          }
                        ],
                    o_ = /(\.|-|_)/g;
              function a_(t) {
                let e = t.length > 0 ? t.charAt(0) : "",
                    n = t.length > 1 ? t.slice(1) : "";
                return e.toUpperCase() + n
              }
              const l_ = new Ut("Token (@angular/flex-layout) Breakpoints", {
                providedIn : "root",
                factory : () => {
                  const t = Yt(qy), e = Yt(Hy),
                        n = [].concat.apply(
                            [],
                            (t || []).map(t => Array.isArray(t) ? t : [ t ]));
                  return function(t, e = []) {
                    const n = {};
                    return t.forEach(t=>{n[t.alias]=t}),e.forEach(t=>{n[t.alias]?function(t,...e){if(null==t)throw TypeError("Cannot convert undefined or null to object");for(let n of e)if(null!=n)for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e])}(n[t.alias],t):n[t.alias]=t}),(r=Object.keys(n).map(t=>n[t])).forEach(t=>{t.suffix||(t.suffix=t.alias.replace(o_,"|").split("|").map(a_).join(""),t.overlapping=!!t.overlapping)}),r;
                    var r
                  }((e.disableDefaultBps ? [] : Yy)
                        .concat(e.addOrientationBps ? i_ : []),
                    n)
                }
              });
              function c_(t, e) {
                return (e && e.priority || 0) - (t && t.priority || 0)
              }
              function u_(t, e) { return (t.priority || 0) - (e.priority || 0) }
              let h_ = (() => {
                class t {
                  constructor(t) {
                    this.findByMap = new Map, this.items = [...t ].sort(u_)
                  }
                  findByAlias(t) {
                    return t ? this.findWithPredicate(t, e => e.alias == t)
                             : null
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
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(l_)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(l_)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })(),
                  d_ = (() => {
                    class t {
                      constructor(t, e, n) {
                        this._zone = t, this._platformId = e,
                        this._document = n, this.source = new pu(new Vy(!0)),
                        this.registry = new Map,
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
                              Cu(n => !e || t.indexOf(n.mediaQuery) > -1));
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
                          const n = t.filter(t => !p_[t]);
                          if (n.length > 0) {
                            const t = n.join(", ");
                            try {
                              const r = e.createElement("style");
                              r.setAttribute("type", "text/css"),
                                  r.styleSheet ||
                                      r.appendChild(e.createTextNode(
                                          `\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${
                                              t} {.fx-query-test{ }}\n`)),
                                  e.head.appendChild(r),
                                  n.forEach(t => p_[t] = r)
                            } catch (r) {
                              console.error(r)
                            }
                          }
                        }(e, this._document),
                               e.forEach(t => {
                                 const e = e => {
                                   this._zone.run(() => this.source.next(
                                                      new Vy(e.matches, t)))
                                 };
                                 let r = this.registry.get(t);
                                 r || (r = this.buildMQL(t), r.addListener(e),
                                       this.pendingRemoveListenerFns.push(
                                           () => r.removeListener(e)),
                                       this.registry.set(t, r)),
                                     r.matches && n.push(new Vy(!0, t))
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
                        }(t, Pc(this._platformId))
                      }
                    } return t.\u0275fac =
                        function(
                            e) { return new (e || t)(Zt(Cl), Zt(ul), Zt(nc)) },
                    t.\u0275prov = ht({
                      factory :
                          function() { return new t(Zt(Cl), Zt(ul), Zt(nc)) },
                      token : t,
                      providedIn : "root"
                    }),
                    t
                  })();
              const p_ = {}, f_ = "print",
                    m_ = {alias : f_, mediaQuery : f_, priority : 1e3};
              let g_ = (() => {
                class t {
                  constructor(t, e, n) {
                    this.breakpoints = t, this.layoutConfig = e,
                    this._document = n,
                    this.registeredBeforeAfterPrintHooks = !1,
                    this.isPrintingBeforeAfterEvent = !1,
                    this.beforePrintEventListeners = [],
                    this.afterPrintEventListeners = [], this.isPrinting = !1,
                    this.queue = new y_, this.deactivations = []
                  }
                  withPrintQuery(t) { return [...t, f_ ] }
                  isPrintEvent(t) { return t.mediaQuery.startsWith(f_) }
                  get printAlias() {
                    return this.layoutConfig.printWithBreakpoints || []
                  }
                  get printBreakPoints() {
                    return this.printAlias
                        .map(t => this.breakpoints.findByAlias(t))
                        .filter(t => null !== t)
                  }
                  getEventBreakpoints({mediaQuery : t}) {
                    const e = this.breakpoints.findByQuery(t);
                    return (e ? [...this.printBreakPoints, e ]
                              : this.printBreakPoints)
                        .sort(c_)
                  }
                  updateEvent(t) {
                    let e = this.breakpoints.findByQuery(t.mediaQuery);
                    return this.isPrintEvent(t) &&
                               (e = this.getEventBreakpoints(t)[0],
                                t.mediaQuery = e ? e.mediaQuery : ""),
                           Qy(t, e)
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
                               t, this.getEventBreakpoints(new Vy(!0, f_))),
                           t.updateStyles())
                    }, n = () => {
                      this.isPrintingBeforeAfterEvent = !1,
                      this.isPrinting &&
                          (this.stopPrinting(t), t.updateStyles())
                    };
                    this._document.defaultView.addEventListener("beforeprint",
                                                                e),
                        this._document.defaultView.addEventListener(
                            "afterprint", n),
                        this.beforePrintEventListeners.push(e),
                        this.afterPrintEventListeners.push(n)
                  }
                  interceptEvents(t) {
                    return this.registerBeforeAfterPrintHooks(t), e => {
                      this.isPrintEvent(e)
                          ? e.matches && !this.isPrinting
                                ? (this.startPrinting(
                                       t, this.getEventBreakpoints(e)),
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
                              this.deactivations.sort(c_))
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
                    function(e) { return new (e || t)(Zt(h_), Zt(Hy), Zt(nc)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(h_), Zt(Hy), Zt(nc)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
              class y_ {
                constructor() { this.printBreakpoints = [] }
                addPrintBreakpoints(t) {
                  return t.push(m_), t.sort(c_),
                         t.forEach(t => this.addBreakpoint(t)),
                         this.printBreakpoints
                }
                addBreakpoint(t) {
                  t &&
                      void 0 === this.printBreakpoints.find(
                                     e => e.mediaQuery === t.mediaQuery) &&
                      (this.printBreakpoints =
                           function(
                               t) { return !!t && t.mediaQuery.startsWith(f_) }(
                               t)
                               ? [ t, ...this.printBreakpoints ]
                               : [...this.printBreakpoints, t ])
                }
                clear() { this.printBreakpoints = [] }
              }
              function __(t) {
                for (let e in t) {
                  let n = t[e] || "";
                  switch (e) {
                  case "display":
                    t.display =
                        "flex" === n
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
              let v_ = (() => {
                class t {
                  constructor(t, e, n, r) {
                    this._serverStylesheet = t, this._serverModuleLoaded = e,
                    this._platformId = n, this.layoutConfig = r
                  }
                  applyStyleToElement(t, e, n = null) {
                    let r = {};
                    "string" == typeof e && (r[e] = n, e = r),
                        r = this.layoutConfig.disableVendorPrefixes ? e : __(e),
                        this._applyMultiValueStyleToElement(r, t)
                  }
                  applyStyleToElements(t, e = []) {
                    const n =
                        this.layoutConfig.disableVendorPrefixes ? t : __(t);
                    e.forEach(t => {this._applyMultiValueStyleToElement(n, t)})
                  }
                  getFlowDirection(t) {
                    const e = "flex-direction";
                    let n = this.lookupStyle(t, e);
                    return [
                      n || "row",
                      this.lookupInlineStyle(t, e) ||
                              Rc(this._platformId) && this._serverModuleLoaded
                          ? n
                          : ""
                    ]
                  }
                  hasWrap(t) {
                    return "wrap" === this.lookupStyle(t, "flex-wrap")
                  }
                  lookupAttributeValue(t, e) { return t.getAttribute(e) || "" }
                  lookupInlineStyle(t, e) {
                    return Pc(this._platformId) ? t.style.getPropertyValue(e)
                                                : this._getServerStyle(t, e)
                  }
                  lookupStyle(t, e, n = !1) {
                    let r = "";
                    return t && ((r = this.lookupInlineStyle(t, e)) ||
                                 (Pc(this._platformId)
                                      ? n || (r = getComputedStyle(t)
                                                      .getPropertyValue(e))
                                      : this._serverModuleLoaded &&
                                            (r = this._serverStylesheet
                                                     .getStyleForElement(t,
                                                                         e)))),
                           r ? r.trim() : ""
                  }
                  _applyMultiValueStyleToElement(t, e) {
                    Object.keys(t).sort().forEach(n => {
                      const r = t[n], s = Array.isArray(r) ? r : [ r ];
                      s.sort();
                      for (let t of s)
                        t = t ? t + "" : "",
                        Pc(this._platformId) || !this._serverModuleLoaded
                            ? Pc(this._platformId)
                                  ? e.style.setProperty(n, t)
                                  : this._setServerStyle(e, n, t)
                            : this._serverStylesheet.addStyleToElement(e, n, t)
                    })
                  }
                  _setServerStyle(t, e, n) {
                    e = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                    const r = this._readStyleAttribute(t);
                    r[e] = n || "", this._writeStyleAttribute(t, r)
                  }
                  _getServerStyle(t, e) {
                    return this._readStyleAttribute(t)[e] || ""
                  }
                  _readStyleAttribute(t) {
                    const e = {}, n = t.getAttribute("style");
                    if (n) {
                      const t = n.split(/;+/g);
                      for (let n = 0; n < t.length; n++) {
                        const r = t[n].trim();
                        if (r.length > 0) {
                          const t = r.indexOf(":");
                          if (-1 === t)
                            throw new Error("Invalid CSS style: " + r);
                          e[r.substr(0, t).trim()] = r.substr(t + 1).trim()
                        }
                      }
                    }
                    return e
                  }
                  _writeStyleAttribute(t, e) {
                    let n = "";
                    for (const r in e)
                      e[r] && (n += r + ":" + e[r] + ";");
                    t.setAttribute("style", n)
                  }
                } return t
                    .\u0275fac = function(
                    e) { return new (e || t)(Zt(By), Zt(zy), Zt(ul), Zt(Hy)) },
                t.\u0275prov = ht({
                  factory : function() {
                    return new t(Zt(By), Zt(zy), Zt(ul), Zt(Hy))
                  },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
              class b_ {
                constructor() { this.shouldCache = !0 }
                sideEffect(t, e, n) {}
              }
              let w_ = (() => {
                class t {
                  constructor(t, e, n) {
                    this.matchMedia = t, this.breakpoints = e, this.hook = n,
                    this.activatedBreakpoints = [], this.elementMap = new Map,
                    this.elementKeyMap = new WeakMap,
                    this.watcherMap = new WeakMap, this.updateMap = new WeakMap,
                    this.clearMap = new WeakMap, this.subject = new S,
                    this.observeActivations()
                  }
                  get activatedAlias() {
                    return this.activatedBreakpoints[0]
                               ? this.activatedBreakpoints[0].alias
                               : ""
                  }
                  onMediaChange(t) {
                    const e = this.findByQuery(t.mediaQuery);
                    e && ((t = Qy(t, e)).matches &&
                                  -1 === this.activatedBreakpoints.indexOf(e)
                              ? (this.activatedBreakpoints.push(e),
                                 this.activatedBreakpoints.sort(c_),
                                 this.updateStyles())
                              : t.matches ||
                                    -1 ===
                                        this.activatedBreakpoints.indexOf(e) ||
                                    (this.activatedBreakpoints.splice(
                                         this.activatedBreakpoints.indexOf(e),
                                         1),
                                     this.activatedBreakpoints.sort(c_),
                                     this.updateStyles()))
                  }
                  init(t, e, n, r, s = []) {
                    x_(this.updateMap, t, e, n), x_(this.clearMap, t, e, r),
                        this.buildElementKeyMap(t, e),
                        this.watchExtraTriggers(t, e, s)
                  }
                  getValue(t, e, n) {
                    const r = this.elementMap.get(t);
                    if (r) {
                      const t = void 0 !== n ? r.get(n)
                                             : this.getActivatedValues(r, e);
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
                  setValue(t, e, n, r) {
                    let s = this.elementMap.get(t);
                    if (s) {
                      const i = (s.get(r) || new Map).set(e, n);
                      s.set(r, i), this.elementMap.set(t, s)
                    } else
                      s = (new Map).set(r, (new Map).set(e, n)),
                      this.elementMap.set(t, s);
                    const i = this.getValue(t, e);
                    void 0 !== i && this.updateElement(t, e, i)
                  }
                  trackValue(t, e) {
                    return this.subject.asObservable().pipe(
                        Cu(n => n.element === t && n.key === e))
                  }
                  updateStyles() {
                    this.elementMap.forEach((t, e) => {
                      const n = new Set(this.elementKeyMap.get(e));
                      let r = this.getActivatedValues(t);
                      r && r.forEach((t, r) => {
                        this.updateElement(e, r, t),
                        n.delete(r)
                      }),
                          n.forEach(n => {
                            if (r = this.getActivatedValues(t, n), r) {
                              const t = r.get(n);
                              this.updateElement(e, n, t)
                            } else
                              this.clearElement(e, n)
                          })
                    })
                  }
                  clearElement(t, e) {
                    const n = this.clearMap.get(t);
                    if (n) {
                      const r = n.get(e);
                      r && (r(), this.subject.next(
                                     {element : t, key : e, value : ""}))
                    }
                  }
                  updateElement(t, e, n) {
                    const r = this.updateMap.get(t);
                    if (r) {
                      const s = r.get(e);
                      s && (s(n), this.subject.next(
                                      {element : t, key : e, value : n}))
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
                      const r = this.getActivatedValues(n, e);
                      r &&
                          (e ? this.updateElement(t, e, r.get(e))
                             : r.forEach((e, n) => this.updateElement(t, n, e)))
                    }
                  }
                  buildElementKeyMap(t, e) {
                    let n = this.elementKeyMap.get(t);
                    n || (n = new Set, this.elementKeyMap.set(t, n)), n.add(e)
                  }
                  watchExtraTriggers(t, e, n) {
                    if (n && n.length) {
                      let r = this.watcherMap.get(t);
                      if (r || (r = new Map, this.watcherMap.set(t, r)),
                          !r.get(e)) {
                        const s = q(...n).subscribe(() => {
                          const n = this.getValue(t, e);
                          this.updateElement(t, e, n)
                        });
                        r.set(e, s)
                      }
                    }
                  }
                  findByQuery(t) { return this.breakpoints.findByQuery(t) }
                  getActivatedValues(t, e) {
                    for (let r = 0; r < this.activatedBreakpoints.length; r++) {
                      const n = t.get(this.activatedBreakpoints[r].alias);
                      if (n && (void 0 === e || n.has(e) && null != n.get(e)))
                        return n
                    }
                    const n = t.get("");
                    return void 0 === e || n && n.has(e) ? n : void 0
                  }
                  observeActivations() {
                    const t = this.breakpoints.items.map(t => t.mediaQuery);
                    this.matchMedia.observe(this.hook.withPrintQuery(t))
                        .pipe(th(this.hook.interceptEvents(this)),
                              Cu(this.hook.blockPropagation()))
                        .subscribe(this.onMediaChange.bind(this))
                  }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(d_), Zt(h_), Zt(g_)) },
                t.\u0275prov = ht({
                  factory : function() { return new t(Zt(d_), Zt(h_), Zt(g_)) },
                  token : t,
                  providedIn : "root"
                }),
                t
              })();
              function x_(t, e, n, r) {
                if (void 0 !== r) {
                  let s = t.get(e);
                  s || (s = new Map, t.set(e, s)), s.set(n, r)
                }
              }
              const S_ = "inline",
                    E_ = [ "row", "column", "row-reverse", "column-reverse" ];
              function C_(t) {
                t = t ? t.toLowerCase() : "";
                let [e, n, r] = t.split(" ");
                return E_.find(t => t === e) || (e = E_[0]),
                       n === S_ && (n = r !== S_ ? r : "", r = S_),
                       [ e, T_(n), !!r ]
              }
              function k_(t) {
                let [e] = C_(t);
                return e.indexOf("row") > -1
              }
              function T_(t) {
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
              let A_ = (() => {
                class t extends b_ {
                  buildStyles(t) {
                    return function(t) {
                      let [e, n, r] = C_(t);
                      return function(t, e = null, n = !1) {
                        return {
                          display: n ? "inline-flex" : "flex",
                              "box-sizing": "border-box", "flex-direction": t,
                              "flex-wrap": e || null
                        }
                      }(e, n, r)
                    }(t)
                  }
                }
                t.\u0275fac = function(n) { return e(n || t) },
                t.\u0275prov = ht({
                  factory : function() { return new t },
                  token : t,
                  providedIn : "root"
                });
                const e = cr(t);
                return t
              })();
              const I_ = [
                "fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md",
                "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm",
                "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl",
                "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md",
                "fxLayout.gt-lg"
              ];
              let O_ = (() => {
                class t extends Zy {
                  constructor(t, e, n, r) {
                    super(t, n, e, r), this.DIRECTIVE_KEY = "layout",
                                       this.styleCache = R_, this.init()
                  }
                } return t.\u0275fac =
                                    function(e) {
                                      return new (e || t)(go(Yo), go(v_),
                                                          go(A_), go(w_))
                                    },
                                t.\u0275dir = we({type : t, features : [ ro ]}),
                                t
              })(),
                  P_ = (() => {
                    class t extends O_ {
                      constructor() { super(...arguments), this.inputs = I_ }
                    }
                    t.\u0275fac = function(n) { return e(n || t) },
                    t.\u0275dir = we({
                      type : t,
                      selectors : [
                        [ "", "fxLayout", "" ], [ "", "fxLayout.xs", "" ],
                        [ "", "fxLayout.sm", "" ], [ "", "fxLayout.md", "" ],
                        [ "", "fxLayout.lg", "" ], [ "", "fxLayout.xl", "" ],
                        [ "", "fxLayout.lt-sm", "" ],
                        [ "", "fxLayout.lt-md", "" ],
                        [ "", "fxLayout.lt-lg", "" ],
                        [ "", "fxLayout.lt-xl", "" ],
                        [ "", "fxLayout.gt-xs", "" ],
                        [ "", "fxLayout.gt-sm", "" ],
                        [ "", "fxLayout.gt-md", "" ],
                        [ "", "fxLayout.gt-lg", "" ]
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
                      features : [ ro ]
                    });
                    const e = cr(t);
                    return t
                  })();
              const R_ = new Map, L_ = {
                "margin-left" : null,
                "margin-right" : null,
                "margin-top" : null,
                "margin-bottom" : null
              };
              let N_ = (() => {
                class t extends b_ {
                  constructor(t) { super(), this._styler = t }
                  buildStyles(t, e) {
                    return t.endsWith($_) ? function(t, e) {
                      const [n, r] = t.split(" "), s = t => "-" + t;
                      let i = "0px", o = s(r || n), a = "0px";
                      return "rtl" === e ? a = s(n) : i = s(n), {
                        margin: `0px ${i} ${o} ${a}`
                      }
                    }(t = t.slice(0, t.indexOf($_)), e.directionality) : {}
                  }
                  sideEffect(t, e, n) {
                    const r = n.items;
                    if (t.endsWith($_)) {
                      const e = function(t, e) {
                        const [n, r] = t.split(" ");
                        let s = "0px", i = "0px";
                        return "rtl" === e ? i = n : s = n, {
                          padding: `0px ${s} ${r || n} ${i}`
                        }
                      }(t = t.slice(0, t.indexOf($_)), n.directionality);
                      this._styler.applyStyleToElements(e, n.items)
                    } else {
                      const e = r.pop(), s = function(t, e) {
                        const n = H_(e.directionality, e.layout),
                              r = Object.assign({}, L_);
                        return r[n] = t, r
                      }(t, n);
                      this._styler.applyStyleToElements(s, r),
                          this._styler.applyStyleToElements(L_, [ e ])
                    }
                  }
                } return t.\u0275fac =
                                    function(e) { return new (e || t)(Zt(v_)) },
                                t.\u0275prov = ht({
                                  factory : function() { return new t(Zt(v_)) },
                                  token : t,
                                  providedIn : "root"
                                }),
                                t
              })();
              const D_ = [
                "fxLayoutGap", "fxLayoutGap.xs", "fxLayoutGap.sm",
                "fxLayoutGap.md", "fxLayoutGap.lg", "fxLayoutGap.xl",
                "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg",
                "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm",
                "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg"
              ];
              let M_ = (() => {
                class t extends Zy {
                  constructor(t, e, n, r, s, i) {
                    super(t, s, r, i), this.zone = e, this.directionality = n,
                                       this.styleUtils = r, this.layout = "row",
                                       this.DIRECTIVE_KEY = "layout-gap",
                                       this.observerSubject = new S;
                    const o = [
                      this.directionality.change,
                      this.observerSubject.asObservable()
                    ];
                    this.init(o),
                        this.marshal.trackValue(this.nativeElement, "layout")
                            .pipe(Ny(this.destroySubject))
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
                    super.ngOnDestroy(),
                        this.observer && this.observer.disconnect()
                  }
                  onLayoutChange(t) {
                    const e = t.value.split(" ");
                    this.layout = e[0],
                    E_.find(t => t === this.layout) || (this.layout = "row"),
                    this.triggerUpdate()
                  }
                  updateWithValue(t) {
                    const e =
                        this.childrenNodes
                            .filter(t =>
                                        1 === t.nodeType && this.willDisplay(t))
                            .sort((t, e) => {
                              const n = +this.styler.lookupStyle(t, "order"),
                                    r = +this.styler.lookupStyle(e, "order");
                              return isNaN(n) || isNaN(r) || n === r
                                         ? 0
                                         : n > r ? 1 : -1
                            });
                    if (e.length > 0) {
                      const n = this.directionality.value, r = this.layout;
                      "row" === r && "rtl" === n
                          ? this.styleCache = F_
                          : "row" === r && "rtl" !== n
                                ? this.styleCache = V_
                                : "column" === r && "rtl" === n
                                      ? this.styleCache = U_
                                      : "column" === r && "rtl" !== n &&
                                            (this.styleCache = B_),
                            this.addStyles(
                                t, {directionality : n, items : e, layout : r})
                    }
                  }
                  clearStyles() {
                    const t = Object.keys(this.mru).length > 0,
                          e = t ? "padding"
                                : H_(this.directionality.value, this.layout);
                    t && super.clearStyles(),
                        this.styleUtils.applyStyleToElements({[e] : ""},
                                                             this.childrenNodes)
                  }
                  willDisplay(t) {
                    const e = this.marshal.getValue(t, "show-hide");
                    return !0 === e ||
                           void 0 === e &&
                               "none" !==
                                   this.styleUtils.lookupStyle(t, "display")
                  }
                  buildChildObservable() {
                    this.zone.runOutsideAngular(
                        () => {
                            "undefined" != typeof MutationObserver &&
                            (this.observer = new MutationObserver(
                                 t => {
                                     t.some(t => t.addedNodes &&
                                                     t.addedNodes.length > 0 ||
                                                 t.removedNodes &&
                                                     t.removedNodes.length >
                                                         0) &&
                                     this.observerSubject.next()}),
                             this.observer.observe(this.nativeElement,
                                                   {childList : !0}))})
                  }
                } return t.\u0275fac =
                                    function(e) {
                                      return new (e || t)(go(Yo), go(Cl),
                                                          go(mf), go(v_),
                                                          go(N_), go(w_))
                                    },
                                t.\u0275dir = we({type : t, features : [ ro ]}),
                                t
              })(),
                  j_ = (() => {
                    class t extends M_ {
                      constructor() { super(...arguments), this.inputs = D_ }
                    }
                    t.\u0275fac = function(n) { return e(n || t) },
                    t.\u0275dir = we({
                      type : t,
                      selectors : [
                        [ "", "fxLayoutGap", "" ], [ "", "fxLayoutGap.xs", "" ],
                        [ "", "fxLayoutGap.sm", "" ],
                        [ "", "fxLayoutGap.md", "" ],
                        [ "", "fxLayoutGap.lg", "" ],
                        [ "", "fxLayoutGap.xl", "" ],
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
                      features : [ ro ]
                    });
                    const e = cr(t);
                    return t
                  })();
              const F_ = new Map, U_ = new Map, V_ = new Map, B_ = new Map,
                    $_ = " grid";
              function H_(t, e) {
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
              let z_ = (() => {
                class t extends b_ {
                  buildStyles(t, e) {
                    const n = {}, [ r, s ] = t.split(" ");
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
                      n["justify-content"] = "flex-start"
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
                      n["align-content"] = "space-between",
                      n["align-items"] = "stretch";
                      break;
                    case "space-around":
                      n["align-content"] = "space-around",
                      n["align-items"] = "stretch";
                      break;
                    case "baseline":
                      n["align-content"] = "stretch",
                      n["align-items"] = "baseline";
                      break;
                    case "stretch":
                    default:
                      n["align-items"] = n["align-content"] = "stretch"
                    }
                    return function(t, ...e) {
                      if (null == t)
                        throw TypeError(
                            "Cannot convert undefined or null to object");
                      for (let n of e)
                        if (null != n)
                          for (let e in n)
                            n.hasOwnProperty(e) && (t[e] = n[e]);
                      return t
                    }(n, {
                      display : e.inline ? "inline-flex" : "flex",
                      "flex-direction" : e.layout,
                      "box-sizing" : "border-box",
                      "max-width" :
                          "stretch" === s ? k_(e.layout) ? null : "100%" : null,
                      "max-height" : "stretch" === s && k_(e.layout) ? "100%"
                                                                     : null
                    })
                  }
                }
                t.\u0275fac = function(n) { return e(n || t) },
                t.\u0275prov = ht({
                  factory : function() { return new t },
                  token : t,
                  providedIn : "root"
                });
                const e = cr(t);
                return t
              })();
              const q_ = [
                "fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm",
                "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl",
                "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md",
                "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl",
                "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm",
                "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"
              ];
              let Q_ = (() => {
                class t extends Zy {
                  constructor(t, e, n, r) {
                    super(t, n, e, r),
                        this.DIRECTIVE_KEY = "layout-align",
                        this.layout = "row", this.inline = !1, this.init(),
                        this.marshal.trackValue(this.nativeElement, "layout")
                            .pipe(Ny(this.destroySubject))
                            .subscribe(this.onLayoutChange.bind(this))
                  }
                  updateWithValue(t) {
                    const e = this.layout || "row", n = this.inline;
                    "row" === e &&n
                        ? this.styleCache = J_
                        : "row" !== e || n
                              ? "row-reverse" === e &&n
                                    ? this.styleCache = tv
                                    : "row-reverse" !== e || n
                                          ? "column" === e &&n
                                                ? this.styleCache = X_
                                                : "column" !== e || n
                                                      ? "column-reverse" ===
                                                                e &&n
                                                            ? this.styleCache =
                                                                  ev
                                                            : "column-reverse" !==
                                                                      e ||
                                                                  n ||
                                                                  (this.styleCache =
                                                                       Y_)
                                                      : this.styleCache = K_
                                          : this.styleCache = Z_
                              : this.styleCache = G_,
                          this.addStyles(t, {layout : e, inline : n})
                  }
                  onLayoutChange(t) {
                    const e = t.value.split(" ");
                    this.layout = e[0],
                    this.inline = t.value.includes("inline"),
                    E_.find(t => t === this.layout) || (this.layout = "row"),
                    this.triggerUpdate()
                  }
                } return t.\u0275fac =
                                    function(e) {
                                      return new (e || t)(go(Yo), go(v_),
                                                          go(z_), go(w_))
                                    },
                                t.\u0275dir = we({type : t, features : [ ro ]}),
                                t
              })(),
                  W_ = (() => {
                    class t extends Q_ {
                      constructor() { super(...arguments), this.inputs = q_ }
                    }
                    t.\u0275fac = function(n) { return e(n || t) },
                    t.\u0275dir = we({
                      type : t,
                      selectors : [
                        [ "", "fxLayoutAlign", "" ],
                        [ "", "fxLayoutAlign.xs", "" ],
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
                      features : [ ro ]
                    });
                    const e = cr(t);
                    return t
                  })();
              const G_ = new Map, K_ = new Map, Z_ = new Map, Y_ = new Map,
                    J_ = new Map, X_ = new Map, tv = new Map, ev = new Map;
              let nv = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  imports : [ [ Uy, gf ] ]
                }),
                t
              })();
              class rv {
                constructor(t, e, n = !0) {
                  this.key = t, this.value = e,
                  this.key = n ? t.replace(/['"]/g, "").trim() : t.trim(),
                  this.value = n ? e.replace(/['"]/g, "").trim() : e.trim(),
                  this.value = this.value.replace(/;/, "")
                }
              }
              function sv(t) {
                let e = typeof t;
                return "object" === e
                           ? t.constructor === Array
                                 ? "array"
                                 : t.constructor === Set ? "set" : "object"
                           : e
              }
              function iv(t) {
                const [e, ...n] = t.split(":");
                return new rv(e, n.join(":"))
              }
              function ov(t, e) { return e.key && (t[e.key] = e.value), t }
              let av = (() => {
                class t extends Zy {
                  constructor(t, e, n, r, s, i, o, a, l) {
                    super(t, null, e, n),
                        this.sanitizer = r, this.ngStyleInstance = o,
                        this.DIRECTIVE_KEY = "ngStyle",
                        this.ngStyleInstance ||
                            (this.ngStyleInstance = new Ic(t, s, i)),
                        this.init();
                    const c = this.nativeElement.getAttribute("style") || "";
                    this.fallbackStyles = this.buildStyleMap(c),
                    this.isServer = a && Rc(l)
                  }
                  updateWithValue(t) {
                    const e = this.buildStyleMap(t);
                    this.ngStyleInstance.ngStyle = Object.assign(
                        Object.assign({}, this.fallbackStyles), e),
                    this.isServer && this.applyStyleToElement(e),
                    this.ngStyleInstance.ngDoCheck()
                  }
                  clearStyles() {
                    this.ngStyleInstance.ngStyle = this.fallbackStyles,
                    this.ngStyleInstance.ngDoCheck()
                  }
                  buildStyleMap(t) {
                    const e = t => this.sanitizer.sanitize(Gr.STYLE, t) || "";
                    if (t)
                      switch (sv(t)) {
                      case "string":
                        return uv(function(t, e = ";") {
                          return String(t)
                              .trim()
                              .split(e)
                              .map(t => t.trim())
                              .filter(t => "" !== t)
                        }(t), e);
                      case "array":
                        return uv(t, e);
                      case "set":
                      default:
                        return function(t, e) {
                          let n = [];
                          return "set" === sv(t)
                                     ? t.forEach(t => n.push(t))
                                     : Object.keys(t).forEach(
                                           e => {n.push(`${e}:${t[e]}`)}),
                                 function(t, e) {
                                   return t.map(iv)
                                       .filter(t => !!t)
                                       .map(t => (e && (t.value = e(t.value)),
                                                  t))
                                       .reduce(ov, {})
                                 }(n, e)
                        }(t, e)
                      }
                    return {}
                  }
                  ngDoCheck() { this.ngStyleInstance.ngDoCheck() }
                } return t.\u0275fac =
                                    function(e) {
                                      return new (e ||
                                                  t)(go(Yo), go(v_), go(w_),
                                                     go(au), go(ya), go(ea),
                                                     go(Ic, 10), go(zy), go(ul))
                                    },
                                t.\u0275dir = we({type : t, features : [ ro ]}),
                                t
              })();
              const lv = [
                "ngStyle", "ngStyle.xs", "ngStyle.sm", "ngStyle.md",
                "ngStyle.lg", "ngStyle.xl", "ngStyle.lt-sm", "ngStyle.lt-md",
                "ngStyle.lt-lg", "ngStyle.lt-xl", "ngStyle.gt-xs",
                "ngStyle.gt-sm", "ngStyle.gt-md", "ngStyle.gt-lg"
              ];
              let cv = (() => {
                class t extends av {
                  constructor() { super(...arguments), this.inputs = lv }
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
                  features : [ ro ]
                });
                const e = cr(t);
                return t
              })();
              function uv(t, e) {
                return t.map(iv)
                    .filter(t => !!t)
                    .map(t => (e && (t.value = e(t.value)), t))
                    .reduce(ov, {})
              }
              let hv = (() => {
                class t {} return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  imports : [ [ Uy ] ]
                }),
                t
              })();
              function dv(t, e) {
                if (1 & t && (bo(0, "p"), Mo(1), wo()), 2 & t) {
                  const t = To().$implicit;
                  ds(1), jo(t.value)
                }
              }
              const pv = function(t, e, n) {
                return { "height.vh": t, "background-color": e, "width.vh": n }
              };
              function fv(t, e) {
                if (1 & t && (bo(0, "div", 2), mo(1, dv, 2, 1, "p", 3), wo()),
                    2 & t) {
                  const t = e.$implicit, n = To();
                  _o("ngStyle",
                     $a(2, pv, t.value + 2, t.color, 5 - n.width / 22)),
                      ds(1), _o("ngIf", n.num.length < 50)
                }
              }
              let mv = (() => {
                class t {
                  constructor() {
                    this.num = [], this.sort = !1, this.nums = [],
                    this.width = 5, this.sortStatus = new Ha
                  }
                  ngOnInit() {}
                  ngOnChanges(t) {
                    t.sort && t.sort.currentValue &&
                        new Promise(t => {t(this.bubbleSort())})
                            .finally(
                                () => {this.sortStatus.emit({status : !1})}),
                        t.nums && (this.num = t.nums.currentValue),
                        t.width && (this.width = t.width.currentValue)
                  }
                  bubbleSort() {
                    this.sortStatus.emit({status : !0});
                    let t = 0, e = 0;
                    return new Promise((n, r) => {
                      for (let s = 0; s < this.num.length - 1; s++)
                        for (let r = 0; r < this.num.length - 1 - s; r++)
                          this.time(r, t).then(
                              () => {e++, e === 2 * this.num.length && n()}),
                              t++
                    })
                  }
                  numberSwap(t, e) {
                    return Ry(this, void 0, void 0, (function*() {
                                return new Promise(n => {n(setTimeout(() => {
                                                     const e = this.num[t + 1];
                                                     this.num[t + 1] =
                                                         this.num[t],
                                                                  this.num[t] =
                                                                      e
                                                   }, 400 * e))})
                              }))
                  }
                  changeColor(t, e, n) {
                    return Ry(this, void 0, void 0, (function*() {
                                return new Promise(
                                    r => {r(setTimeout(() => {
                                      this.num[t].color = e,
                                      this.num[t + 1].color = e
                                    },
                                                       400 * n))})
                              }))
                  }
                  time(t, e) {
                    return Ry(
                        this, void 0, void 0, (function*() {
                          return new Promise(
                              n => {setTimeout(
                                  () => {n(
                                      this.changeColor(t, "green", 1)
                                          .then(
                                              () => {
                                                  this.num[t].value >
                                                          this.num[t + 1].value
                                                      ? this.changeColor(
                                                                t, "red", 2)
                                                            .then(
                                                                () => {
                                                                    this.numberSwap(
                                                                            t,
                                                                            3)
                                                                        .then(
                                                                            () => {
                                                                                this.changeColor(
                                                                                        t,
                                                                                        "green",
                                                                                        4)
                                                                                    .then(
                                                                                        () => {this.changeColor(
                                                                                            t,
                                                                                            "dodgerblue",
                                                                                            5)})})})
                                                      : this.changeColor(
                                                            t, "dodgerblue",
                                                            2)}))},
                                  2e3 * e)})
                        }))
                  }
                } return t.\u0275fac = function(e) { return new (e || t) },
                t.\u0275cmp = me({
                  type : t,
                  selectors : [ [ "app-sorting" ] ],
                  inputs : {sort : "sort", nums : "nums", width : "width"},
                  outputs : {sortStatus : "sortStatus"},
                  features : [ De ],
                  decls : 2,
                  vars : 1,
                  consts : [
                    [
                      "fxLayout", "row", "fxLayoutAlign", "center",
                      "fxLayoutGap", "1px"
                    ],
                    [
                      "style",
                      "text-align: center; color: white; font-size: medium", 3,
                      "ngStyle", 4, "ngFor", "ngForOf"
                    ],
                    [
                      2, "text-align", "center", "color", "white", "font-size",
                      "medium", 3, "ngStyle"
                    ],
                    [ 4, "ngIf" ]
                  ],
                  template : function(t, e) {
                    1&t && (bo(0, "div", 0), mo(1, fv, 2, 6, "div", 1), wo()),
                        2&t && (ds(1), _o("ngForOf", e.num))
                  },
                  directives : [ P_, W_, j_, Ec, Ic, cv, kc ],
                  styles : [ "" ]
                }),
                t
              })(),
                  gv = (() => {
                    class t {
                      constructor(t) {
                        this.cdRef = t, this.trigger = !1, this.nums = [],
                        this.range = 5, this.disable = !1
                      }
                      ngOnInit() { this.rand(), this.disable = !1 }
                      sort() { this.trigger = !0 }
                      change(t) { this.range = Number(t.value), this.rand() }
                      rand() {
                        this.nums = [];
                        for (let t = 0; t <= this.range + 4; t++) {
                          const t = 74 * Math.random() + 1;
                          this.nums.push(
                              {value : Math.round(t), color : "dodgerblue"})
                        }
                      }
                      buttonDisable(t) {
                        this.trigger = !1, this.disable = t.status,
                        this.cdRef.detectChanges()
                      }
                    } return t.\u0275fac =
                        function(e) { return new (e || t)(go(Mi)) },
                    t.\u0275cmp = me({
                      type : t,
                      selectors : [ [ "app-main" ] ],
                      decls : 8,
                      vars : 6,
                      consts : [
                        [ "role", "banner", 1, "toolbar" ],
                        [ "mat-button", "", 3, "disabled", "click" ],
                        [ "max", "100", "min", "1", 3, "disabled", "input" ],
                        [ "role", "main", 1, "content" ],
                        [ 3, "nums", "sort", "width", "sortStatus" ]
                      ],
                      template : function(t, e) {
                        1&t &&
                            (bo(0, "div", 0), bo(1, "button", 1),
                             Eo("click", (function() { return e.rand() })),
                             Mo(2, "Generate"), wo(), bo(3, "button", 1),
                             Eo("click", (function() { return e.sort() })),
                             Mo(4, "Sort"), wo(), bo(5, "mat-slider", 2),
                             Eo("input", (function(t) { return e.change(t) })),
                             wo(), wo(), bo(6, "div", 3),
                             bo(7, "app-sorting", 4),
                             Eo("sortStatus",
                                (function(t) { return e.buttonDisable(t) })),
                             wo(), wo()),
                            2&t && (ds(1), _o("disabled", e.disable), ds(2),
                                    _o("disabled", e.disable), ds(2),
                                    _o("disabled", e.disable), ds(2),
                                    _o("nums", e.nums)("sort", e.trigger)(
                                        "width", e.range))
                      },
                      directives : [ vy, Ay, mv ],
                      styles : [
                        "",
                        '[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: #888;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  .terminal[_ngcontent-%COMP%] {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal[_ngcontent-%COMP%]::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link[_ngcontent-%COMP%]:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%] {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27, 31, 35, .2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n    border-color: rgba(27, 31, 35, .35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n\n  \n  @media screen and (max-width: 767px) {\n\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }'
                      ]
                    }),
                    t
                  })(),
                  yv = (() => {
                    class t {
                      constructor() { this.title = "sorting-visualizer" }
                    } return t.\u0275fac = function(e) { return new (e || t) },
                    t.\u0275cmp = me({
                      type : t,
                      selectors : [ [ "app-root" ] ],
                      decls : 1,
                      vars : 0,
                      template : function(t, e) { 1&t && xo(0, "app-main") },
                      directives : [ gv ],
                      styles : [ "" ]
                    }),
                    t
                  })(),
                  _v = (() => {
                    class t {} return t.\u0275mod = ve({type : t}),
                    t.\u0275inj = dt({
                      factory : function(e) { return new (e || t) },
                      imports : [ [ Uy ] ]
                    }),
                    t
                  })(),
                  vv = (() => {
                    class t {
                      constructor(t, e) {
                        Rc(e) && !t &&
                            console.warn(
                                "Warning: Flex Layout loaded on the server without FlexLayoutServerModule")
                      }
                      static withConfig(e, n = []) {
                        return {
                          ngModule:t,providers:e.serverLoaded?[{provide:Hy,useValue:Object.assign(Object.assign({},$y),e)},{provide:qy,useValue:n,multi:!0},{provide:zy,useValue:!0}]:[{provide:Hy,useValue:Object.assign(Object.assign({},$y),e)},{provide:qy,useValue:n,multi:!0}]
                        }
                      }
                    } return t.\u0275mod = ve({type : t}),
                    t.\u0275inj = dt({
                      factory : function(
                          e) { return new (e || t)(Zt(zy), Zt(ul)) },
                      imports : [ [ nv, hv, _v ], nv, hv, _v ]
                    }),
                    t
                  })();
              function bv(t, e) {
                return new _(
                    e ? n => e.schedule(wv, 0, {error : t, subscriber : n})
                      : e => e.error(t))
              }
              function wv({error : t, subscriber : e}) { e.error(t) }
              const xv = new _(Xu);
              let Sv = (() => {
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
                      return du(this.value);
                    case "E":
                      return bv(this.error);
                    case "C":
                      return xu()
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
              })();
              class Ev {
                constructor(t, e) { this.delay = t, this.scheduler = e }
                call(t, e) {
                  return e.subscribe(new Cv(t, this.delay, this.scheduler))
                }
              }
              class Cv extends f {
                constructor(t, e, n) {
                  super(t), this.delay = e, this.scheduler = n, this.queue = [],
                            this.active = !1, this.errored = !1
                }
                static dispatch(t) {
                  const e = t.source, n = e.queue, r = t.scheduler,
                        s = t.destination;
                  for (; n.length > 0 && n[0].time - r.now() <= 0;)
                    n.shift().notification.observe(s);
                  if (n.length > 0) {
                    const e = Math.max(0, n[0].time - r.now());
                    this.schedule(t, e)
                  } else
                    this.unsubscribe(), e.active = !1
                }
                _schedule(t) {
                  this.active = !0,
                  this.destination.add(t.schedule(Cv.dispatch, this.delay, {
                    source : this,
                    destination : this.destination,
                    scheduler : t
                  }))
                }
                scheduleNotification(t) {
                  if (!0 === this.errored)
                    return;
                  const e = this.scheduler, n = new kv(e.now() + this.delay, t);
                  this.queue.push(n), !1 === this.active && this._schedule(e)
                }
                _next(t) { this.scheduleNotification(Sv.createNext(t)) }
                _error(t) {
                  this.errored = !0, this.queue = [], this.destination.error(t),
                  this.unsubscribe()
                }
                _complete() {
                  this.scheduleNotification(Sv.createComplete()),
                      this.unsubscribe()
                }
              }
              class kv {
                constructor(t, e) { this.time = t, this.notification = e }
              }
              const Tv =
                  "Service workers are disabled or not supported by this browser";
              class Av {
                constructor(t) {
                  if (this.serviceWorker = t, t) {
                    const e =
                        Ly(t, "controllerchange").pipe(k(() => t.controller)),
                          n = qu(Su(() => du(t.controller)), e);
                    this.worker = n.pipe(Cu(t => !!t)),
                    this.registration =
                        this.worker.pipe(Uu(() => t.getRegistration()));
                    const r = Ly(t, "message")
                                  .pipe(k(t => t.data))
                                  .pipe(Cu(t => t && t.type))
                                  .pipe(J(new S));
                    r.connect(), this.events = r
                  } else
                    this.worker = this.events = this.registration = Su(
                        () => bv(new Error(
                            "Service workers are disabled or not supported by this browser")))
                }
                postMessage(t, e) {
                  return this.worker
                      .pipe($u(1), th(n => {n.postMessage(
                                          Object.assign({action : t}, e))}))
                      .toPromise()
                      .then(() => {})
                }
                postMessageWithStatus(t, e, n) {
                  const r = this.waitForStatus(n), s = this.postMessage(t, e);
                  return Promise.all([ r, s ]).then(() => {})
                }
                generateNonce() { return Math.round(1e7 * Math.random()) }
                eventsOfType(t) {
                  return this.events.pipe(Cu(e => e.type === t))
                }
                nextEventOfType(t) { return this.eventsOfType(t).pipe($u(1)) }
                waitForStatus(t) {
                  return this.eventsOfType("STATUS")
                      .pipe(Cu(e => e.nonce === t), $u(1), k(t => {
                              if (!t.status)
                                throw new Error(t.error)
                            }))
                      .toPromise()
                }
                get isEnabled() { return !!this.serviceWorker }
              }
              let Iv = (() => {
                class t {
                  constructor(t) {
                    if (this.sw = t, this.subscriptionChanges = new S,
                        !t.isEnabled)
                      return this.messages = xv, this.notificationClicks = xv,
                             void (this.subscription = xv);
                    this.messages =
                        this.sw.eventsOfType("PUSH").pipe(k(t => t.data)),
                    this.notificationClicks =
                        this.sw.eventsOfType("NOTIFICATION_CLICK")
                            .pipe(k(t => t.data)),
                    this.pushManager =
                        this.sw.registration.pipe(k(t => t.pushManager));
                    const e =
                        this.pushManager.pipe(Uu(t => t.getSubscription()));
                    this.subscription = q(e, this.subscriptionChanges)
                  }
                  get isEnabled() { return this.sw.isEnabled }
                  requestSubscription(t) {
                    if (!this.sw.isEnabled)
                      return Promise.reject(new Error(Tv));
                    const e = {userVisibleOnly : !0};
                    let n = this.decodeBase64(
                            t.serverPublicKey.replace(/_/g, "/").replace(/-/g,
                                                                         "+")),
                        r = new Uint8Array(new ArrayBuffer(n.length));
                    for (let s = 0; s < n.length; s++)
                      r[s] = n.charCodeAt(s);
                    return e.applicationServerKey = r,
                           this.pushManager.pipe(Uu(t => t.subscribe(e)), $u(1))
                               .toPromise()
                               .then(t => (this.subscriptionChanges.next(t), t))
                  }
                  unsubscribe() {
                    return this.sw.isEnabled
                               ? this.subscription
                                     .pipe(
                                         $u(1), Uu(t => {
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
                               : Promise.reject(new Error(Tv))
                  }
                  decodeBase64(t) { return atob(t) }
                } return t.\u0275fac =
                    function(e) { return new (e || t)(Zt(Av)) },
                t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                t
              })(),
                  Ov = (() => {
                    class t {
                      constructor(t) {
                        if (this.sw = t, !t.isEnabled)
                          return this.available = xv,
                                 void (this.activated = xv);
                        this.available =
                            this.sw.eventsOfType("UPDATE_AVAILABLE"),
                        this.activated =
                            this.sw.eventsOfType("UPDATE_ACTIVATED")
                      }
                      get isEnabled() { return this.sw.isEnabled }
                      checkForUpdate() {
                        if (!this.sw.isEnabled)
                          return Promise.reject(new Error(Tv));
                        const t = this.sw.generateNonce();
                        return this.sw.postMessageWithStatus(
                            "CHECK_FOR_UPDATES", {statusNonce : t}, t)
                      }
                      activateUpdate() {
                        if (!this.sw.isEnabled)
                          return Promise.reject(new Error(Tv));
                        const t = this.sw.generateNonce();
                        return this.sw.postMessageWithStatus(
                            "ACTIVATE_UPDATE", {statusNonce : t}, t)
                      }
                    } return t.\u0275fac =
                        function(e) { return new (e || t)(Zt(Av)) },
                    t.\u0275prov = ht({token : t, factory : t.\u0275fac}),
                    t
                  })();
              class Pv {}
              const Rv = new Ut("NGSW_REGISTER_SCRIPT");
              function Lv(t, e, n, r) {
                return () => {
                  if (!Pc(r) || !("serviceWorker" in navigator) ||
                      !1 === n.enabled)
                    return;
                  let s;
                  if (navigator.serviceWorker.addEventListener(
                          "controllerchange",
                          () => {null !== navigator.serviceWorker.controller &&
                                 navigator.serviceWorker.controller.postMessage(
                                     {action : "INITIALIZE"})}),
                      "function" == typeof n.registrationStrategy)
                    s = n.registrationStrategy();
                  else {
                    const [e, ...r] =
                        (n.registrationStrategy || "registerWhenStable:30000")
                            .split(":");
                    switch (e) {
                    case "registerImmediately":
                      s = du(null);
                      break;
                    case "registerWithDelay":
                      s = Nv(+r[0] || 0);
                      break;
                    case "registerWhenStable":
                      s = r[0] ? q(Dv(t), Nv(+r[0])) : Dv(t);
                      break;
                    default:
                      throw new Error(
                          "Unknown ServiceWorker registration strategy: " +
                          n.registrationStrategy)
                    }
                  }
                  t.get(Cl).runOutsideAngular(
                      () => s.pipe($u(1)).subscribe(
                          () =>
                              navigator.serviceWorker
                                  .register(e, {scope : n.scope})
                                  .catch(
                                      t => console.error(
                                          "Service worker registration failed with:",
                                          t))))
                }
              }
              function Nv(t) {
                return du(null).pipe(function(t, e = tf) {
                  var n;
                  const r = (n = t) instanceof Date && !isNaN(+n) ? +t - e.now()
                                                                  : Math.abs(t);
                  return t => t.lift(new Ev(r, e))
                }(t))
              }
              function Dv(t) { return t.get(zl).isStable.pipe(Cu(t => t)) }
              function Mv(t, e) {
                return new Av(Pc(e) && !1 !== t.enabled
                                  ? navigator.serviceWorker
                                  : void 0)
              }
              let jv = (() => {
                class t {
                  static register(e, n = {}) {
                    return {
                      ngModule: t, providers: [
                        {provide : Rv, useValue : e},
                        {provide : Pv, useValue : n},
                        {provide : Av, useFactory : Mv, deps : [ Pv, ul ]}, {
                          provide : sl,
                          useFactory : Lv,
                          deps : [ Xi, Rv, Pv, ul ],
                          multi : !0
                        }
                      ]
                    }
                  }
                } return t.\u0275mod = ve({type : t}),
                t.\u0275inj = dt({
                  factory : function(e) { return new (e || t) },
                  providers : [ Iv, Ov ]
                }),
                t
              })(),
                  Fv = (() => {
                    class t {} return t.\u0275mod =
                        ve({type : t, bootstrap : [ yv ]}),
                    t.\u0275inj = dt({
                      factory : function(e) { return new (e || t) },
                      providers : [],
                      imports : [ [
                        hu, zp, Zg, vv, by, Py,
                        jv.register("ngsw-worker.js", {enabled : !0})
                      ] ]
                    }),
                    t
                  })();
              (function() {
                if (Er)
                  throw new Error(
                      "Cannot enable prod mode after platform setup.");
                Sr = !1
              })(),
                  cu().bootstrapModule(Fv).catch(t => console.error(t))
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