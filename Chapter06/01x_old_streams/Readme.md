In older versions of Node.js (0.10 and earlier), streams didn't use the
`readable` event, but instead had an event called `data`. Modern versions of
Node discourage this older model of streaming, but still support it
by and large.

The code in this folder shows how this older version of things worked. We
show it here strictly to make you aware of its existence and so that you're
not confused when you see legacy code that might still be using it.

