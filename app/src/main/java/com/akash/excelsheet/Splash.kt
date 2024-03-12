package com.akash.excelsheet

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler

class Splash : AppCompatActivity() {
    lateinit var go_intent: Intent;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
        go_intent = Intent(this,MainActivity::class.java)

        Handler().postDelayed({
            startActivity(go_intent)
        },3000)
    }
}