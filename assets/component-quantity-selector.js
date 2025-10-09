if ( typeof ProductQuantity !== 'function' ) {

	class ProductQuantity extends HTMLElement {

		constructor(){

			super();

			const qty = this.querySelector('.qty-selector'),
						qtyMinus = this.querySelector('.qty-minus'),
						qtyPlus = this.querySelector('.qty-plus'),
						qtyMin = qty.getAttribute('min') ? parseInt(qty.getAttribute('min')) : 1,
						qtyMax = qty.getAttribute('max') ? parseInt(qty.getAttribute('max')) : 999;

			this.feeProductQuantityInputs = document.querySelectorAll('.product-fee-quantity');
			const currentQty = parseInt(qty.value);
			this.updateFeeProductQuantities(currentQty);

			if ( parseInt(qty.value) - 1 < qtyMin ) {
				qtyMinus.classList.add('disabled');
			}
			if ( parseInt(qty.value) + 1 > qtyMax ) {
				qtyPlus.classList.add('disabled');
			}

			qty.addEventListener('change', (e)=>{
				const currentQty = parseInt(e.currentTarget.value);
				if ( parseInt(currentQty) - 1 < qtyMin ) {
					qtyMinus.classList.add('disabled');
				} else {
					qtyMinus.classList.remove('disabled');
				}
				if ( parseInt(currentQty) + 1 > qtyMax ) {
					qtyPlus.classList.add('disabled');
				} else {
					qtyPlus.classList.remove('disabled');
				}
				this.updateFeeProductQuantities(currentQty);
			});

			qtyMinus.addEventListener('click', (e)=>{
				e.preventDefault();
				if ( ! qtyMinus.classList.contains('disabled') ) {
					const currentQty = parseInt(qty.value);
					if ( currentQty - 1 >= qtyMin ) {
						qty.value = currentQty - 1;
						qtyPlus.classList.remove('disabled');
						this.updateFeeProductQuantities(qty.value);
					} 
					if ( currentQty - 1 <= qtyMin ) {
						qtyMinus.classList.add('disabled');
					}
				}
			});

			qtyPlus.addEventListener('click', (e)=>{
				e.preventDefault();
				if ( ! qtyPlus.classList.contains('disabled') ) {
					const currentQty = parseInt(qty.value);
					if ( currentQty + 1 <= qtyMax ) {
						qty.value = currentQty + 1;
						qtyMinus.classList.remove('disabled');
						this.updateFeeProductQuantities(qty.value);
					} 
					if ( currentQty + 1 >= qtyMax ) {
						qtyPlus.classList.add('disabled');
					}
				}
			});

		}

		updateFeeProductQuantities(newQuantity) {
      if (this.feeProductQuantityInputs.length > 0) {
        this.feeProductQuantityInputs.forEach(input => {
          input.value = newQuantity;
        });
      }
    }
		
	}


  if ( typeof customElements.get('product-quantity') == 'undefined' ) {
    customElements.define('product-quantity', ProductQuantity);
	}

}