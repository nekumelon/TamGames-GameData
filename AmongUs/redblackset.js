{
	const t = {},
		e = !0,
		r = !1;
	(t.RBnode = function (t) {
		(this.tree = t),
			(this.right = this.tree.sentinel),
			(this.left = this.tree.sentinel),
			(this.parent = null),
			(this.color = !1),
			(this.key = null);
	}),
		(t.RedBlackSet = function (e) {
			(this.size = 0),
				(this.sentinel = new t.RBnode(this)),
				(this.sentinel.color = r),
				(this.root = this.sentinel),
				(this.root.parent = this.sentinel),
				(this.compare = e || this.default_compare);
		}),
		(t.RedBlackSet.prototype.default_compare = function (t, e) {
			return t < e ? -1 : e < t ? 1 : 0;
		}),
		(t.RedBlackSet.prototype.clone = function () {
			var e = new t.RedBlackSet(this.compare);
			return e.insertAll(this), e;
		}),
		(t.RedBlackSet.prototype.clear = function () {
			(this.size = 0),
				(this.sentinel = new t.RBnode(this)),
				(this.sentinel.color = r),
				(this.root = this.sentinel),
				(this.root.parent = this.sentinel);
		}),
		(t.RedBlackSet.prototype.leftRotate = function (t) {
			var e = t.right;
			(t.right = e.left),
				e.left != this.sentinel && (e.left.parent = t),
				(e.parent = t.parent),
				t.parent == this.sentinel
					? (this.root = e)
					: t == t.parent.left
					? (t.parent.left = e)
					: (t.parent.right = e),
				(e.left = t),
				(t.parent = e);
		}),
		(t.RedBlackSet.prototype.rightRotate = function (t) {
			var e = t.left;
			(t.left = e.right),
				e.right != this.sentinel && (e.right.parent = t),
				(e.parent = t.parent),
				t.parent == this.sentinel
					? (this.root = e)
					: t == t.parent.right
					? (t.parent.right = e)
					: (t.parent.left = e),
				(e.right = t),
				(t.parent = e);
		}),
		(t.RedBlackSet.prototype.insert = function (r) {
			if (this.contains(r)) {
				this.get_(r).key = r;
			} else {
				var i = new t.RBnode(this);
				i.key = r;
				for (var n = this.sentinel, o = this.root; o != this.sentinel; )
					(n = o),
						(o = this.compare(i.key, o.key) < 0 ? o.left : o.right);
				(i.parent = n),
					n == this.sentinel
						? (this.root = i)
						: this.compare(i.key, n.key) < 0
						? (n.left = i)
						: (n.right = i),
					(i.left = this.sentinel),
					(i.right = this.sentinel),
					(i.color = e),
					this.insertFixup(i),
					this.size++;
			}
		}),
		(t.RedBlackSet.prototype.insertFixup = function (t) {
			for (
				;
				t != this.sentinel && t != this.root && t.parent.color == e;

			)
				if (t.parent == t.parent.parent.left) {
					(i = t.parent.parent.right).color == e
						? ((t.parent.color = r),
						  (i.color = r),
						  (t.parent.parent.color = e),
						  (t = t.parent.parent))
						: (t == t.parent.right &&
								((t = t.parent), this.leftRotate(t)),
						  (t.parent.color = r),
						  (t.parent.parent.color = e),
						  t.parent.parent != this.sentinel &&
								this.rightRotate(t.parent.parent));
				} else {
					var i;
					(i = t.parent.parent.left).color == e
						? ((t.parent.color = r),
						  (i.color = r),
						  (t.parent.parent.color = e),
						  (t = t.parent.parent))
						: (t == t.parent.left &&
								((t = t.parent), this.rightRotate(t)),
						  (t.parent.color = r),
						  (t.parent.parent.color = e),
						  t.parent.parent != this.sentinel &&
								this.leftRotate(t.parent.parent));
				}
			this.root.color = r;
		}),
		(t.RedBlackSet.prototype.delete_ = function (t) {
			var e, i;
			((i =
				(e =
					t.left == this.sentinel || t.right == this.sentinel
						? t
						: this.successor_(t)).left != this.sentinel
					? e.left
					: e.right).parent = e.parent),
				e.parent == this.sentinel
					? (this.root = i)
					: e == e.parent.left
					? (e.parent.left = i)
					: (e.parent.right = i),
				e != t && (t.key = e.key),
				e.color == r && this.deleteFixup(i),
				this.size--;
		}),
		(t.RedBlackSet.prototype.deleteFixup = function (t) {
			for (; t != this.root && t.color == r; )
				if (t == t.parent.left) {
					(i = t.parent.right).color == e &&
						((i.color = r),
						(t.parent.color = e),
						this.leftRotate(t.parent),
						(i = t.parent.right)),
						i.left.color == r && i.right.color == r
							? ((i.color = e), (t = t.parent))
							: (i.right.color == r &&
									((i.left.color = r),
									(i.color = e),
									this.rightRotate(i),
									(i = t.parent.right)),
							  (i.color = t.parent.color),
							  (t.parent.color = r),
							  (i.right.color = r),
							  this.leftRotate(t.parent),
							  (t = this.root));
				} else {
					var i;
					(i = t.parent.left).color == e &&
						((i.color = r),
						(t.parent.color = e),
						this.rightRotate(t.parent),
						(i = t.parent.left)),
						i.right.color == r && i.left.color == r
							? ((i.color = e), (t = t.parent))
							: (i.left.color == r &&
									((i.right.color = r),
									(i.color = e),
									this.leftRotate(i),
									(i = t.parent.left)),
							  (i.color = t.parent.color),
							  (t.parent.color = r),
							  (i.left.color = r),
							  this.rightRotate(t.parent),
							  (t = this.root));
				}
			t.color = r;
		}),
		(t.RedBlackSet.prototype.remove = function (t) {
			var e = this.get_(t);
			if (e != this.sentinel) {
				var r = e.key;
				return this.delete_(e), r;
			}
			return null;
		}),
		(t.RedBlackSet.prototype.removeSwapped = function (t, e) {
			this.remove(e);
		}),
		(t.RedBlackSet.prototype.min = function (t) {
			for (; t.left != this.sentinel; ) t = t.left;
			return t;
		}),
		(t.RedBlackSet.prototype.max = function (t) {
			for (; t.right != this.sentinel; ) t = t.right;
			return t;
		}),
		(t.RedBlackSet.prototype.successor_ = function (t) {
			if (t.right != this.sentinel) return this.min(t.right);
			for (var e = t.parent; e != this.sentinel && t == e.right; )
				(t = e), (e = e.parent);
			return e;
		}),
		(t.RedBlackSet.prototype.predeccessor_ = function (t) {
			if (t.left != this.sentinel) return this.max(t.left);
			for (var e = t.parent; e != this.sentinel && t == e.left; )
				(t = e), (e = e.parent);
			return e;
		}),
		(t.RedBlackSet.prototype.successor = function (t) {
			if (this.size > 0) {
				var e = this.get_(t);
				if (e == this.sentinel) return null;
				if (e.right != this.sentinel) return this.min(e.right).key;
				for (var r = e.parent; r != this.sentinel && e == r.right; )
					(e = r), (r = r.parent);
				return r != this.sentinel ? r.key : null;
			}
			return null;
		}),
		(t.RedBlackSet.prototype.predecessor = function (t) {
			if (this.size > 0) {
				var e = this.get_(t);
				if (e == this.sentinel) return null;
				if (e.left != this.sentinel) return this.max(e.left).key;
				for (var r = e.parent; r != this.sentinel && e == r.left; )
					(e = r), (r = r.parent);
				return r != this.sentinel ? r.key : null;
			}
			return null;
		}),
		(t.RedBlackSet.prototype.getMin = function () {
			return this.min(this.root).key;
		}),
		(t.RedBlackSet.prototype.getMax = function () {
			return this.max(this.root).key;
		}),
		(t.RedBlackSet.prototype.get_ = function (t) {
			for (
				var e = this.root;
				e != this.sentinel && 0 != this.compare(e.key, t);

			)
				e = this.compare(t, e.key) < 0 ? e.left : e.right;
			return e;
		}),
		(t.RedBlackSet.prototype.contains = function (t) {
			return null != this.get_(t).key;
		}),
		(t.RedBlackSet.prototype.getValues = function () {
			var t = [];
			return (
				this.forEach(function (e) {
					t.push(e);
				}),
				t
			);
		}),
		(t.RedBlackSet.prototype.insertAll = function (e) {
			if ('array' == t.typeOf(e))
				for (var r = 0; r < e.length; r++) this.insert(e[r]);
			else if ('function' == t.typeOf(e.forEach))
				e.forEach(this.insert, this);
			else if ('function' == t.typeOf(e.getValues)) {
				var i = e.getValues();
				for (r = 0; r < i.length; r++) this.insert(i[r]);
			} else if ('object' == t.typeOf(e))
				for (var n in e) this.insert(e[n]);
		}),
		(t.RedBlackSet.prototype.removeAll = function (e) {
			if ('array' == t.typeOf(e))
				for (var r = 0; r < e.length; r++) this.remove(e[r]);
			else if ('function' == t.typeOf(e.forEach))
				e.forEach(this.removeSwapped, this);
			else if ('function' == t.typeOf(e.getValues)) {
				var i = e.getValues();
				for (r = 0; r < i.length; r++) this.remove(i[r]);
			} else if ('object' == t.typeOf(e))
				for (var n in e) this.remove(e[n]);
		}),
		(t.RedBlackSet.prototype.containsAll = function (e) {
			if ('array' == t.typeOf(e)) {
				for (var r = 0; r < e.length; r++)
					if (!this.contains(e[r])) return !1;
				return !0;
			}
			if ('function' == t.typeOf(e.forEach))
				return e.every(this.contains, this);
			if ('function' == t.typeOf(e.getValues)) {
				var i = e.getValues();
				for (r = 0; r < i.length; r++)
					if (!this.contains(i[r])) return !1;
				return !0;
			}
			if ('object' == t.typeOf(e)) {
				for (var n in e) if (!this.contains(e[n])) return !1;
				return !0;
			}
		}),
		(t.RedBlackSet.prototype.range = function (t, e) {
			var r = [];
			return (
				this.traverseFromTo(
					function (t) {
						r.push(t);
					},
					t,
					e
				),
				r
			);
		}),
		(t.RedBlackSet.prototype.traverse = function (t, e) {
			if (!this.isEmpty())
				for (var r = this.min(this.root); r != this.sentinel; ) {
					if (t.call(e, r.key, this)) return;
					r = this.successor_(r);
				}
		}),
		(t.RedBlackSet.prototype.traverseFrom = function (t, e, r) {
			if (!this.isEmpty())
				for (var i = this.get_(e); i != this.sentinel; ) {
					if (t.call(r, i.key, this)) return;
					i = this.successor_(i);
				}
		}),
		(t.RedBlackSet.prototype.traverseTo = function (t, e, r) {
			if (!this.isEmpty())
				for (var i = this.min(this.root), n = this.get_(e); i != n; ) {
					if (t.call(r, i.key, this)) return;
					i = this.successor_(i);
				}
		}),
		(t.RedBlackSet.prototype.traverseFromTo = function (t, e, r, i) {
			if (!this.isEmpty())
				for (var n = this.get_(e), o = this.get_(r); n != o; ) {
					if (t.call(i, n.key, this)) return;
					n = this.successor_(n);
				}
		}),
		(t.RedBlackSet.prototype.traverseBackwards = function (t, e) {
			if (!this.isEmpty())
				for (var r = this.max(this.root); r != this.sentinel; ) {
					if (t.call(e, r.key, this)) return;
					r = this.predeccessor_(r);
				}
		}),
		(t.RedBlackSet.prototype.forEach = function (t, e) {
			if (!this.isEmpty())
				for (
					var r = this.min(this.root);
					r != this.sentinel;
					r = this.successor_(r)
				)
					t.call(e, r.key, r.key, this);
		}),
		(t.RedBlackSet.prototype.some = function (t, e) {
			if (this.isEmpty()) return !1;
			for (
				var r = this.min(this.root);
				r != this.sentinel;
				r = this.successor_(r)
			)
				if (t.call(e, r.key, r.key, this)) return !0;
			return !1;
		}),
		(t.RedBlackSet.prototype.every = function (t, e) {
			if (this.isEmpty()) return !1;
			for (
				var r = this.min(this.root);
				r != this.sentinel;
				r = this.successor_(r)
			)
				if (!t.call(e, r.key, r.key, this)) return !1;
			return !0;
		}),
		(t.RedBlackSet.prototype.map = function (t, e) {
			var r = [];
			if (this.isEmpty()) return r;
			for (
				var i = this.min(this.root);
				i != this.sentinel;
				i = this.successor_(i)
			)
				r.push(t.call(e, i.key, i.key, this));
			return r;
		}),
		(t.RedBlackSet.prototype.filter = function (t, e) {
			var r = [];
			if (this.isEmpty()) return r;
			for (
				var i = this.min(this.root);
				i != this.sentinel;
				i = this.successor_(i)
			)
				t.call(e, i.key, i.key, this) && r.push(i.key);
			return r;
		}),
		(t.RedBlackSet.prototype.getCount = function () {
			return this.size;
		}),
		(t.RedBlackSet.prototype.isEmpty = function () {
			return 0 == this.size;
		}),
		(t.RedBlackSet.prototype.isSubsetOf = function (e) {
			var r = t.getCount(e);
			if (this.getCount() > r) return !1;
			var i = 0;
			if (this.isEmpty()) return !0;
			for (
				var n = this.min(this.root);
				n != this.sentinel;
				n = this.successor_(n)
			)
				t.contains.call(e, e, n.key) && i++;
			return i == this.getCount();
		}),
		(t.RedBlackSet.prototype.intersection = function (e) {
			var r = new t.RedBlackSet(this.compare);
			if (this.isEmpty()) return r;
			for (
				var i = this.min(this.root);
				i != this.sentinel;
				i = this.successor_(i)
			)
				e.contains.call(e, i.key, i.key, this) && r.insert(i.key);
			return r;
		}),
		(self.RedBlackSet = class {
			constructor(e) {
				this._rbSet = new t.RedBlackSet(e);
			}
			Add(t) {
				this._rbSet.insert(t);
			}
			Remove(t) {
				this._rbSet.remove(t);
			}
			Has(t) {
				return this._rbSet.contains(t);
			}
			Clear() {
				this._rbSet.clear();
			}
			toArray() {
				return this._rbSet.getValues();
			}
			GetSize() {
				return this._rbSet.getCount();
			}
			IsEmpty() {
				return this._rbSet.isEmpty();
			}
			ForEach(t) {
				this._rbSet.forEach(t);
			}
			Front() {
				if (this.IsEmpty()) throw new Error('empty set');
				const t = this._rbSet;
				return t.min(t.root).key;
			}
			Shift() {
				if (this.IsEmpty()) throw new Error('empty set');
				const t = this.Front();
				return this.Remove(t), t;
			}
			*values() {
				if (this.IsEmpty()) return;
				const t = this._rbSet;
				for (
					let e = t.min(t.root);
					e != t.sentinel;
					e = t.successor_(e)
				)
					yield e.key;
			}
			[Symbol.iterator]() {
				return this.values();
			}
		});
}
