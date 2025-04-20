function variable() {
    if (true) {
      let a = 10;      // Block-scoped variable (only available inside the block {} where it’s defined).
      var b = 20;      // Function-scoped variable (accessible anywhere in the function).
      c = 30;          // Undeclared identifier – in non‑strict mode, becomes global

      console.log("a:", a);
    }

    console.log("var b:", b);  
    console.log("undeclared c:", c);  
  }
  
  variable();
  console.log("Global c:", c);   