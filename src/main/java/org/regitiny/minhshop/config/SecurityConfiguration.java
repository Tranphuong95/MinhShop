package org.regitiny.minhshop.config;

import org.regitiny.minhshop.security.AuthoritiesConstants;
import org.regitiny.minhshop.security.jwt.JWTConfigurer;
import org.regitiny.minhshop.security.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.filter.CorsFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{

  private final TokenProvider tokenProvider;

  private final CorsFilter corsFilter;
  private final SecurityProblemSupport problemSupport;

  public SecurityConfiguration(TokenProvider tokenProvider, CorsFilter corsFilter, SecurityProblemSupport problemSupport)
  {
    this.tokenProvider = tokenProvider;
    this.corsFilter = corsFilter;
    this.problemSupport = problemSupport;
  }

  @Bean
  public PasswordEncoder passwordEncoder()
  {
    return new BCryptPasswordEncoder();
  }

  @Override
  public void configure(WebSecurity web)
  {
    web
      .ignoring()
      .antMatchers(HttpMethod.OPTIONS, "/**")
      .antMatchers("/app/**/*.{js,html}")
      .antMatchers("/i18n/**")
      .antMatchers("/content/**")
      .antMatchers("/h2-console/**")
      .antMatchers("/swagger-ui/index.html")
      .antMatchers("/test/**");
  }

  @Override
  public void configure(HttpSecurity http) throws Exception
  {
    // @formatter:off
    http
      .csrf()
      .disable()
      .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
      .exceptionHandling()
      .authenticationEntryPoint(problemSupport)
      .accessDeniedHandler(problemSupport)
      .and()
      .headers()
      .contentSecurityPolicy("default-src 'self'; " +
        "frame-src 'self' https://www.google.com/maps/embed data:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; " +
        "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; " +
        "img-src * 'self' data:; " +
        "font-src 'self' https://fonts.gstatic.com data:")
      .and()
      .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
      .and()
      .featurePolicy("geolocation 'none'; " +
        "midi 'none'; " +
        "sync-xhr 'none'; " +
        "microphone 'none'; " +
        "camera 'none'; " +
        "magnetometer 'none'; " +
        "gyroscope 'none'; " +
        "fullscreen 'self'; " +
        "payment 'none'")
      .and()
      .frameOptions()
      .deny()
      .and()
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeRequests()
//      thứ tự cực kỳ quan trọng
      .antMatchers(HttpMethod.GET, "/api/open/**").permitAll()
      .antMatchers("/api/open/**").permitAll()
      .antMatchers("/api/images/public/**").permitAll()
      .antMatchers("/api/images/upload").authenticated()

      .antMatchers("/api/authenticate").permitAll()
      .antMatchers("/api/register").permitAll()
      .antMatchers("/api/activate").permitAll()
      .antMatchers("/api/account/reset-password/init").permitAll()
      .antMatchers("/api/account/reset-password/finish").permitAll()

      .antMatchers("/api/admin/**").hasAuthority(AuthoritiesConstants.ADMIN)
      .antMatchers("/api/management/admin/**").hasAuthority(AuthoritiesConstants.ADMIN)
      .antMatchers("/api/**").authenticated()

      .antMatchers("/websocket/**").authenticated()
      .antMatchers("/management/health").permitAll()
      .antMatchers("/management/health/**").permitAll()
      .antMatchers("/management/info").permitAll()
      .antMatchers("/management/prometheus").permitAll()
      .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
      .and()
      .httpBasic()
      .and()
      .apply(securityConfigurerAdapter());
    // @formatter:on
  }

  private JWTConfigurer securityConfigurerAdapter()
  {
    return new JWTConfigurer(tokenProvider);
  }
}
