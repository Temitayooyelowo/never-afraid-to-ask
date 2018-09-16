package com.example.yizhangcao.neverafraidtoask;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.signin.SignIn;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class SignUpActivity extends AppCompatActivity {

    private EditText signUpEmail;
    private EditText signUpPassword;
    private EditText signUpRetypePassword;
    private Button signUpButton;

    private FirebaseAuth mAuth;

    @Override
    public void onCreate(Bundle savedBundleState) {
        super.onCreate(savedBundleState);
        setContentView(R.layout.activity_sign_up);

        signUpEmail = (EditText) findViewById(R.id.signUpEmailField);
        signUpPassword = (EditText) findViewById(R.id.signUpPasswordField);
        signUpRetypePassword = (EditText) findViewById(R.id.signUpRetypePasswordField);

        signUpButton = (Button) findViewById(R.id.signUpButton);

        mAuth = FirebaseAuth.getInstance();

        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!checkSignupInfo(signUpEmail, signUpPassword, signUpRetypePassword)) {
                    Toast.makeText(SignUpActivity.this, "Invalid Sign Up Email/Password", Toast.LENGTH_SHORT).show();
                } else {
                    mAuth.createUserWithEmailAndPassword(signUpEmail.getText().toString(), signUpPassword.getText().toString())
                            .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                                @Override
                                public void onComplete(@NonNull Task<AuthResult> task) {
                                    if (task.isSuccessful()) {
                                        FirebaseUser user = mAuth.getCurrentUser();
                                        updateUI(user);
                                        finish();
                                    } else {
                                        Toast.makeText(SignUpActivity.this, "Authentication failed.",
                                                Toast.LENGTH_SHORT).show();
                                    }
                                }
                            });
                }
            }
        });
    }

    private boolean checkSignupInfo (EditText email, EditText password, EditText retypePassword) {
        if (email.getText().toString().trim().length() == 0 ||
                password.getText().toString().trim().length() == 0 || retypePassword.getText().toString().trim().length() == 0
                || !password.getText().toString().trim().equals(retypePassword.getText().toString().trim())) {
            return false;
        }
        return true;
    }

    private void updateUI (FirebaseUser user) {
        if (user != null) {
            startActivity(new Intent(getApplicationContext(), SignInActivity.class));
        }
    }

}
