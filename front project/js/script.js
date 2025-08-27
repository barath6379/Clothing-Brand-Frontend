function getCart() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(name, price, image) {
      let cart = getCart();
      let item = cart.find(i => i.name === name);
      if (item) {
        item.qty++;
      } else {
        cart.push({ name, price, image, qty: 1 });
      }
      saveCart(cart);
      renderCart();
    }

    function updateQty(name, qty) {
      qty = Math.max(0, Number(qty) || 0); 
      let cart = getCart()
        .map(i => i.name === name ? { ...i, qty } : i)
        .filter(i => i.qty > 0);
      saveCart(cart);
      renderCart();
    }

    function removeFromCart(name) {
      saveCart(getCart().filter(i => i.name !== name));
      renderCart();
    }

    function clearCart() {
      saveCart([]);
      renderCart();
    }

    function renderCart() {
      let cart = getCart();
      let container = document.getElementById("cart-items");
      let total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

      if (!cart.length) {
        container.innerHTML = "<p>Cart is empty</p>";
      } else {
        container.innerHTML = cart.map(i => `
          <div class="cart-item">
            <img src="${i.image}" alt="${i.name}">
            <div style="flex:1">
              <div><strong>${i.name}</strong></div>
              <div>$${i.price} × 
                <input type="number" value="${i.qty}" min="1" onchange="updateQty('${i.name}', this.value)">
                = <strong>$${(i.qty * i.price).toFixed(2)}</strong>
              </div>
            </div>
            <button onclick="removeFromCart('${i.name}')">X</button>
          </div>
        `).join("");
      }

      document.getElementById("total-price").innerText = `$${total.toFixed(2)}`;
    }

    window.onload = renderCart;